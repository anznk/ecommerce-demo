const functions = require('firebase-functions');
const sendgrid = require('@sendgrid/mail');
const cors = require('cors');


require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_KEY);


// Send response when calling APIs
const sendResponse = (response, statusCode, body) => {
    response.send({
        statusCode,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(body)
    });
};

exports.retrievePaymentMethod = functions.https.onRequest((req, res) => {
    const corsHandler = cors({origin: true});
    corsHandler(req, res, () => {
        
        if (req.method !== 'POST') {
            sendResponse(res, 405, {error: "Invalid Request"})
        }

        return stripe.paymentMethods.retrieve(
            req.body.paymentMethodId
        ).then((customer) => {
            sendResponse(res, 200, customer);
        }).catch((error) => {
            console.error(error);
            sendResponse(res, 500, {error: error})
        })

    })
})

/**
 * Create the Stripe Payment Intent when
 * return {object} paymentIntent The data of payment which has Stripe Payment ID
 */
exports.stripeCustomer = functions.https.onRequest((req, res) => {
    const corsHandler = cors({origin: true});

    corsHandler(req, res, () => {
        if (req.method === 'POST') {
            return stripe.customers.create({
                description: 'Toraseminar customer',
                email: req.body.email,
                metadata: {userId: req.body.userId},
                payment_method: req.body.paymentMethod,
            }).then((customer) => {
                sendResponse(res, 200, customer);
            }).catch((error) => {
                console.error(error);
                sendResponse(res, 500, {error: error})
            })
        } else if (req.method === 'DELETE') {
            return stripe.customers.del(
                req.body.customerId
            ).then((customer) => {
                sendResponse(res, 200, customer);
            }).catch((error) => {
                console.error(error);
                sendResponse(res, 500, {error: error})
            })
        } else {
            sendResponse(res, 405, {error: "Invalid Request"})
        }


    })
})

exports.updatePaymentMethod = functions.https.onRequest((req, res) => {
    const corsHandler = cors({origin: true});

    corsHandler(req, res, () => {
        if (req.method !== 'POST') {
            sendResponse(res, 405, {error: "Invalid Request"})
        }

        return stripe.paymentMethods.detach(
            req.body.prevPaymentMethodId
        ).then((prevPaymentMethod) => {
            return stripe.paymentMethods.attach(
                req.body.nextPaymentMethodId,
                {customer: req.body.customerId,}
            ).then((nextPaymentMethod) => {
                sendResponse(res, 200, nextPaymentMethod);
            })

        }).catch((error) => {
            console.error(error);
            sendResponse(res, 500, {error: error})
        })

    })
})




exports.paymentIntent = functions.https.onRequest((req, res) => {
    const corsHandler = cors({origin: true});

    corsHandler(req, res, () => {
        if (req.method !== 'POST') {
            sendResponse(res, 405, {error: "Invalid Request"})
        }
        return stripe.paymentIntents.create({
            currency: 'cad',
            amount: req.body.amount,
            customer: req.body.customerId,
            payment_method: req.body.paymentMethodId,
            off_session: true,
            confirm: true
        }).then((customer) => {
            sendResponse(res, 200, customer);
        }).catch((error) => {
            console.error(error);
            sendResponse(res, 500, {error: error})
        })
    })
})
