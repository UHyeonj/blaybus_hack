import { useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';

function MainPage() {
  const navigate = useNavigate();

  const handleConsultingChoice = (type) => {
    // 나중에 각 컨설팅 타입에 맞는 페이지로 이동
    navigate(`/consulting/${type}`);
  };
  console.log(document.cookie);

  return (
    <div className="main-container">
      <div className="header-actions">
        <button 
          className="view-reservations-button"
          onClick={() => navigate('/reservations')}
        >
          예약 내역
        </button>
      </div>
      <div className="consulting-options">
        <div className="option-card" onClick={() => handleConsultingChoice('offline')}>
          <div className="option-icon">👥</div>
          <h2>대면 컨설팅</h2>
          <p>전문 디자이너와 1:1로 직접 만나서 상담받으세요</p>
          <ul className="option-features">
            <li>✓ 실제 샵에 방문하여 컨설팅 진행</li>
            <li>✓ 30,000₩ 부터 시작</li>
            <li>✓ 소요시간 약 30분 진행</li>
          </ul>
          <button className="select-button">선택하기</button>
        </div>

        <div className="option-card" onClick={() => handleConsultingChoice('online')}>
          <div className="option-icon">💻</div>
          <h2>화상 컨설팅</h2>
          <p>언제 어디서나 편리하게 온라인으로 상담받으세요</p>
          <ul className="option-features">
            <li>✓ 예약 완료 후 생성되는 구글미트에서 화상으로 컨설팅 진행</li>
            <li>✓ 20,000₩ 부터 시작</li>
            <li>✓ 소요시간 약 30분 진행</li>
          </ul>
          <button className="select-button">선택하기</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage; 