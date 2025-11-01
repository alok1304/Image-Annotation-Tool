# 🖼️ Image Annotation Tool

A full-stack image labeling and bounding-box creation tool built using **Django**, **React.js**, and **OpenCV**.  
It allows users to upload images, create annotations, save them to the backend, and export them as JSON for **machine learning dataset generation**.

---

## 🚀 Features

✅ Upload and display images  
✅ Draw bounding boxes for object labeling  
✅ Save annotations to Django backend via REST API  
✅ Export annotations as JSON  
✅ Integrated OpenCV for backend image processing  
✅ Real-time updates using WebSockets (optional)  
✅ Scalable architecture using Django REST Framework + React

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/alok1304/Image-Annotation-Tool.git
cd Image-Annotation-Tool
```

### 2️⃣ Backend Setup (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # (On Windows)
# OR
source venv/bin/activate  # (On Mac/Linux)

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Your backend will start at 👉 http://127.0.0.1:8000

### 3️⃣ Frontend Setup (React)

Open a new terminal window:
```bash
cd frontend
npm install
npm start
```
Your frontend will start at 👉 http://localhost:3000
