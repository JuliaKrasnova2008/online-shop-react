import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, decrementItem, deleteItemInCart, selectCurrentCartItem } from "../redux/slices/cartReducer";

export default function ScuInCart({ elem }) {
    //создаем функцию-обертку для вызова редаксовских функций, все функции редакса должны быть обернуты в dispatch
    const dispatch = useDispatch()

    //создаем текущий элемент с помощью селектора из cartReducer
    const currentItemCart = useSelector(selectCurrentCartItem(elem?.id))

    if (currentItemCart?.count < 1) { //если в счетчике каунт меньше 1, удаляем элемент из корзины
        dispatch(deleteItemInCart(elem))
    }

    return (
        <li className="products__item-cart">
            <img
                className="products__foto-cart"
                data-action="show"
                src={elem.image}
                alt={elem.title}
            />
            <div className="products__container-cart">
                <h2 className="products__title-cart">{elem.title}</h2>
                <p className="products__subtitle">{elem.price} $</p>
                <div className="products__quantity-sum">

                    <div className='counter__cart'>
                        <button
                            className='count__btn-cart plus'
                            type='button'
                            onClick={() => dispatch(addItem(elem))}
                        >+</button>
                        <span className="products__quantity-cart">{elem.count} шт.</span>
                        <button
                            className='count__btn-cart minus'
                            type='button'
                            onClick={() => dispatch(decrementItem(elem))}>-</button>
                    </div>

                    <p className="products__sum-cart">сумма: {elem.price * elem.count} $</p>
                </div>
            </div>
            <button
                className="products__button-cart"
                type="button"
                onClick={() => dispatch(deleteItemInCart(elem))}
            >
                х
            </button>
        </li>
    );
}
