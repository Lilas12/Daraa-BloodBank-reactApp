// // // import React, { useState } from "react";
// // // import styled, {
// // //   createGlobalStyle,
// // //   ThemeProvider,
// // //   keyframes,
// // // } from "styled-components";
// // // // KORRIGERAD IMPORT: Alla ikoner som används i koden finns nu här
// // // import {
// // //   FaTint,
// // //   FaHospital,
// // //   FaHeart,
// // //   FaCheckCircle,
// // //   FaMapMarkerAlt,
// // //   FaPlus,
// // //   FaSearch,
// // //   FaUserPlus,
// // //   FaPhoneAlt,
// // // } from "react-icons/fa";
// // // import { motion, AnimatePresence } from "framer-motion";

// // // const theme = {
// // //   colors: {
// // //     bloodRed: "#b71c1c",
// // //     brightRed: "#ff1744",
// // //     softRed: "#fff5f5",
// // //     navy: "#0d47a1",
// // //     success: "#1b5e20",
// // //     white: "#ffffff",
// // //     lightGray: "#f1f3f4",
// // //     border: "#e0e0e0",
// // //   },
// // // };

// // // const pulse = keyframes`
// // //   0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(183, 28, 28, 0.4); }
// // //   70% { transform: scale(1.02); box-shadow: 0 0 0 15px rgba(183, 28, 28, 0); }
// // //   100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(183, 28, 28, 0); }
// // // `;

// // // const GlobalStyle = createGlobalStyle`
// // //   @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
// // //   body {
// // //     margin: 0; padding: 0;
// // //     font-family: 'Cairo', sans-serif;
// // //     background-color: #f8f9fa;
// // //     direction: rtl;
// // //   }
// // // `;

// // // const Container = styled(motion.div)`
// // //   max-width: 500px;
// // //   margin: 20px auto;
// // //   background: white;
// // //   border-radius: 25px;
// // //   box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
// // //   overflow: hidden;
// // //   border: 1px solid ${(props) => props.theme.colors.border};
// // // `;

// // // const BloodHeader = styled.div`
// // //   background: linear-gradient(
// // //     180deg,
// // //     ${(props) => props.theme.colors.bloodRed} 0%,
// // //     #7f0000 100%
// // //   );
// // //   color: white;
// // //   padding: 35px 20px;
// // //   text-align: center;
// // // `;

// // // const SectionTitle = styled.h4`
// // //   color: ${(props) => props.theme.colors.navy};
// // //   margin: 25px 20px 12px;
// // //   font-weight: 700;
// // //   font-size: 1.1rem;
// // //   border-right: 5px solid ${(props) => props.theme.colors.bloodRed};
// // //   padding-right: 12px;
// // // `;

// // // const SelectionWrapper = styled.div`
// // //   padding: 0 20px;
// // //   margin-bottom: 10px;
// // // `;

// // // const StyledSelect = styled.select`
// // //   width: 100%;
// // //   padding: 18px;
// // //   border-radius: 15px;
// // //   border: 2px solid #ddd;
// // //   font-family: "Cairo", sans-serif;
// // //   font-size: 1.1rem;
// // //   background-color: white;
// // //   color: ${(props) => props.theme.colors.navy};
// // //   appearance: none;
// // //   cursor: pointer;
// // //   outline: none;
// // //   &:focus {
// // //     border-color: ${(props) => props.theme.colors.bloodRed};
// // //   }
// // // `;

// // // const LargeButton = styled(motion.button)`
// // //   width: calc(100% - 40px);
// // //   margin: 10px 20px 25px;
// // //   padding: 25px;
// // //   border: none;
// // //   border-radius: 20px;
// // //   background-color: ${(props) =>
// // //     props.variant === "success"
// // //       ? props.theme.colors.success
// // //       : props.theme.colors.bloodRed};
// // //   color: white;
// // //   cursor: pointer;
// // //   display: flex;
// // //   flex-direction: column;
// // //   align-items: center;
// // //   gap: 10px;
// // //   box-shadow: 0 10px 20px rgba(183, 28, 28, 0.3);
// // //   animation: ${(props) => (props.isIdle ? pulse : "none")} 2s infinite;

// // //   .main-text {
// // //     font-size: 1.5rem;
// // //     font-weight: 900;
// // //     letter-spacing: 0.5px;
// // //   }
// // //   .sub-text {
// // //     font-size: 1rem;
// // //     opacity: 0.9;
// // //     font-weight: 400;
// // //   }

