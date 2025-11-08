import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Management from './pages/Management';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-light">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student/:id" element={<Detail />} />
          <Route path="/management" element={<Management />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;