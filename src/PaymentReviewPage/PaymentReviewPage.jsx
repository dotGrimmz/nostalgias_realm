import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';
import DDContext from '../context/DDContext';
import Divider from '@material-ui/core/Divider';
import { useForm } from "react-hook-form";
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
    const context = useContext(DDContext);
    const classes = useStyles();

    const { history } = props;
    const { enqueueSnackbar } = useSnackbar();

    const { cart, formData, checkoutToken, handleCaptureCheckout, setCheckoutForm, errorMessage } = context;
    const { register, getValues } = useForm()


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

    // console.log(formData, 'form data')

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
                                {cart?.line_items?.map(x => (
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
                            </Grid>
                        </Grid>



                        {/* swipe */}
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
                            <Grid item xs={12} md={6} >
                                <Typography variant='caption'>
                                    First Name:
                                    </Typography> {formData.firstName}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant='caption'>
                                    Last Name:
                                    </Typography> {formData.lastName}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant='caption'>
                                    e-mail:
                                    </Typography> {formData.email}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant='caption'>
                                    Address:
                                    </Typography> {formData.address}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant='caption'>
                                    City:
                                    </Typography> {formData.city}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant='caption'>
                                    State:
                                    </Typography> {formData.shippingSubdivision}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant='caption'>
                                    Country:
                                    </Typography> {formData.shippingCountry}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant='caption'>
                                    Zip Code:
                                    </Typography> {formData.zipCode}
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