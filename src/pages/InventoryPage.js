import React, { useState, useMemo } from "react";
import styled, { css } from "styled-components";
import {
  FaHistory,
  FaPlus,
  FaChartLine,
  FaTimes,
  FaShieldAlt,
  FaCheckCircle,
  FaSearch,
  FaBell,
  FaDownload,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const INITIAL_DATA = [
  {
    id: 1,
    type: "A+",
    qty: 45,
    consumption: 1.5,
    limit: 20,
    trend: "up",
    history: [
      { d: 1, q: 40 },
      { d: 2, q: 42 },
      { d: 3, q: 45 },
    ],
  },
  {
    id: 2,
    type: "O-",
    qty: 15,
    consumption: 2.1,
    limit: 25,
    trend: "down",
    history: [
      { d: 1, q: 25 },
      { d: 2, q: 20 },
      { d: 3, q: 15 },
    ],
  },
  {
    id: 3,
    type: "B+",
    qty: 72,
    consumption: 0.8,
    limit: 20,
    trend: "stable",
    history: [
      { d: 1, q: 60 },
      { d: 2, q: 68 },
      { d: 3, q: 72 },
    ],
  },
  {
    id: 4,
    type: "AB+",
    qty: 12,
    consumption: 0.4,
    limit: 15,
    trend: "down",
    history: [
      { d: 1, q: 15 },
      { d: 2, q: 14 },
      { d: 3, q: 12 },
    ],
  },
];

function BloodBankUltimate() {
  const [inventory, setInventory] = useState(INITIAL_DATA);
  const [selectedBlood, setSelectedBlood] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [logs, setLogs] = useState([
    { id: 1, time: "08:30", msg: "نظام إدارة المخزون نشط" },
  ]);

  // --- LOGIK ---

  // Notis-funktion
  const notify = (msg, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, msg, type }]);
    setTimeout(
      () => setNotifications((prev) => prev.filter((n) => n.id !== id)),
      4000,
    );

    const time = new Date().toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setLogs((prev) => [{ id, time, msg }, ...prev].slice(0, 10));
  };

  // Filtrering och Sök
  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch = item.type
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "critical"
          ? item.qty < item.limit
          : item.qty >= item.limit);
      return matchesSearch && matchesFilter;
    });
  }, [inventory, searchTerm, filter]);

  const handleQuickAdd = (id, type) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 10 } : item,
      ),
    );
    notify(`تم إضافة 10 وحدات للفصيلة ${type}`);
  };

  return (
    <Container>
      {/* Aviseringar */}
      <NotificationArea>
        <AnimatePresence>
          {notifications.map((n) => (
            <Toast
              key={n.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
            >
              <FaCheckCircle /> {n.msg}
            </Toast>
          ))}
        </AnimatePresence>
      </NotificationArea>

      <MainGrid>
        <ContentSection>
          <Header>
            <TitleArea>
              <h1>
                لوحة التحكم <span style={{ color: "#e63946" }}>الذكية</span>
              </h1>
              <p>مراقب بنك الدم الإقليمي - تحديث لحظي</p>
            </TitleArea>

            <ActionRow>
              <SearchWrapper>
                <FaSearch />
                <input
                  placeholder="بحث عن فصيلة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchWrapper>

              <FilterGroup>
                <FilterBtn
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                >
                  الكل
                </FilterBtn>
                <FilterBtn
                  active={filter === "critical"}
                  onClick={() => setFilter("critical")}
                >
                  حرج
                </FilterBtn>
                <FilterBtn
                  active={filter === "stable"}
                  onClick={() => setFilter("stable")}
                >
                  مستقر
                </FilterBtn>
              </FilterGroup>
            </ActionRow>
          </Header>

          <InventoryGrid layout>
            <AnimatePresence>
              {filteredInventory.map((item) => {
                const isCritical = item.qty < item.limit;
                return (
                  <SmartCard
                    key={item.id}
                    critical={isCritical}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CardHeader>
                      <TypeTag>{item.type}</TypeTag>
                      <TrendIcon trend={item.trend}>
                        {item.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                      </TrendIcon>
                    </CardHeader>

                    <MainStats onClick={() => setSelectedBlood(item)}>
                      <h2>{item.qty}</h2>
                      <p>وحدة مخزنة</p>
                    </MainStats>

                    <ProgressBox>
                      <div className="label">سعة المستودع</div>
                      <div className="bar">
                        <div
                          className="fill"
                          style={{
                            width: `${Math.min(item.qty, 100)}%`,
                            background: isCritical ? "#e63946" : "#2a9d8f",
                          }}
                        />
                      </div>
                    </ProgressBox>

                    <CardActions>
                      <QuickAddBtn
                        onClick={() => handleQuickAdd(item.id, item.type)}
                      >
                        <FaPlus /> إضافة سريعة
                      </QuickAddBtn>
                      <AnalyzeBtn onClick={() => setSelectedBlood(item)}>
                        <FaChartLine /> تحليل
                      </AnalyzeBtn>
                    </CardActions>
                  </SmartCard>
                );
              })}
            </AnimatePresence>
          </InventoryGrid>
        </ContentSection>

        <SidePanel>
          <SystemStatus>
            <div className="pulse-container">
              <Pulse /> مباشر
            </div>
            <h3>
              <FaShieldAlt /> حالة البنك
            </h3>
            <div className="stat-grid">
              <div className="stat">
                <span>الإجمالي</span>
                <strong>{inventory.reduce((a, b) => a + b.qty, 0)}</strong>
              </div>
              <div className="stat">
                <span>النقص</span>
                <strong style={{ color: "#e63946" }}>
                  {inventory.filter((i) => i.qty < i.limit).length}
                </strong>
              </div>
            </div>
          </SystemStatus>

          <LogSection>
            <LogHeader>
              <FaHistory /> آخر العمليات
            </LogHeader>
            <div className="log-list">
              {logs.map((log) => (
                <LogItem key={log.id}>
                  <div className="time">{log.time}</div>
                  <div className="msg">{log.msg}</div>
                </LogItem>
              ))}
            </div>
          </LogSection>

          <ButtonPanel>
            <PrimaryButton onClick={() => notify("جاري إنشاء تقرير شامل...")}>
              <FaDownload /> تصدير تقرير PDF
            </PrimaryButton>
            <SecondaryButton
              onClick={() => notify("تنبيه أرسل لجميع الأقسام", "warning")}
            >
              <FaBell /> إرسال تنبيه عام
            </SecondaryButton>
          </ButtonPanel>
        </SidePanel>
      </MainGrid>

      {/* Modal - Detaljerad Graf */}
      <AnimatePresence>
        {selectedBlood && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBlood(null)}
          >
            <Modal onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <h2>توقعات الاستهلاك: فصيلة {selectedBlood.type}</h2>
                <CloseBtn onClick={() => setSelectedBlood(null)}>
                  <FaTimes />
                </CloseBtn>
              </ModalHeader>
              <ChartWrapper>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={selectedBlood.history}>
                    <defs>
                      <linearGradient
                        id="colorBlood"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#e63946"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#e63946"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#eee"
                    />
                    <XAxis dataKey="d" hide />
                    <YAxis orientation="right" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="q"
                      stroke="#e63946"
                      fillOpacity={1}
                      fill="url(#colorBlood)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartWrapper>
              <ModalFooter>
                <div className="info">
                  الاستهلاك اليومي التقريبي: {selectedBlood.consumption} وحدة
                </div>
              </ModalFooter>
            </Modal>
          </Overlay>
        )}
      </AnimatePresence>
    </Container>
  );
}

