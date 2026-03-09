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
        fullDate: serverTimestamp(), // Detta fält sorterar vi på
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
        .inventory-page { padding: 20px; font-family: 'Segoe UI', Tahoma; direction: rtl; background: #f8fafc; min-height: 100vh; }
        .inventory-container { max-width: 1200px; margin: 0 auto; }
        .inventory-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; background: white; padding: 25px; border-radius: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .stat-card { background: white; padding: 25px; border-radius: 20px; text-align: center; margin-bottom: 25px; }
        .pulse-red { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
        .inventory-table { width: 100%; border-collapse: separate; border-spacing: 0 10px; }
        .inventory-table td { padding: 20px; background: white; border-radius: 10px; }
        .blood-badge { width: 50px; height: 50px; border-radius: 15px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }
        .btn { padding: 12px 25px; border-radius: 10px; border: none; cursor: pointer; font-weight: bold; }
        .btn-primary { background: #E11D48; color: white; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal { background: white; padding: 30px; border-radius: 20px; width: 400px; }
      `}</style>

      <div className="inventory-container">
        <div className="inventory-header">
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
        </div>

        <div
          className={`stat-card ${globalStatus.class}`}
          style={{ borderRight: `8px solid ${globalStatus.color}` }}
        >
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {totalUnits} / 385
          </div>
          <div style={{ color: globalStatus.color, fontWeight: "bold" }}>
            {globalStatus.label}
          </div>
        </div>

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
                <td>
                  <div
                    className="blood-badge"
                    style={{
                      background: item.quantity < 20 ? "#EF4444" : "#10B981",
                    }}
                  >
                    {item.bloodType}
                  </div>
                </td>
                <td>
                  <strong>{item.quantity} وحدة</strong>
                </td>
                <td>
                  <button
                    className="btn"
                    style={{ background: "#f1f5f9" }}
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

        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "30px",
            border_radius: "20px",
          }}
        >
          <h3>سجل العمليات الأخير</h3>
          {transactions.length === 0 && (
            <p style={{ color: "#94a3b8" }}>
              لا يوجد عمليات حالياً أو جاري إنشاء Index...
            </p>
          )}
          {transactions.slice(0, 5).map((t) => (
            <div
              key={t.id}
              style={{
                padding: "15px 0",
                borderBottom: "1px solid #f1f5f9",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span style={{ fontWeight: "bold", color: t.color }}>
                  {t.type} ({t.bloodType})
                </span>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                  {t.performedBy}
                </div>
              </div>
              <div style={{ textAlign: "left" }}>
                <div>{t.quantity} وحدة</div>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                  {t.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>إضافة مخزون</h3>
            <select
              className="btn"
              style={{
                width: "100%",
                marginBottom: "10px",
                border: "1px solid #ddd",
              }}
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
            <input
              type="number"
              placeholder="الكمية"
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              onChange={(e) =>
                setNewStock({
                  ...newStock,
                  quantity: parseInt(e.target.value) || 0,
                })
              }
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="btn btn-primary"
                onClick={handleAddStock}
                style={{ flex: 1 }}
              >
                حفظ
              </button>
              <button
                className="btn"
                onClick={() => setShowAddModal(false)}
                style={{ flex: 1 }}
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
