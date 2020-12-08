import React from 'react';
import {Footer, Loading, ScrollToTop} from './components/UIkit'
import {Header} from './components/Header'
import  "./assets/reset.css"
import  "./assets/style.css"
import Router from "./Router";

const App = () => {
    return (
        <Loading>
            <ScrollToTop />
            <Header />
            <main className="c-main">
                <Router />
            </main>
            <Footer />
        </Loading>
    )
};

export default App;