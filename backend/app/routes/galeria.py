from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from app.database import get_db
from app.models.models import Galeria
from app.middleware.auth import verificar_token
import shutil
import uuid
import os

router = APIRouter()

class FotoResponse(BaseModel):
    id: int
    filename: str
    legenda: Optional[str]

    class Config:
        from_attributes = True

@router.get("/", response_model=List[FotoResponse])
def listar_fotos(db: Session = Depends(get_db)):
    return db.query(Galeria).order_by(Galeria.criado_em.desc()).all()

@router.post("/", response_model=FotoResponse)
def upload_foto(
    file: UploadFile = File(...),
    legenda: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    token: str = Depends(verificar_token)
):
    extensao = os.path.splitext(file.filename)[1]
    filename = f"{uuid.uuid4()}{extensao}"
    caminho = f"uploads/{filename}"
    with open(caminho, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    foto = Galeria(filename=filename, legenda=legenda)
    db.add(foto)
    db.commit()
    db.refresh(foto)
    return foto

@router.delete("/{id}")
def remover_foto(
    id: int,
    db: Session = Depends(get_db),
    token: str = Depends(verificar_token)
):
    foto = db.query(Galeria).filter(Galeria.id == id).first()
    if not foto:
        raise HTTPException(status_code=404, detail="Foto não encontrada.")
    caminho = f"uploads/{foto.filename}"
    if os.path.exists(caminho):
        os.remove(caminho)
    db.delete(foto)
    db.commit()
    return {"message": "Foto removida com sucesso!"}