import React, { useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFilePdf,
  FaFileExcel,
  FaExclamationTriangle,
  FaChartPie,
  FaUsers,
  FaCalendarCheck,
  FaDownload,
  FaCheckCircle,
  FaListUl,
} from "react-icons/fa";

const countUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; background: #f4f7fa; }
`;

const PageContainer = styled.div`
  padding: 1rem;
  max-width: 1300px;
  margin: 0 auto;
  direction: rtl;
  font-family: "Cairo", sans-serif;
  min-height: 100vh;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const HeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TitleGroup = styled.div`
  h1 {
    font-size: clamp(1.5rem, 5vw, 2.2rem);
    color: #1e293b;
    margin: 0;
  }
  p {
    color: #64748b;
    margin: 5px 0 0;
  }
`;

const TabContainer = styled.div`
  display: flex;
  background: #e2e8f0;
  padding: 5px;
  border-radius: 15px;
  align-self: flex-start; /* Förhindrar att den sträcker ut sig på mobilen */
`;

const TabButton = styled.button`
  padding: 10px 18px;
  border-radius: 12px;
  border: none;
  background: ${(props) => (props.active ? "#3b82f6" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#64748b")};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;

  &:hover {
    background: ${(props) => (props.active ? "#2563eb" : "#cbd5e1")};
  }

  @media (min-width: 768px) {
    padding: 12px 24px;
    font-size: 1rem;
  }
`;

const GlassCard = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
  margin-bottom: 20px;

  @media (min-width: 768px) {
    padding: 25px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 30px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatValue = styled.h2`
  margin: 10px 0;
  font-size: 2rem;
  animation: ${countUp} 0.6s ease-out forwards;
`;

const TableWrapper = styled.div`
  overflow-x: auto; /* Gör tabellen skrollbar på mobilen */
  width: 100%;
  -webkit-overflow-scrolling: touch;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: right;
  min-width: 600px; /* Tvingar fram scroll om skärmen är för liten */

  th {
    padding: 15px;
    color: #64748b;
    border-bottom: 2px solid #f1f5f9;
  }

  td {
    padding: 15px;
    border-bottom: 1px solid #f1f5f9;
  }
`;

const ActionButtonGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const ExportButton = styled(motion.button)`
  background: ${(props) => (props.variant === "dark" ? "#1e293b" : "white")};
  color: ${(props) => (props.variant === "dark" ? "white" : "#1e293b")};
  border: 1px solid #e2e8f0;
  padding: 14px 28px;
  border-radius: 14px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: inherit;
  width: 100%;

  @media (min-width: 640px) {
    width: auto;
  }
`;

const Toast = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px; /* Centrerad på mobil */
  background: #10b981;
  color: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (min-width: 768px) {
    width: auto;
    right: auto;
    bottom: 30px;
    left: 30px;
    padding: 15px 25px;
  }
`;

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const triggerExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 2000);
  };

  const inventoryData = [
    { type: "A+", amount: 45, status: "ممتاز", color: "#10b981", percent: 90 },
    { type: "O-", amount: 8, status: "حرج", color: "#ef4444", percent: 15 },
    { type: "AB+", amount: 12, status: "متوسط", color: "#f59e0b", percent: 35 },
    { type: "B+", amount: 30, status: "جيد", color: "#3b82f6", percent: 65 },
  ];

  return (
    <PageContainer>
      <GlobalStyle />
      <HeaderArea>
        <TitleGroup>
          <h1>مركز التقارير الرقمي</h1>
          <p>نظام تحليل بيانات بنك الدم المتقدم</p>
        </TitleGroup>

        <TabContainer>
          <TabButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          >
            <FaChartPie /> نظرة عامة
          </TabButton>
          <TabButton
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
          >
            <FaListUl /> التفاصيل
          </TabButton>
        </TabContainer>
      </HeaderArea>

      <AnimatePresence mode="wait">
        {activeTab === "overview" ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <StatsGrid>
              <GlassCard whileHover={{ y: -5 }}>
                <FaUsers size={24} color="#3b82f6" />
                <StatValue>1,402</StatValue>
                <p style={{ margin: 0, color: "#64748b" }}>إجمالي المتبرعين</p>
              </GlassCard>
              <GlassCard whileHover={{ y: -5 }}>
                <FaCalendarCheck size={24} color="#8b5cf6" />
                <StatValue>85%</StatValue>
                <p style={{ margin: 0, color: "#64748b" }}>
                  معدل اكتمال المواعيد
                </p>
              </GlassCard>
              <GlassCard
                whileHover={{ y: -5 }}
                style={{ borderRight: "4px solid #ef4444" }}
              >
                <FaExclamationTriangle size={24} color="#ef4444" />
                <StatValue>2</StatValue>
                <p style={{ margin: 0, color: "#64748b" }}>تنبيهات حرجة</p>
              </GlassCard>
            </StatsGrid>

            <GlassCard>
              <h3 style={{ marginBottom: "1.5rem" }}>
                توزيع المخزون الاستراتيجي
              </h3>
              <div style={{ display: "grid", gap: "25px" }}>
                {inventoryData.map((item, i) => (
                  <div key={i}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        فصيلة {item.type}
                      </span>
                      <span
                        style={{
                          color: item.color,
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.status} ({item.amount} وحدة)
                      </span>
                    </div>
                    <div
                      style={{
                        height: "10px",
                        background: "#f1f5f9",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percent}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        style={{ height: "100%", background: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <GlassCard>
              <TableWrapper>
                <StyledTable>
                  <thead>
                    <tr>
                      <th>الفصيلة</th>
                      <th>الكمية المتوفرة</th>
                      <th>آخر تحديث</th>
                      <th>الإجراء المطلوب</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData.map((item, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: "bold" }}>{item.type}</td>
                        <td>{item.amount} كيس</td>
                        <td style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                          منذ ساعتين
                        </td>
                        <td>
                          <button
                            style={{
                              padding: "8px 16px",
                              borderRadius: "8px",
                              border: "none",
                              background:
                                item.amount < 15 ? "#fee2e2" : "#f1f5f9",
                              color: item.amount < 15 ? "#ef4444" : "#475569",
                              cursor: "pointer",
                              fontSize: "0.8rem",
                              fontWeight: "bold",
                            }}
                          >
                            {item.amount < 15 ? "طلب تعزيز" : "معاينة"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </StyledTable>
              </TableWrapper>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <ActionButtonGroup>
        <ExportButton
          variant="dark"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={triggerExport}
          disabled={isExporting}
        >
          {isExporting ? (
            "جاري التحميل..."
          ) : (
            <>
              <FaFilePdf /> تصدير PDF رسمي
            </>
          )}
        </ExportButton>
        <ExportButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={triggerExport}
          disabled={isExporting}
        >
          <FaFileExcel color="#10b981" /> تصدير Excel
        </ExportButton>
      </ActionButtonGroup>

      <AnimatePresence>
        {showToast && (
          <Toast
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <FaCheckCircle /> تم تصدير التقرير بنجاح!
          </Toast>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExporting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3000,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <FaDownload size={40} color="#3b82f6" />
              </motion.div>
              <h3 style={{ marginTop: "15px", color: "#1e293b" }}>
                جاري تحضير الملف...
              </h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default ReportsPage;
