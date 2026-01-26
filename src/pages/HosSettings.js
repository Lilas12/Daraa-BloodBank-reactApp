import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  MdSearch,
  MdDeleteOutline,
  MdClose,
  MdPalette,
  MdArrowBack,
  MdSecurity,
  MdStorage,
  MdCloudQueue,
  MdFiberManualRecord,
} from "react-icons/md";

const GlobalStyle = createGlobalStyle`
  body { background: #f0f2f9; font-family: 'Inter', sans-serif; direction: rtl; margin: 0; color: #1b2559; overflow-x: hidden; }
  * { box-sizing: border-box; transition: border-color 0.2s; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
`;

const AppContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.04);
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #10b981;
  background: #dcfce7;
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: 600;
`;

const ActivityLog = styled.div`
  font-size: 0.8rem;
  background: #1e293b;
  color: #94a3b8;
  padding: 15px;
  border-radius: 15px;
  height: 150px;
  overflow-y: auto;
  font-family: "Courier New", monospace;
`;

export default function AdvancedSettings() {
  const [themeColor, setThemeColor] = useState("#4f46e5");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [logs, setLogs] = useState([
    "[System] Startup complete",
    "[Auth] Admin logged in",
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "د. يوسف العلي",
      role: "مدير النظام",
      status: "online",
      email: "yousef@center.com",
    },
    {
      id: 2,
      name: "سارة أحمد",
      role: "موظف استقبال",
      status: "online",
      email: "sara@center.com",
    },
    {
      id: 3,
      name: "عمر خالد",
      role: "محاسب",
      status: "offline",
      email: "omar@center.com",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const actions = ["Update", "Login", "Sync", "Backup"];
      const newLog = `[${
        actions[Math.floor(Math.random() * actions.length)]
      }] Activity detected at ${new Date().toLocaleTimeString()}`;
      setLogs((prev) => [newLog, ...prev].slice(0, 10));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

  return (
    <AppContainer>
      <GlobalStyle />

      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 style={{ fontSize: "2.2rem", margin: 0, fontWeight: "800" }}>
            مركز التحكم
          </h1>
          <p style={{ color: "#a3aed0", margin: "5px 0 0" }}>
            إدارة البنية التحتية والفريق التقني
          </p>
        </motion.div>

        <StatusIndicator>
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <MdFiberManualRecord size={12} />
          </motion.div>
          النظام يعمل بشكل مثالي
        </StatusIndicator>
      </header>

      <Grid>
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <GlassCard layout>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <h2 style={{ fontSize: "1.4rem", margin: 0 }}>
                فريق العمل المعتمد
              </h2>
              <div style={{ display: "flex", gap: "15px" }}>
                <div
                  style={{
                    background: "#f4f7fe",
                    padding: "5px 15px",
                    borderRadius: "12px",
                    border: "1px solid #e0e5f2",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MdSearch color="#a3aed0" />
                  <input
                    placeholder="بحث في الفريق..."
                    style={{
                      border: "none",
                      background: "transparent",
                      outline: "none",
                      marginRight: "8px",
                      width: "150px",
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    background: themeColor,
                    color: "white",
                    border: "none",
                    padding: "10px 25px",
                    borderRadius: "15px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    boxShadow: `0 10px 20px ${themeColor}33`,
                  }}
                >
                  + إضافة عضو
                </motion.button>
              </div>
            </div>

            <LayoutGroup>
              <AnimatePresence mode="popLayout">
                {users
                  .filter((u) => u.name.includes(searchTerm))
                  .map((user, index) => (
                    <motion.div
                      key={user.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "20px",
                        background: "#fff",
                        borderRadius: "20px",
                        marginBottom: "15px",
                        border: "1px solid #f1f4f9",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.01)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "15px",
                            background: themeColor + "11",
                            color: themeColor,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                          }}
                        >
                          {user.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: "800" }}>{user.name}</div>
                          <div style={{ fontSize: "0.8rem", color: "#a3aed0" }}>
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.75rem",
                            padding: "6px 15px",
                            background: "#f4f7fe",
                            borderRadius: "10px",
                            color: themeColor,
                            fontWeight: "700",
                          }}
                        >
                          {user.role}
                        </span>
                        <motion.button
                          whileHover={{ color: "#ef4444", scale: 1.2 }}
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            color: "#cbd5e1",
                          }}
                          onClick={() => deleteUser(user.id)}
                        >
                          <MdDeleteOutline size={24} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </LayoutGroup>
          </GlassCard>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px",
            }}
          >
            <GlassCard whileHover={{ y: -5 }}>
              <MdSecurity size={30} color="#4f46e5" />
              <h3>الأمان</h3>
              <p style={{ fontSize: "0.8rem", color: "#a3aed0" }}>
                تشفير SSL مفعل (256-bit)
              </p>
            </GlassCard>
            <GlassCard whileHover={{ y: -5 }}>
              <MdStorage size={30} color="#10b981" />
              <h3>التخزين</h3>
              <p style={{ fontSize: "0.8rem", color: "#a3aed0" }}>
                42% مستخدم من 1TB
              </p>
            </GlassCard>
            <GlassCard whileHover={{ y: -5 }}>
              <MdCloudQueue size={30} color="#f59e0b" />
              <h3>السحابة</h3>
              <p style={{ fontSize: "0.8rem", color: "#a3aed0" }}>
                آخر مزامنة: الآن
              </p>
            </GlassCard>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <GlassCard>
            <h3
              style={{
                margin: "0 0 20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <MdPalette /> تخصيص الواجهة
            </h3>
            <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
              {[
                "#4f46e5",
                "#10b981",
                "#ef4444",
                "#f59e0b",
                "#06b6d4",
                "#ec4899",
              ].map((c) => (
                <motion.div
                  key={c}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  onClick={() => setThemeColor(c)}
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "12px",
                    background: c,
                    cursor: "pointer",
                    border:
                      themeColor === c
                        ? "3px solid #1e293b"
                        : "3px solid white",
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: "0.8rem", color: "#a3aed0" }}>
              هذا اللون سيؤثر على جميع الأزرار والروابط في النظام.
            </p>
          </GlassCard>

          <GlassCard style={{ background: "#1b2559", color: "white" }}>
            <h3 style={{ margin: "0 0 15px", fontSize: "1rem" }}>
              سجل النشاط المباشر
            </h3>
            <ActivityLog>
              {logs.map((log, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "5px",
                    color: i === 0 ? themeColor : "#94a3b8",
                  }}
                >
                  {log}
                </div>
              ))}
            </ActivityLog>
            <button
              style={{
                width: "100%",
                marginTop: "15px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "white",
                padding: "12px",
                borderRadius: "15px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              تحميل السجلات الكاملة <MdArrowBack />
            </button>
          </GlassCard>
        </div>
      </Grid>

      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
            >
              <GlassCard style={{ width: "450px", background: "#fff" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                  }}
                >
                  <h2 style={{ margin: 0 }}>عضو جديد</h2>
                  <MdClose
                    size={28}
                    onClick={() => setIsModalOpen(false)}
                    style={{ cursor: "pointer" }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <label style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                    الاسم بالكامل
                  </label>
                  <input
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid #e0e5f2",
                    }}
                    placeholder="مثال: أحمد علي"
                  />

                  <label style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                    البريد الإلكتروني
                  </label>
                  <input
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid #e0e5f2",
                    }}
                    placeholder="ahmed@example.com"
                  />

                  <label style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                    مستوى الصلاحية
                  </label>
                  <select
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid #e0e5f2",
                      background: "#fff",
                    }}
                  >
                    <option>مدير (Full Access)</option>
                    <option>موظف (Standard)</option>
                    <option>مشاهد (Read Only)</option>
                  </select>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      marginTop: "10px",
                      background: themeColor,
                      color: "white",
                      border: "none",
                      padding: "15px",
                      borderRadius: "15px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    إرسال دعوة الانضمام
                  </motion.button>
                </div>
              </GlassCard>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </AppContainer>
  );
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;
