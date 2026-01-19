import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { motion } from "framer-motion";
import {
  FaDroplet,
  FaUserPlus,
  FaBell,
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaPlus,
  FaPhone,
  FaClock,
  FaTriangleExclamation,
  FaTruckFast,
} from "react-icons/fa6";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  70% { box-shadow: 0 0 0 12px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
`;

const DashboardPro = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <LoadingScreen>جاري الاتصال بقاعدة البيانات المركزية...</LoadingScreen>
    );

  return (
    <MainContainer>
      {/* 1. HEADER */}
      <HeaderSection>
        <div className="welcome">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            مشفى درعا المركزي <Badge>نظام إدارة الدم v2.5</Badge>
          </motion.h1>
          <p>
            أهلاً بك دكتور. حالة المخzون العام <strong>مستقرة</strong> مع وجود
            تنبيهات عاجلة.
          </p>
        </div>

        <HeaderActions>
          <div className="notif-bell">
            <FaBell />
            <span className="dot">3</span>
          </div>
          <UserBrief>
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff"
              alt="user"
            />
            <div className="user-text">
              <strong>د. محمد الأحمد</strong>
              <span>مسؤول المختبر</span>
            </div>
          </UserBrief>
        </HeaderActions>
      </HeaderSection>

      <StatsGrid>
        <StatCard color="#2563eb">
          <div className="icon">
            <FaDroplet />
          </div>
          <div className="data">
            <h3>1,240 مل</h3>
            <p>إجمالي المخزون</p>
            <span className="trend up">
              <FaArrowTrendUp /> +4%
            </span>
          </div>
        </StatCard>

        <StatCard color="#ef4444" isAlert>
          <div className="icon">
            <FaTriangleExclamation />
          </div>
          <div className="data">
            <h3>24</h3>
            <p>طلبات نقل طارئة</p>
            <span className="trend down">
              <FaArrowTrendDown /> عاجل
            </span>
          </div>
        </StatCard>

        <StatCard color="#10b981">
          <div className="icon">
            <FaUserPlus />
          </div>
          <div className="data">
            <h3>150</h3>
            <p>متبرع نشط</p>
            <span className="trend up">
              <FaArrowTrendUp /> +8%
            </span>
          </div>
        </StatCard>
      </StatsGrid>

      <LayoutGrid>
        <Card sectionTitle="معدل استهلاك الوحدات (أسبوعي)">
          <ChartContainer>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                data={[
                  { n: "السبت", v: 400 },
                  { n: "الأحد", v: 300 },
                  { n: "الاثنين", v: 600 },
                  { n: "الثلاثاء", v: 800 },
                  { n: "الأربعاء", v: 500 },
                  { n: "الخميس", v: 900 },
                ]}
              >
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="n"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    direction: "rtl",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#ef4444"
                  fill="url(#colorVal)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        {/* SMART EXPIRY TRACKER - den nya modulen */}
        <Card sectionTitle="تنبيهات جرد الصلاحية (Smart Tracking)">
          <ExpiryList>
            {[
              {
                id: "B-9920",
                type: "O-",
                timeLeft: "8 ساعات",
                level: "urgent",
                vol: "450ml",
              },
              {
                id: "A-4412",
                type: "A+",
                timeLeft: "22 ساعة",
                level: "urgent",
                vol: "500ml",
              },
              {
                id: "B-1022",
                type: "B+",
                timeLeft: "3 أيام",
                level: "warning",
                vol: "450ml",
              },
            ].map((item, idx) => (
              <ExpiryItem key={idx} className={item.level}>
                <div className="main-info">
                  <div className="top-row">
                    <span className="unit-id">#{item.id}</span>
                    <span className="blood-type">{item.type}</span>
                  </div>
                  <div className="bottom-row">
                    <FaClock /> <span>تنتهي خلال: {item.timeLeft}</span>
                    <span className="volume">({item.vol})</span>
                  </div>
                </div>
                <ActionButtons>
                  <button className="use-btn">استخدام</button>
                  <button className="transfer-btn">
                    <FaTruckFast /> نقل
                  </button>
                </ActionButtons>
              </ExpiryItem>
            ))}
          </ExpiryList>
          <ViewAllLink>عرض سجل الصلاحية الكامل ←</ViewAllLink>
        </Card>

        <Card sectionTitle="حالة المخزون حسب الفصيلة">
          <BloodList>
            {[
              {
                type: "O-",
                level: "15%",
                status: "حرج جداً",
                color: "#ef4444",
              },
              { type: "A+", level: "70%", status: "مستقر", color: "#2563eb" },
              { type: "B+", level: "45%", status: "تحذير", color: "#f59e0b" },
              { type: "AB-", level: "85%", status: "ممتاز", color: "#10b981" },
            ].map((item, idx) => (
              <BloodItem key={idx} color={item.color}>
                <span className="type">{item.type}</span>
                <div className="progress-track">
                  <motion.div
                    className="fill"
                    initial={{ width: 0 }}
                    animate={{ width: item.level }}
                    transition={{ duration: 1 }}
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <span className="val" style={{ color: item.color }}>
                  {item.status}
                </span>
              </BloodItem>
            ))}
          </BloodList>
        </Card>

        <Card sectionTitle="متبرعون جاهزون للاستجابة">
          <HeroList>
            {[
              {
                name: "سامر القاسم",
                blood: "O-",
                phone: "0933",
                last: "منذ شهرين",
              },
              {
                name: "ليلى مراد",
                blood: "O-",
                phone: "0944",
                last: "منذ 4 أشهر",
              },
            ].map((hero, i) => (
              <div key={i} className="hero-row">
                <div className="hero-avatar">{hero.blood}</div>
                <div className="hero-info">
                  <strong>{hero.name}</strong>
                  <span>آخر تبرع: {hero.last}</span>
                </div>
                <a href="/" className="call-btn">
                  <FaPhone />
                </a>
              </div>
            ))}
          </HeroList>
        </Card>
      </LayoutGrid>

      <FloatingActions>
        <ActionButton
          className="primary"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus /> تسجيل متبرع
        </ActionButton>
        <ActionButton
          className="danger"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDroplet /> طلب دم طارئ
        </ActionButton>
      </FloatingActions>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  padding: 40px;
  background: #f8fafc;
  min-height: 100vh;
  direction: rtl;
  font-family: "Cairo", sans-serif;
  color: #1e293b;
`;

const Badge = styled.span`
  background: #fee2e2;
  color: #ef4444;
  font-size: 0.7rem;
  padding: 4px 12px;
  border-radius: 50px;
  margin-right: 12px;
  font-weight: 700;
`;

const HeaderSection = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  h1 {
    font-size: 1.8rem;
    font-weight: 900;
    margin-bottom: 5px;
  }
  p {
    color: #64748b;
    font-size: 0.95rem;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  .notif-bell {
    position: relative;
    font-size: 1.5rem;
    color: #64748b;
    cursor: pointer;
    .dot {
      position: absolute;
      top: -3px;
      left: -3px;
      background: #ef4444;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      color: white;
      font-size: 0.7rem;
      display: grid;
      place-items: center;
      border: 2px solid #f8fafc;
    }
  }
`;

const UserBrief = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 8px 18px;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  img {
    width: 40px;
    border-radius: 50%;
    border: 2px solid #ef4444;
  }
  .user-text {
    display: flex;
    flex-direction: column;
    strong {
      font-size: 0.85rem;
    }
    span {
      font-size: 0.75rem;
      color: #64748b;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 28px;
  display: flex;
  gap: 20px;
  align-items: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.02);
  ${(props) =>
    props.isAlert &&
    css`
      border: 2px solid #fee2e2;
      animation: ${pulse} 2s infinite ease-in-out;
    `}
  .icon {
    width: 65px;
    height: 65px;
    background: ${(props) => props.color}15;
    color: ${(props) => props.color};
    border-radius: 20px;
    display: grid;
    place-items: center;
    font-size: 1.8rem;
  }
  .data h3 {
    font-size: 1.8rem;
    margin: 0;
    font-weight: 800;
  }
  .data p {
    color: #94a3b8;
    margin: 2px 0;
    font-weight: 600;
  }
  .trend {
    font-size: 0.8rem;
    font-weight: 800;
  }
  .trend.up {
    color: #10b981;
  }
  .trend.down {
    color: #ef4444;
  }
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const CardWrapper = styled.div`
  background: white;
  padding: 30px;
  border-radius: 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.02);
  .card-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    h4 {
      font-size: 1.2rem;
      margin: 0;
      font-weight: 800;
    }
    button {
      color: #cbd5e1;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
    }
  }
