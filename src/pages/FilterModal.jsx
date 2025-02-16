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
        {/* 1. 지역 선택 */}
        <h3>지역</h3>
        <div className="filter-section">
          {[
            "서울 전체",
            "성수/건대",
            "강남/청담/압구정",
            "홍대/합정/연남",
          ].map((region) => (
            <button
              key={region}
              className={filter.region === region ? "active" : ""}
              onClick={() => setFilter({ ...filter, region })}
            >
              {region}
            </button>
          ))}
        </div>

        {/* 2. 가격 슬라이더 */}
        <h3>가격</h3>
        <div className="filter-section">
          <div className="price-inputs">
            <input
              type="number"
              value={filter.minPrice}
              onChange={(e) => 
                setFilter({
                  ...filter,
                  minPrice: Math.min(parseInt(e.target.value) || 0, filter.maxPrice)
                })
              }
              placeholder="최소 가격"
            />
            <span>~</span>
            <input
              type="number"
              value={filter.maxPrice}
              onChange={(e) => 
                setFilter({
                  ...filter,
                  maxPrice: Math.max(parseInt(e.target.value) || 0, filter.minPrice)
                })
              }
              placeholder="최대 가격"
            />
          </div>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={filter.minPrice}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  minPrice: Math.min(parseInt(e.target.value), filter.maxPrice)
                })
              }
            />
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={filter.maxPrice}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  maxPrice: Math.max(parseInt(e.target.value), filter.minPrice)
                })
              }
            />
          </div>
        </div>

        {/* 적용 버튼 */}
        <button className="apply-btn" onClick={() => {
          onApply(filter);
          onClose();
        }}>
          적용하기
        </button>

        {/* 닫기 버튼 */}
        <button className="close-btn" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