// // //   &:disabled {
// // //     background-color: #757575;
// // //     cursor: not-allowed;
// // //     animation: none;
// // //   }
// // // `;

// // // const SecondaryGrid = styled.div`
// // //   display: grid;
// // //   grid-template-columns: 1fr 1fr;
// // //   gap: 15px;
// // //   padding: 0 20px 25px;
// // // `;

// // // const IconButton = styled.button`
// // //   background: white;
// // //   border: 2px solid #eee;
// // //   padding: 20px 10px;
// // //   border-radius: 18px;
// // //   display: flex;
// // //   flex-direction: column;
// // //   align-items: center;
// // //   gap: 10px;
// // //   cursor: pointer;
// // //   transition: all 0.2s;

// // //   span {
// // //     font-weight: 700;
// // //     font-size: 1rem;
// // //     color: ${(props) => props.theme.colors.navy};
// // //   }
// // //   &:hover {
// // //     border-color: ${(props) => props.theme.colors.bloodRed};
// // //     background: ${(props) => props.theme.colors.softRed};
// // //   }
// // // `;

// // // function DaraaBloodSystem() {
// // //   const [selectedGroup, setSelectedGroup] = useState("O-");
// // //   const [selectedArea, setSelectedArea] = useState("درعا المدينة");
// // //   const [status, setStatus] = useState("idle");

// // //   const daraaAreas = [
// // //     "درعا المدينة",
// // //     "نوى",
// // //     "إزرع",
// // //     "بصرى الشام",
// // //     "الصنمين",
// // //     "طفس",
// // //     "داعل",
// // //     "جاسم",
// // //     "إنخل",
// // //     "الحراك",
// // //     "تسيل",
// // //     "سحم الجولان",
// // //   ];

// // //   const triggerAlert = () => {
// // //     // Vibrationsfeedback (om enheten stöder det)
// // //     if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

// // //     setStatus("sending");
// // //     setTimeout(() => setStatus("sent"), 2000);
// // //   };

// // //   return (
// // //     <ThemeProvider theme={theme}>
// // //       <GlobalStyle />
// // //       <Container
// // //         initial={{ opacity: 0, scale: 0.98 }}
// // //         animate={{ opacity: 1, scale: 1 }}
// // //       >
// // //         <BloodHeader>
// // //           <FaTint size={50} style={{ marginBottom: "15px" }} />
// // //           <h2 style={{ margin: 0, fontSize: "2rem", fontWeight: 900 }}>
// // //             مركز طوارئ الدم
// // //           </h2>
// // //           <p style={{ margin: "10px 0 0", fontSize: "1.1rem", opacity: 0.9 }}>
// // //             محافظة درعا - حوران الأبية
// // //           </p>
// // //         </BloodHeader>

// // //         <SectionTitle>1. اختر منطقتك الحالية:</SectionTitle>
// // //         <SelectionWrapper>
// // //           <StyledSelect
// // //             value={selectedArea}
// // //             onChange={(e) => setSelectedArea(e.target.value)}
// // //           >
// // //             {daraaAreas.map((area) => (
// // //               <option key={area} value={area}>
// // //                 {area}
// // //               </option>
// // //             ))}
// // //           </StyledSelect>
// // //         </SelectionWrapper>

// // //         <SectionTitle>2. حدد فصيلة الدم المطلوبة:</SectionTitle>
// // //         <div
// // //           style={{
// // //             display: "grid",
// // //             gridTemplateColumns: "repeat(4, 1fr)",
// // //             gap: "10px",
// // //             padding: "0 20px",
// // //           }}
// // //         >
// // //           {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
// // //             <button
// // //               key={group}
// // //               onClick={() => setSelectedGroup(group)}
// // //               style={{
// // //                 padding: "15px 0",
// // //                 borderRadius: "12px",
// // //                 border: "2px solid",
// // //                 borderColor:
// // //                   selectedGroup === group ? theme.colors.bloodRed : "#eee",
// // //                 backgroundColor:
// // //                   selectedGroup === group ? theme.colors.softRed : "white",
// // //                 color: selectedGroup === group ? theme.colors.bloodRed : "#333",
// // //                 fontWeight: "900",
// // //                 cursor: "pointer",
// // //                 fontSize: "1.2rem",
// // //                 transition: "0.2s",
// // //               }}
// // //             >
// // //               {group}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         <div style={{ marginTop: "35px" }}>
// // //           <AnimatePresence mode="wait">
// // //             {status === "idle" && (
// // //               <LargeButton
// // //                 isIdle={true}
// // //                 whileTap={{ scale: 0.96 }}
// // //                 onClick={triggerAlert}
// // //               >
// // //                 <span className="main-text">إرسال نداء استغاثة عاجل</span>
// // //                 <span className="sub-text">
// // //                   سيصل التنبيه لجميع المتبرعين في {selectedArea}
// // //                 </span>
// // //               </LargeButton>
// // //             )}

