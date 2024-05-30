import leftArrow from "../assets/images/icons/arrow_left.svg";
import rightArrow from "../assets/images/icons/arrow_right.svg";

const PagenationBar = ({ onChange }) => {
  const handlePagenation = (e) => {
    onChange(e);
  };
  return (
    <div className="PagenationBar">
      <button value={11} onClick={handlePagenation}>
        <img src={leftArrow} alt="leftArrow" />
      </button>
      <button value={1} onClick={handlePagenation}>
        1
      </button>
      <button value={2} onClick={handlePagenation}>
        2
      </button>
      <button value={3} onClick={handlePagenation}>
        3
      </button>
      <button value="nextPage" onClick={handlePagenation}>
        <img src={rightArrow} alt="rightArrow" />
      </button>
    </div>
  );
};

export default PagenationBar;
