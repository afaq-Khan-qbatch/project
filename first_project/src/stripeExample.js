import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { CardElement, ElementsConsumer, Elements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { deductPayment } from './reducer/stripeReducer';

const CheckoutForm = (props) => {
    const { email } = useSelector((store) => store.items_reducer);
    const dispatch =  useDispatch();

    const [value, setValue] = useState();
    console.log("value => ", value);
    console.log('email ==> ', email);
    const handleSubmit = async (event) => {
        // Block native form submission
        event.preventDefault();

        const { stripe, elements } = props;
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            const userData = { token: paymentMethod, email, subscription_type: value}
            dispatch(deductPayment(userData))
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    const { stripe } = props;
    return (
        <form onSubmit={handleSubmit}>
            <h2>Subscribe our service</h2>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        }

                    },
                    hidePostalCode: true
                }}
            /> &nbsp; &nbsp;
            <FormControl component="fieldset">
                <FormLabel component="legend">select subscription </FormLabel>
                <RadioGroup
                    row
                    aria-label="subscription"
                    defaultValue="50$"
                    name="radio-buttons-group"
                    onChange={(e) => { setValue(e.target.value) }}
                >
                    <FormControlLabel value="50$" control={<Radio />} label="50$" />
                    <FormControlLabel value="60$" control={<Radio />} label="60$" />
                    <FormControlLabel value="70$" control={<Radio />} label="70$" />
                </RadioGroup>
            </FormControl>
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );

}

const InjectedCheckoutForm = () => {
    const stripeElement = loadStripe('pk_test_51Jk6rhGbPq8HgjNU86NxpbB18j2evSTgnycMGTY6YxQgwwMBE9tHnftR0VoUNUjnmNjjTCN9vD082H4fBRcNSSPe00wF841yAA');
    return (
        <Elements stripe={stripeElement}>
            <ElementsConsumer>
                {({ elements, stripe }) => (
                    <CheckoutForm elements={elements} stripe={stripe} />
                )}
            </ElementsConsumer>
        </Elements>
    );
};

export default InjectedCheckoutForm