import * as actionTypes from '../actionTypes'
import axios from 'axios'

export let userLogin = (id, pw) =>{
    return (dispatch) => {
        let userLoginRequest = axios({
            method: 'POST',
            baseURL: '/user/login',
            data: {
                id, 
                pw
            },
            withCredentials: true
        })
        userLoginRequest.then((res)=>{
            console.log(res)
        })
    }
}