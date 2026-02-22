import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Editor from "@monaco-editor/react";

// 🔑 Initialize Gemini SDK
const genAI = new GoogleGenerativeAI("AIzaSyAaThT8YUlsM_Zz23xKQ4CIkNivp6EMkvc");

export default function PitchGenerator() {
  const { user, loading: authLoading } = useAuth();

  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);

  // 🆕 single editable file (HTML + internal CSS)
  const [code, setCode] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  const generateStartup = async (e) => {
    e.preventDefault();
    if (!idea.trim()) return alert("Please enter your startup idea.");
    setLoading(true);
    setResult(null);

    try {
      const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

      // 🧠 Updated prompt: internal CSS only
      const prompt = `
      You are a startup idea generator AI.
      Based on the following idea, generate:
      1. A unique startup name.
      2. A catchy tagline.
      3. A short, persuasive startup description.
      4. A simple and clean landing page as a **single HTML file** with internal CSS (inside <style> tags, not external or separate CSS).

      Idea: ${idea}

      Format your response strictly as JSON:
      {
        "name": "...",
        "tagline": "...",
        "description": "...",
        "landingPage": "<html>...</html>"
      }
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      let parsed;
      try {
        parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      } catch {
        throw new Error("Invalid JSON format received from AI.");
      }

      setResult(parsed);
      setCode(parsed.landingPage);
      setSrcDoc(parsed.landingPage);
    } catch (error) {
      console.error("AI Error:", error);
      alert("⚠️ Something went wrong while generating the startup.");
    }

    setLoading(false);
  };

  // 🔁 Update live preview
  useEffect(() => {
    const timeout = setTimeout(() => setSrcDoc(code), 400);
    return () => clearTimeout(timeout);
  }, [code]);

  const handleSave = async () => {
    if (!user) return alert("Please log in first.");
    if (!result) return;

    setSaving(true);
    try {
      await addDoc(collection(db, "startups"), {
        ...result,
        landingPageHTML: code,
        idea,
        userId: user.uid,
        createdAt: new Date(),
      });
      alert("✅ Startup idea saved successfully!");
      setResult(null);
      setIdea("");
    } catch (err) {
      console.error("Save Error:", err);
      alert("❌ Failed to save startup.");
    }
    setSaving(false);
  };

  if (authLoading)
    return <div className="text-center mt-10">Checking authentication...</div>;

  if (!user)
    return (
      <div className="text-center mt-10 text-red-600">
        Please log in to generate startup ideas.
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
        <h2 className="text-3xl font-bold mb-4 text-center">🚀 AI Startup Generator</h2>

        <form onSubmit={generateStartup} className="space-y-4">
          <textarea
            placeholder="Describe your startup idea..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-full border rounded-lg p-3"
            rows="4"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            {loading ? "Generating..." : "Generate Startup"}
          </button>
        </form>

        {result && (
          <div className="mt-6 border-t pt-4 space-y-4">
            <h3 className="text-2xl font-semibold">✨ {result.name}</h3>
            <p className="italic text-gray-700">{result.tagline}</p>
            <p>{result.description}</p>

            {/* Live Preview */}
            <div className="mt-4">
              <h4 className="font-bold mb-1">🧱 Landing Page Preview</h4>
              <iframe
                title="Landing Page Preview"
                className="w-full h-96 border rounded-lg"
                srcDoc={srcDoc}
              />
            </div>

            {/* 🧩 Editable Single Code File */}
            <details className="mt-4 border rounded-lg">
              <summary className="cursor-pointer font-semibold p-2 bg-gray-100">
                ✏️ View / Edit Landing Page Code
              </summary>
              <div className="mt-2 p-2">
                <Editor
                  height="400px"
                  defaultLanguage="html"
                  theme="vs-dark"
                  value={code}
                  onChange={(v) => setCode(v)}
                />
              </div>
            </details>

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-3"
            >
              {saving ? "Saving..." : "Save to Firebase"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
