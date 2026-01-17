// import React, { useState } from "react";
// import styled, { createGlobalStyle } from "styled-components";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   MdSettings,
//   MdSearch,
//   MdDeleteOutline,
//   MdPersonAdd,
//   MdClose,
//   MdPalette,
//   MdSpeed,
//   MdCloudDone,
//   MdHistory,
//   MdArrowBack,
//   MdNotificationsNone,
// } from "react-icons/md";

// const GlobalStyle = createGlobalStyle`
//   body { background: #f4f7fe; font-family: 'Inter', sans-serif; direction: rtl; margin: 0; color: #1b2559; }
//   * { box-sizing: border-box; }
// `;

// // --- STYLED COMPONENTS ---
// const AppContainer = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 30px 20px;
// `;

// const ContentCard = styled(motion.div)`
//   background: white;
//   border-radius: 20px;
//   padding: 25px;
//   box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.03);
// `;

// const MiniSearch = styled.div`
//   display: flex;
//   align-items: center;
//   background: #f4f7fe;
//   padding: 6px 12px;
//   border-radius: 10px;
//   width: 180px;
//   border: 1px solid #e0e5f2;
//   input {
//     background: transparent;
//     border: none;
//     outline: none;
//     font-size: 0.8rem;
//     width: 100%;
//     margin-right: 5px;
//   }
// `;

// const ModalOverlay = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.4);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
//   backdrop-filter: blur(4px);
// `;

// const ModalContent = styled(motion.div)`
//   background: white;
//   padding: 30px;
//   border-radius: 20px;
//   width: 400px;
//   box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
// `;

// const StyledInput = styled.input`
//   width: 100%;
//   padding: 12px;
//   margin: 8px 0 15px;
//   border-radius: 10px;
//   border: 1px solid #e0e5f2;
//   outline: none;
//   font-family: inherit;
//   &:focus {
//     border-color: #4f46e5;
//   }
// `;

// const StyledSelect = styled.select`
//   width: 100%;
//   padding: 12px;
//   margin: 8px 0 20px;
//   border-radius: 10px;
//   border: 1px solid #e0e5f2;
//   background: white;
//   outline: none;
//   font-family: inherit;
//   cursor: pointer;
//   &:focus {
//     border-color: #4f46e5;
//   }
// `;

// // --- MAIN COMPONENT ---
// export default function Settings() {
//   const [themeColor, setThemeColor] = useState("#4f46e5");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newName, setNewName] = useState("");
//   const [newRole, setNewRole] = useState("موظف"); // Standardroll

//   const [users, setUsers] = useState([
//     { id: 1, name: "د. يوسف العلي", role: "مدير", lastSeen: "منذ دقيقتين" },
//     { id: 2, name: "سارة أحمد", role: "موظف", lastSeen: "متصل الآن" },
//   ]);

//   // Funktion för att lägga till användare
//   const handleAddUser = (e) => {
//     e.preventDefault();
//     if (newName.trim() === "") return;

//     const newUser = {
//       id: Date.now(),
//       name: newName,
//       role: newRole,
//       lastSeen: "الآن",
//     };

//     setUsers([newUser, ...users]);
//     setNewName("");
//     setNewRole("موظف"); // Återställ till standard
//     setIsModalOpen(false);
//   };

//   const deleteUser = (id) => {
//     setUsers(users.filter((u) => u.id !== id));
//   };

//   return (
//     <AppContainer>
//       <GlobalStyle />

//       <div style={{ marginBottom: "30px" }}>
//         <h1 style={{ margin: 0, fontSize: "1.8rem" }}>الإعدادات العامة</h1>
//       </div>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 320px",
//           gap: "25px",
//         }}
//       >
//         {/* HUVUDKORT: ANVÄNDARLISTA */}
//         <ContentCard>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "20px",
//             }}
//           >
//             <h3 style={{ margin: 0 }}>إدارة فريق العمل</h3>

