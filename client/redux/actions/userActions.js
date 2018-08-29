import * as actionTypes from '../actionTypes'
import axios from 'axios'
import _ from 'lodash'
import history from '../../utils/history'

export let userLogin = (id, pw, errCb) =>{
    let userLoginRequest = axios({
        method: 'POST',
        baseURL: '/api/user/login',
        data: {
            id, 
            pw
        },
        withCredentials: true
    })
    return (dispatch) => {
        userLoginRequest.then((res)=>{
            history.push('/dashboard')
            dispatch({type: actionTypes.IS_LOGIN, payload: true})
        }).catch((err)=>{
            errCb(err)
            dispatch({type: actionTypes.IS_LOGIN, payload: false})
        })
    }
}

export let setUserLoginStatus = (status) => {
    return (dispatch) => {
        dispatch({type: actionTypes.IS_LOGIN, payload: status})
    }
}

export let userLogout = () => {
    let userLogoutRequest = axios({
        method: 'POST',
        baseURL: '/api/user/logout',
        withCredentials: true
    })
    return (dispatch) => {
        userLogoutRequest.then((res)=>{
            dispatch({type: actionTypes.IS_LOGIN, payload: false})
            history.push('/login')
        })
    }
}