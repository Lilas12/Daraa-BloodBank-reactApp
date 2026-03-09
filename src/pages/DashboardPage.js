import React from "react";
import styled, { keyframes, css } from "styled-components";
import { useNavigate } from "react-router-dom";

// --- 1. Definition av Animationer ---
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 20, 60, 0.4); }
  70% { transform: scale(1.03); box-shadow: 0 0 0 10px rgba(220, 20, 60, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 20, 60, 0); }
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
    padding: 50px;
    border-radius: 35px;
    margin-bottom: 40px;
  }

  h1 {
    font-size: 1.8rem;
    margin: 0;
    font-weight: 900;
    @media (min-width: 768px) {
      font-size: 2.8rem;
    }
  }

  p {
    opacity: 0.9;
    margin-top: 8px;
    font-size: 1.1rem;
    font-weight: 300;
    @media (min-width: 768px) {
      font-size: 1.3rem;
      margin-top: 12px;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-bottom: 40px;
  }
`;

const MainContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;

  @media (min-width: 1024px) {
    grid-template-columns: 2.2fr 1fr;
    gap: 35px;
  }
`;

const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }

  @media (min-width: 768px) {
    gap: 25px;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 24px;
  padding: 20px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (min-width: 768px) {
    border-radius: 30px;
    padding: 30px;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.07);
    .icon-box {
      transform: scale(1.1) rotate(5deg);
    }
  }
`;

const BloodCard = styled.div`
  background: white;
  padding: 20px 10px;
  border-radius: 20px;
  border: 2px solid #f1f5f9;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.color};
    background: ${(props) => props.color}05;
  }

  ${(props) =>
    props.lowStock &&
    css`
      animation: ${pulseAnimation} 2s infinite ease-in-out;
      border-color: #fee2e2;
      background-color: #fffafa;
    `}
`;

const IconBox = styled.div`
  background: ${(props) => props.color}15;
  color: ${(props) => props.color};
  padding: 14px;
  border-radius: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    padding: 18px;
    border-radius: 20px;
  }
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  border-radius: 16px;
  transition: background 0.2s ease;
  animation: ${slideIn} 0.4s ease-out forwards;
  opacity: 0;
  animation-delay: ${(props) => props.delay}s;

  &:hover {
    background: #f1f5f9;
  }
`;

const ProgressBase = styled.div`
  height: 8px;
  background: #f1f5f9;
  border-radius: 20px;
  margin: 12px 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background: ${(props) => props.color};
  border-radius: 20px;
  transition: width 1.2s cubic-bezier(0.1, 0.5, 0.5, 1);
`;

const StatusBadge = styled.span`
  background: ${(props) => props.color}15;
  color: ${(props) => props.color};
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  backdrop-filter: blur(4px);
  white-space: nowrap;

  @media (min-width: 768px) {
    padding: 8px 16px;
    border-radius: 12px;
    font-size: 0.85rem;
  }
`;

const QuickButton = styled.button`
  padding: 12px 24px;
  border-radius: 16px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3);
  transition: all 0.3s ease;
  width: fit-content;

  @media (min-width: 768px) {
    padding: 14px 28px;
    border-radius: 18px;
    font-size: 1rem;
  }

  &:hover {
    transform: scale(1.05);
    background: #dc2626;
    box-shadow: 0 15px 25px rgba(239, 68, 68, 0.4);
  }
