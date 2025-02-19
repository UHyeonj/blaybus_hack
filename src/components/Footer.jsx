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

  // 페이지별 푸터 디자인 변경
  const getButtonImage = (path, blueImage, grayImage) => {
    return location.pathname === path ? blueImage : grayImage;
  };

  return (
    <div className="footer">
      {/* 메인페이지 이동 */}
      <button
        className="footer-button"
        onClick={() => navigate("/main")}
      >
        <img
          src={getButtonImage("/main", homebtn_blue, homebtn_gray)}
          alt="홈 이동"
          className="footer-icon"
        />
      </button>
      {/* 마이페이지 이동 */}
      <button
        className="footer-button"
        onClick={() => navigate("/mypage")}
      >
        <svg
          className="footer-icon mypage"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>마이페이지</span>
      </button>
      {/* 예약내역조회 이동 */}
      <button
        className="footer-button"
        onClick={() => navigate("/reservations")}
      >
        <img
          src={getButtonImage(
            "/reservations",
            calendarbtn_blue,
            calendarbtn_gray
          )}
          alt="예약내역조회"
          className="footer-icon"
        />
      </button>
    </div>
  );
};

export default Footer;
