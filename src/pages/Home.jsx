import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs'

import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setCurrenPage, setFilters } from '../redux/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { list } from '../components/Sort';

const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isSearch = useRef(false)
  const isMounted= useRef(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortId = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage)

  const fetchPizzas = async () => {
    const order = sortId.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortId.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const fetchData = async () => await axios.get(`https://62b434d3a36f3a973d2e80f4.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`)
    try {
      setIsLoading(true);
      const res = await fetchData()
      setItems(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  // Если был первый рендер, то проверяем URL-праметры и сохраняем их в стор
  useEffect(() => {
    const data = window.location.search;
    if (data) {
      const params = qs.parse(data.slice(1))
      const sort = list.find(item => item.sortProperty === params.sortProperty)
      dispatch(setFilters({...params, sort}))
      isSearch.current = true;
    }
  }, [])
  
  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortId.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryId, sortId, searchValue, currentPage, navigate])

  // Если был первый рендер то запрашивем пиццы
  useEffect(() => {
    window.scroll(0, 0);
    if (!isSearch.current) fetchPizzas()
    isSearch.current = false;
  }, [categoryId, sortId, searchValue, currentPage]);

  const pizzas = items
  .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
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
