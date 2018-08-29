import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import _ from 'lodash'

//Material-UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: null,
            pw: null,
            errText: ''
        }
    }
    
    login(){
        let { dispatch, contentText } = this.props;
        this.setState({pw: '', errText: ''})
        dispatch(actions.userLogin(this.state.id, this.state.pw, (err)=>{
            this.setState({errText: contentText.loginFail})
        }))
    }
    render(){
        let { contentText } = this.props
        return (
            <div className="container d-flex align-items-center justify-content-center" style={{height: 'calc(100vh - 64px)'}}>
                <div style={{textAlign: 'center'}}>
                    {
                        !_.isEmpty(this.state.errText) &&
                            <b style={{color: 'red'}}>
                                {this.state.errText}
                                <br/>
                            </b>
                    }
                    <TextField 
                        label={ contentText.username }
                        onChange={(e)=>{ this.setState({id: e.target.value}) }}
                    /><br/><br/>
                    <TextField
                        label={ contentText.password} 
                        onChange={(e)=>{ this.setState({pw: e.target.value}) }} 
                        type="password"
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.login()
                                ev.preventDefault();
                            }
                        }}
                    /><br/><br/>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={()=>{this.login()}}
                        style={{width: '100%'}}
                    >{ contentText.login }</Button>
                </div>
            </div>
        )
    }
}

export default connect((state)=>{
    let common = state.common
    return {
        contentText: common.contentText.loginPage
    }
})(LoginScreen)