//             <div style={{ display: "flex", gap: "10px" }}>
//               <MiniSearch>
//                 <MdSearch color="#a3aed0" />
//                 <input
//                   placeholder="بحث سريع..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </MiniSearch>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsModalOpen(true)}
//                 style={{
//                   background: themeColor,
//                   color: "white",
//                   border: "none",
//                   padding: "8px 18px",
//                   borderRadius: "10px",
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "5px",
//                   fontWeight: "600",
//                 }}
//               >
//                 <MdPersonAdd size={18} /> إضافة
//               </motion.button>
//             </div>
//           </div>

//           <AnimatePresence>
//             {users
//               .filter((u) => u.name.includes(searchTerm))
//               .map((user) => (
//                 <motion.div
//                   key={user.id}
//                   layout
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     padding: "12px",
//                     background: "#f8f9ff",
//                     borderRadius: "12px",
//                     marginBottom: "10px",
//                     border: "1px solid #f1f4f9",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "12px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: "35px",
//                         height: "35px",
//                         borderRadius: "8px",
//                         background: "white",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         color: themeColor,
//                         fontWeight: "bold",
//                         border: "1px solid #e0e5f2",
//                       }}
//                     >
//                       {user.name[0]}
//                     </div>
//                     <div>
//                       <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
//                         {user.name}
//                       </div>
//                       <div style={{ fontSize: "0.7rem", color: "#a3aed0" }}>
//                         {user.lastSeen}
//                       </div>
//                     </div>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "10px",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontSize: "0.7rem",
//                         padding: "4px 8px",
//                         background: "white",
//                         color: themeColor,
//                         borderRadius: "6px",
//                         border: `1px solid ${themeColor}22`,
//                       }}
//                     >
//                       {user.role}
//                     </span>
//                     <MdDeleteOutline
//                       size={20}
//                       color="#ef4444"
//                       style={{ cursor: "pointer" }}
//                       onClick={() => deleteUser(user.id)}
//                     />
//                   </div>
//                 </motion.div>
//               ))}
//           </AnimatePresence>
//         </ContentCard>

//         {/* SIDEBAR: DESIGN & NOTISER */}
//         <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//           <ContentCard>
//             <h4 style={{ margin: "0 0 15px" }}>
//               <MdPalette /> هوية النظام
//             </h4>
//             <div style={{ display: "flex", gap: "8px" }}>
//               {["#4f46e5", "#10b981", "#ef4444", "#f59e0b", "#06b6d4"].map(
//                 (c) => (
//                   <div
//                     key={c}
//                     onClick={() => setThemeColor(c)}
//                     style={{
//                       width: "25px",
//                       height: "25px",
//                       borderRadius: "6px",
//                       background: c,
//                       cursor: "pointer",
//                       border:
//                         themeColor === c
//                           ? "2px solid #1b2559"
//                           : "2px solid white",
//                     }}
//                   />
//                 )
//               )}
//             </div>
//           </ContentCard>

//           <ContentCard style={{ background: "#1b2559", color: "white" }}>
//             <h4
//               style={{
//                 marginTop: 0,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             >
//               <MdNotificationsNone /> آخر التنبيهات
//             </h4>
//             <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
//               <p>● تم تحديث النظام بنجاح</p>
//               <p>● تنبيه: محاولة دخول جديدة</p>
//             </div>
//             <button
//               style={{
//                 width: "100%",
//                 marginTop: "15px",
//                 background: "rgba(255,255,255,0.1)",
//                 border: "none",
//                 color: "white",
//                 padding: "8px",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//                 fontSize: "0.8rem",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "5px",
//               }}
//             >
//               عرض السجلات <MdArrowBack />
//             </button>
//           </ContentCard>
//         </div>
//       </div>

