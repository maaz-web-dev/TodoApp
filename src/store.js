// store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // You'll define your reducers later

const store = createStore(rootReducer);

export default store;
