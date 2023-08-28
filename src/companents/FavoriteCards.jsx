import React from 'react'
import FavoriteCard from './FavoriteCard'
import { useSelector } from 'react-redux'

export default function FavoriteCards() {
    //использую useSelector, чтобы достать из стейта редакс значения
    const favorite = useSelector((state) => state.favorite.items) //обращаюсь ко всему store, внутри него по ключу конкретного куска(favorite), а внутри кусочка к онкретному стейту(item)
    console.log(favorite)

    return favorite?.map((element) => {
        return <FavoriteCard elem={element} key={element.id} />
    })
}
