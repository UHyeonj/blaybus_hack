import { useNavigate } from "react-router-dom";
import "../styles/Kakaopayment.css";

function Kakaopayment() {
  const navigate = useNavigate();

  const handlePaymentSuccess = async () => {
    const reservationId = localStorage.getItem("reservationId");
    const userId = localStorage.getItem("userId");
    const urlParams = new URLSearchParams(window.location.search);
    const pgToken = urlParams.get("pg_token");

    await fetch("https://blaybus-glowup.com/payment/kakao/success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        partnerOrderId: reservationId,
        partnerUserId: userId,
        pgToken: pgToken,
      }),
    });

    navigate("/reservations");
  };

  return (
    <div className="kakao_container">
      <div className="kakao_state_container">
        <h3>카카오페이지 결제 후</h3>
        <h3>결제 완료 버튼을 눌러주세요</h3>
      </div>
      <button className="kakao_btn" onClick={handlePaymentSuccess}>
        결제 완료
      </button>
    </div>
  );
}

export default Kakaopayment;
