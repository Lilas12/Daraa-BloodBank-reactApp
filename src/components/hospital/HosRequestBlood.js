import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHospital,
  FaTint,
  FaUser,
  FaCreditCard,
  FaHistory,
  FaCheckCircle,
} from "react-icons/fa";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;

const PageContainer = styled.div`
  padding: 15px;
  max-width: 1400px;
  margin: 0 auto;
  direction: rtl;
  font-family: "Cairo", sans-serif;
  background: #f8fafc;
  min-height: 100vh;

  @media (min-width: 768px) {
    padding: 30px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Mobil: 1 kolumn */
  gap: 20px;

  @media (min-width: 1100px) {
    grid-template-columns: 1fr 1.8fr; /* Dator: 2 kolumner */
    gap: 30px;
  }
`;

const Card = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  border: 1px solid #edf2f7;

  @media (min-width: 768px) {
    padding: 30px;
  }

  h2 {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #1a237e;
    margin-bottom: 25px;
    font-size: 1.3rem;
    font-weight: 800;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    font-weight: 700;
    color: #4a5568;
    margin-bottom: 6px;
    display: block;
    font-size: 0.85rem;
  }

  input,
  select {
    width: 100%;
    padding: 12px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-family: "Cairo";
    font-size: 1rem;
    transition: 0.3s;
    box-sizing: border-box; /* Viktigt för responsivitet */

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }
  }
`;

const PriceTag = styled.div`
  background: #f0f7ff;
  padding: 15px;
  border-radius: 15px;
  border: 2px dashed #3b82f6;
  text-align: center;
  span {
    color: #1e40af;
    font-weight: 900;
    font-size: 1.2rem;
  }
`;

const SubmitButton = styled.button`
  background: #dc143c;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 15px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: 0.3s;
  width: 100%;

  &:hover {
    background: #b01030;
    transform: translateY(-3px);
  }
`;

const StatusBadge = styled.div`
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${(props) =>
    props.status === "accepted" ? "#dcfce7" : "#fef3c7"};
  color: ${(props) => (props.status === "accepted" ? "#166534" : "#92400e")};
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) =>
    props.status === "accepted" ? "#10b981" : "#f59e0b"};
  animation: ${(props) => (props.status === "pending" ? pulse : "none")} 1.5s
    infinite ease-in-out;
`;

const ResponsiveTableContainer = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;

  /* Mobil-anpassning av tabell */
  @media (max-width: 768px) {
    thead {
      display: none; /* Dölj rubriker på mobil */
    }

    tr {
      display: block;
      margin-bottom: 15px;
      border: 1px solid #f1f5f9;
      border-radius: 15px;
      background: white;
      padding: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
    }

    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 5px !important;
      border: none !important;
      text-align: left;
      font-size: 0.9rem;

      &:before {
        content: attr(data-label); /* Visar rubriken via data-label */
        font-weight: bold;
        color: #94a3b8;
        margin-left: 10px;
      }
    }
  }

  /* Dator-stil */
  @media (min-width: 769px) {
    th {
      padding: 15px;
      color: #94a3b8;
      font-weight: 600;
      font-size: 0.9rem;
      text-align: right;
    }
    td {
      padding: 20px;
      border-top: 1px solid #f1f5f9;
      border-bottom: 1px solid #f1f5f9;
    }
    td:first-child {
      border-radius: 0 15px 15px 0;
      border-right: 1px solid #f1f5f9;
    }
    td:last-child {
      border-radius: 15px 0 0 15px;
      border-left: 1px solid #f1f5f9;
    }
  }
`;

