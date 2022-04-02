import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { InputLabel, Select, MenuItem, Button, Grid,Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField'
import { commerce } from '../../lib/commerce'
const AddressForm = ({checkoutToken, next}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();
    
    // return array of object {id, label}
    const countries = Object.entries(shippingCountries)
        .map(([code, name]) => ({id: code, label: name}))
    const subdivisions = Object.entries(shippingSubdivisions)
        .map(([code, name]) => ({id: code, label: name}))
    const options = shippingOptions.map((shipOp) => (
        { id: shipOp.id, label: `${shipOp.description} - (${shipOp.price.formatted_with_symbol})`}) )

    
    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries}= await commerce.services.localeListShippingCountries(checkoutTokenId);
        // console.log(countries);
        setShippingCountries(countries);
        // console.log(Object.keys(countries)[0])
        setShippingCountry(Object.keys(countries)[0]) //show firssssst country in placeholder
        // console.log(shippingCountries)
        // console.log(shippingCountry)
    }
    const fetchSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0]) // show first subdiv in placeholder
    }
    const fetchShippingOptions = async (checkoutTokenId, country, region=null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, 
            {country, region});
        setShippingOptions(options);
        setShippingOption(options[0].id)
        // console.log(options)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])
    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry])
    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, 
            shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])
    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods} >
                {/* // properties is seperate to 2 type
                // 1. is data (react useFormContext is manipulate for us)
                // 2. shipping... these 3 is manually made by us */}
                <form onSubmit={methods.handleSubmit(data => 
                        next({ ...data, 
                            shippingCountry, 
                            shippingSubdivision,
                            shippingOption }))}>
                    <Grid container spacing={3}>
                        {/* // custom component by myself */}
                        <FormInput name='firstName' label='First name'/>
                        <FormInput name='lastName' label='Last name'/>
                        <FormInput name='address1' label='Address'/>
                        <FormInput name='email' label='Email'/>
                        <FormInput name='city' label='City'/>
                        <FormInput name='zip' label='zip'/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Spipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth defaultValue={''}
                                onChange={e =>  setShippingCountry(e.target.value)}>
                                {countries.map(country => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Spipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth defaultValue={''}
                                onChange={e =>  setShippingSubdivision(e.target.value)}>
                                {subdivisions.map(subd => (
                                    <MenuItem key={subd.id} value={subd.id}>
                                        {subd.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Spipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth 
                                onChange={ e => setShippingOption(e.target.value)}>
                                {options.map(opt => (
                                    <MenuItem key={opt.id} value={opt.id}>
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid> 
                    <br />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button variant='outlined' component={Link} to='/cart'>Back to Cart</Button>
                        <Button variant='contained' color='primary' type='submit'>Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm