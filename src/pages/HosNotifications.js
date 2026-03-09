// import React, { useState } from "react";
// import styled, { createGlobalStyle } from "styled-components";

// const GlobalStyle = createGlobalStyle`
//   :root {
//     --color-primary: #c1121f;
//     --color-secondary: #780000;
//     --color-bg: #fdf0d5;
//     --color-text: #003049;
//   }
// `;

// const Container = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   padding: 20px;
//   font-family: Arial, sans-serif;
//   background-color: var(--color-bg);
//   border-radius: 8px;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//   color: var(--color-text);
// `;

// const Title = styled.h3`
//   text-align: center;
//   color: var(--color-primary);
//   margin-bottom: 20px;
// `;

// const StyledTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin-bottom: 20px;
// `;

// const TableHead = styled.thead`
//   background-color: var(--color-primary);
//   color: var(--color-bg);
// `;

// const TableHeader = styled.th`
//   padding: 12px;
//   text-align: left;
//   border: 1px solid var(--color-text);
// `;

// const TableBody = styled.tbody``;

// const TableRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #f2f2f2;
//   }
// `;

// const TableCell = styled.td`
//   padding: 12px;
//   border: 1px solid var(--color-text);
//   color: var(--color-text);
// `;

// const Input = styled.input`
//   padding: 8px;
//   border: 1px solid var(--color-text);
//   border-radius: 4px;
//   width: 100px;
//   color: var(--color-text);
//   background-color: var(--color-bg);
// `;

// const Button = styled.button`
//   padding: 10px 15px;
//   background-color: var(--color-primary);
//   color: var(--color-bg);
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   margin: 5px;

//   &:hover {
//     background-color: var(--color-secondary);
//   }
// `;

// const AddForm = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
//   background-color: var(--color-bg);
//   padding: 10px;
//   border-radius: 4px;
// `;

// const Select = styled.select`
//   padding: 8px;
//   border: 1px solid var(--color-text);
//   border-radius: 4px;
//   color: var(--color-text);
//   background-color: var(--color-bg);
// `;

// const NumberInput = styled.input`
//   padding: 8px;
//   border: 1px solid var(--color-text);
//   border-radius: 4px;
//   width: 100px;
//   color: var(--color-text);
//   background-color: var(--color-bg);
// `;

// function HosNotifications() {
//   const [inventory, setInventory] = useState([
//     { bloodType: "A+", quantity: 50 },
//     { bloodType: "B+", quantity: 30 },
//     { bloodType: "O+", quantity: 70 },
//   ]);

//   const [newBloodType, setNewBloodType] = useState("A-");
//   const [newQuantity, setNewQuantity] = useState(0);

//   const updateQuantity = (index, newQuantity) => {
//     if (newQuantity < 0) return;
//     const updatedInventory = [...inventory];
//     updatedInventory[index].quantity = newQuantity;
//     setInventory(updatedInventory);
//   };

//   const addBloodType = () => {
//     if (newQuantity < 0) return;
//     const existingIndex = inventory.findIndex(
//       (item) => item.bloodType === newBloodType,
//     );
//     if (existingIndex !== -1) {
//       updateQuantity(
//         existingIndex,
//         inventory[existingIndex].quantity + newQuantity,
//       );
//     } else {
//       setInventory([
//         ...inventory,
//         { bloodType: newBloodType, quantity: newQuantity },
//       ]);
//     }
//     setNewQuantity(0);
//   };

//   const removeBloodType = (index) => {
//     const updatedInventory = inventory.filter((_, i) => i !== index);
//     setInventory(updatedInventory);
//   };

//   return (
//     <>
//       <GlobalStyle />
//       <Container>
//         <Title>إدارة المخزون (Manage Inventory)</Title>

//         <AddForm>
//           <div>
//             <label>نوع الدم (Blood Type): </label>
//             <Select
//               value={newBloodType}
//               onChange={(e) => setNewBloodType(e.target.value)}
//             >
//               <option value="A+">A+</option>
//               <option value="A-">A-</option>
//               <option value="B+">B+</option>
//               <option value="B-">B-</option>
//               <option value="O+">O+</option>
//               <option value="O-">O-</option>
//               <option value="AB+">AB+</option>
//               <option value="AB-">AB-</option>
//             </Select>
//           </div>
//           <div>
//             <label>الكمية (Quantity): </label>
//             <NumberInput
//               type="number"
//               value={newQuantity}
//               onChange={(e) => setNewQuantity(parseInt(e.target.value) || 0)}
//               min="0"
//             />
//           </div>
//           <Button onClick={addBloodType}>إضافة أو تحديث (Add/Update)</Button>
//         </AddForm>

//         <StyledTable>
//           <TableHead>
//             <tr>
//               <TableHeader>نوع الدم (Blood Type)</TableHeader>
//               <TableHeader>الكمية المتاحة (Available Quantity)</TableHeader>
//               <TableHeader>تحديث الكمية (Update Quantity)</TableHeader>
//               <TableHeader>إجراءات (Actions)</TableHeader>
//             </tr>
//           </TableHead>
//           <TableBody>
//             {inventory.map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell>{item.bloodType}</TableCell>
//                 <TableCell>{item.quantity}</TableCell>
//                 <TableCell>
//                   <Input
//                     type="number"
//                     value={item.quantity}
//                     onChange={(e) =>
//                       updateQuantity(index, parseInt(e.target.value) || 0)
//                     }
//                     min="0"
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Button onClick={() => removeBloodType(index)}>
//                     حذف (Remove)
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </StyledTable>
//       </Container>
//     </>
//   );
// }

// export default HosNotifications;
