// import React, { useState } from "react";
// import styled, {
//   createGlobalStyle,
//   ThemeProvider,
//   keyframes,
//   css,
// } from "styled-components";
// import {
//   FaUser,
//   FaTint,
//   FaLayerGroup,
//   FaMapMarkerAlt,
//   FaPaperPlane,
//   FaCheckCircle,
//   FaHospitalSymbol,
//   FaSpinner,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const theme = {
//   colors: {
//     primaryNavy: "#1a237e",
//     medicalTeal: "#00bcd4",
//     medicalGreen: "#4caf50",
//     emergencyRed: "#f44336",
//     bgWhite: "#fafafa",
//     cardBg: "#ffffff",
//     border: "#e0e0e0",
//     textDark: "#003049",
//   },
//   breakpoints: {
//     mobile: "480px",
//     tablet: "768px",
//   },
// };

// const spin = keyframes`
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// `;

// const GlobalStyle = createGlobalStyle`
//   @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
//   body {
//     margin: 0; padding: 0;
//     background-color: ${(props) => props.theme.colors.bgWhite};
//     font-family: 'Cairo', sans-serif;
//     direction: rtl;
//     color: ${(props) => props.theme.colors.textDark};
//   }
// `;

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   padding: 20px;
//   box-sizing: border-box;
// `;

// const Card = styled(motion.div)`
//   width: 100%;
//   max-width: 650px;
//   background: white;
//   border-radius: 28px;
//   box-shadow: 0 15px 45px rgba(26, 35, 126, 0.1);
//   overflow: hidden;
//   border: 1px solid ${(props) => props.theme.colors.border};
// `;

// const Header = styled.div`
//   background: ${(props) => props.theme.colors.primaryNavy};
//   color: white;
//   padding: 35px 20px;
//   text-align: center;
//   border-bottom: 6px solid ${(props) => props.theme.colors.medicalTeal};
//   h2 {
//     margin: 10px 0;
//     font-size: 1.8rem;
//     font-weight: 900;
//   }
//   p {
//     margin: 0;
//     opacity: 0.9;
//     font-size: 1rem;
//   }
// `;

// const FormGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 20px;
//   padding: 30px;
//   @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
//     grid-template-columns: 1fr;
//   }
// `;

// const FormGroup = styled.div`
//   &.full-width {
//     grid-column: 1 / -1;
//   }
// `;

// const Label = styled.label`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin-bottom: 8px;
//   font-weight: 700;
//   color: ${(props) => props.theme.colors.primaryNavy};
// `;

// const InputWrapper = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
//   svg {
//     position: absolute;
//     right: 15px;
//     color: ${(props) => props.theme.colors.medicalTeal};
//     z-index: 2;
//   }
// `;

// const InputField = styled.input`
//   width: 100%;
//   padding: 14px 45px 14px 15px;
//   border: 2px solid #edf2f7;
//   border-radius: 14px;
//   font-family: "Cairo", sans-serif;
//   font-size: 1rem;
//   background: #fdfdfd;
//   box-sizing: border-box;
//   transition: 0.3s;
//   &:focus {
//     outline: none;
//     border-color: ${(props) => props.theme.colors.medicalTeal};
//     background: white;
//   }
// `;

// const SubmitButton = styled(motion.button)`
//   width: calc(100% - 60px);
//   margin: 0 30px 30px;
//   padding: 20px;
//   background: ${(props) =>
//     props.$status === "success"
//       ? props.theme.colors.medicalGreen
//       : props.$status === "sending"
//       ? props.theme.colors.medicalTeal
//       : props.theme.colors.primaryNavy};
//   color: white;
//   border: none;
//   border-radius: 18px;
//   font-size: 1.2rem;
//   font-weight: 800;
//   font-family: "Cairo", sans-serif;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 12px;
//   transition: background 0.4s ease;

//   .spinner-icon {
//     ${(props) =>
//       props.$status === "sending" &&
//       css`
//         animation: ${spin} 1s linear infinite;
//       `}
//   }

//   &:disabled {
//     opacity: 0.7;
//     cursor: not-allowed;
//   }
// `;

