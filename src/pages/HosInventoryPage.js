import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  increment,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [user, setUser] = useState(null);

  const [newStock, setNewStock] = useState({
    bloodType: "A+",
    quantity: 0,
    donorName: "",
  });

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const unsubInv = listenToInventory();
        const unsubTrans = listenToTransactions();

        return () => {
          unsubInv();
          unsubTrans();
        };
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const listenToInventory = () => {
    return onSnapshot(
      collection(db, "inventory"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInventory(data);
        setLoading(false);
      },
      (error) => console.error("Inventory error:", error),
    );
  };

  const listenToTransactions = () => {
    const q = query(
      collection(db, "transactions"),
      orderBy("fullDate", "desc"),
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(data);
      },
      (error) => {
        console.error("Sorteringsfel (oftast saknat index):", error);
      },
    );
  };

  const totalUnits = inventory.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );

  const getGlobalStatus = (total) => {
    if (total < 165)
      return { label: "حرج جداً", color: "#EF4444", class: "pulse-red" };
    if (total <= 330)
      return { label: "احتياطي منخفض", color: "#F59E0B", class: "" };
    return { label: "مخزون آمن", color: "#10B981", class: "" };
  };

  const globalStatus = getGlobalStatus(totalUnits);

  const handleDeduct = async (id, bloodType, currentQty) => {
    if (currentQty <= 0) return alert("المخزون فارغ!");
    if (!user) return;

    try {
      const bloodRef = doc(db, "inventory", id);
      await updateDoc(bloodRef, {
        quantity: increment(-1),
        lastUpdated: new Date().toISOString().split("T")[0],
      });

      await addDoc(collection(db, "transactions"), {
        type: "استهلاك وحدة",
        bloodType: bloodType,
        quantity: 1,
        donorName: "مريض مشفى",
        performedBy: user.email,
        date: new Date().toLocaleTimeString("ar-SY"),
        fullDate: serverTimestamp(),
        color: "#EF4444",
      });
    } catch (e) {
      console.error("Fel vid uttag:", e);
    }
  };

  const handleAddStock = async () => {
    const bloodItem = inventory.find(
      (item) => item.bloodType === newStock.bloodType,
    );
    if (!bloodItem || newStock.quantity <= 0) return;

    try {
      const bloodRef = doc(db, "inventory", bloodItem.id);
      await updateDoc(bloodRef, {
        quantity: increment(newStock.quantity),
        lastUpdated: new Date().toISOString().split("T")[0],
      });

      await addDoc(collection(db, "transactions"), {
        type: "إضافة مخزون",
        bloodType: newStock.bloodType,
        quantity: newStock.quantity,
        donorName: newStock.donorName,
        performedBy: user.email,
        date: new Date().toLocaleTimeString("ar-SY"),
        fullDate: serverTimestamp(),
        color: "#10B981",
      });

      setShowAddModal(false);
      setNewStock({ bloodType: "A+", quantity: 0, donorName: "" });
    } catch (e) {
      alert("Error adding stock");
    }
  };

  if (loading) return <div className="loading-screen">جاري التحميل...</div>;
  if (!user) return <div className="loading-screen">الرجاء تسجيل الدخول</div>;

  return (
    <div className="inventory-page animated-page">
      <style>{`
        .inventory-page { padding: 15px; font-family: 'Segoe UI', Tahoma; direction: rtl; background: #f8fafc; min-height: 100vh; }
        .inventory-container { max-width: 1200px; margin: 0 auto; }

        /* Header - Responsiv */
        .inventory-header {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 25px;
          background: white;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        @media (min-width: 768px) {
          .inventory-header { flex-direction: row; justify-content: space-between; align-items: center; padding: 25px; border-radius: 20px; }
        }

        .inventory-header h1 { font-size: 1.5rem; margin: 0; }
        @media (min-width: 768px) { .inventory-header h1 { font-size: 2rem; } }

        .stat-card { background: white; padding: 20px; border-radius: 15px; text-align: center; margin-bottom: 20px; }
        @media (min-width: 768px) { .stat-card { padding: 25px; border-radius: 20px; } }

        .pulse-red { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }

        /* Tabell som blir kort på mobil */
        .inventory-table { width: 100%; border-collapse: separate; border-spacing: 0 8px; }
        .inventory-table thead { display: none; } /* Göm headern på mobil */

        @media (min-width: 768px) {
          .inventory-table { border-spacing: 0 10px; }
          .inventory-table thead { display: table-header-group; }
        }

        .inventory-table tr { display: flex; flex-direction: column; background: white; border-radius: 12px; padding: 15px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        @media (min-width: 768px) {
          .inventory-table tr { display: table-row; background: transparent; box-shadow: none; }
        }

        .inventory-table td {
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f1f5f9;
        }
        .inventory-table td:last-child { border-bottom: none; }

        @media (min-width: 768px) {
          .inventory-table td { display: table-cell; background: white; padding: 20px; border-radius: 0; border-bottom: none; }
          .inventory-table td:first-child { border-radius: 10px 0 0 10px; }
          .inventory-table td:last-child { border-radius: 0 10px 10px 0; }
        }

        /* Etiketter för mobil-vy i tabellen */
        .inventory-table td::before { content: attr(data-label); font-weight: bold; color: #64748b; }
        @media (min-width: 768px) { .inventory-table td::before { display: none; } }

        .blood-badge { width: 45px; height: 45px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.9rem; }
        @media (min-width: 768px) { .blood-badge { width: 50px; height: 50px; border-radius: 15px; font-size: 1rem; } }

        .btn { padding: 10px 20px; border-radius: 10px; border: none; cursor: pointer; font-weight: bold; transition: 0.2s; font-size: 0.9rem; width: 100%; }
        @media (min-width: 768px) { .btn { padding: 12px 25px; width: auto; font-size: 1rem; } }

        .btn-primary { background: #E11D48; color: white; }
        .btn-primary:hover { background: #BE123C; }

        /* Logg-sektionen */
        .transactions-card { margin-top: 30px; background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        @media (min-width: 768px) { .transactions-card { margin-top: 40px; padding: 30px; border-radius: 20px; } }

        .transaction-item { padding: 15px 0; border-bottom: 1px solid #f1f5f9; display: flex; flex-direction: column; gap: 8px; }
        @media (min-width: 480px) { .transaction-item { flex-direction: row; justify-content: space-between; align-items: center; } }

        /* Modal - Responsiv */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .modal { background: white; padding: 25px; border-radius: 20px; width: 100%; max-width: 450px; position: relative; }
        .modal input, .modal select { width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 10px; border: 1px solid #e2e8f0; font-family: inherit; }
      `}</style>

      <div className="inventory-container">
        <header className="inventory-header">
          <div>
            <h1>إدارة مخزون الدم</h1>
            <p>محافظة درعا - تحديث لحظي</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            + إضافة مخزون
          </button>
        </header>

        <section
          className={`stat-card ${globalStatus.class}`}
          style={{ borderRight: `8px solid ${globalStatus.color}` }}
        >
          <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
            {totalUnits} / 385 وحدة
          </div>
          <div style={{ color: globalStatus.color, fontWeight: "bold" }}>
            {globalStatus.label}
          </div>
        </section>

        <table className="inventory-table">
          <thead>
            <tr>
              <th>الفصيلة</th>
              <th>الكمية</th>
              <th>الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td data-label="الفصيلة:">
                  <div
                    className="blood-badge"
                    style={{
                      background: item.quantity < 20 ? "#EF4444" : "#10B981",
                    }}
                  >
                    {item.bloodType}
                  </div>
                </td>
                <td data-label="الكمية:">
                  <strong>{item.quantity} وحدة</strong>
                </td>
                <td>
                  <button
                    className="btn"
                    style={{ background: "#f1f5f9", color: "#475569" }}
                    onClick={() =>
                      handleDeduct(item.id, item.bloodType, item.quantity)
                    }
                  >
                    صرف وحدة -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <section className="transactions-card">
          <h3>سجل العمليات الأخير</h3>
          {transactions.length === 0 && (
            <p style={{ color: "#94a3b8" }}>
              لا يوجد عمليات حالياً أو جاري التحميل...
            </p>
          )}
          {transactions.slice(0, 10).map((t) => (
            <div key={t.id} className="transaction-item">
              <div>
                <span style={{ fontWeight: "bold", color: t.color }}>
                  {t.type} ({t.bloodType})
                </span>
                <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  {t.performedBy}
                </div>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: "bold" }}>{t.quantity} وحدة</div>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                  {t.date}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>إضافة مخزون جديد</h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#64748b",
                marginBottom: "20px",
              }}
            >
              يرجى اختيار الفصيلة وتحديد الكمية المضافة.
            </p>

            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "0.85rem",
              }}
            >
              الفصيلة:
            </label>
            <select
              onChange={(e) =>
                setNewStock({ ...newStock, bloodType: e.target.value })
              }
            >
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "0.85rem",
              }}
            >
              الكمية بالوحدات:
            </label>
            <input
              type="number"
              placeholder="0"
              onChange={(e) =>
                setNewStock({
                  ...newStock,
                  quantity: parseInt(e.target.value) || 0,
                })
              }
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                className="btn btn-primary"
                onClick={handleAddStock}
                style={{ flex: 2 }}
              >
                حفظ البيانات
              </button>
              <button
                className="btn"
                onClick={() => setShowAddModal(false)}
                style={{ flex: 1, background: "#f1f5f9" }}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
