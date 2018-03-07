import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
const listHasRecipe = (list, recipe) => {
    return list.find(element => element.name === recipe.name);
}
const listRecipeIndex = (list, recipe) => {
    return list.findIndex(element => element.name === recipe.name);
}

const addRecipe = (list, newRecipe) => {
    if(listHasRecipe(list, newRecipe))
        return list;
    return [
        ...list,
        {
            name: newRecipe.name,
            ingredients: newRecipe.ingredients,
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
            name: newRecipe.name,
            ingredients: newRecipe.ingredients,
        },
        ...list.slice(index + 2)
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

