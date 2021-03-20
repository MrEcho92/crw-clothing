import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IQfPRDuhiqAqOhrr8GnH7VtcKb0vy1CksentHmvpohEQP4UyPaJ2G489gidTpyegLT3uusL8D0soH0th0zz5kqp00LrCp2yHe";

  const onToken = (token) => {
  
    axios({
      url: "/payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    }).then(response =>{
      alert('Payment Successful')
    }).catch(error =>{
      console.log('Payment error: ', JSON.parse(error));
      alert('There was an issue with payment. Please sure to use provided credit information.')
    });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      currency="GBP"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is £${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
