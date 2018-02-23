import {START, SUCCESS, FAIL, LOAD_LIST_OF_PRODUCTS, LOAD_PRODUCT_COMMENTS, AUTHENTICATION, REGISTRATION, LOGIN, ROUTING, NEWPOST} from '../constants';

export function loadListOfProducts(){
    return {
        type: LOAD_LIST_OF_PRODUCTS,
        callAPI: 'http://smktesting.herokuapp.com/api/products/'
    }
}

export function loadProductComments(id){
    return (dispatch) => {
        dispatch({
            type: LOAD_PRODUCT_COMMENTS+START,
            payload: {id}
        })
        
        fetch(`http://smktesting.herokuapp.com/api/reviews/${id}`)
            .then(res=>res.json())
            .then(response => dispatch({
                type:  LOAD_PRODUCT_COMMENTS+SUCCESS,
                payload: {id,response}
            }))
            .catch(error => dispatch({
                type:  LOAD_PRODUCT_COMMENTS+FAIL,
                payload: {id,error}
            }))
    }
}

export function authentication(user){
    return (dispatch)=>{
        dispatch({
            type: AUTHENTICATION,
            payload: {user} 
        })

        const requestOptions = {
            method:'POST',
            headers: {  
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
            },
            body: `username=${user.username}&password=${user.password}`
        };
        
        fetch('http://smktesting.herokuapp.com/api/register/', requestOptions)
            .then(res=>res.json())
            .then(response=>dispatch({
                type: LOGIN+SUCCESS,
                payload: {user,response}
            }))
            .catch(error=>dispatch({
                type: LOGIN+FAIL,
                payload: {user,error}
            }))
        
        dispatch({
            type: ROUTING,
            payload: {
                user
            }
        })
    }
}


export function registration(user){
    return (dispatch)=>{
        dispatch({
            type: AUTHENTICATION,
            payload: {user} 
        })

        const requestOptions = {
            method:'POST',
            headers: {  
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
            },
            body: `username=${user.username}&password=${user.password}`
        };
        
        fetch('http://smktesting.herokuapp.com/api/login/', requestOptions)
            .then(res=>res.json())
            .then(response=>dispatch({
                type: REGISTRATION+SUCCESS,
                payload: {user,response}
            }))
            .catch(error=>dispatch({
                type: REGISTRATION+FAIL,
                payload: {user,error}
            }))
        
        dispatch({
            type: ROUTING,
            payload: {
                user
            }
        })
    }
}

export function addNewComment(comment, token, id){
    return (dispatch)=>{
        const requestOptions = {
            method:'POST',
            headers: {  
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
              "Authorization": `Token ${token}`
            },
            body: 'rate=' + comment.userRating + '&text=' + comment.newComment
        };
       
        fetch(`http://smktesting.herokuapp.com/api/reviews/${id}`, requestOptions)
            .then(res=>res.json())
            .then(response=>dispatch({
                type: NEWPOST+SUCCESS,
                payload: {
                    response,
                    comment
                }
            }))
            .catch(error=>dispatch({
                type: NEWPOST+FAIL,
                payload: {error, comment}
            }))
    }
}

/*export function authentication(user){
    return {
        type: AUTHENTICATION,
        payload: {user}
    }
}*/