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

const google_oauth_token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("google_oauth_token="))
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
  const handleKakaoPayment = async (data) => {
    console.log(data);
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
            partnerOrderId: data.reservationId, // 예약 ID를 partnerOrderId로 사용
            partnerUserId: data.userId, // 사용자 ID
            itemName: "헤어 컨설팅 서비스", // 서비스명 (이 예시에서는 '헤어 컨설팅 서비스')
            totalAmount: data.price, // 결제 금액
            vatAmount: "0", // 부가세 (여기서는 0으로 설정)
            taxFreeAmount: "0", // 면세 금액 (여기서는 0으로 설정)
            approvalUrl:
              "https://uhyeon.blaybus-glowup.com/Kakaopayment", // 결제 성공 시 리디렉션 URL
            failUrl: "https://blaybus-glowup.com/payment/fail", // 결제 실패 시 리디렉션 URL
            cancelUrl: "https://blaybus-glowup.com/payment/cancel", // 결제 취소 시 리디렉션 URL
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
      const approveKakaoPayment = async (data) => {
        try {
          console.log({
            partnerOrderId: data.reservationId, // 예약 ID
            partnerUserId: data.userId, // 사용자 ID
            pgToken: pgToken, // 결제 승인 토큰
          });
          const response = await fetch(
            "https://blaybus-glowup.com/payment/kakao/success",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accesstoken}`,
              },
              body: JSON.stringify({
                partnerOrderId: data.reservationId, // 예약 ID
                partnerUserId: data.userId, // 사용자 ID
                pgToken: pgToken, // 결제 승인 토큰
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
  const createGoogleMeetEvent = async (data) => {
    try {
      console.log(data);
      const token = google_oauth_token;
      const response = await fetch(
        "https://blaybus-glowup.com/api/google-calendar/create-event-with-meeting",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            reservationId: data.reservationId,
            userId: data.userId,
            summary: `컨설팅 예약 - ${data.shop}`,
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

      const responseData = await response.json(); // 'data' 대신 'responseData'
      return responseData.meetLink; // 여기에 반환되는 링크를 설정
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

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const handleConfirm = async () => {
    if (isLoading) return;

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

    // 이미 요청 중이면 함수 실행 중단

    try {
      // 1. 예약 생성'
      setIsLoading(true); // 로딩 상태 변경
      const selectedDateString = selectedDate.toISOString(); // selectedDate를 문자열로 변환

      const reservationData = {
        designerId: designerId,
        meet: type === "online",
        date: selectedDateString.split("T")[0], // 'T' 기준으로 날짜만 추출
        start: `${selectedTimeState}:00`,
        end: (() => {
          const [hours, minutes] = selectedTimeState
            .split(":")
            .map(Number);
          const newMinutes = minutes + 30;
          const newHours = newMinutes >= 60 ? hours + 1 : hours;
          const finalMinutes =
            newMinutes >= 60 ? newMinutes - 60 : newMinutes;
          return `${newHours
            .toString()
            .padStart(2, "0")}:${finalMinutes
            .toString()
            .padStart(2, "0")}:00`;
        })(), // 시간, 분 추출
        shop: designer.address,
        method:
          paymentMethod === "kakaopay" ? "KAKAOPAY" : "BANK_TRANSFER",
        price:
          type === "offline"
            ? designer.price.offline.toString()
            : designer.price.online.toString(),
      };

      console.log(`reservationData : ${reservationData.method}`);
      console.log(`reservationDatastringify : ${reservationData}`);

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
      //로컬스토리지에 값 저장
      localStorage.setItem("reservationId", "");
      localStorage.setItem("userId", "");
      //초기화
      localStorage.setItem("reservationId", data.reservationId);
      localStorage.setItem("userId", data.userId);

      // 2. 온라인 컨설팅인 경우 구글 미팅 생성
      if (type === "online") {
        const meetLink = await createGoogleMeetEvent(data);
        if (meetLink) {
          setGoogleMeetLink(meetLink);
        }
      }

      // 3. 결제 방식에 따른 처리
      if (paymentMethod === "kakaopay") {
        console.log(data);
        handleKakaoPayment(data);
      } else {
        // 결제 방식 선택 모달 OFF
        setShowPaymentModal(false);
        setShowConfirmModal(true);
      }
    } catch (error) {
      console.error("예약 생성 중 오류:", error);
      alert(error.message || "예약 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false); // 요청 완료 후 로딩 상태 해제
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
      {!showConfirmModal ? (
        // 기존 결제 페이지
        <>
          <Header text="결제" />
          <h2 className="booking-title">예약 확인</h2>
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
            className={`confirm-button ${
              paymentMethod ? "active" : ""
            } ${isLoading ? "loading" : ""}`}
            onClick={handleConfirm}
            disabled={isLoading} // 🔹 isLoading이 true일 때 비활성화
          >
            {isLoading ? "결제 중..." : "결제하기"}
          </button>

          {showPaymentModal && (
            <div className="payment-modal">
              <div className="payment-content">
                <h3>결제 수단</h3>
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

                <div className="payment-actions">
                  <button
                    className={`confirm-button ${
                      paymentMethod ? "active" : ""
                    }`}
                    onClick={handleConfirm}
                    disabled={isLoading} // 로딩 중이면 비활성화
                  >
                    {isLoading ? "결제 중..." : "결제하기"}
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
        </>
      ) : (
        // 결제 완료 페이지
        <>
          <Header text="결제" />
          {paymentMethod === "account" ? (
            <>
              <h2 className="payment-waiting-title">입금 대기 중</h2>
              <div className="account-transfer-info">
                <span>{COMPANY_ACCOUNT.account}</span>
                <span>{COMPANY_ACCOUNT.accountHolder}</span>
              </div>
            </>
          ) : (
            <h2 className="booking-title">예약 완료</h2>
          )}
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
              <span>결제 금액</span>
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
            className="go-to-reservations"
            onClick={handleGoToReservations}
          >
            예약 내역 확인하기
          </button>
        </>
      )}
    </div>
  );
}

export default BookingPage;
