import React, { useState, useEffect } from 'react';

interface Props {
  dataAlvo: string;
}

const Countdown: React.FC<Props> = ({ dataAlvo }) => {
  const [tempo, setTempo] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const calcular = () => {
      const diff = new Date(dataAlvo).getTime() - new Date().getTime();
      if (diff <= 0) return;
      setTempo({
        dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutos: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        segundos: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calcular();
    const interval = setInterval(calcular, 1000);
    return () => clearInterval(interval);
  }, [dataAlvo]);

  const itens = [
    { valor: tempo.dias, label: 'Dias' },
    { valor: tempo.horas, label: 'Horas' },
    { valor: tempo.minutos, label: 'Min' },
    { valor: tempo.segundos, label: 'Seg' },
  ];

  return (
    <div style={{
      display: 'flex', gap: 'clamp(12px, 4vw, 32px)',
      justifyContent: 'center', flexWrap: 'wrap',
    }}>
      {itens.map((item, i) => (
        <div key={i} style={{ textAlign: 'center', minWidth: 'clamp(50px, 15vw, 80px)' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
            fontWeight: 300, color: 'white', lineHeight: 1,
          }}>
            {String(item.valor).padStart(2, '0')}
          </div>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'clamp(0.55rem, 2vw, 0.65rem)',
            letterSpacing: 3, textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)', marginTop: 6,
          }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;