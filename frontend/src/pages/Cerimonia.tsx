import React from 'react';

const Cerimonia = () => {
  const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=Santorini+Eventos+Alameda+Mearim+757+Olho+D'Agua+São+Luís+MA";

  const wazeUrl = "https://waze.com/ul?q=Santorini+Eventos+São+Luís+MA&navigate=yes";

  return (
    <div style={{ minHeight: '100vh', background: '#f0f3e3' }}>

     
      {/* Card do local */}
      <div style={{
        maxWidth: 600, margin: '40px auto',
        padding: '0 20px',
      }}>
        <div style={{
          background: 'white', border: '1px solid #d4ddb8',
          padding: '40px 32px', textAlign: 'center',
          marginBottom: 24,
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 16 }}></div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2rem', color: '#4a5a2a', marginBottom: 8,
          }}>
            Santorini Eventos
          </h2>
          <div style={{ width: 40, height: 1, background: '#c8a84b', margin: '0 auto 16px' }} />
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.85rem', color: '#6b7a3a',
            lineHeight: 1.8, marginBottom: 4,
          }}>
            Alameda Mearim, 757
          </p>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.85rem', color: '#6b7a3a',
            lineHeight: 1.8, marginBottom: 4,
          }}>
            Olho D'Água — São Luís, MA
          </p>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.85rem', color: '#6b7a3a',
            lineHeight: 1.8, marginBottom: 32,
          }}>
            CEP: 65.065-280
          </p>

          <div style={{
            background: '#f0f3e3', padding: '16px',
            marginBottom: 32, border: '1px solid #d4ddb8',
          }}>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.7rem', letterSpacing: 3,
              textTransform: 'uppercase', color: '#c8a84b', marginBottom: 8,
            }}>
              Data e Horário
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.3rem', color: '#4a5a2a',
            }}>
              19 de agosto de 2026 · 16:00h
            </p>
          </div>

          {/* Botões de rota */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href={googleMapsUrl} target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 10,
              padding: '16px', background: '#6b7a3a',
              color: 'white', textDecoration: 'none',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.8rem', letterSpacing: 2,
              textTransform: 'uppercase',
            }}>
                Abrir no Google Maps
            </a>

            <a href={wazeUrl} target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 10,
              padding: '16px', background: '#6b7a3a',
              border: '1px solid #c8a84b',
              color: 'white', textDecoration: 'none',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.8rem', letterSpacing: 2,
              textTransform: 'uppercase',
            }}>
                Abrir no Waze
            </a>

            <a href="/" style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 10,
              padding: '16px', background: '#6b7a3a',
              border: '1px solid #d4ddb8',
              color: 'white', textDecoration: 'none',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.8rem', letterSpacing: 2,
              textTransform: 'uppercase',
            }}>
              ← Voltar ao início
            </a>
          </div>
        </div>

        {/* Mapa incorporado */}
        <div style={{ border: '1px solid #d4ddb8', overflow: 'hidden' }}>
          <iframe
            title="Santorini Eventos"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.1!2d-44.2833!3d-2.5297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7f68fbf3b3b3b3b%3A0x0!2sSantorini+Eventos!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="300"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Cerimonia;