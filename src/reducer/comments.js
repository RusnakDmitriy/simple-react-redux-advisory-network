import {START, SUCCESS, LOAD_PRODUCT_COMMENTS, NEWPOST} from '../constants';
import {arrToMap} from '../helpers';
import {OrderedMap, Record} from 'immutable';

const CommentsRecord=Record({
    id: undefined,
    product: undefined,
    created_at: undefined,
    created_by: {
        id: undefined,
        username: undefined,
        first_name: undefined,
        last_name: undefined,
        email: undefined
    },
    rate: undefined,
    text: undefined
});

const ReducerState=Record({
    loading:false,
    loaded:false,
    entities:new OrderedMap({}) 
});

const defaultState=new ReducerState();

export default (commentsState=defaultState, action) => {
    const {type, payload}=action;
    
    switch(type){
        case LOAD_PRODUCT_COMMENTS+START:
            return commentsState.set('loading', true)
            
        case LOAD_PRODUCT_COMMENTS+SUCCESS:
            return commentsState.update('entities', entities=>entities.merge(arrToMap(payload.response,CommentsRecord)))
                                .set('loaded', true)
                                .set('loading', false)
            
        case NEWPOST+SUCCESS:
            return commentsState.update('entities', entities=>entities)
        
    }
    
    return commentsState
}