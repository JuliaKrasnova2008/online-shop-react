import React, { useEffect, useState } from 'react'
import logo from '../images/logo.svg'
import basket from '../images/basket.svg'
import Categories from './Categories'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { leave } from '../redux/slices/userReducer'

export default function NavBar() {

  const [isLogged, setIsLogged] = useState(false);
  const token = useSelector((state) => state.user.token) //обращаюсь ко всему store, внутри него по ключу конкретного куска(favorite), а внутри кусочка к онкретному стейту(item)

  const dispatch = useDispatch();

  useEffect(() => {
    token !== '' ? setIsLogged(true) : setIsLogged(false)
  }, [token])

  return (
    <nav className='navigation'>
      <ul className='navigation__list'>
        <Categories />
      </ul>

      <img className='logo' src={logo} alt='Логотип'></img>

      <ul className='navigation__list'>
        <li className='navigation__item'>
          <p className="navigation__link">
            <Link to="#" className="user-form__link">
              Доставка
            </Link>
          </p>
        </li>
        <li className='navigation__item'>
          <p className='navigation__basket'>
            <Link to="/cart" className="user-form__link">
              <img className='navigation__basket-img' src={basket} alt="Корзина">
              </img>
            </Link>
          </p>
        </li>
        <li className='navigation__item'>
          <p className='navigation__favorite'>
            <Link to="/favorite" className="user-form__link">
              <i className="navigation__favorite-img uil-heart-alt"></i>
            </Link>
          </p>
        </li>
        {!isLogged ? (
          <li className='navigation__item'>
            <p className="navigation__link">
              <Link to="/login" className="user-form__link">
                Войти
              </Link>
            </p>
          </li>
        ) : (
          <>
            <li className='navigation__item'>
              <p className="navigation__link">
                <Link to="/account" className="user-form__link">
                  Аккаунт
                </Link>
              </p>
            </li>
            <li className='navigation__item'>
              <p className="navigation__link">
                <Link to="/login" className="user-form__link" onClick={() => dispatch(leave())}>
                  Выйти
                </Link>
              </p>
            </li>
          </>
        )}

      </ul>



    </nav>
  )
}


