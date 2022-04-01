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
    console.log(countries);

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries}= await commerce.services.localeListShippingCountries(checkoutTokenId);
        // console.log(countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])
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
                                onChange={e =>  setShippingCountries(e.target.value)}>
                                {countries.map(country => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Spipping Subdivision</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
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