// // //             {status === "sending" && (
// // //               <LargeButton disabled>
// // //                 <span className="main-text">جاري إرسال النداء...</span>
// // //                 <span className="sub-text">
// // //                   يرجى الانتظار، جاري معالجة طلبك
// // //                 </span>
// // //               </LargeButton>
// // //             )}

// // //             {status === "sent" && (
// // //               <div style={{ padding: "0 20px 20px" }}>
// // //                 <LargeButton
// // //                   variant="success"
// // //                   onClick={() => setStatus("idle")}
// // //                 >
// // //                   <FaCheckCircle size={30} />
// // //                   <span className="main-text">تم التعميم بنجاح</span>
// // //                   <span className="sub-text">
// // //                     اضغط هنا للعودة أو إرسال بلاغ آخر
// // //                   </span>
// // //                 </LargeButton>
// // //               </div>
// // //             )}
// // //           </AnimatePresence>
// // //         </div>

// // //         <SectionTitle>خدمات المتبرعين:</SectionTitle>
// // //         <SecondaryGrid>
// // //           <IconButton>
// // //             <FaUserPlus size={28} color={theme.colors.bloodRed} />
// // //             <span>تسجيل كمتبرع</span>
// // //           </IconButton>
// // //           <IconButton>
// // //             <FaMapMarkerAlt size={28} color={theme.colors.navy} />
// // //             <span>مراكز الدم</span>
// // //           </IconButton>
// // //         </SecondaryGrid>

// // //         <div
// // //           style={{
// // //             textAlign: "center",
// // //             padding: "20px",
// // //             background: theme.colors.lightGray,
// // //           }}
// // //         >
// // //           <a
// // //             href="tel:112"
// // //             style={{
// // //               textDecoration: "none",
// // //               color: theme.colors.bloodRed,
// // //               fontWeight: "900",
// // //               fontSize: "1.2rem",
// // //               display: "flex",
// // //               alignItems: "center",
// // //               justifyContent: "center",
// // //               gap: "12px",
// // //             }}
// // //           >
// // //             <FaPhoneAlt />
// // //             اتصال مباشر بالإسعاف (112)
// // //           </a>
// // //         </div>
// // //       </Container>
// // //     </ThemeProvider>
// // //   );
// // // }

// // // export default DaraaBloodSystem;

// // // import React from "react";
// // // import { FaExclamationTriangle } from "react-icons/fa";
// // // import { motion } from "framer-motion";

// // // function Emergency() {
// // //   return (
// // //     <motion.div
// // //       className="emergency-page"
// // //       initial={{ scale: 0.8 }}
// // //       animate={{ scale: 1 }}
// // //       transition={{ duration: 0.3 }}
// // //     >
// // //       <h3>طوارئ</h3>
// // //       <div className="emergency-card">
// // //         <FaExclamationTriangle size={50} />
// // //         <p>اتصل بالطوارئ فوراً!</p>
// // //         <button>إرسال إشعار طوارئ</button>
// // //       </div>
// // //     </motion.div>
// // //   );
// // // }

// // // export default Emergency;

// // import React, { useState } from "react";
// // import styled, {
// //   createGlobalStyle,
// //   ThemeProvider,
// //   keyframes,
// // } from "styled-components";
// // import {
// //   FaTint,
// //   FaCheckCircle,
// //   FaMapMarkerAlt,
// //   FaUserPlus,
// //   FaPhoneAlt,
// //   FaTimes,
// //   FaSms,
// // } from "react-icons/fa";
// // import { motion, AnimatePresence } from "framer-motion";

// // // --- Animeringar ---
// // const float = keyframes`
// //   0% { transform: translateY(0px); }
// //   50% { transform: translateY(-15px); }
// //   100% { transform: translateY(0px); }
// // `;

