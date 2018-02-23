import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';
import './components/app.css';
import './components/reset.css';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
