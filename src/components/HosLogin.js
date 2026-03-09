import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import {
  FaTint,
  FaEnvelope,
  FaLock,
  FaArrowLeft,
  FaCircleNotch,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

// Firebase (Säkerställ att sökvägen stämmer i ditt projekt)
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// 1. Theme & Breakpoints
const theme = {
  colors: {
    bloodRed: "#e63946",
    bg: "#05071a",
    glass: "rgba(255, 255, 255, 0.05)",
    inputBg: "rgba(255, 255, 255, 0.08)",
    border: "rgba(255, 255, 255, 0.12)",
    red: "#f44336",
  },
  breakpoints: {
    mobile: "480px",
  },
};

// 2. Animations (Keyframes)
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const float = keyframes`
  0% { transform: translateY(0px); opacity: 0; }
  50% { opacity: 0.2; }
  100% { transform: translateY(-100vh); opacity: 0; }
`;

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// 3. Global Styles - Låser skärmen helt
const GlobalStyles = createGlobalStyle`
  body, html {
    margin: 0; padding: 0;
    background: ${theme.colors.bg};
    font-family: 'Cairo', sans-serif;
    overflow: hidden;
    height: 100%;
    width: 100%;
    touch-action: none; /* Förhindrar "pull-to-refresh" på mobil */
  }
`;

// 4. Styled Components
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 50%, #2b0505 0%, #05071a 70%);
  direction: rtl;
  padding: 10px;
  position: relative;
  overflow: hidden;
`;

const Particle = styled.div`
  position: absolute;
  background: ${theme.colors.bloodRed};
  border-radius: 50%;
  bottom: -10px;
  animation: ${float} linear infinite;
  pointer-events: none;
`;

const LoginBox = styled(motion.div)`
  background: ${theme.colors.glass};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.border};
  border-radius: 20px;
  width: 100%;
  max-width: 360px; /* Ännu mer kompakt bredd */
  padding: 25px 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  z-index: 10;

  @media (min-width: ${theme.breakpoints.mobile}) {
    padding: 30px;
    max-width: 380px;
  }
`;

const InputField = styled(motion.div)`
  position: relative;
  margin-bottom: 12px; /* Tätare mellan fälten */
`;

const Label = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  margin-bottom: 5px;
  margin-right: 4px;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 12px 42px 12px 40px;
  background: ${theme.colors.inputBg};
  border: 1.5px solid
    ${(props) => (props.$error ? theme.colors.red : "transparent")};
  border-radius: 12px;
  color: white;
  font-size: 16px; /* Viktigt: Förhindrar auto-zoom på iPhone */
  box-sizing: border-box;
  font-family: "Cairo", sans-serif;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${theme.colors.bloodRed};
    background: rgba(255, 255, 255, 0.1);
  }
`;

const IconPos = styled.div`
  position: absolute;
  right: 14px;
  top: 36px;
  color: ${(props) =>
    props.$active ? theme.colors.bloodRed : "rgba(255, 255, 255, 0.3)"};
`;

const PasswordToggle = styled.div`
  position: absolute;
  left: 14px;
  top: 36px;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SubmitBtn = styled(motion.button)`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(
    135deg,
    ${theme.colors.bloodRed} 0%,
    #8b0000 100%
  );
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;

  &:disabled {
    opacity: 0.6;
  }
`;

const StatusBox = styled(motion.div)`
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 0.8rem;
  background: rgba(244, 67, 54, 0.15);
  color: #ff8a80;
  border: 1px solid #f44336;
`;

const Loader = styled(FaCircleNotch)`
  animation: ${spin} 1s linear infinite;
`;

// 5. Main Component
export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watched = watch();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      await setPersistence(auth, browserSessionPersistence);
      const cred = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = cred.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          lastLogin: serverTimestamp(),
          role: "staff",
        });
      } else {
        await setDoc(
          userDocRef,
          { lastLogin: serverTimestamp() },
          { merge: true },
        );
      }
      onLogin(user);
    } catch (err) {
      setError("خطأ في البيانات.. يرجى التأكد من البريد وكلمة المرور");
    } finally {
      setLoading(false);
    }
  };

  const particles = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2 + "px",
    left: Math.random() * 100 + "%",
    duration: Math.random() * 5 + 7 + "s",
    delay: Math.random() * 5 + "s",
  }));

  return (
    <Container>
      <GlobalStyles />
      {particles.map((p) => (
        <Particle
          key={p.id}
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      <AnimatePresence>
        <LoginBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header - Kompakt version */}
          <InputField
            variants={itemVariants}
            style={{ textAlign: "center", marginBottom: "15px" }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <FaTint size={38} color={theme.colors.bloodRed} />
            </motion.div>
            <h2
              style={{
                color: "white",
                marginTop: "8px",
                fontSize: "1.1rem",
                marginBottom: "4px",
                fontWeight: "800",
              }}
            >
              النظام المركزي لبنك الدم
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.75rem",
                margin: 0,
              }}
            >
              إدارة الموارد الدموية الوطنية
            </p>
          </InputField>

          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <StatusBox initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {error}
              </StatusBox>
            )}

            <InputField variants={itemVariants}>
              <Label>البريد الإلكتروني</Label>
              <Input
                type="email"
                placeholder="user@bloodbank.gov"
                $error={!!errors.email}
                {...register("email", { required: true })}
              />
              <IconPos $active={watched.email?.length > 0}>
                <FaEnvelope size={14} />
              </IconPos>
            </InputField>

            <InputField variants={itemVariants}>
              <Label>كلمة المرور</Label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                $error={!!errors.password}
                {...register("password", { required: true })}
              />
              <IconPos $active={watched.password?.length > 0}>
                <FaLock size={14} />
              </IconPos>
              <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </PasswordToggle>
            </InputField>

            <InputField variants={itemVariants}>
              <SubmitBtn
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <span>تسجيل الدخول</span>
                    <FaArrowLeft
                      style={{
                        transform: "rotate(180deg)",
                        fontSize: "0.8rem",
                      }}
                    />
                  </>
                )}
              </SubmitBtn>
            </InputField>
          </form>

          <p
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.6rem",
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            النظام مراقب ومحمي - الاستخدام المصرح به فقط
          </p>
        </LoginBox>
      </AnimatePresence>
    </Container>
  );
}
