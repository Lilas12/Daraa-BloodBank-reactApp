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

const PageWrapper = styled.div`
  background-color: ${colors.bg};
  min-height: 100vh;
  direction: rtl;
  font-family: "Cairo", sans-serif;
`;
const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
`;
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;
const StatCard = styled.div`
  background: ${(props) =>
    props.gradient
      ? `linear-gradient(135deg, ${colors.primary}, #8B0000)`
      : colors.white};
  padding: 30px;
  border-radius: 24px;
  color: ${(props) => (props.gradient ? "white" : colors.secondary)};
  box-shadow: ${(props) =>
    props.gradient
      ? "0 15px 30px rgba(220, 20, 60, 0.2)"
      : "0 10px 20px rgba(0,0,0,0.05)"};
  border-right: ${(props) =>
    props.border ? `8px solid ${colors.success}` : "none"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Section = styled.div`
  background: ${colors.white};
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
  border: 1px solid ${colors.border};
`;
const SectionTitle = styled.h3`
  margin: 0 0 25px 0;
  color: ${(props) => props.color || colors.secondary};
  font-size: 22px;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const ExternalOrderRow = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 18px;
  border: 1px solid
    ${(props) => (props.status === "accepted" ? "#D1FAE5" : "#FEE2E2")};
  background: ${(props) =>
    props.status === "accepted" ? "#F0FDF4" : "#FFF5F5"};
  margin-bottom: 15px;
  animation: ${(props) => (props.status === "pending" ? pulseGlow : "none")} 2s
    infinite;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
  th {
    color: #9ca3af;
    text-align: right;
    padding: 0 20px;
    font-size: 14px;
  }
`;
const TableRow = styled.tr`
  background: #f9fafb;
  transition: 0.3s;
  &:hover {
    background: #f3f4f6;
  }
  td {
    padding: 20px;
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
  padding: 5px 12px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 13px;
  margin-left: 8px;
`;
const ActionButton = styled.button`
  background: ${(props) => props.bg || colors.primary};
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
`;
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;
const ModalContent = styled(motion.div)`
  background: white;
  padding: 35px;
  border-radius: 30px;
  width: 550px;
  max-width: 95%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;
const InputGroup = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: ${colors.secondary};
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

const printInvoice = (sale) => {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html dir="rtl"><head><title>فاتورة - ${sale.invoiceNo}</title><style>@import url('https://fonts.googleapis.com/css2?family=Cairo&display=swap'); body { font-family: 'Cairo', sans-serif; padding: 40px; } .header { text-align: center; border-bottom: 3px solid ${colors.primary}; padding-bottom: 20px; } .invoice-box { border: 1px solid #eee; padding: 30px; border-radius: 20px; margin-top: 30px; } .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f9f9f9; } .total { font-size: 28px; font-weight: bold; color: ${colors.primary}; margin-top: 30px; text-align: left; } </style></head>
    <body><div class="header"><h1>بنك الدم الوطني</h1><p>رقم الفاتورة: ${sale.invoiceNo}</p></div><div class="invoice-box"><div class="row"><span>المريض:</span> <span>${sale.patientName}</span></div><div class="row"><span>الجهة:</span> <span>${sale.customerName}</span></div><div class="row"><span>المنتج:</span> <span>${sale.product} (${sale.bloodType})</span></div><div class="total">المبلغ النهائي: ${sale.amount.toLocaleString()} ل.س</div></div><div style="margin-top:50px; text-align:center; color:#999; font-size:12px;">تعتبر هذه الفاتورة سند قبض رسمي</div></body></html>
  `);
  printWindow.document.close();
  setTimeout(() => printWindow.print(), 500);
};

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

  const updateGlobalRevenue = (newAmount) => {
    const updatedTotal = totalRevenue + newAmount;
    setTotalRevenue(updatedTotal);
    localStorage.setItem("totalRevenue", updatedTotal);
  };

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
    updateGlobalRevenue(total);
    setShowModal(false);
  };

  const handleAcceptOrder = (order) => {
    if (updateOrderStatus) {
      updateOrderStatus(order.id, "accepted");
      updateGlobalRevenue(order.totalPrice || 0);
    }
  };

  return (
    <PageWrapper>
      <Container>
        <StatsGrid>
          <StatCard gradient>
            <div>
              <div style={{ opacity: 0.8, fontSize: "14px" }}>
                إجمالي عمليات اليوم
              </div>
              <div style={{ fontSize: "32px", fontWeight: "900" }}>
                {sales.length + externalSales.length}
              </div>
            </div>
            <FaChartLine size={40} style={{ opacity: 0.3 }} />
          </StatCard>
          <StatCard border>
            <div>
              <div style={{ color: "#6B7280", fontSize: "14px" }}>
                إجمالي الإيرادات المزامنة (ل.س)
              </div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "900",
                  color: colors.secondary,
                }}
              >
                {totalRevenue.toLocaleString()}
              </div>
            </div>
            <FaFileInvoiceDollar
              size={40}
              color={colors.success}
              style={{ opacity: 0.2 }}
            />
          </StatCard>
        </StatsGrid>

        <Section>
          <SectionTitle color={colors.primary}>
            <FaHospital /> طلبات المستشفيات الخارجية (درعا)
          </SectionTitle>
          <AnimatePresence>
            {externalSales.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#9CA3AF",
                }}
              >
                لا يوجد طلبات خارجية نشطة
              </div>
            ) : (
              externalSales.map((order) => (
                <ExternalOrderRow key={order.id} status={order.status}>
                  <div>
                    <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
                      {order.timestamp}
                    </div>
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                      المريض: {order.patientName}
                    </div>
                    <div style={{ marginTop: "5px" }}>
                      <Badge>{order.bloodType}</Badge>
                      <span>
                        {order.productName} × {order.quantity}
                      </span>
                    </div>
                  </div>
                  {order.status === "pending" ? (
                    <ActionButton
                      bg={colors.success}
                      onClick={() => handleAcceptOrder(order)}
                    >
                      <FaCheckDouble /> قبول وتسليم
                    </ActionButton>
                  ) : (
                    <ActionButton
                      bg={colors.secondary}
                      onClick={() =>
                        printInvoice({
                          invoiceNo: order.id,
                          patientName: order.patientName,
                          customerName: "مستشفى خارجي",
                          product: order.productName,
                          bloodType: order.bloodType,
                          amount: order.totalPrice,
                        })
                      }
                    >
                      <FaPrint /> طباعة الفاتورة
                    </ActionButton>
                  )}
                </ExternalOrderRow>
              ))
            )}
          </AnimatePresence>
        </Section>

        <Section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <SectionTitle>
              <FaHistory /> سجل المبيعات المباشرة
            </SectionTitle>
            <ActionButton onClick={() => setShowModal(true)}>
              <FaPlusCircle /> بيع مباشر جديد
            </ActionButton>
          </div>
          <div style={{ overflowX: "auto" }}>
            <Table>
              <thead>
                <tr>
                  <th>المعرف</th>
                  <th>الجهة</th>
                  <th>المريض</th>
                  <th>المنتج</th>
                  <th>القيمة</th>
                  <th>إجراءات</th>
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
                      </Badge>
                      {sale.product}
                    </td>
                    <td style={{ fontWeight: "bold", color: colors.primary }}>
                      {sale.amount.toLocaleString()} ل.س
                    </td>
                    <td>
                      <FaPrint
                        onClick={() => printInvoice(sale)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div>
        </Section>
      </Container>

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
                  <FaPlusCircle color={colors.primary} /> تسجيل بيع جديد
                </SectionTitle>
                <FaTimes
                  onClick={() => setShowModal(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <form onSubmit={handleFormSubmit}>
                <InputGroup>
                  <label>اسم المريض الكامل</label>
                  <input
                    required
                    placeholder="أدخل اسم المريض"
                    onChange={(e) =>
                      setFormData({ ...formData, patientName: e.target.value })
                    }
                  />
                </InputGroup>

                <InputGroup>
                  <label>جهة الاستلام (درعا)</label>
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
                    gap: "15px",
                  }}
                >
                  <InputGroup>
                    <label>فصيلة الدم</label>
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
                    <label>نوع المنتج</label>
                    <select
                      onChange={(e) =>
                        setFormData({ ...formData, product: e.target.value })
                      }
                    >
                      <option value="دم كامل">دم كامل (200,000 ل.س)</option>
                      <option value="بلازما">بلازما (240,000 ل.س)</option>
                    </select>
                  </InputGroup>
                </div>

                <ActionButton
                  style={{ width: "100%", padding: "15px", marginTop: "10px" }}
                  type="submit"
                >
                  حفظ العملية وإصدار فاتورة
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
