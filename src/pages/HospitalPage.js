// import React, { useState } from "react";
// import styled from "styled-components";
// import { motion } from "framer-motion";

// // Importera dina komponenter
// import HosRequestBlood from "../components/hospital/HosRequestBlood";
// import HospitalStatusTable from "../components/HospitalStatusTable";

// const PageContainer = styled.div`
//   padding: 40px 20px;
//   background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   gap: 60px; /* Rejält mellanrum för tydlighet */
//   direction: rtl;
// `;

// const SectionWrapper = styled(motion.section)`
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const SectionTitle = styled.h2`
//   text-align: center;
//   color: #1e293b;
//   font-family: "Cairo", sans-serif;
//   margin-bottom: 30px;
//   font-weight: 900;
//   font-size: 2rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 15px;

//   &::after,
//   &::before {
//     content: "";
//     height: 3px;
//     width: 50px;
//     background: #3b82f6;
//     border-radius: 10px;
//   }
// `;

// const HospitalPage = () => {
//   // Här lagras alla beställningar för att sidan ska vara "levande"
//   const [orders, setOrders] = useState([
//     {
//       id: "ORD-9919",
//       status: "قيد الشحن",
//       info: "3 وحدات B+ - قسم التوليد",
//       doctor: "د. محمد",
//       dept: "قسم التوليد",
//       time: "منذ ساعة",
//       progress: 75,
//       color: "#8b5cf6",
//     },
//   ]);

//   // Funktion för att ta emot ny data från formuläret
//   const handleAddOrder = (orderData) => {
//     const newOrder = {
//       id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
//       status: "معلق", // Startar alltid som väntande
//       info: orderData.summary,
//       doctor: orderData.doctor || "د. القادم",
//       dept: orderData.dept || "الطوارئ",
//       time: "الآن",
//       progress: 25,
//       color: "#f59e0b",
//     };

//     // Lägg till den nya ordern högst upp
//     setOrders([newOrder, ...orders]);

//     // Scrolla ner till tabellen automatiskt för att visa att den lagts till
//     setTimeout(() => {
//       document
//         .getElementById("order-status")
//         .scrollIntoView({ behavior: "smooth" });
//     }, 500);
//   };

//   return (
//     <PageContainer>
//       {/* SEKTION 1: Formuläret (Högst upp) */}
//       <SectionWrapper
//         id="order-form"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <HosRequestBlood onAddOrder={handleAddOrder} />
//       </SectionWrapper>

//       {/* SEKTION 2: Tabellen (Nedanför) */}
//       <SectionWrapper
//         id="order-status"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//       >
//         <SectionTitle>متابعة حالة الطلبات المرسلة</SectionTitle>
//         <HospitalStatusTable orders={orders} setOrders={setOrders} />
//       </SectionWrapper>
//     </PageContainer>
//   );
// };

// export default HospitalPage;

// import React, { useState } from "react";
// import styled from "styled-components";
// import { motion, AnimatePresence } from "framer-motion";

// // Importera dina komponenter
// import HosRequestBlood from "../components/hospital/HosRequestBlood";
// import HospitalStatusTable from "../components/HospitalStatusTable";

// const PageContainer = styled.div`
//   padding: 40px 20px;
//   background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   gap: 60px;
//   direction: rtl;
// `;

// const SectionWrapper = styled(motion.section)`
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const SectionTitle = styled.h2`
//   text-align: center;
//   color: #1e293b;
//   font-family: "Cairo", sans-serif;
//   margin-bottom: 30px;
//   font-weight: 900;
//   font-size: 2rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 15px;

//   &::after,
//   &::before {
//     content: "";
//     height: 3px;
//     width: 50px;
//     background: #3b82f6;
//     border-radius: 10px;
//   }
// `;

// const HospitalPage = () => {
//   // Här lagras alla beställningar. Vi börjar med några exempel som följer lärarens status-krav.
//   const [orders, setOrders] = useState([
//     {
//       id: "ORD-9919",
//       status: "قيد الشحن", // Skickad
//       info: "3 وحدات B+ | عاجل",
//       doctor: "د. محمد",
//       dept: "قسم التوليد",
//       time: "منذ ساعة",
//       progress: 75,
//       color: "#8b5cf6",
//     },
//     {
//       id: "ORD-8820",
//       status: "قيد المعالجة", // Under behandling
//       info: "50 وحدة O+ | عادي",
//       doctor: "د. أحمد",
//       dept: "مخزون عام",
//       time: "منذ ساعتين",
//       progress: 50,
//       color: "#3b82f6",
//     },
//   ]);

