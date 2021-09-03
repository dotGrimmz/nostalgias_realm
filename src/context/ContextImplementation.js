import React, { Component } from 'react';
import DDContext from './DDContext';
import CommerceService from '../service/CommerceService';


const service = new CommerceService()


class ContextImplementation extends Component {


    componentDidMount = async () => {

        try {

            let cart = await service.getCart()
            this.setState({ cart: cart })
            console.log(this.state.cart, 'cart on mount')
            console.log('this triggered first')
            if (cart?.line_items?.length > 0) {
                console.log(cart.id, 'cart id')
                let token = await this.getCheckoutToken(cart.id)

                if (token !== undefined) this.setState({ checkoutToken: token })

                console.log('happened in compoinent did mount')
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

    }

    fetchProducts = async () => {
        const { data } = await service.fetchAllProducts();
        this.setState({ products: data })
    }

    initializeCart = async () => {
        try {
            let cart = await service.getCart();
            this.setState({ cart: cart })
            window.sessionStorage.setItem('cart', cart)
        } catch (err) {
            console.error(err)
        }

    }

    handleUpdateCart = async (id, quantity) => {

        try {
            let updatedCart = await service.updateCart(id, quantity)
            this.setState({ cart: updatedCart.cart })
            // if (updatedCart.total_items > 0) {
            //     let token = await this.getCheckoutToken(updatedCart.id)
            //     this.setState({ checkoutToken: token })
            // }
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
            // if (cart?.total_items?.length > 0) {
            //     let token = await this.getCheckoutToken(cart.id)

            //     this.setState({ checkoutToken: token })

            // } else {
            //     console.log('cart reset triggered')
            //     this.setState({ checkoutToken: {} })
            // }
        } catch (err) {
            console.error(err)

        }
    }

    clearCart = async () => {
        try {
            let res = await service.emptyCart()
            this.setState({ cart: res.cart, checkoutToken: {} })


        } catch (err) {
            console.error(err)
        }
    }

    handleDiscountCode = async (id, code) => {
        try {
            let res = await service.validateDiscount(id, code)
            if (res.valid) {

                // ill need this for later
                // this.setState(prevState => ({
                //     checkoutToken: {
                //         ...prevState.checkoutToken,
                //         live: res
                //     }
                // }))
                return true
                // await this.getCheckoutToken(this.checkoutToken?.id)
            } else {
                return false
            }


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
            if (res?.countries?.length === 0) {
                this.setState({ countries: { id: "US", label: "United States" } })

            } else {
                const countries = Object.entries(res.countries).map(([code, name]) => ({ id: code, label: name }))

                this.setState({ countries: countries })
            }

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
        console.log(cartId, 'should be the cart id to generate the checkout token')
        try {
            let token = await service.generateCheckoutToken(cartId)
            this.setState({ checkoutToken: token })
            console.log(token, 'checkout token in get checkout token')
        } catch (err) {
            console.error(err)
        }
    }

    setCheckoutTokenToEmpty = () => {
        console.log('cart must be empty so this triggers')
        this.setState({ checkoutToken: {} })
    }

    setCheckoutForm = data => {
        this.setState({ formData: data })
        if (!window.sessionStorage.getItem('formData')) window.sessionStorage.setItem('formData', JSON.stringify(data))

    }

    refreshCart = async () => {
        try {
            let cart = await service.refreshCart()
            this.setState({ cart: cart })
        } catch (err) {
            console.error(err)
        }
    }

    resetOrder = () => {
        this.setState({ order: {} })
    }

    handleCaptureCheckout = async (id, order) => {
        try {
            let res = await service.captureCheckoutToken(id, order)
            console.log(res, 'res from payment')

            // I have no idea why this is reloading my page much less what the fuck is happening when I hit submit on the damn form
            this.setState({ order: res.order })
            this.refreshCart()
            return true
        } catch (err) {
            console.error(err)
            if (err.statusCode === 422) {
                this.setState({ errorMessage: 'Quantity of Item Not Availible' })

            } else {
                this.setState({ errorMessage: err.data.error.message })
            }
            return false
        }
    }

    handleValidateQuantity = async (checkoutId, lineItemId, quantity) => {
        try {
            let res = await service.validateQuantity(checkoutId, lineItemId, quantity)
            return res
        } catch (err) {
            console.error(err)
        }
    }

    fetchLiveCheckoutToken = async (checkoutId) => {


        //something in here is not triggering .. figure it out.. its whats preventing the cart from being updated
        try {
            let res = await service.getCheckoutTokenLive(checkoutId)
            this.setState(prevState => ({
                checkoutToken: {
                    ...prevState.checkoutToken,
                    live: res
                }
            }))
            console.log(this.checkoutToken.live, 'res after fetching live token')
        } catch (err) {
            this.setState({ errorMessage: err?.data?.error?.message })
        }
    }

    handleTaxInfo = async (checkoutId, region, zipcode) => {
        try {
            let res = await service.getTaxInfo(checkoutId, region, zipcode)
            console.log(res.live, 'tax info in context coming back from the service. match one')
            this.setState(prevState => ({
                checkoutToken: {
                    ...prevState.checkoutToken,
                    live: res.live
                }
            }))
            console.log(this.state.checkoutToken.live, 'checkout token after tax info has been updated. match two')
        } catch (err) {
            console.error(err)
        }
    }

    fetchIPAddress = async () => {
        try {
            let res = await service.getIPAddress()
            return { region: res.data.location.region, postal_zip_code: res.data.location.postalCode }
        } catch (err) {
            console.log(err)
        }
    }






    state = {
        cart: {},
        products: [],
        featruedProducts: [],
        states: [],
        countries: [],
        checkoutToken: {},
        shippingOptions: [],
        formData: {},
        order: {},
        errorMessage: '',
        initializeCart: this.initializeCart,
        addToCart: this.addToCart,
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
        setCheckoutTokenToEmpty: this.setCheckoutTokenToEmpty,
        setCheckoutForm: this.setCheckoutForm,
        handleCaptureCheckout: this.handleCaptureCheckout,
        handleValidateQuantity: this.handleValidateQuantity,
        fetchLiveCheckoutToken: this.fetchLiveCheckoutToken,
        handleTaxInfo: this.handleTaxInfo,
        fetchIPAddress: this.fetchIPAddress,
        resetOrder: this.resetOrder
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