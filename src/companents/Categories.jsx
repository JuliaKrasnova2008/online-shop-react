import React, { useContext, useEffect, useState } from 'react'
import { CategoryContext } from '../context/CategoryContext'

export default function Categories() {
    const [categ, setCateg] = useState([])
    const { currentCateg, setCurrentCateg } = useContext(CategoryContext)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(json => setCateg(json))
    }, [])

    return (
        <div className='category__block'>
            {categ?.map((category) => {
                return <li
                    className='navigation__item'
                    onClick={() => setCurrentCateg(category)}
                    key={category}
                >
                    <a className="navigation__link" href="#">{category}</a>
                </li>
            })

            }
        </div>
    )
}
