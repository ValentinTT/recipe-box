import React from 'react';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard';
import AddRecipePaper from './AddRecipePaper';

let RecipeSection = ({ recipes }) => (
    <section className="RecipeSection">
        {recipes.length === 0
            ? <AddRecipePaper/>
            : recipes.map(recipe => (
                <RecipeCard key={recipe.name} {...recipe}/>
            ))
        }
    </section>
);

RecipeSection = connect((state) => ({recipes: state}))(RecipeSection);

export default RecipeSection;