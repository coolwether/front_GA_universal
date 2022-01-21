var HttpsProxyAgent = require('https-proxy-agent');
var proxyConfig = [{
  context: '/uploads',
  target: 'http://127.0.0.1:1337',
  secure: false,
  "bypass": function (req, res, proxyOptions) {
    if (req.headers.accept.indexOf("html") !== -1) {
      console.log("Skipping proxy for browser request.");
      return "/index.html";
    }
    req.headers["X-Custom-Header"] = "yes";
  }
}];

function setupForCorporateProxy(proxyConfig) {
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    var agent = new HttpsProxyAgent(proxyServer);
    console.log('Using corporate proxy server: ' + proxyServer);
    proxyConfig.forEach(function(entry) {
      entry.agent = agent;
    });
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
