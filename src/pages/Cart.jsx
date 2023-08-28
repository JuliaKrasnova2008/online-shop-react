import React, { useEffect, useState } from 'react'
import Scu from '../companents/Scu'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NavBarBasket from '../companents/NavBarBasket'

export default function Cart() {
    const [products, setProducts] = useState([])
    const [promoCode, setPromoCode] = useState('')

    useEffect(() => {
        fetch(`https://fakestoreapi.com/carts`)
            .then(res => res.json())
            .then(json => setProducts(json))
    }, [])
    console.log(products)

    const totalPrice = useSelector((state) => state.cart.totalPrice)
    const totalCount = useSelector((state) => state.cart.totalCount)


    return (
        <div className='cart'>
            <NavBarBasket />
            <div className='cart__container'>
                <div className='cart__info'>
                    <h4 className='cart__title'>shopping cart</h4>
                    <Scu />
                </div>
                <div className='cart__pay'>
                    <form className='cart__form' action="" method="get">
                        <input
                            className='cart__input'
                            type="text"
                            placeholder="Введите промо-код или карту клиента"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            name="promo"
                            id="promo"
                            minLength="5"
                            maxLength="10"
                            required />
                    </form>
                    <div className='cart__total-info'>
                        <p className='cart__total'>Количество позиций: {totalCount} шт.</p>
                        <p className='cart__total'>Сумма итого: {Math.round(totalPrice, 2)} $</p>
                    </div>
                    <button className='cart__checkout' type="button">Оплатить</button>
                    <p className="user-form__subtitle">
                        Еще не зарегистрированы?{" "}
                        <Link to="/register" className="user-form__link">
                            Зарегестрироваться
                        </Link>
                    </p>
                    <p className="user-form__subtitle">
                        Уже зарегистрированы?{" "}
                        <Link to="/login" className="user-form__link">
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
