export const fetchList = (page,label) => dispatch => (
    fetch('http://127.0.0.1/api/book/search?page='+page+'&limit=10&bookType=3&imageSize=big&label='+label+'&destId=300679&q=&destType=1')
        .then(res =>res.json()
            .then(data => {
                if(!data.data.list.length){
                    return null;
                }else{
                    if (page === 1) {
                        return dispatch({
                            type: 'UPDATE_LIST',
                            payload: data

                        })
                    } else{
                        return dispatch({
                            type: 'CONCAT_LIST',
                            payload: data

                        })
                    }
                }
            }
        ))
);