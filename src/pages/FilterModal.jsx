import React, { useState, useCallback } from "react";
import "../styles/FilterModal.css";

const FilterModal = ({ isOpen, onClose, onApply, initialFilter }) => {
  const [filter, setFilter] = useState(initialFilter);

  // 필터 변경 시마다 상태 업데이트
  const updateFilter = useCallback((updates) => {
    setFilter(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  // 지역 선택 핸들러
  const handleRegionSelect = useCallback((region) => {
    updateFilter({ region });
  }, [updateFilter]);

  // 가격 변경 핸들러
  const handlePriceChange = useCallback((type, value) => {
    const numValue = parseInt(value) || 0;
    if (type === 'min') {
      updateFilter({ 
        minPrice: Math.min(numValue, filter.maxPrice) 
      });
    } else {
      updateFilter({ 
        maxPrice: Math.max(numValue, filter.minPrice) 
      });
    }
  }, [filter.maxPrice, filter.minPrice, updateFilter]);

  // 필터 적용 핸들러
  const handleApply = useCallback(() => {
    onApply(filter);
    onClose();
  }, [filter, onApply, onClose]);

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
              onClick={() => handleRegionSelect(region)}
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
              onChange={(e) => handlePriceChange('min', e.target.value)}
              placeholder="최소 가격"
            />
            <span>~</span>
            <input
              type="number"
              value={filter.maxPrice}
              onChange={(e) => handlePriceChange('max', e.target.value)}
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
              onChange={(e) => handlePriceChange('min', e.target.value)}
            />
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={filter.maxPrice}
              onChange={(e) => handlePriceChange('max', e.target.value)}
            />
          </div>
        </div>

        {/* 적용 버튼 */}
        <button
          className="apply-btn"
          onClick={handleApply}
        >
          적용하기
        </button>

        {/* 닫기 버튼2 */}
        <button className="close-btn" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
