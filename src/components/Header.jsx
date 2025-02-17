import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import filteringbtn from "./../assets/filteringbtn.png";
import backbtnimage from "./../assets/backbtnimage.png";
import FilterModal from "../pages/FilterModal";
import "./../styles/Header.css";

const Header = ({ text, onApplyFilter }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showFilterButton =
    location.pathname === "/consulting/offline" ||
    location.pathname === "/consulting/online";

  return (
    <div className="header">
      <div className="backbtn">
        <button onClick={() => navigate(-1)} className="backbtn">
          <img src={backbtnimage} className="backbtnimage"></img>
        </button>
      </div>
      <div className="offline-designer-choose">{text}</div>
      {showFilterButton ? (
        <div className="filter">
          <button
            className="filterbtn"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={filteringbtn}
              alt="filteringbtn"
              className="filterbtnimage"
            />
          </button>
        </div>
      ) : (
        <div className="filter-placeholder"></div>
      )}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={(filters) => {
          onApplyFilter(filters);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Header;