//       {/* --- MODAL (POPUP) --- */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <ModalOverlay
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <ModalContent
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: "20px",
//                 }}
//               >
//                 <h3 style={{ margin: 0 }}>إضافة عضو جديد</h3>
//                 <MdClose
//                   size={24}
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setIsModalOpen(false)}
//                 />
//               </div>

//               <form onSubmit={handleAddUser}>
//                 <label style={{ fontSize: "0.85rem", color: "#a3aed0" }}>
//                   اسم الموظف الكامل
//                 </label>
//                 <StyledInput
//                   autoFocus
//                   placeholder="مثال: د. محمد خالد"
//                   value={newName}
//                   onChange={(e) => setNewName(e.target.value)}
//                 />

//                 <label style={{ fontSize: "0.85rem", color: "#a3aed0" }}>
//                   اختر الصلاحية (الدور)
//                 </label>
//                 <StyledSelect
//                   value={newRole}
//                   onChange={(e) => setNewRole(e.target.value)}
//                 >
//                   <option value="موظف">موظف (Staff)</option>
//                   <option value="مدير">مدير (Admin)</option>
//                   <option value="مشاهد">مشاهد (Viewer)</option>
//                 </StyledSelect>

//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     background: themeColor,
//                     color: "white",
//                     border: "none",
//                     borderRadius: "10px",
//                     cursor: "pointer",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   حفظ البيانات
//                 </motion.button>
//               </form>
//             </ModalContent>
//           </ModalOverlay>
//         )}
//       </AnimatePresence>
//     </AppContainer>
//   );
// }

// Den här koden ska jag återanävnda i patient settings sidan senare den kan vara bra och lägga till sånt här
// import React, { useState } from "react";
// import styled, { createGlobalStyle } from "styled-components";
// import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
// import {
//   MdAdminPanelSettings,
//   MdPeople,
//   MdEventAvailable,
//   MdCheckCircle,
//   MdAccessTime,
//   MdSecurity,
//   MdDeleteSweep,
//   MdPersonAdd,
//   MdClose,
//   MdSearch,
//   MdPriorityHigh,
//   MdFilterList,
// } from "react-icons/md";

// const GlobalStyle = createGlobalStyle`
//   body { background: #f0f4f8; font-family: 'Inter', sans-serif; direction: rtl; margin: 0; color: #1e293b; }
//   * { box-sizing: border-box; transition: background-color 0.2s ease; }
// `;

// // --- STYLED COMPONENTS (FÖRBÄTTRADE) ---
// const AppWrapper = styled.div`
//   padding: 40px 20px;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const HeaderSection = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 40px;
// `;

// const FilterTabs = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-bottom: 20px;
// `;

// const Tab = styled.button`
//   padding: 8px 20px;
//   border-radius: 12px;
//   border: none;
//   background: ${(p) => (p.active ? "#4f46e5" : "white")};
//   color: ${(p) => (p.active ? "white" : "#64748b")};
//   font-weight: 600;
//   cursor: pointer;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
// `;

// const BentoGrid = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 1fr;
//   gap: 25px;
//   @media (max-width: 900px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const SectionCard = styled(motion.div)`
//   background: white;
//   border-radius: 32px;
//   padding: 30px;
//   box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
//   border: 1px solid rgba(255, 255, 255, 0.7);
// `;

// const SearchBar = styled(motion.div)`
//   display: flex;
//   align-items: center;
//   background: white;
//   padding: 15px 25px;
//   border-radius: 20px;
//   margin-bottom: 25px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
//   border: 1px solid #e2e8f0;
//   input {
//     border: none;
//     outline: none;
//     width: 100%;
//     font-size: 1rem;
//     background: transparent;
//     margin-right: 10px;
//   }
// `;

// const AppointmentItem = styled(motion.div)`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 20px;
//   margin-bottom: 15px;
//   background: ${(p) => (p.checked ? "#f0fdf4" : "white")};
//   border-radius: 20px;
//   border: 1px solid ${(p) => (p.checked ? "#bbf7d0" : "#f1f5f9")};
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
// `;

