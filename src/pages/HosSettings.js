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
  body {
    background: #f0f2f9;
    font-family: 'Inter', sans-serif;
    direction: rtl;
    margin: 0;
    color: #1b2559;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  * { box-sizing: border-box; transition: border-color 0.2s; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
`;

const AppContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px; /* Mindre padding på mobil */

  @media (min-width: 768px) {
    padding: 40px 20px;
  }
`;

const HeaderSection = styled.header`
  display: flex;
  flex-direction: column; /* Stapla på mobil */
  gap: 20px;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Alltid en kolumn på mobil */
  gap: 20px;

  @media (min-width: 1100px) {
    grid-template-columns: 1fr 350px; /* Fast bredd för sidopanel på desktop */
    gap: 30px;
  }
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 24px; /* Något mindre på mobil */
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.04);
  width: 100%;

  @media (min-width: 768px) {
    border-radius: 30px;
    padding: 30px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const SearchContainer = styled.div`
  background: #f4f7fe;
  padding: 8px 15px;
  border-radius: 12px;
  border: 1px solid #e0e5f2;
  display: flex;
  align-items: center;
  flex: 1; /* Tar upp ledigt utrymme */
  max-width: 100%;

  @media (min-width: 600px) {
    max-width: 250px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Stapla info-kort på mobil */
  gap: 15px;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 850px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const UserRow = styled(motion.div)`
  display: flex;
  flex-direction: row; /* Behåll rad men tillåt radbrytning vid behov */
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 12px;
  border: 1px solid #f1f4f9;
  width: 100%;
  gap: 10px;

  @media (min-width: 768px) {
    padding: 20px;
  }
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
  width: 100%;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #10b981;
  background: #dcfce7;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  align-self: flex-start; /* Hindrar den från att sträcka ut sig på mobil */
`;

const ModalContent = styled(GlassCard)`
  width: 95%; /* Nästan full bredd på mobil */
  max-width: 450px; /* Maxbredd på desktop */
  background: #fff;
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
      const newLog = `[${actions[Math.floor(Math.random() * actions.length)]}] Activity detected at ${new Date().toLocaleTimeString()}`;
      setLogs((prev) => [newLog, ...prev].slice(0, 10));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

  return (
    <AppContainer>
      <GlobalStyle />

      <HeaderSection>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
              margin: 0,
              fontWeight: "800",
            }}
          >
            مركز التحكم
          </h1>
          <p
            style={{ color: "#a3aed0", margin: "5px 0 0", fontSize: "0.9rem" }}
          >
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
      </HeaderSection>

      <Grid>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <GlassCard layout>
            <CardHeader>
              <h2 style={{ fontSize: "1.2rem", margin: 0 }}>فريق العمل</h2>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "100%",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <SearchContainer>
                  <MdSearch color="#a3aed0" size={20} />
                  <input
                    placeholder="بحث..."
                    style={{
                      border: "none",
                      background: "transparent",
                      outline: "none",
                      marginRight: "8px",
                      width: "100%",
                      fontFamily: "inherit",
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </SearchContainer>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    background: themeColor,
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  + إضافة
                </motion.button>
              </div>
            </CardHeader>

            <LayoutGroup>
              <AnimatePresence mode="popLayout">
                {users
                  .filter((u) => u.name.includes(searchTerm))
                  .map((user, index) => (
                    <UserRow
                      key={user.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            flexShrink: 0,
                            borderRadius: "12px",
                            background: themeColor + "11",
                            color: themeColor,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {user.name[0]}
                        </div>
                        <div style={{ overflow: "hidden" }}>
                          <div
                            style={{
                              fontWeight: "700",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {user.name}
                          </div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "#a3aed0",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.7rem",
                            padding: "4px 10px",
                            background: "#f4f7fe",
                            borderRadius: "8px",
                            color: themeColor,
                            fontWeight: "700",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {user.role.split(" ")[0]}{" "}
                          {/* Förkortar rollen på mobil */}
                        </span>
                        <motion.button
                          whileHover={{ color: "#ef4444", scale: 1.1 }}
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            color: "#cbd5e1",
                            padding: "5px",
                          }}
                          onClick={() => deleteUser(user.id)}
                        >
                          <MdDeleteOutline size={20} />
                        </motion.button>
                      </div>
                    </UserRow>
                  ))}
              </AnimatePresence>
            </LayoutGroup>
          </GlassCard>

          <InfoGrid>
            <GlassCard whileHover={{ y: -5 }}>
              <MdSecurity size={24} color="#4f46e5" />
              <h3 style={{ fontSize: "1rem", margin: "10px 0" }}>الأمان</h3>
              <p style={{ fontSize: "0.75rem", color: "#a3aed0", margin: 0 }}>
                تشفير SSL مفعل (256-bit)
              </p>
            </GlassCard>
            <GlassCard whileHover={{ y: -5 }}>
              <MdStorage size={24} color="#10b981" />
              <h3 style={{ fontSize: "1rem", margin: "10px 0" }}>التخزين</h3>
              <p style={{ fontSize: "0.75rem", color: "#a3aed0", margin: 0 }}>
                42% مستخدم من 1TB
              </p>
            </GlassCard>
            <GlassCard whileHover={{ y: -5 }}>
              <MdCloudQueue size={24} color="#f59e0b" />
              <h3 style={{ fontSize: "1rem", margin: "10px 0" }}>السحابة</h3>
              <p style={{ fontSize: "0.75rem", color: "#a3aed0", margin: 0 }}>
                آخر مزامنة: الآن
              </p>
            </GlassCard>
          </InfoGrid>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <GlassCard>
            <h3
              style={{
                margin: "0 0 15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "1rem",
              }}
            >
              <MdPalette /> المظهر
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "8px",
                marginBottom: "15px",
              }}
            >
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
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setThemeColor(c)}
                  style={{
                    aspectRatio: "1/1",
                    borderRadius: "10px",
                    background: c,
                    cursor: "pointer",
                    border:
                      themeColor === c ? "3px solid #1e293b" : "2px solid #fff",
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: "0.75rem", color: "#a3aed0", margin: 0 }}>
              تغيير اللون الرئيسي للنظام.
            </p>
          </GlassCard>

          <GlassCard style={{ background: "#1b2559", color: "white" }}>
            <h3 style={{ margin: "0 0 15px", fontSize: "0.9rem" }}>
              سجل النشاط
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
                padding: "10px",
                borderRadius: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "0.85rem",
              }}
            >
              تحميل السجلات <MdArrowBack />
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
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ModalContent>
                <div
                  style={{
                    display: "flex",
                    justifyBox: "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
                    justifyContent: "space-between",
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: "1.2rem" }}>عضو جديد</h2>
                  <MdClose
                    size={24}
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
                  <div>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      الاسم بالكامل
                    </label>
                    <input
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "1px solid #e0e5f2",
                        outline: "none",
                      }}
                      placeholder="أحمد علي"
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      البريد الإلكتروني
                    </label>
                    <input
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "1px solid #e0e5f2",
                        outline: "none",
                      }}
                      placeholder="ahmed@example.com"
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    style={{
                      marginTop: "10px",
                      background: themeColor,
                      color: "white",
                      border: "none",
                      padding: "14px",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    إرسال دعوة الانضمام
                  </motion.button>
                </div>
              </ModalContent>
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
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
  padding: 20px;
`;
