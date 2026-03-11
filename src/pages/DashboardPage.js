import React from "react";
import styled, { keyframes, css } from "styled-components";
import { useNavigate } from "react-router-dom";

// --- 1. Animationer ---
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  70% { transform: scale(1.03); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
`;

// --- 2. Styled Components ---
const PageContainer = styled.div`
  padding: 20px;
  background-color: #f8fafc;
  min-height: 100vh;
  direction: rtl;
  font-family: "Inter", "Segoe UI", sans-serif;
  animation: ${fadeInUp} 0.6s ease-out;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const WelcomeBanner = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
  color: white;
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 40px 50px;
    border-radius: 35px;
  }

  h1 {
    font-size: 1.5rem;
    margin: 0;
    font-weight: 800;
    @media (min-width: 768px) {
      font-size: 2.2rem;
    }
  }

  p {
    opacity: 0.8;
    margin-top: 5px;
    font-size: 0.9rem;
    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const MainContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 24px;
  padding: 20px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.05);
  }
`;

const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  @media (min-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const BloodCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 18px;
  border: 2px solid #f8fafc;
  text-align: center;
  transition: 0.2s;

  ${(props) =>
    props.lowStock &&
    css`
      animation: ${pulseAnimation} 2s infinite;
      border-color: #fee2e2;
    `}
`;

const ProgressBase = styled.div`
  height: 6px;
  background: #f1f5f9;
  border-radius: 10px;
  margin: 10px 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background: ${(props) => props.color};
  border-radius: 10px;
`;

const StatusBadge = styled.span`
  background: ${(props) => props.color}15;
  color: ${(props) => props.color};
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 700;
`;

const QuickButton = styled.button`
  padding: 12px 24px;
  border-radius: 14px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
  transition: 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    transform: scale(1.03);
    background: #dc2626;
  }
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 8px;
  background: #f8fafc;
  animation: ${slideIn} 0.4s ease-out forwards;
  opacity: 0;
  animation-delay: ${(props) => props.delay}s;
`;

// --- 3. DashboardPage Komponent ---
const DashboardPage = () => {
  const navigate = useNavigate();

  const bloodInventory = [
    { type: "A+", count: 45, lowStock: false, color: "#ef4444" },
    { type: "A-", count: 15, lowStock: true, color: "#f87171" },
    { type: "B+", count: 38, lowStock: false, color: "#3b82f6" },
    { type: "B-", count: 22, lowStock: true, color: "#60a5fa" },
    { type: "AB+", count: 12, lowStock: true, color: "#8b5cf6" },
    { type: "AB-", count: 8, lowStock: true, color: "#a78bfa" },
    { type: "O+", count: 62, lowStock: false, color: "#10b981" },
    { type: "O-", count: 29, lowStock: false, color: "#34d399" },
  ];

  const summaryStats = [
    {
      title: "إجمالي المتبرعين",
      value: "1,254",
      color: "#3b82f6",
      icon: "fa-users",
    },
    { title: "وحدات متاحة", value: "892", color: "#ef4444", icon: "fa-tint" },
    { title: "المخزون الكلي", value: "231", color: "#10b981", icon: "fa-box" },
  ];

  return (
    <PageContainer>
      <WelcomeBanner>
        <div>
          <h1>بنك الدم الوطني - درعا</h1>
          <p>مرحباً بك مجدداً في نظام الإدارة المركزي</p>
        </div>

        {/* Uppdaterad knapp till bokningssidan */}
        <QuickButton onClick={() => navigate("/book-donation")}>
          <i
            className="fas fa-calendar-check"
            style={{ marginLeft: "10px" }}
          ></i>
          حجز موعد تبرع
        </QuickButton>
      </WelcomeBanner>

      <StatsGrid>
        {summaryStats.map((s, i) => (
          <Card key={i}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: s.color,
                  background: `${s.color}15`,
                  padding: "10px",
                  borderRadius: "12px",
                }}
              >
                <i className={`fas ${s.icon} fa-lg`}></i>
              </div>
              <StatusBadge color={s.color}>+ 5%</StatusBadge>
            </div>
            <div style={{ marginTop: "15px" }}>
              <h4 style={{ color: "#64748b", margin: 0, fontSize: "0.85rem" }}>
                {s.title}
              </h4>
              <p
                style={{
                  fontSize: "1.6rem",
                  fontWeight: "800",
                  margin: "5px 0",
                  color: "#1e293b",
                }}
              >
                {s.value}
              </p>
            </div>
          </Card>
        ))}
      </StatsGrid>

      <MainContentGrid>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: "800" }}>
              حالة المخزون
            </h3>
            <StatusBadge color="#64748b">تحديث مباشر</StatusBadge>
          </div>
          <InventoryGrid>
            {bloodInventory.map((blood, i) => (
              <BloodCard key={i} lowStock={blood.lowStock}>
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "900",
                    color: blood.color,
                  }}
                >
                  {blood.type}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    margin: "4px 0",
                    color: "#475569",
                  }}
                >
                  {blood.count} وحدة
                </div>
                <ProgressBase>
                  <ProgressFill
                    percentage={(blood.count / 80) * 100}
                    color={blood.color}
                  />
                </ProgressBase>
                <StatusBadge color={blood.lowStock ? "#ef4444" : "#10b981"}>
                  {blood.lowStock ? "حرج" : "آمن"}
                </StatusBadge>
              </BloodCard>
            ))}
          </InventoryGrid>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: "800" }}>
                مواعيد اليوم
              </h3>
              <span
                onClick={() => navigate("/book-donation")}
                style={{
                  fontSize: "0.7rem",
                  color: "#3b82f6",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                + حجز جديد
              </span>
            </div>
            {[
              { name: "أحمد محمد", time: "10:00 ص" },
              { name: "سارة خالد", time: "11:30 ص" },
              { name: "محمد علي", time: "02:00 م" },
            ].map((app, i) => (
              <ListItem key={i} delay={i * 0.1}>
                <span style={{ fontSize: "0.8rem", fontWeight: "600" }}>
                  {app.name}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#3b82f6",
                    fontWeight: "700",
                  }}
                >
                  {app.time}
                </span>
              </ListItem>
            ))}
          </Card>

          <Card
            style={{
              background: "linear-gradient(135deg, #fff1f2 0%, #ffffff 100%)",
              borderColor: "#fecaca",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <i
                className="fas fa-exclamation-triangle"
                style={{ color: "#ef4444" }}
              ></i>
              <h4
                style={{
                  color: "#991b1b",
                  margin: 0,
                  fontSize: "0.9rem",
                  fontWeight: "800",
                }}
              >
                تنبيه عاجل
              </h4>
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#b91c1c",
                marginTop: "8px",
              }}
            >
              يوجد نقص حاد في فصيلة{" "}
              <span style={{ fontWeight: "900" }}>O-</span>. يرجى مراجعة
              الطلبات.
            </p>
          </Card>
        </div>
      </MainContentGrid>
    </PageContainer>
  );
};

export default DashboardPage;