// function RequestBlood() {
//   const [formData, setFormData] = useState({
//     patientName: "",
//     bloodType: "",
//     area: "",
//     quantity: 1,
//   });
//   const [status, setStatus] = useState("idle");

//   // Områden i Daraa
//   const daraaAreas = [
//     "درعا المدينة",
//     "نوى",
//     "إزرع",
//     "بصرى الشام",
//     "الصنمين",
//     "طفس",
//     "داعل",
//     "جاسم",
//     "إنخل",
//     "الحراك",
//     "الشيخ مسكين",
//     "خربة غزالة",
//     "المزيريب",
//     "تل شهاب",
//     "الشجرة",
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setStatus("sending");
//     setTimeout(() => {
//       setStatus("success");
//       setTimeout(() => setStatus("idle"), 4000);
//     }, 2000);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <GlobalStyle />
//       <Container>
//         <Card initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
//           <Header>
//             <FaHospitalSymbol size={45} />
//             <h2>طلب دم عاجل</h2>
//             <p>محافظة درعا - حوران الأبية</p>
//           </Header>

//           <form onSubmit={handleSubmit}>
//             <FormGrid>
//               <FormGroup className="full-width">
//                 <Label>
//                   <FaUser /> اسم المريض:
//                 </Label>
//                 <InputWrapper>
//                   <FaUser />
//                   <InputField
//                     required
//                     placeholder="الاسم الكامل للمريض"
//                     value={formData.patientName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, patientName: e.target.value })
//                     }
//                   />
//                 </InputWrapper>
//               </FormGroup>

//               <FormGroup>
//                 <Label>
//                   <FaMapMarkerAlt /> المنطقة في درعا:
//                 </Label>
//                 <InputWrapper>
//                   <FaMapMarkerAlt />
//                   <InputField
//                     as="select"
//                     required
//                     value={formData.area}
//                     onChange={(e) =>
//                       setFormData({ ...formData, area: e.target.value })
//                     }
//                   >
//                     <option value="">اختر المنطقة</option>
//                     {daraaAreas.map((area) => (
//                       <option key={area} value={area}>
//                         {area}
//                       </option>
//                     ))}
//                   </InputField>
//                 </InputWrapper>
//               </FormGroup>

//               <FormGroup>
//                 <Label>
//                   <FaTint /> فصيلة الدم:
//                 </Label>
//                 <InputWrapper>
//                   <FaTint />
//                   <InputField
//                     as="select"
//                     required
//                     value={formData.bloodType}
//                     onChange={(e) =>
//                       setFormData({ ...formData, bloodType: e.target.value })
//                     }
//                   >
//                     <option value="">اختر الفصيلة</option>
//                     {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
//                       (t) => (
//                         <option key={t} value={t}>
//                           {t}
//                         </option>
//                       )
//                     )}
//                   </InputField>
//                 </InputWrapper>
//               </FormGroup>

//               <FormGroup className="full-width">
//                 <Label>
//                   <FaLayerGroup /> الكمية المطلوبة (أكياس):
//                 </Label>
//                 <InputWrapper>
//                   <FaLayerGroup />
//                   <InputField
//                     type="number"
//                     min="1"
//                     value={formData.quantity}
//                     onChange={(e) =>
//                       setFormData({ ...formData, quantity: e.target.value })
//                     }
//                   />
//                 </InputWrapper>
//               </FormGroup>
//             </FormGrid>

//             <SubmitButton
//               type="submit"
//               $status={status}
//               disabled={status === "sending"}
//               whileTap={{ scale: 0.97 }}
//             >
//               {status === "idle" && (
//                 <>
//                   <FaPaperPlane /> إرسال النداء الآن
//                 </>
//               )}
//               {status === "sending" && (
//                 <>
//                   <FaSpinner className="spinner-icon" /> جاري التعميم...
//                 </>
//               )}
//               {status === "success" && (
//                 <>
//                   <FaCheckCircle /> تم إرسال الطلب بنجاح
//                 </>
//               )}
//             </SubmitButton>
//           </form>

