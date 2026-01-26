import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f0f2f5;
    color: #1a1c1e;
    direction: rtl;
  }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(79, 70, 229, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GlassHeader = styled(motion.nav)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(15px);
  padding: 1rem 2rem;
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  box-shadow:
    10px 10px 30px #bebebe,
    -10px -10px 30px #ffffff;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const NavItem = styled.div`
  padding: 10px 20px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 700;
  background: ${(p) => (p.active ? "#4f46e5" : "transparent")};
  color: ${(p) => (p.active ? "#fff" : "#64748b")};
  transition: 0.3s;
`;

const Card = styled(motion.div)`
  background: #f0f2f5;
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow:
    7px 7px 14px #d1d1d1,
    -7px -7px 14px #ffffff;
  position: relative;
`;

const FloatingButton = styled(motion.button)`
  background: #4f46e5;
  color: white;
  border: none;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  position: fixed;
  bottom: 30px;
  left: 30px;
  font-size: 35px;
  cursor: pointer;
  animation: ${pulse} 2s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 1rem;
`;

const StatusBadge = styled.span`
  padding: 5px 12px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: bold;
  background: ${(p) => (p.status === "حرج" ? "#fee2e2" : "#dcfce7")};
  color: ${(p) => (p.status === "حرج" ? "#ef4444" : "#16a34a")};
`;

export default function PatientDashboard() {
  const [tab, setTab] = useState("patients");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "ياسين درويش",
      age: 45,
      gender: "kille",
      status: "حرج",
      time: "10:30",
    },
    {
      id: 2,
      name: "ليلى أحمد",
      age: 32,
      gender: "tjej",
      status: "مستقر",
      time: "09:15",
    },
  ]);

  const addPatient = (e) => {
    e.preventDefault();
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const newPatient = {
      id: Date.now(),
      name: e.target.name.value,
      age: e.target.age.value,
      gender: e.target.gender.value,
      status: e.target.status.value,
      time: currentTime,
    };

    setPatients([newPatient, ...patients]);
    setIsModalOpen(false);
  };

  return (
    <AppContainer>
      <GlobalStyle />

      <GlassHeader>
        <h1 style={{ color: "#4f46e5" }}>سجل المرضى</h1>
        <div style={{ display: "flex", gap: "5px" }}>
          <NavItem
            active={tab === "patients"}
            onClick={() => setTab("patients")}
          >
            👥 المرضى
          </NavItem>
          <NavItem
            active={tab === "appointments"}
            onClick={() => setTab("appointments")}
          >
            📅 المواعيد
          </NavItem>
          <NavItem active={tab === "stats"} onClick={() => setTab("stats")}>
            📊 الإحصائيات
          </NavItem>
        </div>
      </GlassHeader>

      <AnimatePresence mode="wait">
        {/* FLIK: PATIENTER */}
        {tab === "patients" && (
          <motion.div
            key="p"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "25px",
              }}
            >
              {patients.map((p) => (
                <Card key={p.id} whileHover={{ y: -5 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>
                      {p.gender === "tjej" ? "👩" : "👨"}
                    </span>
                    <StatusBadge status={p.status}>{p.status}</StatusBadge>
                  </div>
                  <h3 style={{ marginTop: "10px" }}>{p.name}</h3>
                  <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                    العمر: {p.age} سنة
                  </p>
                  <div
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid #ddd",
                      paddingTop: "10px",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                      🕒 تم الإدخال: {p.time}
                    </span>
                    <button
                      onClick={() =>
                        setPatients(patients.filter((x) => x.id !== p.id))
                      }
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                      }}
                    >
                      حذف
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {tab === "appointments" && (
          <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>جدول المواعيد اليومية</h2>
            <div style={{ marginTop: "20px" }}>
              {patients.map((p) => (
                <Card
                  key={p.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <div>
                    <strong>{p.name}</strong>
                    <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      موعد الساعة: {p.time}
                    </p>
                  </div>
                  <StatusBadge status={p.status}>{p.status}</StatusBadge>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {tab === "stats" && (
          <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "25px",
              }}
            >
              <Card
                style={{ textAlign: "center", borderTop: "5px solid #4f46e5" }}
              >
                <small>إجمالي المسجلين</small>
                <div style={{ fontSize: "3.5rem", fontWeight: 900 }}>
                  {patients.length}
                </div>
              </Card>
              <Card
                style={{ textAlign: "center", borderTop: "5px solid #ef4444" }}
              >
                <small>الحالات الحرجة</small>
                <div
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    color: "#ef4444",
                  }}
                >
                  {patients.filter((x) => x.status === "حرج").length}
                </div>
              </Card>
              <Card
                style={{ textAlign: "center", borderTop: "5px solid #10b981" }}
              >
                <small>الحالات المستقرة</small>
                <div
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    color: "#10b981",
                  }}
                >
                  {patients.filter((x) => x.status === "مستقر").length}
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
      >
        +
      </FloatingButton>

      {/* MODAL FÖR NY PATIENT */}
      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <Card
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "450px",
                background: "#fff",
                padding: "2rem",
              }}
            >
              <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
                إضافة مريض جديد
              </h2>
              <form
                onSubmit={addPatient}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <input
                  name="name"
                  placeholder="الاسم الكامل"
                  required
                  style={inputStyle}
                />
                <input
                  name="age"
                  type="number"
                  placeholder="العمر"
                  required
                  style={inputStyle}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                  <select name="gender" style={inputStyle}>
                    <option value="kille">ذكر (Kille)</option>
                    <option value="tjej">أنثى (Tjej)</option>
                  </select>
                  <select name="status" style={inputStyle}>
                    <option value="مستقر">مستقر (Stabil)</option>
                    <option value="حرج">حرج (Kritisk)</option>
                  </select>
                </div>

                <button type="submit" style={submitBtnStyle}>
                  حفظ وإضافة الآن
                </button>
              </form>
            </Card>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </AppContainer>
  );
}

const inputStyle = {
  padding: "14px",
  borderRadius: "15px",
  border: "1px solid #e2e8f0",
  width: "100%",
  outline: "none",
  background: "#f8fafc",
};
const submitBtnStyle = {
  padding: "16px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "15px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
};
