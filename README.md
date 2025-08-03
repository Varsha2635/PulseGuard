# 💓 Pulse Guard – AI-Powered Heart Risk Predictor

Pulse Guard is a full-stack health-tech web application that predicts your risk of heart disease using machine learning. Based on your risk level, it provides personalized health advice, shows nearby cardiologists, and allows secure login with email OTP.

---
## 🚀 Live Demo

 **Frontend (React):** [https://papaya-stardust-91ef3b.netlify.app](https://papaya-stardust-91ef3b.netlify.app)

---
# 🧩 Project Structure

PulseGuard/
├── client/ # React app
├── server-flask/ # ML model + prediction API
└── server/ # Auth server with OTP verification

## 🔐 Features

- 🔍 Predict heart disease risk using ML (Random Forest)
- 📊 Show risk level: Low / Moderate / High
- 🧠 Get health recommendations
- 📍 List of nearby healthcare providers
- ✅ OTP-based signup/login system (Node.js backend)
- 💬 Built-in chatbot for health tips (Botpress)

---
## ⚙️ Tech Stack

- **Frontend:** React, Tailwind CSS, Axios  
- **ML Backend:** Flask, scikit-learn, joblib  
- **Auth Backend:** Node.js, Express, MongoDB, JWT, Nodemailer  
- **ML Model:** Trained with heart disease dataset (classification)

---
## 🛠️ Run Locally

### 1. Clone this repo
```bash
git clone https://github.com/Varsha2635/PulseGuard.git
cd PulseGuard
```
### 2.Start Flask ML Backend
```bash
cd server-flask
pip install -r requirements.txt
python app.py
```
### 3.Start Node.js Auth Backend
```bash
cd server
npm install
npm start

```
### 4. Start Frontend(React)
```bash
cd frontend
npm install
npm run dev
```
---
## Prediction API
### POST /predict
### Headers: Authorization: Bearer <token>
### Body (JSON)
```bash
{
  "age": 54,
  "sex": 1,
  "cp": 0,
  "trestbps": 130,
  "chol": 246,
  "fbs": 0,
  "restecg": 1,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 1.5,
  "slope": 2,
  "ca": 0,
  "thal": 2
}

```
---
## Contributors
### 1. Varsha Kundarapu
### 2. Tasila PoornaShree
### 3. Anushka Tiwari 
---

## 📄 License
### MIT License – feel free to use, modify, and contribute!