//           <AnimatePresence>
//             {status === "success" && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 style={{
//                   background: "#e8f5e9",
//                   color: "#2e7d32",
//                   textAlign: "center",
//                   padding: "15px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 سيتم التواصل معكم فور تأمين المتبرعين في منطقة {formData.area}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </Card>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default RequestBlood;

// // // import React, { useState } from "react";

// // // function RequestBlood() {
// // //   const [patientName, setPatientName] = useState("");
// // //   const [bloodType, setBloodType] = useState("");
// // //   const [quantity, setQuantity] = useState(1);

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     // محاكاة إرسال طلب (في الواقع، أرسل إلى API)
// // //     alert(
// // //       `تم إرسال طلب دم للمريض: ${patientName}, نوع الدم: ${bloodType}, الكمية: ${quantity}`
// // //     );
// // //     // إعادة تعيين النموذج
// // //     setPatientName("");
// // //     setBloodType("");
// // //     setQuantity(1);
// // //   };

// // //   return (
// // //     <div>
// // //       <h3>طلب دم للمرضى</h3>
// // //       <form onSubmit={handleSubmit}>
// // //         <input
// // //           type="text"
// // //           placeholder="اسم المريض"
// // //           value={patientName}
// // //           onChange={(e) => setPatientName(e.target.value)}
// // //           required
// // //         />
// // //         <select
// // //           value={bloodType}
// // //           onChange={(e) => setBloodType(e.target.value)}
// // //           required
// // //         >
// // //           <option value="">اختر نوع الدم</option>
// // //           <option value="A+">A+</option>
// // //           <option value="B+">B+</option>
// // //           <option value="O+">O+</option>
// // //           <option value="AB+">AB+</option>
// // //           {/* أضف المزيد حسب الحاجة */}
// // //         </select>
// // //         <input
// // //           type="number"
// // //           placeholder="الكمية (وحدات)"
// // //           value={quantity}
// // //           onChange={(e) => setQuantity(e.target.value)}
// // //           min="1"
// // //           required
// // //         />
// // //         <button type="submit">إرسال الطلب</button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default RequestBlood;
// // import React, { useState } from "react";
// // import styled, {
// //   createGlobalStyle,
// //   ThemeProvider,
// //   keyframes,
// // } from "styled-components";
// // import {
// //   FaUser,
// //   FaTint,
// //   FaLayerGroup,
// //   FaMapMarkerAlt,
// //   FaPaperPlane,
// //   FaCheckCircle,
// //   FaExclamationCircle,
// //   FaHospitalSymbol,
// // } from "react-icons/fa";
// // import { motion, AnimatePresence } from "framer-motion";

// // // 1. Ditt färgtema med variabler
// // const theme = {
// //   colors: {
// //     primaryNavy: "#1a237e",
// //     medicalTeal: "#00bcd4",
// //     medicalGreen: "#4caf50",
// //     emergencyRed: "#f44336",
// //     bgWhite: "#fafafa",
// //     cardBg: "#ffffff",
// //     border: "#e0e0e0",
// //     textDark: "#003049",
// //   },
// //   breakpoints: {
// //     mobile: "480px",
// //     tablet: "768px",
// //   },
// // };

// // const GlobalStyle = createGlobalStyle`
// //   @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');

// //   body {
// //     margin: 0;
// //     padding: 0;
// //     background-color: ${(props) => props.theme.colors.bgWhite};
// //     font-family: 'Cairo', sans-serif;
// //     direction: rtl;
// //     color: ${(props) => props.theme.colors.textDark};
// //   }
// // `;

// // // 2. Responsiv Container
// // const Container = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   min-height: 100vh;
// //   padding: 15px;

// //   @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
// //     padding: 10px;
// //     align-items: flex-start;
// //   }
// // `;

// // const Card = styled(motion.div)`
// //   width: 100%;
// //   max-width: 600px;
// //   background: ${(props) => props.theme.colors.cardBg};
// //   border-radius: 24px;
// //   box-shadow: 0 20px 40px rgba(26, 35, 126, 0.08);
// //   overflow: hidden;
// //   border: 1px solid ${(props) => props.theme.colors.border};
// // `;