// // // --- Globala Stilar & Bakgrund ---
// // const GlobalStyle = createGlobalStyle`
// //   @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
// //   body {
// //     margin: 0; padding: 0;
// //     font-family: 'Cairo', sans-serif;
// //     background: #f0f2f5;
// //     direction: rtl;
// //   }
// // `;

// // // Ny layout-wrapper för att hålla bild + formulär
// // const MainWrapper = styled.div`
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   min-height: 100vh;
// //   padding: 20px;
// //   gap: 40px;

// //   @media (max-width: 900px) {
// //     flex-direction: column;
// //     padding-top: 40px;
// //   }
// // `;

// // const ImageSection = styled(motion.div)`
// //   flex: 1;
// //   max-width: 500px;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   text-align: center;

// //   img {
// //     width: 100%;
// //     height: auto;
// //     border-radius: 30px;
// //     box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
// //     animation: ${float} 4s infinite ease-in-out;
// //   }

// //   h1 {
// //     color: #b71c1c;
// //     font-weight: 900;
// //     margin-top: 20px;
// //     font-size: 2.5rem;
// //   }

// //   @media (max-width: 900px) {
// //     order: 2; /* Bilden hamnar under formuläret på mobilen */
// //     max-width: 300px;
// //     h1 {
// //       font-size: 1.8rem;
// //     }
// //   }
// // `;

// // const FormContainer = styled(motion.div)`
// //   flex: 1;
// //   max-width: 450px;
// //   background: white;
// //   border-radius: 35px;
// //   box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
// //   overflow: hidden;
// //   border: 1px solid rgba(0, 0, 0, 0.05);
// // `;

// // const BloodHeader = styled.div`
// //   background: linear-gradient(135deg, #b71c1c 0%, #7f0000 100%);
// //   color: white;
// //   padding: 30px 20px;
// //   text-align: center;
// // `;

// // const SectionTitle = styled.h4`
// //   color: #1a237e;
// //   margin: 20px 20px 10px;
// //   font-weight: 900;
// //   display: flex;
// //   align-items: center;
// //   gap: 10px;
// // `;

// // const StyledSelect = styled.select`
// //   width: calc(100% - 40px);
// //   margin: 0 20px;
// //   padding: 15px;
// //   border-radius: 15px;
// //   border: 2px solid #f1f5f9;
// //   font-family: "Cairo";
// //   font-weight: 700;
// // `;

// // const BloodGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(4, 1fr);
// //   gap: 10px;
// //   padding: 0 20px;
// // `;

// // const BloodButton = styled.button`
// //   padding: 12px 0;
// //   border-radius: 12px;
// //   border: 2px solid ${(props) => (props.active ? "#b71c1c" : "#f1f5f9")};
// //   background: ${(props) => (props.active ? "#fff5f5" : "white")};
// //   color: ${(props) => (props.active ? "#b71c1c" : "#475569")};
// //   font-weight: 900;
// //   cursor: pointer;
// // `;

// // const MainButton = styled.button`
// //   width: calc(100% - 40px);
// //   margin: 20px;
// //   padding: 20px;
// //   border: none;
// //   border-radius: 20px;
// //   background: #b71c1c;
// //   color: white;
// //   font-weight: 900;
// //   font-size: 1.2rem;
// //   font-family: "Cairo";
// //   cursor: pointer;
// // `;

// // function Emergency() {
// //   const [selectedGroup, setSelectedGroup] = useState("O-");

// //   return (
// //     <ThemeProvider theme={{ colors: { bloodRed: "#b71c1c" } }}>
// //       <GlobalStyle />

// //       <MainWrapper>
// //         {/* VÄNSTER SIDA: Bild och Text */}
// //         <ImageSection
// //           initial={{ opacity: 0, x: -50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.8 }}
// //         >
// //           {/* Du kan byta ut denna URL mot din egen bildfil */}
// //           <img
// //             src="https://img.freepik.com/free-vector/blood-donation-concept-illustration_114360-4287.jpg"
// //             alt="Blood Donation"
// //           />
// //           <h1>قطرة دم تساوي حياة</h1>
// //           <p>
// //             ساهم في إنقاذ الأرواح في محافظة درعا من خلال التبرع أو طلب
// //             الاستغاثة.
// //           </p>
// //         </ImageSection>

