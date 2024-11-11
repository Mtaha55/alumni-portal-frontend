import React, { useEffect, useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminPages from "./Pages/AdminPage";
import EditUserProfile from "./Pages/EditUserProfile";
import UserWall from "./Pages/UserWall";
import UserProfile from "./Pages/UserProfile";
import AdminChangePassword from "./Pages/AdminChangePassword"; // Importera komponenten
import { UserProfileProvider } from "./Utils/UserProfileContext";
import "./CSS/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [resetFormTrigger, setResetFormTrigger] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleResetRegisterForm = useCallback(() => {
    setResetFormTrigger((prev) => !prev);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };

  return (

    <UserProfileProvider>
      <Router>
        <div>
          <Header
            onResetRegisterForm={handleResetRegisterForm}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />
          <Routes>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/register" element={<Register />} /> {/* Add the route for registration */}
          </Routes>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/register"
              element={<Register resetFormTrigger={resetFormTrigger} />}
            />
            <Route path="/admin" element={<AdminPages />} />
            <Route path="/editprofile" element={<EditUserProfile />} />
            <Route path="/profilewall" element={<UserWall />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route
              path="/admin-change-password"
              element={<AdminChangePassword />}
            />{" "}
            {/* Lägg till routen */}
            <Route
              path="*"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProfileProvider>
  );
};

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isFirstLogin = localStorage.getItem("isFirstLogin") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    } else if (isFirstLogin) {
      navigate("/editprofile");
      localStorage.setItem("isFirstLogin", "false");
    }
  }, [navigate]);

  return children;
};

export default App;
