import React, { Component } from 'react';
import DDContext from './DDContext';
import CommerceService from '../service/CommerceService';


const service = new CommerceService()


class ContextImplementation extends Component {


    addToCart = async (id, quantity) => {

        try {
            let res = await service.addToCart(id, quantity)
            this.setState({ shoppingCart: res.cart, cartTotal: res.cart.total_items })
            return res._console[1];
        } catch (err) {
            console.error(err)
            return false
        }

    }

    initializeCart = (cart) => {
        this.setState({ shoppingCart: cart })
        sessionStorage.setItem('cart', cart)
    }



    state = {
        shoppingCart: {},
        initializeCart: this.initializeCart,
        addToCart: this.addToCart,
        cartTotal: 0
    }


    render() {
        const { children } = this.props;
        console.log(this.state, 'state obj')


        return (
            <DDContext.Provider value={this.state}>{children}</DDContext.Provider>
        )
    }


}

export default ContextImplementation;