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

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// --- التحريكات ---
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

// --- التنسيقات الفاخرة ---
const DashboardWrapper = styled.div`
  background: #f4f7f6;
  min-height: 100vh;
  padding: 30px;
  direction: rtl;
  font-family: 'Cairo', sans-serif;
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
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-right: 5px solid ${props => props.color};
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
  @media (max-width: 1000px) { grid-template-columns: 1fr; }
`;

const ChartBox = styled.div`
  background: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
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
      setBloodData(prev => prev.map(v => Math.max(2, Math.min(100, v + (Math.floor(Math.random() * 5) - 2)))));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const total = bloodData.reduce((a, b) => a + b, 0);
  const isCritical = bloodData.some(v => v < 10);

  return (
    <DashboardWrapper>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#2d3436' }}>نظام إدارة مخزون الدم الذكي</h1>
        <p style={{ color: '#636e72' }}>مراقبة حية وتنبؤات آلية للمخزون</p>
      </header>

      {isCritical && (
        <AlertBanner>
          <span>⚠️</span>
          تنبيـه: تم رصد نقص حاد في فصائل الدم السالبة، يرجى تفعيل بروتوكول الطوارئ.
        </AlertBanner>
      )}

      <StatsGrid>
        <StatCard color="#00d2d3">
          <div>
            <small>إجمالي الوحدات</small>
            <h3>{total} كيس</h3>
          </div>
          <span style={{ fontSize: '2rem' }}>📦</span>
        </StatCard>
        <StatCard color="#ff6b6b">
          <div>
            <small>فصائل تحت الخطر</small>
            <h3>{bloodData.filter(v => v < 10).length} فصائل</h3>
          </div>
          <span style={{ fontSize: '2rem' }}>🆘</span>
        </StatCard>
        <StatCard color="#1dd1a1">
          <div>
            <small>المتبرعون اليوم</small>
            <h3>18 متبرع</h3>
          </div>
          <span style={{ fontSize: '2rem' }}>🙋‍♂️</span>
        </StatCard>
      </StatsGrid>

      <MainContent>
        <ChartBox>
          <h3 style={{ marginBottom: '20px' }}>المخزون اللحظي (بالوحدات)</h3>
          <div style={{ height: '350px' }}>
            <Bar
              data={{
                labels,
                datasets: [{
                  label: 'الكمية المتوفرة',
                  data: bloodData,
                  backgroundColor: bloodData.map(v => v < 10 ? '#ff6b6b' : '#48dbfb'),
                  borderRadius: 8
                }]
              }}
              options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
            />
          </div>
        </ChartBox>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <ChartBox>
            <h3>توزيع الفصائل</h3>
            <div style={{ height: '200px' }}>
              <Doughnut
                data={{
                  labels,
                  datasets: [{
                    data: bloodData,
                    backgroundColor: ['#ff9f43', '#ee5253', '#0abde3', '#10ac84', '#5f27cd', '#ff9ff3', '#222f3e', '#feca57']
                  }]
                }}
                options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
              />
            </div>
          </ChartBox>

          <InfoBox>
            <h3 style={{ color: '#0abde3' }}>تحليل النظام الذكي</h3>
            <p>● الفصيلة الأكثر طلباً: <strong>O-</strong></p>
            <p>● معدل الاستهلاك: <strong>3.5 كيس/ساعة</strong></p>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px', fontSize: '0.9rem' }}>
              توقعات النظام: المخزون الحالي يكفي لمدة <strong>14 ساعة</strong> قادمة في الحالات العادية.
            </div>
          </InfoBox>
        </div>
      </MainContent>
    </DashboardWrapper>
  );
}

export default UltimateBloodBankDashboard;


// import React, { useState, useEffect } from "react";
// import styled, { keyframes } from "styled-components";
// import { Bar, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement
// );

// // --- التحريكات (Animations) ---
// const pulse = keyframes`
//   0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4); }
//   70% { box-shadow: 0 0 0 10px rgba(231, 76, 60, 0); }
//   100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
// `;

// // --- التنسيقات الفاخرة ---
// const DashboardWrapper = styled.div`
//   background: #f0f2f5;
//   min-height: 100vh;
//   padding: 30px;
//   direction: rtl;
//   font-family: "Cairo", sans-serif;
// `;

