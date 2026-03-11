import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  padding: 15px;
  background: #f8fafc;
  min-height: 100vh;
  direction: rtl;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-bottom: 30px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 40px;
  }
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  border-bottom: 4px solid ${(props) => props.color};
  text-align: center;
  .value {
    font-size: 1.8rem;
    font-weight: bold;
    color: #1e293b;
  }
  .label {
    color: #64748b;
    margin-top: 5px;
  }
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 25px;
  padding: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);

  @media (min-width: 768px) {
    padding: 20px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    @media (max-width: 767px) {
      display: none;
    }
  }

  tr {
    @media (max-width: 767px) {
      display: block;
      border: 1px solid #f1f5f9;
      border-radius: 15px;
      margin-bottom: 15px;
      padding: 10px;
    }
  }

  th {
    padding: 15px;
    text-align: right;
    color: #94a3b8;
    border-bottom: 2px solid #f1f5f9;
  }

  td {
    padding: 15px;
    border-bottom: 1px solid #f1f5f9;

    @media (max-width: 767px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: none;
      padding: 8px 5px;
      text-align: right;

      &:before {
        content: attr(data-label);
        font-weight: bold;
        color: #94a3b8;
      }
    }
  }
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: bold;
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  white-space: nowrap;
`;

const ActionButton = styled.button`
  padding: 10px 18px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
  background: ${(props) =>
    props.primary ? "#3b82f6" : props.success ? "#10b981" : "#f1f5f9"};
  color: ${(props) => (props.primary || props.success ? "white" : "#1e293b")};
  margin-left: 5px;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 0.85rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  padding: 20px;
`;

const Modal = styled.div`
  background: white;
  padding: 25px;
  border-radius: 30px;
  width: 100%;
  max-width: 500px;
  animation: ${fadeInUp} 0.3s ease;

  @media (min-width: 768px) {
    padding: 40px;
  }

  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  input,
  select {
    width: 100%;
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    box-sizing: border-box;
  }
`;

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Dagens datum som förvalt värde
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    type: "A+",
    date: today,
    time: "09:00",
  });

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("blood_bank_appointments") || "[]",
    );
    setAppointments(data);
  }, []);

  const saveToStorage = (newData) => {
    setAppointments(newData);
    localStorage.setItem("blood_bank_appointments", JSON.stringify(newData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date)
      return alert("يرجى ملء جميع الحقول المطلوبة");

    const newEntry = {
      ...formData,
      id: Date.now(),
      status: "waiting",
    };

    const updated = [newEntry, ...appointments];
    saveToStorage(updated);
    setShowModal(false);
    setFormData({
      name: "",
      phone: "",
      type: "A+",
      date: today,
      time: "09:00",
    });
  };

  const toggleStatus = (id) => {
    const updated = appointments.map((appt) => {
      if (appt.id === id) {
        return {
          ...appt,
          status: appt.status === "waiting" ? "completed" : "waiting",
        };
      }
      return appt;
    });
    saveToStorage(updated);
  };

  const deleteAppt = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الموعد؟")) {
      const updated = appointments.filter((a) => a.id !== id);
      saveToStorage(updated);
    }
  };

  return (
    <PageContainer>
      <HeaderSection>
        <div>
          <h1 style={{ fontSize: "1.8rem", margin: 0 }}>📅 إدارة المواعيد</h1>
          <p style={{ color: "#64748b" }}>
            قم بإدارة مواعيد المتبرعين وتحديث حالتهم
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <ActionButton onClick={() => navigate("/")}>الرئيسية</ActionButton>
          <ActionButton primary onClick={() => setShowModal(true)}>
            ➕ موعد جديد
          </ActionButton>
        </div>
      </HeaderSection>

      <StatsGrid>
        <StatCard color="#3b82f6">
          <div className="value">{appointments.length}</div>
          <div className="label">إجمالي المواعيد</div>
        </StatCard>
        <StatCard color="#f59e0b">
          <div className="value">
            {appointments.filter((a) => a.status === "waiting").length}
          </div>
          <div className="label">قيد الانتظار</div>
        </StatCard>
        <StatCard color="#10b981">
          <div className="value">
            {appointments.filter((a) => a.status === "completed").length}
          </div>
          <div className="label">اكتملت</div>
        </StatCard>
      </StatsGrid>

      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>المتبرع</th>
              <th>الفصيلة</th>
              <th>التاريخ والوقت</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  لا توجد مواعيد حالياً
                </td>
              </tr>
            )}
            {appointments.map((appt) => (
              <tr
                key={appt.id}
                style={{ opacity: appt.status === "completed" ? 0.6 : 1 }}
              >
                <td data-label="المتبرع">
                  <div style={{ fontWeight: "bold" }}>{appt.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    {appt.phone}
                  </div>
                </td>
                <td data-label="الفصيلة">
                  <StatusBadge bg="#f1f5f9" color="#ef4444">
                    {appt.type}
                  </StatusBadge>
                </td>
                <td data-label="التاريخ">
                  {appt.date} |{" "}
                  <span style={{ color: "#3b82f6" }}>{appt.time}</span>
                </td>
                <td data-label="الحالة">
                  {appt.status === "waiting" ? (
                    <StatusBadge bg="#fef3c7" color="#92400e">
                      ⏳ قيد الانتظار
                    </StatusBadge>
                  ) : (
                    <StatusBadge bg="#dcfce7" color="#166534">
                      ✅ مكتمل
                    </StatusBadge>
                  )}
                </td>
                <td data-label="الإجراءات">
                  <div style={{ display: "flex" }}>
                    <ActionButton success onClick={() => toggleStatus(appt.id)}>
                      {appt.status === "waiting" ? "إكمال" : "تراجع"}
                    </ActionButton>
                    <ActionButton onClick={() => deleteAppt(appt.id)}>
                      🗑️
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>

      {showModal && (
        <ModalOverlay>
          <Modal>
            <h2>➕ حجز موعد جديد</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>اسم المتبرع</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="الاسم الكامل"
                />
              </div>
              <div className="form-group">
                <label>رقم الهاتف</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="09xxxxxxxx"
                />
              </div>
              <div className="form-group">
                <label>فصيلة الدم</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                    (t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <div className="form-group">
                <label>التاريخ</label>
                <input
                  type="date"
                  required
                  min="1900-01-01" // Kalender från 1900
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
                <ActionButton primary type="submit" style={{ flex: 1 }}>
                  حفظ
                </ActionButton>
                <ActionButton
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ flex: 1 }}
                >
                  إلغاء
                </ActionButton>
              </div>
            </form>
          </Modal>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default AppointmentsPage;