// --- CSS STYLES ---

const Container = styled.div`
  background: #f1f5f9;
  min-height: 100vh;
  padding: 40px;
  direction: rtl;
  font-family: "Segoe UI", system-ui;
`;
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 40px;
  max-width: 1500px;
  margin: 0 auto;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;
const ContentSection = styled.div`
  order: 2;
`;
const SidePanel = styled.div`
  order: 1;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Header = styled.div`
  margin-bottom: 40px;
`;
const TitleArea = styled.div`
  h1 {
    font-size: 2.2rem;
    margin: 0;
    color: #1e293b;
  }
  p {
    color: #64748b;
    margin: 5px 0 20px;
  }
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;
const SearchWrapper = styled.div`
  background: white;
  padding: 10px 20px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 1rem;
  }
  svg {
    color: #94a3b8;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  background: #e2e8f0;
  padding: 5px;
  border-radius: 15px;
`;
const FilterBtn = styled.button`
  border: none;
  padding: 10px 25px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  background: ${(props) => (props.active ? "white" : "transparent")};
  box-shadow: ${(props) =>
    props.active ? "0 4px 6px rgba(0,0,0,0.05)" : "none"};
  transition: 0.3s;
`;

const InventoryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
`;

const SmartCard = styled(motion.div)`
  background: white;
  border-radius: 30px;
  padding: 30px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  ${(props) =>
    props.critical &&
    css`
      border-color: #fecaca;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: #e63946;
      }
    `}
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TypeTag = styled.div`
  background: #1e293b;
  color: white;
  padding: 6px 18px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1.2rem;
`;
const TrendIcon = styled.div`
  color: ${(props) => (props.trend === "up" ? "#2a9d8f" : "#e63946")};
  background: #f8fafc;
  padding: 8px;
  border-radius: 10px;
`;

