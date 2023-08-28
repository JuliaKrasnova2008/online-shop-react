import React from 'react'
import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'

export default function NavBarBasket() {
  return (
    <nav className='navigation'>
      <ul className='navigation__list navigation__list_cart'>
        <li className='navigation__item'>
          <p className="navigation__link">
            <Link to="/" className="user-form__link">
              Вернуться в магазин
            </Link>
          </p>
        </li>
        <li className='navigation__item'>
          <p className='navigation__link'>
            <Link to="/delivery" className="user-form__link">
              Условия доставки
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
      </ul>

      <img className='logo' src={logo} alt='Логотип'></img>

    </nav>
  )
}