// // --- ANIMATIONSVARIANTER ---
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1 },
// };

// // --- MAIN COMPONENT ---
// export default function MasterDashboard() {
//   const [filter, setFilter] = useState("all"); // all, pending, completed
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showAddUser, setShowAddUser] = useState(false);

//   const [appointments, setAppointments] = useState([
//     { id: 1, patient: "أحمد علي", time: "09:00", checked: false, urgent: true },
//     {
//       id: 2,
//       patient: "ليلى محمد",
//       time: "10:30",
//       checked: true,
//       urgent: false,
//     },
//     {
//       id: 3,
//       patient: "عمر خالد",
//       time: "11:15",
//       checked: false,
//       urgent: false,
//     },
//     { id: 4, patient: "سارة حسن", time: "12:00", checked: false, urgent: true },
//   ]);

//   // Filtreringslogik
//   const filteredData = appointments.filter((appt) => {
//     const matchesSearch = appt.patient.includes(searchTerm);
//     if (filter === "pending") return matchesSearch && !appt.checked;
//     if (filter === "completed") return matchesSearch && appt.checked;
//     return matchesSearch;
//   });

//   const toggleCheck = (id) => {
//     setAppointments(
//       appointments.map((a) => (a.id === id ? { ...a, checked: !a.checked } : a))
//     );
//   };

//   return (
//     <AppWrapper>
//       <GlobalStyle />

//       <HeaderSection>
//         <motion.div
//           initial={{ x: 50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//         >
//           <h1 style={{ margin: 0, fontSize: "2.2rem" }}>المركز الصحي الذكي</h1>
//           <p style={{ color: "#64748b" }}>نظام إدارة المواعيد المتقدم</p>
//         </motion.div>

//         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//           <div
//             style={{
//               background: "white",
//               padding: "15px 25px",
//               borderRadius: "20px",
//               boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
//             }}
//           >
//             <span
//               style={{ fontSize: "0.8rem", display: "block", color: "#64748b" }}
//             >
//               كفاءة اليوم
//             </span>
//             <span
//               style={{
//                 fontWeight: "bold",
//                 fontSize: "1.2rem",
//                 color: "#10b981",
//               }}
//             >
//               85%
//             </span>
//           </div>
//         </motion.div>
//       </HeaderSection>

//       <SearchBar whileFocus={{ scale: 1.01 }}>
//         <MdSearch size={24} color="#4f46e5" />
//         <input
//           placeholder="البحث السريع عن المرضى..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </SearchBar>

//       <FilterTabs>
//         <Tab active={filter === "all"} onClick={() => setFilter("all")}>
//           الكل ({appointments.length})
//         </Tab>
//         <Tab active={filter === "pending"} onClick={() => setFilter("pending")}>
//           انتظار ({appointments.filter((a) => !a.checked).length})
//         </Tab>
//         <Tab
//           active={filter === "completed"}
//           onClick={() => setFilter("completed")}
//         >
//           اكتمل
//         </Tab>
//       </FilterTabs>

//       <BentoGrid>
//         <SectionCard
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginBottom: "25px",
//             }}
//           >
//             <h3 style={{ margin: 0 }}>📋 قائمة المراجعات اليومية</h3>
//             <MdFilterList size={20} color="#94a3b8" />
//           </div>

//           <AnimatePresence mode="popLayout">
//             {filteredData.map((appt) => (
//               <AppointmentItem
//                 key={appt.id}
//                 checked={appt.checked}
//                 variants={itemVariants}
//                 layout
//                 initial="hidden"
//                 animate="visible"
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 whileHover={{ x: -5, boxShadow: "0 8px 15px rgba(0,0,0,0.05)" }}
//               >
//                 <div
//                   style={{ display: "flex", alignItems: "center", gap: "20px" }}
//                 >
//                   <div
//                     style={{
//                       background: appt.urgent ? "#fee2e2" : "#f1f5f9",
//                       padding: "12px",
//                       borderRadius: "15px",
//                     }}
//                   >
//                     <MdAccessTime
//                       color={appt.urgent ? "#ef4444" : "#64748b"}
//                       size={24}
//                     />
//                   </div>
//                   <div>
//                     <div style={{ fontWeight: "800", fontSize: "1.1rem" }}>
//                       {appt.patient}
//                     </div>
//                     <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
//                       موعد الساعة: {appt.time}
//                     </div>
//                   </div>
//                 </div>

