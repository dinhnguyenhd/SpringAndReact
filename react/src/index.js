import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DisplayList from './retails/DisplayList';
import AddRetails from './retails/AddRetails';
import AddBill from './bills/AddBill';
import Report from './bills/Report';
import Home from './Home';

import { BrowserRouter as Router, Route } from 'react-router-dom'
const routing = (
    <Router>
        <div>
            <Route path="/" component={App} />
            <Route path="/home" component={Home} />
            <Route path="/retail/list" component={DisplayList} />
            <Route path="/retail/add" component={AddRetails} />
            <Route path="/bill/add" component={AddBill} />
            <Route path="/bill/report" component={Report} />
        </div>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'));
serviceWorker.unregister();