// // const Header = styled.div`
// //   background: ${(props) => props.theme.colors.primaryNavy};
// //   color: white;
// //   padding: 40px 20px;
// //   text-align: center;
// //   position: relative;

// //   &::after {
// //     content: "";
// //     position: absolute;
// //     bottom: 0;
// //     left: 0;
// //     width: 100%;
// //     height: 6px;
// //     background: ${(props) => props.theme.colors.medicalTeal};
// //   }

// //   h2 {
// //     margin: 10px 0;
// //     font-size: 2rem;
// //     font-weight: 900;
// //   }
// //   p {
// //     margin: 0;
// //     opacity: 0.9;
// //     font-size: 1rem;
// //   }

// //   @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
// //     padding: 30px 15px;
// //     h2 {
// //       font-size: 1.5rem;
// //     }
// //   }
// // `;

// // const FormGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: 1fr 1fr;
// //   gap: 20px;

// //   @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
// //     grid-template-columns: 1fr;
// //     gap: 15px;
// //   }
// // `;

// // const FormGroup = styled.div`
// //   margin-bottom: 20px;
// //   &.full-width {
// //     grid-column: 1 / -1;
// //   }
// // `;

// // const Label = styled.label`
// //   display: flex;
// //   align-items: center;
// //   gap: 10px;
// //   margin-bottom: 10px;
// //   font-weight: 700;
// //   color: ${(props) => props.theme.colors.primaryNavy};
// //   font-size: 1rem;
// // `;

// // const InputWrapper = styled.div`
// //   position: relative;
// //   display: flex;
// //   align-items: center;

// //   svg {
// //     position: absolute;
// //     right: 18px;
// //     color: ${(props) => props.theme.colors.medicalTeal};
// //     transition: 0.3s;
// //   }

// //   &:focus-within svg {
// //     color: ${(props) => props.theme.colors.primaryNavy};
// //     transform: scale(1.1);
// //   }
// // `;

// // const InputField = styled.input`
// //   width: 100%;
// //   padding: 16px 50px 16px 15px;
// //   border: 2px solid #edf2f7;
// //   border-radius: 16px;
// //   font-family: "Cairo", sans-serif;
// //   font-size: 1rem;
// //   background: #fdfdfd;
// //   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
// //   box-sizing: border-box;

// //   &:focus {
// //     outline: none;
// //     border-color: ${(props) => props.theme.colors.medicalTeal};
// //     background: white;
// //     box-shadow: 0 0 0 4px rgba(0, 188, 212, 0.1);
// //   }

// //   &::placeholder {
// //     color: #a0aec0;
// //   }
// // `;

// // const SelectField = styled.select`
// //   width: 100%;
// //   padding: 16px 50px 16px 15px;
// //   border: 2px solid #edf2f7;
// //   border-radius: 16px;
// //   font-family: "Cairo", sans-serif;
// //   font-size: 1rem;
// //   background: #fdfdfd;
// //   appearance: none;
// //   cursor: pointer;
// //   box-sizing: border-box;

// //   &:focus {
// //     outline: none;
// //     border-color: ${(props) => props.theme.colors.medicalTeal};
// //   }
// // `;

// // const SubmitButton = styled(motion.button)`
// //   width: 100%;
// //   padding: 20px;
// //   background: ${(props) => props.theme.colors.primaryNavy};
// //   color: white;
// //   border: none;
// //   border-radius: 16px;
// //   font-size: 1.25rem;
// //   font-weight: 800;
// //   font-family: "Cairo", sans-serif;
// //   cursor: pointer;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   gap: 15px;
// //   box-shadow: 0 10px 20px rgba(26, 35, 126, 0.2);

// //   &:disabled {
// //     opacity: 0.6;
// //     cursor: not-allowed;
// //   }
// // `;

// // // --- Komponent ---

// // function RequestBlood() {
// //   const [formData, setFormData] = useState({
// //     patientName: "",
// //     bloodType: "",
// //     area: "درعا المدينة",
// //     hospital: "",
// //     quantity: 1,
// //   });
// //   const [status, setStatus] = useState("idle"); // idle, sending, success

