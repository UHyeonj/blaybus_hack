import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import DesignerList from "./pages/DesignerList";
import BookingPage from "./pages/BookingPage";
import ReservationList from "./pages/ReservationList";
import DesignerDetail from "./pages/DesignerDetail";
import MyPage from "./pages/MyPage";
import Kakaopayment from "./pages/Kakaopayment";
import "./App.css";
//주석
console.log("의미없음");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/consulting/:type" element={<DesignerList />} />
        <Route
          path="/booking/:type/:designerId"
          element={<BookingPage />}
        />
        <Route path="/reservations" element={<ReservationList />} />
        <Route
          path="/designer/:type/:designerId"
          element={<DesignerDetail />}
        />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/Kakaopayment" element={<Kakaopayment />} />
      </Routes>
    </Router>
  );
}

export default App;
