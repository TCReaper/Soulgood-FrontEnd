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
                print(phrase)
                return False

        return True

    except requests.RequestException as e:
        print(f"Request failed for {url}: {e}")
        return False


print(check_youtube_video_exists('https://www.youtube.com/watch?v=cZ6LfkENvz1'))