const MainStats = styled.div`
  margin: 30px 0;
  cursor: pointer;
  h2 {
    font-size: 4rem;
    margin: 0;
    line-height: 1;
    color: #1e293b;
  }
  p {
    color: #94a3b8;
    font-weight: 600;
    margin: 5px 0 0;
  }
`;

const ProgressBox = styled.div`
  .label {
    font-size: 0.8rem;
    color: #64748b;
    margin-bottom: 8px;
  }
  .bar {
    height: 8px;
    background: #f1f5f9;
    border-radius: 10px;
    overflow: hidden;
    .fill {
      height: 100%;
      transition: 1s ease;
    }
  }
`;

const CardActions = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;
const QuickAddBtn = styled.button`
  background: #1e293b;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 14px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: bold;
`;
const AnalyzeBtn = styled.button`
  background: #f1f5f9;
  color: #1e293b;
  border: none;
  padding: 12px;
  border-radius: 14px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: bold;
`;

const SystemStatus = styled.div`
  background: white;
  padding: 30px;
  border-radius: 30px;
  position: relative;
  h3 {
    margin-bottom: 20px;
  }
  .pulse-container {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 0.7rem;
    color: #2a9d8f;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    .stat {
      background: #f8fafc;
      padding: 15px;
      border-radius: 20px;
      span {
        display: block;
        font-size: 0.75rem;
        color: #64748b;
      }
      strong {
        font-size: 1.4rem;
        color: #1e293b;
      }
    }
  }
`;
const Pulse = styled.div`
  width: 8px;
  height: 8px;
  background: #2a9d8f;
  border-radius: 50%;
  animation: p 2s infinite;
  @keyframes p {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.3;
      transform: scale(1.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const LogSection = styled.div`
  background: white;
  padding: 30px;
  border-radius: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const LogHeader = styled.h4`
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const LogItem = styled.div`
  display: flex;
  gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid #f8fafc;
  font-size: 0.85rem;
  .time {
    color: #cbd5e0;
    font-weight: bold;
  }
  .msg {
    color: #475569;
  }
`;

const ButtonPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const PrimaryButton = styled.button`
  background: #1e293b;
  color: white;
  border: none;
  padding: 18px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const SecondaryButton = styled.button`
  background: white;
  color: #e63946;
  border: 1px solid #fee2e2;
  padding: 18px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const NotificationArea = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Toast = styled(motion.div)`
  background: #1e293b;
  color: white;
  padding: 15px 25px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  font-weight: bold;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1500;
`;
const Modal = styled(motion.div)`
  background: white;
  width: 95%;
  max-width: 800px;
  padding: 40px;
  border-radius: 40px;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
const CloseBtn = styled.button`
  background: #f1f5f9;
  border: none;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
`;
const ChartWrapper = styled.div`
  background: #fafafa;
  padding: 20px;
  border-radius: 30px;
`;
const ModalFooter = styled.div`
  margin-top: 30px;
  font-weight: bold;
  color: #64748b;
`;

export default BloodBankUltimate;
