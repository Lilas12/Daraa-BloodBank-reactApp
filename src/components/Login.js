// import React, { useState } from "react";
// import styled, { createGlobalStyle, keyframes } from "styled-components";
// import {
//   FaHospital,
//   FaEnvelope,
//   FaLock,
//   FaUserShield,
//   FaArrowLeft,
//   FaArrowRight,
//   FaCircleNotch,
//   FaUserPlus,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { useForm } from "react-hook-form";

// // FIREBASE - Importera signOut för att förhindra direkt inloggning efter registrering
// import { auth } from "../firebase";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";

// /* =======================
//    STILAR & ANIMERINGAR
// ======================= */
// const spin = keyframes`
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// `;

// const GlobalStyles = createGlobalStyle`
//   :root {
//     --medical-teal: #00bcd4;
//     --medical-green: #4caf50;
//     --emergency-red: #f44336;
//     --primary-navy: #1a237e;
//   }
//   body {
//     margin: 0; padding: 0;
//     background: #05071a;
//     font-family: 'Cairo', sans-serif;
//   }
// `;

// const Container = styled.div`
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: radial-gradient(circle at 50% 50%, #1a237e 0%, #05071a 100%);
//   direction: rtl;
//   padding: 20px;
// `;

// const LoginBox = styled(motion.div)`
//   background: rgba(255, 255, 255, 0.05);
//   backdrop-filter: blur(20px);
//   border: 1px solid rgba(255, 255, 255, 0.1);
//   border-radius: 30px;
//   width: 100%;
//   max-width: 420px;
//   padding: 40px;
//   box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
// `;

// const InputField = styled.div`
//   position: relative;
//   margin-bottom: 20px;
// `;

// const Label = styled.label`
//   display: block;
//   color: rgba(255, 255, 255, 0.7);
//   font-size: 0.85rem;
//   margin-bottom: 8px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 14px 45px 14px 15px;
//   background: rgba(255, 255, 255, 0.07);
//   border: 1px solid
//     ${(props) =>
//       props.$error ? "var(--emergency-red)" : "rgba(255, 255, 255, 0.1)"};
//   border-radius: 12px;
//   color: white;
//   font-size: 1rem;
//   box-sizing: border-box;
//   font-family: "Cairo", sans-serif;
//   &:focus {
//     outline: none;
//     border-color: var(--medical-teal);
//   }
// `;

// const IconPos = styled.div`
//   position: absolute;
//   right: 15px;
//   top: 42px;
//   color: ${(props) =>
//     props.$active ? "var(--medical-teal)" : "rgba(255, 255, 255, 0.3)"};
// `;

// const SubmitBtn = styled(motion.button)`
//   width: 100%;
//   padding: 16px;
//   border-radius: 14px;
//   border: none;
//   background: linear-gradient(90deg, var(--medical-teal), var(--medical-green));
//   color: white;
//   font-weight: 700;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 10px;
//   font-family: "Cairo", sans-serif;
//   &:disabled {
//     opacity: 0.6;
//   }
// `;

// const ToggleText = styled.p`
//   color: rgba(255, 255, 255, 0.6);
//   text-align: center;
//   margin-top: 25px;
//   font-size: 0.9rem;
//   span {
//     color: var(--medical-teal);
//     cursor: pointer;
//     font-weight: bold;
//     margin-right: 5px;
//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

// const SuccessMsg = styled(motion.div)`
//   color: white;
//   background: var(--medical-green);
//   font-size: 0.85rem;
//   padding: 10px;
//   border-radius: 10px;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const ErrorMsg = styled(motion.div)`
//   color: white;
//   background: var(--emergency-red);
//   font-size: 0.85rem;
//   padding: 10px;
//   border-radius: 10px;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const Loader = styled(FaCircleNotch)`
//   animation: ${spin} 1s linear infinite;
// `;

// /* =======================
//    HUVUDKOMPONENT
// ======================= */

// function Login({ onLogin }) {
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorText, setErrorText] = useState("");
//   const [successText, setSuccessText] = useState("");

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const watched = watch();

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setErrorText("");
//     setSuccessText("");

//     try {
//       if (isRegistering) {
//         // 1. Skapa kontot i Firebase
//         await createUserWithEmailAndPassword(auth, data.email, data.password);

//         // 2. LOGGA UT DIREKT (Viktigt för att inte hoppa in i appen direkt)
//         await signOut(auth);

