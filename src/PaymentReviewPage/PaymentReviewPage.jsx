import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import DDContext from '../context/DDContext';
import Divider from '@material-ui/core/Divider';
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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

});


const PaymentReviewPage = props => {
    const [loading, setLoading] = useState(false);
    const [paymentLoad, setPaymentLoad] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("Pending");

    const context = useContext(DDContext);
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const { cart, formData, checkoutToken, handleCaptureCheckout, handleTaxInfo, getCheckoutToken, setCheckoutForm, errorMessage, order, resetOrder } = context;


    const styles = {


        loadingDiv: {
            height: '80vh'
        },
        container: {
            minHeight: '80vh',
            backgroundColor: 'white'

        },
        stripeContainer: {
            border: '1px solid black',
            padding: '2%',
            backgroundColor: 'lightgrey'
        },
        customerInfoItem: {
            padding: '.5%'
        },
        shippingCard: {
            width: '80%'
        },
        grandTotal: {
            paddingTop: "30%"
        }
        

    }


    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "20px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };


    useEffect(() => {
        const loadTaxes = async (checkoutId, city, zipcode) => {
            await handleTaxInfo(checkoutId, city, zipcode)

        }
        loadTaxes(checkoutToken.id, formData.shippingSubdivision, formData.zipCode)

    }, [])
    useEffect(() => {
        setLoading(true)
        const loadCheckoutToken = async (checkoutId) => {
            try {
                await getCheckoutToken(checkoutId)

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)

            }
        }
        loadCheckoutToken(cart.id)
        return () => {
            resetOrder()
        }
        
    }, [])





    useEffect(() => {
        let data = window.sessionStorage.getItem('formData')
        if (!formData.firstName && data) {
            setCheckoutForm(JSON.parse(data))
        } else {
            console.log('form data does exist!')
        }
    }, [formData])


    const handlePaymentSubmit = async (e, elements, stripe) => {
        e.preventDefault();
        setPaymentLoad(true)
        if (!stripe || !elements) return;
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement })

        if (error) {
            console.error(error)
        } else {
            setPaymentStatus("Processing")
            const orderData = {
                line_item: checkoutToken.live.line_items,
                customer: {
                    firstname: formData.firstName,
                    lastname: formData.lastName,
                    email: formData.email
                },
                shipping: {
                    name: 'Shipping',
                    street: formData.address,
                    town_city: formData.city,
                    county_state: formData.shippingSubdivision,
                    postal_zip_code: formData.zipCode,
                    country: formData.shippingCountry
                },
                billing: {
                    name: 'Billing',
                    street: formData.address,
                    town_city: formData.city,
                    county_state: formData.shippingSubdivision,
                    postal_zip_code: formData.zipCode,
                    country: formData.shippingCountry
                },
                fulfillment: { shipping_method: formData.cartShippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }

            }
            console.log(orderData, 'order data')
            let res = await handleCaptureCheckout(checkoutToken.id, orderData)
            if (!res) {
                enqueueSnackbar(errorMessage || 'There was an Error', { variant: 'error' });
                setPaymentStatus("Error")
            } else {
                enqueueSnackbar("Order Complete!", { variant: 'Success' });
                setPaymentStatus("Complete")
            }
        }
        setPaymentLoad(false)

    }



    return (
        <div className="cd-section" id="pricing">
            <div>
                {loading && <div style={styles.loadingDiv}><div className="section-space"></div> <LinearProgress />
                </div>}
                {!loading && <Container style={styles.container}>
                    <h1 className='title text-center'> Payment Reivew</h1>
                    <Grid container alignItems='center' >
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4} >
                            {paymentStatus !== "Complete" && cart?.line_items?.map(x => (
                <Grid item xs={12} key={x.id} >
                    <Grid container alignItems='center'>
                        <Grid item xs={12} md={6} >
                            <Typography variant='h6' display='inline'>
                                {x?.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Typography variant='body1'>
                                ...{x?.line_total?.formatted_with_symbol}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align='left'>
                            <Divider variant='middle' style={{ width: '55%' }} />
                        </Grid>
                    </Grid>
                </Grid>
            ))}
               { paymentStatus === "Complete" && order?.line_items?.map(x => (
                <Grid item xs={12} key={x.id} >
                    <Grid container alignItems='center'>
                        <Grid item xs={12} md={6} >
                            <Typography variant='h6' display='inline'>
                                {x?.product_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Typography variant='body1'>
                                ...{x?.line_total?.formatted_with_symbol}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align='left'>
                            <Divider variant='middle' style={{ width: '55%' }} />
                        </Grid>
                    </Grid>
                </Grid>
            ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container align='center' style={styles.stripeContainer}>
                                <Grid item xs={12}>

                                    <ElementsConsumer >
                                        {({ elements, stripe }) => (
                                            <form onSubmit={(e) => handlePaymentSubmit(e, elements, stripe)}>
                                                <div style={{ backgroundColor: 'transparent', width: 'auto' }}>
                                                    <CardElement options={cardStyle} />
                                                </div>
                                                <br />
                                                <div>

                                                    <Button variant='contained' color='primary' fullWidth type='submit' disabled={paymentLoad} classes={{ root: classes.shopBtn }}>
                                                        Pay {checkoutToken?.live?.total_with_tax.formatted_with_symbol}
                                                    </Button>

                                                </div>
                                            </form>
                                        )}
                                    </ElementsConsumer>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ padding: '2%', margin: '2%', backgroundColor: 'lightgrey' }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} align='center' sm={6}>
                            <Card style={styles.shippingCard}>
                            <Grid item xs={12} md={6} style={styles.customerInfoItem}>
                                <Typography variant='caption'>
                                    First Name:
                                    </Typography> 
                                    <h6>{formData.firstName.toUpperCase()}</h6>
                            </Grid>
                            <Grid item xs={12} md={6} style={styles.customerInfoItem}>
                                <Typography variant='caption'>
                                    Last Name:
                                    </Typography> <h6>{formData.lastName.toUpperCase()}</h6> 
                            </Grid>
                            <Grid item xs={12} md={6} style={styles.customerInfoItem}>
                                <Typography variant='caption'>
                                    e-mail:
                                    </Typography> 
                                    <h6>{formData.email.toUpperCase()}</h6>
                            </Grid>
                            <Grid item xs={12} md={6} style={styles.customerInfoItem}>
                                <Typography variant='caption'>
                                    Address:
                                    </Typography> 
                                    <h6>{formData.address.toUpperCase()}</h6>
                            </Grid>
                            <Grid item xs={12} md={6} style={styles.customerInfoItem}>
                                <Typography variant='caption'>
                                    City:
                                    </Typography> 
                                    <h6>{formData.city.toUpperCase()}</h6>
                            </Grid>
                            <Grid item xs={12} md={6} style={styles.customerInfoItem}>
                                <Typography variant='caption'>
                                    State:
                                    </Typography> 
                                    <h6>{formData.shippingSubdivision.toUpperCase()}</h6>
                            </Grid>
                            <Grid item xs={12} md={6} style={styles.customerInfoItem}>
                                <Typography variant='caption'>
                                    Country:
                                    </Typography> 
                                    <h6>{formData.shippingCountry.toUpperCase()}</h6>
                            </Grid>

                            <Grid item xs={12} md={6} style={styles.customerInfoItem}>
                                <Typography variant='caption'>
                                    Zip Code:
                                    </Typography> 
                                    <h6>{formData.zipCode.toUpperCase()}</h6>
                                    </Grid>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Grid container>
                                    <Grid item xs={12}>
                                    <Typography variant="h2" align='center'>
                                             Order {paymentStatus}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                       <Typography variant="body1"><b>Shipping</b> . . . . . . . . .</Typography>  
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                       <Typography variant='body1' align='right'><b> Included</b></Typography>  
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                       <Typography variant="body1"><b>Taxes</b> . . . . . . . . . . . .</Typography>  
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                       <Typography variant='body1' align='right'><b> Included</b></Typography>  
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                       <Typography variant="body1"><b>Est Devlivery</b> . . . . . .</Typography>  
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                       <Typography variant='body1' align='right'><b> less than 7 days</b></Typography>  
                                    </Grid>
                                    <Grid item xs={12} >
                                       <Typography variant='body2' align='center'>Tracking and Shipping info will be emailed when items are shipped</Typography>  
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={styles.grandTotal}>
                                       <Typography variant='h3'><b>Grand Total</b></Typography>  
                                    </Grid>
                                    <Grid item xs={12} sm={6} align='right' style={styles.grandTotal}>
                                       <Typography variant="h3"><b>{checkoutToken?.live?.total_with_tax.formatted_with_symbol}</b></Typography>  
                                    </Grid>
                                </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                </Container>}
            </div>
            <div className="section-space"></div>
        </div >
    )
}


export default PaymentReviewPage