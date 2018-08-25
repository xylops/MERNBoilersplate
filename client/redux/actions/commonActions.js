import * as actionTypes from '../actionTypes'

export let changeLang = () =>{
    return (dispatch)=> {
        dispatch({type: actionTypes.CHANGE_LANG})
    }
}