// //   const daraaAreas = [
// //     "درعا المدينة",
// //     "نوى",
// //     "إزرع",
// //     "بصرى الشام",
// //     "الصنمين",
// //     "طفس",
// //     "داعل",
// //     "جاسم",
// //     "إنخل",
// //     "الحراك",
// //   ];

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setStatus("sending");

// //     // Simulera API-anrop
// //     setTimeout(() => {
// //       setStatus("success");
// //       setTimeout(() => setStatus("idle"), 5000);
// //     }, 1500);
// //   };

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <GlobalStyle />
// //       <Container>
// //         <Card
// //           initial={{ opacity: 0, scale: 0.95 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           transition={{ duration: 0.4 }}
// //         >
// //           <Header>
// //             <FaHospitalSymbol size={40} />
// //             <h2>طلب دم عاجل</h2>
// //             <p>نظام التنسيق الطبي - محافظة درعا</p>
// //           </Header>

// //           <form onSubmit={handleSubmit} style={{ padding: "30px" }}>
// //             <FormGrid>
// //               <FormGroup className="full-width">
// //                 <Label>
// //                   <FaUser /> اسم المريض الثلاثي:
// //                 </Label>
// //                 <InputWrapper>
// //                   <FaUser size={18} />
// //                   <InputField
// //                     placeholder="أدخل اسم المريض الكامل"
// //                     required
// //                     value={formData.patientName}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, patientName: e.target.value })
// //                     }
// //                   />
// //                 </InputWrapper>
// //               </FormGroup>

// //               <FormGroup>
// //                 <Label>
// //                   <FaTint /> فصيلة الدم:
// //                 </Label>
// //                 <InputWrapper>
// //                   <FaTint size={18} />
// //                   <SelectField
// //                     required
// //                     value={formData.bloodType}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, bloodType: e.target.value })
// //                     }
// //                   >
// //                     <option value="">اختر الفصيلة</option>
// //                     {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
// //                       (t) => (
// //                         <option key={t} value={t}>
// //                           {t}
// //                         </option>
// //                       )
// //                     )}
// //                   </SelectField>
// //                 </InputWrapper>
// //               </FormGroup>

// //               <FormGroup>
// //                 <Label>
// //                   <FaLayerGroup /> الكمية (أكياس):
// //                 </Label>
// //                 <InputWrapper>
// //                   <FaLayerGroup size={18} />
// //                   <InputField
// //                     type="number"
// //                     min="1"
// //                     value={formData.quantity}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, quantity: e.target.value })
// //                     }
// //                   />
// //                 </InputWrapper>
// //               </FormGroup>

// //               <FormGroup>
// //                 <Label>
// //                   <FaMapMarkerAlt /> المنطقة:
// //                 </Label>
// //                 <InputWrapper>
// //                   <FaMapMarkerAlt size={18} />
// //                   <SelectField
// //                     value={formData.area}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, area: e.target.value })
// //                     }
// //                   >
// //                     {daraaAreas.map((a) => (
// //                       <option key={a} value={a}>
// //                         {a}
// //                       </option>
// //                     ))}
// //                   </SelectField>
// //                 </InputWrapper>
// //               </FormGroup>

// //               <FormGroup>
// //                 <Label>
// //                   <FaHospitalSymbol /> اسم المشفى:
// //                 </Label>
// //                 <InputWrapper>
// //                   <FaHospitalSymbol size={18} />
// //                   <InputField
// //                     placeholder="مثال: مشى درعا الوطني"
// //                     value={formData.hospital}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, hospital: e.target.value })
// //                     }
// //                   />
// //                 </InputWrapper>
// //               </FormGroup>
// //             </FormGrid>

// //             <SubmitButton
// //               whileHover={{ scale: 1.01, translateY: -2 }}
// //               whileTap={{ scale: 0.98 }}
// //               disabled={status === "sending"}
// //               type="submit"
// //             >
// //               {status === "idle" && (
// //                 <>
// //                   <FaPaperPlane /> إرسال طلب الدم الآن
// //                 </>
// //               )}
// //               {status === "sending" && "جاري التعميم..."}
// //               {status === "success" && (
// //                 <>
// //                   <FaCheckCircle /> تم إرسال طلبك بنجاح
// //                 </>
// //               )}
// //             </SubmitButton>

