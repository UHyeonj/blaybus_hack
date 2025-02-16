import { useNavigate } from "react-router-dom";
import homebtn_blue from "./../assets/homebtn_blue.svg";
import mypagebtn_gray from "./../assets/mypagebtn_gray.svg";
import calendarbtn_gray from "./../assets/calendarbtn_gray.svg";
import "../styles/Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer">
      {/* 메인페이지 이동 */}
      <button
        className="footer-button"
        onClick={() => navigate("/main")}
      >
        <img
          src={homebtn_blue}
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
          src={mypagebtn_gray}
          alt="스타일 고민 수정"
          className="footer-icon"
          // 블리스 측에서 코딩하는 '스타일 고민'을 수정으로 이동
        />
      </button>
      <button
        className="footer-button"
        onClick={() => navigate("/reservations")}
      >
        <img
          src={calendarbtn_gray}
          alt="예약내역조회"
          className="footer-icon"
        />
      </button>
    </div>
  );
};

export default Footer;
