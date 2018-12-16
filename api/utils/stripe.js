const stripe = require('stripe');
const nconf = require('nconf');

const STRIPE_KEY = nconf.get('keys.stripe');
const DEFAULT_PLAN_ID = nconf.get('billing.stripe.plan.default.id');

const stripeInstance = new stripe(STRIPE_KEY);

function createCustomer({ token, email, teamLeaderId }) {
  return stripeInstance.customers.create({
    description: 'Stripe Customer at ...',
    email,
    // source: token,
    // metadata: {
    //   teamLeaderId,
    // },
  });
}

function createSubscription({ customerId, teamId, teamLeaderId }) {
  // logger.debug('stripe method is called', teamId, teamLeaderId);
  return stripeInstance.subscriptions.create({
    customer: customerId,
    items: [
      {
        plan: DEFAULT_PLAN_ID,
      },
    ],
    // metadata: {
    //   teamId,
    //   teamLeaderId,
    // },
  });
}

// function cancelSubscription({ subscriptionId }) {
//   logger.debug('cancel subscription', subscriptionId);
//   return stripeInstance.subscriptions.del(subscriptionId, { at_period_end: false });
// }

// function retrieveCard({ customerId, cardId }) {
//   logger.debug(customerId);
//   logger.debug(cardId);
//   return stripeInstance.customers.retrieveCard(customerId, cardId);
// }

// function createNewCard({ customerId, token }) {
//   logger.debug('creating new card', customerId);
//   return stripeInstance.customers.createSource(customerId, { source: token });
// }

// function updateCustomer({ customerId, newCardId }) {
//   logger.debug('updating customer', customerId);
//   return stripeInstance.customers.update(customerId, { default_source: newCardId });
// }

// // function verifyWebHook(request) {
// //   const event = stripeInstance.webhooks.constructEvent<any>(
// //     request.body,
// //     request.headers['stripe-signature'],
// //     ENDPOINT_SECRET,
// //   );
// //   return event;
// // }

// function stripeWebHooks({ server }) {
//   server.post(
//     '/api/v1/public/stripe-invoice-payment-failed',
//     bodyParser.raw({ type: '*/*' }),
//     async (req, res, next) => {
//       try {
//         const event = await verifyWebHook(req);
//         logger.info(event.id);
//         const { subscription } = event.data.object;
//         logger.info(JSON.stringify(subscription));
//         await Team.cancelSubscriptionAfterFailedPayment({
//           subscriptionId: JSON.stringify(subscription),
//         });

//         res.sendStatus(200);
//       } catch (err) {
//         next(err);
//       }
//     },
//   );
// }

// function getListOfInvoices({ customerId }) {
//   logger.debug('getting list of invoices for customer', customerId);
//   return stripeInstance.invoices.list({ customer: customerId });
// }

module.exports = {
  createCustomer,
  createSubscription,
  // cancelSubscription,
  // retrieveCard,
  // createNewCard,
  // updateCustomer,
  // stripeWebHooks,
  // getListOfInvoices,
};
