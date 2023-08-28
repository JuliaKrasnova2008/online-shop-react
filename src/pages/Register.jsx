// Uliya@bk.ru
// Uliya

import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {

    //создаем метод для изменения локации, нужен в onSubmit
    const navigate = useNavigate()

    //начальные значения для Formik
    const initialValues = {
        name: '',
        group: '',
        email: '',
        password: ''
    }

    //нужно для валидации формы
    //у button должно быть обязательное поле type='submit', пока форма не пройдет валидацию, запрос отправлен не будет
    // компонент для отображения ошибок из Yup <ErrorMessage name="email" component="div" className='error__message' />
    const loginSchema = Yup.object().shape({
        name: Yup.string('Введите корректное Имя').required('Обязательное поле для заполнения').min(2, 'Введите не менее 2 символов').max(20, 'Введите не более 20 символов'),
        group: Yup.string('Введите корректную группу').required('Обязательное поле для заполнения').min(4, 'Введите не менее 4 символов').max(4, 'Введите не более 4 символов'),
        email: Yup.string('Введите корректный email').email('Введите корректный email').required('Обязательное поле для заполнения').min(5, 'Введите не менее 5 символов').max(25, 'Введите не более 25 символов'), //ключ email - это строка, эл/адрес, обязательное поле(не пустое), минималье кол-во и максимальное кол-во символов - эти методы взяты из библиотеки Yup
        password: Yup.string('Введите корректный пароль').min(5, 'Введите не менее 5 символов').max(25, 'Введите не более 25 символов').required('Обязательное поле для заполнения'),
    })

    //нужна для отправки формы, пареметр values содержит все компоненты Field(name, id, group и тд)
    //при вызове handleRegister первым параметром передаем все значения из формы(name, id, group и тд),
    //вторым параметром описываем действия при успешном ответе сервера(onSuccess) и при ошибке (onError)
    const onSubmit = (values) => {
        handleRegister(values, {
            onSuccess: (res) => {
                navigate('/login')
            }, onError: (res) => {
                alert("Произошла ошибка. Попробуйте еще раз")
            }
        })
    }

    //объявлена функция запроса для регистрации, которая будет вызываться при submit
    //при помощи диструктуризации ({}) достаем из результата вызова хука useMutation определенный ключ-mutate и называем его handleRegister
    const { mutate: handleRegister } = useMutation({ //useMutation - хук, который позволяет создать функцию отложенного вызова(срабатывают при клике, изменении, каком-то действии, главное не сразу)
        //mutationFn- параметр, в нем находится сама функция, которая будет выполняться
        mutationFn: (body) => {
            //при помощи библиотеки axios, вызываем метод post и указываем адрес, куда отправить запрос и данные, которые отправляем, третьи параметром можно передать headers
            return axios.post('https://api.react-learning.ru/signup', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    })
    console.log(handleRegister)

    return (

        <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit}>
            {(formik) => {
                return (
                    <Form className="user-form">
                        <p className="user-form__title">Регистрация</p>
                        <Field
                            className="form__input form__input_type_name user-form__input"
                            id="input-userName"
                            name="name"
                            type="name"
                            placeholder="Name"
                            autoComplete="off"
                        />
                        <ErrorMessage name="name" component="div" className='error__message' />

                        <Field
                            className="form__input form__input_type_group user-form__input"
                            id="input-userGroup"
                            name="group"
                            type="group"
                            placeholder="Group"
                            autoComplete="off"

                        />
                        <ErrorMessage name="group" component="div" className='error__message' />

                        <Field
                            className="form__input form__input_type_email user-form__input"
                            id="input-userEmail"
                            name="email"
                            type="email"
                            placeholder="Email"
                            autoComplete="off"
                        />
                        <ErrorMessage name="email" component="div" className='error__message' />

                        <Field
                            className="form__input form__input_type_password user-form__input"
                            id="input-password"
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <ErrorMessage name="password" component="div" className='error__message' />

                        <button className="user-form__button" type="submit">Зарегестрироваться</button>
                        <p className="user-form__subtitle">
                            Уже зарегистрированы?{" "}
                            <Link to="/login" className="user-form__link">
                                Войти
                            </Link>
                        </p>
                        <Link to="/" className="user-form__link">
                            Вернуться на главную
                        </Link>

                    </Form>
                )
            }}

        </Formik>

    )
}