// //         {/* HÖGER SIDA: Formulär */}
// //         <FormContainer
// //           initial={{ opacity: 0, x: 50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.8 }}
// //         >
// //           <BloodHeader>
// //             <FaTint size={40} />
// //             <h2 style={{ margin: "10px 0 0" }}>نظام الطوارئ السريع</h2>
// //           </BloodHeader>

// //           <SectionTitle>
// //             <FaMapMarkerAlt /> المنطقة:
// //           </SectionTitle>
// //           <StyledSelect>
// //             <option>درعا المدينة</option>
// //             <option>طفس</option>
// //             <option>نوى</option>
// //           </StyledSelect>

// //           <SectionTitle>
// //             <FaTint /> الفصيلة المطلوبة:
// //           </SectionTitle>
// //           <BloodGrid>
// //             {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
// //               <BloodButton
// //                 key={g}
// //                 active={selectedGroup === g}
// //                 onClick={() => setSelectedGroup(g)}
// //               >
// //                 {g}
// //               </BloodButton>
// //             ))}
// //           </BloodGrid>

// //           <MainButton>إرسال نداء استغاثة</MainButton>

// //           <div style={{ display: "flex", gap: "10px", padding: "0 20px 20px" }}>
// //             <button
// //               style={{
// //                 flex: 1,
// //                 padding: "15px",
// //                 borderRadius: "15px",
// //                 border: "1px solid #eee",
// //                 background: "#f8f9fa",
// //                 fontWeight: "bold",
// //               }}
// //             >
// //               <FaUserPlus /> تسجيل متبرع
// //             </button>
// //             <button
// //               style={{
// //                 flex: 1,
// //                 padding: "15px",
// //                 borderRadius: "15px",
// //                 border: "1px solid #eee",
// //                 background: "#f8f9fa",
// //                 fontWeight: "bold",
// //               }}
// //             >
// //               <FaPhoneAlt /> الإسعاف
// //             </button>
// //           </div>
// //         </FormContainer>
// //       </MainWrapper>
// //     </ThemeProvider>
// //   );
// // }

// // export default Emergency;

// import React, { useState } from "react";
// import styled, {
//   createGlobalStyle,
//   ThemeProvider,
//   keyframes,
// } from "styled-components";
// import {
//   FaTint,
//   FaCheckCircle,
//   FaMapMarkerAlt,
//   FaUserPlus,
//   FaPhoneAlt,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// // --- Animeringar ---
// const float = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-15px); }
//   100% { transform: translateY(0px); }
// `;

// const pulse = keyframes`
//   0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(183, 28, 28, 0.4); }
//   70% { transform: scale(1.03); box-shadow: 0 0 0 15px rgba(183, 28, 28, 0); }
//   100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(183, 28, 28, 0); }
// `;

// // --- Globala Stilar ---
// const GlobalStyle = createGlobalStyle`
//   @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
//   body {
//     margin: 0; padding: 0;
//     font-family: 'Cairo', sans-serif;
//     background: #f8fafc;
//     direction: rtl;
//   }
// `;

// // --- Layout Komponenter ---
// const MainWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   min-height: 100vh;
//   padding: 40px 20px;
//   gap: 60px;
//   max-width: 1200px;
//   margin: 0 auto;

//   @media (max-width: 950px) {
//     flex-direction: column;
//     padding-top: 20px;
//     gap: 30px;
//   }
// `;

// const ImageSection = styled(motion.div)`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;

//   img {
//     width: 100%;
//     max-width: 550px;
//     height: auto;
//     border-radius: 40px;
//     box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
//     animation: ${float} 5s infinite ease-in-out;
//     border: 8px solid white;
//   }

//   h1 {
//     color: #b71c1c;
//     font-weight: 900;
//     margin: 30px 0 10px;
//     font-size: 2.8rem;
//     line-height: 1.2;
//   }

//   p {
//     color: #475569;
//     font-size: 1.2rem;
//     max-width: 400px;
//   }

//   @media (max-width: 950px) {
//     order: 2;
//     h1 {
//       font-size: 2rem;
//     }
//     img {
//       max-width: 350px;
//     }
//   }
// `;

// const FormContainer = styled(motion.div)`
//   flex: 1;
//   width: 100%;
//   max-width: 480px;
//   background: white;
//   border-radius: 40px;
//   box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
//   border: 1px solid rgba(0, 0, 0, 0.05);
// `;

