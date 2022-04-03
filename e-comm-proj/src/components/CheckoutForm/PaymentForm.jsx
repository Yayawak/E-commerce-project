import React from 'react'
import { Typography, Button, Divider} from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe  } from '@stripe/stripe-js'
import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, backStep, nextStep, shippingData, onCaptureCheckout }) => {
    
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod(
            {type: 'card', card: cardElement}
        )
        if (error) console.error(error)
        else {
            // all real data
            console.log(shippingData)
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstName, 
                    lastName:shippingData.lastName,
                    email: shippingData.email
                }
                    ,
                shipping: { 
                    name: 'International', 
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    country_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry 
                },
                fulfillment: {
                    shipping_method: shippingData.shippingOption
                },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }
            console.log('new order :')
            console.log(orderData)
            //sent all data to commerce.js 
            onCaptureCheckout(checkoutToken.id, orderData)
            nextStep()
        }
    }

    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant='h6' gutterBottom 
                style={{margin: '20px 0'}}>Payment method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                {/* element consumer */}
                    {({ elements, stripe}) => (
                        <form onSubmit={e => handleSubmit(e,elements,stripe)}>
                            <CardElement />
                            <br /> <br />
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant='outlined'
                                    onClick={ backStep }>Back</Button>
                                <Button type='submit' variant='contained'
                                    disabled={!stripe} color='primary'>
                                        Pay { checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                        )
                    }
                </ElementsConsumer> 
            </Elements>
        </>
    )
}

export default PaymentForm