import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  FaClock,
  FaTruck,
  FaBoxOpen,
  FaCheckDouble,
  FaHospital,
  FaArrowLeft,
} from "react-icons/fa";

const truckMove = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(-8px); }
  100% { transform: translateX(0); }
`;

const spinSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(37, 99, 235, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
`;

const Container = styled(motion.div)`
  width: 100%;
  max-width: 1100px;
  margin: 40px auto;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  border-radius: 40px;
  padding: 30px;
  direction: rtl;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
  scroll-margin-top: 100px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
`;

const OrderRow = styled(motion.tr)`
  background: white;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px) scale(1.01);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  }
  td {
    padding: 20px;
    &:first-child {
      border-radius: 0 20px 20px 0;
    }
    &:last-child {
      border-radius: 20px 0 0 20px;
    }
  }
`;

const StatusChip = styled.div`
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;

  ${(props) =>
    props.$type === "معلق" &&
    css`
      background: #fffbeb;
      color: #b45309;
      svg {
        animation: ${spinSlow} 4s infinite linear;
      }
    `}

  ${(props) =>
    props.$type === "قيد المعالجة" &&
    css`
      background: #eff6ff;
      color: #1d4ed8;
    `}

  ${(props) =>
    props.$type === "قيد الشحن" &&
    css`
      background: #faf5ff;
      color: #7e22ce;
      animation: ${pulseGlow} 2s infinite;
      border: 1px solid #d8b4fe;
      svg {
        animation: ${truckMove} 1s infinite linear;
      }
    `}

  ${(props) =>
    props.$type === "مكتمل" &&
    css`
      background: #f0fdf4;
      color: #15803d;
    `}
`;

const ConfirmButton = styled(motion.button)`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HospitalStatusTable = () => {
  const [orders, setOrders] = useState([
    {
      id: "992",
      status: "معلق",
      info: "5 وحدات A+",
      doctor: "د. سامي",
      dept: "الإسعاف",
    },
    {
      id: "991",
      status: "قيد المعالجة",
      info: "2 وحدة O-",
      doctor: "د. ريم",
      dept: "العمليات",
    },
    {
      id: "990",
      status: "قيد الشحن",
      info: "3 وحدات B+",
      doctor: "د. ياسين",
      dept: "العناية",
    },
  ]);

  const handleConfirm = (id) => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: "مكتمل" } : o)));
  };

  const getIcon = (status) => {
    if (status === "معلق") return <FaClock />;
    if (status === "قيد المعالجة") return <FaBoxOpen />;
    if (status === "قيد الشحن") return <FaTruck />;
    return <FaCheckDouble />;
  };

  return (
    <Container
      id="order-status"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            fontWeight: 900,
          }}
        >
          <FaHospital color="#2563eb" size={30} /> حالة الطلبات
        </h2>
        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>● تحديث حي</div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <StyledTable>
          <thead>
            <tr style={{ color: "#94a3b8", textAlign: "right" }}>
              <th style={{ padding: "0 20px" }}>المعرف</th>
              <th>التفاصيل</th>
              <th>الحالة</th>
              <th>الإجراء</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {orders.map((order) => (
                <OrderRow
                  key={order.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td style={{ fontWeight: 900, color: "#2563eb" }}>
                    #{order.id}
                  </td>
                  <td>
                    <div style={{ fontWeight: 800 }}>{order.info}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                      {order.doctor}
                    </div>
                  </td>
                  <td>
                    <StatusChip $type={order.status}>
                      {getIcon(order.status)}
                      {order.status}
                    </StatusChip>
                  </td>
                  <td>
                    {order.status === "قيد الشحن" ? (
                      <ConfirmButton onClick={() => handleConfirm(order.id)}>
                        تأكيد استلام <FaArrowLeft />
                      </ConfirmButton>
                    ) : order.status === "مكتمل" ? (
                      <span style={{ color: "#10b981", fontWeight: "bold" }}>
                        ✅ تم الوصول
                      </span>
                    ) : (
                      <span style={{ color: "#cbd5e1" }}>قيد الانتظار...</span>
                    )}
                  </td>
                </OrderRow>
              ))}
            </AnimatePresence>
          </tbody>
        </StyledTable>
      </div>
    </Container>
  );
};

export default HospitalStatusTable;

// import React, { useState } from "react";
// import styled, { keyframes } from "styled-components";
// import { motion, AnimatePresence } from "framer-motion";
// import confetti from "canvas-confetti";
// import {
//   FaClock,
//   FaTruck,
//   FaBoxOpen,
//   FaCheckDouble,
//   FaHospital,
//   FaUserMd,
//   FaMapMarkerAlt,
//   FaExclamationCircle,
// } from "react-icons/fa";

// // --- الأنميشن (التحركات الحية) ---
// const pulse = keyframes`
//   0% { transform: scale(1); opacity: 1; }
//   50% { transform: scale(1.1); opacity: 0.7; }
//   100% { transform: scale(1); opacity: 1; }
// `;

// const shimmer = keyframes`
//   0% { background-position: -200% 0; }
//   100% { background-position: 200% 0; }
// `;

// // --- المكونات المصممة (Styled Components) ---
// const Container = styled(motion.div)`
//   width: 100%;
//   max-width: 1200px;
//   margin: 40px auto;
//   background: rgba(255, 255, 255, 0.9);
//   backdrop-filter: blur(20px);
//   border-radius: 40px;
//   padding: 40px;
//   direction: rtl;
//   box-shadow: 0 25px 60px rgba(0, 0, 0, 0.1);
//   border: 1px solid rgba(255, 255, 255, 0.5);
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 30px;
//   padding-bottom: 20px;
//   border-bottom: 2px solid #f1f5f9;
// `;

