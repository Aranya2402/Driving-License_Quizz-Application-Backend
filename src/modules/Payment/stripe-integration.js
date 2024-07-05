const dotenv = require("dotenv");
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createCheckoutSession = async (req, res) => {
  const { priceId, email } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      return_url: `http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}`
    });

    res.send({ clientSecret: session.client_secret, id: session.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getSessionStatus = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    if (!session.customer_details) {
        return res.status(400).send({ error: "Customer details not found for this session" });
      }

    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createCheckoutSession,
  getSessionStatus
};
