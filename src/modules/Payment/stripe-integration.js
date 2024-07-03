const stripe = require('stripe')('sk_test_51P0HbhKqUCwilBKSTuLI1ZJmlddnjBoGblIIQ4EYxM4RokAod2Nydm11i5di3d6VgfrPLx32rZ4wwhVUsIehRiSy00034cU2NL');
const YOUR_DOMAIN = 'http://localhost:3001';


const createCheckoutSession = async (req, res) => {
  const { priceId } = req.body;

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
      return_url: `http://localhost:3001/return?session_id={CHECKOUT_SESSION_ID}`
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
