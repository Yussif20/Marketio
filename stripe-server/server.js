const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
const stripe = Stripe('sk_test_51QOTVfHaR89c2xSJmOtSMQZbht80hsrP8tkG9zzXsd6P1hHopxnX9SL37nXs5N9YhOVbH35AGM1YFipJ30EVN0PZ00xwjwBEd5');

// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON requests

// Payment endpoint
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; // Amount in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
