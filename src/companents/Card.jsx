import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, decrementItem, deleteItemInCart, selectCurrentCartItem } from '../redux/slices/cartReducer'
import { deleteItem, pushItem, selectCurrentLikeItem } from '../redux/slices/favoriteReducer'

export default function Card({ elem }) {

  //создаем функцию-обертку для вызова редаксовских функций, все функции редакса должны быть обернуты в dispatch
  const dispatch = useDispatch()
  //создаем текущий элемент с помощью селектора из favoriteReducer
  const currentItem = useSelector(selectCurrentLikeItem(elem?.id)) //передаем id только тогда, когда элемент найден
  // console.log(currentItem)

  //создаем текущий элемент с помощью селектора из cartReducer
  const currentItemCart = useSelector(selectCurrentCartItem(elem?.id))

  if (currentItemCart?.count < 1) { //если в счетчике каунт меньше 1, удаляем элемент из корзины
    dispatch(deleteItemInCart(elem))
  }


  return (
    <li className='products__item'>
      <img
        className='products__foto'
        data-action="show"
        src={elem?.image}
        alt={elem?.title} />
      <h2 className='products__title'>{elem?.title}</h2>
      <p className='products__subtitle'>{elem?.price} $</p>
      <p className='products__description'>{elem?.description}</p>
      {currentItemCart ? <button
        className="products__button deleteFromCart"
        type="button"
      >
        <div className='counter'>
          <button
            className='count plus'
            type='button'
            onClick={() => dispatch(addItem(elem))}
          >+</button>
          <span className='count quantity'>{currentItemCart.count}</span>
          <button
            className='count minus'
            type='button'
            onClick={() => dispatch(decrementItem(elem))}>-</button>
        </div>
      </button>
        : <button
          className="products__button"
          type="button"
          onClick={() => dispatch(addItem(elem))} //по клику вызываю функцию добавления елемента в корзину (она прописана в cartReducer)
        >
          <span className='products__button_delete'>Добавить в корзину</span>
        </button>}

      {/* если текущий элемент уже есть в массиве избранного, то отображаем активную кнопку, а если элемента нет, то кнопка обычная-не активная */}

      {currentItem ? <button
        className="products__button like"
        type="button"
        onClick={() => dispatch(deleteItem(elem))} //по клику вызываю функцию удаления элемента в избранное (она прописана в favoriteReducer)
      >
        <i className="uil uil-heart-alt"></i>
      </button> : <button
        className="products__button"
        type="button"
        onClick={() => dispatch(pushItem(elem))} //по клику вызываю функцию добавления элемента в избранное (она прописана в favoriteReducer)
      >
        <i className="uil uil-heart-alt"></i>
      </button>}
    </li>
  )
}
