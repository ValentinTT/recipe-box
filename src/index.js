import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './Store.js';
import { loadState, saveState} from './localStore';
import App from './App';

const store = configureStore(loadState());
store.subscribe(() => saveState(store.getState()));
console.log(store.getState())

store.dispatch({
    type: "ADD_RECIPE",
    name: "pizza",
    ingredients: ["harina", "sal"]
});
store.dispatch({
    type: "EDIT_RECIPE",
    name: "pizza",
    ingredients: ["harina", "limon"]
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
