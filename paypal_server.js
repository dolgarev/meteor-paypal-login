OAuth.registerService('paypal', 2, null, function(query) {
  //https://developer.paypal.com/webapps/developer/docs/api/#get-user-information  
  var tokenInfo = getTokenInfo(query),
      accessToken = tokenInfo.access_token,
      identity = getIdentity(accessToken),
      serviceData = {
        'id': identity.user_id,
        'tokenType': tokenInfo.token_type,
        'accessToken': OAuth.sealSecret(accessToken),
        'refreshToken': OAuth.sealSecret(tokenInfo.refresh_token),
        'expiresAt': Date.now() + (tokenInfo.expires_in * 1000)
      },
      whitelisted = [
        'name', 'given_name', 'family_name', 'email', 'verified', 'language',
        'gender', 'birthday', 'zoneinfo', 'locale', 'phone_number', 'address', 
        'verified_account', 'account_type', 'age_range', 'payer_id' 
      ];

  _.extend(serviceData, _.pick(identity, whitelisted));

  return {
    'serviceData': serviceData,
    'options': {
      'profile': {
        'name': identity.name
      }
    }
  };
});

var getTokenInfo = function(query) {
  var config = PaypalLogin.getConfig();
  
  var response;
  try {
    response = HTTP.post(
      PaypalLogin.getApiEndpoint() + '/v1/identity/openidconnect/tokenservice', {
        params: {
          'code': query.code,
          'client_id': config.clientId,
          'client_secret': OAuth.openSecret(config.secret),
          'grant_type': 'authorization_code',
          'redirect_uri': OAuth._redirectUri('paypal', config)
        }
      });
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Paypal. " + err.message),
                   {response: err.response});
  }

  if (response.data.error) { // if the http response was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake with Paypal. " + response.data.error);
  } else {
    return response.data;
  }
};

var getAccessToken = function(query) {
  return getTokenInfo(query).access_token;
};

var getIdentity = function(accessToken) {
  try {
    return HTTP.get(
      PaypalLogin.getApiEndpoint() + '/v1/identity/openidconnect/userinfo?schema=openid', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }).data;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Paypal. " + err.message),
                   {response: err.response});
  }
};

PaypalLogin.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
