import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import {
  FaTint,
  FaEnvelope,
  FaLock,
  FaCircleNotch,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Firebase
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const theme = {
  colors: {
    bloodRed: "#e63946",
    bg: "#05071a",
    glass: "rgba(255, 255, 255, 0.05)",
    inputBg: "rgba(255, 255, 255, 0.08)",
    border: "rgba(255, 255, 255, 0.12)",
    red: "#f44336",
  },
};

// 1. Definiera keyframes separat
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const float = keyframes`
  0% { transform: translateY(0px); opacity: 0; }
  50% { opacity: 0.2; }
  100% { transform: translateY(-100vh); opacity: 0; }
`;

const GlobalStyles = createGlobalStyle`
  body, html {
    margin: 0; padding: 0; background: ${theme.colors.bg};
    font-family: 'Cairo', sans-serif; overflow: hidden;
    height: 100%; width: 100%; touch-action: none;
  }
`;

// 2. Använd css-hjälparen för animationer
const Loader = styled(FaCircleNotch)`
  animation: ${css`
    ${spin} 1s linear infinite
  `};
`;

const Particle = styled.div`
  position: absolute;
  background: ${theme.colors.bloodRed};
  border-radius: 50%;
  bottom: -10px;
  /* Här skickar vi in variabler via props men wrappar i css */
  animation: ${(props) => css`
    ${float} ${props.$dur} linear infinite
  `};
  animation-delay: ${(props) => props.$delay};
  pointer-events: none;
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 50%, #2b0505 0%, #05071a 70%);
  direction: rtl;
  position: relative;
  overflow: hidden;
`;

const LoginBox = styled(motion.div)`
  background: ${theme.colors.glass};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.border};
  border-radius: 20px;
  width: 90%;
  max-width: 360px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  z-index: 10;
`;

const InputField = styled.div`
  position: relative;
  margin-bottom: 12px;
`;
const Label = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  margin-bottom: 5px;
  margin-right: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 42px 12px 40px;
  background: ${theme.colors.inputBg};
  border: 1.5px solid
    ${(props) => (props.$error ? theme.colors.red : "transparent")};
  border-radius: 12px;
  color: white;
  font-size: 16px;
  box-sizing: border-box;
  font-family: "Cairo", sans-serif;
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
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &:disabled {
    opacity: 0.6;
  }
`;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const userDocRef = doc(db, "users", cred.user.uid);
      await setDoc(
        userDocRef,
        { lastLogin: serverTimestamp() },
        { merge: true },
      );
      navigate("/");
    } catch (err) {
      setError("خطأ في الدخول.. يرجى التأكد من البيانات");
    } finally {
      setLoading(false);
    }
  };

  const particles = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2 + "px",
    left: Math.random() * 100 + "%",
    dur: Math.random() * 5 + 7 + "s",
    delay: Math.random() * 5 + "s",
  }));

  return (
    <Container>
      <GlobalStyles />
      {particles.map((p) => (
        <Particle
          key={p.id}
          style={{ width: p.size, height: p.size, left: p.left }}
          $dur={p.dur}
          $delay={p.delay}
        />
      ))}

      <AnimatePresence>
        <LoginBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <FaTint size={40} color={theme.colors.bloodRed} />
            <h2 style={{ color: "white", marginTop: "10px" }}>
              بنك الدم المركزي
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div
                style={{
                  color: "#ff8a80",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                {error}
              </div>
            )}

            <InputField>
              <Label>البريد الإلكتروني</Label>
              <Input
                type="email"
                placeholder="user@domain.com"
                $error={!!errors.email}
                {...register("email", { required: true })}
              />
              <IconPos $active={watched.email?.length > 0}>
                <FaEnvelope size={14} />
              </IconPos>
            </InputField>

            <InputField>
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

            <SubmitBtn
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? <Loader /> : "تسجيل الدخول"}
            </SubmitBtn>
          </form>
        </LoginBox>
      </AnimatePresence>
    </Container>
  );
}
