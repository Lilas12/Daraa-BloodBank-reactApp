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

import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const theme = {
  colors: {
    bloodRed: "#e63946",
    teal: "#00bcd4",
    green: "#4caf50",
    red: "#f44336",
    navy: "#1a237e",
    bg: "#05071a",
    glass: "rgba(255, 255, 255, 0.05)",
    inputBg: "rgba(255, 255, 255, 0.08)",
    border: "rgba(255, 255, 255, 0.12)",
  },
};

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const breath = keyframes`
  0%, 100% { background-size: 100% 100%; }
  50% { background-size: 120% 120%; }
`;

const float = keyframes`
  0% { transform: translateY(0px) translateX(0px); opacity: 0; }
  20% { opacity: 0.2; }
  80% { opacity: 0.2; }
  100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
`;

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0; padding: 0;
    background: ${theme.colors.bg};
    font-family: 'Cairo', sans-serif;
    overflow: hidden; // Förhindra scrollbar pga partiklar
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle at 50% 50%,
    #3b0505 0%,
    #05071a 60%,
    #0d1231 100%
  );
  animation: ${breath} 15s ease-in-out infinite;
  direction: rtl;
  padding: 20px;
  position: relative;
`;

const Particle = styled.div`
  position: absolute;
  background: ${theme.colors.bloodRed};
  border-radius: 50%;
  opacity: 0;
  bottom: -20px;
  animation: ${float} linear infinite;
  filter: blur(2px);
  pointer-events: none;
`;

const LoginBox = styled(motion.div)`
  background: ${theme.colors.glass};
  backdrop-filter: blur(25px);
  border: 1px solid ${theme.colors.border};
  border-radius: 35px;
  width: 100%;
  max-width: 440px;
  padding: 45px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 10;
`;

const InputField = styled(motion.div)`
  position: relative;
  margin-bottom: 22px;
`;

const Label = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 10px;
  margin-right: 5px;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 15px 48px 15px 45px;
  background: ${theme.colors.inputBg};
  border: 2px solid
    ${(props) => (props.$error ? theme.colors.red : "transparent")};
  border-radius: 16px;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
  font-family: "Cairo", sans-serif;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.bloodRed};
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 15px rgba(230, 57, 70, 0.2);
  }
`;

const IconPos = styled.div`
  position: absolute;
  right: 18px;
  top: 45px;
  color: ${(props) =>
    props.$active ? theme.colors.bloodRed : "rgba(255, 255, 255, 0.3)"};
  transition: color 0.3s ease;
`;

const PasswordToggle = styled.div`
  position: absolute;
  left: 18px;
  top: 45px;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 24px;
  &:hover {
    color: white;
  }
`;

const SubmitBtn = styled(motion.button)`
  width: 100%;
  padding: 18px;
  border-radius: 18px;
  border: none;
  background: linear-gradient(
    135deg,
    ${theme.colors.bloodRed} 0%,
    #8b0000 100%
  );
  color: white;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: "Cairo", sans-serif;
  box-shadow: 0 10px 20px rgba(230, 57, 70, 0.2);

  &:disabled {
    opacity: 0.5;
  }
`;

const BtnIcon = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const StatusBox = styled(motion.div)`
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 0.9rem;
  background: ${(props) =>
    props.$type === "error"
      ? "rgba(244, 67, 54, 0.1)"
      : "rgba(76, 175, 80, 0.1)"};
  color: ${(props) => (props.$type === "error" ? "#e57373" : "#81c784")};
  border: 1px solid
    ${(props) => (props.$type === "error" ? "#f44336" : "#4caf50")};
`;

const Loader = styled(FaCircleNotch)`
  animation: ${spin} 1s linear infinite;
`;

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const iconAnimation = {
  hover: { x: -5, transition: { yoyo: Infinity, duration: 0.4 } },
};

const inputFocusAnimation = {
  focus: { scale: 1.02 },
};

function Login({ onLogin }) {
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
    } catch (error) {
      console.error("Login Error:", error);
      setError("خطأ في البيانات.. يرجى التأكد من البريد وكلمة المرور");
    } finally {
      setLoading(false);
    }
  };

  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 3 + "px",
    left: Math.random() * 100 + "%",
    duration: Math.random() * 10 + 10 + "s",
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
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <InputField
            variants={itemVariants}
            style={{ textAlign: "center", marginBottom: "35px" }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <FaTint size={60} color={theme.colors.bloodRed} />
            </motion.div>
            <h2
              style={{ color: "white", marginTop: "15px", fontWeight: "800" }}
            >
              النظام المركزي لبنك الدم
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>
              المنصة الوطنية لإدارة الموارد الدموية
            </p>
          </InputField>

          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <StatusBox
                $type="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {error}
              </StatusBox>
            )}

            <InputField variants={itemVariants}>
              <Label>البريد الإلكتروني المهني</Label>
              <Input
                type="email"
                placeholder="user@bloodbank.gov"
                $error={!!errors.email}
                {...register("email", { required: true })}
                whileFocus="focus"
                variants={inputFocusAnimation}
              />
              <IconPos $active={watched.email?.length > 0}>
                <FaEnvelope />
              </IconPos>
            </InputField>

            <InputField variants={itemVariants}>
              <Label>كلمة المرور</Label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                $error={!!errors.password}
                {...register("password", { required: true })}
                whileFocus="focus"
                variants={inputFocusAnimation}
              />
              <IconPos $active={watched.password?.length > 0}>
                <FaLock />
              </IconPos>
              <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputField>

            <InputField variants={itemVariants}>
              <SubmitBtn
                type="submit"
                disabled={loading}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <span>تسجيل الدخول للنظام</span>
                    <BtnIcon variants={iconAnimation}>
                      <FaArrowLeft style={{ transform: "rotate(180deg)" }} />
                    </BtnIcon>
                  </>
                )}
              </SubmitBtn>
            </InputField>
          </form>

          <InputField
            variants={itemVariants}
            style={{ marginTop: "25px", textAlign: "center" }}
          >
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>
              النظام مراقب ومحمي - الاستخدام المصرح به فقط
            </p>
          </InputField>
        </LoginBox>
      </AnimatePresence>
    </Container>
  );
}

export default Login;
