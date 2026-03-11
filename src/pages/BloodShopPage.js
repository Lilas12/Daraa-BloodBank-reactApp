import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHospital,
  FaCheckDouble,
  FaFileInvoiceDollar,
  FaHistory,
  FaPlusCircle,
  FaChartLine,
  FaPrint,
  FaTimes,
} from "react-icons/fa";

// --- 1. Färger & Animationer ---
const colors = {
  primary: "#DC143C",
  secondary: "#1E293B",
  success: "#10B981",
  warning: "#F59E0B",
  bg: "#F8FAFC",
  white: "#FFFFFF",
  border: "#E5E7EB",
};

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0px rgba(220, 20, 60, 0.2); }
  70% { box-shadow: 0 0 0 10px rgba(220, 20, 60, 0); }
  100% { box-shadow: 0 0 0 0px rgba(220, 20, 60, 0); }
`;

// --- 2. Styled Components ---
const PageWrapper = styled.div`
  background-color: ${colors.bg};
  min-height: 100vh;
  direction: rtl;
  font-family: "Cairo", sans-serif;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 15px;
  @media (min-width: 768px) {
    padding: 40px 20px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-bottom: 25px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
`;

const StatCard = styled.div`
  background: ${(props) =>
    props.gradient
      ? `linear-gradient(135deg, ${colors.primary}, #8B0000)`
      : colors.white};
  padding: 20px;
  border-radius: 20px;
  color: ${(props) => (props.gradient ? "white" : colors.secondary)};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-right: ${(props) =>
    props.border ? `8px solid ${colors.success}` : "none"};
`;

const Section = styled.div`
  background: ${colors.white};
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 25px;
  border: 1px solid ${colors.border};
`;

const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  color: ${colors.secondary};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 25px;
  width: 100%;
  max-width: 500px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 14px;
  }
  input,
  select {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid ${colors.border};
    font-family: "Cairo";
  }
`;

const ExternalOrderRow = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  border-radius: 18px;
  background: ${(props) =>
    props.status === "accepted" ? "#F0FDF4" : "#FFF5F5"};
  border: 1px solid
    ${(props) => (props.status === "accepted" ? "#D1FAE5" : "#FEE2E2")};
  margin-bottom: 15px;
  animation: ${(props) => (props.status === "pending" ? pulseGlow : "none")} 2s
    infinite;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Badge = styled.span`
  background: ${(props) => props.bg || "#FFE4E6"};
  color: ${(props) => props.color || colors.primary};
  padding: 4px 10px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 12px;
`;

const ActionButton = styled.button`
  background: ${(props) => props.bg || colors.primary};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: 0.3s;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
`;

// --- 3. Hjälpfunktioner ---
const printInvoice = (sale) => {
  const finalPrice = sale.amount || sale.totalPrice || 0;
  const productName = sale.product || sale.productName || "منتج دم";
  const customer = sale.customerName || "طلب مستشفى خارجي";

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html dir="rtl"><head><title>فاتورة - ${sale.invoiceNo || "Order"}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cairo&display=swap');
      body { font-family: 'Cairo', sans-serif; padding: 40px; color: #333; }
      .header { text-align: center; border-bottom: 3px solid #DC143C; padding-bottom: 20px; }
      .invoice-box { border: 1px solid #eee; padding: 30px; border-radius: 20px; margin-top: 30px; }
      .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f9f9f9; }
      .total { font-size: 28px; font-weight: bold; color: #DC143C; margin-top: 30px; text-align: left; }
    </style></head>
    <body>
      <div class="header"><h1>بنك الدم الوطني</h1><p>رقم الفاتورة: ${sale.invoiceNo || "INV-EXT"}</p></div>
      <div class="invoice-box">
        <div class="row"><span>المريض:</span> <span>${sale.patientName}</span></div>
        <div class="row"><span>الجهة:</span> <span>${customer}</span></div>
        <div class="row"><span>المنتج:</span> <span>${productName} (${sale.bloodType})</span></div>
        <div class="row"><span>الكمية:</span> <span>${sale.quantity || 1}</span></div>
        <div class="total">المبلغ النهائي: ${finalPrice.toLocaleString()} ل.س</div>
      </div>
    </body></html>
  `);
  printWindow.document.close();
  setTimeout(() => printWindow.print(), 500);
};

// --- 4. Huvudkomponent ---
const BloodSalesPage = ({ externalSales = [], updateOrderStatus }) => {
  const [showModal, setShowModal] = useState(false); // Fixat: showModal definierad korrekt

  const [localRevenue, setLocalRevenue] = useState(() => {
    const saved = localStorage.getItem("totalRevenue");
    return saved ? parseInt(saved) : 3500000;
  });

  const totalCalculatedRevenue =
    localRevenue +
    externalSales
      .filter((o) => o.status === "accepted")
      .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const [sales, setSales] = useState([
    {
      id: 1,
      invoiceNo: "INV-8821",
      customerName: "مستشفى درعا الوطني",
      patientName: "سارة أحمد",
      bloodType: "A+",
      product: "بلازما",
      amount: 240000,
      status: "تم التسليم",
    },
  ]);

  const [formData, setFormData] = useState({
    customerName: "مراجعة خارجية",
    patientName: "",
    bloodType: "O+",
    product: "دم كامل",
    quantity: 1,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const unitPrice = formData.product === "دم كامل" ? 200000 : 240000;
    const total = unitPrice * (formData.quantity || 1);
    const newSale = {
      id: Date.now(),
      invoiceNo: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      amount: total,
    };

    setSales([newSale, ...sales]);
    setLocalRevenue((prev) => prev + total);
    setShowModal(false);
  };

  return (
    <PageWrapper>
      <Container>
        <StatsGrid>
          <StatCard gradient>
            <div>
              <div style={{ opacity: 0.8, fontSize: "12px" }}>
                إجمالي العمليات
              </div>
              <div style={{ fontSize: "28px", fontWeight: "900" }}>
                {sales.length + externalSales.length}
              </div>
            </div>
            <FaChartLine size={35} style={{ opacity: 0.3 }} />
          </StatCard>
          <StatCard border>
            <div>
              <div style={{ color: "#6B7280", fontSize: "12px" }}>
                الإيرادات الإجمالية (ل.س)
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "900",
                  color: colors.secondary,
                }}
              >
                {totalCalculatedRevenue.toLocaleString()}
              </div>
            </div>
            <FaFileInvoiceDollar
              size={35}
              color={colors.success}
              style={{ opacity: 0.2 }}
            />
          </StatCard>
        </StatsGrid>

        {/* --- EXTERNA ORDER-SEKTION --- */}
        <Section>
          <SectionTitle>
            <FaHospital color={colors.primary} /> طلبات المستشفيات الخارجية
          </SectionTitle>
          <AnimatePresence>
            {externalSales.length === 0 ? (
              <p style={{ textAlign: "center", color: "#9CA3AF" }}>
                لا يوجد طلبات نشطة حالياً
              </p>
            ) : (
              externalSales.map((order) => (
                <ExternalOrderRow key={order.id} status={order.status}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>
                      {order.timestamp}
                    </div>
                    <div style={{ fontWeight: "bold", fontSize: "17px" }}>
                      المريض: {order.patientName}
                    </div>
                    <div style={{ marginTop: "5px" }}>
                      <Badge>{order.bloodType}</Badge>
                      <span style={{ marginRight: "10px" }}>
                        {order.productName} × {order.quantity}
                      </span>
                    </div>
                  </div>
                  {order.status === "pending" ? (
                    <ActionButton
                      bg={colors.success}
                      onClick={() => updateOrderStatus?.(order.id, "accepted")}
                    >
                      <FaCheckDouble /> قبول وتسليم
                    </ActionButton>
                  ) : (
                    <ActionButton
                      bg={colors.secondary}
                      onClick={() => printInvoice(order)}
                    >
                      <FaPrint /> طباعة الفاتورة
                    </ActionButton>
                  )}
                </ExternalOrderRow>
              ))
            )}
          </AnimatePresence>
        </Section>

        {/* --- LOKAL FÖRSÄLJNINGSLOGG --- */}
        <Section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <SectionTitle style={{ marginBottom: 0 }}>
              <FaHistory /> سجل المبيعات المباشرة
            </SectionTitle>
            <ActionButton onClick={() => setShowModal(true)}>
              <FaPlusCircle /> بيع مباشر
            </ActionButton>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: "0 10px",
              }}
            >
              <thead>
                <tr
                  style={{
                    color: "#9CA3AF",
                    textAlign: "right",
                    fontSize: "13px",
                  }}
                >
                  <th>المعرف</th>
                  <th>المريض</th>
                  <th>المنتج</th>
                  <th>القيمة</th>
                  <th>إجراء</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} style={{ background: "#f9fafb" }}>
                    <td
                      style={{
                        padding: "15px",
                        borderRadius: "0 15px 15px 0",
                        fontWeight: "bold",
                      }}
                    >
                      {sale.invoiceNo}
                    </td>
                    <td>{sale.patientName}</td>
                    <td>
                      <Badge bg="#F1F5F9" color="#475569">
                        {sale.bloodType}
                      </Badge>{" "}
                      {sale.product}
                    </td>
                    <td style={{ fontWeight: "bold", color: colors.primary }}>
                      {sale.amount.toLocaleString()}
                    </td>
                    <td style={{ borderRadius: "15px 0 0 15px" }}>
                      <FaPrint
                        onClick={() => printInvoice(sale)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </Container>

      {/* --- MODAL FÖR NY FÖRSÄLJNING --- */}
      <AnimatePresence>
        {showModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent initial={{ scale: 0.9 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "25px",
                }}
              >
                <SectionTitle style={{ marginBottom: 0 }}>
                  تسجيل بيع مباشر
                </SectionTitle>
                <FaTimes
                  onClick={() => setShowModal(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <form onSubmit={handleFormSubmit}>
                <InputGroup>
                  <label>اسم المريض</label>
                  <input
                    required
                    placeholder="الاسم الكامل"
                    value={formData.patientName}
                    onChange={(e) =>
                      setFormData({ ...formData, patientName: e.target.value })
                    }
                  />
                </InputGroup>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  <InputGroup>
                    <label>الفصيلة</label>
                    <select
                      value={formData.bloodType}
                      onChange={(e) =>
                        setFormData({ ...formData, bloodType: e.target.value })
                      }
                    >
                      {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(
                        (t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ),
                      )}
                    </select>
                  </InputGroup>
                  <InputGroup>
                    <label>المنتج</label>
                    <select
                      value={formData.product}
                      onChange={(e) =>
                        setFormData({ ...formData, product: e.target.value })
                      }
                    >
                      <option value="دم كامل">دم كامل</option>
                      <option value="بلازما">بلازما</option>
                      <option value="صفايح">صفايح</option>
                    </select>
                  </InputGroup>
                </div>
                <ActionButton
                  fullWidth
                  type="submit"
                  style={{ marginTop: "10px" }}
                >
                  إتمام العملية
                </ActionButton>
              </form>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default BloodSalesPage;
