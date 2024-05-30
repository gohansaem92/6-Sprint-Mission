import { useState, useEffect } from "react";
import { getItems } from "../api";
import ItemBox from "./ItemBox";
import PagenationBar from "./PagenationBar";
import "../styles/MainItemList.css";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 4;
  } else if (width < 1200) {
    return 6;
  } else {
    return 10;
  }
};

const MainItemList = () => {
  const [MainItem, setMainItem] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());

  const handleSortedChange = (e) => {
    setOrderBy(e.target.value);
  };

  const handleMainItemListLoad = async () => {
    const { list } = await getItems(orderBy, page, pageSize);
    setMainItem(list);
  };
  // 페이지 네이션 구현
  // 먼저 다음페이지 api 요청하기 요거는 nextPage 스테이트 필요하갰고 바뀌면 해당 api 요청
  // 화면 랜더링 해주기 요청되면 list 바꿔주기
  // 숫자 버튼에 핸들러 연결해주기 화살표 버튼은 지금 숫자 숫자보다 +-1 해주고 1이거나 마지막이면 조건 걸어주기
  const handlePagenation = (e) => {
    // const value = Number(e.target.value);
    // if (!isNaN(value)) {
    //   setPage(value);
    // }
    console.log(e.target.value);
    if (e.target.value === "previousPage") {
      setPage((prev) => prev - 1);
    }
    // if (e.target.value === "nextPage") {
    //   setPage((prev) => prev + 1);
    // }
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };
    window.addEventListener("resize", handleResize);

    handleMainItemListLoad();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize]);
  return (
    <section className="main-container">
      <div className="main-header">
        <h2 className="main-header-title">전체 상품</h2>
        <div className="main-header-right">
          <div className="main-item-filter">
            <form className="search-form">
              <input
                type="search"
                name="search"
                placeholder="검색할 상품을 입력해주세요"
              />
            </form>
            <a href="additem">
              <button className="search-submit">상품 등록하기</button>
            </a>
          </div>
          <select className="select-box" onChange={handleSortedChange}>
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>
      <div className="main-item-list">
        {MainItem.map((item) => {
          return <ItemBox key={item.id} item={item} />;
        })}
      </div>
      <PagenationBar onChange={handlePagenation} />
    </section>
  );
};

export default MainItemList;
