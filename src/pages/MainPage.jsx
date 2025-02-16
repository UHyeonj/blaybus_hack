import { useNavigate } from "react-router-dom";
import * as M from "../styles/MainPageStyles";
import Haertz from "../assets/haertz.png";
import Users from "../assets/Users.png";
import Mirroring from "../assets/mirroring.png";
import Check from "../assets/check.png";
import Footer from "../components/Footer.jsx";
import HeaderReservation from "../components/HeaderReservation.jsx";

const MainPage = () => {
  const navigate = useNavigate();

  const handleConsultingChoice = (type) => {
    // 나중에 각 컨설팅 타입에 맞는 페이지로 이동
    navigate(`/consulting/${type}`);
  };

  return (
    <M.Container>
      <HeaderReservation />
      <M.LogoImage src={Haertz} alt="Haertz" />
      <M.Main1 onClick={() => handleConsultingChoice("offline")}>
        <M.UsersImage src={Users} alt="Users" />
        <M.Main1Content>
          실제 샵에서, <br /> 나에게 꼭 맞는 스타일 컨설팅
        </M.Main1Content>
        <M.Content1>
          <M.CheckImage src={Check} alt="Check" />
          <M.Content11>₩30,000부터 시작</M.Content11>
        </M.Content1>
        <M.Content1>
          <M.CheckImage src={Check} alt="Check" />
          <M.Content11>
            원하는 헤어샵에서 직접 컨설팅 진행
          </M.Content11>
        </M.Content1>
        <M.Button1>대면 컨설팅 예약하기</M.Button1>
      </M.Main1>
      <M.Main1 onClick={() => handleConsultingChoice("online")}>
        <M.UsersImage src={Mirroring} alt="Mirroring" />
        <M.Main1Content>
          어디서든 편하게, <br /> 전문가와 1:1 스타일 컨설팅
        </M.Main1Content>
        <M.Content1>
          <M.CheckImage src={Check} alt="Check" />
          <M.Content11>₩20,000부터 시작</M.Content11>
        </M.Content1>
        <M.Content1>
          <M.CheckImage src={Check} alt="Check" />
          <M.Content11>예약 후 구글 미트 링크 자동 생성</M.Content11>
        </M.Content1>
        <M.Button1>비대면 컨설팅 예약하기</M.Button1>
      </M.Main1>
      <M.Memo>
        컨설팅 내용은 진행 후 요약된 리포트를 통해 고객에게 전달됩니다{" "}
        <br /> 소요시간 약 30분
      </M.Memo>
      <Footer />
    </M.Container>
  );
};

export default MainPage;
