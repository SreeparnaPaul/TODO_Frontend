import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Navbar/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
