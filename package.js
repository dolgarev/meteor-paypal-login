Package.describe({
  name: 'liberation:paypal-login',
  summary: 'Log In with PayPal',
  version: '1.0.1',
  git: 'https://github.com/dolgarev/meteor-paypal-login'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2');
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore', 'client');
  api.use('templating', 'client');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('PaypalLogin');  

  api.addFiles(['paypal_configure.html', 'paypal_configure.js'], 'client');
  api.addFiles('paypal_common.js', ['client', 'server']);
  api.addFiles('paypal_server.js', 'server');
  api.addFiles('paypal_client.js', 'client');
});
