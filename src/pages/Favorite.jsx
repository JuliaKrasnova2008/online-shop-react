import React, { useEffect, useState } from 'react'
import FavoriteCards from '../companents/FavoriteCards'
import NavBarFavorite from '../companents/NavBarFavorite'
import { useDispatch } from 'react-redux'
import { clearFavorite } from '../redux/slices/favoriteReducer'

export default function Favorite({ elem }) {
  const [products, setProducts] = useState([])

  //создаем функцию-обертку для вызова редаксовских функций, все функции редакса должны быть обернуты в dispatch
  const dispatch = useDispatch()


  useEffect(() => {
    fetch(`https://fakestoreapi.com/carts`)
      .then(res => res.json())
      .then(json => setProducts(json))
  }, [])
  console.log(products)

  return (
    <div className='favorite'>
      <NavBarFavorite />
      <div className='favorite__container'>
        <div className='favorite__info'>
          <h4 className='favorite__title'>my favorite</h4>
          <button
            className='btn__clearCartFavorite'
            type='button'
            onClick={() => dispatch(clearFavorite())}
          >
            Очистить всё
          </button>
        </div>
        <FavoriteCards />
      </div>
    </div>
  )
}