// //             <AnimatePresence>
// //               {status === "success" && (
// //                 <motion.div
// //                   initial={{ opacity: 0, y: 10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   style={{
// //                     marginTop: "20px",
// //                     padding: "15px",
// //                     borderRadius: "12px",
// //                     backgroundColor: theme.colors.medicalGreen,
// //                     color: "white",
// //                     textAlign: "center",
// //                     fontWeight: "700",
// //                   }}
// //                 >
// //                   لقد تم استلام الطلب. سيقوم فريق المتطوعين بالتنسيق فوراً.
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>
// //           </form>
// //         </Card>
// //       </Container>
// //     </ThemeProvider>
// //   );
// // }

// // export default RequestBlood;

import React, { useState } from "react";
import styled, {
  createGlobalStyle,
  ThemeProvider,
  keyframes,
  css,
} from "styled-components";
import {
  FaUser,
  FaTint,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaHospitalSymbol,
  FaSpinner,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const theme = {
  colors: {
    primaryNavy: "#1a237e",
    medicalTeal: "#00bcd4",
    medicalGreen: "#4caf50",
    emergencyRed: "#f44336",
    bgWhite: "#f8fafc", // Något ljusare/fräschare
    cardBg: "#ffffff",
    border: "#e2e8f0",
    textDark: "#003049",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "900px",
  },
};

// --- ANIMATIONER ---
const floating = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
  body {
    margin: 0; padding: 0;
    background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
    font-family: 'Cairo', sans-serif;
    direction: rtl;
    color: ${(props) => props.theme.colors.textDark};
    min-height: 100vh;
  }
`;

const MainLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 20px;
  gap: 50px;
  max-width: 1300px;
  margin: 0 auto;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column; /* Bilden hamnar överst på mobilen */
    padding-top: 20px;
  }
`;

const ImageSection = styled(motion.div)`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;

  .image-container {
    animation: ${floating} 5s ease-in-out infinite;
    position: relative;

    img {
      width: 100%;
      max-width: 550px;
      height: auto;
      border-radius: 40px;
      box-shadow: 0 30px 60px rgba(26, 35, 126, 0.2);
      border: 10px solid white;
    }

    /* En dekorativ cirkel bakom bilden */
    &::before {
      content: "";
      position: absolute;
      width: 110%;
      height: 110%;
      background: radial-gradient(
        circle,
        rgba(0, 188, 212, 0.1) 0%,
        transparent 70%
      );
      top: -5%;
      left: -5%;
      z-index: -1;
    }
  }

  .text-box {
    margin-top: 35px;
    h1 {
      color: #1a237e;
      font-weight: 900;
      font-size: 2.5rem;
      margin: 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    p {
      color: #475569;
      font-size: 1.2rem;
      margin-top: 15px;
      max-width: 450px;
      line-height: 1.6;
    }
  }
`;

const Card = styled(motion.div)`
  flex: 1;
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 35px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid white;
`;

const Header = styled.div`
  background: ${(props) => props.theme.colors.primaryNavy};
  color: white;
  padding: 35px 25px;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: ${(props) => props.theme.colors.medicalTeal};
  }

  h2 {
    margin: 10px 0 5px;
    font-size: 1.8rem;
    font-weight: 900;
  }
  p {
    margin: 0;
    opacity: 0.8;
    font-size: 1rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 30px;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 700;
  color: #334155;
  font-size: 0.95rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  svg {
    position: absolute;
    right: 15px;
    color: #94a3b8;
    z-index: 2;
    transition: 0.3s;
  }
  &:focus-within svg {
    color: ${(props) => props.theme.colors.medicalTeal};
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 14px 45px 14px 15px;
  border: 2px solid #f1f5f9;
  border-radius: 16px;
  font-family: "Cairo";
  font-size: 1rem;
  background: #f8fafc;
  transition: all 0.3s;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.medicalTeal};
    background: white;
    box-shadow: 0 0 0 4px rgba(0, 188, 212, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  width: calc(100% - 60px);
  margin: 0 30px 30px;
  padding: 20px;
  background: ${(props) =>
    props.$status === "success"
      ? props.theme.colors.medicalGreen
      : props.$status === "sending"
        ? props.theme.colors.medicalTeal
        : props.theme.colors.primaryNavy};
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 800;
  font-family: "Cairo";
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 10px 20px rgba(26, 35, 126, 0.2);
  .spinner-icon {
    ${(props) =>
      props.$status === "sending" &&
      css`
        animation: ${spin} 1s linear infinite;
      `}
  }
`;

function RequestBlood() {
  const [formData, setFormData] = useState({
    patientName: "",
    bloodType: "",
    area: "",
    quantity: 1,
  });
  const [status, setStatus] = useState("idle");

  const daraaAreas = [
    "درعا المدينة",
    "نوى",
    "طفس",
    "إزرع",
    "بصرى الشام",
    "الصنمين",
    "داعل",
    "جاسم",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainLayout>
        {/* BILDSEKTIONEN - NU TILL VÄNSTER */}
        <ImageSection
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="image-container">
            <img
              src={process.env.PUBLIC_URL + "/assets/blood2.png"}
              alt="طلب دم عاجل"
            />
          </div>
          <div className="text-box">
            <h1>كل نقطة بتفرق</h1>
            <p>
              ساهم في إنقاذ حياة من خلال طلب التبرع بالدم. طلبك سيصل فوراً لجميع
              المسجلين في منطقتك.
            </p>
          </div>
        </ImageSection>

        {/* FORMULÄRSEKTIONEN - NU TILL HÖGER */}
        <Card
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Header>
            <FaHospitalSymbol size={40} />
            <h2>طلب دم عاجل</h2>
            <p>محافظة درعا - حوران الأبية</p>
          </Header>

          <form onSubmit={handleSubmit}>
            <FormGrid>
              <FormGroup className="full-width">
                <Label>
                  <FaUser /> اسم المريض:
                </Label>
                <InputWrapper>
                  <FaUser />
                  <InputField
                    required
                    placeholder="الاسم الكامل"
                    value={formData.patientName}
                    onChange={(e) =>
                      setFormData({ ...formData, patientName: e.target.value })
                    }
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label>
                  <FaMapMarkerAlt /> المنطقة:
                </Label>
                <InputWrapper>
                  <FaMapMarkerAlt />
                  <InputField
                    as="select"
                    required
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }
                  >
                    <option value="">اختر المنطقة</option>
                    {daraaAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </InputField>
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label>
                  <FaTint /> الفصيلة:
                </Label>
                <InputWrapper>
                  <FaTint />
                  <InputField
                    as="select"
                    required
                    value={formData.bloodType}
                    onChange={(e) =>
                      setFormData({ ...formData, bloodType: e.target.value })
                    }
                  >
                    <option value="">اختر الفصيلة</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ),
                    )}
                  </InputField>
                </InputWrapper>
              </FormGroup>

              <FormGroup className="full-width">
                <Label>
                  <FaLayerGroup /> الكمية (أكياس):
                </Label>
                <InputWrapper>
                  <FaLayerGroup />
                  <InputField
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                  />
                </InputWrapper>
              </FormGroup>
            </FormGrid>

            <SubmitButton
              type="submit"
              $status={status}
              disabled={status === "sending"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === "idle" && (
                <>
                  <FaPaperPlane /> إرسال النداء الآن
                </>
              )}
              {status === "sending" && (
                <>
                  <FaSpinner className="spinner-icon" /> جاري التعميم...
                </>
              )}
              {status === "success" && (
                <>
                  <FaCheckCircle /> تم الإرسال بنجاح
                </>
              )}
            </SubmitButton>
          </form>

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{
                  background: "#f0fdf4",
                  color: "#166534",
                  textAlign: "center",
                  padding: "15px",
                  fontWeight: "bold",
                  borderTop: "1px solid #bcf0da",
                }}
              >
                تم نشر النداء في منطقة {formData.area} بنجاح.
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </MainLayout>
    </ThemeProvider>
  );
}

export default RequestBlood;
