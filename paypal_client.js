// Request Paypal credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
PaypalLogin.requestCredential = function(options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback) {
    if (_.isFunction(options)) {
      credentialRequestCompleteCallback = options;
    }
  }
  else if (_.isFunction(options)) {
    options = options();
  }

  options = _.isObject(options) ? options : {};
  credentialRequestCompleteCallback = _.isFunction(credentialRequestCompleteCallback) ? credentialRequestCompleteCallback : function() {
    if (console && _.isFunction(console.log)) {
      console.log('PaypalLogin#credentialRequestCompleteCallback', arguments);
    }
  };

  var config = PaypalLogin.getConfig();
  if (!config) {
    if (_.isFunction(credentialRequestCompleteCallback)) {
      credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
    }
    return;
  }

  var defaultScope = _.isArray(PaypalLogin.defaultScope) ? PaypalLogin.defaultScope : [],
      scope = ['openid', 'email'].concat(_.isArray(options.requestPermissions) ? options.requestPermissions : defaultScope),
      flatScope = _.map(_.uniq(scope), encodeURIComponent).join('+'),
      credentialToken = Random.secret(), 
      loginStyle = OAuth._loginStyle('paypal', config, options);    

  var loginUrl = PaypalLogin.getAuthorizationEndpoint() + '/webapps/auth/protocol/openidconnect/v1/authorize' +
    '?client_id=' + config.clientId +
    '&scope=' + flatScope +
    '&redirect_uri=' + OAuth._redirectUri('paypal', config) +
    '&state=' + OAuth._stateParam(loginStyle, credentialToken) +
    '&response_type=code';

  OAuth.launchLogin({
    loginService: 'paypal',
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: {
      'width': options.width || 600, 
      'height': options.height || 566
    }
  });
};
