import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
