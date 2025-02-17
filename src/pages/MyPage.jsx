import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/MyPage.css";

const MyPage = () => {
  // 각 섹션별로 상태 분리
  const [hairState, setHairState] = useState([]);
  const [hairLength, setHairLength] = useState("");
  const [treatment, setTreatment] = useState([]);
  const navigate = useNavigate();

  // 모발 상태 처리 (다중 선택 가능, '해당 없음' 선택 시 다른 항목 해제)
  const handleHairStateClick = (state) => {
    if (state === "해당 없음") {
      setHairState(
        hairState.includes("해당 없음") ? [] : ["해당 없음"]
      );
    } else {
      setHairState((prev) => {
        if (prev.includes("해당 없음")) {
          return [state];
        }
        if (prev.includes(state)) {
          return prev.filter((item) => item !== state);
        }
        return [...prev, state];
      });
    }
  };

  // 머리 기장 처리 (단일 선택)
  const handleHairLengthClick = (length) => {
    setHairLength(hairLength === length ? "" : length);
  };

  // 원하는 시술 처리 (다중 선택 가능)
  const handleTreatmentClick = (selectedTreatment) => {
    setTreatment((prev) => {
      if (prev.includes(selectedTreatment)) {
        return prev.filter((item) => item !== selectedTreatment);
      }
      return [...prev, selectedTreatment];
    });
  };

  const hairStates = ["탈색", "염색", "펌", "매직", "해당 없음"];
  const hairLengths = [
    "숏컷",
    "턱선 위",
    "턱선 아래",
    "어깨선 아래",
    "가슴선 아래",
  ];
  const treatments = [
    "염색",
    "클리닉",
    "매직",
    "펌",
    "컷트",
    "드라이",
    "탈색",
    "붙임머리",
  ];

  const deleteCookie = (name, domain) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${domain};`;
  };

  const handleLogout = () => {
    const domain = window.location.hostname;
    deleteCookie("access_token", domain);
    deleteCookie("google_oauth_token", domain);
    deleteCookie("refresh_token", domain);
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="mypage-container">
      <Header text="마이페이지" />
      <div className="mypage-content">
        <div className="style-section">
          <h2 className="section-title">나만의 스타일 고민</h2>
          <p className="section-subtitle">
            회원님에게 딱 맞는 컨설턴트를 추천 받을 수 있어요
          </p>

          <div className="divider" />

          <h3 className="section-title">모발 상태</h3>
          <div className="button-group">
            {hairStates.map((state) => (
              <button
                key={state}
                className={`style-button ${
                  hairState.includes(state) ? "active" : ""
                }`}
                onClick={() => handleHairStateClick(state)}
              >
                {state}
              </button>
            ))}
          </div>

          <h3 className="section-title">머리 기장</h3>
          <div className="button-group">
            {hairLengths.map((length) => (
              <button
                key={length}
                className={`style-button ${
                  hairLength === length ? "active" : ""
                }`}
                onClick={() => handleHairLengthClick(length)}
              >
                {length}
              </button>
            ))}
          </div>

          <h3 className="section-title">원하는 시술</h3>
          <div className="button-group">
            {treatments.map((t) => (
              <button
                key={t}
                className={`style-button ${
                  treatment.includes(t) ? "active" : ""
                }`}
                onClick={() => handleTreatmentClick(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
