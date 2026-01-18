import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const DashboardWrapper = styled.div`
  background: #f4f7f6;
  min-height: 100vh;
  padding: 30px;
  direction: rtl;
  font-family: "Cairo", sans-serif;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-right: 5px solid ${(props) => props.color};
`;

const AlertBanner = styled.div`
  background: #ffeded;
  color: #d63031;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: bold;
  animation: ${pulse} 2s infinite;
  border: 1px solid #ffbcbc;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const ChartBox = styled.div`
  background: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;

const InfoBox = styled.div`
  background: #1e272e;
  color: white;
  padding: 25px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

function UltimateBloodBankDashboard() {
  const [bloodData, setBloodData] = useState([42, 12, 28, 8, 15, 6, 58, 22]);
  const labels = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    const timer = setInterval(() => {
      setBloodData((prev) =>
        prev.map((v) =>
          Math.max(2, Math.min(100, v + (Math.floor(Math.random() * 5) - 2))),
        ),
      );
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const total = bloodData.reduce((a, b) => a + b, 0);
  const isCritical = bloodData.some((v) => v < 10);

  return (
    <DashboardWrapper>
      <header style={{ marginBottom: "30px" }}>
        <h1 style={{ color: "#2d3436" }}>نظام إدارة مخزون الدم الذكي</h1>
        <p style={{ color: "#636e72" }}>مراقبة حية وتنبؤات آلية للمخزون</p>
      </header>

      {isCritical && (
        <AlertBanner>
          <span>⚠️</span>
          تنبيـه: تم رصد نقص حاد في فصائل الدم السالبة، يرجى تفعيل بروتوكول
          الطوارئ.
        </AlertBanner>
      )}

      <StatsGrid>
        <StatCard color="#00d2d3">
          <div>
            <small>إجمالي الوحدات</small>
            <h3>{total} كيس</h3>
          </div>
          <span style={{ fontSize: "2rem" }}>📦</span>
        </StatCard>
        <StatCard color="#ff6b6b">
          <div>
            <small>فصائل تحت الخطر</small>
            <h3>{bloodData.filter((v) => v < 10).length} فصائل</h3>
          </div>
          <span style={{ fontSize: "2rem" }}>🆘</span>
        </StatCard>
        <StatCard color="#1dd1a1">
          <div>
            <small>المتبرعون اليوم</small>
            <h3>18 متبرع</h3>
          </div>
          <span style={{ fontSize: "2rem" }}>🙋‍♂️</span>
        </StatCard>
      </StatsGrid>

      <MainContent>
        <ChartBox>
          <h3 style={{ marginBottom: "20px" }}>المخزون اللحظي (بالوحدات)</h3>
          <div style={{ height: "350px" }}>
            <Bar
              data={{
                labels,
                datasets: [
                  {
                    label: "الكمية المتوفرة",
                    data: bloodData,
                    backgroundColor: bloodData.map((v) =>
                      v < 10 ? "#ff6b6b" : "#48dbfb",
                    ),
                    borderRadius: 8,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </ChartBox>

        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          <ChartBox>
            <h3>توزيع الفصائل</h3>
            <div style={{ height: "200px" }}>
              <Doughnut
                data={{
                  labels,
                  datasets: [
                    {
                      data: bloodData,
                      backgroundColor: [
                        "#ff9f43",
                        "#ee5253",
                        "#0abde3",
                        "#10ac84",
                        "#5f27cd",
                        "#ff9ff3",
                        "#222f3e",
                        "#feca57",
                      ],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom" } },
                }}
              />
            </div>
          </ChartBox>

          <InfoBox>
            <h3 style={{ color: "#0abde3" }}>تحليل النظام الذكي</h3>
            <p>
              ● الفصيلة الأكثر طلباً: <strong>O-</strong>
            </p>
            <p>
              ● معدل الاستهلاك: <strong>3.5 كيس/ساعة</strong>
            </p>
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "10px",
                borderRadius: "10px",
                fontSize: "0.9rem",
              }}
            >
              توقعات النظام: المخزون الحالي يكفي لمدة <strong>14 ساعة</strong>{" "}
              قادمة في الحالات العادية.
            </div>
          </InfoBox>
        </div>
      </MainContent>
    </DashboardWrapper>
  );
}

export default UltimateBloodBankDashboard;
