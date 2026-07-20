import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRide from './pages/CreateRide';
import SearchRides from './pages/SearchRides';
import Profile from './pages/Profile';
import EditRide from './pages/EditRide';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/search" element={<SearchRides />} />

        <Route
          path="/create-ride"
          element={
            <ProtectedRoute>
              <CreateRide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-ride/:id"
          element={
            <ProtectedRoute>
              <EditRide />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <Chatbot />
    </>
  );
}

export default App;
