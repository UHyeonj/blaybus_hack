import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReservationList.css';

function ReservationList() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  // 예약 내역 불러오기
  useEffect(() => {
    const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    // 날짜 기준으로 정렬 (최신순)
    savedReservations.sort((a, b) => new Date(b.date) - new Date(a.date));
    setReservations(savedReservations);
  }, []);

  const getStatusText = (status) => {
    const statusMap = {
      confirmed: "예약 확정",
      pending: "입금 대기",
      completed: "상담 완료",
      cancelled: "예약 취소"
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    return `status-badge ${status}`;
  };

  const handleCancelReservation = (id) => {
    if (window.confirm('예약을 취소하시겠습니까?')) {
      // 예약 상태 업데이트
      const updatedReservations = reservations.map(res => 
        res.id === id ? { ...res, status: 'cancelled' } : res
      );
      
      // localStorage 업데이트
      localStorage.setItem('reservations', JSON.stringify(updatedReservations));
      setReservations(updatedReservations);
    }
  };

  return (
    <div className="reservation-container">
      <div className="reservation-header">
        <h1 className="reservation-title">나의 예약 내역</h1>
        <button 
          className="back-to-main"
          onClick={() => navigate('/main')}
        >
          메인으로
        </button>
      </div>
      <div className="reservation-list">
        {reservations.length === 0 ? (
          <div className="no-reservations">
            <p>예약 내역이 없습니다.</p>
            <button 
              className="make-reservation-button"
              onClick={() => navigate('/main')}
            >
              예약하기
            </button>
          </div>
        ) : (
          reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-header">
                <span className={getStatusClass(reservation.status)}>
                  {getStatusText(reservation.status)}
                </span>
                <span className="reservation-date">
                  {new Date(reservation.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="reservation-details">
                <h2>{reservation.designerName}</h2>
                <p className="consultation-type">
                  {reservation.type === 'offline' ? '대면' : '화상'} 상담
                </p>
                <p className="consultation-time">
                  예약 시간: {reservation.time}
                </p>
                <p className="consultation-location">
                  {reservation.location}
                </p>
                <p className="consultation-price">
                  상담 비용: {reservation.price.toLocaleString()}원
                </p>
                {reservation.status === 'pending' && (
                  <div className="payment-details">
                    <p className="account-info">입금 계좌: {reservation.account}</p>
                    <p className="account-holder">예금주: {reservation.accountHolder}</p>
                  </div>
                )}
              </div>

              {reservation.status === 'pending' && (
                <div className="reservation-actions">
                  <button 
                    className="cancel-button"
                    onClick={() => handleCancelReservation(reservation.id)}
                  >
                    예약 취소
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReservationList; 