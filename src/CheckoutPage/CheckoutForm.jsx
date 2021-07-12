import React, { useState, useContext, useEffect } from 'react';
import TextField from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { useForm, FormProvider } from 'react-hook-form';
import MenuItem from '@material-ui/core/MenuItem';
import CustomTextField from './CustomTextField';
import DDContext from '../context/DDContext';
import CommerceService from '../service/CommerceService'

const service = new CommerceService()

const CheckoutForm = props => {
    const methods = useForm();

    const context = useContext(DDContext);
    const { states, shippingOptions, fetchShippingCountries, checkoutToken, fetchShippingSubdivisions, countries, fetchShippingOptions } = context;
    const { setShippingSubdivision, shippingSubdivision, cartShippingOption, setCartShippingOption, shippingCountry, setShippingCountry } = props


    useEffect(() => {
        let mounted = true
        const fetchCountries = async () => {
            try {
                console.log(checkoutToken.id, 'check out id')
                let res = await fetchShippingCountries(checkoutToken?.id)
                console.log('triggers when form is mounted')
                console.log(res, 'obj from countries')
            } catch (err) {
                console.error(err)
            }
        }

        if (mounted) {
            fetchCountries()
            fetchShippingSubdivisions()
        }
        return () => {
            mounted = false
        }
    }, [])

    const handleStateSelection = async (e) => {
        try {
            setShippingSubdivision(e.target.value)
            let res = await fetchShippingOptions(checkoutToken.id, e.target.value)
            console.log(res)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <Typography variant='h6' gutterBottom>Customer Details</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => console.log({ ...data, shippingSubdivision, cartShippingOption }))}>
                    <Grid container spacing={2}>
                        <CustomTextField
                            name='firstName'
                            label='First Name'
                            required
                        />
                        <CustomTextField
                            name='lastName'
                            label='Last Name'
                            required
                        />
                        <CustomTextField
                            name='email'
                            label='Email'
                            required
                        />
                        <Grid item xs={12}>
                            <Typography variant='h6' gutterBottom>Shipping Address</Typography>

                        </Grid>

                        <CustomTextField
                            name='address'
                            label='Address'
                            required
                        />

                        <CustomTextField
                            name='city'
                            label='City'
                            required
                        />
                        <Grid item xs={12} sm={6}>
                            <InputLabel >Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)} >

                                {countries.map((x, index) => (
                                    <MenuItem key={index} value={x.id}>
                                        {x.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <CustomTextField
                            name='zipCode'
                            label='Zip Code'
                            required
                        />
                        <Grid item xs={12} sm={6}>
                            <InputLabel >Shipping State</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => handleStateSelection(e)}>
                                {states.map((x, index) => (
                                    <MenuItem key={index} value={x.id}>
                                        {x.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel >Shipping Option</InputLabel>
                            <Select value={cartShippingOption} fullWidth onChange={(e) => setCartShippingOption(e.target.value)}>
                                {shippingOptions.map((x) => (
                                    <MenuItem key={x.id} value={x.id}>
                                        {x.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>



                        <Grid item align='center' xs={12}> <Button color='primary' variant='outlined' type='submit'>
                            Continue to Payment
                            </Button></Grid>
                    </Grid>
                </form>
            </FormProvider>
        </div>
    )
}

export default CheckoutForm;