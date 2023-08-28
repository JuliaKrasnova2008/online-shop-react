import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "", //по умолчанию
  token: "",
};

export const userSlice = createSlice({
  //создаем ключ-название хранилища
  name: "user",

  //передаем начальное состояние
  initialState,

  //описываем функцию для взаимодействия с хранилищем c помощью reducers
  reducers: {
    //state - это объект, который содержит текущее состояние хранилища.
    //action - объект, через который происходит связь реакта и редакса. С помощью action можно передавать параметры из реакта в в эту функцию.
    //Параметры, которые мы передаем при вызове этой функции в Реакте, хранятся в action.payload

    setToken: (state, action) => {
      let token = action.payload; //находим token
      state.token = token;
      console.log(token);
    },

    setUserId: (state, action) => {
      let id = action.payload; //находим id
      state.userId = id;
    },

    leave: (state, action) => {
      state.token = "";
    },
  },
});

export default userSlice.reducer; //экспортируем хранилище
export const { setToken, setUserId, leave } = userSlice.actions; //экспортируем функции (для удобства, чтобы потом обращаться напрямую)
