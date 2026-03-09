import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import "./AppLayout.css";
import Navbar from "./components/layout/HosNavbar"; // Din nya Navbar med ikoner
// import Dashboard from "./pages/HospitalDashboard";
import Aappointment from "./pages/AppointmentsPage";
import Settings from "./pages/HosSettings";
import Statistics from "./pages/HosStatistics";
import Notifications from "./pages/HosNotifications";
import InventoryPage from "./pages/HosInventoryPage";
import BloodShopPage from "./pages/BloodShopPage";
import DashboardPage from "./pages/DashboardPage";
import ReportsPage from "./pages/ReportsPage";
import Login from "./components/HosLogin";
import RequestBlood from "./components/hospital/HosRequestBlood";
import Emergency from "./components/hospital/HosEmergency";

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
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/appointments" element={<Aappointment />} />
              <Route path="/request-blood" element={<RequestBlood />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/blood-orders" element={<BloodShopPage />} />
              <Route path="/" element={<DashboardPage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/reports" element={<ReportsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase"; // Se till att sökvägen till din firebase-fil är rätt
// import "./AppLayout.css";

// // Komponenter
// import Login from "./components/HosLogin"; // Importera din nya Login-komponent
// import Navbar from "./components/layout/HosNavbar";
// import Footer from "./components/HosFooter";
// import HospitalPage from "./pages/HospitalPage";

// function App() {
//   const [user, setUser] = useState(null);
//   const [initializing, setInitializing] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setInitializing(false);
//     });
//     return unsubscribe;
//   }, []);

//   if (initializing) return null;

//   if (!user) {
//     return <Login onLogin={(loggedInUser) => setUser(loggedInUser)} />;
//   }

//   return (
//     <div className="app-main-layout">
//       {/* Skicka med user till Navbar om du vill visa e-post eller logga ut */}
//       <Navbar user={user} />

//       <main className="page-content" style={{ minHeight: "80vh" }}>
//         <Routes>
//           {/* Huvudsidan med Formulär + Tabell */}
//           <Route path="/" element={<HospitalPage />} />

//           {/* Fallback-route */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";
// import styled, { keyframes } from "styled-components";
// import { FaTint } from "react-icons/fa";
// import { motion } from "framer-motion";
// import "./AppLayout.css";

// // Komponenter
// import Login from "./components/HosLogin";
// import Navbar from "./components/layout/HosNavbar";
// import Footer from "./components/HosFooter";
// import HospitalPage from "./pages/HospitalPage";

// // --- Animationer för Loading ---
// const drop = keyframes`
//   0% { transform: translateY(-20px); opacity: 0; }
//   50% { transform: translateY(0); opacity: 1; }
//   100% { transform: translateY(10px); opacity: 0; }
// `;

// const pulse = keyframes`
//   0% { transform: scale(1); opacity: 0.5; }
//   50% { transform: scale(1.2); opacity: 1; }
//   100% { transform: scale(1); opacity: 0.5; }
// `;

// const LoadingOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: #0f172a;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   z-index: 10000;
// `;

// const BloodDrop = styled.div`
//   color: #ef4444;
//   font-size: 4rem;
//   animation: ${drop} 1.5s ease-in-out infinite;
// `;

// const LoaderCircle = styled.div`
//   width: 60px;
//   height: 60px;
//   border: 3px solid rgba(239, 68, 68, 0.1);
//   border-top: 3px solid #ef4444;
//   border-radius: 50%;
//   position: absolute;
//   animation: ${pulse} 2s infinite ease-in-out;
// `;

// function App() {
//   const [user, setUser] = useState(null);
//   const [initializing, setInitializing] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       // Vi lägger till en liten extra timeout så att man hinner se den snygga animationen
//       // och för att säkerställa att allt är renderat bakom kulisserna.
//       setTimeout(() => {
//         setUser(currentUser);
//         setInitializing(false);
//       }, 1500);
//     });
//     return unsubscribe;
//   }, []);

//   // --- 1. Visa Loading medan Firebase kollar status ---
//   if (initializing) {
//     return (
//       <LoadingOverlay>
//         <LoaderCircle />
//         <BloodDrop>
//           <FaTint />
//         </BloodDrop>
//         <h2 style={{ color: "white", marginTop: "30px", fontFamily: "Cairo" }}>
//           جاري التحقق من الاتصال...
//         </h2>
//       </LoadingOverlay>
//     );
//   }

//   // --- 2. Visa Login om användaren inte är inloggad ---
//   if (!user) {
//     return <Login onLogin={(loggedInUser) => setUser(loggedInUser)} />;
//   }

//   // --- 3. Visa Huvudappen när allt är klart ---
//   return (
//     <motion.div
//       className="app-main-layout"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       <Navbar user={user} />

//       <main className="page-content" style={{ minHeight: "80vh" }}>
//         <Routes>
//           <Route path="/" element={<HospitalPage />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>

//       <Footer />
//     </motion.div>
//   );
// }

// export default App;
