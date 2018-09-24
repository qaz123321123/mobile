import React, { Component } from 'react';
import { Scroller,Touchable} from '$yo-component';
import Header from '$component/header/index.js';
import yoHistory from '$common/history';
import './index.scss';
import List from '../list/index'
class HomePage extends Component {
    render() {
        return (
            <div className="yo-flex">
                <div class='header'>聪游榜</div>
                <ul class='lists' id='lists'>
                    <li><a className="active">全部</a></li>
                    <li><a>景点</a></li>
                    <li><a>美食</a></li>
                    <li><a>酒店</a></li>
                    <li><a>购物</a></li>
                    <li><a>玩乐</a></li>
                </ul>
                <List />
            </div>
        )
    }
}

export default HomePage;
