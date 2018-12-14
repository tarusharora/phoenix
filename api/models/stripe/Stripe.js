const { get } = require('lodash');

const { createCustomer, createSubscription } = require('../../utils/stripe');


function stripe(schema) {
  schema.add({
    stripe: {
      customerId: String,
      created: Number,
      currency: String,
      default_source: String,
      description: String,
    },
  });

  schema.pre('save', async function (next) {
    const user = this;
    try {
      await user.createCustomer();
      const customerId = get(user, 'stripe.customerId');
      if (customerId) {
        await user.createSubscription({ customerId });
      }
      next();
    } catch (err) {
      next(err);
    }
  });

  schema.methods.createCustomer = async function () {
    const user = this;
    const customer = await createCustomer({
      email: user.email,
    });
    user.stripe.customerId = customer.id;
  };

  schema.methods.createSubscription = async function ({ customerId }) {
    await createSubscription({
      customerId,
    });
  };
}


module.exports = stripe;
