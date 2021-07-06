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
        if (cart.total_items.length === 0 || cart.total_items === undefined || cart.total_items === null) {
            this.setState({ shoppingCart: cart, cartTotal: cart.total_items })

        } else {
            this.setState({ shoppingCart: cart, cartTotal: 0 })

        }
        sessionStorage.setItem('cart', cart)
    }

    handleUpdateCart = async (id, quantity) => {
        try {
            let updatedCart = await service.updateCart(id, quantity)
            this.setState({ shoppingCart: updatedCart.cart, cartTotal: updatedCart.cart.total_items })


        } catch (err) {
            console.error(err)
        }
    }

    clearCart = async () => {
        try {
            let res = await service.emptyCart()
            this.setState({ shoppingCart: res.cart, cartTotal: res.cart.total_items })
        } catch (err) {
            console.error(err)
        }
    }


    state = {
        shoppingCart: {},
        initializeCart: this.initializeCart,
        addToCart: this.addToCart,
        cartTotal: 0,
        handleUpdateCart: this.handleUpdateCart,
        cleartCart: this.clearCart
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