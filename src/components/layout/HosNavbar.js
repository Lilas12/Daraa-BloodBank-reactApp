import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NotificationsBell from "../NotificationsBell";
import {
  FaWarehouse,
  FaChartBar,
  FaExclamationTriangle,
  FaCog,
  FaFileMedical,
  FaBars,
  FaTint,
  FaTimes,
  FaClipboardList,
  FaChevronDown,
  FaUsers,
} from "react-icons/fa";

// --- التنسيقات ---
const NavContainer = styled.header`
  background: #0f172a;
  color: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.2rem;
  position: sticky;
  top: 0;
  z-index: 2000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  direction: rtl;
  width: 100%;
  box-sizing: border-box;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  h2 {
    font-size: 1rem;
    margin: 0;
    color: #ef4444;
    font-weight: 800;
    white-space: nowrap;
  }
`;

const DesktopLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 5px;
  @media (max-width: 1250px) {
    display: none;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  color: ${(props) => (props.$isActive ? "white" : "#94a3b8")};
  background: ${(props) => (props.$isActive ? "rgba(239, 68, 68, 0.15)" : "transparent")};
  cursor: pointer;
  font-weight: 600;
  font-size: 0.8rem;
  border-radius: 8px;
  transition: 0.2s;
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.05);
  }
  .arrow {
    font-size: 0.6rem;
    margin-right: 4px;
    transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0)")};
    transition: 0.3s;
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 50px;
  right: 0;
  background: #1e293b;
  border-radius: 12px;
  min-width: 200px;
  padding: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  transition: 0.2s;
  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
  }
  &.active {
    background: #ef4444;
    color: white;
  }
`;

const MobileSidebar = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: #0f172a;
  z-index: 2500;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  z-index: 2400;
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: white;
  @media (max-width: 1250px) {
    display: flex;
  }
`;