// --- Huvudkomponent ---
const HospitalPage = ({ onSendOrder, externalSales = [] }) => {
  const [revenue, setRevenue] = useState(() => {
    const saved = localStorage.getItem("totalRevenue");
    return saved ? parseInt(saved) : 3500000;
  });

  useEffect(() => {
    const syncRevenue = () => {
      const saved = localStorage.getItem("totalRevenue");
      if (saved) setRevenue(parseInt(saved));
    };
    window.addEventListener("storage", syncRevenue);
    return () => window.removeEventListener("storage", syncRevenue);
  }, []);

  const [formData, setFormData] = useState({
    patientName: "",
    bloodType: "A+",
    productType: "whole_blood",
    quantity: 1,
    paymentMethod: "نقدي",
  });

  const unitPrice = formData.productType === "plasma" ? 240000 : 200000;
  const totalPrice = unitPrice * formData.quantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientName) return;

    const newOrder = {
      ...formData,
      id: Date.now(),
      totalPrice: totalPrice,
      productName: formData.productType === "plasma" ? "بلازما" : "دم كامل",
      status: "pending",
      timestamp: new Date().toLocaleTimeString("ar-SA"),
    };

    onSendOrder(newOrder);
    setFormData({
      ...formData,
      patientName: "",
      bloodType: "A+",
      productType: "whole_blood",
      quantity: 1,
      paymentMethod: "نقدي",
    });
  };

  return (
    <PageContainer>
      <div
        style={{ marginBottom: "20px", textAlign: "right", fontSize: "0.9rem" }}
      >
        <span style={{ color: "#94a3b8" }}>إجمالي إيرادات البنك: </span>
        <strong style={{ color: "#dc143c" }}>
          {revenue.toLocaleString()} ل.س
        </strong>
      </div>

      <Grid>
        <Card initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2>
            <FaHospital color="#dc143c" /> طلب جديد
          </h2>
          <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <FaUser /> اسم المريض
              </label>
              <input
                required
                type="text"
                placeholder="الاسم الكامل"
                value={formData.patientName}
                onChange={(e) =>
                  setFormData({ ...formData, patientName: e.target.value })
                }
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <div>
                <label>
                  <FaTint /> الفصيلة
                </label>
                <select
                  value={formData.bloodType}
                  onChange={(e) =>
                    setFormData({ ...formData, bloodType: e.target.value })
                  }
                >
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (t) => (
                      <option key={t}>{t}</option>
                    ),
                  )}
                </select>
              </div>
              <div>
                <label>الكمية</label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <div>
                <label>المنتج</label>
                <select
                  value={formData.productType}
                  onChange={(e) =>
                    setFormData({ ...formData, productType: e.target.value })
                  }
                >
                  <option value="whole_blood">دم كامل</option>
                  <option value="plasma">بلازما</option>
                  <option value="platelets">صفائح</option>
                </select>
              </div>
              <div>
                <label>
                  <FaCreditCard /> الدفع
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                >
                  <option value="نقدي">نقدي</option>
                  <option value="تحويل">تحويل</option>
                </select>
              </div>
            </div>

            <PriceTag>
              <span>{totalPrice.toLocaleString()} ل.س</span>
            </PriceTag>

            <SubmitButton type="submit">
              <FaCheckCircle /> إرسال الطلب
            </SubmitButton>
          </Form>
        </Card>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>
            <FaHistory color="#3b82f6" /> متابعة الطلبات
          </h2>
          <ResponsiveTableContainer>
            <Table>
              <thead>
                <tr>
                  <th>المريض</th>
                  <th>الطلب</th>
                  <th>المبلغ</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {externalSales.map((order) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td data-label="المريض" style={{ fontWeight: "bold" }}>
                        {order.patientName}
                      </td>
                      <td data-label="الطلب">
                        {order.productName} ({order.bloodType}) ×{" "}
                        {order.quantity}
                      </td>
                      <td
                        data-label="المبلغ"
                        style={{ fontWeight: "800", color: "#1e40af" }}
                      >
                        {order.totalPrice?.toLocaleString()}
                      </td>
                      <td data-label="الحالة">
                        <StatusBadge status={order.status}>
                          <Indicator status={order.status} />
                          {order.status === "accepted"
                            ? "تم الاستلام"
                            : "انتظار"}
                        </StatusBadge>
                        <span
                          style={{
                            fontSize: "10px",
                            color: "#94a3b8",
                            display: "block",
                            marginTop: "4px",
                          }}
                        >
                          {order.timestamp}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {externalSales.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "#94a3b8",
                      }}
                    >
                      لا يوجد طلبات حالياً
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </ResponsiveTableContainer>
        </Card>
      </Grid>
    </PageContainer>
  );
};

export default HospitalPage;
