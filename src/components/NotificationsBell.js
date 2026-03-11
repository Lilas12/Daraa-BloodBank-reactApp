import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { db } from "../firebase";
import { collection, query, onSnapshot, limit } from "firebase/firestore";
import { FaBell, FaCircle, FaExclamationTriangle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// --- Animationer för att den ska synas ---
const shake = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
  70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
`;

const BellContainer = styled(motion.div)`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 15px;
  border: 1px solid #e2e8f0;
  color: #64748b;

  &.has-new {
    animation: ${shake} 0.4s ease-in-out infinite;
    color: #ef4444;
    border-color: #fecaca;
  }
`;

const LiveBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ef4444;
  color: white;
  min-width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
  border: 2px solid white;
  animation: ${glow} 2s infinite;
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 60px;
  left: 0;
  width: 320px;
  background: white;
  border-radius: 18px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  z-index: 9999;
  direction: rtl;
  overflow: hidden;
`;

const NotificationsBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // VIKTIGT: Om 'orderBy' gör att det blir tomt, testa att ta bort den först
    // för att se om det beror på att du saknar ett index i Firebase.
    const q = query(collection(db, "notifications"), limit(10));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          console.warn("Firebase collection is empty!");
          setNotifications([]);
        } else {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // Sortera manuellt i JS om Firebase-queryn strular
          docs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          setNotifications(docs);
        }
        setError(false);
      },
      (err) => {
        console.error("Firebase Error:", err);
        setError(true);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <BellContainer
        onClick={() => setIsOpen(!isOpen)}
        className={notifications.length > 0 ? "has-new" : ""}
      >
        <FaBell size={22} />
        {notifications.length > 0 && (
          <LiveBadge>{notifications.length}</LiveBadge>
        )}
      </BellContainer>

      <AnimatePresence>
        {isOpen && (
          <Dropdown
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div
              style={{
                padding: "15px",
                borderBottom: "1px solid #f1f5f9",
                fontWeight: "bold",
              }}
            >
              الإشعارات الواردة
            </div>

            <div style={{ maxHeight: "350px", overflowY: "auto" }}>
              {error && (
                <div
                  style={{
                    padding: "20px",
                    color: "#ef4444",
                    textAlign: "center",
                  }}
                >
                  <FaExclamationTriangle /> خطأ في الاتصال
                </div>
              )}

              {notifications.length === 0 && !error ? (
                <div
                  style={{
                    padding: "30px",
                    textAlign: "center",
                    color: "#94a3b8",
                  }}
                >
                  لا يوجد بيانات حالياً
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid #f8fafc",
                      display: "flex",
                      gap: "12px",
                    }}
                  >
                    <FaCircle
                      size={8}
                      color="#ef4444"
                      style={{ marginTop: "6px" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {/* Checkar både stora och små bokstäver på fälten */}
                      <strong style={{ fontSize: "0.9rem" }}>
                        {n.title || n.Title || "إشعار"}
                      </strong>
                      <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                        {n.message || n.Message || "تمت إضافة سجل جديد"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Dropdown>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsBell;
