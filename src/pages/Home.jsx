import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import qs from 'qs'

import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setCurrenPage } from '../redux/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortId = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage)
  
  useEffect(() => {
    const order = sortId.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortId.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const fetchData = async () => await axios.get(`https://62b434d3a36f3a973d2e80f4.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`)
    setIsLoading(true);
    const setPizzas = async () => {
      try {
        const res = await fetchData()
        setItems(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    setPizzas()
      

    window.scroll(0, 0);
  }, [categoryId, sortId, searchValue, currentPage]);

  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortId.sortProperty,
      categoryId,
      currentPage,
    })
    console.log(queryString)
  }, [categoryId, sortId, searchValue, currentPage])

  const pizzas = items
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item) => <PizzaBlock {...item} key={item.id} />);
  const skeleton = [...new Array(8)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          id={categoryId}
          onClickCategory={(id) => dispatch(setCategory(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={(num) => dispatch(setCurrenPage(num))} />
    </div>
  );
};

export default Home;
