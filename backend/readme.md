📌 Flask-ML Backend for Heart Rate Analysis
This is a Flask-based backend that processes heart rate data from a mobile device, analyzes stress levels using Machine Learning (ML), and returns stress predictions.

🚀 Features
✅ Receives heart rate data from a mobile app 📲
✅ Extracts HRV (Heart Rate Variability) metrics ⏳
✅ Uses ML models for stress prediction 🧠
✅ Sends risk assessment back to the mobile app 🔄

backend/
│── venv/                  # Virtual Environment (Generated after setup)
│── data/                  # (Optional) Store input data files
│── models/                # (Optional) Store trained models
│── hrv_analyzer.py        # HRV Analysis & Machine Learning Code
│── app.py                 # Flask API Server
│── requirements.txt       # Required Python Libraries
│── README.md              # Documentation (This File)
│── __init__.py            # (If converting into a package)


1️⃣ Activate Virtual Environment
Before running the project, activate the virtual environment:

🔹 Mac/Linux:
source venv/bin/activate

🔹 Windows (PowerShell):
venv\Scripts\Activate


2️⃣ Install Dependencies
Ensure all required libraries are installed:

pip install -r requirements.txt

📌 This will install:

flask → API Framework
pandas → Data Processing
numpy → Numerical Computation
scipy → FFT & Statistical Functions
gunicorn → Production WSGI Server

3️⃣ Run Flask Server
Start the Flask API:

python app.py

FLASK_ENV=development python app.py  # Mac/Linux
$env:FLASK_ENV="development"; python app.py  # Windows (PowerShell)


