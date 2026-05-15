import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Presentes from './pages/Presentes';
import Confirmacao from './pages/Confirmacao';
import Galeria from './pages/Galeria';
import Cerimonia from './pages/Cerimonia';
import Mensagens from './pages/Mensagens';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/presentes" element={<Presentes />} />
        <Route path="/confirmacao" element={<Confirmacao />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/cerimonia" element={<Cerimonia />} />
        <Route path="/mensagens" element={<Mensagens />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;