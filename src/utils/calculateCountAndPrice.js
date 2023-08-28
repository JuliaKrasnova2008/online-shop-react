import React from 'react'

export default function calculateCountAndPrice(state) {
    state.totalPrice = state.items.reduce((sum, item) => { //находим сумму всех товаров в корзине
        return sum + item.price * item.count
    }, 0)
    state.totalCount = state.items.length // находим кол-во товаров в корзине
}
