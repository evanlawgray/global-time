import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {root} from 'baobab-react/higher-order';
import tree from './Baobab/state';

const RootedApp = root(tree, App);

ReactDOM.render(<RootedApp />, document.getElementById('root'));
registerServiceWorker();
