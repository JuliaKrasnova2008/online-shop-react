import React from 'react'
import { useSelector } from 'react-redux';
import ScuInCart from './ScuInCart';


export default function Scu() {
    //использую useSelector, чтобы достать из стейта редакс значения
    const cart = useSelector((state) => state.cart.items) //обращаюсь ко всему store, внутри него по ключу конкретного кусока(cart), а внутри кусочка к онкретному стейту(item)
    console.log(cart)

    return cart?.map((obj) => {
        return (
            <>
                <ScuInCart elem={obj} key={obj.id} />
            </>
        )

    })
}


