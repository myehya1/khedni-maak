# 🚗 Khednii Ma'ak

> **Share the Ride. Save the Cost.**

Khednii Ma'ak is a full-stack MERN ride-sharing platform designed for Lebanon. It allows users to create rides, search for available trips, join other drivers, and manage their rides through a modern web application.

The project was built to demonstrate full-stack web development using the MERN stack while providing a practical solution for affordable and convenient transportation.

---

## ✨ Features

### 🔐 Authentication

- User registration
- Secure login using JWT authentication
- Protected routes
- Logout functionality

### 🚗 Ride Management

- Create a new ride
- Search available rides
- Join a ride
- Edit your own rides
- Delete your own rides
- View created rides
- View joined rides

### 👤 User Profile

- Personal profile page
- List of created rides
- List of joined rides

### 🇱🇧 Lebanon-Focused

- Predefined Lebanese cities
- Searchable city selector
- Optimized for travel within Lebanon

### 🎨 User Interface

- Responsive layout
- Modern white and light-blue design
- Reusable React components
- Searchable city dropdown

---

# 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- React Icons
- React Select

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

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
```

```bash
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
```

Run the frontend:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

# 📸 Screenshots

> Screenshots will be added after the final UI redesign.

- Home Page
- Search Rides
- Create Ride
- Profile
- Edit Ride

---

# 📌 Future Improvements

The following features are planned for future versions:

- 🤖 AI Ride Assistant
- 🧠 Natural Language Ride Search
- 💰 AI Price Recommendation
- 📝 AI Ride Description Generator
- ⭐ Driver Ratings & Reviews
- 💬 In-app Chat
- 🔔 Notifications
- 📍 Interactive Maps
- 📱 Mobile-friendly enhancements

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

---

# 👨‍💻 Author

**Mohamad Yehya**

---

# 📄 License

This project is intended for educational and portfolio purposes.