`;

// --- 3. DashboardPage Komponent ---
const DashboardPage = () => {
  const navigate = useNavigate();

  const bloodInventory = [
    { type: "A+", count: 45, lowStock: false, color: "#DC143C" },
    { type: "A-", count: 15, lowStock: true, color: "#FF6B6B" },
    { type: "B+", count: 38, lowStock: false, color: "#1E6BD6" },
    { type: "B-", count: 22, lowStock: true, color: "#4ECDC4" },
    { type: "AB+", count: 12, lowStock: true, color: "#6F42C1" },
    { type: "AB-", count: 8, lowStock: true, color: "#EC4899" },
    { type: "O+", count: 62, lowStock: false, color: "#28A745" },
    { type: "O-", count: 29, lowStock: false, color: "#10B981" },
  ];

  const summaryStats = [
    {
      title: "إجمالي المتبرعين",
      value: "1,254",
      color: "#3B82F6",
      icon: "fa-users",
    },
    { title: "وحدات متاحة", value: "892", color: "#EF4444", icon: "fa-tint" },
    { title: "المخزون الكلي", value: "231", color: "#10B981", icon: "fa-box" },
  ];

  return (
    <PageContainer>
      <WelcomeBanner>
        <div>
          <h1>بنك الدم الوطني - درعا</h1>
          <p>مرحباً بك مجدداً في نظام الإدارة المركزي</p>
        </div>
        <QuickButton onClick={() => navigate("/add")}>
          <i className="fas fa-plus-circle" style={{ marginLeft: "10px" }}></i>
          إضافة تبرع جديد
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
              <IconBox color={s.color} className="icon-box">
                <i className={`fas ${s.icon} fa-xl`}></i>
              </IconBox>
              <StatusBadge color={s.color}>
                <i
                  className="fas fa-arrow-up"
                  style={{ marginLeft: "5px" }}
                ></i>
                5%
              </StatusBadge>
            </div>
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ color: "#64748b", margin: 0, fontSize: "1rem" }}>
                {s.title}
              </h4>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "900",
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
              marginBottom: "25px",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "800" }}>
              <i
                className="fas fa-chart-pie"
                style={{ marginLeft: "10px", color: "#ef4444" }}
              ></i>
              حالة المخزون
            </h3>
            <StatusBadge color="#1e293b">تحديث تلقائي</StatusBadge>
          </div>
          <InventoryGrid>
            {bloodInventory.map((blood, i) => (
              <BloodCard key={i} lowStock={blood.lowStock} color={blood.color}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "900",
                    color: blood.color,
                  }}
                >
                  {blood.type}
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    margin: "5px 0",
                    fontWeight: "600",
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
            <h3
              style={{
                marginBottom: "20px",
                fontSize: "1.3rem",
                fontWeight: "800",
              }}
            >
              <i
                className="fas fa-clock"
                style={{ marginLeft: "10px", color: "#3b82f6" }}
              ></i>
              مواعيد اليوم
            </h3>
            {[
              { name: "أحمد محمد", time: "10:00 ص", type: "تبرع دم" },
              { name: "سارة خالد", time: "11:30 ص", type: "تبرع بلازما" },
              { name: "محمد علي", time: "02:00 م", type: "تبرع دم" },
            ].map((app, i) => (
              <ListItem key={i} delay={i * 0.1}>
                <div>
                  <div
                    style={{
                      fontWeight: "700",
                      color: "#1e293b",
                      fontSize: "0.95rem",
                    }}
                  >
                    {app.name}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    {app.type}
                  </div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontWeight: "800",
                      color: "#3b82f6",
                      fontSize: "0.9rem",
                    }}
                  >
                    {app.time}
                  </div>
                </div>
              </ListItem>
            ))}
          </Card>

          <Card
            style={{
              background: "linear-gradient(135deg, #fff1f2 0%, #fff 100%)",
              borderColor: "#fecaca",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <IconBox
                color="#ef4444"
                style={{
                  padding: "8px",
                  borderRadius: "10px",
                  marginLeft: "12px",
                }}
              >
                <i className="fas fa-exclamation-triangle"></i>
              </IconBox>
              <h4
                style={{
                  color: "#991b1b",
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: "800",
                }}
              >
                تنبيه عاجل
              </h4>
            </div>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#b91c1c",
                lineHeight: "1.5",
                margin: 0,
              }}
            >
              يوجد نقص حاد في فصيلة{" "}
              <span style={{ fontWeight: "900" }}>O-</span>.
            </p>
          </Card>
        </div>
      </MainContentGrid>
    </PageContainer>
  );
};

export default DashboardPage;
