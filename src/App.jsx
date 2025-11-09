import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import Report from './pages/Report';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee/:id" element={<Detail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/reports" element={<Report />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;