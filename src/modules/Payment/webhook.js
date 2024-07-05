const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const Transaction = require('../../models/Transaction');
const {User} = require('../../models/User');

const router = express.Router();

router.post('/', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = 'whsec_H5Ep4bxXKRnOOTFPkYslOXykNZRlvdov';

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  
  const logTransaction = async (session, status) => {
    try {
      const saltRounds = 10;
      const hashedSessionId = await bcrypt.hash(session.id, saltRounds);

      const email = session.customer_details ? session.customer_details.email : null;
      if (!email) {
        throw new Error('Email not found in session details');
      }

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const logEntry = new Transaction({
        sessionId: hashedSessionId,
        customerId: session.customer || (session.customer_details && session.customer_details.email),
        amountTotal: session.amount_total/100 || (session.amount/100 && session.amount_received/100),
        currency: session.currency,
        paymentStatus: status,
        createdAt: new Date(session.created * 1000),
        // cardLast4: cardLast4,
        userDetails: { 
          id: user._id,
          name: user.firstName,
          email: user.email,
        }
      });

      await logEntry.save();
      console.log('Transaction logged:', logEntry);
    } catch (error) {
      console.error('Error saving transaction log:', error);
    }
  };

  console.log('Received Stripe Event:', event); // Log the entire event object received from Stripe

  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      const asyncPaymentFailed = event.data.object;
      await logTransaction(asyncPaymentFailed, 'async_payment_failed');
      break;
    case 'checkout.session.async_payment_succeeded':
      const asyncPaymentSucceeded = event.data.object;
      await logTransaction(asyncPaymentSucceeded, 'async_payment_succeeded');
      break;
    case 'checkout.session.completed':
      const checkoutCompleted = event.data.object;
      // const paymentIntent = await stripe.paymentIntents.retrieve(checkoutCompleted.payment_intent);
      // const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method);
      // const cardLast4 = paymentMethod.card.last4;
      await logTransaction(checkoutCompleted, 'completed');
      break;
    case 'payment_intent.payment_failed':
      const paymentFailed = event.data.object;
      await logTransaction(paymentFailed, 'payment_failed');
      break;
    case 'payment_intent.requires_action':
      const requiresAction = event.data.object;
      await logTransaction(requiresAction, 'requires_action');
      break;
    case 'payment_intent.succeeded':
      const paymentSucceeded = event.data.object;
      await logTransaction(paymentSucceeded, 'succeeded');
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
