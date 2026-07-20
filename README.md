# 🚗 Khednii Ma'ak

**Share the Ride. Save the Cost.**

Khednii Ma'ak is a full-stack **MERN** ride-sharing platform designed for Lebanon. It enables users to create rides, search for available trips, join rides, and manage their travel through a modern web application.

The platform also features a **Google Gemini-powered AI assistant** that can answer questions about the application and perform natural language ride searches, providing a smarter and more intuitive user experience.

---

# ✨ Features

## 🔐 Authentication

- User registration
- Secure login using JWT authentication
- Protected routes
- Logout functionality

## 🚗 Ride Management

- Create a new ride
- Search available rides
- Join a ride
- Edit your own rides
- Delete your own rides
- View created rides
- View joined rides

## 🤖 AI Assistant

- Google Gemini-powered chatbot
- Answers questions about the platform
- Natural language ride search
- Searches rides directly from the MongoDB database
- Floating chat widget integrated into the application

## 👤 User Profile

- Personal profile page
- List of created rides
- List of joined rides

## 🇱🇧 Lebanon-Focused

- Predefined Lebanese cities
- Searchable city selector
- Optimized for travel within Lebanon

## 🎨 User Interface

- Responsive layout
- Modern white and light-blue design
- Reusable React components
- Searchable city dropdown

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- React Router
- Axios
- React Icons
- React Select

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Google Gemini API

---

# 📁 Project Structure

```text
khednii-maak/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   ├── services/
│   │   └── styles/
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── config/
│   └── server.js
│
├── README.md
└── .gitignore
```

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/khednii-maak.git
cd khednii-maak
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
npm run dev
```

---

## 3. Install Frontend Dependencies

Open a new terminal.

```bash
cd frontend
npm install
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

# 🤖 AI Chatbot Examples

The AI assistant can answer questions such as:

- How do I create a ride?
- How can I join a ride?
- How do I edit my ride?
- Find me a ride from Beirut to Tripoli tomorrow.
- Search for rides from Saida to Beirut.

---

# 📸 Screenshots

Screenshots will be added after deployment.

- Home Page
- Search Rides
- Create Ride
- Profile
- AI Chatbot

---

# 📌 Future Improvements

- ⭐ Driver ratings and reviews
- 💬 In-app chat
- 🔔 Notifications
- 📍 Interactive maps
- 📧 Email notifications
- 📱 Mobile application

---

# 🎯 Learning Objectives

This project demonstrates:

- Full-stack MERN development
- RESTful API design
- JWT authentication
- MongoDB database design
- CRUD operations
- React state management
- Protected routes
- Component-based architecture
- Responsive UI development
- Google Gemini AI integration
- Natural language processing for ride search

---

# 👨‍💻 Author

**Mohamad Yehya**

---

# 📄 License

This project is intended for educational purposes.
