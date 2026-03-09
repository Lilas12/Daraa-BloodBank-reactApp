import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHospital,
  FaCheckDouble,
  FaFileInvoiceDollar,
  FaHistory,
  FaPlusCircle,
  FaChartLine,
  FaTimes,
  FaPrint,
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

// --- 2. Styled Components (Responsiva) ---
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
    margin-bottom: 40px;
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

  @media (min-width: 768px) {
    padding: 30px;
    border-radius: 24px;
  }
`;

const Section = styled.div`
  background: ${colors.white};
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 25px;
  border: 1px solid ${colors.border};
  @media (min-width: 768px) {
    padding: 30px;
    border-radius: 24px;
    margin-bottom: 40px;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  color: ${colors.secondary};
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  @media (min-width: 768px) {
    font-size: 22px;
  }
`;

const ExternalOrderRow = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
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
    padding: 20px;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin: 0 -15px;
  padding: 0 15px;
  @media (min-width: 768px) {
    margin: 0;
    padding: 0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  min-width: 600px;
  th {
    color: #9ca3af;
    text-align: right;
    padding: 0 15px;
    font-size: 13px;
  }
`;

const TableRow = styled.tr`
  background: #f9fafb;
  td {
    padding: 15px;
    &:first-child {
      border-radius: 0 15px 15px 0;
    }
    &:last-child {
      border-radius: 15px 0 0 15px;
    }
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
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  transition: 0.3s;
  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
`;

// --- NYA FIXADE DEFINITIONER (För ESLint felen) ---
const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 25px;
  border-radius: 25px;
  width: 100%;
  max-width: 550px;
  max-height: 90vh;
  overflow-y: auto;
  @media (min-width: 768px) {
    padding: 35px;
    border-radius: 30px;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: ${colors.secondary};
    font-size: 14px;
  }
  input,
  select {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    border: 1.5px solid ${colors.border};
    font-family: "Cairo";
    outline: none;
    transition: 0.3s;
    &:focus {
      border-color: ${colors.primary};
    }
  }
`;

// --- 3. Hjälpfunktioner ---
const printInvoice = (sale) => {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html dir="rtl"><head><title>فاتورة - ${sale.invoiceNo}</title><style>@import url('https://fonts.googleapis.com/css2?family=Cairo&display=swap'); body { font-family: 'Cairo', sans-serif; padding: 40px; } .header { text-align: center; border-bottom: 3px solid ${colors.primary}; padding-bottom: 20px; } .invoice-box { border: 1px solid #eee; padding: 30px; border-radius: 20px; margin-top: 30px; } .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f9f9f9; } .total { font-size: 28px; font-weight: bold; color: ${colors.primary}; margin-top: 30px; text-align: left; } </style></head>
    <body><div class="header"><h1>بنك الدم الوطني</h1><p>رقم الفاتورة: ${sale.invoiceNo}</p></div><div class="invoice-box"><div class="row"><span>المريض:</span> <span>${sale.patientName}</span></div><div class="row"><span>الجهة:</span> <span>${sale.customerName}</span></div><div class="row"><span>المنتج:</span> <span>${sale.product} (${sale.bloodType})</span></div><div class="total">المبلغ النهائي: ${sale.amount?.toLocaleString()} ل.س</div></div></body></html>
  `);
  printWindow.document.close();
  setTimeout(() => printWindow.print(), 500);
};

