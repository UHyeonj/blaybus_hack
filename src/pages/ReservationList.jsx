import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/ReservationList.css";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="))
          ?.split("=")[1]
          ?.trim(); // 앞뒤 공백 제거

        if (!token) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        console.log("Token from cookie: ", token);
        const arr = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
        console.log(arr);
        const response = await fetch(
          "https://blaybus-glowup.com/reservation/user",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.log("Response status:", response.status); // 상태 코드 출력
          const errorMessage = await response.text(); // 응답 본문 출력
          console.log("Error message:", errorMessage);
          throw new Error("예약 목록 조회에 실패했습니다.");
        }

        const data = await response.json();
        console.log(response);
        console.log(data);
        setReservations(data);
      } catch (error) {
        console.error("예약 목록 조회 실패:", error);
      }
    };

    fetchReservations();
  }, [navigate]);

  // 예약 취소
  const handleRCancelClick = async () => {
    console.log(selectedReservation.id);

    if (!selectedReservation) return;

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1]
        ?.trim(); // 앞뒤 공백 제거

      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const response = await fetch(
        `https://blaybus-glowup.com/reservation?reservationId=${selectedReservation.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("예약 취소에 실패했습니다.");
      }

      alert("예약이 취소되었습니다.");
      setShowPopup(false);
      setReservations((prev) =>
        prev.filter((r) => r.id !== selectedReservation.id)
      );
    } catch (error) {
      console.error("예약 취소 실패:", error);
      alert("예약 취소에 실패했습니다.");
    }
  };

  const handleCancelClick = (reservation) => {
    setSelectedReservation(reservation);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedReservation(null);
  };

  return (
    <div className="reservation-container">
      <Header text="예약 내역 조회" />

      {reservations.length === 0 ? (
        <div className="no-reservations">
          <p>예약 내역이 없습니다.</p>
        </div>
      ) : (
        <div className="reservation-wrapper">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-info">
                <div className="info-row">
                  <span>디자이너</span>
                  <span>{reservation.designerId}</span>
                </div>
                <div className="info-row">
                  <span>컨설팅 유형</span>
                  <span>
                    {reservation.meet
                      ? "비대면 컨설팅"
                      : "대면 컨설팅"}
                  </span>
                </div>
                <div className="info-row">
                  <span>날짜</span>
                  <span>{reservation.date}</span>
                </div>
                <div className="info-row">
                  <span>시간</span>
                  <span>{`${reservation.start.slice(
                    0,
                    5
                  )} ~ ${reservation.end.slice(0, 5)}`}</span>
                </div>
                <div className="info-row">
                  <span>가격</span>
                  <span>{`${Number(
                    reservation.price
                  ).toLocaleString()}원`}</span>
                </div>
                {!reservation.meet ? (
                  <div className="info-row">
                    <span>컨설팅 위치</span>
                    <span>{reservation.shop}</span>
                  </div>
                ) : (
                  <div className="info-row">
                    <span>미팅 링크</span>
                    <a
                      href={reservation.googleMeetUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="meet-link"
                    >
                      구글 미팅 참여하기
                    </a>
                  </div>
                )}
              </div>
              <button
                className="cancel-button"
                onClick={() => handleCancelClick(reservation)}
              >
                예약 취소
              </button>
            </div>
          ))}
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>정말 취소하시겠습니까?</h3>
            <p>
              선택하신 날짜와 시간은 취소되고, <br />
              메인 화면으로 돌아갑니다.
            </p>
            <div className="popup-buttons">
              <button onClick={handleRCancelClick}>예약 취소</button>
              <button onClick={handleClosePopup}>돌아가기</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ReservationList;
