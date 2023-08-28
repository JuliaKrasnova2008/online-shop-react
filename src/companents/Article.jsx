import React from 'react'

export default function Article() {
  return (
    <div className='article'>
      <h2 className='article__title'>ПОЛУЧАЙТЕ СКИДКИ И ПОДАРКИ</h2>
      <form className='article__form' action="" method="get">
        <p>
          {/* <input className='article__input' type="email" name="email" id="email" required /> */}
        </p>
        <button className='article__btn' type="submit">ПОДПИСАТЬСЯ</button>
      </form>
    </div>
  )
}
