import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import '../styles/BookingPage.css';

function BookingPage() {
  const navigate = useNavigate();
  const { type, designerId } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [timeSlots, setTimeSlots] = useState({ morning: [], afternoon: [] });
  const [designer, setDesigner] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // 디자이너 정보 가져오기
  useEffect(() => {
    // 실제로는 API 호출로 대체될 부분
    const designerData = {
      1: {
        name: "이초 디자이너",
        price: { offline: 40000, online: 20000 },
        account: "신한은행 110-123-456789",
        accountHolder: "이초"
      },
      2: {
        name: "로로 원장",
        price: { offline: 40000, online: 34000 },
        account: "국민은행 123-12-123456",
        accountHolder: "로로"
      },
      // ... 다른 디자이너 정보
    }[designerId];

    setDesigner(designerData);
  }, [designerId]);

  // 시간대 생성 (10:00 ~ 20:00, 30분 단위)
  useEffect(() => {
    const morning = [];
    const afternoon = [];
    
    for (let hour = 10; hour < 20; hour++) {
      const timeSlot1 = `${hour.toString().padStart(2, '0')}:00`;
      const timeSlot2 = `${hour.toString().padStart(2, '0')}:30`;
      
      if (hour < 12) {
        morning.push(timeSlot1, timeSlot2);
      } else {
        afternoon.push(timeSlot1, timeSlot2);
      }
    }
    setTimeSlots({ morning, afternoon });
  }, []);

  // 날짜 범위 설정 (오늘부터 3개월)
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 모두 선택해주세요.');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    const newReservation = {
      id: Date.now(),
      designerId,
      designerName: designer.name,
      type,
      date: new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000))
        .toISOString()
        .split('T')[0],
      time: selectedTime,
      price: type === 'offline' ? designer.price.offline : designer.price.online,
      status: 'pending',
      location: designer.location,
      account: designer.account,
      accountHolder: designer.accountHolder
    };

    // 기존 예약 내역 가져오기
    const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    
    // 새로운 예약 추가
    localStorage.setItem('reservations', JSON.stringify([...existingReservations, newReservation]));
    
    navigate('/main');
  };

  return (
    <div className="booking-container">
      <form onSubmit={handleSubmit} className="booking-form">
        {designer && (
          <div className="designer-info-summary">
            <h2>디자이너 정보</h2>
            <p className="designer-name">{designer.name}</p>
            <p className="consultation-price">
              상담 비용: {type === 'offline' 
                ? `${designer.price.offline.toLocaleString()}원 (대면)`
                : `${designer.price.online.toLocaleString()}원 (화상)`
              }
            </p>
          </div>
        )}

        <div className="form-group">
          <label>날짜 선택</label>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="yyyy년 MM월 dd일 (eee)"
            locale={ko}
            placeholderText="날짜를 선택해주세요"
            className="date-picker"
            required
          />
        </div>

        <div className="form-group time-selection">
          <label>시간 선택</label>
          <div className="time-grid-container">
            <div className="time-section">
              <h3>오전</h3>
              <div className="time-grid">
                {timeSlots.morning?.map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div className="time-section">
              <h3>오후</h3>
              <div className="time-grid">
                {timeSlots.afternoon?.map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="booking-summary">
          <h2>예약 정보</h2>
          {designer && (
            <>
              <p>디자이너: {designer.name}</p>
              <p>상담 유형: {type === 'offline' ? '대면' : '화상'} 상담</p>
              <p className="price-info">
                결제 금액: {type === 'offline' 
                  ? designer.price.offline.toLocaleString()
                  : designer.price.online.toLocaleString()
                }원
              </p>
            </>
          )}
          {selectedDate && (
            <p>
              날짜: {selectedDate.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              })}
            </p>
          )}
          {selectedTime && <p>시간: {selectedTime}</p>}
        </div>

        {designer && (
          <div className="payment-info">
            <h2>결제 정보</h2>
            <p className="account-info">입금 계좌: {designer.account}</p>
            <p className="account-holder">예금주: {designer.accountHolder}</p>
            <p className="payment-notice">
              * 예약 확정을 위해 상담 비용을 입금해 주세요.<br />
              * 입금자명은 예약자 성함과 동일해야 합니다.<br />
              * 예약 시간 24시간 전까지 취소 가능합니다.
            </p>
          </div>
        )}

        <button type="submit" className="booking-button">
          예약하기
        </button>
      </form>

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-popup">
            <h2>예약 확인</h2>
            <div className="confirmation-content">
              <p><strong>디자이너:</strong> {designer.name}</p>
              <p><strong>상담 유형:</strong> {type === 'offline' ? '대면' : '화상'} 상담</p>
              <p><strong>날짜:</strong> {selectedDate.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              })}</p>
              <p><strong>시간:</strong> {selectedTime}</p>
              <p><strong>결제 금액:</strong> {type === 'offline' 
                ? designer.price.offline.toLocaleString()
                : designer.price.online.toLocaleString()
              }원</p>
              <div className="payment-info-summary">
                <p><strong>입금 계좌:</strong> {designer.account}</p>
                <p><strong>예금주:</strong> {designer.accountHolder}</p>
              </div>
            </div>
            <div className="confirmation-actions">
              <button 
                type="button" 
                className="confirm-button"
                onClick={handleConfirm}
              >
                확인
              </button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setShowConfirmation(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingPage; 