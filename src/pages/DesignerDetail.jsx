import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/DesignerDetail.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

function DesignerDetail() {
  const navigate = useNavigate();
  const { type, designerId } = useParams();
  const [designer, setDesigner] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  // 오늘 날짜와 3개월 후 날짜 설정
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  // 예약 가능 시간대 생성 함수
  const generateTimeSlots = (selectedDate) => {
    const slots = {
      morning: [], // 오전
      afternoon: [] // 오후
    };
    const now = new Date();
    const selected = new Date(selectedDate);
    const isToday = selected.toDateString() === now.toDateString();
    
    // 8시부터 20시까지 30분 간격으로 시간대 생성
    for (let hour = 8; hour <= 20; hour++) {
      for (let minute of [0, 30]) {
        // 20시는 00분만 포함
        if (hour === 20 && minute === 30) continue;
        
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const timeSlot = new Date(selected.setHours(hour, minute));
        
        // 현재 시간이 지난 시간대는 제외
        if (isToday && timeSlot <= now) continue;
        
        // 오전/오후 나누기
        if (hour < 12) {
          slots.morning.push(timeString);
        } else {
          slots.afternoon.push(timeString);
        }
      }
    }
    
    return slots;
  };

  useEffect(() => {
    // 디자이너 정보 가져오기 (임시 데이터)
    const designerData = {
      1: {
        name: "이초 디자이너",
        location: "서울 강남구 압구정로79길",
        area: "강남/청담/압구정",
        specialty: "펌",
        price: { offline: 40000, online: 20000 },
        type: ["대면", "비대면"],
        description: "레드벨벳, 있지가 방문하는 샵",
        image: "https://via.placeholder.com/150",
        rating: 4.9,
        reviewCount: 156,
        career: "경력 8년",
        introduction: "안녕하세요. 고객님의 개성과 라이프스타일을 고려한 맞춤형 스타일링을 제안해드립니다.",
        reviews: [
          { id: 1, rating: 5, comment: "정말 친절하고 전문적인 상담이었어요!", date: "2024-03-15" },
          { id: 2, rating: 5, comment: "꼼꼼하게 설명해주셔서 좋았습니다.", date: "2024-03-10" }
        ]
      },
      2: {
        name: "로로 원장",
        location: "서울 마포구 어울마당로 19",
        area: "홍대/연남/합정",
        specialty: "탈염색",
        price: { offline: 40000, online: 34000 },
        type: ["대면", "비대면"],
        description: "화이트 베이지 브라운 전문",
        image: "https://via.placeholder.com/150",
        rating: 4.8,
        reviewCount: 142,
        career: "경력 10년",
        introduction: "트렌디한 스타일과 건강한 모발을 동시에 추구합니다.",
        reviews: [
          { id: 1, rating: 5, comment: "친절하고 세세하게 설명해주셨어요", date: "2024-03-14" },
          { id: 2, rating: 4, comment: "만족스러운 상담이었습니다", date: "2024-03-12" }
        ]
      },
      3: {
        name: "슈 대표원장",
        location: "서울 마포구 동교로 255",
        area: "홍대/연남/합정",
        specialty: "탈염색",
        price: { offline: 41000, online: 20000 },
        type: ["대면"],
        description: "차별화 된 탈색 & 염색 노하우 기법, 꼼꼼한 컨설팅",
        image: "https://via.placeholder.com/150",
        rating: 5.0,
        reviewCount: 189,
        career: "경력 12년",
        introduction: "건강한 두피, 모발을 위한 맞춤형 시술을 제안합니다.",
        reviews: [
          { id: 1, rating: 5, comment: "정말 전문적이에요!", date: "2024-03-13" }
        ]
      },
      4: {
        name: "랑 원장",
        location: "서울 마포구 와우산로 101",
        area: "홍대/연남/합정",
        specialty: "탈염색",
        price: { offline: 41000, online: 34000 },
        type: ["대면", "비대면"],
        description: "Customized only for you!",
        image: "https://via.placeholder.com/150",
        rating: 4.9,
        reviewCount: 167,
        career: "경력 9년",
        introduction: "고객님만의 특별한 스타일을 찾아드립니다.",
        reviews: [
          { id: 1, rating: 5, comment: "맞춤형 상담이 정말 좋았어요", date: "2024-03-15" }
        ]
      },
      5: {
        name: "히지 디자이너",
        location: "서울 성동구 왕십리로8길 3",
        area: "성수/건대",
        specialty: "펌",
        price: { offline: 31000, online: 20000 },
        type: ["비대면"],
        description: "퍼스널 맞춤형 컬러 추천",
        image: "https://via.placeholder.com/150",
        rating: 4.7,
        reviewCount: 98,
        career: "경력 5년",
        introduction: "고객님의 피부톤과 이미지에 맞는 최적의 컬러를 찾아드립니다.",
        reviews: [
          { id: 1, rating: 5, comment: "컬러 추천이 너무 좋았어요", date: "2024-03-14" }
        ]
      },
      6: {
        name: "현영 디자이너",
        location: "서울 성동구 왕십리로 106",
        area: "성수/건대",
        specialty: "탈염색",
        price: { offline: 30000, online: 34000 },
        type: ["대면", "비대면"],
        description: "편안한 분위기와 부드러운 디자인",
        image: "https://via.placeholder.com/150",
        rating: 4.8,
        reviewCount: 145,
        career: "경력 7년",
        introduction: "자연스러운 스타일링으로 일상 속 특별함을 선사합니다.",
        reviews: [
          { id: 1, rating: 5, comment: "편안한 분위기에서 상담받았어요", date: "2024-03-13" }
        ]
      },
      7: {
        name: "나나 디자이너",
        location: "서울 성동구 성수일로4길 33",
        area: "성수/건대",
        specialty: "염색",
        price: { offline: 32000, online: 34000 },
        type: ["대면"],
        description: "얼굴형 고민을 기쁨으로 바꿔드려요",
        image: "https://via.placeholder.com/150",
        rating: 4.9,
        reviewCount: 178,
        career: "경력 6년",
        introduction: "얼굴형에 맞는 최적의 스타일을 제안해드립니다.",
        reviews: [
          { id: 1, rating: 5, comment: "얼굴형에 딱 맞는 스타일 추천받았어요", date: "2024-03-12" }
        ]
      },
      8: {
        name: "이아 디자이너",
        location: "서울 성동구 성수일로6길",
        area: "성수/건대",
        specialty: "탈염색",
        price: { offline: 40000, online: 20000 },
        type: ["대면", "비대면"],
        description: "편안한 분위기, 1:1 맞춤 상담 디자인",
        image: "https://via.placeholder.com/150",
        rating: 4.8,
        reviewCount: 134,
        career: "경력 8년",
        introduction: "섬세한 상담으로 원하시는 스타일을 정확히 파악합니다.",
        reviews: [
          { id: 1, rating: 5, comment: "상세한 설명이 좋았어요", date: "2024-03-11" }
        ]
      },
      9: {
        name: "주 디자이너",
        location: "서울 성동구 왕십리로2길",
        area: "성수/건대",
        specialty: "염색",
        price: { offline: 41000, online: 34000 },
        type: ["비대면"],
        description: "작은 차이로 달라지는 나만의 특별한 분위기",
        image: "https://via.placeholder.com/150",
        rating: 4.7,
        reviewCount: 112,
        career: "경력 5년",
        introduction: "섬세한 컬러 매칭으로 새로운 이미지를 찾아드립니다.",
        reviews: [
          { id: 1, rating: 5, comment: "컬러 매칭이 정말 좋았어요", date: "2024-03-10" }
        ]
      },
      10: {
        name: "희 수석디자이너",
        location: "서울 강남구 논현로85길 43",
        area: "강남/청담/압구정",
        specialty: "탈염색",
        price: { offline: 40000, online: 34000 },
        type: ["대면", "비대면"],
        description: "가치를 높여주는 이상적인 스타일을 찾아드려요",
        image: "https://via.placeholder.com/150",
        rating: 5.0,
        reviewCount: 223,
        career: "경력 11년",
        introduction: "트렌디하면서도 지속 가능한 스타일을 제안합니다.",
        reviews: [
          { id: 1, rating: 5, comment: "최고의 상담이었습니다", date: "2024-03-15" }
        ]
      },
      11: {
        name: "시오 부원장",
        location: "서울 서초구 강남대로97길",
        area: "강남/청담/압구정",
        specialty: "염색",
        price: { offline: 30000, online: 22000 },
        type: ["대면"],
        description: "트렌디한 감성, 섬세한 손길로 새로운 모습을",
        image: "https://via.placeholder.com/150",
        rating: 4.8,
        reviewCount: 156,
        career: "경력 9년",
        introduction: "트렌드를 반영한 맞춤형 스타일링을 제안합니다.",
        reviews: [
          { id: 1, rating: 5, comment: "트렌디한 스타일 추천받았어요", date: "2024-03-14" }
        ]
      },
      12: {
        name: "휘리 원장",
        location: "서울 마포구 양화로7안길 12",
        area: "홍대/연남/합정",
        specialty: "펌",
        price: { offline: 40000, online: 20000 },
        type: ["대면", "비대면"],
        description: "대한민국 상위 1% 단발머리 전문가",
        image: "https://via.placeholder.com/150",
        rating: 5.0,
        reviewCount: 245,
        career: "경력 13년",
        introduction: "단발 스타일의 다양한 변형으로 새로운 매력을 찾아드립니다.",
        reviews: [
          { id: 1, rating: 5, comment: "단발 스타일링 최고예요!", date: "2024-03-13" }
        ]
      },
      13: {
        name: "유하 디자이너",
        location: "서울 마포구 잔다리로 48",
        area: "홍대/연남/합정",
        specialty: "염색",
        price: { offline: 34000, online: 34000 },
        type: ["대면"],
        description: "누구나 손질 가능한 디자인",
        image: "https://via.placeholder.com/150",
        rating: 4.7,
        reviewCount: 132,
        career: "경력 6년",
        introduction: "일상생활에서 쉽게 연출할 수 있는 스타일을 제안합니다.",
        reviews: [
          { id: 1, rating: 5, comment: "관리하기 쉬운 스타일 추천받았어요", date: "2024-03-12" }
        ]
      },
      14: {
        name: "은이 수석디자이너",
        location: "서울 마포구 홍익로5길",
        area: "홍대/연남/합정",
        specialty: "펌",
        price: { offline: 32000, online: 20000 },
        type: ["대면", "비대면"],
        description: "일상 속에 스며드는 아름다움, 높은 재방문률",
        image: "https://via.placeholder.com/150",
        rating: 4.9,
        reviewCount: 187,
        career: "경력 10년",
        introduction: "자연스러운 웨이브로 일상의 스타일을 업그레이드합니다.",
        reviews: [
          { id: 1, rating: 5, comment: "자연스러운 스타일링이 정말 좋아요", date: "2024-03-11" }
        ]
      },
      15: {
        name: "미미 컬러리스트",
        location: "서울 마포구 양화로 100",
        area: "서울 전체",
        specialty: "염색",
        price: { offline: 41000, online: 34000 },
        type: ["비대면"],
        description: "오로지 당신을 위한 컬러",
        image: "https://via.placeholder.com/150",
        rating: 4.8,
        reviewCount: 165,
        career: "경력 7년",
        introduction: "퍼스널 컬러를 기반으로 한 맞춤형 컬러 제안을 해드립니다.",
        reviews: [
          { id: 1, rating: 5, comment: "제 퍼스널 컬러에 딱 맞는 추천받았어요", date: "2024-03-10" }
        ]
      },
      16: {
        name: "하루 컬러리스트",
        location: "서울 마포구 홍익로 3",
        area: "서울 전체",
        specialty: "펌",
        price: { offline: 40000, online: 20000 },
        type: ["대면", "비대면"],
        description: "끊어짐, 얼룩없는 뿌리탈색, 저손상 블랙빼기 전문",
        image: "https://via.placeholder.com/150",
        rating: 4.9,
        reviewCount: 198,
        career: "경력 7년",
        introduction: "건강한 모발을 위한 맞춤형 시술을 제안합니다.",
        reviews: [
          { id: 1, rating: 5, comment: "정말 만족스러웠어요!", date: "2024-03-15" }
        ]
      }
    }[designerId];

    setDesigner(designerData);
  }, [designerId]);

  const handleBookingClick = () => {
    setShowCalendar(true);
    setCanProceed(false);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCanProceed(true);
  };

  const handleProceedBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 선택해주세요.');
      return;
    }
    navigate(`/booking/${type}/${designerId}?date=${selectedDate.toISOString()}&time=${selectedTime}`);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowCalendar(false);
      setIsClosing(false);
    }, 300);
  };

  if (!designer) return <div>로딩중...</div>;

  return (
    <div className="designer-detail-container">
      <div className="designer-profile">
        <img src={designer.image} alt={designer.name} className="designer-image" />
        <div className="designer-info">
          <h1>{designer.name}</h1>
          <p className="area">{designer.area}</p>
          <p className="specialty">전문분야: {designer.specialty}</p>
          <p className="career">{designer.career}</p>
          <div className="rating">
            <span className="stars">★</span>
            <span>{designer.rating}</span>
            <span className="review-count">({designer.reviewCount}개의 리뷰)</span>
          </div>
        </div>
      </div>

      <div className="consultation-info">
        <h2>상담 정보</h2>
        <div className="price-info">
          {type === 'offline' ? (
            <div className="price-item">
              <span>대면 상담</span>
              <span>{designer.price.offline.toLocaleString()}원</span>
            </div>
          ) : (
            <div className="price-item">
              <span>화상 상담</span>
              <span>{designer.price.online.toLocaleString()}원</span>
            </div>
          )}
        </div>
        {type === 'offline' && (
          <p className="location">위치: {designer.location}</p>
        )}
      </div>

      <div className="designer-introduction">
        <h2>디자이너 소개</h2>
        <p>{designer.introduction}</p>
        <p className="description">{designer.description}</p>
      </div>

      <div className="reviews-section">
        <h2>리뷰</h2>
        <div className="reviews-list">
          {designer.reviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <span className="review-stars">{'★'.repeat(review.rating)}</span>
                <span className="review-date">{review.date}</span>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleBookingClick} className="booking-button">
        예약하기
      </button>

      {showCalendar && (
        <div className={`calendar-modal ${isClosing ? 'closing' : ''}`}>
          <div className="modal-content">
            <h3>컨설팅 희망 날짜를 선택해 주세요</h3>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateSelect}
              inline
              locale={ko}
              minDate={minDate}
              maxDate={maxDate}
              dateFormat="yyyy.MM.dd"
              placeholderText="날짜를 선택하세요"
            />
            {selectedDate && (
              <div className="time-slots">
                <h4>컨설팅 희망 시간을 선택해 주세요</h4>
                <div className="time-section">
                  <h5>오전</h5>
                  <div className="time-grid">
                    {generateTimeSlots(selectedDate).morning.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`time-button ${selectedTime === time ? 'selected' : ''}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="time-section">
                  <h5>오후</h5>
                  <div className="time-grid">
                    {generateTimeSlots(selectedDate).afternoon.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`time-button ${selectedTime === time ? 'selected' : ''}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                {canProceed && (
                  <button 
                    onClick={handleProceedBooking}
                    className="proceed-booking-button"
                  >
                    예약 진행하기
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DesignerDetail; 