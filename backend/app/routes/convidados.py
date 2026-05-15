from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from app.database import get_db
from app.models.models import Convidado
from app.middleware.auth import verificar_token

router = APIRouter()

class ConvidadoCreate(BaseModel):
    nome: str
    email: Optional[str] = None
    telefone: Optional[str] = None
    status: str
    num_acompanhantes: int = 0
    mensagem: Optional[str] = None

class ConvidadoResponse(BaseModel):
    id: int
    nome: str
    email: Optional[str]
    telefone: Optional[str]
    status: str
    num_acompanhantes: int
    mensagem: Optional[str]

    class Config:
        from_attributes = True

# POST /api/convidados — confirmar presença (público)
@router.post("/", response_model=ConvidadoResponse)
def confirmar_presenca(dados: ConvidadoCreate, db: Session = Depends(get_db)):
    if dados.status not in ["confirmado", "recusado"]:
        raise HTTPException(status_code=400, detail="Status inválido.")
    
    convidado = Convidado(**dados.model_dump())
    db.add(convidado)
    db.commit()
    db.refresh(convidado)
    return convidado

# GET /api/convidados — listar todos (admin)
@router.get("/", response_model=List[ConvidadoResponse])
def listar_convidados(db: Session = Depends(get_db), token: str = Depends(verificar_token)):
    return db.query(Convidado).order_by(Convidado.criado_em.desc()).all()

# GET /api/convidados/stats — estatísticas (admin)
@router.get("/stats")
def estatisticas(db: Session = Depends(get_db), token: str = Depends(verificar_token)):
    total = db.query(Convidado).count()
    confirmados = db.query(Convidado).filter(Convidado.status == "confirmado").count()
    recusados = db.query(Convidado).filter(Convidado.status == "recusado").count()
    pendentes = db.query(Convidado).filter(Convidado.status == "pendente").count()
    acompanhantes = db.query(Convidado).filter(Convidado.status == "confirmado").all()
    total_pessoas = sum(c.num_acompanhantes + 1 for c in acompanhantes)
    
    return {
        "total": total,
        "confirmados": confirmados,
        "recusados": recusados,
        "pendentes": pendentes,
        "total_pessoas": total_pessoas
    }

# DELETE /api/convidados/{id} — remover (admin)
@router.delete("/{id}")
def remover_convidado(id: int, db: Session = Depends(get_db), token: str = Depends(verificar_token)):
    convidado = db.query(Convidado).filter(Convidado.id == id).first()
    if not convidado:
        raise HTTPException(status_code=404, detail="Convidado não encontrado.")
    db.delete(convidado)
    db.commit()
    return {"message": "Convidado removido com sucesso!"}