//                 <motion.button
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => toggleCheck(appt.id)}
//                   style={{
//                     background: appt.checked ? "#10b981" : "#4f46e5",
//                     color: "white",
//                     border: "none",
//                     padding: "10px 20px",
//                     borderRadius: "14px",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {appt.checked ? (
//                     <>
//                       <MdCheckCircle /> اكتمل
//                     </>
//                   ) : (
//                     "تأكيد"
//                   )}
//                 </motion.button>
//               </AppointmentItem>
//             ))}
//           </AnimatePresence>
//         </SectionCard>

//         <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
//           <SectionCard whileHover={{ y: -5 }}>
//             <h4 style={{ marginTop: 0 }}>📊 ملخص الحالة</h4>
//             <div
//               style={{ display: "flex", flexDirection: "column", gap: "15px" }}
//             >
//               <ProgressBox
//                 label="المواعيد المنجزة"
//                 value={
//                   (appointments.filter((a) => a.checked).length /
//                     appointments.length) *
//                   100
//                 }
//                 color="#10b981"
//               />
//               <ProgressBox label="نسبة الإشغال" value={70} color="#4f46e5" />
//             </div>
//           </SectionCard>

//           <SectionCard
//             style={{
//               background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
//               color: "white",
//             }}
//           >
//             <h4>🚀 ميزة جديدة</h4>
//             <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>
//               يمكنك الآن تفعيل التنبيهات التلقائية عبر WhatsApp للمرضى.
//             </p>
//             <button
//               style={{
//                 background: "rgba(255,255,255,0.2)",
//                 border: "none",
//                 color: "white",
//                 padding: "10px",
//                 borderRadius: "10px",
//                 cursor: "pointer",
//                 width: "100%",
//               }}
//             >
//               تفعيل الآن
//             </button>
//           </SectionCard>
//         </div>
//       </BentoGrid>
//     </AppWrapper>
//   );
// }

// // Hjälpkomponent för framstegsmätare
// const ProgressBox = ({ label, value, color }) => (
//   <div>
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         fontSize: "0.8rem",
//         marginBottom: "5px",
//       }}
//     >
//       <span>{label}</span>
//       <span>{Math.round(value)}%</span>
//     </div>
//     <div
//       style={{
//         width: "100%",
//         height: "8px",
//         background: "#f1f5f9",
//         borderRadius: "10px",
//         overflow: "hidden",
//       }}
//     >
//       <motion.div
//         initial={{ width: 0 }}
//         animate={{ width: `${value}%` }}
//         transition={{ duration: 1, ease: "easeOut" }}
//         style={{ height: "100%", background: color }}
//       />
//     </div>
//   </div>
// );

import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  // MdSettings,
  MdSearch,
  MdDeleteOutline,
  // MdPersonAdd,
  MdClose,
  MdPalette,
  // MdNotificationsNone,
  MdArrowBack,
  MdSecurity,
  MdStorage,
  MdCloudQueue,
  MdFiberManualRecord,
} from "react-icons/md";

const GlobalStyle = createGlobalStyle`
  body { background: #f0f2f9; font-family: 'Inter', sans-serif; direction: rtl; margin: 0; color: #1b2559; overflow-x: hidden; }
  * { box-sizing: border-box; transition: border-color 0.2s; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
`;

