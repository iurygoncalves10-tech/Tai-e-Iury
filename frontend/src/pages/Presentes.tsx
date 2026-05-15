import React, { useState } from 'react';

const PIX_KEY = 'tayribeiro161@outlook.com';
const PIX_NAME = 'Tainara Cristina Ribeiro Correa';

const presentes = [
  { id: 1, nome: 'Ajude a pagar o cartão que dá até medo da fatura', preco: 250, img: '/presentes/Ajude_a_pagar_o_cart_o_d__at__medo_da_fatura_R__250_00.jpg' },
  { id: 2, nome: 'Camiseta do Vasco pra noiva sofrer junto com o noivo', preco: 190, img: '/presentes/camiseta_do_vasco_pra_noiva_sofrer_com_o_noivo_R__190_00.webp' },
  { id: 3, nome: 'Cobertor pra noiva sempre estar coberta de razão', preco: 200, img: '/presentes/Cobertor_pra_noiva_sempre_estar_cooberta_de_raz_o_R_200.jpg' },
  { id: 4, nome: 'Convidado não convida, mas pagando 2k dá certo', preco: 2000, img: '/presentes/convidado_n_o_convida__mas__pagando_2k__da_certo.jpg' },
  { id: 5, nome: 'Massagem para o noivo relaxar antes de ver a fatura', preco: 300, img: '/presentes/Massagem_para_o_noivo_300.jpg' },
  { id: 6, nome: 'Para ajudar os noivos na lua de mel', preco: 2000, img: '/presentes/Para_ajudar_na_lua_de_mel_R__2k.jpg' },
  { id: 7, nome: 'Para deixar a noiva feliz', preco: 380, img: '/presentes/Para_deixar_a_noiva_feliz_R__380.jpg' },
  { id: 8, nome: 'Para o noivo parar de sofrer pelo Vasco', preco: 4000, img: '/presentes/Para_o_noivo_parar_de_sofrer_pelo_vasco_4k.jpg' },
  { id: 9, nome: 'Para o noivo sair mais rápido do banheiro', preco: 310, img: '/presentes/Para_o_noivo_sair_mais_r_pido_do_banheiro_R__310.jpg' },
  { id: 10, nome: 'Para o noivo se defender do pau de macarrão', preco: 350, img: '/presentes/para_o_noivo_se_defender_350.png' },
  { id: 11, nome: 'Para pagar a paciência da noiva', preco: 800, img: '/presentes/Para_pagar_a_paciencia_da_noiva_800.jpg' },
  { id: 12, nome: 'Para perguntar quando vem o neném', preco: 450, img: '/presentes/Para_perguntar_quando_vem_o_beb__R__450_00.jpg' },
  { id: 13, nome: 'Patrocine o primeiro sushi dos noivos depois de casados', preco: 220, img: '/presentes/Patrocine_o_primeiro_sushi_dos_noivos_depois_de_casados_R__220_00.jpg' },
  { id: 14, nome: 'Pra não dizer que não dei nada', preco: 180, img: '/presentes/Pra_n_o_dizer_que_n_o_dei_nada_R__180_00.jpg' },
  { id: 15, nome: 'Pra noiva arrasar nos looks da lua de mel', preco: 280, img: '/presentes/Pra_noiva_arrasar_nos_lookinhos_da_lua_de_mel_R__280_00.jpg' },
  { id: 16, nome: 'Pra usar vestido branco', preco: 7000, img: '/presentes/Pra_usar_vestido_branco_R__7.000_00.jpg' },
  { id: 17, nome: 'Primeiro passeio da lua de mel', preco: 290, img: '/presentes/Primeiro_passeio_lua_de_mel_290.png' },
];

