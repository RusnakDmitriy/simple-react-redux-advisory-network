import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addNewComment} from '../AC';
import {loadProductComments} from '../AC';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

class CommentsForm extends Component {
  constructor(props){
      super(props);
      this.state={
          newComment:'',
          userRating: 0
      };
      this.handleChangeComment=this.handleChangeComment.bind(this);
      this.handleAdd=this.handleAdd.bind(this);
      this.handleRating=this.handleRating.bind(this);
  }
    
  handleChangeComment(ev){
    let target=ev.target;
    this.setState({newComment:target.value});    
  }
    
  handleRating({ rating, type }){
      if (type === 'click'){
          this.setState({userRating: rating})
      }
  }
    
  handleAdd(){
      const {token, id}=this.props;
      this.props.addNewComment(this.state, token, id);
      this.setState({
          newComment:'',
          userRating: 0
      });
      this.props.loadProductComments(id)
  }
    
  render() {
    const {userRating, newComment}=this.state;
      
    return (
        <div className='newCommentField'>
            <div><Rater rating={userRating} onRate={this.handleRating} /></div>
            <textarea name='commentField' value={newComment} onChange={this.handleChangeComment} className='newCommentText'></textarea >
            <div><button onClick={this.handleAdd}>Add</button></div>
        </div>
    )
  }
}

export default connect((state)=>{
    return {
        token: state.auth.token
    }
}, {addNewComment, loadProductComments})(CommentsForm)