//         // 3. Visa framgång och byt vy
//         setSuccessText("تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول الآن.");
//         setTimeout(() => {
//           setIsRegistering(false);
//           reset();
//         }, 2000);
//       } else {
//         // 4. Logga in som vanligt
//         const userCredential = await signInWithEmailAndPassword(
//           auth,
//           data.email,
//           data.password
//         );
//         onLogin({ ...userCredential.user, role: data.role });
//       }
//     } catch (error) {
//       console.error("Firebase Error:", error.code);
//       if (error.code === "auth/email-already-in-use") {
//         setErrorText("هذا البريد الإلكتروني مستخدم بالفعل");
//       } else if (error.code === "auth/weak-password") {
//         setErrorText("كلمة المرور ضعيفة جداً (6 رموز على الأقل)");
//       } else if (
//         error.code === "auth/invalid-credential" ||
//         error.code === "auth/wrong-password"
//       ) {
//         setErrorText("بيانات الدخول غير صحيحة");
//       } else {
//         setErrorText("حدث خطأ ما، يرجى المحاولة لاحقاً");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <GlobalStyles />
//       <AnimatePresence mode="wait">
//         <LoginBox
//           key={isRegistering ? "register" : "login"}
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//         >
//           <header style={{ textAlign: "center", marginBottom: "30px" }}>
//             <FaHospital size={50} color="var(--medical-teal)" />
//             <h2 style={{ color: "white", marginTop: "10px" }}>
//               نـظام المستشفيات
//             </h2>
//             <p style={{ color: "rgba(255,255,255,0.5)" }}>
//               {isRegistering
//                 ? "إضافة عضو جديد للنظام"
//                 : "سجل الدخول لإدارة بياناتك"}
//             </p>
//           </header>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             {errorText && <ErrorMsg>{errorText}</ErrorMsg>}
//             {successText && <SuccessMsg>{successText}</SuccessMsg>}

//             <InputField>
//               <Label>البريد الإلكتروني</Label>
//               <Input
//                 type="email"
//                 placeholder="admin@hospital.com"
//                 $error={!!errors.email}
//                 {...register("email", { required: true })}
//               />
//               <IconPos $active={watched.email?.length > 0}>
//                 <FaEnvelope />
//               </IconPos>
//             </InputField>

//             <InputField>
//               <Label>كلمة المرور</Label>
//               <Input
//                 type="password"
//                 placeholder="••••••••"
//                 $error={!!errors.password}
//                 {...register("password", { required: true, minLength: 6 })}
//               />
//               <IconPos $active={watched.password?.length > 0}>
//                 <FaLock />
//               </IconPos>
//             </InputField>

//             {/* Rollval visas endast vid inloggning */}
//             {!isRegistering && (
//               <InputField>
//                 <Label>الدور الوظيفي</Label>
//                 <Input as="select" {...register("role", { required: true })}>
//                   <option value="doctor" style={{ color: "#000" }}>
//                     طبيب / دكتور
//                   </option>
//                   <option value="nurse" style={{ color: "#000" }}>
//                     ممرض / ممرضة
//                   </option>
//                   <option value="admin" style={{ color: "#000" }}>
//                     إدارة النظام
//                   </option>
//                 </Input>
//                 <IconPos $active={true}>
//                   <FaUserShield />
//                 </IconPos>
//               </InputField>
//             )}

//             <SubmitBtn
//               type="submit"
//               disabled={loading}
//               whileTap={{ scale: 0.98 }}
//             >
//               {loading ? (
//                 <Loader />
//               ) : (
//                 <>
//                   <span>{isRegistering ? "إنشاء الحساب" : "تسجيل الدخول"}</span>
//                   {isRegistering ? <FaUserPlus /> : <FaArrowLeft />}
//                 </>
//               )}
//             </SubmitBtn>
//           </form>

//           <ToggleText>
//             {isRegistering ? "هل لديك حساب؟" : "ليس لديك حساب؟"}
//             <span
//               onClick={() => {
//                 setIsRegistering(!isRegistering);
//                 setErrorText("");
//                 setSuccessText("");
//                 reset();
//               }}
//             >
//               {isRegistering ? "سجل دخولك" : "أنشئ حساباً جديداً"}
//             </span>
//           </ToggleText>
//         </LoginBox>
//       </AnimatePresence>
//     </Container>
//   );
// }

// export default Login;

import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import {
  FaHospital,
  FaEnvelope,
  FaLock,
  FaUserShield,
  FaArrowLeft,
  FaArrowRight,
  FaCircleNotch,
  FaUserPlus,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

// FIREBASE - Uppdaterade importer
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence, // <--- NYTT
  browserSessionPersistence, // <--- NYTT
} from "firebase/auth";

/* =======================
   STILAR & ANIMERINGAR
======================= */
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const GlobalStyles = createGlobalStyle`
  :root {
    --medical-teal: #00bcd4;
    --medical-green: #4caf50;
    --emergency-red: #f44336;
    --primary-navy: #1a237e;
  }
  body {
    margin: 0; padding: 0;
    background: #05071a;
    font-family: 'Cairo', sans-serif;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 50%, #1a237e 0%, #05071a 100%);
  direction: rtl;
  padding: 20px;
`;

const LoginBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  width: 100%;
  max-width: 420px;
  padding: 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
`;

const InputField = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 45px 14px 15px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid
    ${(props) =>
      props.$error ? "var(--emergency-red)" : "rgba(255, 255, 255, 0.1)"};
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
  font-family: "Cairo", sans-serif;
  &:focus {
    outline: none;
    border-color: var(--medical-teal);
  }
`;

