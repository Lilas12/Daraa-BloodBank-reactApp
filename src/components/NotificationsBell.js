import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { FaBell, FaCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const BellWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  color: #94a3b8;
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ff4757;
  color: white;
  font-size: 10px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GlassDropdown = styled(motion.div)`
  position: absolute;
  top: 60px;
  left: 0;
  width: 320px;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  z-index: 1000;
  direction: rtl;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const NotificationsBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "notifications"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifications(docs);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <BellWrapper onClick={() => setIsOpen(!isOpen)}>
        <FaBell size={20} />
        {notifications.length > 0 && <Badge>{notifications.length}</Badge>}
      </BellWrapper>

      <AnimatePresence>
        {isOpen && (
          <GlassDropdown
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              style={{
                padding: "15px",
                color: "white",
                borderBottom: "1px solid #334155",
              }}
            >
              الإشعارات
            </div>
            <div style={{ maxHeight: "350px", overflowY: "auto" }}>
              {notifications.length === 0 ? (
                <div style={{ padding: "20px", color: "#64748b" }}>
                  لا يوجد إشعارات
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid #334155",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <FaCircle
                      size={8}
                      style={{ color: "#3b82f6", marginTop: "5px" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {/* Letar efter title ELLER Title (stort T) */}
                      <div style={{ color: "white", fontWeight: "bold" }}>
                        {n.title || n.Title || "بدون عنوان"}
                      </div>
                      {/* Letar efter message ELLER Message (stort M) */}
                      <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                        {n.message || n.Message || "بدون نص"}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </GlassDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsBell;
