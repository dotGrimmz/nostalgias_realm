import React, { useContext, useState, useEffect } from 'react'
import CommerceService from '../service/CommerceService';
import DDTContext from '../context/DDContext';
import ShoppingCart from '../ShoppingCart/ShoppingCart.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';
import { useSnackbar } from 'notistack';


const service = new CommerceService();


const CheckoutPage = props => {
    const { history } = props;
    const context = useContext(DDTContext);
    const { shoppingCart, handleUpdateCart, initializeCart } = context;
    const { enqueueSnackbar } = useSnackbar();


    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([])
    const [cartData, setCartData] = useState("");

    const routeToHomePage = () => {
        history.push('/home')
    }

    useEffect(() => {

        const fetchCart = async () => {
            setLoading(true)
            try {
                let cart = await service.getCart()
                console.log(cart.line_items)
                setCartItems(cart.line_items)
                if (cart.line_items.length !== 0) {
                    let res = await service.getCheckoutData(cart.id)
                    console.log(res, 'checkout data')
                    // setCartData(res)
                } else {
                    setCartData([])
                }

            } catch (err) {

            } finally {
                setLoading(false)
            }
        }
        fetchCart()
    }, [shoppingCart]);


    const fetchCart = async () => {
        setLoading(true)
        try {
            let cart = await service.getCart()
            let res = await service.getCheckoutData(cart.id)
            console.log(cart, 'cart')
            console.log(res, 'res')

            // setCartItems(res.live.line_items)
            // setCartData(res.subtotal.formatted_with_symbol)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const styles = {


        loadingDiv: {
            height: '80vh'
        },
        container: {
            minHeight: '80vh'
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
            setLoading(false)

        }
    }

    const handleRemoveItem = async (id) => {
        setLoading(true)

        try {
            let updatedCart = await service.deleteCartItem(id);

            initializeCart(updatedCart.cart)

            console.log(updatedCart, 'updated cart ')
            setCartItems(updatedCart.cart.line_items)

            enqueueSnackbar('Successfully Removed Item', { variant: 'success' });
            if (updatedCart.cart.total_items === 0) {
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
            <div
            >
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
                        handleRemoveItem={handleRemoveItem}
                    />

                </Container>}

            </div>
            <div className="section-space"></div>
        </div >






    )
};


export default CheckoutPage


// gotta figure out how to do taxes and shipping and checkout token