import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/ReservationList.css";

const ReservationList = () => {
  // 더미 데이터로 초기화 (대면, 비대면 각각 하나씩)
  const [reservations, setReservations] = useState([
    {
      id: 1,
      designerName: "김철수 디자이너",
      meet: false, // false는 대면
      date: "2024-02-20",
      start: {
        hour: 14,
        minute: 30,
        second: 0,
        nano: 0
      },
      price: "30000",
      shop: "서울시 강남구 테헤란로 123 4층"
    },
    {
      id: 2,
      designerName: "이영희 디자이너",
      meet: true, // true는 비대면
      date: "2024-02-22",
      start: {
        hour: 15,
        minute: 0,
        second: 0,
        nano: 0
      },
      price: "20000",
      shop: null, // 비대면은 shop 정보 없음
      meetLink: "https://meet.google.com/abc-defg-hij" // 구글 미트 링크 추가
    }
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const navigate = useNavigate();

  // 기존 useEffect는 주석 처리
  /*
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("https://blaybus-glowup.com/reservation/user", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error("예약 목록 조회에 실패했습니다.");
        }

        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("예약 목록 조회 실패:", error);
      }
    };

    fetchReservations();
  }, []);
  */

  // 예약 취소
  const handleRCancelClick = async () => {
    if (!selectedReservationId) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`https://blaybus-glowup.com/reservation/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          reservationId: selectedReservationId
        })
      });

      if (!response.ok) {
        throw new Error("예약 취소에 실패했습니다.");
      }

      alert("예약이 취소되었습니다.");
      setShowPopup(false);
      
      // 예약 목록 새로고침
      const updatedResponse = await fetch("https://blaybus-glowup.com/reservation/user", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const updatedData = await updatedResponse.json();
      setReservations(updatedData);
    } catch (error) {
      console.error("예약 취소 실패:", error);
      alert("예약 취소에 실패했습니다.");
    }
  };

  const handleCancelClick = (reservationId) => {
    setSelectedReservationId(reservationId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedReservationId(null);
  };

  return (
    <div className="reservation-container">
      <Header text="예약 내역 조회" />
      
      {reservations.length === 0 ? (
        <div className="no-reservations">
          <p>예약 내역이 없습니다.</p>
        </div>
      ) : (
        reservations.map((reservation) => (
          <div key={reservation.id} className="reservation-card">
            <div className="reservation-info">
              <div className="info-row">
                <span>디자이너</span>
                <span>{reservation.designerName}</span>
              </div>
              <div className="info-row">
                <span>컨설팅 유형</span>
                <span>{reservation.meet ? "비대면 컨설팅" : "대면 컨설팅"}</span>
              </div>
              <div className="info-row">
                <span>날짜</span>
                <span>{reservation.date}</span>
              </div>
              <div className="info-row">
                <span>시간</span>
                <span>{`${reservation.start.hour}:${String(reservation.start.minute).padStart(2, '0')}`}</span>
              </div>
              <div className="info-row">
                <span>가격</span>
                <span>{`${Number(reservation.price).toLocaleString()}원`}</span>
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
                    href={reservation.meetLink} 
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
              onClick={() => handleCancelClick(reservation.id)}
            >
              예약 취소
            </button>
          </div>
        ))
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
