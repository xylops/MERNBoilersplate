import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import PublicLayout from '../component/publicLayout'

class Dashboard extends Component {
    changeLang(){
        let { dispatch } = this.props
        // dispatch(actions.changeLang())
    }
    render(){
        let { currentLang } = this.props
        return (
            <div>this is dashboard</div>
        )
    }
}

export default connect((state)=>{
    return {
        currentLang: state.common.lang
    }
})(Dashboard)