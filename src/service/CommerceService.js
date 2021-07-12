import Commerce from '@chec/commerce.js';

class CommerceService {
    constructor() {
        this.instance = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true)
    }

    fetchFeaturedProducts() {
        return this.instance.products.list({
            category_slug: ['featured'],
        });
    }

    fetchSelectedProduct(id) {
        return this.instance.products.retrieve(id, { type: 'id' })
    }

    fetchNFLProducts() {
        return this.instance.products.list({
            category_slug: ['football', 'nfl']
        })
    }

    fetchAllProducts() {
        return this.instance.products.list()
    }

    getCart() {
        return this.instance.cart.retrieve()
    }

    addToCart(id, quantity) {
        return this.instance.cart.add(id, quantity)
    }


    emptyCart() {
        return this.instance.cart.empty()
    }

    getCheckoutData(id) {
        return this.instance.checkout.generateTokenFrom('cart', id)
    }

    updateCart(id, quantity) {
        return this.instance.cart.update(id, { 'quantity': quantity })
    }

    deleteCartItem(id) {
        return this.instance.cart.remove(id)
    }

    getCardTotal(id) {
        return this.instance.products.retrieve(id)
    }

    validateDiscount(id, code) {
        console.log(code, 'code in the service')
        return this.instance.checkout.checkDiscount(id, { code })
    }

    fetchShippingCountries(id) {
        return this.instance.services.localeListShippingCountries(id)
    }

    fetchShippingSubdivisions() {
        return this.instance.services.localeListSubdivisions('US')
    }

    fetchShippingOptions(id, region) {
        return this.instance.checkout.getShippingOptions(id, { country: 'US', region: region })
    }

    generateCheckoutToken(cartId) {
        return this.instance.checkout.generateToken(cartId, { type: 'cart' })
    }


}

export default CommerceService;