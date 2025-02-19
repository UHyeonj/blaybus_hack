import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import location from "./../assets/location.svg";
import "../styles/DesignerList.css";
import FilterModal from "../components/FilterModal";

function DesignerList() {
  const navigate = useNavigate();
  const { type } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [designers, setDesigners] = useState([]);
  const [filter, setFilter] = useState({
    type: "대면",
    region: "서울 전체",
    minPrice: 0,
    maxPrice: 100000,
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

  // 필터링된 디자이너 목록을 반환하는 함수
  const getFilteredDesigners = () => {
    return designers.filter((designer) => {
      // 지역 필터링
      if (filter.region !== "서울 전체" && designer.area !== filter.region) {
        return false;
      }

      // 가격 필터링
      const price = filter.type === "대면" ? designer.price.offline : designer.price.online;
      if (price < filter.minPrice || price > filter.maxPrice) {
        return false;
      }

      return true;
    });
  };

  const handleDesignerSelect = (designerId) => {
    navigate(`/designer/${type}/${designerId}`);
  };

  const headerText =
    type === "offline"
      ? "대면 디자이너 검색"
      : "비대면 디자이너 검색";

  // 필터 적용 핸들러
  const handleApplyFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="designer-list-container">
      <Header text={headerText} onApplyFilter={handleApplyFilter} />
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilter}
        initialFilter={filter}
      />
      <div className="designer-grid">
        {getFilteredDesigners().map((designer) => (
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
