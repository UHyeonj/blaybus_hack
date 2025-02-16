import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as M from "../styles/MyPageStyles";
import Back from "../assets/back.png";
import Line from "../assets/line.png";
import Footer from "../components/Footer.jsx";
import HeaderReservation from "../components/HeaderReservation.jsx";

const MyPage = () => {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = (label) => {
    setSelectedButtons((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const renderButton = (label) => (
    <M.Button
      key={label}
      active={selectedButtons.includes(label)}
      onClick={() => handleButtonClick(label)}
    >
      {label}
    </M.Button>
  );

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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <M.Container>
      <HeaderReservation />
      <M.Title>
        <M.BackImage
          src={Back}
          alt="Back"
          onClick={() => navigate("/main")}
        />
        <M.TitleContent>마이페이지</M.TitleContent>
      </M.Title>
      <M.Title2>
        <M.T2T>나만의 스타일 고민</M.T2T>
        <M.T2C>
          회원님에게 딱 맞는 컨설턴트를 추천 받을 수 있어요
        </M.T2C>
      </M.Title2>
      <M.LineImage src={Line} alt="Line" />
      <M.M>
        <M.MT>모발 상태</M.MT>
        <M.MC>{hairStates.map(renderButton)}</M.MC>
        <M.MC2>
          <M.ButtonH>해당 없음</M.ButtonH>
        </M.MC2>
      </M.M>
      <M.M>
        <M.MT>머리 기장</M.MT>
        <M.MC>{hairLengths.map(renderButton)}</M.MC>
      </M.M>
      <M.M>
        <M.MT>원하는 시술</M.MT>
        <M.MC>{treatments.map(renderButton)}</M.MC>
      </M.M>
      <M.LineImage src={Line} alt="Line" />
      <M.LogoutButton onClick={handleLogout}>로그아웃</M.LogoutButton>
      <Footer />
    </M.Container>
  );
};

export default MyPage;
