from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from app.database import get_db
from app.models.models import Mensagem
from app.middleware.auth import verificar_token

router = APIRouter()

class MensagemCreate(BaseModel):
    autor: str
    conteudo: str

class MensagemResponse(BaseModel):
    id: int
    autor: str
    conteudo: str
    aprovado: bool

    class Config:
        from_attributes = True

# POST /api/mensagens — enviar mensagem (público)
@router.post("/", response_model=MensagemResponse)
def enviar_mensagem(dados: MensagemCreate, db: Session = Depends(get_db)):
    mensagem = Mensagem(**dados.model_dump())
    db.add(mensagem)
    db.commit()
    db.refresh(mensagem)
    return mensagem

# GET /api/mensagens — listar aprovadas (público)
@router.get("/", response_model=List[MensagemResponse])
def listar_mensagens(db: Session = Depends(get_db)):
    return db.query(Mensagem).filter(Mensagem.aprovado == True).order_by(Mensagem.criado_em.desc()).all()

# GET /api/mensagens/todas — listar todas (admin)
@router.get("/todas", response_model=List[MensagemResponse])
def listar_todas(db: Session = Depends(get_db), token: str = Depends(verificar_token)):
    return db.query(Mensagem).order_by(Mensagem.criado_em.desc()).all()

# PATCH /api/mensagens/{id}/aprovar — aprovar mensagem (admin)
@router.patch("/{id}/aprovar")
def aprovar_mensagem(id: int, db: Session = Depends(get_db), token: str = Depends(verificar_token)):
    mensagem = db.query(Mensagem).filter(Mensagem.id == id).first()
    if not mensagem:
        raise HTTPException(status_code=404, detail="Mensagem não encontrada.")
    mensagem.aprovado = True
    db.commit()
    return {"message": "Mensagem aprovada! 💬"}

# DELETE /api/mensagens/{id} — remover (admin)
@router.delete("/{id}")
def remover_mensagem(id: int, db: Session = Depends(get_db), token: str = Depends(verificar_token)):
    mensagem = db.query(Mensagem).filter(Mensagem.id == id).first()
    if not mensagem:
        raise HTTPException(status_code=404, detail="Mensagem não encontrada.")
    db.delete(mensagem)
    db.commit()
    return {"message": "Mensagem removida com sucesso!"}