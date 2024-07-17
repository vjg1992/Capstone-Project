import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/login/Register';
import Home from './components/home/home';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
    );
}

export default App;
