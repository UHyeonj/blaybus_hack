import { useNavigate } from "react-router-dom";
import Haertz from "../assets/haertz.svg";
import Users from "../assets/Users.svg";
import Mirroring from "../assets/mirroring.svg";
import Check from "../assets/check.svg";
import Footer from "../components/Footer";
import "../styles/MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();

  const handleConsultingChoice = (type) => {
    navigate(`/consulting/${type}`);
  };

  return (
    <div className="mainpage-container">
      <div className="mainpage-content">
        <img src={Haertz} alt="Haertz" className="logo-image" />

        <div
          className="consulting-card"
          onClick={() => handleConsultingChoice("offline")}
        >
          <img src={Users} alt="Users" className="card-image" />
          <div className="card-title">
            실제 샵에서, <br /> 나에게 꼭 맞는 스타일 컨설팅
          </div>
          <div className="check-item">
            <img src={Check} alt="Check" className="check-icon" />
            <span className="check-text">
              ₩30,000부터
              시작&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <div className="check-item">
            <img src={Check} alt="Check" className="check-icon" />
            <span className="check-text">
              원하는 헤어샵에서 직접 컨설팅 진행
            </span>
          </div>
          <button className="consulting-button">
            대면 컨설팅 예약하기
          </button>
        </div>

        <div
          className="consulting-card"
          onClick={() => handleConsultingChoice("online")}
        >
          <img
            src={Mirroring}
            alt="Mirroring"
            className="card-image"
          />
          <div className="card-title">
            어디서든 편하게, <br /> 전문가와 1:1 스타일 컨설팅
          </div>
          <div className="check-item">
            <img src={Check} alt="Check" className="check-icon" />
            <span className="check-text">
              ₩20,000부터
              시작&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <div className="check-item">
            <img src={Check} alt="Check" className="check-icon" />
            <span className="check-text">
              예약 후 구글 미트 링크 자동 생성
            </span>
          </div>
          <button className="consulting-button">
            비대면 컨설팅 예약하기
          </button>
        </div>

        <div className="memo">
          컨설팅 내용은 진행 후 요약된 리포트를 통해 고객에게
          전달됩니다
          <br /> 소요시간 약 30분
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
