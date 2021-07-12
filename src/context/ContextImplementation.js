import React, { Component } from 'react';
import DDContext from './DDContext';
import CommerceService from '../service/CommerceService';


const service = new CommerceService()


class ContextImplementation extends Component {


    componentDidMount = async () => {
        // console.log(JSON.parse(window.sessionStorage.getItem('cart')), 'sesssion storage cart')
        try {
            let cart = await service.getCart()
            this.setState({ cart: cart })
            console.log(this.state.cart, 'cart on mount')
            if (cart?.line_items?.length > 0) {
                let token = await this.getCheckoutToken(cart.id)
                console.log(token, 'should be the token')
                this.setState({ checkoutToken: token })
            }
        } catch (err) {
            console.error(err)
        }
    }

    addToCart = async (id, quantity) => {

        try {
            let res = await service.addToCart(id, quantity)
            this.setState({ cart: res.cart })
            return res._console[1]
        } catch (err) {
            console.error(err)
            return false
        }

    }

    fetchFeaturedProducts = async () => {
        const { data } = await service.fetchFeaturedProducts()

        this.setState({ featuredProducts: data })
        console.log('featured products completed')

    }

    fetchProducts = async () => {
        const { data } = await service.fetchAllProducts();
        this.setState({ products: data })
        console.log('products completed')


    }

    initializeCart = async () => {

        if (window.sessionStorage.getItem('cart') !== null) {
            try {
                let cart = await service.getCart();

                this.setState({ cart: cart })
                if (cart.line_items.length > 0) {
                    let token = await this.getCheckoutToken(cart?.id)
                    console.log(token, 'should be the token')
                    this.setState({ checkoutToken: token })
                }

                window.sessionStorage.setItem('cart', cart)
                console.log('fetching cart complete')
            } catch (err) {
                console.error(err)
            }
        } else {
            let parsedCart = JSON.parse(window.sessionStorage.getItem('cart'))

            this.setState({ cart: parsedCart })

            console.log('gettin cart from session storage')
        }
    }

    handleUpdateCart = async (id, quantity) => {
        try {
            let updatedCart = await service.updateCart(id, quantity)
            this.setState({ cart: updatedCart.cart })
            if (updatedCart.total_items > 0) {
                let token = await this.getCheckoutToken(updatedCart.id)
                this.setState({ checkoutToken: token })

            }


        } catch (err) {
            console.error(err)
        }
    }

    handleRemoveItem = async (id) => {
        try {
            let cart = await service.deleteCartItem(id)
            console.log(cart.cart, 'delete res')
            this.setState({ cart: cart.cart })
            console.log(this.cart, 'cart')
            if (cart?.total_items?.length > 0) {
                let token = await this.getCheckoutToken(cart.id)

                this.setState({ checkoutToken: token })

            } else {
                console.log('cart reset triggered')
                this.setState({ checkoutToken: {} })
            }
        } catch (err) {
            console.error(err)

        }
    }

    clearCart = async () => {
        try {
            let res = await service.emptyCart()
            this.setState({ cart: res.cart, cartTotal: res.cart.total_items, checkoutToken: {} })


        } catch (err) {
            console.error(err)
        }
    }

    handleDiscountCode = async (id, code) => {
        try {
            let res = await service.validateDiscount(id, code)
            console.log(res, 'discount obj in context')

        } catch (err) {
            console.error(err)
        }
    }

    fetchSelectedProduct = async (id) => {
        try {
            let item = await service.fetchSelectedProduct(id);
            return item

        } catch (err) {
            console.error(err)
        }
    }

    fetchShippingCountries = async (checkoutTokenId) => {
        try {
            let res = await service.fetchShippingCountries(checkoutTokenId)
            console.log(res, 'res countries')
            const countries = Object.entries(res.countries).map(([code, name]) => ({ id: code, label: name }))
            this.setState({ countries: countries })
            return res
        } catch (err) {
            console.error(err)
        }

    }


    fetchShippingSubdivisions = async () => {
        try {
            let res = await service.fetchShippingSubdivisions()
            const states = Object.entries(res.subdivisions).map(([code, name]) => ({ id: code, label: name }))
            this.setState({ states: states })
            return res
        } catch (err) {
            console.error(err)
        }

    }

    fetchShippingOptions = async (id, region = 'AL') => {
        try {
            let res = await service.fetchShippingOptions(id, region)
            const options = res.map((sO) => (
                { id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }
            ))
            this.setState({ shippingOptions: options })
        } catch (err) {
            console.error(err)
        }
    }

    getCheckoutToken = async (cartId) => {
        try {
            let token = await service.generateCheckoutToken(cartId)
            this.setState({ checkoutToken: token })
            console.log(token, 'checkout token')
        } catch (err) {
            console.error(err)
        }
    }

    setCheckoutTokenToEmpty = () => {
        console.log('cart must be empty so this triggers')
        this.setState({ checkoutToken: {} })
    }


    state = {
        cart: {},
        products: [],
        featruedProducts: [],
        states: [],
        countries: [],
        checkoutToken: {},
        shippingOptions: [],
        initializeCart: this.initializeCart,
        addToCart: this.addToCart,
        cartTotal: 0,
        handleUpdateCart: this.handleUpdateCart,
        cleartCart: this.clearCart,
        handleDiscountCode: this.handleDiscountCode,
        fetchProducts: this.fetchProducts,
        fetchFeaturedProducts: this.fetchFeaturedProducts,
        fetchSelectedProduct: this.fetchSelectedProduct,
        fetchShippingSubdivisions: this.fetchShippingSubdivisions,
        fetchShippingCountries: this.fetchShippingCountries,
        getCheckoutToken: this.getCheckoutToken,
        fetchShippingOptions: this.fetchShippingOptions,
        handleRemoveItem: this.handleRemoveItem,
        setCheckoutTokenToEmpty: this.setCheckoutTokenToEmpty
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