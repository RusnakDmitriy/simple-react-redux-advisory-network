import {START, SUCCESS, LOAD_LIST_OF_PRODUCTS, LOAD_PRODUCT_COMMENTS} from '../constants';
import {arrToMap} from '../helpers';
import {OrderedMap, Record, List} from 'immutable';

const ListRecord=Record({
    text: undefined,
    title: '',
    id: undefined,
    img: undefined
});

const ReducerState=Record({
    loading:false,
    loaded:false,
    commentsLoading:List([]),
    commentsLoaded:List([]),
    entities:new OrderedMap({}) 
});

const defaultState=new ReducerState();


export default (listState=defaultState, action)=>{
    const {type, payload, response}=action;
    
    switch(type){         
        case LOAD_LIST_OF_PRODUCTS+START:
            return listState.set('loading', true)
        
        case LOAD_LIST_OF_PRODUCTS+SUCCESS:
            return listState
                        .set('entities', arrToMap(response, ListRecord))
                        .set('loading', false)
                        .set('loaded', true)
            
        case LOAD_PRODUCT_COMMENTS+START:
            return listState.setIn(['commentsLoading',payload.id], true)
            
        case LOAD_PRODUCT_COMMENTS+SUCCESS:
            return listState.setIn(['commentsLoading',payload.id], false)
                            .setIn(['commentsLoaded',payload.id], true)
    }
    
    return listState
}