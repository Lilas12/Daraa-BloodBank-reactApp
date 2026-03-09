import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

// 1. Tvinga box-sizing på ALLT så att padding inte "skjuter ut" element
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    overflow-x: hidden; /* Förhindrar ALL horisontell scroll */
    background: #f4f7f6;
  }
`;

const DashboardWrapper = styled.div`
  width: 100%;
  max-width: 100vw; /* Aldrig bredare än skärmen */
  padding: 10px;
  direction: rtl;
  font-family: "Cairo", sans-serif;

  @media (min-width: 768px) {
    padding: 30px;
  }
`;

// 2. StatsGrid som inte kan bli för bred
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* En kolumn som standard */
  gap: 15px;
  width: 100%;
  margin-bottom: 20px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr); /* Två på små mobiler */
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr); /* Tre på dator */
  }
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  border-right: 5px solid ${(props) => props.color};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 0; /* Hindrar flex-barn från att växa utanför */

  h3 {
    font-size: 1.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

// 3. MainLayout som staplas istället för att tryckas ihop
const MainLayout = styled.div`
  display: flex;
  flex-direction: column; /* Alltid staplat på mobil */
  gap: 20px;
  width: 100%;

  @media (min-width: 1100px) {
    flex-direction: row; /* Sida vid sida bara på stora skärmar */
  }
`;

const ChartBox = styled.div`
  background: white;
  padding: 15px;
  border-radius: 20px;
  flex: 1;
  width: 100%; /* Viktigt! */
  min-width: 0;
`;

const ChartContainer = styled.div`
  position: relative;
  height: 250px; /* Lägre höjd på mobil för bättre överblick */
  width: 100%;

  @media (min-width: 768px) {
    height: 350px;
  }
`;

function UltimateDashboard() {
  const [bloodData] = useState([45, 15, 30, 10, 20, 8, 60, 25]);
  const labels = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <>
      <GlobalStyle />
      <DashboardWrapper>
        <header style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "1.4rem" }}>لوحة تحكم بنك الدم</h1>
        </header>

        <StatsGrid>
          <StatCard color="#3182ce">
            <div>
              <small>المخزon</small>
              <h3>208 وحدة</h3>
            </div>
            <span>🩸</span>
          </StatCard>
          <StatCard color="#e53e3e">
            <div>
              <small>نقص</small>
              <h3>3 فصائل</h3>
            </div>
            <span>⚠️</span>
          </StatCard>
          <StatCard color="#38a169">
            <div>
              <small>متبرعون</small>
              <h3>12 متبرع</h3>
            </div>
            <span>❤️</span>
          </StatCard>
        </StatsGrid>

        <MainLayout>
          <ChartBox>
            <h4 style={{ marginBottom: "10px" }}>توزيع المخزون</h4>
            <ChartContainer>
              <Bar
                data={{
                  labels,
                  datasets: [
                    {
                      data: bloodData,
                      backgroundColor: "#63b3ed",
                      borderRadius: 5,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true } },
                }}
              />
            </ChartContainer>
          </ChartBox>

          <div
            style={{
              background: "#1a202c",
              color: "white",
              padding: "20px",
              borderRadius: "20px",
              flex: "0.4",
            }}
          >
            <h4>تحليل ذكي</h4>
            <p
              style={{
                marginTop: "10px",
                fontSize: "0.9rem",
                color: "#a0aec0",
              }}
            >
              كل البيانات تظهر بشكل سليم داخل حدود الشاشة الآن.
            </p>
          </div>
        </MainLayout>
      </DashboardWrapper>
    </>
  );
}

export default UltimateDashboard;
