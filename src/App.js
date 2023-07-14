import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home.jsx'; 
import Curso from './pages/Curso.jsx'; 
import Desafio from './pages/Desafio.jsx'; 
import Horario from './pages/Horario.jsx'; 
import Periodo from './pages/Periodo.jsx'; 
import Professor from './pages/Professor.jsx'; 
import Sala from './pages/Sala.jsx'; 

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Sidebar>
      <Routes>
        <Route path="/"element={<Home/>}/>
        <Route path="/curso"element={<Curso/>}/>
        <Route path="/desafio"element={<Desafio/>}/>
        <Route path="/horario"element={<Horario/>}/>
        <Route path="/periodo"element={<Periodo/>}/>
        <Route path="/professor"element={<Professor/>}/>
        <Route path="/sala"element={<Sala/>}/>
      </Routes>
      </Sidebar>
      </BrowserRouter>
    </div>
  );
};


export default App;

