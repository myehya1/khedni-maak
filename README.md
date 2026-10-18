# 🚗 Khednii Ma'ak

Khednii Ma'ak is a full-stack TypeScript ride-sharing web application. It allows users to create and join rides, search for available trips, manage their profiles, and interact with a Gemini-powered AI assistant that retrieves relevant product knowledge before answering.

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
- Gemini embeddings for semantic retrieval

### Deployment

- Render
- Vercel
- Docker
- Docker Compose

---

## Retrieval-Augmented Generation (RAG)

The AI chatbot uses retrieval-augmented generation for questions about the application. Before Gemini creates an answer, the backend searches a trusted in-memory knowledge base for the most relevant documents and includes that context in the prompt.

```text
User question -> Gemini embedding -> semantic retrieval -> relevant product context -> Gemini answer
```

The knowledge base covers the features currently available in the app: registration and login, offering and searching for rides, joining and leaving rides, ride management, profiles, account deletion, and natural-language ride search.

The RAG implementation lives in `backend/services/ragService.ts`. It caches document embeddings in memory after the first request. If the embedding request is unavailable, it falls back to keyword retrieval so the chatbot can still answer from matching application knowledge.

To update the chatbot's trusted information, edit the `knowledgeBase` entries in `backend/services/ragService.ts`. No additional environment variables are required; it uses the existing `GEMINI_API_KEY`.

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

### Start the Backend (development)

```bash
cd ../backend
npm run dev
```

### Start the Frontend

```bash
cd ../frontend
npm run dev
```

### Production build

```bash
cd backend && npm run build
cd ../frontend && npm run build
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
