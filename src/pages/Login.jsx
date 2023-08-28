import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { setToken, setUserId } from '../redux/slices/userReducer'

export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //начальные значения для Formik
    const initialValues = {
        email: '',
        password: ''
    }

    //нужно для валидации формы
    //у button должно быть обязательное поле type='submit', пока форма не пройдет валидацию, запрос отправлен не будет
    // компонент для отображения ошибок из Yup <ErrorMessage name="email" component="div" className='error__message' />
    const loginSchema = Yup.object().shape({
        email: Yup.string('Введите корректный email').email('Введите корректный email').required('Обязательное поле для заполнения').min(5, 'Введите не менее 5 символов').max(25, 'Введите не более 25 символов'), //ключ email - это строка, эл/адрес, обязательное поле(не пустое), минималье кол-во и максимальное кол-во символов - эти методы взяты из библиотеки Yup
        password: Yup.string('Введите корректный пароль').min(5, 'Введите не менее 5 символов').max(25, 'Введите не более 25 символов').required('Обязательное поле для заполнения'),
    })

    //нужна для отправки формы, пареметр values содержит все компоненты Field
    //при вызове handleLogin первым параметром передаем все значения из формы(name, id, group и тд),
    //вторым параметром в {} описываем действия при успешном ответе сервера(onSuccess: (res) => {}) и при ошибке (onError:: (res) => {})
    const onSubmit = (values) => {
        handleLogin(values, {
            onSuccess: (res) => {
                dispatch(setToken(res.data.token))
                dispatch(setUserId(res.data.data._id))
                navigate('/')
            }, onError: (res) => {

            }
        })
    }
    //объявлена функция запроса для входа, которая будет вызываться при submit
    //при помощи диструктуризации ({}) достаем из результата вызова хука useMutation определенный ключ-mutate и называем его handleLogin
    const { mutate: handleLogin } = useMutation({
        //mutationFn- параметр, в нем находится сама функция, которая будет выполняться
        mutationFn: (body) => {
            //при помощи библиотеки axios, вызываем метод post и указываем адрес, куда отправить запрос и данные, которые отправляем, третьи параметром можно передать headers
            return axios.post('https://api.react-learning.ru/signin', body)
        }
    })

    return (
        //параметрами передаем константы начальных значений и валидацию
        <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit}>
            {(formik) => {
                return (
                    <Form
                        className="user-form"
                    >
                        <p className="user-form__title">Вход</p>
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

                        <button className="user-form__button" type='submit'>Войти</button>
                        <p className="user-form__subtitle">
                            Еще не зарегистрированы?{" "}
                            <Link to="/register" className="user-form__link">
                                Зарегестрироваться
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
