from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.models.models import Config
from app.middleware.auth import verificar_token

router = APIRouter()

class ConfigUpdate(BaseModel):
    valor: str

# GET /api/config — buscar todas as configs (público)
@router.get("/")
def listar_config(db: Session = Depends(get_db)):
    configs = db.query(Config).all()
    return {c.chave: c.valor for c in configs}

# PUT /api/config/{chave} — atualizar config (admin)
@router.put("/{chave}")
def atualizar_config(
    chave: str,
    dados: ConfigUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(verificar_token)
):
    config = db.query(Config).filter(Config.chave == chave).first()
    if config:
        config.valor = dados.valor
    else:
        config = Config(chave=chave, valor=dados.valor)
        db.add(config)
    db.commit()
    return {"message": f"Config '{chave}' atualizada com sucesso!"}

# POST /api/config/seed — popular configs iniciais (admin)
@router.post("/seed")
def seed_config(db: Session = Depends(get_db), token: str = Depends(verificar_token)):
    defaults = {
        "nome_casal": "Noivo & Noiva",
        "data_casamento": "2025-12-20T16:00:00",
        "local_cerimonia": "Igreja Nossa Senhora das Graças",
        "endereco_cerimonia": "Rua das Flores, 123 - São Luís, MA",
        "local_recepcao": "Espaço Eventos Premium",
        "endereco_recepcao": "Av. Principal, 456 - São Luís, MA",
        "chave_pix": "casamento@email.com",
        "nome_pix": "Noivo e Noiva",
        "mensagem_capa": "Juntos para sempre",
    }
    for chave, valor in defaults.items():
        existe = db.query(Config).filter(Config.chave == chave).first()
        if not existe:
            db.add(Config(chave=chave, valor=valor))
    db.commit()
    return {"message": "Configurações iniciais criadas! ✅"}