const Navbar = ({ onLogout }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const links = {
    inventory: [
      { name: "مخزون الدم", to: "/inventory", icon: <FaWarehouse /> },
      { name: "بيع الدم", to: "/blood-orders", icon: <FaTint /> },
      { name: "طلبات المشافي", to: "/request-blood", icon: <FaFileMedical /> },
    ],
    data: [
      { name: "الإحصائيات", to: "/statistics", icon: <FaChartBar /> },
      { name: "التقارير", to: "/reports", icon: <FaClipboardList /> },
    ],
    direct: [
      { name: "الطوارئ", to: "/emergency", icon: <FaExclamationTriangle /> },
      { name: "المواعيد", to: "/appointments", icon: <FaUsers /> },
      { name: "الإعدادات", to: "/settings", icon: <FaCog /> },
    ],
  };

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <>
      <NavContainer>
        <RightSection>
          <Logo onClick={() => navigate("/")}>
            <FaTint size={22} color="#ef4444" />
            <h2>بنك الدم بدرعا</h2>
          </Logo>

          <DesktopLinks ref={dropdownRef}>
            <DropdownWrapper>
              <DropdownTrigger
                onClick={() => setOpenDropdown(openDropdown === "inv" ? null : "inv")}
                $isOpen={openDropdown === "inv"}
                $isActive={links.inventory.some((l) => location.pathname === l.to)}
              >
                <FaWarehouse /> <span>المخزون والطلبات</span> <FaChevronDown className="arrow" />
              </DropdownTrigger>
              <AnimatePresence>
                {openDropdown === "inv" && (
                  <DropdownMenu initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                    {links.inventory.map((l) => (
                      <MenuLink key={l.to} to={l.to}>{l.icon} {l.name}</MenuLink>
                    ))}
                  </DropdownMenu>
                )}
              </AnimatePresence>
            </DropdownWrapper>

            {links.direct.slice(0, 2).map((l) => (
              <MenuLink key={l.to} to={l.to}>{l.icon} <span>{l.name}</span></MenuLink>
            ))}

            <DropdownWrapper>
              <DropdownTrigger
                onClick={() => setOpenDropdown(openDropdown === "data" ? null : "data")}
                $isOpen={openDropdown === "data"}
                $isActive={links.data.some((l) => location.pathname === l.to)}
              >
                <FaChartBar /> <span>البيانات</span> <FaChevronDown className="arrow" />
              </DropdownTrigger>
              <AnimatePresence>
                {openDropdown === "data" && (
                  <DropdownMenu initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                    {links.data.map((l) => (
                      <MenuLink key={l.to} to={l.to}>{l.icon} {l.name}</MenuLink>
                    ))}
                  </DropdownMenu>
                )}
              </AnimatePresence>
            </DropdownWrapper>

            <MenuLink to="/settings">
              <FaCog /> <span>الإعدادات</span>
            </MenuLink>
          </DesktopLinks>
        </RightSection>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <NotificationsBell />
          <button
            onClick={onLogout}
            style={{
              background: "rgba(239,68,68,0.1)",
              color: "#ef4444",
              border: "1px solid #ef444433",
              padding: "6px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "0.75rem",
            }}
          >
            خروج
          </button>
          <Hamburger onClick={() => setIsMobileOpen(true)}><FaBars /></Hamburger>
        </div>
      </NavContainer>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileOpen(false)} />
            <MobileSidebar initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }}>
              {/* Logo section inside Mobile Sidebar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", paddingBottom: "15px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <Logo onClick={() => { navigate("/"); setIsMobileOpen(false); }}>
                  <FaTint size={20} color="#ef4444" />
                  <h2 style={{ fontSize: "0.9rem" }}>بنك الدم بدرعا</h2>
                </Logo>
                <FaTimes onClick={() => setIsMobileOpen(false)} style={{ cursor: "pointer", color: "#94a3b8" }} />
              </div>

              {/* Categorized Mobile Links */}
              <div style={{ padding: "10px 0 5px 0", fontSize: "0.7rem", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>العمليات</div>
              {links.inventory.map((l) => (
                <MenuLink key={l.to} to={l.to} onClick={() => setIsMobileOpen(false)}>{l.icon} {l.name}</MenuLink>
              ))}

              <div style={{ padding: "15px 0 5px 0", fontSize: "0.7rem", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>عام</div>
              {[...links.direct, ...links.data].map((l) => (
                <MenuLink key={l.to} to={l.to} onClick={() => setIsMobileOpen(false)}>{l.icon} {l.name}</MenuLink>
              ))}
            </MobileSidebar>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import NotificationsBell from "../NotificationsBell";
// import {
//   FaWarehouse,
//   FaChartBar,
//   FaExclamationTriangle,
//   FaCog,
//   FaFileMedical,
//   FaBars,
//   FaTint,
//   FaTimes,
//   FaClipboardList,
//   FaChevronDown,
//   FaUsers,
// } from "react-icons/fa";

// // --- التنسيقات الأساسية ---
// const NavContainer = styled.header`
//   background: #0f172a;
//   color: white;
//   height: 60px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 1.2rem;
//   position: sticky;
//   top: 0;
//   z-index: 2000;
//   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
//   direction: rtl;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const RightSection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 15px;
// `;

// const Logo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   cursor: pointer;
//   h2 {
//     font-size: 1rem;
//     margin: 0;
//     color: #ef4444;
//     font-weight: 800;
//     white-space: nowrap;
//   }
// `;

// const DesktopLinks = styled.nav`
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   @media (max-width: 1250px) {
//     display: none;
//   }
// `;

// // --- الروابط المنسدلة (Desktop) ---
// const DropdownWrapper = styled.div`
//   position: relative;
// `;

// const DropdownTrigger = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   padding: 8px 12px;
//   color: ${(props) => (props.$isActive ? "white" : "#94a3b8")};
//   background: ${(props) =>
//     props.$isActive ? "rgba(239, 68, 68, 0.15)" : "transparent"};
//   cursor: pointer;
//   font-weight: 600;
//   font-size: 0.8rem;
//   border-radius: 8px;
//   transition: 0.2s;
//   &:hover {
//     color: white;
//     background: rgba(255, 255, 255, 0.05);
//   }
//   .arrow {
//     font-size: 0.6rem;
//     margin-right: 4px;
//     transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0)")};
//     transition: 0.3s;
//   }
// `;

// const DropdownMenu = styled(motion.div)`
//   position: absolute;
//   top: 50px;
//   right: 0;
//   background: #1e293b;
//   border-radius: 12px;
//   min-width: 200px;
//   padding: 8px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
//   border: 1px solid rgba(255, 255, 255, 0.1);
// `;

// const MenuLink = styled(NavLink)`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   padding: 10px 14px;
//   color: #94a3b8;
//   text-decoration: none;
//   border-radius: 8px;
//   font-weight: 600;
//   font-size: 0.85rem;
//   transition: 0.2s;
//   &:hover {
//     background: rgba(239, 68, 68, 0.1);
//     color: #f87171;
//   }
//   &.active {
//     background: #ef4444;
//     color: white;
//   }
// `;

// // --- قائمة الموبايل المحسنة (بدون لاغ) ---
// const MobileSidebar = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   width: 280px;
//   background: #0f172a;
//   z-index: 2500;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
//   overflow-y: auto; /* يحل مشكلة نقص الروابط في الشاشات الصغيرة */
// `;

// const Overlay = styled(motion.div)`
//   position: fixed;
//   inset: 0;
//   background: rgba(0, 0, 0, 0.6);
//   backdrop-filter: blur(3px);
//   z-index: 2400;
// `;

// const Hamburger = styled.div`
//   display: none;
//   cursor: pointer;
//   font-size: 1.5rem;
//   color: white;
//   @media (max-width: 1250px) {
//     display: flex;
//   }
// `;

// const Navbar = ({ onLogout }) => {
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dropdownRef = useRef(null);

//   // مصفوفة الروابط لتكرارها في الموبايل والديسكتوب
//   const links = {
//     inventory: [
//       { name: "مخزون الدم", to: "/inventory", icon: <FaWarehouse /> },
//       { name: "بيع الدم", to: "/blood-orders", icon: <FaTint /> },
//       { name: "طلبات المشافي", to: "/request-blood", icon: <FaFileMedical /> },
//     ],
//     data: [
//       { name: "الإحصائيات", to: "/statistics", icon: <FaChartBar /> },
//       { name: "التقارير", to: "/reports", icon: <FaClipboardList /> },
//     ],
//     direct: [
//       { name: "الطوارئ", to: "/emergency", icon: <FaExclamationTriangle /> },
//       { name: "المواعيد", to: "/appointments", icon: <FaUsers /> },
//       { name: "الإعدادات", to: "/settings", icon: <FaCog /> },
//     ],
//   };

//   useEffect(() => {
//     setIsMobileOpen(false);
//     setOpenDropdown(null);
//   }, [location.pathname]);

//   return (
//     <>
//       <NavContainer>
//         <RightSection>
//           <Logo onClick={() => navigate("/")}>
//             <FaTint size={22} color="#ef4444" />
//             <h2>بنك الدم بدرعا</h2>
//           </Logo>

//           <DesktopLinks ref={dropdownRef}>
//             {/* القائمة المنسدلة 1 */}
//             <DropdownWrapper>
//               <DropdownTrigger
//                 onClick={() =>
//                   setOpenDropdown(openDropdown === "inv" ? null : "inv")
//                 }
//                 $isOpen={openDropdown === "inv"}
//                 $isActive={links.inventory.some(
//                   (l) => location.pathname === l.to,
//                 )}
//               >
//                 <FaWarehouse /> <span>المخزون والطلبات</span>{" "}
//                 <FaChevronDown className="arrow" />
//               </DropdownTrigger>
//               <AnimatePresence>
//                 {openDropdown === "inv" && (
//                   <DropdownMenu
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                   >
//                     {links.inventory.map((l) => (
//                       <MenuLink key={l.to} to={l.to}>
//                         {l.icon} {l.name}
//                       </MenuLink>
//                     ))}
//                   </DropdownMenu>
//                 )}
//               </AnimatePresence>
//             </DropdownWrapper>

//             {/* روابط مباشرة */}
//             {links.direct.slice(0, 2).map((l) => (
//               <MenuLink key={l.to} to={l.to}>
//                 {l.icon} <span>{l.name}</span>
//               </MenuLink>
//             ))}

//             {/* القائمة المنسدلة 2 */}
//             <DropdownWrapper>
//               <DropdownTrigger
//                 onClick={() =>
//                   setOpenDropdown(openDropdown === "data" ? null : "data")
//                 }
//                 $isOpen={openDropdown === "data"}
//                 $isActive={links.data.some((l) => location.pathname === l.to)}
//               >
//                 <FaChartBar /> <span>البيانات</span>{" "}
//                 <FaChevronDown className="arrow" />
//               </DropdownTrigger>
//               <AnimatePresence>
//                 {openDropdown === "data" && (
//                   <DropdownMenu
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                   >
//                     {links.data.map((l) => (
//                       <MenuLink key={l.to} to={l.to}>
//                         {l.icon} {l.name}
//                       </MenuLink>
//                     ))}
//                   </DropdownMenu>
//                 )}
//               </AnimatePresence>
//             </DropdownWrapper>

//             <MenuLink to="/settings">
//               <FaCog /> <span>الإعدادات</span>
//             </MenuLink>
//           </DesktopLinks>
//         </RightSection>

//         <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//           <NotificationsBell />
//           <button
//             onClick={onLogout}
//             style={{
//               background: "rgba(239,68,68,0.1)",
//               color: "#ef4444",
//               border: "1px solid #ef444433",
//               padding: "6px 12px",
//               borderRadius: "8px",
//               cursor: "pointer",
//               fontWeight: "700",
//               fontSize: "0.75rem",
//             }}
//           >
//             خروج
//           </button>
//           <Hamburger onClick={() => setIsMobileOpen(true)}>
//             <FaBars />
//           </Hamburger>
//         </div>
//       </NavContainer>

//       {/* شاشة الموبايل المحسنة */}
//       <AnimatePresence>
//         {isMobileOpen && (
//           <>
//             <Overlay
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsMobileOpen(false)}
//             />
//             <MobileSidebar
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "tween", duration: 0.3 }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: "20px",
//                 }}
//               >
//                 <span style={{ fontWeight: 800, color: "#ef4444" }}>
//                   القائمة
//                 </span>
//                 <FaTimes
//                   onClick={() => setIsMobileOpen(false)}
//                   style={{ cursor: "pointer" }}
//                 />
//               </div>

//               {/* جميع الروابط تظهر هنا في الموبايل */}
//               {[...links.inventory, ...links.direct, ...links.data].map((l) => (
//                 <MenuLink
//                   key={l.to}
//                   to={l.to}
//                   onClick={() => setIsMobileOpen(false)}
//                 >
//                   {l.icon} {l.name}
//                 </MenuLink>
//               ))}
//             </MobileSidebar>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import NotificationsBell from "../NotificationsBell";
// import {
//   FaUserInjured,
//   FaWarehouse,
//   FaChartBar,
//   FaExclamationTriangle,
//   FaCog,
//   FaFileMedical,
//   FaBars,
//   FaSignOutAlt,
//   FaTint,
//   FaTimes,
//   FaClipboardList,
// } from "react-icons/fa";

// const NavContainer = styled.header`
//   background: #0f172a;
//   color: white;
//   height: 60px; /* Minskad höjd från 70px för en mer kompakt look */
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 1.2rem;
//   position: sticky;
//   top: 0;
//   z-index: 2000;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
//   direction: rtl;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const RightSection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
// `;

// const Logo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   cursor: pointer;

//   h2 {
//     font-size: 1rem; /* Minskad från 1.2rem */
//     margin: 0;
//     color: #ef4444;
//     font-weight: 700;
//     white-space: nowrap;
//     letter-spacing: -0.3px;
//   }
// `;

// const DesktopLinks = styled.nav`
//   display: flex;
//   gap: 4px;
//   margin-right: 15px;

//   @media (max-width: 1250px) {
//     display: none;
//   }
// `;

// const MobileDrawer = styled.nav`
//   position: fixed;
//   top: 60px; /* Matchar den nya NavContainer-höjden */
//   right: 0;
//   left: 0;
//   background: #111827;
//   display: flex;
//   flex-direction: column;
//   padding: 15px;
//   gap: 5px;
//   z-index: 1999;
//   box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
//   border-bottom: 3px solid #ef4444;

//   transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//   transform: ${({ $isOpen }) =>
//     $isOpen ? "translateY(0)" : "translateY(-150%)"};

//   @media (min-width: 1251px) {
//     display: none;
//   }
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 60px;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.7);
//   backdrop-filter: blur(4px);
//   z-index: 1998;
//   display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
// `;

// const MenuLink = styled(NavLink)`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   padding: 8px 12px; /* Mer kompakt padding */
//   color: #94a3b8;
//   text-decoration: none;
//   border-radius: 8px;
//   transition: 0.2s all ease;
//   font-weight: 600;
//   font-size: 0.8rem; /* Minskad från 0.9rem - Mycket mer Dashboard-look */
//   white-space: nowrap;

//   .icon-span {
//     display: flex;
//     align-items: center;
//     font-size: 1rem; /* Minskad ikonstorlek */
//   }

//   &:hover {
//     background: rgba(239, 68, 68, 0.08);
//     color: #f87171;
//   }

//   &.active {
//     background: #ef4444;
//     color: white;
//   }

//   @media (max-width: 1250px) {
//     width: 100%;
//     padding: 12px;
//     font-size: 0.95rem; /* Något mindre även på mobil */
//   }
// `;

// const LeftActions = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
// `;

// const LogoutBtn = styled.button`
//   background: rgba(239, 68, 68, 0.1);
//   color: #ef4444;
//   border: 1px solid rgba(239, 68, 68, 0.2);
//   padding: 6px 12px; /* Minskad padding */
//   border-radius: 8px;
//   font-weight: 700;
//   font-size: 0.75rem; /* Mindre text på knappen */
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   transition: 0.2s;

//   &:hover {
//     background: #ef4444;
//     color: white;
//   }
// `;

// const Hamburger = styled.div`
//   display: none;
//   cursor: pointer;
//   font-size: 1.4rem; /* Något mindre ikon */
//   color: white;
//   padding: 5px;

//   @media (max-width: 1250px) {
//     display: flex;
//     align-items: center;
//   }
// `;

// const Navbar = ({ onLogout }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     setIsOpen(false);
//   }, [location.pathname]);

//   const menuItems = [
//     { name: "مخزون الدم", to: "/inventory", icon: <FaWarehouse /> },
//     { name: "بيع الدم", to: "/blood-orders", icon: <FaTint /> },
//     { name: "المستشفيات", to: "/request-blood", icon: <FaFileMedical /> },
//     { name: "الطوارئ", to: "/emergency", icon: <FaExclamationTriangle /> },
//     { name: "المواعيد", to: "/appointments", icon: <FaUserInjured /> },
//     { name: "الإحصائيات", to: "/statistics", icon: <FaChartBar /> },
//     { name: "التقارير", to: "/reports", icon: <FaClipboardList /> },
//     { name: "الإعدادات", to: "/settings", icon: <FaCog /> },
//   ];

//   return (
//     <>
//       <NavContainer>
//         <RightSection>
//           <Logo onClick={() => navigate("/")}>
//             <FaTint size={20} color="#ef4444" />
//             <h2>بنك الدم بدرعا</h2>
//           </Logo>

//           <DesktopLinks>
//             {menuItems.map((item) => (
//               <MenuLink key={item.to} to={item.to}>
//                 <span className="icon-span">{item.icon}</span>
//                 <span>{item.name}</span>
//               </MenuLink>
//             ))}
//           </DesktopLinks>
//         </RightSection>

//         <LeftActions>
//           <NotificationsBell />
//           <LogoutBtn onClick={onLogout}>
//             <span>خروج</span>
//             <FaSignOutAlt />
//           </LogoutBtn>
//           <Hamburger onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <FaTimes /> : <FaBars />}
//           </Hamburger>
//         </LeftActions>
//       </NavContainer>

//       <MobileDrawer $isOpen={isOpen}>
//         {menuItems.map((item) => (
//           <MenuLink key={item.to} to={item.to} onClick={() => setIsOpen(false)}>
//             <span className="icon-span">{item.icon}</span>
//             <span>{item.name}</span>
//           </MenuLink>
//         ))}
//       </MobileDrawer>
//       <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />
//     </>
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

// import React from "react";
// import styled from "styled-components";
// import {
//   FaSignOutAlt,
//   FaHospital,
//   FaClipboardList,
//   FaTruckLoading,
// } from "react-icons/fa";
// import { auth } from "../../firebase"; // تأكد من صحة المسار لملف firebase الخاص بك
// import { signOut } from "firebase/auth";

// const Nav = styled.nav`
//   background: #05071a;
//   padding: 15px 40px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//   direction: rtl;
//   position: sticky;
//   top: 0;
//   z-index: 1000;
// `;

// const Logo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   color: #00bcd4;
//   font-weight: 900;
//   font-size: 1.4rem;
// `;

// const NavLinks = styled.div`
//   display: flex;
//   gap: 30px;
// `;

// const NavLink = styled.a`
//   color: rgba(255, 255, 255, 0.7);
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   font-size: 0.95rem;
//   transition: 0.3s;
//   cursor: pointer;

//   &:hover {
//     color: #00bcd4;
//   }
// `;

// const LogoutButton = styled.button`
//   background: rgba(244, 67, 54, 0.1);
//   color: #f44336;
//   border: 1px solid #f44336;
//   padding: 8px 18px;
//   border-radius: 12px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   font-family: "Cairo", sans-serif;
//   font-weight: bold;
//   transition: 0.3s;

//   &:hover {
//     background: #f44336;
//     color: white;
//   }
// `;

// function HosNavbar() {
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       // بمجرد الخروج، سيقوم App.js تلقائياً بتحويلك لصفحة Login
//     } catch (error) {
//       console.error("Error signing out: ", error);
//     }
//   };

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <Nav>
//       <Logo>
//         <FaHospital size={28} />
//         <span>بوابة المستشفى</span>
//       </Logo>

//       <NavLinks>
//         <NavLink onClick={() => scrollToSection("request-form")}>
//           <FaClipboardList /> طلب وحدات دم
//         </NavLink>
//         <NavLink onClick={() => scrollToSection("order-status")}>
//           <FaTruckLoading /> متابعة الطلبات
//         </NavLink>
//       </NavLinks>

//       <LogoutButton onClick={handleLogout}>
//         <FaSignOutAlt /> تسجيل الخروج
//       </LogoutButton>
//     </Nav>
//   );
// }

// export default HosNavbar;
