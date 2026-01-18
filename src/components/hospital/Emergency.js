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
    aspect-ratio: 1/1;
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
