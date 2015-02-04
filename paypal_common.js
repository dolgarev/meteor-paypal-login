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
	'getConfig': function() {
		return ServiceConfiguration.configurations.findOne({service: this.service});
	},
	'getEnvironment': function(env) {
	  env = (env = env || this.environment) === 'test' ? 'sandbox' : env;
	  if (!_.isString(env) || env.length === 0) {
		  var config = this.getConfig();
		  if (!config) {
		    throw new ServiceConfiguration.ConfigError();
		  }
		  env = config.environment;
	  }
	  return env;
	},
	'getAuthorizationEndpoint': function(env) {
		var endpoint = this.authorizationEndpoints[this.getEnvironment(env)];
		if (!_.isString(endpoint)) {
			throw new Error('Set up wrong environment');
		}
		return endpoint;
	},
	'getApiEndpoint': function(env) {
		var endpoint = this.apiEndpoints[this.getEnvironment(env)];
		if (!_.isString(endpoint)) {
			throw new Error('Set up wrong environment');
		}
		return endpoint;
	}
};