// const BloodHeader = styled.div`
//   background: linear-gradient(135deg, #b71c1c 0%, #7f0000 100%);
//   color: white;
//   padding: 40px 20px;
//   text-align: center;
// `;

// const SectionTitle = styled.h4`
//   color: #1a237e;
//   margin: 25px 25px 15px;
//   font-weight: 900;
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   border-right: 5px solid #b71c1c;
//   padding-right: 15px;
// `;

// const StyledSelect = styled.select`
//   width: calc(100% - 50px);
//   margin: 0 25px;
//   padding: 18px;
//   border-radius: 20px;
//   border: 2px solid #f1f5f9;
//   background: #f8fafc;
//   font-family: "Cairo";
//   font-weight: 700;
//   outline: none;
//   &:focus {
//     border-color: #b71c1c;
//   }
// `;

// const BloodGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 12px;
//   padding: 0 25px;
// `;

// const BloodButton = styled.button`
//   padding: 15px 0;
//   border-radius: 15px;
//   border: 2px solid ${(props) => (props.active ? "#b71c1c" : "#f1f5f9")};
//   background: ${(props) => (props.active ? "#fff5f5" : "white")};
//   color: ${(props) => (props.active ? "#b71c1c" : "#64748b")};
//   font-weight: 900;
//   cursor: pointer;
//   transition: 0.2s;
//   &:hover {
//     transform: translateY(-2px);
//   }
// `;

// const MainActionButton = styled(motion.button)`
//   width: calc(100% - 50px);
//   margin: 30px 25px;
//   padding: 22px;
//   border: none;
//   border-radius: 22px;
//   background: ${(props) => (props.success ? "#10b981" : "#b71c1c")};
//   color: white;
//   font-weight: 900;
//   font-size: 1.3rem;
//   font-family: "Cairo";
//   cursor: pointer;
//   box-shadow: 0 10px 25px rgba(183, 28, 28, 0.2);
//   animation: ${(props) => (props.pulse ? pulse : "none")} 2s infinite;
// `;

// function Emergency() {
//   const [selectedGroup, setSelectedGroup] = useState("O-");
//   const [selectedArea, setSelectedArea] = useState("درعا المدينة");
//   const [status, setStatus] = useState("idle");

//   const areas = ["درعا المدينة", "نوى", "طفس", "إزرع", "بصرى الشام", "جاسم"];

//   const handleSOS = () => {
//     setStatus("sending");
//     setTimeout(() => setStatus("sent"), 2000);
//   };

//   return (
//     <ThemeProvider theme={{ colors: { bloodRed: "#b71c1c" } }}>
//       <GlobalStyle />

//       <MainWrapper>
//         {/* VÄNSTER SIDA: Bild från public/assets */}
//         <ImageSection
//           initial={{ opacity: 0, x: -60 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <img src="/assets/blood.png" alt="Daraa Blood Bank" />
//           <h1>قطرة دم تساوي حياة</h1>
//           <p>
//             انضم إلى شبكة المتبرعين في درعا وساهم في إنقاذ الأرواح عند حالات
//             الطوارئ.
//           </p>
//         </ImageSection>

//         {/* HÖGER SIDA: Formulär */}
//         <FormContainer
//           initial={{ opacity: 0, x: 60 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <BloodHeader>
//             <motion.div
//               animate={{ scale: [1, 1.1, 1] }}
//               transition={{ repeat: Infinity, duration: 2 }}
//             >
//               <FaTint size={50} />
//             </motion.div>
//             <h2 style={{ margin: "10px 0 0", fontWeight: 900 }}>
//               نظام الطوارئ السريع
//             </h2>
//           </BloodHeader>

//           <SectionTitle>
//             <FaMapMarkerAlt /> حدد المنطقة:
//           </SectionTitle>
//           <StyledSelect
//             value={selectedArea}
//             onChange={(e) => setSelectedArea(e.target.value)}
//           >
//             {areas.map((a) => (
//               <option key={a} value={a}>
//                 {a}
//               </option>
//             ))}
//           </StyledSelect>

//           <SectionTitle>
//             <FaTint /> الفصيلة المطلوبة:
//           </SectionTitle>
//           <BloodGrid>
//             {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
//               <BloodButton
//                 key={g}
//                 active={selectedGroup === g}
//                 onClick={() => setSelectedGroup(g)}
//               >
//                 {g}
//               </BloodButton>
//             ))}
//           </BloodGrid>

