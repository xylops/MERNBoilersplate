import * as actionTypes from '../actionTypes'

export var commonReducer = (state = {
    lang: 'en',
}, action)=>{
    switch (action.type){
        case actionTypes.CHANGE_LANG:
            return {
                ...state,
                lang: state.lang === 'en' ? 'cn': 'en'
            };
        default:
            return state;
    }
}