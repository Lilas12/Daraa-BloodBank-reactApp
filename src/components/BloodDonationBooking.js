import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHospital,
  FaMapMarkerAlt,
  FaExclamationCircle,
  FaArrowRight,
  FaHeart,
  FaTint,
} from "react-icons/fa";

// --- الأنميشن ---
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// --- المكونات المصممة ---
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-family: "Segoe UI", Tahoma, sans-serif;
  direction: rtl;
  overflow-x: hidden;
`;

// مكون جديد للأيقونة المتحركة لإصلاح تحذير float
const FloatingHeart = styled.div`
  animation: ${float} 3s ease-in-out infinite;
  display: inline-block;
  color: #c53030;
`;

const MainContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  width: 100%;
  max-width: 1100px;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const FormSide = styled.div`
  padding: 30px;
  @media (min-width: 768px) {
    padding: 50px;
  }
`;

const MapSide = styled.div`
  background: #fbfcfd;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f1f5f9;
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 10px;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 8px;
    font-weight: 700;
    color: #475569;
    font-size: 0.9rem;
  }
  input,
  select {
    width: 100%;
    padding: 14px;
    border: 2px solid #f1f5f9;
    border-radius: 12px;
    font-size: 1rem;
    box-sizing: border-box;
    &:focus {
      border-color: #c53030;
      outline: none;
    }
  }
`;

const QuestionItem = styled.div`
  background: #f8fafc;
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  span {
    font-size: 0.9rem;
    flex: 1;
  }
`;

const ToggleBtn = styled.button`
  padding: 8px 15px;
  border-radius: 10px;
  border: none;
  background: ${(props) =>
    props.active ? (props.yes ? "#c53030" : "#475569") : "#e2e8f0"};
  color: ${(props) => (props.active ? "white" : "#64748b")};
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
`;

const HospitalCard = styled.div`
  padding: 15px;
  margin: 10px 20px;
  background: ${(props) => (props.selected ? "#c53030" : "white")};
  color: ${(props) => (props.selected ? "white" : "#1e293b")};
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e8f0;
`;

const SubmitBtn = styled(motion.button)`
  width: 100%;
  padding: 18px;
  background: #c53030;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  margin-top: 25px;
  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
