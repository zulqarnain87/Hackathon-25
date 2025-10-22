import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

// 🔹 Auth Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

// 🔹 Chat Pages

 import ChatWindow from "./pages/ChatWindow";

// 🔹 Other Pages
import AiChat from "./pages/AiChat";

// 🔹 Pitch System

import PitchForm from "./components/PitchForm";
import Favorites from "./components/Favorites";

function App() {
  return (
    <Router basename="/pitches-app">
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private */}
        {/* <Route
          path="/"
          element={
            <PrivateRoute>
              <ChatList />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/discover"
          element={
            <PrivateRoute>
              <Discover />
            </PrivateRoute>
          }
        /> */}

         <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        
         <Route
          path="/AiChat"
          element={
            <PrivateRoute>
              <AiChat />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/PitchGenerator"
          element={
            <PrivateRoute>
              <PitchForm />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/pitches"
          element={
            <PrivateRoute>
              <PitchList />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
       
        {/* <Route
          path="/chats"
          element={
            <PrivateRoute>
              <ChatList />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/chat/:chatId"
          element={
            <PrivateRoute>
              <ChatWindow />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
