import React, { useState } from 'react'
import Header from '../companents/Header';
import Article from '../companents/Article';
import Main from '../companents/Main';
import Footer from '../companents/Footer';

export default function Home() {
    return (
        <>
            <Header/>
            <Article />
            <Main/>
            <Footer />
        </>
    )
}
