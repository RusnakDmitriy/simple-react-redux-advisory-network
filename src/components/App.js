import React, { Component } from 'react';
import Items from './routes/Items';
import {Router, Route} from  'react-router-dom';
import history from '../history';

export default class App extends Component {
  render() {
    return (
        <Router history={history}>
            <div className='mainScreen'>
                <Route path="/" component={Items} />
            </div>
        </Router>
    )
  }
}

