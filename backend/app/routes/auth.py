from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Admin
from app.middleware.auth import verificar_senha, hash_senha, criar_token
from app.config import get_settings
from pydantic import BaseModel

router = APIRouter()
settings = get_settings()

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/login", response_model=Token)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == form.username).first()
    
    if not admin or not verificar_senha(form.password, admin.senha_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = criar_token(data={"sub": admin.email})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/setup")
def setup_admin(db: Session = Depends(get_db)):
    """Cria o admin inicial — rode apenas uma vez!"""
    existe = db.query(Admin).first()
    if existe:
        raise HTTPException(status_code=400, detail="Admin já existe!")
    
    admin = Admin(
        email=settings.admin_email,
        senha_hash=hash_senha(settings.admin_password)
    )
    db.add(admin)
    db.commit()
    return {"message": "Admin criado com sucesso! 🎉"}