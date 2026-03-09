import React, { useState, useEffect } from "react"; // Lagt till useEffect
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHospital,
  FaTint,
  FaUser,
  FaCreditCard,
  FaFileInvoiceDollar,
  FaHistory,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;

const PageContainer = styled.div`
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
  direction: rtl;
  font-family: "Cairo", sans-serif;
  background: #f8fafc;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: 30px;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  border: 1px solid #edf2f7;

  h2 {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #1a237e;
    margin-bottom: 25px;
    font-size: 1.5rem;
    font-weight: 800;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  label {
    font-weight: 700;
    color: #4a5568;
    margin-bottom: 8px;
    display: block;
    font-size: 0.9rem;
  }
  input,
  select {
    width: 100%;
    padding: 14px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-family: "Cairo";
    transition: 0.3s;
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }
  }
`;

const PriceTag = styled.div`
  background: #f0f7ff;
  padding: 20px;
  border-radius: 15px;
  border: 2px dashed #3b82f6;
  text-align: center;
  span {
    color: #1e40af;
    font-weight: 900;
    font-size: 1.4rem;
  }
`;

const SubmitButton = styled.button`
  background: #dc143c;
  color: white;
  border: none;
  padding: 18px;
  border-radius: 15px;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: 0.3s;
  &:hover {
    background: #b01030;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(220, 20, 60, 0.2);
  }
`;

const StatusBadge = styled.div`
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${(props) =>
    props.status === "accepted" ? "#dcfce7" : "#fef3c7"};
  color: ${(props) => (props.status === "accepted" ? "#166534" : "#92400e")};
`;

const Indicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) =>
    props.status === "accepted" ? "#10b981" : "#f59e0b"};
  box-shadow: ${(props) =>
    props.status === "accepted" ? "0 0 12px #10b981" : "none"};
  animation: ${(props) => (props.status === "pending" ? pulse : "none")} 1.5s
    infinite ease-in-out;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  th {
    padding: 15px;
    color: #94a3b8;
    font-weight: 600;
    font-size: 0.9rem;
  }
  tr {
    background: white;
    transition: 0.2s;
  }
  td {
    padding: 20px;
    border-top: 1px solid #f1f5f9;
    border-bottom: 1px solid #f1f5f9;
  }
  td:first-child {
    border-right: 1px solid #f1f5f9;
    border-radius: 0 15px 15px 0;
  }
  td:last-child {
    border-left: 1px solid #f1f5f9;
    border-radius: 15px 0 0 15px;
  }
`;

// --- Huvudkomponent ---
const HospitalPage = ({ onSendOrder, externalSales = [] }) => {
  // SYNKNING: Hämta kassan från LocalStorage
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
    setFormData({ ...formData, patientName: "" });
  };

  return (
    <PageContainer>
      <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <small style={{ color: "#94a3b8" }}>
          إجمالي إيرادات البنك (مزامنة):{" "}
        </small>
        <strong style={{ color: "#dc143c" }}>
          {revenue.toLocaleString()} ل.س
        </strong>
      </div>

      <Grid>
        <Card
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>
            <FaHospital color="#dc143c" /> طلب استجرار جديد
          </h2>
          <Form onSubmit={handleSubmit}>
            <div>
              <label>
                <FaUser /> اسم المريض الثلاثي
              </label>
              <input
                required
                type="text"
                placeholder="أدخل اسم المريض الكامل"
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
                gap: "15px",
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
                <label>الكمية (وحدة)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label>نوع المنتج</label>
              <select
                value={formData.productType}
                onChange={(e) =>
                  setFormData({ ...formData, productType: e.target.value })
                }
              >
                <option value="whole_blood">دم كامل</option>
                <option value="plasma">بلازما</option>
                <option value="platelets">صفائح دموية</option>
              </select>
            </div>

            <div>
              <label>
                <FaCreditCard /> طريقة الدفع
              </label>
              <select
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
              >
                <option value="نقدي">دفع نقدي (عند الاستلام)</option>
                <option value="تحويل">تحويل بنكي</option>
              </select>
            </div>

            <PriceTag>
              <FaFileInvoiceDollar style={{ marginLeft: "10px" }} />
              التكلفة الإجمالية: <span>{totalPrice.toLocaleString()} ل.س</span>
            </PriceTag>

            <SubmitButton type="submit">
              <FaCheckCircle /> إرسال الطلب للبنك
            </SubmitButton>
          </Form>
        </Card>

        <Card
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>
            <FaHistory color="#3b82f6" /> متابعة الطلبات المباشرة
          </h2>
          <div style={{ overflowX: "auto" }}>
            <Table>
              <thead>
                <tr>
                  <th>المريض</th>
                  <th>الطلب</th>
                  <th>المبلغ</th>
                  <th>حالة الطلب</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {externalSales.map((order) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        background:
                          order.status === "accepted" ? "#f0fdf4" : "white",
                      }}
                    >
                      <td style={{ fontWeight: "bold" }}>
                        {order.patientName}
                      </td>
                      <td>
                        <div style={{ fontSize: "0.9rem" }}>
                          {order.productName || "دم كامل"}
                        </div>
                        <div style={{ color: "#dc143c", fontWeight: "bold" }}>
                          {order.bloodType} × {order.quantity}
                        </div>
                      </td>
                      <td style={{ fontWeight: "800", color: "#1e40af" }}>
                        {order.totalPrice?.toLocaleString()}
                      </td>
                      <td>
                        <StatusBadge status={order.status}>
                          <Indicator status={order.status} />
                          {order.status === "accepted"
                            ? "تم الاستلام ✅"
                            : "قيد الانتظار"}
                        </StatusBadge>
                        <div
                          style={{
                            fontSize: "10px",
                            color: "#94a3b8",
                            marginTop: "5px",
                          }}
                        >
                          {order.timestamp}
                        </div>
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
                        padding: "60px",
                        color: "#94a3b8",
                      }}
                    >
                      <FaClock
                        size={30}
                        style={{
                          display: "block",
                          margin: "0 auto 10px",
                          opacity: 0.3,
                        }}
                      />
                      لا يوجد طلبات نشطة حالياً
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </Grid>
    </PageContainer>
  );
};

export default HospitalPage;
