import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './Store.js';
import { loadState, saveState} from './localStore';
import App from './App.jsx';
import './index.css';

const store = configureStore(loadState());
store.subscribe(() => saveState(store.getState()));
console.log(store.getState())

store.dispatch({
    type: "ADD_RECIPE",
    name: "The Best Lasagna",
    ingredients: [
      "1 pound sweet Italian sausage",
      "1 pound lean ground beef",
      "1 large white onion, minced",
      "5 cloves garlic, crushed",
      "1 (28 ounce can) crushed tomatoes",
      "2 (6 ounce can) tomato paste",
      "1 (15 oz can) tomato sauce",
      "½ cup chicken broth",
      "2 tablespoons white sugar",
      "½ cup chopped fresh basil",
      "1 teaspoon fennel seeds",
      "1 teaspoon ground oregano",
      "½ teaspoon salt",
      "¼ teaspoon ground black pepper",
      "¼ cup + 2 tablespoons chopped fresh parsley (divided)",
      "1 pound lasagna noodles",
      "30 ounces ricotta cheese",
      "1 large egg",
      "½ teaspoon salt",
      "⅛ teaspoon ground nutmeg",
      "1 pound deli sliced mozzarella cheese",
      "1 cup freshly grated Parmesan cheese"
    ]
});
store.dispatch({
    type: "ADD_RECIPE",
    name: "Brussels Sprouts Pizza",
    ingredients: [
      "1 teaspoon extra-virgin olive oil",
      "9 slices pancetta",
      "5 teaspoons extra-virgin olive oil",
      "2 cloves garlic, minced",
      "6 Brussels sprouts, trimmed and thinly sliced",
      "1 (8 ounce) package shredded mozzarella cheese",
      "1/2 teaspoon fennel seed",
      "1 12-inch pizza crust"
    ]
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