//   // Denna funktion tar emot datan från HosRequestBlood
//   const handleAddOrder = (orderData) => {
//     // Definiera färg och progress baserat på start-status "معلق" (Väntande)
//     const newOrder = {
//       id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
//       status: "معلق",
//       info: `${orderData.summary} | ${orderData.urgency}`, // Inkluderar blodgrupper + prioritet
//       doctor: orderData.doctor || "د. قيد التعيين",
//       dept: orderData.dept || "الطوارئ",
//       time: "الآن",
//       progress: 15, // Låg progress eftersom den är väntande
//       color: "#f59e0b", // Orange för väntande
//     };

//     // Uppdatera listan live
//     setOrders([newOrder, ...orders]);

//     // Automatisk scroll ner till tabellen för bättre UX
//     setTimeout(() => {
//       document
//         .getElementById("order-status")
//         .scrollIntoView({ behavior: "smooth" });
//     }, 500);
//   };

//   return (
//     <PageContainer>
//       {/* SEKTION 1: Formuläret - Användaren beställer här */}
//       <SectionWrapper
//         id="order-form"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <HosRequestBlood onAddOrder={handleAddOrder} />
//       </SectionWrapper>

//       {/* SEKTION 2: Tabellen - Övervakning sker här */}
//       <SectionWrapper
//         id="order-status"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//       >
//         <SectionTitle>متابعة الطلبات المباشرة</SectionTitle>

//         {/* Vi skickar ner både listan och funktionen för att uppdatera den */}
//         <HospitalStatusTable orders={orders} setOrders={setOrders} />
//       </SectionWrapper>
//     </PageContainer>
//   );
// };

// export default HospitalPage;

import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa6"; // أيقونات جديدة
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Importera dina komponenter
import HosRequestBlood from "../components/hospital/HosRequestBlood";
import HospitalStatusTable from "../components/HospitalStatusTable";

const PageContainer = styled.div`
  padding: 40px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 40px;
  direction: rtl;
`;

const SectionWrapper = styled(motion.section)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ChartCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    font-weight: 800;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #1e293b;
  font-family: "Cairo", sans-serif;
  margin-bottom: 30px;
  font-weight: 900;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  &::after,
  &::before {
    content: "";
    height: 3px;
    width: 50px;
    background: #3b82f6;
    border-radius: 10px;
  }
`;

const HospitalPage = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-9919",
      status: "قيد الشحن",
      info: "3 وحدات B+ | عاجل",
      doctor: "د. محمد",
      dept: "قسم التوليد",
      time: "منذ ساعة",
      progress: 75,
      color: "#8b5cf6",
    },
    {
      id: "ORD-8820",
      status: "قيد المعالجة",
      info: "50 وحدة O+ | عادي",
      doctor: "د. أحمد",
      dept: "مخزون عام",
      time: "منذ ساعتين",
      progress: 50,
      color: "#3b82f6",
    },
  ]);

  // بيانات الرسم البياني (يمكنك جعلها ديناميكية لاحقاً)
  const chartData = [
    { n: "السبت", v: 400 },
    { n: "الأحد", v: 300 },
    { n: "الاثنين", v: 600 },
    { n: "الثلاثاء", v: 800 },
    { n: "الأربعاء", v: 500 },
    { n: "الخميس", v: 900 },
    { n: "الجمعة", v: 700 },
  ];

  const handleAddOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "معلق",
      info: `${orderData.summary} | ${orderData.urgency}`,
      doctor: orderData.doctor || "د. قيد التعيين",
      dept: orderData.dept || "الطوارئ",
      time: "الآن",
      progress: 15,
      color: "#f59e0b",
    };

    setOrders([newOrder, ...orders]);

    setTimeout(() => {
      document
        .getElementById("order-status")
        .scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  return (
    <PageContainer>
      {/* 1. نموذج الطلب */}
      <SectionWrapper
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <HosRequestBlood onAddOrder={handleAddOrder} />
      </SectionWrapper>

      {/* 2. الرسم البياني (الإحصائيات) */}
      <SectionWrapper
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <ChartCard>
          <h3>
            <FaChartLine color="#3b82f6" /> معدل استهلاك الوحدات الأسبوعي
          </h3>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
                    borderRadius: "15px",
                    border: "none",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    direction: "rtl",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  name="وحدات الدم"
                  stroke="#3b82f6"
                  fill="url(#colorVal)"
                  strokeWidth={4}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </SectionWrapper>

      {/* 3. جدول المتابعة */}
      <SectionWrapper
        id="order-status"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <SectionTitle>متابعة الطلبات المباشرة</SectionTitle>
        <HospitalStatusTable orders={orders} setOrders={setOrders} />
      </SectionWrapper>
    </PageContainer>
  );
};

export default HospitalPage;
