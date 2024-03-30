function paymentCheckout( req, res ) {

    const response = {
        error: "Email or Password is invalid",
        status: false,
    }

    res.status(401).send( response );
}

module.exports = {
    signInUser
}
    