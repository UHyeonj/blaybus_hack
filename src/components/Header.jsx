import { useState } from "react";
import filteringbtn from "./../assets/filteringbtn.png";
import backbtnimage from "./../assets/backbtnimage.png";
import FilterModal from "../pages/FilterModal"; // 모달 추가
import "./../styles/Header.css";

const Header = ({ text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="header">
        <div className="backbtn">
          <button className="backbtn">
            <img src={backbtnimage} className="backbtnimage" alt="뒤로가기"></img>
          </button>
        </div>

        <div className="offline-designer-choose">{text}</div>

        <div className="filter">
          <button className="filterbtn" onClick={() => setIsModalOpen(true)}>
            <img src={filteringbtn} alt="필터 버튼" className="filterbtnimage" />
          </button>
        </div>
      </div>

      {/* 필터 모달 */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={(filters) => {
          console.log("적용된 필터:", filters);
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default Header;
