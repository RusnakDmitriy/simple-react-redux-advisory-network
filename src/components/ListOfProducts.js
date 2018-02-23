import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadListOfProducts} from '../AC';
import {mapToArr} from '../helpers';
import Loader from './Loader';
import {NavLink} from  'react-router-dom';

class ListOfProducts extends Component{
    static propTypes={
        ListOfProducts: PropTypes.array.isRequired
    }

    componentDidMount(){
        const {loaded, loading, loadListOfProducts} = this.props;
        if(!loaded && !loading) loadListOfProducts()
    }

    render(){
        const {ListOfProducts, loading}=this.props;
        if(loading) return <Loader />
        const listElements = ListOfProducts.map(element=>
                <li key={element.id} className='productItem'>
                    <NavLink to={`/products/${element.id}`}>
                        <div>{element.title}</div>
                        <div><img src={`http://smktesting.herokuapp.com/static/${element.img}`} alt='' className='image'/></div>
                    </NavLink>
                </li>
        );
        return(
            <div className='productsField clearfix picturesField'>
                <ul className='sideBar listOfProducts clearfix sideBarLeft'>
                    {listElements}
                </ul>
            </div>
        )
    }
}

export default connect((state)=>{
    return {
        ListOfProducts: mapToArr(state.list.entities),
        loading: state.list.loading,
        loaded: state.list.loaded
    }
}, {loadListOfProducts})(ListOfProducts)