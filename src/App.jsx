import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import DesignerList from './pages/DesignerList';
import BookingPage from './pages/BookingPage';
import ReservationList from './pages/ReservationList';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/consulting/:type" element={<DesignerList />} />
        <Route path="/booking/:type/:designerId" element={<BookingPage />} />
        <Route path="/reservations" element={<ReservationList />} />
      </Routes>
    </Router>
  );
}

export default App;
