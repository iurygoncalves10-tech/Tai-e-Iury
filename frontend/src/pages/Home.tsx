import React from 'react';
import Countdown from '../components/Countdown';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      {/* ── CAPA ── */}
      <section style={{
       height: '100dvh',
minHeight: '100svh', position: 'relative',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('/foto-casal.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          filter: 'brightness(0.55)',
        }} />

        <div style={{
          position: 'relative', zIndex: 1,
          textAlign: 'center', padding: '0 20px',
          width: '100%', maxWidth: 800,
        }}>
    

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.5rem, 10vw, 6rem)',
            fontWeight: 300, color: 'white',
            lineHeight: 1.1, marginBottom: 20,
            letterSpacing: 4,
          }}>
            Tainara & Iury
          </h1>

          <div style={{ width: 60, height: 1, background: '#c8a84b', margin: '0 auto 28px' }} />

          <Countdown dataAlvo="2026-08-19T16:00:00" />

          <div style={{
            marginTop: 32,
            display: 'flex', gap: 12,
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 20px',
          }}>
            <a href="/confirmacao" style={{
              padding: '14px 0',
              width: '100%', maxWidth: 280,
              textAlign: 'center',
              background: 'transparent', color: 'white',
border: '1px solid white',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: 2, textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 2,
            }}>
              Confirmar Presença
            </a>
            <a href="/presentes" style={{
              padding: '14px 0',
              width: '100%', maxWidth: 280,
              textAlign: 'center',
              background: 'transparent',
              border: '1px solid #c8a84b', color: '#c8a84b',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: 2, textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 2,
            }}>
              Lista de Presentes
            </a>
            <a href="/cerimonia" style={{
              padding: '14px 0',
              width: '100%', maxWidth: 280,
              textAlign: 'center',
              background: 'transparent',
              border: '1px solid white', color: 'white',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: 2, textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 2,
            }}>
              Localização
            </a>
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: 24, left: '50%',
          transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.6)',
          fontSize: '1.5rem', animation: 'bounce 2s infinite',
        }}>↓</div>
      </section>

     

      <Footer />

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
      `}</style>
    </div>
  );
};

export default Home;