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
    const { cart, handleUpdateCart, setCheckoutForm,
        checkoutToken, countries, handleRemoveItem, fetchLiveCheckoutToken,
        setCheckoutTokenToEmpty, states, getCheckoutToken } = context;
    const { enqueueSnackbar } = useSnackbar();

    const [priceLoad, setPriceLoad] = useState(false)
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([])
    const [cartData, setCartData] = useState({});
    const [shippingSubdivision, setShippingSubdivision] = useState(states[0]?.id || '')
    const [shippingCountry, setShippingCountry] = useState(countries[0]?.id || '')
    const [cartShippingOption, setCartShippingOption] = useState('')



    const routeToHomePage = () => {
        history.push('/home')
    }

    // useEffect(() => {
    //     let mounted = true
    //     setLoading(true)


    //     const fetchCart = async () => {
    //         try {
    //             // await fetchShippingSubdivisions()
    //             setCartItems(cart.line_items)
    //             console.log('triggered in fetch cart useEffect')
    //             if (cart?.line_items?.length !== 0) {

    //                 setCartData(checkoutToken.live)
    //                 setCartId(cart.id)
    //                 console.log('triggered if cart is empty')
    //             }
    //         } catch (err) {

    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    //     fetchCart()
    //     if (mounted) fetchCart()
    //     return () => {
    //         mounted = false;
    //     }


    // }, [cart]);


    // I need to work on taxes and shipping and getting it integrated with discounts. fuck me

    useEffect(() => {
        const initializeCheckoutToken = async (cartId) => {
            await getCheckoutToken(cartId)
        }
        initializeCheckoutToken(cart?.id)

    }, [])


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
                        await fetchLiveCheckoutToken(checkoutToken?.id)
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
        container: {
            minHeight: '80vh'
        }

    }

    const handleUpdateQuantity = async (id, quantity) => {
        setLoading(true)
        try {
            console.log(quantity, 'handle update')
            await handleUpdateCart(id, quantity)

            enqueueSnackbar('Successfully Updated', { variant: 'success' });

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)

        }
    }

    const removeItem = async (id) => {
        setLoading(true)
        try {
            await handleRemoveItem(id)
            enqueueSnackbar('Successfully Removed Item', { variant: 'success' });
            if (cart.total_items === 0) {
                setCartItems([])
            }
        } catch (err) {
        } finally {
            setLoading(false)
        }
    }


    const handleFormSubmit = async (data, errorHandler) => {
        console.log(data, 'form state')
        if (data.shippingCountry === undefined || data.cartShippingOption === undefined || data.shippingSubdivision === undefined) {
            console.log('the form is missing fields')
            errorHandler(true);
            setTimeout(() => errorHandler(false)
                , 3000)
            return false
        } else {
            try {
                await setCheckoutForm(data)
                await history.push('/paymentreview')
            } catch (err) {
                console.error(err)
            }



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
                        priceLoad={priceLoad}
                        setPriceLoad={setPriceLoad}
                        lastUpdated={cart.updated}
                    />
                    {checkoutToken?.id && <CheckoutForm
                        setShippingSubdivision={setShippingSubdivision}
                        shippingSubdivision={shippingSubdivision}
                        cartShippingOption={cartShippingOption}
                        setCartShippingOption={setCartShippingOption}
                        handleFormSubmit={handleFormSubmit}
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


