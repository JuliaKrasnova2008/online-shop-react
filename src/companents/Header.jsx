import React from 'react';
import NavBar from './NavBar'
import sneakers from '../images/sneakers.png'

export default function Header() {
  return (
    <div className='header'>
      <NavBar />
      <div className='header__info'>
        <div className='header__text'>
          <p className='header__subtitle'>Зимняя распродажа</p>
          <h1 className='header__title'>СКИДКИ ДО 90%</h1>
          <a className='header__link' href="#look-modal">Смотреть модели</a>
        </div>
        <img className='header__img' src={sneakers} alt="Кросовки по скидке"></img>
      </div>
    </div>
  )
}
