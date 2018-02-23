import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mapToArr} from '../helpers';
import {loadProductComments} from '../AC';
import Loader from './Loader';
import Comment from './Comment';
import CommentsForm from './CommentsForm';

class CommentsList extends Component {
  
    componentDidMount(){
        const {loaded, loading, loadProductComments, id} = this.props;
        if(!loaded) loadProductComments(id)
    }
    
    getComments(){
        const {comments,id}=this.props;
        return(
            <ul>
                {comments.map((comment) => {
                    return <Comment key={comment.id} attr={comment} />
                })}
            </ul>
        )
    }
    
    getCommentsForm(){
        const {token, id}=this.props;
        if(token) return <CommentsForm id={id} />
    }
    
  render() {
    const {comments, loading, loaded, token}=this.props;
    if(loading) return <Loader />
    return (
        <div className='productsField clearfix commentsField'>
            <div>{this.getCommentsForm()}</div>
            <div className='sideBar clearfix sideBarRight'>{this.getComments()}</div>
        </div>
    )
  }
}

export default connect((state, ownProps) => {
    return {
        comments: mapToArr(state.comments.entities).filter(list=>list.product==ownProps.id),
        loading: state.list.commentsLoading.get(ownProps.id),
        loaded: state.list.commentsLoaded.get(ownProps.id),
        token: state.auth.token
    }
}, {loadProductComments})(CommentsList)
