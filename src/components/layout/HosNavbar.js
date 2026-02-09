// import React, { useState } from "react";
// import styled from "styled-components";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   FaUserInjured,
//   FaWarehouse,
//   FaChartBar,
//   FaExclamationTriangle,
//   FaCog,
//   FaFileMedical,
//   FaBars,
//   FaTimes,
//   FaSignOutAlt,
//   FaTint,
// } from "react-icons/fa";

// const NavContainer = styled.header`
//   background: #0f172a;
//   color: white;
//   height: 80px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 2rem;
//   position: sticky;
//   top: 0;
//   z-index: 1000;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
//   direction: rtl;
// `;

// const RightSection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 30px;
// `;

// const Logo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;

//   &:hover {
//     transform: translateY(-1px);
//     filter: brightness(1.2);
//   }

//   h2 {
//     font-size: 1.4rem;
//     margin: 0;
//     color: #ef4444;
//     font-weight: 800;
//     white-space: nowrap;
//     letter-spacing: -0.5px;
//   }
// `;

// const NavLinksWrapper = styled.nav`
//   display: flex;
//   gap: 8px;

//   @media (max-width: 1150px) {
//     display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
//     flex-direction: column;
//     position: absolute;
//     top: 80px;
//     right: 0;
//     width: 100%;
//     background: #0f172a;
//     padding: 20px;
//     border-top: 1px solid rgba(255, 255, 255, 0.1);
//     box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
//   }
// `;

// const MenuLink = styled(NavLink)`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   padding: 10px 16px;
//   color: #94a3b8;
//   text-decoration: none;
//   border-radius: 12px;
//   transition: all 0.3s ease;
//   font-weight: 600;
//   font-size: 0.95rem;
//   white-space: nowrap;

//   &:hover {
//     background: rgba(255, 255, 255, 0.05);
//     color: white;
//   }

//   &.active {
//     background: #2563eb;
//     color: white;
//     box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
//   }

//   @media (max-width: 1150px) {
//     width: 100%;
//     padding: 15px;
//     font-size: 1.1rem;
//   }
// `;

// const LeftSection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 15px;
// `;

// const IconWrapper = styled.span`
//   font-size: 1.1rem;
//   display: flex;
//   align-items: center;
// `;

// const MobileIcon = styled.div`
//   display: none;
//   cursor: pointer;
//   font-size: 1.8rem;
//   color: white;
//   transition: 0.2s;

//   &:hover {
//     color: #3b82f6;
//   }

//   @media (max-width: 1150px) {
//     display: block;
//   }
// `;

// const LogoutBtn = styled.button`
//   background: rgba(239, 68, 68, 0.15);
//   color: #ef4444;
//   border: 1px solid rgba(239, 68, 68, 0.2);
//   padding: 10px 18px;
//   border-radius: 10px;
//   font-weight: 700;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   transition: all 0.2s;

//   &:hover {
//     background: #ef4444;
//     color: white;
//   }

//   span {
//     @media (max-width: 700px) {
//       display: none;
//     }
//   }
// `;

// const Navbar = ({ onLogout }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const menuItems = [
//     { name: "مخزون الدم", to: "/inventory", icon: <FaWarehouse /> },
//     { name: "المرضى", to: "/patients", icon: <FaUserInjured /> },
//     { name: "طلبات الدم", to: "/request-blood", icon: <FaFileMedical /> },

//     // ÄNDRA DENNA RAD SÅ ATT 'to' MATCHAR ROUTEN I APP.JS
//     { name: "شراء دم", to: "/blood-orders", icon: <FaTint /> },

//     { name: "الإحصائيات", to: "/statistics", icon: <FaChartBar /> },
//     { name: "الطوارئ", to: "/emergency", icon: <FaExclamationTriangle /> },
//     { name: "الإعدادات", to: "/settings", icon: <FaCog /> },
//   ];
//   return (
//     <NavContainer>
//       <RightSection>
//         <Logo
//           onClick={() => {
//             navigate("/");
//             setIsOpen(false);
//           }}
//         >
//           <FaTint size={28} color="#ef4444" />
//           <h2>بنك الدم بدرعا</h2>
//         </Logo>

//         <NavLinksWrapper $isOpen={isOpen}>
//           {menuItems.map((item) => (
//             <MenuLink
//               key={item.to}
//               to={item.to}
//               onClick={() => setIsOpen(false)}
//             >
//               <IconWrapper>{item.icon}</IconWrapper>
//               <span>{item.name}</span>
//             </MenuLink>
//           ))}
//         </NavLinksWrapper>
//       </RightSection>

//       {/* VÄNSTER SIDA: LOGOUT & MOBIL-IKON */}
//       <LeftSection>
//         <LogoutBtn onClick={onLogout}>
//           <span>تسجيل الخروج</span>
//           <FaSignOutAlt />
//         </LogoutBtn>

