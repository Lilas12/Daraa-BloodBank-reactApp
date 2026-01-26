import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import {
  FaHospital,
  FaEnvelope,
  FaLock,
  FaUserShield,
  FaArrowLeft,
  FaCircleNotch,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

// FIREBASE
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

const theme = {
  colors: {
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

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0; padding: 0;
    background: ${theme.colors.bg};
    font-family: 'Cairo', sans-serif;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle at 0% 0%,
    #1a237e 0%,
    #05071a 50%,
    #0d1231 100%
  );
  direction: rtl;
  padding: 20px;
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
`;

const InputField = styled.div`
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

const Input = styled.input`
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
    border-color: ${theme.colors.teal};
    background: rgba(255, 255, 255, 0.12);
  }
`;

const IconPos = styled.div`
  position: absolute;
  right: 18px;
  top: 45px;
  color: ${(props) =>
    props.$active ? theme.colors.teal : "rgba(255, 255, 255, 0.3)"};
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

const ForgotPassword = styled.div`
  text-align: left;
  margin-top: -15px;
  margin-bottom: 20px;
  font-size: 0.8rem;
  color: ${theme.colors.teal};
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

const SubmitBtn = styled(motion.button)`
  width: 100%;
  padding: 18px;
  border-radius: 18px;
  border: none;
  background: linear-gradient(
    135deg,
    ${theme.colors.teal} 0%,
    ${theme.colors.green} 100%
  );
  color: white;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 10px 20px rgba(0, 188, 212, 0.3);
  font-family: "Cairo", sans-serif;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StatusBox = styled(motion.div)`
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 0.9rem;
  background: ${(props) =>
    props.$type === "success"
      ? "rgba(76, 175, 80, 0.2)"
      : "rgba(244, 67, 54, 0.2)"};
  color: ${(props) => (props.$type === "success" ? "#81c784" : "#e57373")};
  border: 1px solid
    ${(props) => (props.$type === "success" ? "#4caf50" : "#f44336")};
`;

const Loader = styled(FaCircleNotch)`
  animation: ${spin} 1s linear infinite;
  font-size: 1.2rem;
`;

const ToggleText = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 25px;
  font-size: 0.9rem;
  span {
    color: ${theme.colors.teal};
    cursor: pointer;
    font-weight: bold;
    margin-right: 8px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

/* =======================
   HUVUDKOMPONENT
======================= */
function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { role: "doctor" },
  });
  const watched = watch();

  const handleResetPassword = async () => {
    const email = getValues("email");
    if (!email) {
      setStatus({ type: "error", msg: "يرجى إدخال البريد الإلكتروني أولاً" });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setStatus({ type: "success", msg: "تم إرسال رابط استعادة كلمة المرور" });
    } catch (error) {
      setStatus({ type: "error", msg: "خطأ في إرسال الرابط" });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setStatus({ type: "", msg: "" });
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        await signOut(auth);
        setStatus({ type: "success", msg: "تم إنشاء الحساب! سجل دخولك الآن" });
        setTimeout(() => {
          setIsRegistering(false);
          reset();
        }, 2500);
      } else {
        await setPersistence(auth, browserSessionPersistence);
        const cred = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password,
        );
        onLogin({ ...cred.user, role: data.role });
      }
    } catch (error) {
      setStatus({ type: "error", msg: "بيانات الدخول غير صحيحة" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        <LoginBox
          key={isRegistering ? "reg" : "log"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <header style={{ textAlign: "center", marginBottom: "35px" }}>
            <FaHospital size={60} color={theme.colors.teal} />
            <h2 style={{ color: "white", marginTop: "15px" }}>
              نظام المستشفيات
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)" }}>
              {isRegistering ? "إضافة عضو جديد" : "سجل الدخول للمتابعة"}
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)}>
            {status.msg && (
              <StatusBox $type={status.type}>{status.msg}</StatusBox>
            )}

            <InputField>
              <Label>البريد الإلكتروني</Label>
              <Input
                type="email"
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
                type={showPassword ? "text" : "password"}
                $error={!!errors.password}
                {...register("password", { required: true, minLength: 6 })}
              />
              <IconPos $active={watched.password?.length > 0}>
                <FaLock />
              </IconPos>
              <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputField>

            {!isRegistering && (
              <ForgotPassword onClick={handleResetPassword}>
                نسيت كلمة المرور؟
              </ForgotPassword>
            )}

            {!isRegistering && (
              <InputField>
                <Label>الصلاحية</Label>
                <Input as="select" {...register("role")}>
                  <option value="doctor">طبيب</option>
                  <option value="nurse">ممرض</option>
                  <option value="admin">مدمن</option>
                </Input>
                <IconPos $active>
                  <FaUserShield />
                </IconPos>
              </InputField>
            )}

            <SubmitBtn type="submit" disabled={loading}>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <span>{isRegistering ? "إنشاء حساب" : "تسجيل دخول"}</span>
                  {isRegistering ? <FaUserPlus /> : <FaArrowLeft />}
                </>
              )}
            </SubmitBtn>
          </form>

          <ToggleText>
            {isRegistering ? "لديك حساب؟" : "ليس لديك حساب؟"}
            <span
              onClick={() => {
                setIsRegistering(!isRegistering);
                setStatus({ type: "", msg: "" });
                reset();
              }}
            >
              {isRegistering ? "سجل دخولك" : "أنشئ حساباً"}
            </span>
          </ToggleText>
        </LoginBox>
      </AnimatePresence>
    </Container>
  );
}

export default Login;
