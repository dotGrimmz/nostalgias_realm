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

    fetchHomePageProducts() {
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
}

export default CommerceService;