import React, { useState, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  FaTint,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaTrash,
  FaHospital,
  FaCheckCircle,
  FaPrint,
  FaFileInvoice,
  FaArrowRight,
  FaReceipt,
} from "react-icons/fa";

// --- Globala Inställningar ---
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #f0f2f5;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    overflow-x: hidden;
  }
  @media print {
    body * { visibility: hidden; }
    #printable-invoice, #printable-invoice * { visibility: visible; }
    #printable-invoice { position: absolute; left: 0; top: 0; width: 100%; display: block !important; }
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  direction: rtl;
`;

// --- Layout Komponenter ---
const GlassHeader = styled.header`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px 40px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 25px;
  max-width: 1300px;
  margin: 0 auto;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.02);
  border: 1px solid #edf2f7;
`;

const BloodItem = styled(Card)`
  text-align: center;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(239, 68, 68, 0.1);
  }
`;

const PriceCircle = styled.div`
  background: #fff5f5;
  color: #e53e3e;
  width: fit-content;
  padding: 8px 20px;
  border-radius: 50px;
  margin: 15px auto;
  font-weight: 800;
  font-size: 1.1rem;
`;

const ActionButton = styled(motion.button)`
  width: 100%;
  padding: 15px;
  border-radius: 15px;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: ${(props) =>
    props.$primary
      ? "linear-gradient(135deg, #e53e3e 0%, #b91c1c 100%)"
      : "#f7fafc"};
  color: ${(props) => (props.$primary ? "white" : "#4a5568")};
  box-shadow: ${(props) =>
    props.$primary ? "0 4px 12px rgba(229, 62, 62, 0.3)" : "none"};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 16px;
  margin-bottom: 15px;
  border-radius: 12px;
  border: 2px solid #edf2f7;
  background: #f8fafc;
  box-sizing: border-box;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #e53e3e;
    background: white;
  }
