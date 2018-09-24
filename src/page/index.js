import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from '$router';
import HomePage from './home';
import yoHistory from '../common/history';
import {Provider} from 'react-redux';
import store from './store';
const List = require.async('./list');
const Detail = require.async('./detail');
const Root = () => (
    <Router history={yoHistory}>
        <Route path="/">
            <IndexRoute component={HomePage}/>
            <Route path="/list" getComponent={List} />
            <Route path="/detail/:id" getComponent={Detail}/>
        </Route>
    </Router>
);

ReactDOM.render(
	<Provider store={store}>
		<Root />
	</Provider>,
	document.getElementById('root')
);
