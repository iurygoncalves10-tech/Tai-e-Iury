import React, { useState } from 'react';

const Confirmacao = () => {
  const [presenca, setPresenca] = useState<'sim' | 'nao' | null>(null);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nome || !sobrenome || !presenca) return;
    setLoading(true);
    try {
      await fetch('http://localhost:8000/api/convidados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: `${nome} ${sobrenome}`,
          status: presenca === 'sim' ? 'confirmado' : 'recusado',
         num_acompanhantes: 0,
mensagem: '',
        }),
      });
      setEnviado(true);
    } catch {
      alert('Erro ao confirmar. Tente novamente.');
    }
    setLoading(false);
  };

  if (enviado) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f0f3e3',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: 24,
      }}>
        <div style={{ textAlign: 'center', maxWidth: 500 }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>
            {presenca === 'sim' ? '💍' : '🌸'}
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem', color: '#4a5a2a',
            marginBottom: 16,
          }}>
            {presenca === 'sim' ? 'Confirmado com amor!' : 'Recebemos sua resposta!'}
          </h2>
          <div style={{ width: 60, height: 1, background: '#c8a84b', margin: '0 auto 24px' }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.2rem', color: '#4a5a2a',
            lineHeight: 1.8, fontStyle: 'italic',
          }}>
            {presenca === 'sim'
              ? `Que alegria, ${nome}! Mal podemos esperar para celebrar esse momento especial com você. Até lá! 🌿`
              : `Obrigada por nos avisar, ${nome}. Sentiremos muito a sua falta, mas estaremos te abraçando de longe! 🌸`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f3e3',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '40px 20px',
    }}>
      <div style={{
        width: '100%', maxWidth: 560,
        background: 'white',
        padding: 'clamp(32px, 6vw, 56px)',
        border: '1px solid #c8a84b',
      }}>

        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
         
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 6vw, 2.8rem)',
            fontWeight: 300, color: '#4a5a2a',
            marginBottom: 16,
          }}>
            Confirmação de Presença
          </h1>
          <div style={{ width: 50, height: 1, background: '#c8a84b', margin: '0 auto 20px' }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.1rem', fontStyle: 'italic',
            color: '#6b7a3a', lineHeight: 1.8,
          }}>
            Cada presença é um presente! Nosso grande dia será ainda mais especial com você ao nosso lado. Por isso, pedimos gentilmente que confirme sua presença até o dia <strong>19 de julho de 2026</strong>. Contamos muito com você! 
          </p>
        </div>

        {/* Pergunta */}
        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.3rem', color: '#4a5a2a',
            textAlign: 'center', marginBottom: 16,
          }}>
            Podemos contar com a sua presença?
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {(['sim', 'nao'] as const).map(op => (
              <button key={op} onClick={() => setPresenca(op)} style={{
                flex: 1, padding: '14px',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.75rem', letterSpacing: 2,
                textTransform: 'uppercase', cursor: 'pointer',
                border: '1px solid #c8a84b',
                background: presenca === op ? '#6b7a3a' : 'transparent',
                color: presenca === op ? 'white' : '#4a5a2a',
                transition: 'all 0.3s',
              }}>
                {op === 'sim' ? '✓ Sim, estarei lá!' : '✗ Não poderei ir'}
              </button>
            ))}
          </div>
        </div>

        {/* Nome */}
        <div style={{ marginBottom: 20 }}>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.7rem', letterSpacing: 2,
            textTransform: 'uppercase', color: '#6b7a3a',
            marginBottom: 12,
          }}>
            Seus dados
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              placeholder="Nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              style={{
                flex: 1, padding: '12px 16px',
                border: '1px solid #d4ddb8',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.85rem', color: '#4a5a2a',
                outline: 'none', background: '#fafaf5',
              }}
            />
            <input
              placeholder="Sobrenome"
              value={sobrenome}
              onChange={e => setSobrenome(e.target.value)}
              style={{
                flex: 1, padding: '12px 16px',
                border: '1px solid #d4ddb8',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.85rem', color: '#4a5a2a',
                outline: 'none', background: '#fafaf5',
              }}
            />
          </div>
        </div>

        

        {/* Botão */}
        <button
          onClick={handleSubmit}
          disabled={!nome || !sobrenome || !presenca || loading}
          style={{
            width: '100%', padding: '16px',
            background: (!nome || !sobrenome || !presenca) ? '#d4ddb8' : '#6b7a3a',
            color: 'white', border: 'none',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.75rem', letterSpacing: 3,
            textTransform: 'uppercase', cursor: 'pointer',
            transition: 'background 0.3s',
          }}
        >
          {loading ? 'Enviando...' : 'Confirmar'}
        </button>

      </div>
    </div>
  );
};

export default Confirmacao;