// const TopStats = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//   gap: 20px;
//   margin-bottom: 30px;
// `;

// const StatCard = styled.div`
//   background: white;
//   padding: 25px;
//   border-radius: 20px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
//   border-right: 6px solid ${(props) => props.color};
// `;

// const MainGrid = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 1fr;
//   gap: 30px;
//   @media (max-width: 1100px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const GlassPanel = styled.div`
//   background: white;
//   border-radius: 24px;
//   padding: 30px;
//   box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
//   position: relative;
// `;

// const AlertBanner = styled.div`
//   background: #fff5f5;
//   border: 1px solid #feb2b2;
//   color: #c53030;
//   padding: 15px;
//   border-radius: 12px;
//   margin-bottom: 20px;
//   display: ${(props) => (props.show ? "flex" : "none")};
//   align-items: center;
//   gap: 10px;
//   animation: ${pulse} 2s infinite;
// `;

// // --- المكون الرئيسي ---
// function UltimateProDashboard() {
//   const [bloodCounts, setBloodCounts] = useState([
//     45, 8, 30, 25, 15, 5, 60, 12,
//   ]);
//   const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());
//   const labels = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setBloodCounts((prev) =>
//         prev.map((v) =>
//           Math.max(0, Math.min(100, v + (Math.floor(Math.random() * 7) - 3)))
//         )
//       );
//       setLastUpdate(new Date().toLocaleTimeString());
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   const totalBags = bloodCounts.reduce((a, b) => a + b, 0);
//   const criticalCount = bloodCounts.filter((v) => v < 15).length;

//   const barData = {
//     labels,
//     datasets: [
//       {
//         label: "المخزون المتوفر",
//         data: bloodCounts,
//         backgroundColor: bloodCounts.map((v) =>
//           v < 15 ? "#ff4d4d" : "#2ecc71"
//         ),
//         borderRadius: 10,
//         barThickness: 30,
//       },
//     ],
//   };

//   return (
//     <DashboardWrapper>
//       <header style={{ marginBottom: "30px" }}>
//         <h1 style={{ color: "#1a202c", margin: 0 }}>
//           مركز القيادة والسيطرة - بنك الدم
//         </h1>
//         <p style={{ color: "#718096" }}>آخر تحديث للنظام: {lastUpdate}</p>
//       </header>

//       <TopStats>
//         <StatCard color="#4a90e2">
//           <div>
//             <div style={{ color: "#718096", fontSize: "0.9rem" }}>
//               إجمالي المخزون
//             </div>
//             <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
//               {totalBags} كيس
//             </div>
//           </div>
//           <div style={{ fontSize: "2.5rem" }}>🩸</div>
//         </StatCard>
//         <StatCard color="#e74c3c">
//           <div>
//             <div style={{ color: "#718096", fontSize: "0.9rem" }}>
//               فصائل تحت الخطر
//             </div>
//             <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
//               {criticalCount} فصيلة
//             </div>
//           </div>
//           <div style={{ fontSize: "2.5rem" }}>⚠️</div>
//         </StatCard>
//         <StatCard color="#2ecc71">
//           <div>
//             <div style={{ color: "#718096", fontSize: "0.9rem" }}>
//               المتبرعون اليوم
//             </div>
//             <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
//               24 متبرع
//             </div>
//           </div>
//           <div style={{ fontSize: "2.5rem" }}>✅</div>
//         </StatCard>
//       </TopStats>

//       <MainGrid>
//         <GlassPanel>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginBottom: "20px",
//             }}
//           >
//             <h3 style={{ margin: 0 }}>مراقبة المخزون اللحظي لكل فصيلة</h3>
//             <span style={{ color: "#2ecc71", fontWeight: "bold" }}>
//               ● مباشر
//             </span>
//           </div>
//           <AlertBanner show={criticalCount > 0}>
//             🔴 تنبيه: تم رصد نقص حاد في بعض الفصائل، يرجى توجيه حملات التبرع
//             فوراً.
//           </AlertBanner>
//           <div style={{ height: "400px" }}>
//             <Bar
//               data={barData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: { legend: { display: false } },
//                 scales: { y: { grid: { color: "#f0f0f0" }, max: 100 } },
//               }}
//             />
//           </div>
//         </GlassPanel>

