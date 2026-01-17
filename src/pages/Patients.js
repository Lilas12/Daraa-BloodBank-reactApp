// import React, { useState, useMemo } from "react";
// import styled, { createGlobalStyle } from "styled-components";
// import { motion, AnimatePresence } from "framer-motion";
// import { mockPatients } from "../components/mockData";
// const initialData = mockPatients;
// const GlobalStyle = createGlobalStyle`
//   :root {
//     --primary: #1e3a8a;
//     --primary-light: #3b82f6;
//     --bg-main: #f8fafc;
//     --bg-sidebar: #0f172a;
//     --text-main: #1e293b;
//     --text-muted: #64748b;
//     --accent: #ef4444;
//     --success: #10b981;
//     --warning: #f59e0b;
//     --border: #e2e8f0;
//   }
//   * { box-sizing: border-box; margin: 0; padding: 0; }
//   body {
//     font-family: 'Inter', system-ui, sans-serif;
//     background-color: var(--bg-main);
//     direction: rtl;
//   }
// `;

// // --- Styled Components ---
// const Layout = styled.div`
//   display: flex;
//   min-height: 100vh;
// `;

// const Sidebar = styled.aside`
//   width: 280px;
//   background: var(--bg-sidebar);
//   color: white;
//   padding: 2rem 1rem;
//   display: flex;
//   flex-direction: column;
//   position: fixed;
//   height: 100vh;
//   right: 0;
//   z-index: 100;
//   @media (max-width: 1024px) {
//     width: 80px;
//     padding: 1rem 0.5rem;
//   }
// `;

// const NavItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   padding: 12px 16px;
//   margin-bottom: 8px;
//   border-radius: 12px;
//   cursor: pointer;
//   transition: all 0.2s;
//   background: ${(props) =>
//     props.active ? "var(--primary-light)" : "transparent"};
//   color: ${(props) => (props.active ? "white" : "#cbd5e1")};
//   &:hover {
//     background: ${(props) =>
//       props.active ? "var(--primary-light)" : "rgba(255,255,255,0.1)"};
//   }
//   span.label {
//     @media (max-width: 1024px) {
//       display: none;
//     }
//   }
// `;

// const MainContent = styled.main`
//   flex: 1;
//   margin-right: 280px;
//   padding: 2.5rem;
//   @media (max-width: 1024px) {
//     margin-right: 80px;
//     padding: 1.5rem;
//   }
// `;

// const HeaderSection = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 2rem;
// `;

// const AddButton = styled(motion.button)`
//   background: var(--primary-light);
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 10px;
//   font-weight: 600;
//   cursor: pointer;
// `;

// const Card = styled(motion.div)`
//   background: white;
//   padding: 1.5rem;
//   border-radius: 16px;
//   border: 1px solid var(--border);
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin-top: 1rem;
//   th,
//   td {
//     text-align: right;
//     padding: 1rem;
//     border-bottom: 1px solid var(--border);
//   }
//   th {
//     color: var(--text-muted);
//     font-size: 0.85rem;
//   }
// `;

// // --- Views ---

// // 1. Patientvyn (Din befintliga kod)
// const PatientsView = ({ patients, onDelete }) => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//   >
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//         gap: "1.5rem",
//       }}
//     >
//       {patients.map((p) => (
//         <PatientCard
//           key={p.id}
//           status={p.status}
//           layout
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Avatar>{p.name.charAt(0)}</Avatar>
//             <StatusBadge status={p.status}>{p.status}</StatusBadge>
//           </div>
//           <div style={{ marginTop: "1rem" }}>
//             <h3 style={{ fontSize: "1.1rem" }}>{p.name}</h3>
//             <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
//               عمر: {p.age} | فصيلة: {p.bloodType}
//             </p>
//           </div>
//           <DeleteBtn onClick={() => onDelete(p.id)}>🗑️</DeleteBtn>
//         </PatientCard>
//       ))}
//     </div>
//   </motion.div>
// );

