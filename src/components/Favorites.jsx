import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";

export default function Favorites() {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null); // Track copied item

  // 🔹 Fetch user's saved startups
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      setLoading(true);

      try {
        const q = query(collection(db, "startups"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const userFavorites = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFavorites(userFavorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }

      setLoading(false);
    };

    if (user) fetchFavorites();
  }, [user]);

  // 🔹 Delete a saved startup
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this startup?")) return;

    try {
      await deleteDoc(doc(db, "startups", id));
      setFavorites((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting startup:", error);
      alert("❌ Failed to delete startup.");
    }
  };

  // 🔹 Copy full HTML (already includes internal CSS)
  const handleCopyCode = (startup) => {
    const fullCode = startup.landingPageHTML || startup.landingPage; // support both fields
    navigator.clipboard.writeText(fullCode);
    setCopiedId(startup.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (authLoading) return <div className="text-center mt-10">Checking authentication...</div>;

  if (!user)
    return (
      <div className="text-center mt-10 text-red-600">
        Please log in to view your saved startups.
      </div>
    );

  if (loading) return <div className="text-center mt-10">Loading your favorites...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">💛 Your Saved Startups</h2>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-600">You haven’t saved any startups yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {favorites.map((startup) => (
              <div
                key={startup.id}
                className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-gray-50"
              >
                <h3 className="text-2xl font-semibold mb-1">{startup.name}</h3>
                <p className="italic text-gray-600 mb-2">{startup.tagline}</p>
                <p className="text-gray-800 mb-3">{startup.description}</p>

                {/* 🔹 Landing Page Preview */}
                <div className="border rounded-lg overflow-hidden mb-4">
                  <iframe
                    title={startup.name}
                    className="w-full h-64 border-none"
                    srcDoc={
                      startup.landingPageHTML
                        ? startup.landingPageHTML
                        : startup.landingPage
                    }
                  />
                </div>

                {/* 🔹 Collapsible Code View */}
                <details className="rounded-lg border bg-white shadow-inner">
                  <summary className="cursor-pointer px-3 py-2 font-semibold bg-gray-100 rounded-t-lg">
                    🧩 View Landing Page Code
                  </summary>
                  <div className="p-3 bg-gray-900 text-green-200 font-mono text-sm rounded-b-lg overflow-auto max-h-72">
                    <pre>{startup.landingPageHTML || startup.landingPage}</pre>
                  </div>
                </details>

                {/* 🔹 Buttons */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => handleCopyCode(startup)}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"
                  >
                    {copiedId === startup.id ? "✅ Copied!" : "📋 Copy Code"}
                  </button>

                  <button
                    onClick={() => handleDelete(startup.id)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
