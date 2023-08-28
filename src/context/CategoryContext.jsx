import React, { createContext, useState } from 'react'

export const CategoryContext = createContext()

export default function CategoryContextProvider({ children }) {
    const [currentCateg, setCurrentCateg] = useState("men's clothing")

    return (
        <CategoryContext.Provider value={{ currentCateg, setCurrentCateg }}>
            {children}
        </CategoryContext.Provider>
    )
}
