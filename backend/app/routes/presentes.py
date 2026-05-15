from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from decimal import Decimal
from app.database import get_db
from app.models.models import Presente
from app.middleware.auth import verificar_token

router = APIRouter()

class PresenteCreate(BaseModel):
    nome: str
    descricao: Optional[str] = None
    preco: Optional[Decimal] = None
    imagem_url: Optional[str] = None
    loja_url: Optional[str] = None

class PresenteResponse(BaseModel):
    id: int
    nome: str
    descricao: Optional[str]
    preco: Optional[Decimal]
    imagem_url: Optional[str]
    loja_url: Optional[str]
    status: str
    reservado_por: Optional[str]

    class Config:
        from_attributes = True

class ReservarPresente(BaseModel):
    reservado_por: str

# GET /api/presentes — listar todos (público)
@router.get("/", response_model=List[PresenteResponse])
def listar_presentes(db: Session = Depends(get_db)):
    return db.query(Presente).order_by(Presente.criado_em.desc()).all()

# POST /api/presentes — adicionar presente (admin)
@router.post("/", response_model=PresenteResponse)
def adicionar_presente(dados: PresenteCreate, db: Session = Depends(get_db), token: str = Depends(verificar_token)):
    presente = Presente(**dados.model_dump())
    db.add(presente)
    db.commit()
    db.refresh(presente)
    return presente

# PATCH /api/presentes/{id}/reservar — reservar presente (público)
@router.patch("/{id}/reservar")
def reservar_presente(id: int, dados: ReservarPresente, db: Session = Depends(get_db)):
    presente = db.query(Presente).filter(Presente.id == id).first()
    if not presente:
        raise HTTPException(status_code=404, detail="Presente não encontrado.")
    if presente.status != "disponivel":
        raise HTTPException(status_code=400, detail="Presente já reservado!")
    
    presente.status = "reservado"
    presente.reservado_por = dados.reservado_por
    db.commit()
    return {"message": f"Presente reservado com sucesso por {dados.reservado_por}! 🎁"}

# DELETE /api/presentes/{id} — remover (admin)
@router.delete("/{id}")
def remover_presente(id: int, db: Session = Depends(get_db), token: str = Depends(verificar_token)):
    presente = db.query(Presente).filter(Presente.id == id).first()
    if not presente:
        raise HTTPException(status_code=404, detail="Presente não encontrado.")
    db.delete(presente)
    db.commit()
    return {"message": "Presente removido com sucesso!"}