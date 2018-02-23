import React, {Component} from 'react';
import {registration} from '../AC';
import {connect} from 'react-redux';

class Registration extends Component{
    constructor(props){
        super(props);
        if(localStorage.getItem('smktesting')){
            this.state={
                username: JSON.parse(localStorage.getItem("smktesting")).username,
                password: JSON.parse(localStorage.getItem("smktesting")).password
            }
        } else {
            this.state={
                username:'',
                password:''
            }
        }

        this.handleAuth=this.handleAuth.bind(this);
        this.handleChangeUsername=this.handleChangeUsername.bind(this);
        this.handleChangePassword=this.handleChangePassword.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }
    
    handleAuth(){
        this.props.registration(this.state);
        this.props.history.push('/');
        this.setState({
            username:'',
            password:''
        })
    }
    
    handleCancel(){
        this.props.history.push('/');
    }
    
    handleChangeUsername(ev){
        let target=ev.target;
        this.setState({username:target.value});
    }
    
    handleChangePassword(ev){
        let target=ev.target;
        this.setState({password:target.value});
    }
    
    render(){
        const {username, password}=this.state;
        return (
            <div>
                <h3>Please, enter your username and password</h3>
                <div><span className='authLable'>username: </span><input type='text' value={username} onChange={this.handleChangeUsername} /></div>
                <div><span className='authLable'>password: </span><input type='password' value={password} onChange={this.handleChangePassword} /></div>
                <div>
                    <span className='authLable'></span>
                    <button onClick={this.handleAuth}>Ok</button>
                    <button onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default connect((state)=>{
    return {
        auth: state.auth
    }
}, (dispatch)=>({
    registration: (user)=>dispatch(registration(user))
}))(Registration)