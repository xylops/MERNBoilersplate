import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'

class LoginScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: null,
            pw: null
        }
    }
    login(){
        console.log(this.state)
        this.props.dispatch(actions.userLogin(this.state.id, this.state.pw))
    }
    render(){
        let { currentLang } = this.props
        return (
            <Fragment>
                <input onChange={(e)=>{this.setState({id: e.target.value})}}/>
                <input onChange={(e)=>{this.setState({pw: e.target.value})}} type="password"/>
                <button onClick={()=>{this.login()}}>Login</button>
            </Fragment>
        )
    }
}

export default connect((state)=>{
    return {
        currentLang: state.common.lang
    }
})(LoginScreen)