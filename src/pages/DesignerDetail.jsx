import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/DesignerDetail.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

import location from "./../assets/location.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";

function DesignerDetail() {
  const navigate = useNavigate();
  const { type, designerId } = useParams();
  const [designer, setDesigner] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [availableTimes, setAvailableTimes] = useState({
    morning: [],
    afternoon: [],
  });

  console.log("기능 완성");
  // 오늘 날짜와 3개월 후 날짜 설정
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  // 예약 가능 시간대 생성 함수
  const generateTimeSlots = async (selectedDate) => {
    const slots = {
      morning: [], // 오전
      afternoon: [], // 오후
    };
    const now = new Date();
    const selected = new Date(selectedDate);
    const isToday = selected.toDateString() === now.toDateString();

    selected.setDate(selected.getDate() + 1);

    // selectedDate를 YYYY-MM-DD 형식으로 변환
    const formattedDate = selected.toISOString().split("T")[0];

    // 콘솔 확인
    console.log(`selectedDate : ${selectedDate}`);
    console.log(`selected (1일 더한 후) : ${selected}`);
    console.log(`formattedDate : ${formattedDate}`);

    try {
      const response = await fetch(
        `https://blaybus-glowup.com/reservation/available?date=${formattedDate}&designerId=${designerId}`
      );
      const data = await response.json();
      const availableTimes = data.availableTimes;

      console.log(data);

      if (!availableTimes) {
        console.log("No available times returned from API");
        return;
      }

      // 10시부터 20시까지 30분 간격으로 시간대 생성
      for (let hour = 10; hour <= 20; hour++) {
        for (let minute of [0, 30]) {
          // 20시는 00분만 포함
          if (hour === 20 && minute === 30) continue;

          const timeString = `${hour
            .toString()
            .padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
          const timeSlot = new Date(selected.setHours(hour, minute));

          // 현재 시간이 지난 시간대는 제외
          if (isToday && timeSlot <= now) continue;

          // 예약 가능한 시간대만 포함
          if (!availableTimes.includes(timeString)) continue;

          // 오전/오후 나누기
          if (hour < 12) {
            slots.morning.push(timeString);
          } else {
            slots.afternoon.push(timeString);
          }
        }
      }
    } catch (err) {
      console.log("Error fetching available times: ", err);
    }

    setAvailableTimes(slots);
  };

  useEffect(() => {
    const fetchDesigner = async () => {
      try {
        const response = await fetch(
          "https://blaybus-glowup.com/designers"
        );
        const data = await response.json();
        const designerData = data.find((d) => d.id === designerId);
        setDesigner(designerData);
      } catch (err) {
        console.log("Error fetching designer: ", err);
      }
    };
    fetchDesigner();
  }, [designerId]);

  const handleBookingClick = () => {
    setShowCalendar(true);
    setCanProceed(false);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    generateTimeSlots(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCanProceed(true);
  };

  const handleProceedBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 선택해주세요.");
      return;
    }
    navigate(
      `/booking/${type}/${designerId}?date=${selectedDate.toISOString()}&time=${selectedTime}`
    );
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!designer) return <div>로딩중...</div>;

  return (
    <div className="designer-detail-container">
      <Header text={"컨설팅 예약"} />
      <div className="designer-reserve-page">
        <div className="designer-profile">
          <img
            src={designer.profile}
            alt={designer.name}
            className="designer-detail-image"
          />
          <div className="designer-info">
            <p className="specialty" data-field={designer.field}>
              {designer.field}
            </p>
            <h1>{designer.name}</h1>
            <p className="area">
              <img src={location} alt="location icon" />
              {designer.region}
            </p>
          </div>
          <div className="blank"></div>
        </div>
        <div className="designer-introduction">
          <p>{designer.introduction}</p>
          <p className="description">{designer.description}</p>
        </div>

        <div className="consultation-info">
          <h2>컨설팅 정보</h2>
          <div className="price-info">
            {type === "offline" ? (
              <div className="price-item">
                <span>대면 컨설팅</span>
                <span>
                  {designer.price.offline.toLocaleString()}원
                </span>
              </div>
            ) : (
              <div className="price-item">
                <span>비대면 컨설팅</span>
                <span>
                  {designer.price.online.toLocaleString()}원
                </span>
              </div>
            )}
          </div>
          {type === "offline" && (
            <p className="location">위치: {designer.address}</p>
          )}
        </div>

        <div className="designer-detail-portfolio">
          <h2>Before & After</h2>
          <div className="portfolio-list">
            {designer.videos.map((video, index) => (
              <div key={index} className="portfolio-item">
                <video
                  src={video}
                  alt={`${designer.name} 포트폴리오 ${index + 1}`}
                  className="portfolio-video"
                  controls
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleBookingClick} className="booking-button">
        예약하기
      </button>
      {/* 모달 부분 */}
      {showCalendar && (
        <div
          className={`calendar-modal ${isClosing ? "closing" : ""}`}
        >
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
                    {availableTimes.morning.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`time-button ${
                          selectedTime === time ? "selected" : ""
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="time-section">
                  <h5>오후</h5>
                  <div className="time-grid">
                    {availableTimes.afternoon.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`time-button ${
                          selectedTime === time ? "selected" : ""
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleProceedBooking}
                  className={`proceed-booking-button ${
                    canProceed ? "active" : ""
                  }`}
                  disabled={!canProceed}
                >
                  예약 진행하기
                  {selectedDate && selectedTime && (
                    <span className="selected-datetime">
                      {formatDate(selectedDate)} {selectedTime}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default DesignerDetail;
