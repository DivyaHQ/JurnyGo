import { View, Text } from 'react-native'
import React from 'react'
import { StripeProvider } from '@stripe/stripe-react-native'
import projectEnv from '../../projectEnv'
import PaymentScreen from './paymentScreen'

const CardPayment = ({ navigation }) => {
    return (
        <StripeProvider
            publishableKey={projectEnv.STRIPE_KEY}
            merchantIdentifier="merchant.identifier" // required for Apple Pay
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        >
            <PaymentScreen navigation={navigation} />
        </StripeProvider>
    )
}

export default CardPayment