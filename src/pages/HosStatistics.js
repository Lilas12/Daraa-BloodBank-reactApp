import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { motion, useSpring, useTransform } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// --- 1. Global Stil & Animationer ---
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Cairo', sans-serif;
  }
  body {
    background-color: #f8faf6; /* Original ljus bakgrund */
    overflow-x: hidden;
    direction: rtl;
    color: #1e293b;
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// --- 2. Komponent för siffror som rör sig KONSTANT ---
const ConstantNumber = ({ baseValue }) => {
  const [val, setVal] = useState(baseValue);
  const spring = useSpring(baseValue, { stiffness: 40, damping: 20 });
  const display = useTransform(spring, (v) => Math.floor(v).toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      // Skapar en subtil variation (+/- 2) för att simulera live-data
      const change = Math.floor(Math.random() * 5) - 2;
      setVal((prev) => prev + change);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    spring.set(val);
  }, [val, spring]);

  return <motion.span>{display}</motion.span>;
};

// --- 3. Styled Components ---
const DashboardWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  @media (min-width: 768px) {
    padding: 50px 20px;
  }
`;

const Header = styled.header`
  margin-bottom: 40px;
  text-align: center;
  @media (min-width: 768px) {
    text-align: right;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 30px;
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatCard = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  border: 1px solid #edf2f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const IconWrapper = styled.div`
  font-size: 35px;
  background: #fff5f5;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  animation: ${float} 3s ease-in-out infinite;
`;

const ChartContainer = styled.div`
  background: white;
  padding: 25px;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  border: 1px solid #edf2f7;
  height: 400px;
`;

// --- 4. Huvudkomponent ---
export default function UltimateDashboard() {
  return (
    <>
      <GlobalStyle />
      <DashboardWrapper>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: "2.2rem", fontWeight: "900", color: "#1a202c" }}
          >
            نظام الإحصائيات المباشر
          </motion.h1>
          <p style={{ color: "#718096", marginTop: "5px" }}>
            مراقبة ذكية لمخزون فصائل الدم لحظة بلحظة
          </p>
        </Header>

        <StatsGrid>
          <StatCard whileHover={{ y: -5 }}>
            <div>
              <p
                style={{
                  color: "#718096",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                المخزون الكلي
              </p>
              <h2 style={{ fontSize: "2.5rem", color: "#e53e3e" }}>
                <ConstantNumber baseValue={2480} />
              </h2>
            </div>
            <IconWrapper>🩸</IconWrapper>
          </StatCard>

          <StatCard whileHover={{ y: -5 }}>
            <div>
              <p
                style={{
                  color: "#718096",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                المتبرعون الجدد
              </p>
              <h2 style={{ fontSize: "2.5rem", color: "#38a169" }}>
                <ConstantNumber baseValue={142} />
              </h2>
            </div>
            <IconWrapper>✨</IconWrapper>
          </StatCard>

          <StatCard whileHover={{ y: -5 }}>
            <div>
              <p
                style={{
                  color: "#718096",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                إجمالي العمليات
              </p>
              <h2 style={{ fontSize: "2.5rem", color: "#2d3748" }}>
                <ConstantNumber baseValue={890} />
              </h2>
            </div>
            <IconWrapper>📊</IconWrapper>
          </StatCard>
        </StatsGrid>

        <ChartContainer>
          <h3 style={{ marginBottom: "20px", fontSize: "1.1rem" }}>
            توزيع الفصائل الحالي
          </h3>
          <div style={{ height: "300px" }}>
            <Bar
              data={{
                labels: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
                datasets: [
                  {
                    data: [420, 110, 280, 65, 590, 130, 85, 30],
                    backgroundColor: "#e53e3e",
                    borderRadius: 12,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { display: false },
                  x: {
                    grid: { display: false },
                    ticks: { font: { family: "Cairo" } },
                  },
                },
              }}
            />
          </div>
        </ChartContainer>
      </DashboardWrapper>
    </>
  );
}
