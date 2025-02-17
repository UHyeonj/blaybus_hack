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
import Header from "../components/Header";

// 공통 계좌 정보
const COMPANY_ACCOUNT = {
  account: "신한은행 110-123-456789",
  accountHolder: "Bliss(김아정)",
};

const accesstoken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("access_token="))
  ?.split("=")[1]
  ?.trim(); // 앞뒤 공백 제거

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

  // 카카오페이 결제 준비
  const handleKakaoPayment = async (reservationId) => {
    try {
      const response = await fetch(
        "https://blaybus-glowup.com/payment/kakao/ready",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accesstoken}`,
          },
          body: JSON.stringify({
            reservationId: reservationId,
            amount:
              type === "offline"
                ? designer.price.offline
                : designer.price.online,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("카카오페이 결제 준비에 실패했습니다");
      }

      const paymentData = await response.json();
      window.location.href = paymentData.next_redirect_pc_url;
    } catch (error) {
      console.error("카카오페이 결제 처리 중 오류:", error);
      alert("카카오페이 결제 처리 중 오류가 발생했습니다");
    }
  };

  // 카카오페이 결제 승인
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pgToken = urlParams.get("pg_token");

    if (pgToken) {
      const approveKakaoPayment = async () => {
        try {
          const response = await fetch(
            "https://blaybus-glowup.com/payment/kakao/success",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accesstoken}`,
              },
              body: JSON.stringify({
                pgToken,
                reservationId: reservationId,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("결제 승인에 실패했습니다.");
          }

          const data = await response.json();
          alert("결제가 완료되었습니다!");
          setShowConfirmModal(true);
        } catch (error) {
          console.error("결제 승인 중 오류 발생:", error);
          alert("결제 승인 중 오류가 발생했습니다.");
        }
      };

      approveKakaoPayment();
    }
  }, []);

  // 카카오페이 결제 실패
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentFailed = urlParams.get("fail");

    if (paymentFailed) {
      const handlePaymentFailure = async () => {
        try {
          const response = await fetch(
            "https://blaybus-glowup.com/payment/kakao/fail",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accesstoken}`,
              },
              body: JSON.stringify({
                reservationId: reservationId,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("결제 실패 처리 중 오류가 발생했습니다.");
          }

          alert("결제가 실패했습니다. 다시 시도해주세요.");
        } catch (error) {
          console.error("결제 실패 처리 중 오류 발생:", error);
          alert("결제 실패 처리 중 오류가 발생했습니다.");
        }
      };

      handlePaymentFailure();
    }
  }, []);

  // 카카오페이 결제 취소
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentCancelled = urlParams.get("cancel");

    if (paymentCancelled) {
      const handlePaymentCancellation = async () => {
        try {
          const response = await fetch(
            "https://blaybus-glowup.com/payment/kakao/cancel",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accesstoken}`,
              },
              body: JSON.stringify({
                reservationId: reservationId,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("결제 취소 처리 중 오류가 발생했습니다.");
          }

          alert("결제가 취소되었습니다.");
        } catch (error) {
          console.error("결제 취소 처리 중 오류 발생:", error);
          alert("결제 취소 처리 중 오류가 발생했습니다.");
        }
      };

      handlePaymentCancellation();
    }
  }, []);

  // Google Meet 링크 생성 함수 수정
  const createGoogleMeetEvent = async (reservationId) => {
    try {
      const token = accesstoken;
      const response = await fetch(
        "https://blaybus-glowup.com/api/google-calendar/create-event-with-meeting",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reservationId: reservationId,
            summary: `컨설팅 예약 - ${designer.name}`,
            description: `화상 컨설팅\n디자이너: ${designer.name}`,
            startTime: `${
              selectedDateState.toISOString().split("T")[0]
            }T${selectedTimeState}:00`,
            endTime: `${
              selectedDateState.toISOString().split("T")[0]
            }T${parseInt(selectedTimeState.split(":")[0]) + 1}:${
              selectedTimeState.split(":")[1]
            }:00`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Google Meet 링크 생성에 실패했습니다.");
      }

      const data = await response.json();
      return data.meetLink;
    } catch (error) {
      console.error("Google Meet 링크 생성 중 오류:", error);
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDateState || !selectedTimeState) {
      alert("날짜와 시간을 모두 선택해주세요.");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    if (!paymentMethod) {
      alert("결제 방식을 선택해주세요.");
      return;
    }

    const token = accesstoken;
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      // 1. 예약 생성
      const reservationData = {
        designerId: designerId,
        meet: type === "online",
        date: selectedDateState.toISOString().split("T")[0],
        start: {
          hour: parseInt(selectedTimeState.split(":")[0]),
          minute: parseInt(selectedTimeState.split(":")[1]),
          second: 0,
          nano: 0,
        },
        end: {
          hour: parseInt(selectedTimeState.split(":")[0]) + 1,
          minute: parseInt(selectedTimeState.split(":")[1]),
          second: 0,
          nano: 0,
        },
        shop: designer.address,
        price:
          type === "offline"
            ? designer.price.offline.toString()
            : designer.price.online.toString(),
      };
      console.log(reservationData);

      const response = await fetch(
        "https://blaybus-glowup.com/reservation/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reservationData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "예약 생성에 실패했습니다."
        );
      }

      const data = await response.json();
      console.log("예약 생성 성공:", data);

      // 2. 온라인 컨설팅인 경우 구글 미팅 생성
      if (type === "online") {
        const meetLink = await createGoogleMeetEvent(
          data.reservationId
        );
        if (meetLink) {
          setGoogleMeetLink(meetLink);
        }
      }

      // 3. 결제 방식에 따른 처리
      if (paymentMethod === "kakaopay") {
        handleKakaoPayment(data.reservationId);
      } else {
        setShowPaymentModal(false);
        setShowConfirmModal(true);
      }
    } catch (error) {
      console.error("예약 생성 중 오류:", error);
      alert(error.message || "예약 생성 중 오류가 발생했습니다.");
    }
  };

  // 예약 내역 페이지로 이동하는 함수 추가
  const handleGoToReservations = async () => {
    try {
      const response = await fetch(
        "https://blaybus-glowup.com/reservation"
      );
      const data = await response.json();
      // 예약 내역 페이지로 이동하면서 데이터를 전달
      navigate("/reservations", { state: { reservations: data } });
    } catch (error) {
      console.error("예약 내역을 가져오는 데 실패했습니다.", error);
    }
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleShowPayment = () => {
    setShowPaymentModal(true);
  };

  // 토큰 확인 로직 추가 필요
  useEffect(() => {
    const token = accesstoken;
    if (!token) {
      navigate("/login");
      return;
    }
  }, []);

  if (!designer) return <div>로딩중...</div>;

  return (
    <div className="booking-confirmation-container">
      <Header text="예약 확인" />

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
                <div className="radio-circle" />
                <span>계좌이체</span>
              </button>
              <button
                className={`payment-button ${
                  paymentMethod === "kakaopay" ? "selected" : ""
                }`}
                onClick={() => handlePaymentSelect("kakaopay")}
              >
                <div className="radio-circle" />
                <span>카카오페이</span>
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
                className={`confirm-button ${
                  paymentMethod ? "active" : ""
                }`}
                onClick={handleConfirm}
              >
                결제하기
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowPaymentModal(false)}
              >
                돌아가기
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
