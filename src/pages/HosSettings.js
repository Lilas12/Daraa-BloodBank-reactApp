import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdDeleteOutline,
  MdDeviceThermostat,
  MdVerifiedUser,
  MdHistoryEdu,
  MdClose,
} from "react-icons/md";

const GlobalStyle = createGlobalStyle`
  body {
    background: #f8fafc;
    font-family: 'Cairo', sans-serif;
    direction: rtl;
    margin: 0;
    color: #1e293b;
  }
  * { box-sizing: border-box; transition: all 0.2s ease; }
`;

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  @media (min-width: 768px) {
    padding: 40px;
  }
`;

// Responsiv Grid
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-bottom: 30px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 24px;
  padding: 20px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

const UserItem = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #f8fafc;
  border-radius: 16px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-bottom: 10px;
  font-family: inherit;
  outline: none;
  &:focus {
    border-color: #e11d48;
  }
`;

export default function ResponsiveBloodBank() {
  const [users, setUsers] = useState([
    { id: 1, name: "د. يوسف العلي", role: "مدير" },
    { id: 2, name: "ليلى حسن", role: "فنية" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", role: "" });

  // FUNKTIONER SOM FUNGERAR
  const addUser = () => {
    if (newUser.name && newUser.role) {
      setUsers([...users, { ...newUser, id: Date.now() }]);
      setNewUser({ name: "", role: "" });
      setShowModal(false);
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <AppContainer>
      <GlobalStyle />

      <header style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1 style={{ fontWeight: 900, fontSize: "1.8rem", margin: 0 }}>
          إعدادات بنك الدم 🩸
        </h1>
        <p style={{ color: "#64748b" }}>إدارة الطاقم والمراقبة الحيوية</p>
      </header>

      {/* Stats - Blir rader på mobil, kolumner på dator */}
      <StatsGrid>
        <Card whileHover={{ scale: 1.02 }}>
          <MdDeviceThermostat size={24} color="#e11d48" />
          <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>الحرارة</div>
          <div style={{ fontWeight: "900" }}>-4.5°C</div>
        </Card>
        <Card whileHover={{ scale: 1.02 }}>
          <MdVerifiedUser size={24} color="#10b981" />
          <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>الحماية</div>
          <div style={{ fontWeight: "900" }}>نشط</div>
        </Card>
        <Card whileHover={{ scale: 1.02 }}>
          <MdHistoryEdu size={24} color="#3b82f6" />
          <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>العمليات</div>
          <div style={{ fontWeight: "900" }}>12 اليوم</div>
        </Card>
      </StatsGrid>

      <MainGrid>
        {/* Vänster: Användarlista */}
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: 0 }}>فريق العمل</h3>
            <button
              onClick={() => setShowModal(true)}
              style={{
                background: "#e11d48",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              + عضو جديد
            </button>
          </div>

          <AnimatePresence>
            {users.map((user) => (
              <UserItem
                key={user.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      background: "#fee2e2",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      color: "#e11d48",
                    }}
                  >
                    {user.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                      {user.role}
                    </div>
                  </div>
                </div>
                <MdDeleteOutline
                  size={20}
                  color="#cbd5e1"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteUser(user.id)}
                />
              </UserItem>
            ))}
          </AnimatePresence>
        </Card>

        {/* Höger: Logg (Syns under på mobil) */}
        <Card style={{ background: "#1e293b", color: "white" }}>
          <h3 style={{ fontSize: "0.9rem", margin: "0 0 15px" }}>
            النشاط المباشر 📡
          </h3>
          <div
            style={{
              fontSize: "0.75rem",
              fontFamily: "monospace",
              opacity: 0.8,
            }}
          >
            <p>• فحص المبردات: سليم</p>
            <p>• مزامنة السحابة: ناجحة</p>
            <p>• تحديث الصلاحيات: الآن</p>
          </div>
        </Card>
      </MainGrid>

      {/* Modal för att lägga till (Responsiv) */}
      <AnimatePresence>
        {showModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              zIndex: 100,
            }}
          >
            <Card
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              style={{ width: "100%", maxWidth: "400px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <h3 style={{ margin: 0 }}>إضافة موظف</h3>
                <MdClose
                  onClick={() => setShowModal(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Input
                placeholder="اسم الموظف"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <Input
                placeholder="المسمى الوظيفي"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              />
              <button
                onClick={addUser}
                style={{
                  width: "100%",
                  background: "#e11d48",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                حفظ العضو
              </button>
            </Card>
          </div>
        )}
      </AnimatePresence>
    </AppContainer>
  );
}