//           <AnimatePresence mode="wait">
//             {status === "idle" && (
//               <MainActionButton
//                 pulse
//                 onClick={handleSOS}
//                 whileTap={{ scale: 0.96 }}
//               >
//                 إرسال نداء استغاثة عاجل
//               </MainActionButton>
//             )}
//             {status === "sending" && (
//               <MainActionButton disabled>جاري إرسال النداء...</MainActionButton>
//             )}
//             {status === "sent" && (
//               <div style={{ padding: "0 25px" }}>
//                 <MainActionButton success onClick={() => setStatus("idle")}>
//                   <FaCheckCircle /> تم التعميم في {selectedArea}
//                 </MainActionButton>
//               </div>
//             )}
//           </AnimatePresence>

//           <div style={{ display: "flex", gap: "15px", padding: "0 25px 30px" }}>
//             <button
//               style={{
//                 flex: 1,
//                 padding: "18px",
//                 borderRadius: "18px",
//                 border: "1px solid #eee",
//                 background: "#f8fafc",
//                 fontWeight: "900",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "10px",
//                 cursor: "pointer",
//               }}
//             >
//               <FaUserPlus color="#b71c1c" /> تسجيل متبرع
//             </button>
//             <button
//               style={{
//                 flex: 1,
//                 padding: "18px",
//                 borderRadius: "18px",
//                 border: "1px solid #eee",
//                 background: "#f8fafc",
//                 fontWeight: "900",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "10px",
//                 cursor: "pointer",
//               }}
//             >
//               <FaPhoneAlt color="#1a237e" /> الإسعاف
//             </button>
//           </div>
//         </FormContainer>
//       </MainWrapper>
//     </ThemeProvider>
//   );
// }

// export default Emergency;

