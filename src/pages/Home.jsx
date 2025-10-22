import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50 flex flex-col items-center text-center px-4">
        {/* 🌟 Hero Section */}
        <motion.div
          className="mt-20 max-w-3xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            Build Your Startup Idea with{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-blue-500 bg-clip-text text-transparent">
              AI Magic ✨
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Describe your idea — our AI will generate a startup name, tagline,
            full description, and even a landing page design for you.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/PitchGenerator"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md transition"
            >
              🚀 Start Creating
            </Link>
            <Link
              to="/favorites"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
            >
              💾 View Saved Startups
            </Link>
          </div>
        </motion.div>

        {/*  Features Section */}
        <motion.div
          className="mt-24 grid gap-8 md:grid-cols-3 max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">💡 AI-Powered Ideas</h3>
            <p className="text-gray-600">
              Enter your vision and get a creative startup name, tagline, and
              detailed pitch instantly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">🎨 Auto Landing Page</h3>
            <p className="text-gray-600">
              AI generates a complete HTML & CSS landing page based on your
              startup idea.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">🔖 Save & Manage</h3>
            <p className="text-gray-600">
              Save your favorite startup ideas and revisit them anytime in your
              dashboard.
            </p>
          </div>
        </motion.div>

        {/*  Footer */}
        <motion.footer
          className="mt-24 text-gray-500 text-sm pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Developed by Zulqarnain hasni — Powered by Gemini AI
        </motion.footer>
      </div>
    </>
  );
}
