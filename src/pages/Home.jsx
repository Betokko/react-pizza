import { useState, useEffect } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortId, setSortId] = useState({
    name: "популярности",
    sort: "raiting",
  });

  useEffect(() => {
    const order = sortId.sort.includes('-') ? 'asc' : 'desc';
    const sortBy = sortId.sort.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    setIsLoading(true);
    fetch(
      `https://62b434d3a36f3a973d2e80f4.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    window.scroll(0, 0);
  }, [categoryId, sortId]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          id={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
        />
        <Sort id={sortId} onClickSort={(id) => setSortId(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((item) => <PizzaBlock {...item} key={item.id} />)}
      </div>
    </div>
  );
};

export default Home;
