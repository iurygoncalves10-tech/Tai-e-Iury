from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database import engine, Base
from app.routes import auth, convidados, presentes, mensagens, galeria, config
from app.config import get_settings
import os

settings = get_settings()

# Cria as tabelas se não existirem
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Site do Casamento API", version="1.0.0")

# CORS — permite o React se comunicar com o backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pasta de uploads para fotos
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Rotas
app.include_router(auth.router,       prefix="/api/auth",       tags=["Auth"])
app.include_router(convidados.router, prefix="/api/convidados", tags=["Convidados"])
app.include_router(presentes.router,  prefix="/api/presentes",  tags=["Presentes"])
app.include_router(mensagens.router,  prefix="/api/mensagens",  tags=["Mensagens"])
app.include_router(galeria.router,    prefix="/api/galeria",    tags=["Galeria"])
app.include_router(config.router,     prefix="/api/config",     tags=["Config"])

@app.get("/")
def root():
    return {"status": "API do Casamento funcionando! 💍"}