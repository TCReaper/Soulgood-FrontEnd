import pandas as pd
import numpy as np
from scipy import stats
from scipy.fft import fft, fftfreq
from dotenv import load_dotenv
import json
import os
import openai
import time
import requests

def check_youtube_video_exists(url):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        response = requests.get(url, headers=headers, timeout=10)

        error_phrases = [
            "Video unavailable",
            "This video is private",
            "This video has been removed",
            "This video is no longer available",
            "content is not available",
            "account associated with this video has been terminated",
            "This video isn't available anymore"
        ]

        lower_text = response.text.lower()
        for phrase in error_phrases:
            if phrase.lower() in lower_text:
                return False

        return True

    except requests.RequestException as e:
        print(f"Request failed for {url}: {e}")
        return False

class HRVAnalyzer:
    def __init__(self, confidence_level=0.95, resample_interval='5s'):
        self.confidence_level = confidence_level
        self.resample_interval = resample_interval
        self.spotify = None

    # def preprocess_hrv_data(self, hr_data):
    #     print("data received to preprocess")
    #     hr_data['dt'] = pd.to_datetime(hr_data['dt'])
    #     hr_data = hr_data.sort_values('dt').set_index('dt')
    #     hr_data = hr_data.resample(self.resample_interval).mean()
    #     hr_data['bpm'] = hr_data['bpm'].interpolate(method='linear')
    #     hr_data['SDNN'] = hr_data['bpm'].rolling(window=5).std()
    #     hr_data['RMSSD'] = np.sqrt(np.square(hr_data['bpm'].diff()).rolling(window=5).mean())
    #     rr_intervals = hr_data['bpm'].dropna().values
    #     hr_data['LF_Power'], hr_data['HF_Power'], hr_data['LF/HF'] = self.calculate_frequency_features(rr_intervals)
    #     return hr_data.dropna()

    def preprocess_hrv_data(self, file_path):
        hr_data = pd.read_csv(file_path)
        hr_data['dt'] = pd.to_datetime(hr_data['dt'])
        hr_data = hr_data.sort_values('dt').set_index('dt')
        hr_data = hr_data.resample(self.resample_interval).mean()
        hr_data['bpm'] = hr_data['bpm'].interpolate(method='linear')
        hr_data['SDNN'] = hr_data['bpm'].rolling(window=5).std()
        hr_data['RMSSD'] = np.sqrt(np.square(hr_data['bpm'].diff()).rolling(window=5).mean())
        rr_intervals = hr_data['bpm'].dropna().values
        hr_data['LF_Power'], hr_data['HF_Power'], hr_data['LF/HF'] = self.calculate_frequency_features(rr_intervals)
        return hr_data.dropna()

    def calculate_frequency_features(self, rr_intervals):
        if len(rr_intervals) < 10:
            return np.nan, np.nan, np.nan
        rr_intervals = rr_intervals[rr_intervals > 0]
        n = len(rr_intervals)
        T = 1.0
        yf = fft(rr_intervals)
        xf = fftfreq(n, T)[:n // 2]
        psd = np.abs(yf[:n // 2])**2
        LF_band = (0.04, 0.15)
        HF_band = (0.15, 0.4)
        LF_indices = np.where((xf >= LF_band[0]) & (xf <= LF_band[1]))[0]
        HF_indices = np.where((xf >= HF_band[0]) & (xf <= HF_band[1]))[0]
        LF_power = np.sum(psd[LF_indices])
        HF_power = np.sum(psd[HF_indices])
        LF_HF_ratio = LF_power / HF_power if HF_power > 0 else np.nan
        return LF_power, HF_power, LF_HF_ratio

    def analyze_depression_risk(self, data):
        print("data received to analyze")
        z = stats.norm.ppf((1 + self.confidence_level) / 2)
        upper_LF_HF = data['LF/HF'].mean() + z * data['LF/HF'].std()
        lower_RMSSD = max(data['RMSSD'].mean() - z * data['RMSSD'].std(), 0.001)
        lower_SDNN = max(data['SDNN'].mean() - z * data['SDNN'].std(), 0.001)
        stress_LFHF = data['LF/HF'] / upper_LF_HF
        stress_RMSSD = np.clip(1 - (data['RMSSD'] / lower_RMSSD), 0, 1)
        stress_SDNN = np.clip(1 - (data['SDNN'] / lower_SDNN), 0, 1)
        score = (stress_LFHF + stress_RMSSD + stress_SDNN) / 3
        depression_risk_score = float(np.clip(score.mean(), 0, 1))
        return depression_risk_score

    def recommend_music(self, depression_risk_score):
        print("music otw")
        user_message = str(depression_risk_score)
        print(user_message)
        load_dotenv()
        OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
        client = openai.OpenAI(api_key=OPENAI_API_KEY)
        music_mapping = {
                "min_tempo": 40, "max_tempo": 70,
                "min_energy": 0.2, "max_energy": 0.5,
                "genres": ['pop', 'electronic', 'rock','classical', 'blues', 'sleep','folk', 'jazz','country']
            }
        # OpenAI System Prompt for Chatbot
        SYSTEM_PROMPT = f"""
        music_features = {music_mapping}
Using these details. Given a depression risk score, find the range of values it fits (the keys of the dictionary). 
Use the corresponding value of that key to find 5 songs that fit those conditions. 
1. Do NOT ask questions
2. Do NOT provide any explanations
3. Replies should be the youtube links and song names only. """ + """

Reply should be of the format {"Song Name":"youtube link"}.
Your links should exist and work. Web scrape if needed
"""
        messages = [{"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_message}]
        while True: #for n_iter in range(3):
            try:
                response = client.chat.completions.create(
                    model="chatgpt-4o-latest",
                    messages=messages,
                    max_tokens=500
                )
                bot_response = response.choices[0].message.content
                song_links_dict = json.loads(bot_response)
                invalid_links = []

                for key in song_links_dict:
                    print(key, song_links_dict[key])
                    if not check_youtube_video_exists(song_links_dict[key]):
                        print(key, " - False")
                        invalid_links.append(key)
                        print(invalid_links)

                if len(song_links_dict) - len(invalid_links) <= 2:
                    continue

                else:
                    for key in invalid_links:
                        del song_links_dict[key]
                    return song_links_dict

            except Exception as e:
                continue  # (optional) print("Error:", e)
        # else:
        #     return {}

            
# === MAIN EXECUTION ===
if __name__ == "__main__":
    input_file = "./hr_export.csv"
    output_file = "./hr_analysis.csv"

    analyzer = HRVAnalyzer()
    data = analyzer.preprocess_hrv_data(input_file)
    score = analyzer.analyze_depression_risk(data)
    song_links_dict = analyzer.recommend_music(0.7) ##category, {song name:YT link}

    print(f"HRV data saved: {output_file}")
    print(f" Depression Risk Score: {score:.2f}")
    if score >= 0.6:
        print("High Risk of Depression")
    elif score >= 0.3:
        print("Moderate Risk of Depression")
    else:
        print("Low Risk of Depression")

    if song_links_dict:
        print("Songs Recommended:")
        for key in song_links_dict:
            print(f"{key} - {song_links_dict[key]}")
    else:
        print("No songs retrieved.")
    
    #data.to_csv(output_file)
    print("DONE")