// // 2. Bokningsvyn (Ny funktionell vy)
// const AppointmentsView = () => {
//   const [appointments] = useState([
//     {
//       id: 1,
//       time: "09:00",
//       patient: "أحمد علي",
//       service: "كشف عام",
//       room: "A1",
//     },
//     {
//       id: 2,
//       time: "10:30",
//       patient: "سارة حسن",
//       service: "فحص دم",
//       room: "Lab",
//     },
//     {
//       id: 3,
//       time: "11:15",
//       patient: "محمد كريم",
//       service: "أشعة",
//       room: "X-Ray",
//     },
//     {
//       id: 4,
//       time: "13:00",
//       patient: "ليلى محمود",
//       service: "استشارة",
//       room: "B3",
//     },
//   ]);

//   return (
//     <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
//       <Card>
//         <h3 style={{ marginBottom: "1rem" }}>جدول المواعيد اليومية</h3>
//         <Table>
//           <thead>
//             <tr>
//               <th>الوقت</th>
//               <th>المريض</th>
//               <th>الخدمة</th>
//               <th>الغرفة</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((app) => (
//               <tr key={app.id}>
//                 <td
//                   style={{ fontWeight: "bold", color: "var(--primary-light)" }}
//                 >
//                   {app.time}
//                 </td>
//                 <td>{app.patient}</td>
//                 <td>{app.service}</td>
//                 <td>
//                   <StatusBadge status="مستقر">{app.room}</StatusBadge>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card>
//     </motion.div>
//   );
// };

// // 3. Rapportvyn (Ny funktionell vy)
// const ReportsView = ({ patients }) => {
//   const stats = {
//     total: patients.length,
//     critical: patients.filter((p) => p.status === "حرج").length,
//     stable: patients.filter((p) => p.status === "مستقر").length,
//   };

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//           gap: "1.5rem",
//           marginBottom: "2rem",
//         }}
//       >
//         <StatCard color="var(--primary-light)">
//           <small>إجمالي المرضى</small>
//           <h2>{stats.total}</h2>
//         </StatCard>
//         <StatCard color="var(--accent)">
//           <small>حالات حرجة</small>
//           <h2>{stats.critical}</h2>
//         </StatCard>
//         <StatCard color="var(--success)">
//           <small>حالات مستقرة</small>
//           <h2>{stats.stable}</h2>
//         </StatCard>
//       </div>
//       <Card>
//         <h3>التقرير التحليلي الأسبوعي</h3>
//         <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>
//           يتم تحديث هذه البيانات تلقائياً بناءً على سجلات المرضى المدخلة.
//         </p>
//         <div
//           style={{
//             marginTop: "20px",
//             height: "10px",
//             width: "100%",
//             background: "#eee",
//             borderRadius: "5px",
//             overflow: "hidden",
//             display: "flex",
//           }}
//         >
//           <div
//             style={{
//               width: `${(stats.critical / stats.total) * 100}%`,
//               background: "var(--accent)",
//             }}
//           />
//           <div
//             style={{
//               width: `${(stats.stable / stats.total) * 100}%`,
//               background: "var(--success)",
//             }}
//           />
//         </div>
//         <div
//           style={{
//             display: "flex",
//             gap: "20px",
//             marginTop: "10px",
//             fontSize: "0.8rem",
//           }}
//         >
//           <span>● حرجة ({stats.critical})</span>
//           <span>● مستقرة ({stats.stable})</span>
//         </div>
//       </Card>
//     </motion.div>
//   );
// };

// // --- Main App ---
// export default function ProfessionalDashboard() {
//   const [activeTab, setActiveTab] = useState("patients");
//   const [patients, setPatients] = useState(initialData);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     bloodType: "O+",
//     status: "مستقر",
//   });

//   const deletePatient = (id) =>
//     setPatients(patients.filter((p) => p.id !== id));

//   const handleAddPatient = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.age) return alert("Fyll i fälten!");
//     setPatients([{ ...formData, id: Date.now() }, ...patients]);
//     setIsModalOpen(false);
//     setFormData({ name: "", age: "", bloodType: "O+", status: "مستقر" });
//   };

//   return (
//     <>
//       <GlobalStyle />
//       <Layout>
//         <Sidebar>
//           <div
//             style={{
//               padding: "0 1rem 2rem",
//               fontSize: "1.2rem",
//               fontWeight: "bold",
//             }}
//           >
//             ملف المرضى 🏥
//           </div>
//           <NavItem
//             active={activeTab === "patients"}
//             onClick={() => setActiveTab("patients")}
//           >
//             <span>👥</span> <span className="label">المرضى</span>
//           </NavItem>
//           <NavItem
//             active={activeTab === "appointments"}
//             onClick={() => setActiveTab("appointments")}
//           >
//             <span>📅</span> <span className="label">المواعيد</span>
//           </NavItem>
//           <NavItem
//             active={activeTab === "reports"}
//             onClick={() => setActiveTab("reports")}
//           >
//             <span>📋</span> <span className="label">التقارير</span>
//           </NavItem>
//         </Sidebar>

