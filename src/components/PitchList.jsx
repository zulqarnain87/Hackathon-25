import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import Navbar from "./Navbar";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

const PitchList = () => {
  const [pitches, setPitches] = useState([]);

  useEffect(() => {
    const fetchPitches = async () => {
      const querySnapshot = await getDocs(collection(db, "pitches"));
      const pitchData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPitches(pitchData);
    };
    fetchPitches();
  }, []);

  const handleLike = async (id) => {
    const userId = auth.currentUser.uid;
    const pitchRef = doc(db, "pitches", id);
    await updateDoc(pitchRef, {
      likes: arrayUnion(userId),
    });
    alert("Added to your favorites!");
  };

  return (
    <>
    <Navbar />
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">🚀 Discover Pitches</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {pitches.map((pitch) => (
          <div
            key={pitch.id}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
          >
            <h3 className="text-xl font-semibold">{pitch.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{pitch.industry}</p>
            <p className="text-gray-800 mb-3">{pitch.description}</p>
            <button
              onClick={() => handleLike(pitch.id)}
              className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700"
            >
              ❤️ Like
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default PitchList;