`;

// --- Huvudkomponent ---
const BloodShopPage = () => {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState("shop");
  const [formData, setFormData] = useState({
    hospital: "",
    doctor: "",
    notes: "",
  });

  const popAudio = useRef(
    new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
    ),
  );
  const cashAudio = useRef(
    new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3",
    ),
  );

  const playSound = (ref) => {
    ref.current.currentTime = 0;
    ref.current.play().catch(() => {});
  };

  const bloodTypes = [
    { id: 1, type: "O+", price: 15000 },
    { id: 2, type: "A+", price: 12000 },
    { id: 3, type: "B+", price: 18000 },
    { id: 4, type: "AB-", price: 45000 },
    { id: 5, type: "O-", price: 35000 },
    { id: 6, type: "A-", price: 22000 },
  ];

  const addToCart = (item) => {
    playSound(popAudio);
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      return exists
        ? prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const handleFinish = () => {
    if (!formData.hospital || !formData.doctor)
      return alert("الرجاء إدخال البيانات المطلوبة");
    playSound(cashAudio);
    confetti({
      particleCount: 150,
      spread: 80,
      colors: ["#e53e3e", "#ffffff"],
    });
    setStep("success");
  };

  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <AppContainer>
      <GlobalStyle />

      <GlassHeader className="no-print">
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div
            style={{
              background: "#e53e3e",
              padding: "10px",
              borderRadius: "12px",
            }}
          >
            <FaHospital color="white" size={24} />
          </div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 900 }}>
            نظام حوران <span style={{ color: "#e53e3e" }}>الرقمي</span>
          </h1>
        </div>
        <div style={{ fontWeight: 600, color: "#718096" }}>
          بنك الدم المركزي
        </div>
      </GlassHeader>

      <AnimatePresence mode="wait">
        {step === "shop" && (
          <motion.div
            key="shop"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <MainGrid>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "20px",
                }}
              >
                {bloodTypes.map((blood) => (
                  <BloodItem key={blood.id}>
                    <FaTint size={40} color="#e53e3e" />
                    <h2 style={{ margin: "10px 0" }}>فصيلة {blood.type}</h2>
                    <PriceCircle>
                      {blood.price.toLocaleString()} ل.س
                    </PriceCircle>
                    <ActionButton
                      $primary
                      onClick={() => addToCart(blood)}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaPlus /> إضافة للطلب
                    </ActionButton>
                  </BloodItem>
                ))}
              </div>

              <Card style={{ height: "fit-content" }}>
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: 0,
                  }}
                >
                  <FaShoppingCart color="#e53e3e" /> سلة التوريد
                </h3>
                {cart.length === 0 ? (
                  <p style={{ color: "#a0aec0", textAlign: "center" }}>
                    السلة فارغة حالياً
                  </p>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "15px 0",
                          borderBottom: "1px solid #f7fafc",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700 }}>{item.type}</div>
                          <div style={{ fontSize: "12px", color: "#e53e3e" }}>
                            {item.qty} وحدة
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <span style={{ fontWeight: 800 }}>
                            {(item.price * item.qty).toLocaleString()}
                          </span>
                          <FaTrash
                            color="#cbd5e1"
                            cursor="pointer"
                            onClick={() => removeFromCart(item.id)}
                          />
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: "30px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "1.4rem",
                          fontWeight: 900,
                          marginBottom: "20px",
                        }}
                      >
                        <span>الإجمالي:</span>
                        <span style={{ color: "#e53e3e" }}>
                          {total.toLocaleString()}
                        </span>
                      </div>
                      <ActionButton $primary onClick={() => setStep("form")}>
                        متابعة الطلب <FaArrowRight />
                      </ActionButton>
                    </div>
                  </>
                )}
              </Card>
            </MainGrid>
          </motion.div>
        )}

        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card style={{ maxWidth: "500px", margin: "40px auto" }}>
              <h2 style={{ textAlign: "center" }}>
                <FaFileInvoice color="#e53e3e" /> تأكيد المعلومات
              </h2>
              <label>المشفى المستلم</label>
              <StyledInput
                placeholder="اسم المشفى الحكومي أو الخاص"
                onChange={(e) =>
                  setFormData({ ...formData, hospital: e.target.value })
                }
              />
              <label>الطبيب المسؤول</label>
              <StyledInput
                placeholder="اسم الطبيب الكامل"
                onChange={(e) =>
                  setFormData({ ...formData, doctor: e.target.value })
                }
              />
              <label>ملاحظات إضافية</label>
              <StyledInput
                as="textarea"
                rows="3"
                placeholder="ملاحظات حول النقل أو التخزين"
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <ActionButton $primary onClick={handleFinish}>
                  إرسال الطلب <FaReceipt />
                </ActionButton>
                <ActionButton onClick={() => setStep("shop")}>
                  رجوع
                </ActionButton>
              </div>
            </Card>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              className="no-print"
              style={{ textAlign: "center", padding: "50px" }}
            >
              <FaCheckCircle size={80} color="#48bb78" />
              <h1 style={{ fontSize: "2.5rem", marginTop: "20px" }}>
                تم بنجاح!
              </h1>
              <p>تم تسجيل طلبية الدم وتوليد الفاتورة الرسمية.</p>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <ActionButton
                  $primary
                  onClick={() => window.print()}
                  style={{ width: "220px" }}
                >
                  <FaPrint /> طباعة الفاتورة
                </ActionButton>
                <ActionButton
                  onClick={() => {
                    setCart([]);
                    setStep("shop");
                  }}
                  style={{ width: "220px" }}
                >
                  طلب جديد
                </ActionButton>
              </div>
            </div>

            {/* FAKTURA FÖR UTSKRIFT */}
            <div
              id="printable-invoice"
              style={{
                display: "none",
                background: "white",
                padding: "50px",
                border: "2px solid #e53e3e",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "4px solid #e53e3e",
                  paddingBottom: "20px",
                  marginBottom: "30px",
                }}
              >
                <div>
                  <h1 style={{ color: "#e53e3e", margin: 0 }}>
                    فاتورة توريد دم
                  </h1>
                  <p>بنك الدم المركزي - درعا</p>
                </div>
                <div style={{ textAlign: "left" }}>
                  <p>
                    <strong>الرقم:</strong> #
                    {Math.floor(Math.random() * 100000)}
                  </p>
                  <p>
                    <strong>التاريخ:</strong>{" "}
                    {new Date().toLocaleDateString("ar-SY")}
                  </p>
                </div>
              </div>
              <div
                style={{
                  marginBottom: "30px",
                  background: "#f7fafc",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <p>
                  <strong>جهة الاستلام:</strong> {formData.hospital}
                </p>
                <p>
                  <strong>الطبيب المستلم:</strong> {formData.doctor}
                </p>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ background: "#e53e3e", color: "white" }}>
                  <tr>
                    <th
                      style={{ padding: "15px", border: "1px solid #e53e3e" }}
                    >
                      الوصف
                    </th>
                    <th
                      style={{ padding: "15px", border: "1px solid #e53e3e" }}
                    >
                      الكمية
                    </th>
                    <th
                      style={{ padding: "15px", border: "1px solid #e53e3e" }}
                    >
                      السعر
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((i) => (
                    <tr key={i.id}>
                      <td
                        style={{ padding: "12px", border: "1px solid #edf2f7" }}
                      >
                        وحدة دم ({i.type})
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          border: "1px solid #edf2f7",
                          textAlign: "center",
                        }}
                      >
                        {i.qty}
                      </td>
                      <td
                        style={{ padding: "12px", border: "1px solid #edf2f7" }}
                      >
                        {(i.price * i.qty).toLocaleString()} ل.س
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td
                      colSpan="2"
                      style={{
                        padding: "20px",
                        textAlign: "left",
                        fontWeight: 900,
                      }}
                    >
                      الإجمالي النهائي:
                    </td>
                    <td
                      style={{
                        padding: "20px",
                        color: "#e53e3e",
                        fontWeight: 900,
                      }}
                    >
                      {total.toLocaleString()} ل.س
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppContainer>
  );
};

export default BloodShopPage;
