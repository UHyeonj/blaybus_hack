import React, { useState } from "react";
import "../styles/FilterModal.css";

const FilterModal = ({ isOpen, onClose, onApply }) => {
  const [filter, setFilter] = useState({
    type: "대면",
    region: "서울 전체",
    minPrice: 0,
    maxPrice: 100000,
  });

  if (!isOpen) return null;

  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal">
        <h3>필터 설정</h3>

        {/* 1. 대면/비대면 선택 */}
        <div className="filter-section">
          {["대면", "비대면", "둘다"].map((type) => (
            <button
              key={type}
              className={filter.type === type ? "active" : ""}
              onClick={() => setFilter({ ...filter, type })}
            >
              {type}
            </button>
          ))}
        </div>

        {/* 2. 지역 선택 */}
        <h3>지역</h3>
        <div className="filter-section">
          {["서울 전체", "성수/건대", "강남/청담/압구정", "홍대/합정/연남"].map((region) => (
            <button
              key={region}
              className={filter.region === region ? "active" : ""}
              onClick={() => setFilter({ ...filter, region })}
            >
              {region}
            </button>
          ))}
        </div>

        {/* 3. 가격 슬라이더 (슬라이드 위에 input) */}
        <h3>가격</h3>
        <div className="filter-section">
          <div className="price-inputs">
            <input type="text" value={`${filter.minPrice.toLocaleString()} 원`} readOnly />
            <span>~</span>
            <input type="text" value={`${filter.maxPrice.toLocaleString()} 원`} readOnly />
          </div>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={filter.minPrice}
              onChange={(e) => setFilter({ ...filter, minPrice: parseInt(e.target.value) })}
            />
            <input
              type="range"
              min="50000"
              max="100000"
              step="1000"
              value={filter.maxPrice}
              onChange={(e) => setFilter({ ...filter, maxPrice: parseInt(e.target.value) })}
            />
          </div>
        </div>

        {/* 4. 적용 버튼 */}
        <button className="apply-btn" onClick={() => onApply(filter)}>적용하기</button>

        {/* 닫기 버튼 */}
        <button className="close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default FilterModal;
