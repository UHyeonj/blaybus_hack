import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as R from "../styles/ReservationListStyles";
import Back from "../assets/back.png";
import RectangleGray from "../assets/rectanglegray.png";
import Footer from "../components/Footer.jsx";
import HeaderReservation from "../components/HeaderReservation.jsx";

axios.defaults.baseURL = "https://blaybus-glowup.com";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [meetingLink, setMeetingLink] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const tokenResponse = await axios.get("/api/oauth2/token");
        const authToken = tokenResponse.data;

        const response = await axios.get("/reservation", {
          params: { userId: "user_id" }, // userId를 실제 값으로 교체
        });
        setReservations(response.data);

        const meetingResponse = await axios.post(
          "/api/google-calendar/create-event-with-meeting",
          {
            reservationId: "reservation_id",
            userId: "user_id",
            summary: "미용실 컨설팅 예약",
            startTime: "2025-06-06T10:00:00+09:00",
            endTime: "2025-06-06T11:00:00+09:00",
          },
          { headers: { Authorization: "google_oauth_token" } }
        );

        setMeetingLink(
          meetingResponse.data.meetingLink || "링크 생성 실패"
        );
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchReservations();
  }, []);

  const handleRCancelClick = async () => {
    try {
      await axios.delete("/reservation", {
        params: { userId: "user_id" }, // 실제 userId 예약 ID 필요
      });
      alert("예약이 취소되었습니다.");
      setShowPopup(false);
    } catch (error) {
      console.error("예약 취소 실패:", error);
      alert("예약 취소에 실패했습니다.");
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleCancelClick = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <R.Container>
      <HeaderReservation />
      <R.Title>
        <R.BackImage src={Back} alt="Back" />
        <R.TitleContent>예약 내역 조회</R.TitleContent>
      </R.Title>
      <R.Title2>예약 내역</R.Title2>
      <R.Consulting>
        <R.CT>
          비대면 컨설팅은 <br /> 하단 구글 미트에서 진행됩니다
        </R.CT>
        <R.CLink
          href={meetingLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {meetingLink || "링크 생성 중..."}
        </R.CLink>
      </R.Consulting>
      <R.ConsultingContent>
        <R.D>
          <R.De>디자이너</R.De>
          <R.Des>아초 디자이너</R.Des>
          {/* <R.Des>{res.designer}</R.Des> */}
        </R.D>
        <R.C>
          <R.Co>컨설팅 유형</R.Co>
          <R.Con>비대면 컨설팅</R.Con>
          {/* <R.Con>{res.type}</R.Con> */}
        </R.C>
        <R.D2>
          <R.Da>날짜</R.Da>
          <R.Dat>2025.06.06</R.Dat>
          {/* <R.Dat>{res.date}</R.Dat> */}
        </R.D2>
        <R.T>
          <R.Ti>시간</R.Ti>
          <R.Tim>10:00</R.Tim>
          {/* <R.Tim>{res.time}</R.Tim> */}
        </R.T>
        <R.P>
          <R.Pr>가격</R.Pr>
          <R.Pri>40,000원</R.Pri>
          {/* <R.Pri>{res.price}</R.Pri> */}
        </R.P>
      </R.ConsultingContent>
      <R.Button onClick={handleCancelClick}>예약 취소</R.Button>

      {showPopup && (
        <R.PopupOverlay onClick={handleClosePopup}>
          <R.Popup>
            <R.RectangleGrayImage
              src={RectangleGray}
              alt="RectangleGray"
            />
            <R.PopupTitle>정말 취소하시겠습니까?</R.PopupTitle>
            <R.PopupText>
              선택하신 날짜와 시간은 취소되고, <br /> 메인 화면으로
              돌아갑니다.
            </R.PopupText>
            <R.PopupButtonGroup>
              <R.PopupButton primary onClick={handleRCancelClick}>
                예약 취소
              </R.PopupButton>
              <R.PopupButton onClick={handleClosePopup}>
                돌아가기
              </R.PopupButton>
            </R.PopupButtonGroup>
          </R.Popup>
        </R.PopupOverlay>
      )}
      <Footer />
    </R.Container>
  );
};

export default ReservationList;
