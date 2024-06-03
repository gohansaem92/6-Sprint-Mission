import BoardItem from "@/components/BoardItem";
import DropDown from "@/components/DropDown";
import SearchForm from "@/components/SearchForm";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";

interface Article {
  id: number;
}

export default function BoardPage() {
  const [boardList, setBoardList] = useState<Article[]>([]);
  const [bestList, setBestList] = useState<Article[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("recent");

  async function getBoardList(page = 1, pageSize = 10) {
    const res = await axios.get(
      `/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`
    );
    const nextActicles: Article[] = res.data.list ?? [];
    setBoardList(nextActicles);
  }
  async function getBestList(page = 1, pageSize = 3) {
    const res = await axios.get(
      `/articles?page=${page}&pageSize=${pageSize}&orderBy=like`
    );
    const nextBestList: Article[] = res.data.list ?? [];
    setBestList(nextBestList);
  }

  useEffect(() => {
    getBoardList();
  }, [keyword, orderBy]);

  useEffect(() => {
    getBestList();
  }, []);

  return (
    <>
      <SearchForm keyword={keyword} onChangeKeyword={setKeyword} />
      <DropDown order={orderBy} onChangeOrder={setOrderBy} />
      <ul>
        {bestList.map((article) => {
          return (
            <li key={article.id}>
              <BoardItem article={article} />
              best like article
            </li>
          );
        })}
      </ul>
      <ul>
        {boardList.map((article) => {
          return (
            <li key={article.id}>
              <BoardItem article={article} />
              ------------------------------------
            </li>
          );
        })}
      </ul>
    </>
  );
}
