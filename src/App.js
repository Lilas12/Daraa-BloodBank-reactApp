import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import "./AppLayout.css";
import Navbar from "./components/layout/HosNavbar"; // Din nya Navbar med ikoner
import Dashboard from "./pages/HospitalDashboard";
import Patients from "./pages/HosPatients";
import Settings from "./pages/HosSettings";
import Statistics from "./pages/HosStatistics";
import Notifications from "./pages/HosNotifications";
import InventoryPage from "./pages/HosInventoryPage";
import BloodShopPage from "./pages/BloodShopPage";
import RequestBlood from "./components/hospital/HosRequestBlood";
import Emergency from "./components/hospital/HosEmergency";
import Login from "./components/HosLogin";
import Footer from "./components/HosFooter";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (window.confirm("هل أنت متأكد من تسجيل الخروج؟")) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <>
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <div className="app-main-layout">
          <Navbar user={user} onLogout={handleLogout} />

          <main className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/request-blood" element={<RequestBlood />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/blood-orders" element={<BloodShopPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
