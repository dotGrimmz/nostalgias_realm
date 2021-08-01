import React, { useContext, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import DDTContext from '../context/DDContext';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CartItem from './CartItem';
import gengar from '../images/gengar.jpg';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';





const useStyles = makeStyles({
    shopBtn: {
        background:
            "radial-gradient(ellipse at center," +
            "black" +
            " 0," +
            "grey" +
            " 100%)",
    },
    cardContainer: {
        background: `url(${gengar})`,
        backgroundSize: 'cover',
        backgroundPosition: "center",
        opacity: "50%",
        zIndex: 1,


    },
    visibleLayer: {
        backgroundColor: 'transparent',
        zIndex: 5
    },
    clearCartBtn: {
        background: "radial-gradient(ellipse at center," +
            "white" +
            " 0," +
            "grey" +
            " 100%)",
        border: '1px solid black',
    },

    updateBtn: {
        background: "radial-gradient(ellipse at center," +
            "white" +
            " 0," +
            "green" +
            " 100%)",
        border: '1px solid black',
        color: 'black'

    }
});



const ShoppingCart = React.memo((props) => {
    const context = useContext(DDTContext);
    const { cleartCart, handleDiscountCode, cart, checkoutToken, fetchLiveCheckoutToken, handleTaxInfo } = context;
    const { handleUpdateQuantity, handleRemoveItem, priceLoad } = props;

    const [discount, setDiscount] = useState('');
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();



    const styles = {
        container: {
            minHeight: '50vh',
            minWidth: '75%',
            padding: '1%',
            backgroundColor: 'grey',
        },
        cartItem: {
            padding: '1%'
        },
        divider: {
            padding: '2%',
        },
        card: {
            backgroundColor: 'transparent',
            minHeight: '200px',
            minWidth: '80%',
            margin: '2%',
            zIndex: 3,

        },
        text: {
            fontSize: '30px',

        }
    }

    const checkDiscount = async () => {
        let isValid = await handleDiscountCode(checkoutToken.id, discount);

        if (isValid) {
            await fetchLiveCheckoutToken(checkoutToken.id)

        } else {
            enqueueSnackbar('Invalid Discount Code', { variant: 'error' });

        }
    }

    // const momoizedCart = useMemo(({ cart }) => {

    //     const cartState = { ...cart }
    //     return cartState;

    // }, (prevProps, nextProps) => {
    //     console.log(prevProps, 'prev props', 'next props', nextProps)
    //     if (prevProps.cart.subtotal.formatted !== nextProps.cart.subtotal.formatted) {
    //         return true
    //     }
    //     return false
    // })

    // const memoizedCart = React.memo(() => {
    //     console.log(cart, 'cart in the use')
    //     return cart
    // }, (prevProps, nextProps) => {
    //     console.log(prevProps, 'prev props')
    //     if (prevProps.cart.subtotal.formatted !== nextProps.cart.subtotal.formatted) {
    //         return true
    //     }
    //     return false
    // });





    // useEffect(() => {
    //     const fetchTaxes = async (cartId) => {
    //         let location = await fetchIPAddress()
    //         console.log('ip address fetched');

    //         let abbv = states?.find(x => x.label === location?.region)
    //         if (cartId !== undefined) {
    //             await handleTaxInfo(cartId, abbv?.id, location?.postal_zip_code)
    //             console.log(cartId, 'triggers if cart id in layout isnt undefined -> getting tax info')
    //         } else {

    //         }
    //         // console.log('tax info fetched')
    //     }

    //     fetchTaxes(checkoutToken?.id)

    // }, [memoizedCart?.subtotal?.formatted])







    return (
        <Paper style={styles.container}  >
            <Grid container justify='center' spacing={2} alignItems='center' >
                {cart?.line_items?.length > 0 && cart?.line_items?.map((x) => (
                    <Grid key={x.id} item xs={12} align='center' style={styles.cartItem}>
                        <CartItem name={x.name}
                            image={x.media.source}
                            price={x.line_total.formatted}
                            quantity={x.quantity}
                            handleUpdateQuantity={handleUpdateQuantity}
                            handleRemoveItem={handleRemoveItem}
                            id={x.id}
                            productId={x.product_id}
                        />
                    </Grid>
                ))}
                {cart?.line_items?.length <= 0 && <h1 className="text-center">Your Shopping Cart Is Empty</h1>}
                <Grid item xs={12} style={styles.divider}>
                    <Divider variant='middle' />
                </Grid>
                <Grid item xs={6} >
                    <TextField
                        fullWidth
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        name="discount"
                        label='Discount Code'
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={2} align='center' >
                    <IconButton variant='contained'
                        classes={{ root: classes.updateBtn }}
                        onClick={() => checkDiscount()}
                    >
                        Apply
                    </IconButton>
                </Grid>
                <Grid item xs={12} md={4} align='center'>
                    <IconButton onClick={() => cleartCart()} classes={{ root: classes.clearCartBtn }}>
                        Clear Cart
                        <ClearAllIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={12} style={styles.divider}>
                    <Divider variant='middle' />
                </Grid>
                {checkoutToken?.live?.discount?.code && <Grid item xs={12} md={6} style={{ alignSelf: 'center', padding: '3%' }}>
                    <h4 style={{ color: 'lightgreen' }}>You Saved {checkoutToken.live.discount.amount_saved.formatted_with_symbol} with Discount Code {checkoutToken.live.discount.code}</h4>
                </Grid>}
                <Grid item xs={12} md={6} style={{ alignSelf: 'center', padding: '3%' }}>
                    <Button onClick={() => handleTaxInfo(checkoutToken.id)} fullWidth classes={{ root: classes.shopBtn }} variant='contained' color='primary'>
                        I need a few more things..
                    </Button>
                </Grid>
                <Grid item xs={12} md={6} alignItems='center'>
                    <Card raised classes={{ root: classes.cardContainer }} >
                        {priceLoad && <div ><div style={{ padding: '3%' }} className="text-center section-space"><CircularProgress color='secondary' /></div>
                        </div>
                        }
                        {!priceLoad && <CardContent>
                            <Grid container justify='space-between' style={{ backgroundColor: 'transparent', }} >

                                <Grid item xs={6} align='left'>
                                    <Typography variant='h5' style={{ width: '35%' }} >Discount</Typography>
                                </Grid>
                                <Grid item xs={6} align="right">
                                    <Typography style={{ width: 'auto' }} variant='h6'>{checkoutToken?.live?.discount?.length === 0 ? "No Discount Applied" : checkoutToken?.live?.discount?.amount_saved?.formatted_with_symbol}</Typography >
                                </Grid>
                                <Grid item xs={12} style={styles.divider}>
                                    <Divider variant='middle' />
                                </Grid>
                                <Grid item xs={6} align='left'>
                                    <Typography variant='h5' style={{ width: '55%' }} >Subtotal</Typography>
                                </Grid>
                                <Grid item xs={6} align="right">
                                    <Typography style={{ width: '40%' }} variant='h4'>{cart?.subtotal?.formatted_with_symbol}</Typography >
                                </Grid>
                            </Grid>
                        </CardContent>}
                    </Card>
                </Grid>
            </Grid>
        </Paper >
    )
}, (prevProps, nextProps) => {
    if (prevProps.lastUpdated !== nextProps.lastUpdated) {
        return true
    }
    return false
})

export default ShoppingCart;

// Shipping policy	
// All orders are shipped within 2-3 business days excluding holidays. Unfortunately, we're not responsible for lost or stolen packages.
//  Once the package shipping status updates as "delivered", the transaction is considered final. Any further questions about shipping and tracking, 
//  feel free to contact us masterchefmeta@gmail.com
