import {combineReducers} from 'redux';
import list from './list';
import comments from './comments';
import auth from './auth';

export default combineReducers({
    list,
    comments,
    auth
});