// --- 4. Huvudkomponent ---
const BloodSalesPage = ({
  externalSales = [],
  updateOrderStatus,
  clearNotifications,
}) => {
  const [showModal, setShowModal] = useState(false);
  const hospitalsInDaraa = [
    "مراجعة خارجية",
    "مستشفى درعا الوطني",
    "مستشفى الصنمين",
    "مستشفى الشيخ مسكين",
    "مستشفى ازرع",
    "مركز درعا الطبي",
    "مستشفى الأطفال",
    "مستشفى الولادة",
  ];

  const [totalRevenue, setTotalRevenue] = useState(() => {
    const saved = localStorage.getItem("totalRevenue");
    return saved ? parseInt(saved) : 3500000;
  });

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
    {
      id: 2,
      invoiceNo: "INV-8822",
      customerName: "مراجعة خارجية",
      patientName: "محمد علي",
      bloodType: "B-",
      product: "دم كامل",
      amount: 200000,
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

  useEffect(() => {
    if (clearNotifications) clearNotifications();
  }, [clearNotifications]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const unitPrice = formData.product === "دم كامل" ? 200000 : 240000;
    const total = unitPrice * (formData.quantity || 1);
    const newSale = {
      id: Date.now(),
      invoiceNo: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      amount: total,
      status: "تم التسليم",
    };

    setSales([newSale, ...sales]);
    const newRev = totalRevenue + total;
    setTotalRevenue(newRev);
    localStorage.setItem("totalRevenue", newRev);
    setShowModal(false);
  };

  return (
    <PageWrapper>
      <Container>
        {/* Statistik sektion */}
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
                الإيرادات (ل.س)
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "900",
                  color: colors.secondary,
                }}
              >
                {totalRevenue.toLocaleString()}
              </div>
            </div>
            <FaFileInvoiceDollar
              size={35}
              color={colors.success}
              style={{ opacity: 0.2 }}
            />
          </StatCard>
        </StatsGrid>

        {/* Externa Order sektion */}
        <Section>
          <SectionTitle>
            <FaHospital color={colors.primary} /> طلبات المستشفيات الخارجية
          </SectionTitle>
          <AnimatePresence>
            {externalSales.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#9CA3AF",
                  padding: "20px",
                }}
              >
                لا يوجد طلبات نشطة
              </p>
            ) : (
              externalSales.map((order) => (
                <ExternalOrderRow key={order.id} status={order.status}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>
                      {order.timestamp}
                    </div>
                    <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                      المريض: {order.patientName}
                    </div>
                    <div style={{ marginTop: "5px" }}>
                      <Badge>{order.bloodType}</Badge>{" "}
                      <span style={{ fontSize: "14px" }}>
                        {order.productName} × {order.quantity}
                      </span>
                    </div>
                  </div>
                  {order.status === "pending" ? (
                    <ActionButton
                      fullWidth
                      bg={colors.success}
                      onClick={() => updateOrderStatus?.(order.id, "accepted")}
                    >
                      <FaCheckDouble /> قبول وتسليم
                    </ActionButton>
                  ) : (
                    <ActionButton
                      fullWidth
                      bg={colors.secondary}
                      onClick={() => printInvoice(order)}
                    >
                      <FaPrint /> طباعة
                    </ActionButton>
                  )}
                </ExternalOrderRow>
              ))
            )}
          </AnimatePresence>
        </Section>

        {/* Försäljningslogg sektion */}
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
              <FaHistory /> سجل المبيعات
            </SectionTitle>
            <ActionButton onClick={() => setShowModal(true)}>
              <FaPlusCircle /> بيع جديد
            </ActionButton>
          </div>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>المعرف</th>
                  <th>الجهة</th>
                  <th>المريض</th>
                  <th>المنتج</th>
                  <th>القيمة</th>
                  <th>إجراء</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <td style={{ fontWeight: "bold" }}>{sale.invoiceNo}</td>
                    <td>{sale.customerName}</td>
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
                    <td>
                      <FaPrint
                        onClick={() => printInvoice(sale)}
                        style={{ cursor: "pointer", color: colors.secondary }}
                      />
                    </td>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Section>
      </Container>

      {/* Modal för ny försäljning */}
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
                    placeholder="الاسم بالكامل"
                    onChange={(e) =>
                      setFormData({ ...formData, patientName: e.target.value })
                    }
                  />
                </InputGroup>
                <InputGroup>
                  <label>الجهة</label>
                  <select
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                  >
                    {hospitalsInDaraa.map((h, i) => (
                      <option key={i} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
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
                      onChange={(e) =>
                        setFormData({ ...formData, bloodType: e.target.value })
                      }
                    >
                      {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(
                        (t) => (
                          <option key={t}>{t}</option>
                        ),
                      )}
                    </select>
                  </InputGroup>
                  <InputGroup>
                    <label>المنتج</label>
                    <select
                      onChange={(e) =>
                        setFormData({ ...formData, product: e.target.value })
                      }
                    >
                      <option value="دم كامل">دم كامل</option>
                      <option value="بلازما">بلازما</option>
                    </select>
                  </InputGroup>
                </div>
                <ActionButton
                  fullWidth
                  style={{ padding: "15px", marginTop: "10px" }}
                  type="submit"
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
