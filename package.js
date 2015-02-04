Package.describe({
  name: 'liberation:paypal-login',
  summary: 'Log In with PayPal',
  version: '1.0.1',
  git: 'https://github.com/dolgarev/meteor-paypal-login'
});

Package.onUse(function(api) {
  api.use('oauth2@1.1.2', ['client', 'server']);
  api.use('oauth@1.1.3', ['client', 'server']);
  api.use('http@1.0.10', ['server']);
  api.use('underscore@1.0.2', 'client');
  api.use('templating@1.0.11', 'client');
  api.use('random@1.0.2', 'client');
  api.use('service-configuration@1.0.3', ['client', 'server']);

  api.export('PaypalLogin');  

  api.addFiles(['paypal_configure.html', 'paypal_configure.js'], 'client');
  api.addFiles('paypal_common.js', ['client', 'server']);
  api.addFiles('paypal_server.js', 'server');
  api.addFiles('paypal_client.js', 'client');
});
