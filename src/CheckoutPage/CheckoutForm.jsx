import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { useForm, FormProvider } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import MenuItem from '@material-ui/core/MenuItem';
import DDContext from '../context/DDContext';
import CustomTextField from './CustomTextField';


const CheckoutForm = props => {
    const methods = useForm();
    const { register, formState: { errors } } = useForm();

    const context = useContext(DDContext);
    const { states, shippingOptions, fetchShippingCountries, checkoutToken, fetchShippingSubdivisions, countries, fetchShippingOptions } = context;
    const { setShippingSubdivision, shippingSubdivision, cartShippingOption, setCartShippingOption, shippingCountry, setShippingCountry, handleFormSubmit } = props

    useEffect(() => {
        let mounted = true
        if (mounted) {
            fetchShippingCountries(checkoutToken?.id)
        }
        return () => {
            mounted = false
        }
    }, [fetchShippingCountries, checkoutToken?.id])

    useEffect(() => {
        let mounted = true
        if (mounted) {
            fetchShippingSubdivisions()
        }
        return () => {
            mounted = false
        }
    }, [])

    const handleStateSelection = async (e) => {
        try {
            setShippingSubdivision(e.target.value)
            await fetchShippingOptions(checkoutToken.id, e.target.value)
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <div>
            <Typography variant='h6' gutterBottom>Customer Details</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) =>
                    handleFormSubmit({ ...data, shippingCountry, shippingSubdivision, cartShippingOption })
                )}>
                    <Grid container spacing={2}>
                        <CustomTextField
                            name='firstName'
                            label='First Name'
                            required
                            {...register("firstName", { required: "This is required." })}
                        />
                        <ErrorMessage errors={errors} name="firstName" />

                        <CustomTextField
                            name='lastName'
                            label='Last Name'
                            required
                            {...register("lastName", { required: "This is required." })}
                        />
                        <ErrorMessage errors={errors} name="lastName" />

                        <CustomTextField
                            name='email'
                            label='Email'
                            required
                            {...register("email", { required: "This is required." })}
                        />
                        <ErrorMessage errors={errors} name="email" />

                        <Grid item xs={12}>
                            <Typography variant='h6' gutterBottom>Shipping Address</Typography>

                        </Grid>

                        <CustomTextField
                            name='address'
                            label='Address'
                            required
                            {...register("address", { required: "This is required." })}

                        />
                        <ErrorMessage errors={errors} name="address" />


                        <CustomTextField
                            name='city'
                            label='City'
                            required
                            {...register("city", { required: "This is required." })}

                        />
                        <ErrorMessage errors={errors} name="city" />

                        <Grid item xs={12} sm={6}>
                            <InputLabel >Shipping Country</InputLabel>
                            <Select
                                value={shippingCountry}
                                required
                                fullWidth
                                onChange={(e) => setShippingCountry(e.target.value)}
                            >

                                {countries.map((x, index) => (
                                    <MenuItem key={index} value={x.id}>
                                        {x.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            <ErrorMessage errors={errors} name="country" />

                        </Grid>
                        <CustomTextField
                            name='zipCode'
                            label='Zip Code'
                            required
                            {...register("zipCode", { required: "This is required." })}
                        />
                        <ErrorMessage errors={errors} name="zipCode" />

                        <Grid item xs={12} sm={6}>
                            <InputLabel >Shipping State</InputLabel>
                            <Select
                                value={shippingSubdivision}
                                fullWidth
                                onChange={(e) => handleStateSelection(e)}
                                name="state"
                                required
                            >
                                {states.map((x, index) => (
                                    <MenuItem key={index} value={x.id}>
                                        {x.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            <ErrorMessage errors={errors} name="state" />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel >Shipping Option</InputLabel>
                            <Select
                                value={cartShippingOption}
                                fullWidth
                                required
                                onChange={(e) => setCartShippingOption(e.target.value)}

                            >
                                {shippingOptions.map((x) => (
                                    <MenuItem key={x.id} value={x.id}>
                                        {x.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            <ErrorMessage errors={errors} name="shippingOption" />

                        </Grid>


                        <Grid item align='center' xs={12}> <Button color='primary' variant='outlined' type='submit'>
                            Continue to Payment
                            </Button></Grid>
                    </Grid>
                </form>
            </FormProvider>
        </div >
    )
}

export default CheckoutForm;