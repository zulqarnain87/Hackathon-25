import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-yellow-400 text-gray-900 shadow-md w-full px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        
        {/*  Logo */}
        <div className="flex justify-center md:justify-start">
          <Link
            to="/"
            className="text-2xl font-bold hover:text-gray-800 transition"
          >
            💬 PitchCraft.Ai
          </Link>
        </div>

        {/* 🔗 Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 text-lg font-medium">
          {/* <Link to="/discover" className="hover:text-gray-700 transition">
            Discover
          </Link> */}

          <Link to="/" className="hover:text-gray-700 transition">
            Home
          </Link>
          <Link to="/AiChat" className="hover:text-gray-700 transition">
            Chat with AI
          </Link>

          <Link to="/PitchGenerator" className="hover:text-gray-700 transition">
            Generate Pitches
          </Link>

          <Link to="/favorites" className="hover:text-gray-700 transition">
            Favorites
          </Link>

          {/* <Link to="/dashboard" className="hover:text-gray-700 transition">
            Dashboard
          </Link> */}
          {/* <Link to="/ChatList" className="hover:text-gray-700 transition">
            Chat
          </Link> */}

          

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-900 text-yellow-400 rounded-lg hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