`;

const BloodDonationBooking = () => {
  const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null });
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    day: "1",
    month: "آذار (3)",
  });
  const [selectedHosp, setSelectedHosp] = useState(1);
  const [success, setSuccess] = useState(false);

  const hospitals = [
    {
      id: 1,
      name: "مشفى درعا الوطني",
      loc: "المحطة",
      lat: "32.6250",
      lng: "36.1050",
    },
    {
      id: 2,
      name: "مشفى طفس المركزي",
      loc: "ريف درعا",
      lat: "32.7441",
      lng: "36.0461",
    },
    {
      id: 3,
      name: "مشفى بصرى الشام",
      loc: "بصرى الشام",
      lat: "32.5197",
      lng: "36.4817",
    },
  ];

  const currentHospital = hospitals.find((h) => h.id === selectedHosp);
  const isEligible =
    answers.q1 === "yes" && answers.q2 === "no" && answers.q3 === "no";

  const resetForm = () => {
    setAnswers({ q1: null, q2: null, q3: null });
    setUserData({ name: "", phone: "", day: "1", month: "آذار (3)" });
    setSuccess(false);
  };

  if (success) {
    return (
      <PageWrapper>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          style={{
            textAlign: "center",
            background: "white",
            padding: "40px",
            borderRadius: "30px",
            maxWidth: "450px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          {/* تم استخدام float هنا لإزالة التحذير */}
          <FloatingHeart>
            <FaHeart size={60} />
          </FloatingHeart>
          <h2 style={{ marginTop: "15px" }}>تم الحجز!</h2>
          <p>المكان: {currentHospital.name}</p>
          <p>
            التاريخ: {userData.day} {userData.month} 2026
          </p>
          <SubmitBtn onClick={resetForm} style={{ background: "#1e293b" }}>
            حجز جديد
          </SubmitBtn>
        </motion.div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <MainContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <FormSide>
          <h2
            style={{
              marginBottom: "25px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FaTint color="#c53030" /> تبرع بالدم - درعا 2026
          </h2>

          <div style={{ marginBottom: "30px" }}>
            <h4 style={{ marginBottom: "15px", color: "#64748b" }}>
              الفحص الطبي:
            </h4>
            <QuestionItem>
              <span>العمر 18-65 والوزن فوق 50 كغ؟</span>
              <div>
                <ToggleBtn
                  active={answers.q1 === "yes"}
                  yes
                  onClick={() => setAnswers({ ...answers, q1: "yes" })}
                >
                  نعم
                </ToggleBtn>
                <ToggleBtn
                  active={answers.q1 === "no"}
                  onClick={() => setAnswers({ ...answers, q1: "no" })}
                >
                  لا
                </ToggleBtn>
              </div>
            </QuestionItem>
            <QuestionItem>
              <span>تعاني من أمراض مزمنة؟</span>
              <div>
                <ToggleBtn
                  active={answers.q2 === "yes"}
                  yes
                  onClick={() => setAnswers({ ...answers, q2: "yes" })}
                >
                  نعم
                </ToggleBtn>
                <ToggleBtn
                  active={answers.q2 === "no"}
                  onClick={() => setAnswers({ ...answers, q2: "no" })}
                >
                  لا
                </ToggleBtn>
              </div>
            </QuestionItem>
            <QuestionItem>
              <span>عملية جراحية خلال 6 أشهر؟</span>
              <div>
                <ToggleBtn
                  active={answers.q3 === "yes"}
                  yes
                  onClick={() => setAnswers({ ...answers, q3: "yes" })}
                >
                  نعم
                </ToggleBtn>
                <ToggleBtn
                  active={answers.q3 === "no"}
                  onClick={() => setAnswers({ ...answers, q3: "no" })}
                >
                  لا
                </ToggleBtn>
              </div>
            </QuestionItem>
          </div>

          <AnimatePresence>
            {isEligible && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 style={{ marginBottom: "10px", color: "#64748b" }}>
                  بيانات المتبرع:
                </h4>
                <InputGrid>
                  <InputField>
                    <label>الاسم الكامل</label>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                      placeholder="الاسم الثلاثي"
                    />
                  </InputField>
                  <InputField>
                    <label>رقم الجوال</label>
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                      placeholder="09xxxxxxxx"
                    />
                  </InputField>
                  <InputField>
                    <label>اليوم</label>
                    <select
                      value={userData.day}
                      onChange={(e) =>
                        setUserData({ ...userData, day: e.target.value })
                      }
                    >
                      {[...Array(31)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </InputField>
                  <InputField>
                    <label>الشهر</label>
                    <select
                      value={userData.month}
                      onChange={(e) =>
                        setUserData({ ...userData, month: e.target.value })
                      }
                    >
                      {[
                        "كانون الثاني",
                        "شباط",
                        "آذار",
                        "نيسان",
                        "أيار",
                        "حزيران",
                        "تموز",
                        "آب",
                        "أيلول",
                        "تشرين الأول",
                        "تشرين الثاني",
                        "كانون الأول",
                      ].map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </InputField>
                </InputGrid>
                <SubmitBtn
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSuccess(true)}
                >
                  تأكيد الموعد في {currentHospital.name} <FaArrowRight />
                </SubmitBtn>
              </motion.div>
            )}
          </AnimatePresence>

          {!isEligible && answers.q1 !== null && (
            <div
              style={{
                color: "#e53e3e",
                padding: "15px",
                background: "#fff5f5",
                borderRadius: "12px",
              }}
            >
              <FaExclamationCircle /> الشروط الطبية غير مستوفاة.
            </div>
          )}
        </FormSide>

        <MapSide>
          <div style={{ height: "300px" }}>
            <iframe
              title="map"
              src={`https://maps.google.com/maps?q=${currentHospital.lat},${currentHospital.lng}&z=14&output=embed`}
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
          <div style={{ padding: "20px" }}>
            <h4 style={{ marginBottom: "10px" }}>
              <FaMapMarkerAlt /> اختر المركز
            </h4>
            {hospitals.map((h) => (
              <HospitalCard
                key={h.id}
                selected={selectedHosp === h.id}
                onClick={() => setSelectedHosp(h.id)}
              >
                <div>
                  <div style={{ fontWeight: "bold" }}>{h.name}</div>
                  <div style={{ fontSize: "0.8rem" }}>{h.loc}</div>
                </div>
                <FaHospital />
              </HospitalCard>
            ))}
          </div>
        </MapSide>
      </MainContainer>
    </PageWrapper>
  );
};

export default BloodDonationBooking;
