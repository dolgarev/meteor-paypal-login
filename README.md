# meteor-paypal-login

An implementation of the Log In with PayPal. See the [project page](https://www.meteor.com/accounts) on Meteor Accounts for more details.

Install
-----------
```
meteor add liberation:paypal-login
```

Setup
-----------
```js
ServiceConfiguration.configurations.upsert(
  { service: "paypal" },
  { $set: { clientId: "...", secret: "...", loginStyle: "popup", environment: "[live|sandbox]"} }
);
```