//         <MobileIcon onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </MobileIcon>
//       </LeftSection>
//     </NavContainer>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";
// import styled from "styled-components";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   FaPlusCircle,
//   FaListUl,
//   FaBars,
//   FaTimes,
//   FaSignOutAlt,
//   FaHospital,
// } from "react-icons/fa";

// // --- Din befintliga styling (behålls för att inte förstöra designen) ---
// const NavContainer = styled.header`
//   background: #0f172a;
//   color: white;
//   height: 80px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 2rem;
//   position: sticky;
//   top: 0;
//   z-index: 1000;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
//   direction: rtl;
// `;

// const RightSection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 30px;
// `;

// const Logo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   cursor: pointer;
//   h2 {
//     font-size: 1.4rem;
//     margin: 0;
//     color: #3b82f6; /* Blå färg för sjukhus istället för röd */
//     font-weight: 800;
//   }
// `;

// const NavLinksWrapper = styled.nav`
//   display: flex;
//   gap: 8px;
//   @media (max-width: 1150px) {
//     display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
//     flex-direction: column;
//     position: absolute;
//     top: 80px;
//     right: 0;
//     width: 100%;
//     background: #0f172a;
//     padding: 20px;
//   }
// `;

// const MenuLink = styled(NavLink)`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   padding: 10px 16px;
//   color: #94a3b8;
//   text-decoration: none;
//   border-radius: 12px;
//   transition: 0.3s;
//   font-weight: 600;
//   &.active {
//     background: #2563eb;
//     color: white;
//   }
// `;

// const LeftSection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 15px;
// `;
// const MobileIcon = styled.div`
//   display: none;
//   cursor: pointer;
//   @media (max-width: 1150px) {
//     display: block;
//   }
// `;

// const LogoutBtn = styled.button`
//   background: rgba(239, 68, 68, 0.15);
//   color: #ef4444;
//   border: 1px solid rgba(239, 68, 68, 0.2);
//   padding: 10px 18px;
//   border-radius: 10px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   &:hover {
//     background: #ef4444;
//     color: white;
//   }
// `;

// // --- Komponent-logik ---
// const Navbar = ({ onLogout }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   // VIKTIGT: Här är de enda länkarna läraren vill se
//   const menuItems = [
//     { name: "طلب دم جديد", to: "/", icon: <FaPlusCircle /> },
//     { name: "متابعة الطلبات", to: "/orders", icon: <FaListUl /> },
//   ];

//   return (
//     <NavContainer>
//       <RightSection>
//         <Logo
//           onClick={() => {
//             navigate("/");
//             setIsOpen(false);
//           }}
//         >
//           <FaHospital size={28} color="#3b82f6" />
//           <h2>لوحة تحكم المستشفى</h2>
//         </Logo>

//         <NavLinksWrapper $isOpen={isOpen}>
//           {menuItems.map((item) => (
//             <MenuLink
//               key={item.name}
//               to={item.to}
//               onClick={() => setIsOpen(false)}
//             >
//               <span>{item.icon}</span>
//               <span>{item.name}</span>
//             </MenuLink>
//           ))}
//         </NavLinksWrapper>
//       </RightSection>

//       <LeftSection>
//         <LogoutBtn onClick={onLogout}>
//           <span>تسجيل الخروج</span>
//           <FaSignOutAlt />
//         </LogoutBtn>

//         <MobileIcon onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </MobileIcon>
//       </LeftSection>
//     </NavContainer>
//   );
// };

// export default Navbar;

import React from "react";
import styled from "styled-components";
import {
  FaSignOutAlt,
  FaHospital,
  FaClipboardList,
  FaTruckLoading,
} from "react-icons/fa";
import { auth } from "../../firebase"; // تأكد من صحة المسار لملف firebase الخاص بك
import { signOut } from "firebase/auth";

const Nav = styled.nav`
  background: #05071a;
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  direction: rtl;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #00bcd4;
  font-weight: 900;
  font-size: 1.4rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
`;

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: #00bcd4;
  }
`;

const LogoutButton = styled.button`
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
  border: 1px solid #f44336;
  padding: 8px 18px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Cairo", sans-serif;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background: #f44336;
    color: white;
  }
`;

function HosNavbar() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // بمجرد الخروج، سيقوم App.js تلقائياً بتحويلك لصفحة Login
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Nav>
      <Logo>
        <FaHospital size={28} />
        <span>بوابة المستشفى</span>
      </Logo>

      <NavLinks>
        <NavLink onClick={() => scrollToSection("request-form")}>
          <FaClipboardList /> طلب وحدات دم
        </NavLink>
        <NavLink onClick={() => scrollToSection("order-status")}>
          <FaTruckLoading /> متابعة الطلبات
        </NavLink>
      </NavLinks>

      <LogoutButton onClick={handleLogout}>
        <FaSignOutAlt /> تسجيل الخروج
      </LogoutButton>
    </Nav>
  );
}

export default HosNavbar;