`;

const Card = ({ children, sectionTitle }) => (
  <CardWrapper>
    <div className="card-head">
      <h4>{sectionTitle}</h4>
      <button>•••</button>
    </div>
    {children}
  </CardWrapper>
);

const ExpiryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const ExpiryItem = styled.div`
  display: flex;
  align-items: center;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid #f1f5f9;
  transition: 0.3s;
  &:hover {
    transform: scale(1.01);
  }
  &.urgent {
    background: #fff1f2;
    border-right: 6px solid #ef4444;
  }
  &.warning {
    background: #fffbeb;
    border-right: 6px solid #f59e0b;
  }

  .main-info {
    flex: 1;
    .top-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 6px;
      .unit-id {
        font-family: monospace;
        color: #64748b;
        font-size: 0.85rem;
      }
      .blood-type {
        font-weight: 900;
        font-size: 1.2rem;
        color: #1e293b;
      }
    }
    .bottom-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      color: #475569;
      svg {
        color: #94a3b8;
      }
      .volume {
        font-weight: 700;
        color: #000;
      }
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  button {
    padding: 10px 16px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.8rem;
    cursor: pointer;
    border: none;
    transition: 0.2s;
  }
  .use-btn {
    background: #1e293b;
    color: white;
    &:hover {
      background: #000;
    }
  }
  .transfer-btn {
    background: white;
    border: 1px solid #e2e8f0;
    color: #475569;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const ViewAllLink = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #2563eb;
  font-weight: 800;
  cursor: pointer;
  font-size: 0.9rem;
`;

const BloodItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 22px;
  .type {
    width: 45px;
    font-weight: 900;
    font-size: 1.1rem;
  }
  .progress-track {
    flex: 1;
    height: 10px;
    background: #f1f5f9;
    border-radius: 20px;
    overflow: hidden;
    .fill {
      height: 100%;
      border-radius: 20px;
    }
  }
  .val {
    min-width: 70px;
    text-align: left;
    font-weight: 800;
    font-size: 0.8rem;
  }
`;

const HeroList = styled.div`
  .hero-row {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px dashed #f1f5f9;
    &:last-child {
      border: none;
    }
    .hero-avatar {
      width: 45px;
      height: 45px;
      background: #fee2e2;
      border-radius: 12px;
      display: grid;
      place-items: center;
      font-weight: 900;
      color: #ef4444;
    }
    .hero-info {
      flex: 1;
      strong {
        display: block;
        font-size: 0.95rem;
      }
      span {
        font-size: 0.8rem;
        color: #10b981;
        font-weight: 700;
      }
    }
    .call-btn {
      width: 40px;
      height: 40px;
      background: #f8fafc;
      color: #1e293b;
      border-radius: 50%;
      display: grid;
      place-items: center;
      transition: 0.2s;
      &:hover {
        background: #10b981;
        color: white;
      }
    }
  }
`;

const FloatingActions = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 100;
`;
const ActionButton = styled(motion.button)`
  border: none;
  padding: 16px 28px;
  border-radius: 20px;
  font-weight: 800;
  font-family: "Cairo";
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  &.primary {
    background: #2563eb;
    color: white;
  }
  &.danger {
    background: #ef4444;
    color: white;
  }
`;

const LoadingScreen = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  font-weight: 900;
  color: #ef4444;
  font-size: 1.5rem;
  background: #f8fafc;
`;
const ChartContainer = styled.div`
  margin-top: 15px;
`;
const BloodList = styled.div``;

export default DashboardPro;
