import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Favorite from './pages/Favorite';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';

function App() {
  return (
    <div className="App">
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