// --- STYLED COMPONENTS ---
const AppContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.04);
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #10b981;
  background: #dcfce7;
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: 600;
`;

const ActivityLog = styled.div`
  font-size: 0.8rem;
  background: #1e293b;
  color: #94a3b8;
  padding: 15px;
  border-radius: 15px;
  height: 150px;
  overflow-y: auto;
  font-family: "Courier New", monospace;
`;

// --- MAIN COMPONENT ---
export default function AdvancedSettings() {
  const [themeColor, setThemeColor] = useState("#4f46e5");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [logs, setLogs] = useState([
    "[System] Startup complete",
    "[Auth] Admin logged in",
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "د. يوسف العلي",
      role: "مدير النظام",
      status: "online",
      email: "yousef@center.com",
    },
    {
      id: 2,
      name: "سارة أحمد",
      role: "موظف استقبال",
      status: "online",
      email: "sara@center.com",
    },
    {
      id: 3,
      name: "عمر خالد",
      role: "محاسب",
      status: "offline",
      email: "omar@center.com",
    },
  ]);

  // Simulera realtids-loggar
  useEffect(() => {
    const interval = setInterval(() => {
      const actions = ["Update", "Login", "Sync", "Backup"];
      const newLog = `[${
        actions[Math.floor(Math.random() * actions.length)]
      }] Activity detected at ${new Date().toLocaleTimeString()}`;
      setLogs((prev) => [newLog, ...prev].slice(0, 10));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

  return (
    <AppContainer>
      <GlobalStyle />

      {/* TOP BAR */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 style={{ fontSize: "2.2rem", margin: 0, fontWeight: "800" }}>
            مركز التحكم
          </h1>
          <p style={{ color: "#a3aed0", margin: "5px 0 0" }}>
            إدارة البنية التحتية والفريق التقني
          </p>
        </motion.div>

        <StatusIndicator>
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <MdFiberManualRecord size={12} />
          </motion.div>
          النظام يعمل بشكل مثالي
        </StatusIndicator>
      </header>

      <Grid>
        {/* LEFT PANEL: TEAM MANAGEMENT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <GlassCard layout>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <h2 style={{ fontSize: "1.4rem", margin: 0 }}>
                فريق العمل المعتمد
              </h2>
              <div style={{ display: "flex", gap: "15px" }}>
                <div
                  style={{
                    background: "#f4f7fe",
                    padding: "5px 15px",
                    borderRadius: "12px",
                    border: "1px solid #e0e5f2",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MdSearch color="#a3aed0" />
                  <input
                    placeholder="بحث في الفريق..."
                    style={{
                      border: "none",
                      background: "transparent",
                      outline: "none",
                      marginRight: "8px",
                      width: "150px",
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    background: themeColor,
                    color: "white",
                    border: "none",
                    padding: "10px 25px",
                    borderRadius: "15px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    boxShadow: `0 10px 20px ${themeColor}33`,
                  }}
                >
                  + إضافة عضو
                </motion.button>
              </div>
            </div>

            <LayoutGroup>
              <AnimatePresence mode="popLayout">
                {users
                  .filter((u) => u.name.includes(searchTerm))
                  .map((user, index) => (
                    <motion.div
                      key={user.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "20px",
                        background: "#fff",
                        borderRadius: "20px",
                        marginBottom: "15px",
                        border: "1px solid #f1f4f9",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.01)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "15px",
                            background: themeColor + "11",
                            color: themeColor,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                          }}
                        >
                          {user.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: "800" }}>{user.name}</div>
                          <div style={{ fontSize: "0.8rem", color: "#a3aed0" }}>
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.75rem",
                            padding: "6px 15px",
                            background: "#f4f7fe",
                            borderRadius: "10px",
                            color: themeColor,
                            fontWeight: "700",
                          }}
                        >
                          {user.role}
                        </span>
                        <motion.button
                          whileHover={{ color: "#ef4444", scale: 1.2 }}
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            color: "#cbd5e1",
                          }}
                          onClick={() => deleteUser(user.id)}
                        >
                          <MdDeleteOutline size={24} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </LayoutGroup>
          </GlassCard>

          {/* SYSTEM HEALTH CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px",
            }}
          >
            <GlassCard whileHover={{ y: -5 }}>
              <MdSecurity size={30} color="#4f46e5" />
              <h3>الأمان</h3>
              <p style={{ fontSize: "0.8rem", color: "#a3aed0" }}>
                تشفير SSL مفعل (256-bit)
              </p>
            </GlassCard>
            <GlassCard whileHover={{ y: -5 }}>
              <MdStorage size={30} color="#10b981" />
              <h3>التخزين</h3>
              <p style={{ fontSize: "0.8rem", color: "#a3aed0" }}>
                42% مستخدم من 1TB
              </p>
            </GlassCard>
            <GlassCard whileHover={{ y: -5 }}>
              <MdCloudQueue size={30} color="#f59e0b" />
              <h3>السحابة</h3>
              <p style={{ fontSize: "0.8rem", color: "#a3aed0" }}>
                آخر مزامنة: الآن
              </p>
            </GlassCard>
          </div>
        </div>

        {/* RIGHT PANEL: SETTINGS & LOGS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <GlassCard>
            <h3
              style={{
                margin: "0 0 20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <MdPalette /> تخصيص الواجهة
            </h3>
            <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
              {[
                "#4f46e5",
                "#10b981",
                "#ef4444",
                "#f59e0b",
                "#06b6d4",
                "#ec4899",
              ].map((c) => (
                <motion.div
                  key={c}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  onClick={() => setThemeColor(c)}
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "12px",
                    background: c,
                    cursor: "pointer",
                    border:
                      themeColor === c
                        ? "3px solid #1e293b"
                        : "3px solid white",
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: "0.8rem", color: "#a3aed0" }}>
              هذا اللون سيؤثر على جميع الأزرار والروابط في النظام.
            </p>
          </GlassCard>

          <GlassCard style={{ background: "#1b2559", color: "white" }}>
            <h3 style={{ margin: "0 0 15px", fontSize: "1rem" }}>
              سجل النشاط المباشر
            </h3>
            <ActivityLog>
              {logs.map((log, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "5px",
                    color: i === 0 ? themeColor : "#94a3b8",
                  }}
                >
                  {log}
                </div>
              ))}
            </ActivityLog>
            <button
              style={{
                width: "100%",
                marginTop: "15px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "white",
                padding: "12px",
                borderRadius: "15px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              تحميل السجلات الكاملة <MdArrowBack />
            </button>
          </GlassCard>
        </div>
      </Grid>

      {/* MODAL FÖR NY ANVÄNDARE */}
      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
            >
              <GlassCard style={{ width: "450px", background: "#fff" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                  }}
                >
                  <h2 style={{ margin: 0 }}>عضو جديد</h2>
                  <MdClose
                    size={28}
                    onClick={() => setIsModalOpen(false)}
                    style={{ cursor: "pointer" }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <label style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                    الاسم بالكامل
                  </label>
                  <input
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid #e0e5f2",
                    }}
                    placeholder="مثال: أحمد علي"
                  />

                  <label style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                    البريد الإلكتروني
                  </label>
                  <input
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid #e0e5f2",
                    }}
                    placeholder="ahmed@example.com"
                  />

                  <label style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                    مستوى الصلاحية
                  </label>
                  <select
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid #e0e5f2",
                      background: "#fff",
                    }}
                  >
                    <option>مدير (Full Access)</option>
                    <option>موظف (Standard)</option>
                    <option>مشاهد (Read Only)</option>
                  </select>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      marginTop: "10px",
                      background: themeColor,
                      color: "white",
                      border: "none",
                      padding: "15px",
                      borderRadius: "15px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    إرسال دعوة الانضمام
                  </motion.button>
                </div>
              </GlassCard>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </AppContainer>
  );
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;
