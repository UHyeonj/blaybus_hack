import { useNavigate, useLocation } from "react-router-dom";
import homebtn_blue from "./../assets/homebtn_blue.svg";
import homebtn_gray from "./../assets/homebtn_gray.svg";
import mypagebtn_blue from "./../assets/mypagebtn_blue.svg";
import mypagebtn_gray from "./../assets/mypagebtn_gray.svg";
import calendarbtn_blue from "./../assets/calendarbtn_blue.svg";
import calendarbtn_gray from "./../assets/calendarbtn_gray.svg";
import "../styles/Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getButtonImage = (path) => {
    if (location.pathname === "/mypage") {
      return path === "/mypage" ? mypagebtn_blue : mypagebtn_gray;
    } else if (location.pathname === "/reservations") {
      return path === "/reservations"
        ? calendarbtn_blue
        : calendarbtn_gray;
    } else {
      return path === "/main" ? homebtn_blue : homebtn_gray;
    }
  };

  const getHomeButtonImage = () => {
    return location.pathname === "/mypage" ||
      location.pathname === "/reservations"
      ? homebtn_gray
      : homebtn_blue;
  };

  return (
    <div className="footer">
      {/* 메인페이지 이동 */}
      <button
        className="footer-button"
        onClick={() => navigate("/main")}
      >
        <img
          src={getHomeButtonImage()}
          alt="홈 이동"
          className="footer-icon"
        />
      </button>
      {/* 마이페이지 이동 */}
      <button
        className="footer-button"
        onClick={() => navigate("/mypage")}
      >
        <img
          src={getButtonImage("/mypage")}
          alt="마이페이지 이동"
          className="footer-icon"
        />
      </button>
      {/* 예약내역조회 이동 */}
      <button
        className="footer-button"
        onClick={() => navigate("/reservations")}
      >
        <img
          src={getButtonImage("/reservations")}
          alt="예약내역조회"
          className="footer-icon"
        />
      </button>
    </div>
  );
};

export default Footer;
