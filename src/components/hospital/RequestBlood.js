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

// --- Tema ---
const theme = {
  colors: {
    primaryNavy: "#1a237e",
    medicalTeal: "#00bcd4",
    medicalGreen: "#4caf50",
    emergencyRed: "#f44336",
    bgWhite: "#f8fafc",
    cardBg: "#ffffff",
    border: "#e2e8f0",
    textDark: "#003049",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "900px",
  },
};

// --- Animationer ---
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
  body {
    margin: 0; padding: 0;
    font-family: 'Cairo', sans-serif;
    direction: rtl;
     background-color: #f8fafc;
    color: #003049;
    min-height: 100vh;
  }
`;

// --- Styled Components ---
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
    flex-direction: column;
    padding-top: 20px;
  }
`;

const ImageSection = styled(motion.div)`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

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
    box-shadow: 0 0 10px rgba(0, 188, 212, 0.1);
  }
`;

// --- Fixad select ---
const SelectField = styled.select`
  width: 100%;
  padding: 14px 15px;
  border-radius: 16px;
  border: 2px solid #f1f5f9;
  background: #f8fafc;
  font-family: "Cairo";
  font-size: 1rem;
  color: #003049;
  appearance: none;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.medicalTeal};
    background: white;
    box-shadow: 0 0 10px rgba(0, 188, 212, 0.1);
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

// --- Component ---
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
                  <SelectField
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
                  </SelectField>
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label>
                  <FaTint /> الفصيلة:
                </Label>
                <InputWrapper>
                  <FaTint />
                  <SelectField
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
                  </SelectField>
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
