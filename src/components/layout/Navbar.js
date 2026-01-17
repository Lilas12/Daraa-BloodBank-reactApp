import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUserInjured,
  FaWarehouse,
  FaChartBar,
  FaExclamationTriangle,
  FaCog,
  FaFileMedical,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaTint,
} from "react-icons/fa";

// ==========================================
// STYLED COMPONENTS
// ==========================================

const NavContainer = styled.header`
  background: #0f172a;
  color: white;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  direction: rtl; /* Stöd för arabisk textriktning */
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.2);
  }

  h2 {
    font-size: 1.4rem;
    margin: 0;
    color: #ef4444; /* Röd färg enligt önskemål */
    font-weight: 800;
    white-space: nowrap;
    letter-spacing: -0.5px;
  }
`;

const NavLinksWrapper = styled.nav`
  display: flex;
  gap: 8px;

  @media (max-width: 1150px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 80px;
    right: 0;
    width: 100%;
    background: #0f172a;
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  }
`;

const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }

  &.active {
    background: #2563eb;
    color: white;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }

  @media (max-width: 1150px) {
    width: 100%;
    padding: 15px;
    font-size: 1.1rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconWrapper = styled.span`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
`;

const MobileIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.8rem;
  color: white;
  transition: 0.2s;

  &:hover {
    color: #3b82f6;
  }

  @media (max-width: 1150px) {
    display: block;
  }
`;

const LogoutBtn = styled.button`
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;

  &:hover {
    background: #ef4444;
    color: white;
  }

  span {
    @media (max-width: 700px) {
      display: none; /* Döljer texten på mobiler för att spara plats */
    }
  }
`;

// ==========================================
// MAIN COMPONENT
// ==========================================

const Navbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // "الرئيسية" är borttagen eftersom Logo sköter navigering till "/"
  const menuItems = [
    { name: "مخزون الدم", to: "/inventory", icon: <FaWarehouse /> },
    { name: "المرضى", to: "/patients", icon: <FaUserInjured /> },
    { name: "طلبات الدم", to: "/request-blood", icon: <FaFileMedical /> },
    { name: "الإحصائيات", to: "/statistics", icon: <FaChartBar /> },
    { name: "الطوارئ", to: "/emergency", icon: <FaExclamationTriangle /> },
    { name: "الإعدادات", to: "/settings", icon: <FaCog /> },
  ];

  return (
    <NavContainer>
      {/* HÖGER SIDA: LOGO & MENY */}
      <RightSection>
        <Logo
          onClick={() => {
            navigate("/");
            setIsOpen(false);
          }}
        >
          <FaTint size={28} color="#ef4444" />
          <h2>بنك الدم بدرعا</h2>
        </Logo>

        <NavLinksWrapper $isOpen={isOpen}>
          {menuItems.map((item) => (
            <MenuLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
            >
              <IconWrapper>{item.icon}</IconWrapper>
              <span>{item.name}</span>
            </MenuLink>
          ))}
        </NavLinksWrapper>
      </RightSection>

      {/* VÄNSTER SIDA: LOGOUT & MOBIL-IKON */}
      <LeftSection>
        <LogoutBtn onClick={onLogout}>
          <span>تسجيل الخروج</span>
          <FaSignOutAlt />
        </LogoutBtn>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileIcon>
      </LeftSection>
    </NavContainer>
  );
};

export default Navbar;
