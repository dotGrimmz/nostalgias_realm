import React, { useContext, useState, useEffect } from 'react'
import CommerceService from '../service/CommerceService';
import DDTContext from '../context/DDContext';
import ShoppingCart from '../ShoppingCart/ShoppingCart.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';
import { useSnackbar } from 'notistack';
import CheckoutForm from './CheckoutForm';


const service = new CommerceService();


const CheckoutPage = props => {
    const { history } = props;
    const context = useContext(DDTContext);
    const { cart, handleUpdateCart, fetchShippingSubdivisions,
        checkoutToken, countries, handleRemoveItem, getCheckoutToken,
        setCheckoutTokenToEmpty, states } = context;
    const { enqueueSnackbar } = useSnackbar();

    const [priceLoad, setPriceLoad] = useState(false)
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([])
    const [cartData, setCartData] = useState({});
    const [cartId, setCartId] = useState('');
    const [shippingSubdivision, setShippingSubdivision] = useState(states[0]?.id)
    const [shippingCountry, setShippingCountry] = useState(countries[0]?.id)
    const [cartShippingOption, setCartShippingOption] = useState('')



    const routeToHomePage = () => {
        history.push('/home')
    }

    useEffect(() => {
        let mounted = true
        setLoading(true)


        const fetchCart = async () => {
            try {
                // await fetchShippingSubdivisions()
                setCartItems(cart.line_items)
                console.log('triggered in fetch cart useEffect')
                if (cart.line_items.length !== 0) {
                    // let res = await service.getCheckoutData(cart.id)
                    // console.log(res, 'checkout data')
                    setCartData(checkoutToken.live)
                    setCartId(cart.id)
                    console.log('triggered if cart is empty')
                }
            } catch (err) {

            } finally {
                setLoading(false)
            }
        }
        fetchCart()
        if (mounted) fetchCart()
        return () => {
            mounted = false;
        }


    }, [cart]);

    // useEffect(() => {
    //     let mounted = true
    //     const fetchShippingCartOptions = async () => {
    //         try {
    //             await fetchShippingOptions(checkoutToken.id, shippingSubdivision)
    //             console.log('triggered after shipping options endpoint is hit and is not null')



    //         } catch (err) {
    //             console.error(err)
    //         }
    //     }

    //     // if (checkoutToken.id !== undefined || checkoutToken.id !== null || shippingSubdivision !== "") {
    //     if (mounted) {
    //         console.log(checkoutToken.id, 'how sway')

    //         fetchShippingCartOptions()
    //     }

    //     // }
    //     return () => {
    //         mounted = false
    //     }
    // }, [checkoutToken])


    useEffect(() => {
        let mounted = true;
        setPriceLoad(true)
        setLoading(true)
        const handleUpdateToken = async () => {
            if (mounted) {
                try {
                    if (cart?.line_items?.length === 0 || cart === undefined) {
                        setCheckoutTokenToEmpty()
                    } else {
                        await getCheckoutToken(cart?.id)
                        console.log('triggered after checkout token is updated')


                    }


                    setCartData(checkoutToken?.live)
                } catch (err) {
                    console.error(err)
                } finally {
                    setPriceLoad(false)
                    setLoading(false)

                }
            }
        }

        if (mounted) handleUpdateToken()
        return () => {
            mounted = false
        }
    }, [cart])


    const styles = {


        loadingDiv: {
            height: '80vh'
        },

    }

    const handleUpdateQuantity = async (id, quantity) => {
        setLoading(true)
        try {
            console.log(quantity, 'handle update')
            let updatedCart = await handleUpdateCart(id, quantity)

            enqueueSnackbar('Successfully Updated', { variant: 'success' });

        } catch (err) {
            console.error(err)
        } finally {
            // setCartData(checkoutToken.live)

            setLoading(false)

        }
    }

    const removeItem = async (id) => {
        setLoading(true)

        try {
            let res = await handleRemoveItem(id)
            console.log(res, 'coming back from updated removed')
            // setCartItems(updatedCart.cart.line_items)

            enqueueSnackbar('Successfully Removed Item', { variant: 'success' });
            if (cart.total_items === 0) {
                console.log('should be empty cart =[')
                setCartItems([])
            }


        } catch (err) {

        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="cd-section" id="pricing">
            <div>
                {loading && <div style={styles.loadingDiv}><div className="section-space"></div> <LinearProgress />
                </div>
                }
                {!loading && <Container style={styles.container}>
                    <h1 className='title text-center'> Shopping Cart</h1>
                    <ShoppingCart
                        cartItems={cartItems}
                        cartData={cartData}
                        routeToHomePage={routeToHomePage}
                        handleUpdateQuantity={handleUpdateQuantity}
                        handleRemoveItem={removeItem}
                        cartId={cartId}
                        priceLoad={priceLoad}
                        setPriceLoad={setPriceLoad}
                        lastUpdated={cart.updated}
                    />
                    {checkoutToken?.id && <CheckoutForm
                        setShippingSubdivision={setShippingSubdivision}
                        shippingSubdivision={shippingSubdivision}
                        cartShippingOption={cartShippingOption}
                        setCartShippingOption={setCartShippingOption}

                        shippingCountry={shippingCountry}
                        setShippingCountry={setShippingCountry}
                    />}

                </Container>}

            </div>
            <div className="section-space"></div>
        </div >






    )
};


export default CheckoutPage


// gotta figure out how to do taxes and shipping and checkout token