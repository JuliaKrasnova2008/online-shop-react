import React, { useContext, useEffect, useState } from 'react';
import Cards from './Cards';
import { CategoryContext } from '../context/CategoryContext';
import axios from 'axios';
import Sciletons from './Sciletons';

export default function Main() {
  const [arr, setArr] = useState([])
  const [count, setCount] = useState(0);
  const { currentCateg, setCurrentCateg } = useContext(CategoryContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios.get(`https://fakestoreapi.com/products?limit=${count}`)
      .then(json => {
        setArr(json.data)
        setLoading(false)
      })
  }, [count]);

  useEffect(() => {
    setLoading(true)
    axios.get(`https://fakestoreapi.com/products/category/${currentCateg}`)
      .then(json => {
        setArr(json.data);
        setLoading(false)
      })
  }, [currentCateg]);

  const sciletons = [...new Array(4)].map(() => <Sciletons />); //так можно создать пустой массив из 8 элементов


  return (
    <div className='products'>
      <h2 className='products__main-title'>Новые модели</h2>
      <div className="select">
        <select
          className="select__control select__page"
          aria-label="Сортировка"
          onChange={(evt) => setCount(evt.target.value)}
          defaultValue={20}
        >
          <option
            value={10}
          >10</option>
          <option
            value={15}
          >15</option>
          <option
            value={20}
          >20</option>
        </select>
      </div>
      <ul className='products__list'>
        {loading ?
          sciletons
          :
          <Cards prod={arr} />
        }
      </ul>
    </div>
  )
}
