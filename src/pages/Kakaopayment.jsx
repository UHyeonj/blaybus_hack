import { useNavigate } from "react-router-dom";

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

  return <button onClick={handlePaymentSuccess}>결제 완료</button>;
}

export default Kakaopayment;
