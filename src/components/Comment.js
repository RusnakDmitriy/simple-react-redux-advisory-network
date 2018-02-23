import React from 'react';

function Comment(props){
    const {attr}=props;

    return (
        <div className='comment'>
            <h3>created by: {attr.created_by.username}</h3>
            <h3>comment: {attr.text}</h3>
            <h3>rate: {attr.rate}</h3>            
        </div>
    )
}

export default Comment