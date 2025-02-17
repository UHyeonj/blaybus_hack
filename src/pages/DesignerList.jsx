import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import location from "./../assets/location.png";
import "../styles/DesignerList.css";
import FilterModal from "./FilterModal";

function DesignerList() {
  const navigate = useNavigate();
  const { type } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [designers, setDesigners] = useState([]);
  const [filteredDesigners, setFilteredDesigners] = useState([]);
  const [activeFilter, setActiveFilter] = useState({
    type: type,
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
        setFilteredDesigners(data);
      } catch (err) {
        console.log("Error fetching desingers: ", err);
      }
    };
    fetchDesigners();
  }, []);

  useEffect(() => {
    const filtered = designers.filter((designer) => {
      const regionMatch =
        activeFilter.region === "서울 전체" ||
        designer.region.includes(activeFilter.region.split("/")[0]);

      return regionMatch;
    });

    setFilteredDesigners(filtered);
  }, [activeFilter, designers]);

  const handleDesignerSelect = (designerId) => {
    navigate(`/designer/${type}/${designerId}`);
  };

  const headerText =
    type === "offline"
      ? "대면 디자이너 검색"
      : "비대면 디자이너 검색";

  const handleApplyFilter = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="designerlist-container">
      <Header text={headerText} onApplyFilter={handleApplyFilter} />
      <div className="designerlist-list">
        {filteredDesigners
          .filter((designer) =>
            type === "offline"
              ? designer.type.includes("대면")
              : designer.type.includes("비대면")
          )
          .map((designer) => (
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
                    <span className="designerlist-field">
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
