import React, { Component } from 'react';
import { List } from '$yo-component';
import Header from '$component/header/index.js';
import yoHistory from '$common/history';
import {connect} from 'react-redux';
import {fetchList} from '../../actions';
import HomePage from '../home';
import './index.scss';
import axios from 'axios';
import store from '../store';
const mapStateToProps=state=>({
    list:state.list
});
const mapDispatchToProps=dispatch=>({
    fetchList:(params, label) =>dispatch(fetchList(params, label))
});
class Detail extends Component {
    constructor(props){
        super(props);
        this.page=0;
        this.label='';
    }
    refresh() {
        const {fetchList}=this.props;
        this.page=1;
        if(this.label==''){
            fetchList(this.page,'');
        }else{
            fetchList(this.page,this.label);
        }
    }
    fetch() {
        const {fetchList}=this.props;
        if(this.label==''){
            fetchList(++this.page,'');
        }else{
            fetchList(++this.page,this.label);
        }
    }
    componentDidMount(){  
        this.fetch();
    }
    componentDidUpdate(){
        this.handleChange(this.refs.list);
    }
    handleChange=(obj)=>{
        var arr=document.getElementsByTagName('a');
        var _this=this;
        for(let i=0;i<arr.length;i++){
            arr[i].onclick=function(){
                for(let j=0;j<arr.length;j++){
                    arr[j].setAttribute("class", "")
                }
                this.setAttribute("class", "active");
                obj.scrollTo(0,0,0);
                _this.page=1;
                if(arr[i].innerHTML=='全部'){
                    _this.label='';
                    _this.props.fetchList(_this.page, _this.label);
                }
                else{
                    _this.label=this.innerHTML;
                    _this.props.fetchList(_this.page, _this.label);
                }
            }
        }
    }
    render() {
        const {list}=this.props;
        if(list &&list.length>0){
            for(let i=0;i<list.length;i++){
                list[i].key=list[i].id;
            }
            return (
                <div className="yo-flex">
                    <List
                        ref="list"
                        extraClass="flex m-list"
                        dataSource={list}
                        renderItem={(item, i) => <div className='items'>
                            <img src={item.headImg} className='head-img'/>
                            <p className='texts'>{item.title}</p>
                            <p className='author'>
                                <img src={item.userHeadImg}  className='user-img'/>
                                <span>{item.userName}</span>
                            </p>
                        </div>}
                        infinite={true}
                        infiniteSize={20}
                        usePullRefresh={true}
                        onRefresh={() => {
                            setTimeout(() => {
                                this.refresh();
                                this.refs.list.stopRefreshing(true);
                            }, 500);
                        }}
                        useLoadMore={true}
                        onLoad={() => {
                            setTimeout(() => {
                                this.fetch();
                                this.refs.list.stopLoading(true);
                            }, 500);
                        }}
                        itemExtraClass={(item, i) => {
                            return 'item ' + i;
                        }}
                        onItemTap={(item, i, ds) => {
                            yoHistory.push('/detail/:'+`${item.id}`);
                        }}
                    />
                </div>
            );
        }else{
            return null;
        }
    }
}
Detail.defaultProps = {

}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null
)(Detail);
