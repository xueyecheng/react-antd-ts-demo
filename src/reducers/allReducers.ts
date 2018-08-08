import { combineReducers } from 'redux';
import loginReducer from './loginReducer'

const allReducers = {
    loginState: loginReducer
}

const rootReducer=combineReducers(allReducers);

export default rootReducer;