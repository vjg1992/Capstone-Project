import './App.css';
import { Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Home from './components/home/Home';
import AccountInfo from './components/accountinfo/AccountInfo';
import Category from './components/Category';
import Navbar from './components/Navbar';

function App() {
  return (
      <div className="App">
    <Navbar />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/me" element={<AccountInfo />} />
        <Route path="/category/:name" element={<Category />} />
    </Routes>
    </div>
    );
}

export default App;
