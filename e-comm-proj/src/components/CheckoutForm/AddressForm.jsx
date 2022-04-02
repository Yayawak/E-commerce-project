import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid,Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField'
import { commerce } from '../../lib/commerce'
const AddressForm = ({checkoutToken}) => {
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
    // console.log(countries);

    const subdivisions = Object.entries(shippingSubdivisions)
        .map(([code, name]) => ({id: code, label: name}))

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries}= await commerce.services.localeListShippingCountries(checkoutTokenId);
        // console.log(countries);
        setShippingCountries(countries);
        // console.log(Object.keys(countries)[0])
        setShippingCountry(Object.keys(countries)[0]) //show firssssst country in placeholder
        // console.log(shippingCountries)
        console.log(shippingCountry)
    }
    const fetchSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0]) // show first subdiv in placeholder
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])
    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry])
    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods} >
                <form onSubmit={()=>{}}>
                    <Grid container spacing={3}>
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
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Spipping Options</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid> */}

                    </Grid> 
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm