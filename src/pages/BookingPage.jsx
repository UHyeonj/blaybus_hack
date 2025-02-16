import { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import "../styles/BookingPage.css";

// 공통 계좌 정보
const COMPANY_ACCOUNT = {
  account: "신한은행 110-123-456789",
  accountHolder: "Bliss(김아정)",
};

function BookingPage() {
  const navigate = useNavigate();
  const { type, designerId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = new Date(queryParams.get("date"));
  const selectedTime = queryParams.get("time");
  const [selectedDateState, setSelectedDate] = useState(selectedDate);
  const [selectedTimeState, setSelectedTime] = useState(selectedTime);
  const [timeSlots, setTimeSlots] = useState({
    morning: [],
    afternoon: [],
  });
  const [designer, setDesigner] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [googleMeetLink, setGoogleMeetLink] = useState(null);

  // 디자이너 정보 가져오기
  useEffect(() => {
    const fetchDesigner = async () => {
      try {
        const response = await fetch(
          "https://blaybus-glowup.com/designers"
        );
        const data = await response.json();
        const designerData = data.find((d) => d.id === designerId);
        setDesigner(designerData);
      } catch (error) {
        console.error("Error fetching designer:", error);
      }
    };

    fetchDesigner();
  }, [designerId]);

  // 시간대 생성 (10:00 ~ 20:00, 30분 단위)
  useEffect(() => {
    const morning = [];
    const afternoon = [];

    for (let hour = 10; hour < 20; hour++) {
      const timeSlot1 = `${hour.toString().padStart(2, "0")}:00`;
      const timeSlot2 = `${hour.toString().padStart(2, "0")}:30`;

      if (hour < 12) {
        morning.push(timeSlot1, timeSlot2);
      } else {
        afternoon.push(timeSlot1, timeSlot2);
      }
    }
    setTimeSlots({ morning, afternoon });
  }, []);

  // 오늘 날짜와 3개월 후 날짜 설정
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDateState || !selectedTimeState) {
      alert("날짜와 시간을 모두 선택해주세요.");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (!paymentMethod) {
      alert("결제 방식을 선택해주세요.");
      return;
    }

    // 화상 컨설팅일 경우 구글미트 링크 생성
    const meetLink =
      type === "online"
        ? `https://meet.google.com/haertz-${Date.now()}`
        : null;
    setGoogleMeetLink(meetLink);

    // 예약 정보 생성
    const newReservation = {
      id: Date.now(),
      designerId,
      designerName: designer.name,
      type,
      date: selectedDateState.toISOString().split("T")[0],
      time: selectedTimeState,
      price:
        type === "offline"
          ? designer.price.offline
          : designer.price.online,
      paymentMethod,
      status: paymentMethod === "account" ? "pending" : "confirmed",
      location: type === "offline" ? designer.address : "화상 컨설팅",
      account: COMPANY_ACCOUNT.account,
      accountHolder: COMPANY_ACCOUNT.accountHolder,
      googleMeetLink: meetLink,
    };

    // 로컬 스토리지에 저장
    const existingReservations = JSON.parse(
      localStorage.getItem("reservations") || "[]"
    );
    localStorage.setItem(
      "reservations",
      JSON.stringify([...existingReservations, newReservation])
    );

    // 결제 모달 닫고 확인 모달 표시
    setShowPaymentModal(false);
    setShowConfirmModal(true);
  };

  // 예약 내역 페이지로 이동하는 함수 추가
  const handleGoToReservations = () => {
    navigate("/reservations");
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleShowPayment = () => {
    setShowPaymentModal(true);
  };

  if (!designer) return <div>로딩중...</div>;

  return (
    <div className="booking-confirmation-container">
      <h2>예약 확인</h2>

      <div className="booking-info">
        <div className="info-item">
          <span>디자이너</span>
          <span>{designer.name}</span>
        </div>
        <div className="info-item">
          <span>컨설팅 유형</span>
          <span>
            {type === "offline" ? "대면 컨설팅" : "화상 컨설팅"}
          </span>
        </div>
        <div className="info-item">
          <span>날짜</span>
          <span>{selectedDateState.toLocaleDateString()}</span>
        </div>
        <div className="info-item">
          <span>시간</span>
          <span>{selectedTimeState}</span>
        </div>
        <div className="info-item">
          <span>가격</span>
          <span>
            {(type === "offline"
              ? designer.price.offline
              : designer.price.online
            ).toLocaleString()}
            원
          </span>
        </div>
        {type === "offline" && (
          <div className="info-item">
            <span>컨설팅 위치</span>
            <span>{designer.address}</span>
          </div>
        )}
      </div>

      <button
        className="show-payment-button"
        onClick={handleShowPayment}
      >
        결제하기
      </button>

      {showPaymentModal && (
        <div className="payment-modal">
          <div className="payment-content">
            <h3>결제 방식 선택</h3>
            <div className="payment-methods">
              <button
                className={`payment-button ${
                  paymentMethod === "account" ? "selected" : ""
                }`}
                onClick={() => handlePaymentSelect("account")}
              >
                계좌이체
              </button>
              <button
                className={`payment-button ${
                  paymentMethod === "kakaopay" ? "selected" : ""
                }`}
                onClick={() => handlePaymentSelect("kakaopay")}
              >
                카카오페이
              </button>
            </div>

            {paymentMethod === "account" && (
              <div className="account-info">
                <p>입금 계좌: {COMPANY_ACCOUNT.account}</p>
                <p>예금주: {COMPANY_ACCOUNT.accountHolder}</p>
              </div>
            )}

            <div className="payment-actions">
              <button
                className="cancel-button"
                onClick={() => setShowPaymentModal(false)}
              >
                이전으로
              </button>
              <button
                className="confirm-button"
                onClick={handleConfirm}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="confirm-modal">
          <div className="confirm-content">
            <div className="confirm-icon">✓</div>
            <h3>
              {paymentMethod === "account"
                ? "입금 확인 후 예약이 확정됩니다"
                : "예약이 완료되었습니다!"}
            </h3>
            <div className="confirm-details">
              <div className="confirm-detail-item">
                <span>디자이너</span>
                <span>{designer.name}</span>
              </div>
              <div className="confirm-detail-item">
                <span>컨설팅 유형</span>
                <span>
                  {type === "offline" ? "대면 컨설팅" : "화상 컨설팅"}
                </span>
              </div>
              {type === "offline" && (
                <div className="confirm-detail-item">
                  <span>컨설팅 위치</span>
                  <span>{designer.address}</span>
                </div>
              )}
              <div className="confirm-detail-item">
                <span>날짜</span>
                <span>{selectedDateState.toLocaleDateString()}</span>
              </div>
              <div className="confirm-detail-item">
                <span>시간</span>
                <span>{selectedTimeState}</span>
              </div>
              <div className="confirm-detail-item">
                <span>결제 금액</span>
                <span>
                  {(type === "offline"
                    ? designer.price.offline
                    : designer.price.online
                  ).toLocaleString()}
                  원
                </span>
              </div>
              {paymentMethod === "account" ? (
                <>
                  <div className="confirm-detail-item">
                    <span>입금 계좌</span>
                    <span>{COMPANY_ACCOUNT.account}</span>
                  </div>
                  <div className="confirm-detail-item">
                    <span>예금주</span>
                    <span>{COMPANY_ACCOUNT.accountHolder}</span>
                  </div>
                </>
              ) : (
                type === "online" &&
                googleMeetLink && (
                  <div className="confirm-detail-item">
                    <span>화상 미팅 링크</span>
                    <a
                      href={googleMeetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="google-meet-link"
                    >
                      구글 미팅 참여하기
                    </a>
                  </div>
                )
              )}
            </div>
            <div className="confirm-actions">
              <button
                className="go-to-reservations"
                onClick={handleGoToReservations}
              >
                예약 내역 확인하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingPage;