import React, { useState, useRef } from "react";
import styled, {
  createGlobalStyle,
  ThemeProvider,
  keyframes,
  css,
} from "styled-components";
import {
  FaTint,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaUserPlus,
  FaPhoneAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(183, 28, 28, 0.4); }
  70% { transform: scale(1.03); box-shadow: 0 0 0 15px rgba(183, 28, 28, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(183, 28, 28, 0); }
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');

  *, *::before, *::after {
    box-sizing: border-box; /* Hindrar border-ändringar från att flytta layouten */
  }

  body {
    margin: 0; padding: 0;
    font-family: 'Cairo', sans-serif;
    background: #f8fafc;
    direction: rtl;
    overflow-x: hidden;
  }
`;

const MainWrapper = styled.div`
  display: grid;
  /* Vi fixerar kolumnerna: bilden får flexibelt utrymme, formuläret är låst till 480px */
  grid-template-columns: minmax(300px, 1fr) 480px;
  align-items: start;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const ImageSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: sticky;
  top: 60px;

  /* Behållaren för bilden har en fast bredd och höjd-ratio */
  .img-container {
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 40px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);
    animation: ${float} 5s infinite ease-in-out;
    display: block;
  }

  h1 {
    color: #b71c1c;
    font-weight: 900;
    margin: 25px 0 10px;
    font-size: 2.5rem;
  }
  p {
    color: #475569;
    font-size: 1.2rem;
    max-width: 400px;
    line-height: 1.5;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 750px; /* Låst höjd för hela boxen */
`;

const BloodHeader = styled.div`
  background: linear-gradient(135deg, #b71c1c 0%, #7f0000 100%);
  color: white;
  padding: 35px 20px;
  text-align: center;
`;

const SectionTitle = styled.h4`
  color: #1a237e;
  margin: 20px 25px 12px;
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 12px;
  border-right: 5px solid #b71c1c;
  padding-right: 15px;
`;

const StyledSelect = styled.select`
  width: calc(100% - 50px);
  margin: 0 25px;
  padding: 16px;
  border-radius: 15px;
  border: 2px solid #f1f5f9;
  font-family: "Cairo";
  font-weight: 700;
  background: #f8fafc;
`;

const BloodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 0 25px;
`;

const BloodButton = styled.button`
  padding: 12px 0;
  border-radius: 12px;
  /* Vi använder en osynlig border när den inte är aktiv för att storleken ska vara samma */
  border: 2px solid ${(props) => (props.active ? "#b71c1c" : "transparent")};
  background: ${(props) => (props.active ? "#fff5f5" : "#f1f5f9")};
  color: ${(props) => (props.active ? "#b71c1c" : "#64748b")};
  font-weight: 900;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;

  &:hover {
    background: ${(props) => (props.active ? "#fff5f5" : "#e2e8f0")};
  }
`;

const ButtonArea = styled.div`
  position: relative;
  margin: 20px 25px;
  height: 80px;
  margin-top: auto;
`;

const MainActionButton = styled(motion.button)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 22px;
  background: ${(props) => (props.success ? "#10b981" : "#b71c1c")};
  color: white;
  font-weight: 900;
  font-size: 1.3rem;
  font-family: "Cairo";
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  ${(props) =>
    props.isIdle &&
    css`
      animation: ${pulse} 2s infinite;
    `}
  &:disabled {
    background: #94a3b8;
  }
`;

function Emergency() {
  const [selectedGroup, setSelectedGroup] = useState("O-");
  const [status, setStatus] = useState("idle");
  const audioPlayer = useRef(null);

  const daraaAreas = [
    "درعا المدينة",
    "نوى",
    "طفس",
    "إزرع",
    "بصرى الشام",
    "الصنمين",
    "داعل",
    "جاسم",
    "إنخل",
    "الحراك",
    "تسيل",
    "سحم الجولan",
    "خربة غزالة",
    "المسيفرة",
  ];

  const handleSOS = () => {
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      if (audioPlayer.current) audioPlayer.current.play().catch(() => {});
    }, 1500);
  };

  return (
    <ThemeProvider theme={{ colors: { bloodRed: "#b71c1c" } }}>
      <GlobalStyle />
      <audio
        ref={audioPlayer}
        src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
      />

      <MainWrapper>
        <ImageSection>
          <div className="img-container">
            <img
              src={`${process.env.PUBLIC_URL}/assets/blood.png`}
              alt="Daraa Blood Bank"
            />
          </div>
          <h1>قطرة دم تساوي حياة</h1>
          <p>
            ساهم في إنقاذ الأرواح في محافظة درعا من خلال التبرع أو طلب الاستغاثة
            العاجل.
          </p>
        </ImageSection>

        <FormContainer>
          <BloodHeader>
            <FaTint size={45} />
            <h2 style={{ margin: "10px 0 0", fontWeight: 900 }}>
              نظام الطوارئ الموحد
            </h2>
          </BloodHeader>

          <SectionTitle>
            <FaMapMarkerAlt /> المنطقة الحالية في درعا:
          </SectionTitle>
          <StyledSelect>
            {daraaAreas.map((area) => (
              <option key={area}>{area}</option>
            ))}
          </StyledSelect>

          <SectionTitle>
            <FaTint /> الفصيلة المطلوبة:
          </SectionTitle>
          <BloodGrid>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
              <BloodButton
                key={g}
                active={selectedGroup === g}
                onClick={() => setSelectedGroup(g)}
              >
                {g}
              </BloodButton>
            ))}
          </BloodGrid>

          <ButtonArea>
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <MainActionButton
                  key="idle"
                  isIdle={true}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleSOS}
                >
                  إرسال نداء استغاثة عاجل
                </MainActionButton>
              )}
              {status === "sending" && (
                <MainActionButton
                  key="sending"
                  disabled
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  جاري إرسال النداء...
                </MainActionButton>
              )}
              {status === "sent" && (
                <MainActionButton
                  key="sent"
                  success
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setStatus("idle")}
                >
                  <FaCheckCircle /> تم التعميم في المنطقة
                </MainActionButton>
              )}
            </AnimatePresence>
          </ButtonArea>

          <div style={{ display: "flex", gap: "10px", padding: "0 25px 30px" }}>
            <button
              style={{
                flex: 1,
                padding: "18px",
                borderRadius: "15px",
                border: "1px solid #eee",
                background: "#f8fafc",
                fontWeight: "900",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <FaUserPlus color="#b71c1c" /> تسجيل متberع
            </button>
            <button
              style={{
                flex: 1,
                padding: "18px",
                borderRadius: "18px",
                border: "1px solid #eee",
                background: "#f8fafc",
                fontWeight: "900",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <FaPhoneAlt color="#1a237e" /> الإسعاف
            </button>
          </div>
        </FormContainer>
      </MainWrapper>
    </ThemeProvider>
  );
}

export default Emergency;
