import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'

class MainPage extends Component {
    changeLang(){
        let { dispatch } = this.props
        dispatch(actions.changeLang())
    }
    render(){
        let { currentLang } = this.props
        return (
            <Fragment>
                <div>
                    {currentLang === 'cn' ? '正常運作' : 'Working Normally'}
                </div>
                <button onClick={()=>{this.changeLang()}}>Change Lang</button>
            </Fragment>
        )
    }
}

export default connect((state)=>{
    return {
        currentLang: state.common.lang
    }
})(MainPage)