//         <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
//           <GlassPanel>
//             <h3>توزيع الاحتياطي العام</h3>
//             <div style={{ height: "250px" }}>
//               <Doughnut
//                 data={{
//                   labels,
//                   datasets: [
//                     {
//                       data: bloodCounts,
//                       backgroundColor: [
//                         "#FF6384",
//                         "#36A2EB",
//                         "#FFCE56",
//                         "#4BC0C0",
//                         "#9966FF",
//                         "#FF9F40",
//                         "#05c46b",
//                         "#ef5777",
//                       ],
//                     },
//                   ],
//                 }}
//                 options={{
//                   maintainAspectRatio: false,
//                   plugins: { legend: { position: "bottom" } },
//                 }}
//               />
//             </div>
//           </GlassPanel>

//           <GlassPanel style={{ background: "#1a202c", color: "white" }}>
//             <h3 style={{ color: "#4a90e2" }}>إحصائيات ذكية</h3>
//             <p>
//               الفصيلة الأكثر طلباً: <b>O-</b>
//             </p>
//             <p>
//               معدل الاستهلاك الساعي: <b>4.2 كيس/ساعة</b>
//             </p>
//             <div
//               style={{
//                 marginTop: "20px",
//                 padding: "15px",
//                 background: "rgba(255,255,255,0.1)",
//                 borderRadius: "10px",
//               }}
//             >
//               توقع النظام: المخزون الحالي يكفي لـ <b>18 ساعة</b> قادمة.
//             </div>
//           </GlassPanel>
//         </div>
//       </MainGrid>
//     </DashboardWrapper>
//   );
// }

// export default UltimateProDashboard;

