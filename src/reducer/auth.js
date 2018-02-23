import {SUCCESS, LOGIN, AUTHENTICATION, REGISTRATION} from '../constants';

const defaultState={
    username:'',
    password:'',
    token: undefined
};

export default (authState=defaultState, action)=>{
    const {type, payload}=action;
    
    switch(type){
        case AUTHENTICATION:
            return {...authState, username: payload.user.username, password: payload.user.password}
            
        case LOGIN+SUCCESS:
            return {...authState, token: payload.response.token}
            
        case REGISTRATION+SUCCESS:
            return {...authState, token: payload.response.token}
    }
    
    return authState
}