//         <MainContent>
//           <HeaderSection>
//             <div>
//               <h1 style={{ fontSize: "1.8rem" }}>
//                 {activeTab === "patients" && "إدارة المرضى"}
//                 {activeTab === "appointments" && "جدول المواعيد"}
//                 {activeTab === "reports" && "التقارير والإحصائيات"}
//               </h1>
//               <p style={{ color: "var(--text-muted)" }}>
//                 لوحة تحكم النظام الطبي
//               </p>
//             </div>
//             {activeTab === "patients" && (
//               <AddButton
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setIsModalOpen(true)}
//               >
//                 + إضافة مريض جديد
//               </AddButton>
//             )}
//           </HeaderSection>

//           <AnimatePresence mode="wait">
//             {activeTab === "patients" && (
//               <PatientsView
//                 key="p"
//                 patients={patients}
//                 onDelete={deletePatient}
//               />
//             )}
//             {activeTab === "appointments" && <AppointmentsView key="a" />}
//             {activeTab === "reports" && (
//               <ReportsView key="r" patients={patients} />
//             )}
//           </AnimatePresence>
//         </MainContent>
//       </Layout>

//       {/* MODAL (Befintlig) */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <ModalOverlay
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsModalOpen(false)}
//           >
//             <ModalContent
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h2>تسجيل مريض جديد</h2>
//               <form onSubmit={handleAddPatient}>
//                 <Input
//                   placeholder="الاسم الكامل"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                 />
//                 <Input
//                   type="number"
//                   placeholder="العمر"
//                   value={formData.age}
//                   onChange={(e) =>
//                     setFormData({ ...formData, age: e.target.value })
//                   }
//                 />
//                 <Select
//                   value={formData.bloodType}
//                   onChange={(e) =>
//                     setFormData({ ...formData, bloodType: e.target.value })
//                   }
//                 >
//                   {["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"].map(
//                     (t) => (
//                       <option key={t} value={t}>
//                         {t}
//                       </option>
//                     )
//                   )}
//                 </Select>
//                 <Select
//                   value={formData.status}
//                   onChange={(e) =>
//                     setFormData({ ...formData, status: e.target.value })
//                   }
//                 >
//                   <option value="مستقر">مستقر</option>
//                   <option value="حرج">حرج</option>
//                 </Select>
//                 <div
//                   style={{ display: "flex", gap: "10px", marginTop: "1.5rem" }}
//                 >
//                   <AddButton type="submit" style={{ flex: 1 }}>
//                     حفظ
//                   </AddButton>
//                   <AddButton
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     style={{
//                       flex: 1,
//                       background: "#e2e8f0",
//                       color: "var(--text-main)",
//                     }}
//                   >
//                     إلغاء
//                   </AddButton>
//                 </div>
//               </form>
//             </ModalContent>
//           </ModalOverlay>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// // --- Extra Styling Elements ---
// const PatientCard = styled(motion.div)`
//   background: white;
//   padding: 1.5rem;
//   border-radius: 16px;
//   border: 1px solid var(--border);
//   position: relative;
//   &::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     width: 4px;
//     border-radius: 0 16px 16px 0;
//     background: ${(props) =>
//       props.status === "حرج" ? "var(--accent)" : "var(--success)"};
//   }
// `;
// const Avatar = styled.div`
//   width: 40px;
//   height: 40px;
//   background: #f1f5f9;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: bold;
// `;
// const StatusBadge = styled.span`
//   padding: 4px 12px;
//   border-radius: 20px;
//   font-size: 0.75rem;
//   font-weight: bold;
//   background: ${(props) => (props.status === "حرج" ? "#fee2e2" : "#dcfce7")};
//   color: ${(props) => (props.status === "حرج" ? "#991b1b" : "#166534")};
// `;
// const DeleteBtn = styled.button`
//   position: absolute;
//   bottom: 1rem;
//   left: 1rem;
//   background: none;
//   border: none;
//   cursor: pointer;
//   opacity: 0.3;
//   &:hover {
//     opacity: 1;
//     color: var(--accent);
//   }
// `;
// const StatCard = styled(Card)`
//   border-top: 4px solid ${(props) => props.color};
//   h2 {
//     margin-top: 5px;
//     font-size: 2rem;
//   }
// `;
// const ModalOverlay = styled(motion.div)`
//   position: fixed;
//   inset: 0;
//   background: rgba(0, 0, 0, 0.5);
//   backdrop-filter: blur(4px);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;
// const ModalContent = styled(motion.div)`
//   background: white;
//   padding: 2rem;
//   border-radius: 20px;
//   width: 100%;
//   max-width: 450px;
// `;
// const Input = styled.input`
//   width: 100%;
//   padding: 12px;
//   margin: 8px 0;
//   border: 1px solid var(--border);
//   border-radius: 8px;
// `;
// const Select = styled.select`
//   width: 100%;
//   padding: 12px;
//   margin: 8px 0;
//   border: 1px solid var(--border);
//   border-radius: 8px;
// `;
// import React, { useState, useEffect } from "react";
// import styled, { createGlobalStyle } from "styled-components";
// import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// // --- Global Styles ---
// const GlobalStyle = createGlobalStyle`
//   :root {
//     --primary: #4f46e5;
//     --primary-light: #818cf8;
//     --bg-main: #f1f5f9;
//     --bg-sidebar: #1e1b4b;
//     --text-main: #0f172a;
//     --text-muted: #64748b;
//     --accent: #f43f5e;
//     --success: #10b981;
//     --warning: #f59e0b;
//     --border: #e2e8f0;
//     --white: #ffffff;
//   }
//   * { box-sizing: border-box; margin: 0; padding: 0; }
//   body {
//     font-family: 'Inter', system-ui, sans-serif;
//     background-color: var(--bg-main);
//     color: var(--text-main);
//     direction: rtl;
//     overflow-x: hidden;
//   }
// `;

// // --- Styled Components ---
// const Layout = styled.div`
//   display: flex;
//   min-height: 100vh;
//   flex-direction: row;
// `;

// const Sidebar = styled(motion.aside)`
//   width: 280px;
//   background: var(--bg-sidebar);
//   color: white;
//   padding: 2.5rem 1.5rem;
//   display: flex;
//   flex-direction: column;
//   position: fixed;
//   height: 100vh;
//   right: 0;
//   z-index: 1000;
//   box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);

//   @media (max-width: 1024px) {
//     right: ${(props) => (props.isOpen ? "0" : "-280px")};
//     transition: right 0.3s ease;
//   }
// `;

// const MobileOverlay = styled.div`
//   display: none;
//   @media (max-width: 1024px) {
//     display: ${(props) => (props.show ? "block" : "none")};
//     position: fixed;
//     inset: 0;
//     background: rgba(0, 0, 0, 0.5);
//     z-index: 999;
//     backdrop-filter: blur(4px);
//   }
// `;

// const MenuButton = styled.button`
//   display: none;
//   @media (max-width: 1024px) {
//     display: flex;
//     position: fixed;
//     bottom: 20px;
//     right: 20px;
//     width: 60px;
//     height: 60px;
//     border-radius: 50%;
//     background: var(--primary);
//     color: white;
//     border: none;
//     z-index: 1001;
//     justify-content: center;
//     align-items: center;
//     font-size: 1.5rem;
//     box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
//   }
// `;

// const NavItem = styled(motion.div)`
//   display: flex;
//   align-items: center;
//   gap: 15px;
//   padding: 14px 18px;
//   margin-bottom: 10px;
//   border-radius: 16px;
//   cursor: pointer;
//   background: ${(props) =>
//     props.active ? "rgba(255,255,255,0.15)" : "transparent"};
//   color: ${(props) => (props.active ? "white" : "#94a3b8")};
//   font-weight: ${(props) => (props.active ? "700" : "500")};
//   &:hover {
//     background: rgba(255, 255, 255, 0.1);
//   }
// `;

// const MainContent = styled.main`
//   flex: 1;
//   margin-right: 280px;
//   padding: 2rem;
//   transition: margin-right 0.3s ease;

//   @media (max-width: 1024px) {
//     margin-right: 0;
//     padding: 1rem;
//     padding-bottom: 100px; /* Space for mobile menu button */
//   }
// `;

// const Card = styled(motion.div)`
//   background: var(--white);
//   padding: 1.5rem;
//   border-radius: 24px;
//   border: 1px solid var(--border);
//   box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
// `;

// // --- MODAL COMPONENTS ---
// const ModalOverlay = styled(motion.div)`
//   position: fixed;
//   inset: 0;
//   background: rgba(0, 0, 0, 0.5);
//   backdrop-filter: blur(4px);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 2000;
//   padding: 1rem;
// `;

// const ModalContent = styled(motion.div)`
//   background: white;
//   padding: 2rem;
//   border-radius: 24px;
//   width: 100%;
//   max-width: 450px;
//   max-height: 90vh;
//   overflow-y: auto;
// `;

// // --- VIEWS ---
// const AppointmentsView = () => {
//   const [appointments, setApps] = useState([
//     {
//       id: 1,
//       time: "09:00",
//       patient: "أحمد علي",
//       type: "فحص دوري",
//       status: "waiting",
//     },
//     {
//       id: 2,
//       time: "11:30",
//       patient: "سارة حسن",
//       type: "مختبر",
//       status: "waiting",
//     },
//     {
//       id: 3,
//       time: "14:15",
//       patient: "عمر فهد",
//       type: "استشارة",
//       status: "waiting",
//     },
//   ]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       style={{ display: "grid", gap: "15px" }}
//     >
//       <h2 style={{ marginBottom: "1rem" }}>📅 جدول المواعيد</h2>
//       <LayoutGroup>
//         {appointments.map((app) => (
//           <Card
//             key={app.id}
//             layout
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: "15px",
//               justifyContent: "space-between",
//               alignItems: "center",
//               borderRight:
//                 app.status === "done"
//                   ? "8px solid var(--success)"
//                   : "8px solid var(--primary)",
//             }}
//           >
//             <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
//               <div
//                 style={{
//                   textAlign: "center",
//                   background: "#f1f5f9",
//                   padding: "10px",
//                   borderRadius: "15px",
//                   minWidth: "70px",
//                 }}
//               >
//                 <div style={{ fontWeight: "900", color: "var(--primary)" }}>
//                   {app.time}
//                 </div>
//                 <small>صباحاً</small>
//               </div>
//               <div>
//                 <h4
//                   style={{
//                     textDecoration:
//                       app.status === "done" ? "line-through" : "none",
//                   }}
//                 >
//                   {app.patient}
//                 </h4>
//                 <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
//                   {app.type}
//                 </p>
//               </div>
//             </div>
//             <button
//               style={{
//                 background:
//                   app.status === "done" ? "#f1f5f9" : "var(--primary)",
//                 color: app.status === "done" ? "var(--success)" : "white",
//                 border: "none",
//                 padding: "10px 15px",
//                 borderRadius: "12px",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//                 width: "100%",
//                 maxWidth: "120px",
//               }}
//             >
//               {app.status === "done" ? "تم ✓" : "إتمام"}
//             </button>
//           </Card>
//         ))}
//       </LayoutGroup>
//     </motion.div>
//   );
// };

// const ReportsView = ({ patients }) => {
//   const [pulse, setPulse] = useState(72);
//   useEffect(() => {
//     const interval = setInterval(() => setPulse(70 + Math.random() * 6), 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gap: "20px",
//       }}
//     >
//       <Card
//         style={{
//           background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
//           color: "white",
//         }}
//       >
//         <small>حالة النبض</small>
//         <h1 style={{ fontSize: "2.5rem" }}>{pulse.toFixed(0)} BPM</h1>
//       </Card>
//       <Card style={{ textAlign: "center" }}>
//         <small>الإشغال</small>
//         <div style={{ fontSize: "2rem", fontWeight: "900", margin: "10px 0" }}>
//           65%
//         </div>
//         <div
//           style={{
//             height: "8px",
//             background: "#f1f5f9",
//             borderRadius: "4px",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               width: "65%",
//               height: "100%",
//               background: "var(--primary)",
//             }}
//           ></div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// // --- MAIN APP ---
// export default function Dashboard() {
//   const [tab, setTab] = useState("patients");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [patients, setPatients] = useState([
//     { id: 1, name: "أحمد علي", age: 45, status: "حرج", gender: "kille" },
//     { id: 2, name: "سارة حسن", age: 32, status: "مستقر", gender: "tjej" },
//   ]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleAddPatient = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const newPatient = {
//       id: Date.now(),
//       name: formData.get("name"),
//       age: formData.get("age"),
//       status: formData.get("status"),
//       gender: formData.get("gender"),
//     };
//     setPatients([newPatient, ...patients]);
//     setIsModalOpen(false);
//   };

//   return (
//     <Layout>
//       <GlobalStyle />

//       <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//         {isSidebarOpen ? "✕" : "☰"}
//       </MenuButton>

//       <MobileOverlay
//         show={isSidebarOpen}
//         onClick={() => setIsSidebarOpen(false)}
//       />

//       <Sidebar isOpen={isSidebarOpen}>
//         <div
//           style={{
//             fontSize: "1.5rem",
//             fontWeight: "900",
//             marginBottom: "2rem",
//             textAlign: "center",
//           }}
//         >
//           MED+ 🏥
//         </div>
//         <NavItem
//           active={tab === "patients"}
//           onClick={() => {
//             setTab("patients");
//             setIsSidebarOpen(false);
//           }}
//         >
//           <span>👥</span> <span>المرضى</span>
//         </NavItem>
//         <NavItem
//           active={tab === "appointments"}
//           onClick={() => {
//             setTab("appointments");
//             setIsSidebarOpen(false);
//           }}
//         >
//           <span>📅</span> <span>المواعيد</span>
//         </NavItem>
//         <NavItem
//           active={tab === "reports"}
//           onClick={() => {
//             setTab("reports");
//             setIsSidebarOpen(false);
//           }}
//         >
//           <span>📋</span> <span>التقارير</span>
//         </NavItem>
//       </Sidebar>

//       <MainContent>
//         <header
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "15px",
//             marginBottom: "30px",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               width: "100%",
//             }}
//           >
//             <div>
//               <h1 style={{ fontSize: "1.5rem" }}>لوحة التحكم</h1>
//               <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
//                 إدارة البيانات
//               </p>
//             </div>
//             {tab === "patients" && (
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsModalOpen(true)}
//                 style={{
//                   background: "var(--primary)",
//                   color: "white",
//                   border: "none",
//                   padding: "10px 15px",
//                   borderRadius: "12px",
//                   fontSize: "0.9rem",
//                   cursor: "pointer",
//                 }}
//               >
//                 + إضافة
//               </motion.button>
//             )}
//           </div>
//         </header>

//         <AnimatePresence mode="wait">
//           {tab === "patients" && (
//             <motion.div
//               key="p"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//                 gap: "20px",
//               }}
//             >
//               {patients.map((p) => (
//                 <Card key={p.id} whileHover={{ y: -5 }}>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       marginBottom: "15px",
//                     }}
//                   >
//                     <img
//                       src={`https://api.dicebear.com/7.x/${
//                         p.gender === "tjej" ? "lorelei" : "adventurer"
//                       }/svg?seed=${p.name}`}
//                       style={{
//                         width: "45px",
//                         height: "45px",
//                         borderRadius: "10px",
//                         background: "#f1f5f9",
//                       }}
//                       alt="avatar"
//                     />
//                     <div
//                       style={{
//                         padding: "4px 10px",
//                         borderRadius: "8px",
//                         fontSize: "0.7rem",
//                         fontWeight: "800",
//                         background: p.status === "حرج" ? "#fff1f2" : "#f0fdf4",
//                         color:
//                           p.status === "حرج"
//                             ? "var(--accent)"
//                             : "var(--success)",
//                       }}
//                     >
//                       ● {p.status}
//                     </div>
//                   </div>
//                   <h3>{p.name}</h3>
//                   <p
//                     style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}
//                   >
//                     {p.age} سنة
//                   </p>
//                   <div style={{ marginTop: "15px", textAlign: "left" }}>
//                     <button
//                       onClick={() =>
//                         setPatients(patients.filter((x) => x.id !== p.id))
//                       }
//                       style={{
//                         background: "none",
//                         border: "none",
//                         cursor: "pointer",
//                       }}
//                     >
//                       🗑️
//                     </button>
//                   </div>
//                 </Card>
//               ))}
//             </motion.div>
//           )}
//           {tab === "appointments" && <AppointmentsView />}
//           {tab === "reports" && <ReportsView patients={patients} />}
//         </AnimatePresence>
//       </MainContent>

//       <AnimatePresence>
//         {isModalOpen && (
//           <ModalOverlay
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsModalOpen(false)}
//           >
//             <ModalContent onClick={(e) => e.stopPropagation()}>
//               <h2>إضافة مريض جديد</h2>
//               <form onSubmit={handleAddPatient} style={{ marginTop: "15px" }}>
//                 <input
//                   name="name"
//                   placeholder="الاسم"
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     marginBottom: "10px",
//                     borderRadius: "10px",
//                     border: "1px solid #ddd",
//                   }}
//                 />
//                 <input
//                   name="age"
//                   type="number"
//                   placeholder="العمر"
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     marginBottom: "10px",
//                     borderRadius: "10px",
//                     border: "1px solid #ddd",
//                   }}
//                 />
//                 <select
//                   name="gender"
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     marginBottom: "10px",
//                     borderRadius: "10px",
//                     border: "1px solid #ddd",
//                   }}
//                 >
//                   <option value="kille">ذكر</option>
//                   <option value="tjej">أنثى</option>
//                 </select>
//                 <select
//                   name="status"
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     marginBottom: "20px",
//                     borderRadius: "10px",
//                     border: "1px solid #ddd",
//                   }}
//                 >
//                   <option value="مستقر">مستقر</option>
//                   <option value="حرج">حرج</option>
//                 </select>
//                 <div style={{ display: "flex", gap: "10px" }}>
//                   <button
//                     type="submit"
//                     style={{
//                       flex: 1,
//                       background: "var(--primary)",
//                       color: "white",
//                       border: "none",
//                       padding: "12px",
//                       borderRadius: "10px",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     حفظ
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     style={{
//                       flex: 1,
//                       background: "#f1f5f9",
//                       border: "none",
//                       padding: "12px",
//                       borderRadius: "10px",
//                     }}
//                   >
//                     إلغاء
//                   </button>
//                 </div>
//               </form>
//             </ModalContent>
//           </ModalOverlay>
//         )}
//       </AnimatePresence>
//     </Layout>
//   );
// }

import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f0f2f5;
    color: #1a1c1e;
    direction: rtl;
  }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(79, 70, 229, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GlassHeader = styled(motion.nav)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(15px);
  padding: 1rem 2rem;
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  box-shadow: 10px 10px 30px #bebebe, -10px -10px 30px #ffffff;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const NavItem = styled.div`
  padding: 10px 20px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 700;
  background: ${(p) => (p.active ? "#4f46e5" : "transparent")};
  color: ${(p) => (p.active ? "#fff" : "#64748b")};
  transition: 0.3s;
`;

const Card = styled(motion.div)`
  background: #f0f2f5;
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 7px 7px 14px #d1d1d1, -7px -7px 14px #ffffff;
  position: relative;
`;

const FloatingButton = styled(motion.button)`
  background: #4f46e5;
  color: white;
  border: none;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  position: fixed;
  bottom: 30px;
  left: 30px;
  font-size: 35px;
  cursor: pointer;
  animation: ${pulse} 2s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 1rem;
`;

const StatusBadge = styled.span`
  padding: 5px 12px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: bold;
  background: ${(p) => (p.status === "حرج" ? "#fee2e2" : "#dcfce7")};
  color: ${(p) => (p.status === "حرج" ? "#ef4444" : "#16a34a")};
`;

// --- Huvudkomponenten ---
export default function PatientDashboard() {
  const [tab, setTab] = useState("patients");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "ياسين درويش",
      age: 45,
      gender: "kille",
      status: "حرج",
      time: "10:30",
    },
    {
      id: 2,
      name: "ليلى أحمد",
      age: 32,
      gender: "tjej",
      status: "مستقر",
      time: "09:15",
    },
  ]);

  const addPatient = (e) => {
    e.preventDefault();
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const newPatient = {
      id: Date.now(),
      name: e.target.name.value,
      age: e.target.age.value,
      gender: e.target.gender.value,
      status: e.target.status.value,
      time: currentTime,
    };

    setPatients([newPatient, ...patients]);
    setIsModalOpen(false);
  };

  return (
    <AppContainer>
      <GlobalStyle />

      <GlassHeader>
        <h1 style={{ color: "#4f46e5" }}>سجل المرضى</h1>
        <div style={{ display: "flex", gap: "5px" }}>
          <NavItem
            active={tab === "patients"}
            onClick={() => setTab("patients")}
          >
            👥 المرضى
          </NavItem>
          <NavItem
            active={tab === "appointments"}
            onClick={() => setTab("appointments")}
          >
            📅 المواعيد
          </NavItem>
          <NavItem active={tab === "stats"} onClick={() => setTab("stats")}>
            📊 الإحصائيات
          </NavItem>
        </div>
      </GlassHeader>

      <AnimatePresence mode="wait">
        {/* FLIK: PATIENTER */}
        {tab === "patients" && (
          <motion.div
            key="p"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "25px",
              }}
            >
              {patients.map((p) => (
                <Card key={p.id} whileHover={{ y: -5 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>
                      {p.gender === "tjej" ? "👩" : "👨"}
                    </span>
                    <StatusBadge status={p.status}>{p.status}</StatusBadge>
                  </div>
                  <h3 style={{ marginTop: "10px" }}>{p.name}</h3>
                  <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                    العمر: {p.age} سنة
                  </p>
                  <div
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid #ddd",
                      paddingTop: "10px",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                      🕒 تم الإدخال: {p.time}
                    </span>
                    <button
                      onClick={() =>
                        setPatients(patients.filter((x) => x.id !== p.id))
                      }
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                      }}
                    >
                      حذف
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* FLIK: MÖTEN */}
        {tab === "appointments" && (
          <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>جدول المواعيد اليومية</h2>
            <div style={{ marginTop: "20px" }}>
              {patients.map((p) => (
                <Card
                  key={p.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <div>
                    <strong>{p.name}</strong>
                    <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      موعد الساعة: {p.time}
                    </p>
                  </div>
                  <StatusBadge status={p.status}>{p.status}</StatusBadge>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* FLIK: STATISTIK */}
        {tab === "stats" && (
          <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "25px",
              }}
            >
              <Card
                style={{ textAlign: "center", borderTop: "5px solid #4f46e5" }}
              >
                <small>إجمالي المسجلين</small>
                <div style={{ fontSize: "3.5rem", fontWeight: 900 }}>
                  {patients.length}
                </div>
              </Card>
              <Card
                style={{ textAlign: "center", borderTop: "5px solid #ef4444" }}
              >
                <small>الحالات الحرجة</small>
                <div
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    color: "#ef4444",
                  }}
                >
                  {patients.filter((x) => x.status === "حرج").length}
                </div>
              </Card>
              <Card
                style={{ textAlign: "center", borderTop: "5px solid #10b981" }}
              >
                <small>الحالات المستقرة</small>
                <div
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    color: "#10b981",
                  }}
                >
                  {patients.filter((x) => x.status === "مستقر").length}
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
      >
        +
      </FloatingButton>

      {/* MODAL FÖR NY PATIENT */}
      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <Card
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "450px",
                background: "#fff",
                padding: "2rem",
              }}
            >
              <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
                إضافة مريض جديد
              </h2>
              <form
                onSubmit={addPatient}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <input
                  name="name"
                  placeholder="الاسم الكامل"
                  required
                  style={inputStyle}
                />
                <input
                  name="age"
                  type="number"
                  placeholder="العمر"
                  required
                  style={inputStyle}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                  <select name="gender" style={inputStyle}>
                    <option value="kille">ذكر (Kille)</option>
                    <option value="tjej">أنثى (Tjej)</option>
                  </select>
                  <select name="status" style={inputStyle}>
                    <option value="مستقر">مستقر (Stabil)</option>
                    <option value="حرج">حرج (Kritisk)</option>
                  </select>
                </div>

                <button type="submit" style={submitBtnStyle}>
                  حفظ وإضافة الآن
                </button>
              </form>
            </Card>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </AppContainer>
  );
}

const inputStyle = {
  padding: "14px",
  borderRadius: "15px",
  border: "1px solid #e2e8f0",
  width: "100%",
  outline: "none",
  background: "#f8fafc",
};
const submitBtnStyle = {
  padding: "16px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "15px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
};
