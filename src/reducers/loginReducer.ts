import loginState from '../actions/loginAction';

const initLoginState = {
    value: false,
    init: 'yes'
}

export default function (state = initLoginState, action: any) {
    switch (action.type) {
        case loginState:
            return {
                ...state,
                value: !state.value
            }
        default:
            return state;
    }
}