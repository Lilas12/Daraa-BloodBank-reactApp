import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

function Register({ onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Skapar användaren i Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      alert("تم إنشاء الحساب بنجاح!"); // Kontot skapat!
      onBack(); // Gå tillbaka till login
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("هذا البريد مسجل مسبقاً");
      } else {
        setError("حدث خطأ أثناء التسجيل");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterBox initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>إنشاء حساب جديد</h2>
      <p>أدخل البيانات لإضافة عضو جديد إلى النظام</p>

      {error && <ErrorBar>{error}</ErrorBar>}

      <form onSubmit={handleRegister}>
        <InputGroup>
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="كلمة المرور"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>

        <SubmitBtn type="submit" disabled={loading}>
          {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
        </SubmitBtn>
      </form>

      <BackBtn onClick={onBack}>
        <FaArrowRight /> العودة لتسجيل الدخول
      </BackBtn>
    </RegisterBox>
  );
}

export default Register;

// --- STYLES (Förenklade för exemplet) ---
const RegisterBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 40px;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  color: white;
  text-align: center;
  width: 100%;
  max-width: 400px;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 15px;
  input {
    width: 100%;
    padding: 12px 40px;
    border-radius: 10px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
  .icon {
    position: absolute;
    right: 15px;
    top: 15px;
    color: #00bcd4;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  border: none;
  background: #00bcd4;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  justify-content: center;
`;

const ErrorBar = styled.div`
  background: #f44336;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
`;
