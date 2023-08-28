import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, deleteItemInCart, selectCurrentCartItem } from '../redux/slices/cartReducer'
import { deleteItem } from '../redux/slices/favoriteReducer'

export default function FavoriteCard({ elem }) {

    const dispatch = useDispatch()

    //создаем текущий элемент с помощью селектора из cartReducer
    const currentItemCart = useSelector(selectCurrentCartItem(elem?.id))


    return (
        <li className='products__item-cart'>
            <img
                className='products__foto-cart'
                data-action="show"
                src={elem.image}
                alt={elem.title} />
            <div className='products__container-cart'>
                <h2 className='products__title-cart'>{elem.title}</h2>
                <p className='products__subtitle'>{elem.price} $</p>

                {currentItemCart ? <button
                    className="products__button products__button_favorite"
                    type="button"
                    onClick={() => dispatch(deleteItemInCart(elem))}
                >
                    Удалить из корзины
                </button>

                    : <button
                        className="products__button products__button_favorite"
                        type="button"
                        onClick={() => dispatch(addItem(elem))} //по клику вызываю функцию добавления елемента в корзину (она прописана в cartReducer)
                    >
                        <span className='products__button_delete'>
                            <i className="uil-shopping-bag uil-shopping-bag_favorite"></i>
                        </span>
                    </button>}
            </div>

            <button
                className="products__button-cart"
                type="button"
                onClick={() => dispatch(deleteItem(elem))}
            >
                х
            </button>
        </li>
    )
}
