import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  increment,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  limit,
} from "firebase/firestore";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [user, setUser] = useState(null);
  const [livePulse, setLivePulse] = useState(0);

  const [newStock, setNewStock] = useState({ bloodType: "A+", quantity: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse((prev) => (prev === 0 ? 1 : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const unsubInv = onSnapshot(collection(db, "inventory"), (snapshot) => {
          setInventory(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
          );
          setLoading(false);
        });

        const q = query(
          collection(db, "transactions"),
          orderBy("lastUpdated", "desc"),
          limit(10),
        );
        const unsubTrans = onSnapshot(q, (snapshot) => {
          setTransactions(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
          );
        });

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

  const totalUnits = inventory.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );

  const handleAction = async (id, bloodType, isDeduct) => {
    try {
      const bloodRef = doc(db, "inventory", id);
      const change = isDeduct ? -1 : 1;
      await updateDoc(bloodRef, {
        quantity: increment(change),
        lastUpdated: serverTimestamp(),
      });
      await addDoc(collection(db, "transactions"), {
        status: isDeduct ? "استهلاك وحدة" : "إضافة سريعة",
        bloodType: bloodType,
        quantity: change,
        lastUpdated: serverTimestamp(),
        performedBy: user.email,
      });
    } catch (e) {
      console.error(e);
    }
  };

  // NY FUNKTION: Ta bort en rad från loggen
  const handleDeleteTransaction = async (transId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا النشاط من السجل؟")) {
      try {
        await deleteDoc(doc(db, "transactions", transId));
      } catch (e) {
        console.error("Error deleting transaction:", e);
      }
    }
  };

  const handleAddStock = async () => {
    const bloodItem = inventory.find((i) => i.bloodType === newStock.bloodType);
    if (!bloodItem || newStock.quantity <= 0) return;

    try {
      await updateDoc(doc(db, "inventory", bloodItem.id), {
        quantity: increment(newStock.quantity),
        lastUpdated: serverTimestamp(),
      });

      await addDoc(collection(db, "transactions"), {
        status: "إضافة مخزون",
        bloodType: newStock.bloodType,
        quantity: newStock.quantity,
        lastUpdated: serverTimestamp(),
        performedBy: user.email,
      });

      setShowAddModal(false);
      setNewStock({ bloodType: "A+", quantity: 0 });
    } catch (e) {
      console.error(e);
    }
  };

  if (loading)
    return (
      <div
        style={{ textAlign: "center", padding: "100px", fontFamily: "Cairo" }}
      >
        جاري المزامنة...
      </div>
    );

  return (
    <div className="inventory-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');

        .inventory-page { padding: 20px; font-family: 'Cairo', sans-serif; direction: rtl; background: #f8fafc; min-height: 100vh; }
        .container { max-width: 900px; margin: 0 auto; }
        .live-value { display: inline-block; transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); color: #e11d48; }

        .hero-card {
          background: white; padding: 40px; border-radius: 30px; text-align: center;
          margin-bottom: 30px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05); border: 1px solid #fff;
        }

        .blood-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .blood-card {
          background: white; padding: 25px; border-radius: 24px; text-align: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02); transition: 0.3s; border: 1px solid #f1f5f9;
        }
        .blood-card:hover { transform: translateY(-5px); border-color: #fb7185; }

        .log-box { background: white; padding: 30px; border-radius: 30px; box-shadow: 0 10px 15px rgba(0,0,0,0.03); }
        .log-item {
          display: flex; justify-content: space-between; align-items: center;
          padding: 15px; margin-bottom: 12px; border-radius: 16px;
          background: #f8fafc; border: 1px solid #f1f5f9; transition: 0.2s;
          position: relative;
        }
        .log-item:hover { background: #fff; border-color: #e2e8f0; }

        .delete-btn {
          background: none; border: none; color: #cbd5e1; cursor: pointer;
          font-size: 1.1rem; transition: 0.2s; padding: 5px; margin-right: 10px;
        }
        .delete-btn:hover { color: #e11d48; transform: scale(1.2); }

        .btn-add {
          background: #1e293b; color: white; border: none; padding: 12px 25px;
          border-radius: 14px; font-weight: bold; cursor: pointer;
        }
      `}</style>

      <div className="container">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontWeight: 900 }}>بنك الدم الذكي</h1>
            <p style={{ margin: 0, color: "#64748b" }}>
              إدارة النشاطات اللحظية
            </p>
          </div>
          <button className="btn-add" onClick={() => setShowAddModal(true)}>
            + إضافة كمية
          </button>
        </header>

        <section className="hero-card">
          <span style={{ color: "#94a3b8", fontWeight: 700 }}>
            إجمالي الوحدات
          </span>
          <h2 className="live-value" style={{ fontSize: "4rem", margin: 0 }}>
            {totalUnits + livePulse}
          </h2>
        </section>

        <div className="blood-grid">
          {inventory.map((item) => (
            <div className="blood-card" key={item.id}>
              <div style={{ fontSize: "1.8rem", fontWeight: 900 }}>
                {item.bloodType}
              </div>
              <div
                style={{ fontSize: "1.5rem", fontWeight: 900 }}
                className="live-value"
              >
                {item.quantity + (item.quantity > 0 ? livePulse : 0)}
              </div>
              <button
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "8px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#fff1f2",
                  color: "#e11d48",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => handleAction(item.id, item.bloodType, true)}
              >
                صرف وحدة
              </button>
            </div>
          ))}
        </div>

        <section className="log-box">
          <h3 style={{ fontWeight: 900, marginBottom: "20px" }}>
            آخر النشاطات ⚡
          </h3>
          {transactions.map((t) => (
            <div
              key={t.id}
              className="log-item"
              style={{
                borderRight: `5px solid ${t.quantity < 0 ? "#fb7185" : "#34d399"}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Ta bort-knapp (Papperskorg) */}
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTransaction(t.id)}
                  title="حذف النشاط"
                >
                  🗑️
                </button>

                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: t.quantity < 0 ? "#fff1f2" : "#f0fdf4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "15px",
                  }}
                >
                  {t.quantity < 0 ? "📤" : "📥"}
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>
                    {t.status || "عملية"} ({t.bloodType})
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                    {t.performedBy}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontWeight: "900",
                    color: t.quantity < 0 ? "#e11d48" : "#10b981",
                  }}
                >
                  {t.quantity > 0 ? "+" : ""}
                  {t.quantity}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#cbd5e1" }}>
                  {t.lastUpdated?.toDate
                    ? t.lastUpdated.toDate().toLocaleTimeString("ar-SY")
                    : "الآن"}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {showAddModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "35px",
              borderRadius: "25px",
              width: "350px",
            }}
          >
            <h3 style={{ fontWeight: 900, textAlign: "center" }}>
              تحديث المخزون
            </h3>
            <select
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "10px",
                border: "1px solid #eee",
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
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "10px",
                border: "1px solid #eee",
              }}
              onChange={(e) =>
                setNewStock({
                  ...newStock,
                  quantity: parseInt(e.target.value) || 0,
                })
              }
            />
            <button
              className="btn-add"
              style={{ width: "100%", padding: "15px" }}
              onClick={handleAddStock}
            >
              حفظ التعديل
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                marginTop: "10px",
                color: "#94a3b8",
                cursor: "pointer",
              }}
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
