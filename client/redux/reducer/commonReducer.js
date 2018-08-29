import * as actionTypes from '../actionTypes'
import loginPageCn from '../../data/loginPage-cn.json'
import loginPageEn from '../../data/loginPage-en.json'

let en = {
    loginPage: loginPageEn
}
let cn = {
    loginPage: loginPageCn
}

export var commonReducer = (state = {
    lang: 'cn',
    contentText: cn,
    isLogin: false
}, action)=>{
    switch (action.type){
        case actionTypes.CHANGE_LANG:
            return {
                ...state,
                lang: state.lang === 'en' ? 'cn': 'en',
                contentText: state.lang === 'en'? cn: en
            };
        case actionTypes.IS_LOGIN:
            return {
                ...state,
                isLogin: action.payload
            };
        default:
            return state;
    }
}