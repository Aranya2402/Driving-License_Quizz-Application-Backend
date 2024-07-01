const express = require('express');
const stripe = require('stripe')('sk_test_51P0HbhKqUCwilBKSTuLI1ZJmlddnjBoGblIIQ4EYxM4RokAod2Nydm11i5di3d6VgfrPLx32rZ4wwhVUsIehRiSy00034cU2NL');
const bodyParser = require('body-parser');
const Transaction = require('../../models/Transaction');

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
    const logEntry = new Transaction({
      sessionId: session.id,
      customerId: session.customer || (session.customer_details && session.customer_details.email),
      amountTotal: session.amount_total || (session.amount && session.amount_received),
      currency: session.currency,
      paymentStatus: status,
      createdAt: new Date(session.created * 1000),
    });
    
    // console.log(session.data);
    
    try {
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
