import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
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

const countUp = keyframes` from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } `;

const PageContainer = styled.div`
  padding: 3rem 2rem;
  max-width: 1300px;
  margin: 0 auto;
  direction: rtl;
  font-family: "Cairo", sans-serif;
  background: #f4f7fa;
  min-height: 100vh;
`;

const TabButton = styled.button`
  padding: 12px 24px;
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
  &:hover {
    background: ${(props) => (props.active ? "#2563eb" : "#e2e8f0")};
  }
`;

const GlassCard = styled(motion.div)`
  background: white;
  padding: 25px;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
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
  gap: 10px;
  font-family: inherit;
`;

const Toast = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  left: 30px;
  background: #10b981;
  color: white;
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("overview"); // overview eller details
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const triggerExport = (format) => {
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.5rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2.2rem", color: "#1e293b", margin: 0 }}>
            مركز التقارير الرقمي
          </h1>
          <p style={{ color: "#64748b" }}>نظام تحليل بيانات بنك الدم المتقدم</p>
        </div>
        <div
          style={{
            display: "flex",
            background: "#e2e8f0",
            padding: "5px",
            borderRadius: "15px",
          }}
        >
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
            <FaListUl /> القائمة التفصيلية
          </TabButton>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              <GlassCard whileHover={{ y: -5 }}>
                <FaUsers size={24} color="#3b82f6" />
                <h2 style={{ margin: "10px 0" }}>1,402</h2>
                <p style={{ margin: 0, color: "#64748b" }}>إجمالي المتبرعين</p>
              </GlassCard>
              <GlassCard whileHover={{ y: -5 }}>
                <FaCalendarCheck size={24} color="#8b5cf6" />
                <h2 style={{ margin: "10px 0" }}>85%</h2>
                <p style={{ margin: 0, color: "#64748b" }}>
                  معدل اكتمال المواعيد
                </p>
              </GlassCard>
              <GlassCard
                whileHover={{ y: -5 }}
                style={{ borderRight: "4px solid #ef4444" }}
              >
                <FaExclamationTriangle size={24} color="#ef4444" />
                <h2 style={{ margin: "10px 0" }}>2</h2>
                <p style={{ margin: 0, color: "#64748b" }}>تنبيهات حرجة</p>
              </GlassCard>
            </div>

            <GlassCard>
              <h3 style={{ marginBottom: "2rem" }}>
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
                      <span style={{ color: item.color, fontWeight: "bold" }}>
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <GlassCard>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "right",
                }}
              >
                <thead>
                  <tr
                    style={{
                      color: "#64748b",
                      borderBottom: "2px solid #f1f5f9",
                    }}
                  >
                    <th style={{ padding: "15px" }}>الفصيلة</th>
                    <th>الكمية المتوفرة</th>
                    <th>آخر تحديث</th>
                    <th>الإجراء المطلوب</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((item, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "15px", fontWeight: "bold" }}>
                        {item.type}
                      </td>
                      <td>{item.amount} كيس</td>
                      <td style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                        منذ ساعتين
                      </td>
                      <td>
                        <button
                          style={{
                            padding: "6px 12px",
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
              </table>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginTop: "2rem", display: "flex", gap: "15px" }}>
        <ExportButton
          variant="dark"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => triggerExport("PDF")}
          disabled={isExporting}
        >
          {isExporting ? (
            "جاري التحميل..."
          ) : (
            <>
              <FaFilePdf /> تصدير PDF كملف رسمي
            </>
          )}
        </ExportButton>

        <ExportButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => triggerExport("Excel")}
          disabled={isExporting}
        >
          <FaFileExcel color="#10b981" /> تصدير بيانات Excel
        </ExportButton>
      </div>

      <AnimatePresence>
        {showToast && (
          <Toast
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
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
              zUnit: 3000,
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
