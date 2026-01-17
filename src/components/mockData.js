export const mockInventory = [
  {
    id: 1,
    bloodType: "A+",
    quantity: 50,
    expiry: "2024-12-01",
    color: "#F44336",
  },
  {
    id: 2,
    bloodType: "B+",
    quantity: 30,
    expiry: "2024-11-15",
    color: "#FF9800",
  },
  {
    id: 3,
    bloodType: "O+",
    quantity: 70,
    expiry: "2024-10-20",
    color: "#4CAF50",
  },
];

export const mockPatients = [
  {
    id: 1,
    name: "أحمد محمد",
    bloodType: "A+",
    status: "مستقر",
    lastRequest: "2023-10-01",
  },
  {
    id: 2,
    name: "فاطمة علي",
    bloodType: "O-",
    status: "طوارئ",
    lastRequest: "2023-10-02",
  },
];

export const mockNotifications = [
  {
    id: 1,
    message: "انخفاض مخزون دم نوع O+",
    type: "emergency",
    date: "2023-10-01",
  },
  {
    id: 2,
    message: "تم قبول طلب دم للمريض أحمد",
    type: "success",
    date: "2023-10-02",
  },
];
