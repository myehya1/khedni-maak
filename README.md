# 🚗 Khednii Ma'ak

Khednii Ma'ak is a full-stack ride-sharing web application built with the MERN stack. It allows users to create and join rides, search for available trips, manage their profiles, and interact with an AI assistant powered by Google Gemini.

## 🌟 Features

- 🔐 User Authentication (JWT)
- 👤 User Registration & Login
- 🚘 Create, Edit, and Delete Rides
- 🔍 Search Available Rides
- 🤝 Join Existing Rides
- 👤 User Profile Management
- 🤖 AI Chatbot using Google Gemini
- 🧠 Natural Language Ride Search
- ☁️ MongoDB Atlas Database
- 🚀 Backend Deployment on Render
- 🌐 Frontend Deployment on Vercel
- 🐳 Docker & Docker Compose Support

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Google Gemini API

### Deployment

- Render
- Vercel
- Docker
- Docker Compose

---

## 📂 Project Structure

```text
carpooling-app/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── Dockerfile
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── ...
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Run Locally (Without Docker)

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd carpooling-app
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Start the Backend

```bash
cd ../backend
npm start
```

### Start the Frontend

```bash
cd ../frontend
npm run dev
```

---

## 🐳 Run with Docker

Build and start the application:

```bash
docker compose up --build
```

Stop the containers:

```bash
docker compose down
```

The application will be available at:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

---

## 🌍 Live Demo

### Frontend

https://khedni-maak.vercel.app

### Backend API

https://khedni-maak.onrender.com/api

---

## 📸 Screenshots

_Add screenshots of your application here._

---

## 🔮 Future Improvements

- API Documentation with Swagger/OpenAPI
- Email Notifications
- Ride History
- User Ratings & Reviews
- Google Maps Integration
- Real-time Chat
- Unit & Integration Tests

---

## 👨‍💻 Author

**Mohamad**

---

## 📄 License

This project is licensed under the MIT License.
