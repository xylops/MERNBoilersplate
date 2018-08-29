import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import Popper from 'popper.js';
import { Router } from 'react-router'
import history from './utils/history'

window.$ = window.jQuery = require('jquery')  // Required for Bootstrap
window.Popper = Popper
require('bootstrap')

ReactDOM.render(
    <Router history={history}>
        <App/>
    </Router>,
    document.getElementById('app')
);

module.hot.accept();