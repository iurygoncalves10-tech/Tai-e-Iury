from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Numeric
from sqlalchemy.sql import func
from app.database import Base

class Convidado(Base):
    __tablename__ = "convidados"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100))
    telefone = Column(String(20))
    status = Column(String(20), default="pendente")
    num_acompanhantes = Column(Integer, default=0)
    mensagem = Column(Text)
    criado_em = Column(DateTime, default=func.now())

class Presente(Base):
    __tablename__ = "presentes"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    descricao = Column(Text)
    preco = Column(Numeric(10, 2))
    imagem_url = Column(Text)
    loja_url = Column(Text)
    status = Column(String(20), default="disponivel")
    reservado_por = Column(String(100))
    criado_em = Column(DateTime, default=func.now())

class Mensagem(Base):
    __tablename__ = "mensagens"
    id = Column(Integer, primary_key=True, index=True)
    autor = Column(String(100), nullable=False)
    conteudo = Column(Text, nullable=False)
    aprovado = Column(Boolean, default=False)
    criado_em = Column(DateTime, default=func.now())

class Galeria(Base):
    __tablename__ = "galeria"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(Text, nullable=False)
    legenda = Column(Text)
    criado_em = Column(DateTime, default=func.now())

class Config(Base):
    __tablename__ = "config"
    chave = Column(String(50), primary_key=True)
    valor = Column(Text, nullable=False)

class Admin(Base):
    __tablename__ = "admin"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, nullable=False)
    senha_hash = Column(Text, nullable=False)
    criado_em = Column(DateTime, default=func.now())