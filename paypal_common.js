PaypalLogin = {
  'apiEndpoints': {
    'live': 'https://api.paypal.com',
    'sandbox': 'https://api.sandbox.paypal.com'
  },
  'authorizationEndpoints': {
    'live': 'https://www.paypal.com',
    'sandbox': 'https://www.sandbox.paypal.com'
  },
  'defaultScope': ['profile', 'address', 'phone', 'https://uri.paypal.com/services/paypalattributes'],
  'environment': '',
  'service': 'paypal',
  '_getConfig': function () {
    return ServiceConfiguration.configurations.findOne({service: this.service});
  },
  'getConfig': function () {
    var config = this._getConfig();
    if (!config) {
      throw new ServiceConfiguration.ConfigError();
    }        
    return config;
  },
  'getEnvironment': function (env) {
    env = (env = env || this.environment) === 'test' ? 'sandbox' : env;
    if (!_.isString(env) || env.length === 0) {
      env = this.getConfig().environment;
    }
    return env;
  },
  'getAuthorizationEndpoint': function (env) {
    var endpoint = this.authorizationEndpoints[this.getEnvironment(env)];
    if (!_.isString(endpoint)) {
      throw new Error('Set up wrong environment');
    }
    return endpoint;
  },
  'getApiEndpoint': function (env) {
    var endpoint = this.apiEndpoints[this.getEnvironment(env)];
    if (!_.isString(endpoint)) {
      throw new Error('Set up wrong environment');
    }
    return endpoint;
  },
  '_getScope': function (requestPermissions) {
    var defaultScope = _.isArray(this.defaultScope) ? this.defaultScope : [],
        scope = ['openid', 'email'].concat(_.isArray(requestPermissions) ? requestPermissions : defaultScope);   
    return _.uniq(scope);
  },
  'getScope': function (requestPermissions) {
    return this._getScope(requestPermissions).join(' ');
  }  
};
