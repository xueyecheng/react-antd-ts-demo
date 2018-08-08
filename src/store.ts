import { createStore } from "redux";
import rootReducer from './reducers/allReducers';

let store = createStore(rootReducer);

export default store;