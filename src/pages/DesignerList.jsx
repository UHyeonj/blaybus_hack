import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import location from "./../assets/location.svg";
import "../styles/DesignerList.css";
import FilterModal from "../pages/FilterModal";

function DesignerList() {
  const navigate = useNavigate();
  const { type } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [designers, setDesigners] = useState([]);
  const [filteredDesigners, setFilteredDesigners] = useState([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState({
    type: "대면",
    region: "서울 전체",
    minPrice: 0,
    maxPrice: 200000,
  });

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const response = await fetch(
          "https://blaybus-glowup.com/designers"
        );
        const data = await response.json();
        setDesigners(data);
      } catch (err) {
        console.log("Error fetching desingers: ", err);
      }
    };
    fetchDesigners();
  }, []);

  // 필터 적용 함수 수정
  const applyFilters = useCallback((filter) => {
    setFilteredDesigners(designers.filter((designer) => {
      // 지역 필터
      const regionMatch = 
        filter.region === "서울 전체" || 
        designer.address.includes(filter.region);

      // 가격 필터 (대면/비대면 구분)
      const price = filter.type === "대면" ? 
        designer.price.offline : 
        designer.price.online;
      
      const priceMatch = 
        price >= filter.minPrice && 
        price <= filter.maxPrice;

      // 모든 조건을 만족해야 함
      return regionMatch && priceMatch;
    }));
  }, [designers]);

  // 필터 적용 핸들러
  const handleFilterApply = useCallback((newFilter) => {
    setCurrentFilter(newFilter);
    applyFilters(newFilter);
  }, [applyFilters]);

  // 초기 데이터 로드 시 필터 적용
  useEffect(() => {
    if (designers.length > 0) {
      applyFilters(currentFilter);
    }
  }, [designers, currentFilter, applyFilters]);

  const handleDesignerSelect = (designerId) => {
    navigate(`/designer/${type}/${designerId}`);
  };

  const headerText =
    type === "offline"
      ? "대면 디자이너 검색"
      : "비대면 디자이너 검색";

  return (
    <div className="designer-list-container">
      <Header text={headerText} onApplyFilter={handleFilterApply} />
      <FilterModal 
        isOpen={filterModalOpen} 
        onClose={() => setFilterModalOpen(false)}
        onApply={handleFilterApply}
        initialFilter={currentFilter}
      />
      <div className="designer-grid">
        {filteredDesigners.map((designer) => (
          <div
            key={designer.id}
            className="designer-card"
            onClick={() => handleDesignerSelect(designer.id)}
          >
            <div className="designerlist-info">
              <img
                src={designer.profile}
                alt={designer.name}
                className="designerlist-profile"
              />
              <div className="designerlist-text">
                <h2>{designer.name}</h2>
                <p className="designerlist-region">
                  <img src={location} alt="location icon" />
                  {designer.region}
                  <span className="designerlist-field" data-field={designer.field}>
                    {designer.field}
                  </span>
                </p>
                <p className="introduction">{`# ${designer.introduction}`}</p>
              </div>
              <button className="select-reserve-button">
                예약하기
              </button>
            </div>
            <div className="designerlist-portfolio">
              {designer.portfolios.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${designer.name} 포트폴리오 ${index + 1}`}
                  className="portfolio-image"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DesignerList;