const IconPos = styled.div`
  position: absolute;
  right: 15px;
  top: 42px;
  color: ${(props) =>
    props.$active ? "var(--medical-teal)" : "rgba(255, 255, 255, 0.3)"};
`;

const SubmitBtn = styled(motion.button)`
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(90deg, var(--medical-teal), var(--medical-green));
  color: white;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: "Cairo", sans-serif;
  &:disabled {
    opacity: 0.6;
  }
`;

const ToggleText = styled.p`
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin-top: 25px;
  font-size: 0.9rem;
  span {
    color: var(--medical-teal);
    cursor: pointer;
    font-weight: bold;
    margin-right: 5px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SuccessMsg = styled(motion.div)`
  color: white;
  background: var(--medical-green);
  font-size: 0.85rem;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
`;

const ErrorMsg = styled(motion.div)`
  color: white;
  background: var(--emergency-red);
  font-size: 0.85rem;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
`;

const Loader = styled(FaCircleNotch)`
  animation: ${spin} 1s linear infinite;
`;

/* =======================
   HUVUDKOMPONENT
======================= */

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const watched = watch();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorText("");
    setSuccessText("");

    try {
      if (isRegistering) {
        // Skapa kontot
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        // Logga ut direkt så man måste logga in manuellt efter registrering
        await signOut(auth);

        setSuccessText("تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول الآن.");
        setTimeout(() => {
          setIsRegistering(false);
          reset();
        }, 2000);
      } else {
        // --- UPPDATERAD LOGIK FÖR INLOGGNING ---

        // 1. Sätt persistence till SESSION (Rensas när fliken stängs)
        await setPersistence(auth, browserSessionPersistence);

        // 2. Genomför själva inloggningen
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        // 3. Skicka vidare användardatan till App.js
        onLogin({ ...userCredential.user, role: data.role });
      }
    } catch (error) {
      console.error("Firebase Error:", error.code);
      if (error.code === "auth/email-already-in-use") {
        setErrorText("هذا البريد الإلكتروني مستخدم بالفعل");
      } else if (error.code === "auth/weak-password") {
        setErrorText("كلمة المرor ضعيفة جداً (6 رموز على الأقل)");
      } else if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        setErrorText("بيانات الدخول غير صحيحة");
      } else {
        setErrorText("حدث خطأ ما، يرجى المحاولة لاحقاً");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        <LoginBox
          key={isRegistering ? "register" : "login"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <header style={{ textAlign: "center", marginBottom: "30px" }}>
            <FaHospital size={50} color="var(--medical-teal)" />
            <h2 style={{ color: "white", marginTop: "10px" }}>
              نـظام المستشفيات
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)" }}>
              {isRegistering
                ? "إضافة عضو جديد للنظام"
                : "سجل الدخول لإدارة بياناتك"}
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)}>
            {errorText && <ErrorMsg>{errorText}</ErrorMsg>}
            {successText && <SuccessMsg>{successText}</SuccessMsg>}

            <InputField>
              <Label>البريد الإلكتروني</Label>
              <Input
                type="email"
                placeholder="admin@hospital.com"
                $error={!!errors.email}
                {...register("email", { required: true })}
              />
              <IconPos $active={watched.email?.length > 0}>
                <FaEnvelope />
              </IconPos>
            </InputField>

            <InputField>
              <Label>كلمة المرور</Label>
              <Input
                type="password"
                placeholder="••••••••"
                $error={!!errors.password}
                {...register("password", { required: true, minLength: 6 })}
              />
              <IconPos $active={watched.password?.length > 0}>
                <FaLock />
              </IconPos>
            </InputField>

            {!isRegistering && (
              <InputField>
                <Label>الدور الوظيفي</Label>
                <Input as="select" {...register("role", { required: true })}>
                  <option value="doctor" style={{ color: "#000" }}>
                    طبيب / دكتور
                  </option>
                  <option value="nurse" style={{ color: "#000" }}>
                    ممرض / ممرضة
                  </option>
                  <option value="admin" style={{ color: "#000" }}>
                    إدارة النظام
                  </option>
                </Input>
                <IconPos $active={true}>
                  <FaUserShield />
                </IconPos>
              </InputField>
            )}

            <SubmitBtn
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <Loader />
              ) : (
                <>
                  <span>{isRegistering ? "إنشاء الحساب" : "تسجيل الدخول"}</span>
                  {isRegistering ? <FaUserPlus /> : <FaArrowLeft />}
                </>
              )}
            </SubmitBtn>
          </form>

          <ToggleText>
            {isRegistering ? "هل لديك حساب؟" : "ليس لديك حساب؟"}
            <span
              onClick={() => {
                setIsRegistering(!isRegistering);
                setErrorText("");
                setSuccessText("");
                reset();
              }}
            >
              {isRegistering ? "سجل دخولك" : "أنشئ حساباً جديداً"}
            </span>
          </ToggleText>
        </LoginBox>
      </AnimatePresence>
    </Container>
  );
}

export default Login;
