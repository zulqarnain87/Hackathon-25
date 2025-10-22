// src/components/Dashboard.jsx
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
<>
    <Navbar />
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* 🔹 Navbar */}
      <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🚀 Idea Pitch Dashboard</h1>
        
      </div>
<div className="flex gap-4 mt-6 px-6">
          <Link
            to="/add-pitch"
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            + Add Pitch
          </Link>
          <Link
            to="/pitches"
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            View Pitches
          </Link>
          <Link
            to="/favorites"
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Favorites
          </Link>
        </div>
      {/* 🔹 Main Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl mt-4 text-gray-700">
          Welcome to your Pitch Management Dashboard ✨
        </h2>
        <p className="text-gray-500 mt-2">
          Create, view, and manage startup ideas with ease!
        </p>
      </div>

      {/* 🔹 Sticky Add Button */}
      <Link
        to="/add-pitch"
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
      >
        ➕
      </Link>
    </div>
    </>
  );
};

export default Dashboard;
