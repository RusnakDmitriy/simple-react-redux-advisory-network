import React, {Component} from 'react';
import ListOfProducts from '../ListOfProducts';
import Auth from '../Auth';
import Registration from '../Registration';
import CommentsList from '../CommentsList';
import {Route, Switch, NavLink} from 'react-router-dom';

class Items extends Component{
    
    render(){
        return(
            <div>
                <div className='mainMenu'>
                    <span><NavLink activeStyle={{color:'red'}} to="/auth">Sign In</NavLink></span>
                    <span><NavLink activeStyle={{color:'red'}} to="/registration">Sign Up</NavLink></span>
                </div>
                <ListOfProducts />
                <Switch>
                    <Route path="/auth" component={Auth} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/products" render={this.getIndex} exact />
                    <Route path="/products/:id" render={this.getItem} />
                </Switch>
            </div>
        ) 
    }

    getItem = ({match}) => {
        const {id}=match.params;
        return <CommentsList key={id} id={id} />
    }
    
    getIndex = () => {
        return <h2>Please, select product</h2>
    }
}

export default Items