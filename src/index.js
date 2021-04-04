import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//put index.css after bootstrap.min.css so it can override
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// render the App component in index.js
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