//  den gillar jag
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { Bar, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // --- التنسيقات الفاخرة ---
// const PageWrapper = styled.div`
//   background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//   padding: 40px;
//   min-height: 100vh;
//   direction: rtl;
//   font-family: "Cairo", sans-serif;
// `;

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 1fr;
//   gap: 25px;
//   @media (max-width: 900px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const GlassCard = styled.div`
//   background: rgba(255, 255, 255, 0.9);
//   backdrop-filter: blur(10px);
//   border-radius: 24px;
//   padding: 25px;
//   box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
//   border: 1px solid rgba(255, 255, 255, 0.18);
// `;

// const LogContainer = styled.div`
//   margin-top: 20px;
//   max-height: 200px;
//   overflow-y: auto;
// `;

// const LogItem = styled.div`
//   padding: 10px;
//   border-bottom: 1px solid #eee;
//   display: flex;
//   justify-content: space-between;
//   font-size: 0.85rem;
//   color: #555;
//   animation: slideIn 0.5s ease-out;

//   @keyframes slideIn {
//     from {
//       opacity: 0;
//       transform: translateX(20px);
//     }
//     to {
//       opacity: 1;
//       transform: translateX(0);
//     }
//   }
// `;

// function UltimateBloodDashboard() {
//   const [bloodCounts, setBloodCounts] = useState([
//     45, 15, 30, 10, 20, 5, 55, 25,
//   ]);
//   const [logs, setLogs] = useState([
//     { id: 1, text: "تبرع جديد فصيلة O+", time: "10:30" },
//     { id: 2, text: "سحب طارئ فصيلة AB-", time: "10:15" },
//   ]);

//   const labels = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // تحديث الأرقام
//       const randomIndex = Math.floor(Math.random() * labels.length);
//       const isIncrease = Math.random() > 0.5;

//       setBloodCounts((prev) => {
//         const newData = [...prev];
//         const change = isIncrease ? 1 : -1;
//         newData[randomIndex] = Math.max(0, newData[randomIndex] + change);
//         return newData;
//       });

//       // إضافة سجل جديد
//       const newLog = {
//         id: Date.now(),
//         text: isIncrease
//           ? `تبرع جديد فصيلة ${labels[randomIndex]}`
//           : `صرف كيس فصيلة ${labels[randomIndex]} للعمليات`,
//         time: new Date().toLocaleTimeString("ar-EG", {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };
//       setLogs((prev) => [newLog, ...prev].slice(0, 5));
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   const barData = {
//     labels,
//     datasets: [
//       {
//         label: "المخزون اللحظي",
//         data: bloodCounts,
//         backgroundColor: bloodCounts.map((v) =>
//           v < 12 ? "#ff4d4d" : "#00a8a8"
//         ),
//         borderRadius: 12,
//       },
//     ],
//   };

//   const donutData = {
//     labels,
//     datasets: [
//       {
//         data: bloodCounts,
//         backgroundColor: [
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//           "#FF9F40",
//           "#C9CBCF",
//           "#74B9FF",
//         ],
//         hoverOffset: 20,
//       },
//     ],
//   };

//   return (
//     <PageWrapper>
//       <h1
//         style={{ textAlign: "center", color: "#2d3436", marginBottom: "40px" }}
//       >
//         نظام الرصد اللحظي لبنك الدم
//       </h1>

//       <Grid>
//         {/* الرسم البياني الرئيسي */}
//         <GlassCard>
//           <h3>تحليل المخزون التفصيلي</h3>
//           <div style={{ height: "350px" }}>
//             <Bar
//               data={barData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: { legend: { display: false } },
//               }}
//             />
//           </div>
//         </GlassCard>

//         {/* توزيع النسب والسجلات */}
//         <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
//           <GlassCard>
//             <h3>توزيع الفصائل (%)</h3>
//             <div style={{ height: "200px" }}>
//               <Doughnut
//                 data={donutData}
//                 options={{ maintainAspectRatio: false }}
//               />
//             </div>
//           </GlassCard>

//           <GlassCard>
//             <h3>آخر النشاطات</h3>
//             <LogContainer>
//               {logs.map((log) => (
//                 <LogItem key={log.id}>
//                   <span>{log.text}</span>
//                   <span style={{ fontWeight: "bold" }}>{log.time}</span>
//                 </LogItem>
//               ))}
//             </LogContainer>
//           </GlassCard>
//         </div>
//       </Grid>
//     </PageWrapper>
//   );
// }

// export default UltimateBloodDashboard;
// import React from "react";
// import { FaChartBar } from "react-icons/fa";

// function Statistics() {
//   return (
//     <div>
//       <h3>الإحصائيات</h3>
//       <div className="chart-placeholder">
//         <FaChartBar size={100} />
//         <p>رسم بياني للطلبات والمخزون (يمكن إضافة مكتبة مثل Chart.js)</p>
//       </div>
//     </div>
//   );
// }

// export default Statistics;

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Registrera Chart.js-komponenter
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // Styled Components baserat på dina grundläggande färger
// const Container = styled.div`
//   background: var(--card-bg);
//   padding: 20px;
//   border-radius: 12px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   margin: 20px 0;
//   color: var(--text-main, #333); /* Anpassar för mörkt tema */
// `;

// const StyledTitle = styled.h3`
//   color: var(--primary-navy);
//   font-family: var(--font-family);
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const ChartContainer = styled.div`
//   position: relative;
//   height: 400px;
//   width: 100%;
//   background: var(--bg-white);
//   border-radius: 8px;
//   padding: 10px;
//   box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
// `;

// const LoadingText = styled.p`
//   text-align: center;
//   color: var(--medical-teal);
//   font-style: italic;
// `;

// const ErrorText = styled.p`
//   text-align: center;
//   color: var(--emergency-red);
//   font-weight: bold;
// `;

// function Statistics() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Simulera hämtning av data (ersätt med riktiga API-anrop)
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         // Exempeldata: Antal förfrågningar och lager per månad
//         const exampleData = {
//           labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
//           datasets: [
//             {
//               label: "الطلبات",
//               data: [12, 19, 3, 5, 2, 3],
//               backgroundColor: "var(--medical-teal)",
//               borderColor: "var(--primary-navy)",
//               borderWidth: 1,
//             },
//             {
//               label: "المخزون",
//               data: [2, 3, 20, 5, 1, 4],
//               backgroundColor: "var(--medical-green)",
//               borderColor: "var(--primary-navy)",
//               borderWidth: 1,
//             },
//           ],
//         };
//         setTimeout(() => {
//           setData(exampleData);
//           setLoading(false);
//         }, 1000); // Simulerad fördröjning
//       } catch (err) {
//         setError("فشل في تحميل البيانات");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           font: {
//             family: "var(--font-family)",
//           },
//         },
//       },
//       title: {
//         display: true,
//         text: "إحصائيات الطلبات والمخزون",
//         font: {
//           family: "var(--font-family)",
//           size: 16,
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: "var(--border)",
//         },
//       },
//       x: {
//         grid: {
//           color: "var(--border)",
//         },
//       },
//     },
//   };

//   return (
//     <Container>
//       <StyledTitle>الإحصائيات</StyledTitle>
//       {loading && <LoadingText>جاري تحميل البيانات...</LoadingText>}
//       {error && <ErrorText>{error}</ErrorText>}
//       {!loading && !error && data && (
//         <ChartContainer>
//           <Bar data={data} options={options} />
//         </ChartContainer>
//       )}
//     </Container>
//   );
// }

// export default Statistics;

// Den här är bra
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title as ChartTitle,
//   Tooltip,
//   Legend,
//   Filler
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend, Filler);

// // --- التنسيقات المتطورة (Styled Components) ---
// const DashboardContainer = styled.div`
//   background: #f8f9fa;
//   padding: 30px;
//   border-radius: 20px;
//   direction: rtl;
//   font-family: var(--font-family);
// `;

// const StatsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 20px;
//   margin-bottom: 30px;
// `;

// const StatCard = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 15px;
//   box-shadow: 0 4px 12px rgba(0,0,0,0.05);
//   border-bottom: 4px solid ${props => props.color || "var(--primary-navy)"};
//   text-align: center;
// `;

// const StatValue = styled.div`
//   font-size: 1.8rem;
//   font-weight: bold;
//   color: #333;
// `;

// const StatLabel = styled.div`
//   color: #777;
//   font-size: 0.9rem;
// `;

// const ChartSection = styled.div`
//   background: white;
//   padding: 25px;
//   border-radius: 20px;
//   box-shadow: 0 10px 30px rgba(0,0,0,0.08);
// `;

// const Badge = styled.span`
//   background: #ffe5e5;
//   color: #ff4d4d;
//   padding: 4px 12px;
//   border-radius: 8px;
//   font-size: 0.8rem;
//   font-weight: bold;
//   animation: flash 1s infinite;

//   @keyframes flash {
//     50% { opacity: 0.5; }
//   }
// `;

// function AdvancedBloodDashboard() {
//   const [bloodCounts, setBloodCounts] = useState([45, 12, 33, 7, 18, 4, 62, 21]);
//   const labels = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setBloodCounts(prev => prev.map(v => Math.max(2, Math.min(100, v + (Math.floor(Math.random() * 5) - 2)))));
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   const totalBags = bloodCounts.reduce((a, b) => a + b, 0);
//   const criticalTypes = labels.filter((_, i) => bloodCounts[i] < 10);

//   const data = {
//     labels,
//     datasets: [{
//       label: 'المخزون اللحظي',
//       data: bloodCounts,
//       backgroundColor: bloodCounts.map(v => v < 10 ? 'rgba(255, 77, 77, 0.8)' : 'rgba(0, 128, 128, 0.7)'),
//       borderRadius: 12,
//       hoverBackgroundColor: 'var(--primary-navy)',
//     }]
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         rtl: true,
//         callbacks: {
//           label: (context) => ` الكمية المتوفرة: ${context.raw} كيس`
//         }
//       }
//     },
//     scales: {
//       y: { beginAtZero: true, grid: { display: false } },
//       x: { grid: { display: false } }
//     }
//   };

//   return (
//     <DashboardContainer>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//         <h2 style={{ color: 'var(--primary-navy)' }}>لوحة مراقبة بنك الدم الذكية</h2>
//         {criticalTypes.length > 0 && <Badge>تنبيه: نقص في {criticalTypes.join(', ')}</Badge>}
//       </div>

//       <StatsGrid>
//         <StatCard color="#008080">
//           <StatValue>{totalBags}</StatValue>
//           <StatLabel>إجمالي الأكياس</StatLabel>
//         </StatCard>
//         <StatCard color="#ff4d4d">
//           <StatValue>{criticalTypes.length}</StatValue>
//           <StatLabel>فصائل في حالة حرجة</StatLabel>
//         </StatCard>
//         <StatCard color="#3498db">
//           <StatValue>نشط</StatValue>
//           <StatLabel>حالة الاتصال</StatLabel>
//         </StatCard>
//       </StatsGrid>

//       <ChartSection>
//         <div style={{ height: '350px' }}>
//           <Bar data={data} options={options} />
//         </div>
//       </ChartSection>
//     </DashboardContainer>
//   );
// }

// export default AdvancedBloodDashboard;