const formatPreco = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const Presentes = () => {
  const [selecionado, setSelecionado] = useState<any>(null);
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [confirmado, setConfirmado] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const copiarPix = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  const handleConfirmar = async () => {
    if (!nome) return;
    try {
      await fetch('http://localhost:8000/api/mensagens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          autor: nome,
          conteudo: `🎁 Presente: ${selecionado.nome} (${formatPreco(selecionado.preco)})\n💌 Mensagem: ${mensagem}`,
        }),
      });
    } catch {}
    setConfirmado(true);
  };

  if (confirmado) {
    return (
      <div style={{
        minHeight: '100vh', background: '#f0f3e3',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: 24,
      }}>
        <div style={{ textAlign: 'center', maxWidth: 500 }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎁</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem', color: '#4a5a2a', marginBottom: 16,
          }}>
            Que presente lindo, {nome}!
          </h2>
          <div style={{ width: 50, height: 1, background: '#c8a84b', margin: '0 auto 24px' }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.1rem', color: '#6b7a3a',
            lineHeight: 1.8, fontStyle: 'italic', marginBottom: 32,
          }}>
            Você escolheu: <strong>{selecionado.nome}</strong><br />
            Valor: <strong>{formatPreco(selecionado.preco)}</strong>
          </p>

          {/* Pix */}
          <div style={{
            background: 'white', border: '1px solid #c8a84b',
            padding: 24, marginBottom: 16,
          }}>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.7rem', letterSpacing: 3,
              textTransform: 'uppercase', color: '#c8a84b', marginBottom: 12,
            }}>
              Chave Pix
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.3rem', color: '#4a5a2a', marginBottom: 4,
            }}>
              {PIX_KEY}
            </p>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.75rem', color: '#6b7a3a', marginBottom: 16,
            }}>
              {PIX_NAME}
            </p>
            <button onClick={copiarPix} style={{
              padding: '10px 24px',
              background: copiado ? '#6b7a3a' : 'transparent',
              border: '1px solid #6b7a3a',
              color: copiado ? 'white' : '#6b7a3a',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.75rem', letterSpacing: 2,
              textTransform: 'uppercase', cursor: 'pointer',
              transition: 'all 0.3s',
            }}>
              {copiado ? '✓ Copiado!' : 'Copiar chave'}
            </button>
          </div>

          <a href="/" style={{
            display: 'inline-block', padding: '12px 32px',
            background: '#6b7a3a', color: 'white',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.75rem', letterSpacing: 2,
            textTransform: 'uppercase', textDecoration: 'none',
          }}>
            Voltar ao início
          </a>
        </div>
      </div>
    );
  }

  if (selecionado) {
    return (
      <div style={{
        minHeight: '100vh', background: '#f0f3e3',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '40px 20px',
      }}>
        <div style={{
          width: '100%', maxWidth: 500,
          background: 'white', border: '1px solid #c8a84b',
          padding: 'clamp(24px, 5vw, 48px)',
        }}>
          <img src={selecionado.img} alt={selecionado.nome} style={{
            width: '100%', height: 220,
            objectFit: 'cover', marginBottom: 24,
          }} />

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.8rem', color: '#4a5a2a',
            marginBottom: 8, textAlign: 'center',
          }}>
            {selecionado.nome}
          </h2>

          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1rem', color: '#c8a84b',
            textAlign: 'center', marginBottom: 24,
            fontWeight: 500,
          }}>
            {formatPreco(selecionado.preco)}
          </p>

          <div style={{ marginBottom: 16 }}>
            <input
              placeholder="Seu nome completo"
              value={nome}
              onChange={e => setNome(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px',
                border: '1px solid #d4ddb8',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.85rem', color: '#4a5a2a',
                outline: 'none', background: '#fafaf5',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <textarea
              placeholder="Deixe uma mensagem carinhosa para os noivos 💌"
              value={mensagem}
              onChange={e => setMensagem(e.target.value)}
              rows={4}
              style={{
                width: '100%', padding: '12px 16px',
                border: '1px solid #d4ddb8',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.85rem', color: '#4a5a2a',
                outline: 'none', background: '#fafaf5',
                resize: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          <button onClick={handleConfirmar} disabled={!nome} style={{
            width: '100%', padding: '14px',
            background: !nome ? '#d4ddb8' : '#6b7a3a',
            color: 'white', border: 'none',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.75rem', letterSpacing: 3,
            textTransform: 'uppercase', cursor: 'pointer',
            marginBottom: 12,
          }}>
            Confirmar presente
          </button>

          <button onClick={() => setSelecionado(null)} style={{
            width: '100%', padding: '14px',
            background: 'transparent',
            border: '1px solid #d4ddb8', color: '#6b7a3a',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.75rem', letterSpacing: 2,
            textTransform: 'uppercase', cursor: 'pointer',
          }}>
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f3e3', paddingBottom: 60 }}>
      <div style={{
        textAlign: 'center', padding: '60px 20px 40px',
        background: 'white', borderBottom: '1px solid #d4ddb8',
      }}>
        
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 6vw, 3rem)',
          fontWeight: 300, color: '#4a5a2a', marginBottom: 16,
        }}>
          Lista de Presentes
        </h1>
        <div style={{ width: 50, height: 1, background: '#c8a84b', margin: '0 auto 20px' }} />
       
      </div>

      <div style={{
        maxWidth: 1100, margin: '40px auto',
        padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 24,
      }}>
        {presentes.map(p => (
          <div key={p.id} style={{
            background: 'white',
            border: '1px solid #d4ddb8',
            overflow: 'hidden',
          }}>
            <img src={p.img} alt={p.nome} style={{
              width: '100%', height: 200,
              objectFit: 'cover',
            }} />
            <div style={{ padding: 16 }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1rem', color: '#4a5a2a',
                marginBottom: 8, lineHeight: 1.4,
                minHeight: 48,
              }}>
                {p.nome}
              </p>
              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.9rem', color: '#c8a84b',
                fontWeight: 500, marginBottom: 12,
              }}>
                {formatPreco(p.preco)}
              </p>
              <button onClick={() => setSelecionado(p)} style={{
                width: '100%', padding: '10px',
                background: 'transparent',
                border: '1px solid #c8a84b', color: '#4a5a2a',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.7rem', letterSpacing: 2,
                textTransform: 'uppercase', cursor: 'pointer',
                transition: 'all 0.3s',
              }}>
                Presentear
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Presentes;