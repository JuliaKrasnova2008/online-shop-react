import { createSlice } from "@reduxjs/toolkit"
import calculateCountAndPrice from "../../utils/calculateCountAndPrice"

const initialState = {
    items: [], //по умолчаниб товары в корзине равны пустому массиву 
    totalPrice: 0,
    totalCount: 0,
}
export const cartSlice = createSlice({ //с помощью функции createSlice создаем кусочек хранилища
    //создаем ключ-название хранилища
    name: 'cart',
    //передаем начальное состояние
    initialState,
    //описываем функцию для взаимодействия с хранилищем c помощью reducers
    reducers: {
        //сделаем функцию на добавление элементов в корзину ключ-название функции, через : сама функция
        //state, action - переменные, которые передаются по-умолчанию. Всегда.
        //state - это объект, который содержит текущее состояние хранилища. В данный момент state = обекту с ключем items, который хранит []
        //action - объект, через который происходит связь реакта и редакса. С помощью action можно передавать параметры из реакта в в эту функцию.
        //Параментры, которые мы передаем при вызове этой функции в Реакте, хранятся в action.payload
        addItem: (state, action) => {
            const currentItem = state.items.find((elem) => { //создать конст текущего елемента, методом find мы устанавливаем условие для первого попавшегося элемента
                return elem.id == action.payload.id //вернки элемент, id которого равен id элемента, который выбрали
            })
            if (currentItem) { //если текущий элемент уже есть в корзине, увеличиваем счетчик на 1
                currentItem.count++
            } else {
                state.items.push({ ...action.payload, count: 1 }) //в текущее состояние, обращаем к конкретному ключу items из тек.состояния, 
                //создаем объект, в него копируем весь текущий(с помощью ...), в него добавляем ключ count со значением 1
            }
            calculateCountAndPrice(state)
        },
        //функция для очистки корзины
        clearCart: (state, action) => {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
        },
        //удаление елемента из корзины
        deleteItemInCart: (state, action) => {
            let id = action.payload.id //находим id
            state.items = state.items.filter((item) => {
                return item.id !== id //вернуть элементы, которые не равны id элементa для удаления
            })
            calculateCountAndPrice(state)

        },
        //уменьшение кол-ва элементов в корзине
        decrementItem: (state, action) => {
            const currentItem = state.items.find((elem) => { //создать конст текущего елемента, методом find мы устанавливаем условие для первого попавшегося элемента
                return elem.id === action.payload.id //вернки элемент, id которого равен id элемента, который выбрали
            })
            if (currentItem) {
                currentItem.count-- //если текущий элемент уже есть в корзине, уменьшаем счетчик на 1
            }
            calculateCountAndPrice(state)
        },
        // const totalPriceByElem = elem.reduce((sum, obj) => {
        //     return sum + obj.price * obj.count
        // }, 0)
    }
})
//селектор, с помощью которого мы можем смотреть выбран ли текущий элемент
export const selectCurrentCartItem = (id) => (state) => {
    //методом find мы устанавливаем условие для первого попавшегося элемента
    return state.cart.items.find((elem) => elem.id === id //вернки элемент, id которого равен id элемента, который выбрали
    )
}


export default cartSlice.reducer; //экспортируем хранилище
export const { addItem, clearCart, deleteItemInCart, decrementItem } = cartSlice.actions; //экспортируем функции (для удобства, чтобы потом обращаться напрямую)

