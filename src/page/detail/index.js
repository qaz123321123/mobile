import React, { Component } from 'react';
import { Scroller, Touchable } from '$yo-component';
import Header from '$component/header/index.js';
import yoHistory from '$common/history';
import axios from 'axios';
import './index.scss';
function ItemList(props) {
    let items = props.items;
    items=items.filter((item)=>{
        return item.images!==null
    })
    const listItems = items.map((item,index) =>
        <li>
            <div>
                <img src={item.images[0].url}/>
                <p className='dance'>
                    <span>{item.name}</span>
                    <span className='price'>{item.priceNumber>0 ? '门票'+item.priceNumber+'元起':''}</span>
                </p>
                <p>
                    <span class="b_ratingbox">
                        <span class="rating" style={{width:'.'+item.score+'rem'}}></span>
                    </span>
                </p>
                <p className='introduce'>{item.memo}</p> 
            </div>
        </li>
    );
    return (
        <ul>{listItems}</ul>
    );
}
class DetailPage extends Component {
    constructor(props){
        super(props);
        this.state={
            head:{
                title:'',
                headImage:'',
                memo:''
            },
            showList:[],
            owner:{
                headImage:'',
                nickName:''
            }
        }

    }
    getDetail=(id)=>{
        let _this=this;
        axios.get('http://127.0.0.1/api/book/'+id+'')
            .then(function (response) {
                let res=response.data.data;
                _this.setState({
                    head:{
                        title:res.book.title,
                        headImage:res.book.headImage,
                        memo:res.book.memo
                    },
                    showList:res.book.travelBookDayList[0].elementList,
                    owner:{
                        headImage:res.owner.headImg,
                        nickName:res.owner.nickName
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidMount(){
        let id=this.props.params.id.replace(/:/,'');
        this.getDetail(id);
    }
    render() {
        return (
            <div className="yo-flex">
                <Header title={this.state.head.title}/>     
                <Scroller extraClass="yo-scroller-fullscreen bg-color"  onScroll={(event) => {
                    var oDiv=document.getElementById('header');
                    var oTitle=document.getElementById('title');
                    var oSpan=document.getElementById('span');
                    if(event.contentOffset.y<0){
                        oDiv.style.backgroundColor='#fff';
                        oTitle.style.opacity=1;
                        oSpan.style.color='#212121';
                    }else{
                        oDiv.style.backgroundColor='';
                        oTitle.style.opacity=0;
                        oSpan.style.color='';
                    }
                }}>
                    <div className='full-img'>
                        <img src={this.state.head.headImage}/>
                        <p>{this.state.head.title}</p>
                    </div>
                    <div className='intro'>
                        <div className='user'>
                            <img src={this.state.owner.headImage}/>
                            <p>{this.state.owner.nickName}</p>
                        </div>
                        <p>{this.state.head.memo}</p>
                    </div>
                    <div className='shows'>
                        <ItemList items={this.state.showList}/>
                        <div className='tags'>
                            <span>东京</span>
                            <span>景点</span>
                            <span>美食</span>
                        </div>
                    </div>
                    <div className='see-all'>
                        <p>大家都在看</p>
                        <ul>
                            <li>
                                <a>jjjjjjjjj</a>
                            </li>
                            <li>
                                <a>jjjjjjjjj</a>
                            </li>
                            <li>
                                <a>jjjjjjjjj</a>
                            </li>
                            <li>
                                <a>jjjjjjjjj</a>
                            </li>
                            <li>
                                <a>jjjjjjjjj</a>
                            </li>
                        </ul>
                    </div>
                </Scroller>
            </div>
        )
    }
}

export default DetailPage;