// const StatusChip = styled(motion.div)`
//   padding: 10px 20px;
//   border-radius: 20px;
//   font-weight: 800;
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   font-size: 0.9rem;

//   ${(props) => props.$type === "معلق" && "background: #fff7ed; color: #9a3412;"}
//   ${(props) =>
//     props.$type === "قيد المعالجة" && "background: #eff6ff; color: #1e40af;"}
//   ${(props) =>
//     props.$type === "قيد الشحن" &&
//     "background: #faf5ff; color: #6b21a8; border: 2px solid #6b21a8;"}
//   ${(props) =>
//     props.$type === "مكتمل" && "background: #f0fdf4; color: #166534;"}
// `;

// const LiveDot = styled.div`
//   width: 10px;
//   height: 10px;
//   background: #ef4444;
//   border-radius: 50%;
//   animation: ${pulse} 1.5s infinite;
// `;

// const ConfirmButton = styled(motion.button)`
//   background: #10b981;
//   color: white;
//   border: none;
//   padding: 12px 25px;
//   border-radius: 15px;
//   font-weight: bold;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
// `;

// // --- المكون الرئيسي ---
// const HospitalStatusTable = () => {
//   const [orders, setOrders] = useState([
//     {
//       id: "ORD-101",
//       status: "معلق",
//       info: "4 وحدات A+",
//       doctor: "د. سامر",
//       dept: "الإسعاف",
//       time: "10:30 AM",
//     },
//     {
//       id: "ORD-102",
//       status: "قيد المعالجة",
//       info: "2 وحدة O-",
//       doctor: "د. ليلى",
//       dept: "العمليات",
//       time: "09:45 AM",
//     },
//     {
//       id: "ORD-103",
//       status: "قيد الشحن",
//       info: "3 وحدات B+",
//       doctor: "د. محمد",
//       dept: "الولادة",
//       time: "08:15 AM",
//     },
//   ]);

//   const handleConfirmArrival = (id) => {
//     confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
//     setOrders(
//       orders.map((order) =>
//         order.id === id ? { ...order, status: "مكتمل" } : order,
//       ),
//     );
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "معلق":
//         return <FaClock />;
//       case "قيد المعالجة":
//         return <FaBoxOpen />;
//       case "قيد الشحن":
//         return <FaTruck className="animate-bounce" />;
//       case "مكتمل":
//         return <FaCheckDouble />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Container initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//       <Header>
//         <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//           <FaHospital size={30} color="#1e293b" />
//           <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: 900 }}>
//             متابعة طلبات المشفى
//           </h2>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//             color: "#64748b",
//             fontWeight: "bold",
//           }}
//         >
//           <LiveDot /> نظام المراقبة المباشر
//         </div>
//       </Header>

//       <div style={{ overflowX: "auto" }}>
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "separate",
//             borderSpacing: "0 15px",
//           }}
//         >
//           <thead>
//             <tr
//               style={{
//                 color: "#94a3b8",
//                 textAlign: "right",
//                 fontSize: "0.9rem",
//               }}
//             >
//               <th style={{ padding: "0 20px" }}>رقم الطلب</th>
//               <th>تفاصيل الشحنة</th>
//               <th>الحالة الحالية</th>
//               <th>الإجراء</th>
//             </tr>
//           </thead>
//           <tbody>
//             <AnimatePresence>
//               {orders.map((order) => (
//                 <motion.tr
//                   key={order.id}
//                   layout
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   style={{
//                     background: "white",
//                     boxShadow: "0 5px 15px rgba(0,0,0,0.02)",
//                     borderRadius: "20px",
//                   }}
//                 >
//                   <td
//                     style={{
//                       padding: "25px 20px",
//                       fontWeight: 800,
//                       color: "#2563eb",
//                       borderRadius: "0 20px 20px 0",
//                     }}
//                   >
//                     {order.id}
//                   </td>
//                   <td>
//                     <div style={{ fontWeight: "bold", color: "#1e293b" }}>
//                       {order.info}
//                     </div>
//                     <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
//                       <FaUserMd /> {order.doctor} | <FaMapMarkerAlt />{" "}
//                       {order.dept}
//                     </div>
//                   </td>
//                   <td>
//                     <StatusChip $type={order.status}>
//                       {getStatusIcon(order.status)}
//                       {order.status}
//                     </StatusChip>
//                   </td>
//                   <td style={{ borderRadius: "20px 0 0 20px" }}>
//                     {order.status === "قيد الشحن" ? (
//                       <ConfirmButton
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => handleConfirmArrival(order.id)}
//                       >
//                         تأكيد الاستلام
//                       </ConfirmButton>
//                     ) : order.status === "مكتمل" ? (
//                       <div
//                         style={{
//                           color: "#10b981",
//                           fontWeight: "bold",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "5px",
//                         }}
//                       >
//                         <FaCheckDouble /> تم الاستلام
//                       </div>
//                     ) : (
//                       <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
//                         بانتظار إجراء البنك...
//                       </div>
//                     )}
//                   </td>
//                 </motion.tr>
//               ))}
//             </AnimatePresence>
//           </tbody>
//         </table>
//       </div>
//     </Container>
//   );
// };
