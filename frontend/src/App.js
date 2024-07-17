import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Home from './components/home/home';
import AccountInfo from './components/accountinfo/AccountInfo';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/me" element={<AccountInfo />} />
    </Routes>
    );
}

export default App;
