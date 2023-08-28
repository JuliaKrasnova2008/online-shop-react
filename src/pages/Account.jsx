import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SciletonsAccount from '../companents/SciletonsAccount'

export default function Account() {
    const [userInfo, setUserInfo] = useState({})
    const token = useSelector((state) => state.user.token) //обращаюсь ко всему store, внутри него по ключу конкретного куска(favorite), а внутри кусочка к онкретному стейту(item)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        axios.get(`https://api.react-learning.ru/v2/9-gr/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(json => {
                setUserInfo(json.data)
                setLoading(false)
            })
    }, [])

    console.log(userInfo)

    const sciletons = [...new Array(2)].map(() => <SciletonsAccount />); //так можно создать пустой массив из 8 элементов


    //нужна для отправки формы, пареметр values содержит все компоненты Field(name, id, group и тд)
    //при вызове handleRegister первым параметром передаем все значения из формы(name, id, group и тд),
    //вторым параметром описываем действия при успешном ответе сервера(onSuccess) и при ошибке (onError)
    const onSubmit = (values) => {
        // handleRegister(values, {
        //     onSuccess: (res) => {
        //         navigate('/login')
        //     }, onError: (res) => {
        //         alert("Произошла ошибка. Попробуйте еще раз")
        //     }
        // })
        console.log(values)
    }


    //начальные значения для Formik
    const initialValues = {
        name: userInfo.name || '',
        about: '',
        avatar: '',
        group: '',
        email: '',
        password: '',
    }
    //нужно для валидации формы
    //у button должно быть обязательное поле type='submit', пока форма не пройдет валидацию, запрос отправлен не будет
    // компонент для отображения ошибок из Yup <ErrorMessage name="email" component="div" className='error__message' />
    const REGEXP = /https?:\/\/(www\.)?[a-z0-9.-]{2,}\.[a-z]{2,}\/?[-._~:/?#[\]@!$&'()*+,;=]*/;

    const loginSchema = Yup.object().shape({
        name: Yup.string('Введите корректное Имя').required('Обязательное поле для заполнения').min(2, 'Введите не менее 2 символов').max(20, 'Введите не более 20 символов'),
        about: Yup.string('Введите корректные данные').required('Обязательное поле для заполнения').min(2, 'Введите не менее 2 символов').max(20, 'Введите не более 20 символов'),
        group: Yup.string('Введите корректную группу').required('Обязательное поле для заполнения').min(4, 'Введите не менее 4 символов').max(4, 'Введите не более 4 символов'),
        email: Yup.string('Введите корректный email').email('Введите корректный email').required('Обязательное поле для заполнения').min(5, 'Введите не менее 5 символов').max(25, 'Введите не более 25 символов'), //ключ email - это строка, эл/адрес, обязательное поле(не пустое), минималье кол-во и максимальное кол-во символов - эти методы взяты из библиотеки Yup
        password: Yup.string('Введите корректный пароль').min(5, 'Введите не менее 5 символов').max(25, 'Введите не более 25 символов').required('Обязательное поле для заполнения'),
        avatar: Yup.string().matches(REGEXP, 'Введите корректную ссылку'),
    })


    return (
        <>
            {loading ?
                sciletons
                :
                <div className='account'>
                    <div className='account__info'>
                        <img className='account__foto' src={userInfo.avatar} />
                        <h3 className='account__name'>{userInfo.name}</h3>
                    </div>
                    <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit} enableReinitialize={true}>
                        {(formik) => {
                            return (
                                <Form className="user-form">
                                    <p className="user-form__title">Мои данные</p>
                                    <Field
                                        className="form__input form__input_type_name user-form__input"
                                        id="input-userName"
                                        name="name"
                                        type="name"
                                        // placeholder={userInfo.name}
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name="name" component="div" className='error__message' />

                                    <Field
                                        className="form__input form__input_type_about user-form__input"
                                        id="input-userAbout"
                                        name="about"
                                        type="about"
                                        placeholder={userInfo.about}
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name="about" component="div" className='error__message' />

                                    <Field
                                        className="form__input form__input_type_group user-form__input"
                                        id="input-userGroup"
                                        name="group"
                                        type="group"
                                        placeholder={userInfo.group}
                                        autoComplete="off"

                                    />
                                    <ErrorMessage name="group" component="div" className='error__message' />

                                    <Field
                                        className="form__input form__input_type_email user-form__input"
                                        id="input-userEmail"
                                        name="email"
                                        type="email"
                                        placeholder={userInfo.email}
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name="email" component="div" className='error__message' />

                                    <Field
                                        className="form__input form__input_type_password user-form__input"
                                        id="input-password"
                                        name="password"
                                        type="password"
                                        placeholder={userInfo.password}
                                    />
                                    <ErrorMessage name="password" component="div" className='error__message' />

                                    <Field
                                        className="form__input form__input_type_avatar user-form__input"
                                        id="input-avatar"
                                        name="avatar"
                                        type="avatar"
                                        placeholder={userInfo.avatar}
                                    />
                                    <ErrorMessage name="avatar" component="div" className='error__message' />

                                    <button className="user-form__button" type="submit">Сохранить</button>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            }
        </>

    )
}
