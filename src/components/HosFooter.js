import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  FaTint,
  FaPhone,
  FaEnvelope,
  FaHeart,
  FaFacebook,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa";

const FooterWrapper = styled.footer`
  background: #0f172a;
  color: white;
  padding: 60px 0 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  direction: rtl;
  font-family: "Inter", sans-serif;
  width: 100%;
  margin-top: auto;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
  @media (max-width: 1150px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Section = styled.div`
  h4 {
    color: white;
    font-size: 1.1rem;
    margin-bottom: 25px;
    font-weight: 700;
    position: relative;
    display: inline-block;
    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      right: 0;
      width: 30px;
      height: 2px;
      background: #ef4444;
    }
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    @media (max-width: 700px) {
      justify-content: center;
    }
  }
  h2 {
    font-size: 1.4rem;
    color: #ef4444;
    font-weight: 800;
    margin: 0;
  }
  p {
    color: #94a3b8;
    line-height: 1.6;
    font-size: 0.95rem;
    max-width: 300px;
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  li {
    margin-bottom: 12px;
  }
  a {
    color: #94a3b8;
    text-decoration: none;
    transition: all 0.3s;
    font-size: 0.95rem;
    &:hover {
      color: white;
      padding-right: 5px;
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  color: #94a3b8;
  font-size: 0.95rem;
  @media (max-width: 700px) {
    justify-content: center;
  }
  svg {
    color: #3b82f6;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  @media (max-width: 700px) {
    justify-content: center;
  }
  a {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    color: white;
    transition: 0.3s;
    &:hover {
      background: #ef4444;
      transform: translateY(-3px);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 25px;
  text-align: center;
  color: #64748b;
  font-size: 0.85rem;
  .heart {
    color: #ef4444;
    margin: 0 5px;
  }
`;

const Footer = () => {
  const navigate = useNavigate();
  return (
    <FooterWrapper>
      <Container>
        <Grid>
          <Section>
            <LogoSection>
              <div className="brand" onClick={() => navigate("/")}>
                <FaTint size={28} color="#ef4444" />
                <h2>بنك الدم بدرعا</h2>
              </div>
              <p>
                نظام متطور لإدارة التبرع بالدم نهدف لتسهيل الوصول للمتبرعين
                وإنقاذ حياة المرضى.
              </p>
              <SocialMedia>
                <a href="/">
                  <FaFacebook />
                </a>
                <a href="/">
                  <FaWhatsapp />
                </a>
                <a href="/">
                  <FaTelegram />
                </a>
              </SocialMedia>
            </LogoSection>
          </Section>
          <Section>
            <h4>روابط سريعة</h4>
            <LinkList>
              <li>
                <a href="/inventory">مخزون الدم</a>
              </li>
              <li>
                <a href="/patients">سجل المرضى</a>
              </li>
              <li>
                <a href="/statistics">الإحصائيات</a>
              </li>
            </LinkList>
          </Section>
          <Section>
            <h4>تواصل معنا</h4>
            <ContactItem>
              <FaPhone /> <span>015-6778610</span>
            </ContactItem>
            <ContactItem>
              <FaEnvelope /> <span>info@daraa-blood.sy</span>
            </ContactItem>
          </Section>
          <Section>
            <h4>أوقات العمل</h4>
            <LinkList as="div">
              <p style={{ color: "#94a3b8" }}>الأحد - الخميس: 8ص - 2م</p>
              <p style={{ color: "#ef4444", fontWeight: "bold" }}>
                الجمعة والسبت: عطلة
              </p>
            </LinkList>
          </Section>
        </Grid>
        <FooterBottom>
          <p>
            © {new Date().getFullYear()} بنك الدم بدرعا. جميع الحقوق محفوظة.
          </p>
          <p>
            سوا بننقذ حياة أهل درعا <FaHeart className="heart" />
          </p>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
