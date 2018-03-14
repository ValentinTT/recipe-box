import React from 'react';
import AppHeader from './AppHeader';
import RecipeSection from './RecipeSection';
import './App.css';

const Footer = () => (
    <footer>
        <h4>
            Coded By <a className="link" href="https://github.com/ValentinTapiaTorti" target="_blank">Valentin TT</a>
        </h4>
    </footer>
)

const App = () => (
    <div className="App">
        <AppHeader>Recipe Board</AppHeader>
        <RecipeSection/>
        <Footer/>
    </div>
);

export default App;
