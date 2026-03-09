import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  padding: 40px;
  background: #f8fafc;
  min-height: 100vh;
  direction: rtl;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  border-bottom: 4px solid ${(props) => props.color};
  text-align: center;
  .value {
    font-size: 2rem;
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
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th {
    padding: 15px;
    text-align: right;
    color: #94a3b8;
    border-bottom: 2px solid #f1f5f9;
  }
  td {
    padding: 15px;
    border-bottom: 1px solid #f1f5f9;
  }
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: bold;
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
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
`;

const Modal = styled.div`
  background: white;
  padding: 40px;
  border-radius: 30px;
  width: 500px;
  animation: ${fadeInUp} 0.3s ease;
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
  }
`;

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    type: "A+",
    date: "",
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
      return alert("Vänligen fyll i alla fält");

    const newEntry = {
      ...formData,
      id: Date.now(),
      status: "waiting",
    };

    const updated = [newEntry, ...appointments];
    saveToStorage(updated);
    setShowModal(false);
    setFormData({ name: "", phone: "", type: "A+", date: "", time: "09:00" });
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
    if (window.confirm("Är du säker på att du vill ta bort detta möte?")) {
      const updated = appointments.filter((a) => a.id !== id);
      saveToStorage(updated);
    }
  };

  return (
    <PageContainer>
      <HeaderSection>
        <div>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>📅 إدارة المواعيد</h1>
          <p style={{ color: "#64748b" }}>
            قم بإدارة مواعيد المتبرعين وتحديث حالتهم
          </p>
        </div>
        <div>
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
                <td>
                  <div style={{ fontWeight: "bold" }}>{appt.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    {appt.phone}
                  </div>
                </td>
                <td>
                  <StatusBadge bg="#f1f5f9" color="#ef4444">
                    {appt.type}
                  </StatusBadge>
                </td>
                <td>
                  {appt.date} |{" "}
                  <span style={{ color: "#3b82f6" }}>{appt.time}</span>
                </td>
                <td>
                  {appt.status === "waiting" ? (
                    <StatusBadge bg="#fef3c7" color="#92400e">
                      ⏳ قيد الانتظar
                    </StatusBadge>
                  ) : (
                    <StatusBadge bg="#dcfce7" color="#166534">
                      ✅ مكتمل
                    </StatusBadge>
                  )}
                </td>
                <td>
                  <ActionButton success onClick={() => toggleStatus(appt.id)}>
                    {appt.status === "waiting" ? "🏆 إكمال" : "🔄 تراجع"}
                  </ActionButton>
                  <ActionButton onClick={() => deleteAppt(appt.id)}>
                    🗑️
                  </ActionButton>
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
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
                <ActionButton primary type="submit" style={{ flex: 1 }}>
                  حفظ الموعد
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
