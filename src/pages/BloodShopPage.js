import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
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
  FaNotesMedical,
} from "react-icons/fa";

const floatBG = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(3%, 5%) scale(1.05); }
  100% { transform: translate(-2%, -3%) scale(1); }
`;

// --- Styled Components ---
const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  position: relative;
  overflow: hidden;
  color: #1e293b;
  padding: 40px 20px;
  direction: rtl;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    filter: blur(100px);
    z-index: 0;
    opacity: 0.3;
    animation: ${floatBG} 15s infinite alternate ease-in-out;
  }
  &::before {
    background: #e0f2fe;
    top: -150px;
    left: -150px;
  }
  &::after {
    background: #fee2e2;
    bottom: -150px;
    right: -150px;
  }
`;

const ContentLayer = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1250px;
  margin: 0 auto;
`;

const SuccessOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SuccessModal = styled(motion.div)`
  background: white;
  padding: 50px;
  border-radius: 40px;
  text-align: center;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
  max-width: 450px;
  width: 90%;
`;

const BloodCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 28px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  &:hover {
    border-color: #ef4444;
    background: white;
  }
`;

const CartSidebar = styled(motion.div)`
  background: white;
  border-radius: 32px;
  padding: 30px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
  border: 1px solid #f1f5f9;
  height: fit-content;
  position: sticky;
  top: 30px;
`;

const ActionButton = styled(motion.button)`
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: none;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: ${(props) => (props.$primary ? "#ef4444" : "#f1f5f9")};
  color: ${(props) => (props.$primary ? "white" : "#1e293b")};
`;

const QtyBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background: #f1f5f9;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #e2e8f0;
  }
`;

// --- Komponent ---
const BloodShopPage = () => {
  const [cart, setCart] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const popAudio = useRef(
    new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3"),
  );
  const successAudio = useRef(
    new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"),
  );

  const addToCart = (item) => {
    popAudio.current.currentTime = 0;
    popAudio.current.play().catch(() => {});
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists)
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const decreaseQty = (id) => {
    popAudio.current.currentTime = 0;
    popAudio.current.play().catch(() => {});
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item && item.qty > 1)
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i));
      return prev.filter((i) => i.id !== id);
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCheckout = () => {
    successAudio.current.play();
    setShowSuccess(true);
    confetti({
      particleCount: 250,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ef4444", "#ffffff", "#22c55e"],
    });
  };

  const bloodTypes = [
    { id: 1, type: "O+", price: 15000 },
    { id: 2, type: "A+", price: 12000 },
    { id: 3, type: "B+", price: 18000 },
    { id: 4, type: "AB-", price: 45000 },
    { id: 5, type: "O-", price: 35000 },
    { id: 6, type: "A-", price: 22000 },
  ];

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <PageWrapper>
      <AnimatePresence>
        {showSuccess && (
          <SuccessOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SuccessModal
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FaCheckCircle size={80} color="#22c55e" />
              </motion.div>
              <h2 style={{ fontSize: "2.2rem", marginTop: "20px" }}>
                تم تأكيد الطلب!
              </h2>
              <p
                style={{
                  color: "#64748b",
                  margin: "15px 0 30px",
                  fontSize: "1.1rem",
                }}
              >
                شكراً لثقتكم. تم إرسال طلبكم إلى بنك الدم المركزي في درعا بنجاح.
              </p>
              <ActionButton
                $primary
                onClick={() => {
                  setShowSuccess(false);
                  setCart([]);
                }}
              >
                إغلاق والعودة للمتجر
              </ActionButton>
            </SuccessModal>
          </SuccessOverlay>
        )}
      </AnimatePresence>

      <ContentLayer>
        <header style={{ textAlign: "right", marginBottom: "50px" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "900",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            نظام <span style={{ color: "#ef4444" }}>حوران</span> الرقمي{" "}
            <FaHospital color="#ef4444" />
          </h1>
          <p
            style={{
              color: "#64748b",
              fontSize: "1.2rem",
              paddingRight: "15px",
              borderRight: "5px solid #ef4444",
            }}
          >
            لإدارة التزويد الدموي | بنك الدم المركزي بدرعا
          </p>
        </header>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px" }}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}
          >
            {/* Grid med blodtyper */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "20px",
              }}
            >
              {bloodTypes.map((blood) => (
                <BloodCard key={blood.id} whileHover={{ y: -10 }}>
                  <FaTint
                    size={50}
                    color="#ef4444"
                    style={{ marginBottom: "15px" }}
                  />
                  <h2 style={{ fontSize: "2rem" }}>{blood.type}</h2>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "900",
                      color: "#ef4444",
                      margin: "15px 0",
                    }}
                  >
                    {blood.price.toLocaleString()} ليرة
                  </div>
                  <ActionButton
                    $primary
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(blood)}
                  >
                    <FaPlus /> إضافة للطلب
                  </ActionButton>
                </BloodCard>
              ))}
            </div>
          </div>

          {/* Varukorg Sidebar */}
          <CartSidebar
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3
              style={{
                fontSize: "1.6rem",
                marginBottom: "25px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <FaShoppingCart color="#ef4444" /> قائمة الطلبيات
            </h3>

            <AnimatePresence mode="popLayout">
              {cart.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "#94a3b8",
                    padding: "40px 0",
                  }}
                >
                  <FaNotesMedical
                    size={40}
                    style={{ opacity: 0.2, marginBottom: "10px" }}
                  />
                  <p>السلة فارغة حالياً</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "15px 0",
                      borderBottom: "1px solid #f1f5f9",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "800" }}>{item.type}</div>
                      <div style={{ color: "#ef4444", fontSize: "0.9rem" }}>
                        {(item.price * item.qty).toLocaleString()} ليرة
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          background: "#f8fafc",
                          padding: "5px",
                          borderRadius: "10px",
                        }}
                      >
                        <QtyBtn onClick={() => decreaseQty(item.id)}>
                          <FaMinus size={10} />
                        </QtyBtn>
                        <span style={{ minWidth: "20px", textAlign: "center" }}>
                          {item.qty}
                        </span>
                        <QtyBtn onClick={() => addToCart(item)}>
                          <FaPlus size={10} />
                        </QtyBtn>
                      </div>
                      <FaTrash
                        color="#cbd5e1"
                        style={{ cursor: "pointer" }}
                        onClick={() => removeItem(item.id)}
                      />
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {cart.length > 0 && (
              <div style={{ marginTop: "25px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.4rem",
                    fontWeight: "900",
                    marginBottom: "20px",
                  }}
                >
                  <span>الإجمالي:</span>
                  <span>{total.toLocaleString()} ليرة</span>
                </div>
                <ActionButton
                  $primary
                  whileHover={{ scale: 1.02 }}
                  onClick={handleCheckout}
                >
                  <FaCheckCircle /> تأكيد وإرسال الطلب
                </ActionButton>
              </div>
            )}
          </CartSidebar>
        </div>
      </ContentLayer>
    </PageWrapper>
  );
};

export default BloodShopPage;
