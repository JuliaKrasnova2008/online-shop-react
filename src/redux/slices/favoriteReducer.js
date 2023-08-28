import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [] //по умолчаниб товары в корзине равны пустому массиву 
}

export const favoriteSlice = createSlice({
    //создаем ключ-название хранилища
    name: 'favorite',
    //передаем начальное состояние
    initialState,
    //описываем функцию для взаимодействия с хранилищем c помощью reducers
    reducers: {
        //state - это объект, который содержит текущее состояние хранилища. В данный момент state = обекту с ключем items, который хранит []
        //action - объект, через который происходит связь реакта и редакса. С помощью action можно передавать параметры из реакта в в эту функцию.
        //Параментры, которые мы передаем при вызове этой функции в Реакте, хранятся в action.payload

        pushItem: (state, action) => {
            const currentItem = state.items.find((elem) => { //создать конст текущего елемента, методом find мы устанавливаем условие для первого попавшегося элемента
                return elem.id == action.payload.id //вернки элемент, id которого равен id элемента, который выбрали
            })
            if (currentItem) { //если он уже есть в массиве
                return //второй раз мы его не добавляем в избранное
            } else { //в ином случае добавляем
                state.items.push(action.payload) //добавляем в конец массива то, что передал пользователь при вызове функции
            }

        },

        //функция удаления из избранного по id
        deleteItem: (state, action) => {
            let id = action.payload.id //находим id
            state.items = state.items.filter((item) => {
                return item.id !== id //вернуть элементы, которые не равны id элементa для удаления
            })

        },

        //функция очистки для избранного
        clearFavorite: (state, action) => {
            state.items = []
        }

    }

})

//селектор, с помощью которого мы можем смотреть выбран ли текущий элемент
export const selectCurrentLikeItem = (id) => (state) => {
    //методом find мы устанавливаем условие для первого попавшегося элемента
    return state.favorite.items.find((elem) => elem.id == id //вернки элемент, id которого равен id элемента, который выбрали
    )
}

export default favoriteSlice.reducer; //экспортируем хранилище
export const { pushItem, deleteItem, clearFavorite } = favoriteSlice.actions; //экспортируем функции (для удобства, чтобы потом обращаться напрямую)