import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import PlayToss from './pages/PlayToss';
import PlayDice from './pages/PlayDice';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuthContext } from './context/AuthContext';
import "react-toastify/dist/ReactToastify.css";
import Profile from './pages/Profile';

function App() {

  const { currentUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path='profile' element={currentUser ? <Profile /> : <Navigate to="/login" />} />
          <Route path='play-toss' element={currentUser ? <PlayToss /> : <Navigate to="/login" />} />
          <Route path='play-dice' element={currentUser ? <PlayDice /> : <Navigate to="/login" />} />
        </Route>
        <Route path='/login' element={currentUser ? <Navigate to="/" /> : <Login />} />
        <Route path='/register' element={currentUser ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </>

  )
}

export default App
