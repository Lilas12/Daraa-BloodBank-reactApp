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
  padding: 40px 0 20px 0; /* Något mindre padding överst på mobil */
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  direction: rtl;
  font-family: "Inter", sans-serif;
  width: 100%;
  margin-top: auto;

  @media (min-width: 768px) {
    padding: 60px 0 20px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Staplat på mobil */
  gap: 40px;
  margin-bottom: 40px;
  text-align: center; /* Centrerat på mobil */

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, 1fr); /* Två kolumner på tablet */
  }

  @media (min-width: 1150px) {
    grid-template-columns: 1.5fr 1fr 1fr 1fr; /* Fyra kolumner på desktop */
    text-align: right; /* Högerställt för RTL på desktop */
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

      @media (max-width: 1150px) {
        right: 50%;
        transform: translateX(50%); /* Centrerar underlinjen på mobil */
      }
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
    justify-content: center; /* Centrerat på mobil */

    @media (min-width: 1150px) {
      justify-content: flex-start; /* Högerställt på desktop */
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
    margin: 0 auto; /* Centrerar textblocket */

    @media (min-width: 1150px) {
      margin: 0; /* Tar bort auto-margin på desktop */
    }
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

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
  justify-content: center; /* Centrerat på mobil */

  @media (min-width: 1150px) {
    justify-content: flex-start;
  }

  svg {
    color: #3b82f6;
    flex-shrink: 0;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  justify-content: center; /* Centrerat på mobil */

  @media (min-width: 1150px) {
    justify-content: flex-start;
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

  p {
    margin: 5px 0;
  }

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
          {/* Sektion 1: Logotyp & Om oss */}
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
                <a href="#" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="#" aria-label="Whatsapp">
                  <FaWhatsapp />
                </a>
                <a href="#" aria-label="Telegram">
                  <FaTelegram />
                </a>
              </SocialMedia>
            </LogoSection>
          </Section>

          {/* Sektion 2: Snabblänkar */}
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

          {/* Sektion 3: Kontakt */}
          <Section>
            <h4>تواصل معنا</h4>
            <ContactItem>
              <FaPhone /> <span>015-6778610</span>
            </ContactItem>
            <ContactItem>
              <FaEnvelope /> <span>info@daraa-blood.sy</span>
            </ContactItem>
          </Section>

          {/* Sektion 4: Öppettider */}
          <Section>
            <h4>أوقات العمل</h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <p style={{ color: "#94a3b8", margin: 0 }}>
                الأحد - الخميس: 8ص - 2م
              </p>
              <p style={{ color: "#ef4444", fontWeight: "bold", margin: 0 }}>
                الجمعة والسبت: عطلة
              </p>
            </div>
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
