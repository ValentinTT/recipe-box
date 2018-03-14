import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

const CapitalizeFirstLeter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const listHasRecipe = (list, recipe) => list.find(element => element.name.toUpperCase() === recipe.name.toUpperCase());

const listRecipeIndex = (list, recipe) => (list === null 
    ? null
    : list.findIndex(element => element.name.toUpperCase() === recipe.name.toUpperCase())
);

const addRecipe = (list, newRecipe) => {
    if(newRecipe.name.length === 0 ||
        newRecipe.ingredients.length === 0) return list;
    if(listHasRecipe(list, newRecipe))
        return list;
    return [
        ...list,
        {
            name: CapitalizeFirstLeter(newRecipe.name),
            ingredients: newRecipe.ingredients.map(v => CapitalizeFirstLeter(v)),
        }
    ];
}
const editRecipe = (list, newRecipe) => {
    if(!listHasRecipe(list, newRecipe)) 
        return list;
    let index = listRecipeIndex(list, newRecipe);
    return [
        ...list.slice(0, index),
        {
            name: CapitalizeFirstLeter(newRecipe.name),
            ingredients: newRecipe.ingredients.map(v => CapitalizeFirstLeter(v)),
        },
        ...list.slice(index + 1)
    ]
    
}
const removeRecipe = (list, newRecipe) => {
    if(!listHasRecipe(list, newRecipe)) 
        return list;
    let index = listRecipeIndex(list, newRecipe);
    return [
        ...list.slice(0, index),
        ...list.slice(index + 1)
    ];    
}

const recipes = (state=[], action) => {
    switch(action.type) {
        case "ADD_RECIPE":
            return addRecipe(state, action);
        case "EDIT_RECIPE":
            return editRecipe(state, action);
        case "REMOVE_RECIPE":
            return removeRecipe(state, action);
        case "REMOVE_ALL":
            return [];
        default:
            return state;
    }
}

export const configureStore = (persistedState) => createStore(recipes, 
    persistedState, 
    applyMiddleware(logger)
);

