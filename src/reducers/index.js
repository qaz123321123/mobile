let guid = -1;

function getArrayByLength(length) {
    var ret = [];
    for (var i = 0; i < length; i++) {
        ret[i] = null;
    }
    return ret;
}

function getRandomList(size) {
    return getArrayByLength(size).fill(1).map(num => parseInt(Math.random() * 100));
}

function getRandomDataSource(size) {
    return getRandomList(size).map(num => ({ text: num, key: ++guid }));
}
var arr=[];
export default (initialState = {
    list: []
}, action) => {
    const { type, payload} = action;
    switch (type) {
        //当初次请求（page=1）或者刷新，切换的时候发起这个action，
        case 'UPDATE_LIST':{
            return {
                list:payload.data.list
            }
            break;
        }
        //加载更多的时候发起这个action去连接数据（page>1）
        case 'CONCAT_LIST':{
            return {
                
                list:initialState.list.concat(payload.data.list)
            }
            break;
        }
        default: {
            return initialState;
        }
    }
};