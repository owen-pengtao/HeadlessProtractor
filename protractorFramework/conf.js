var suites = {
  login   : 'tests/login.js'
};

var baseUrl;
if ( process.env.SERVER_HOSTNAME ) {
  baseUrl = "http://" + process.env.SERVER_HOSTNAME;
} else {
  baseUrl = 'http://127.0.0.1:9680';
}
var capabilities = {
  'browserName': 'chrome'
};
if ( process.env.BROWSER === "firefox") {
  capabilities = {
    "browserName": "firefox",
    "firefox_binary": "/Applications/Firefox34.app/Contents/MacOS/firefox-bin",
    "binary_": "/Applications/Firefox34.app/Contents/MacOS/firefox-bin"
  };
}
console.log("Browser:" + capabilities.browserName + ", Base URL: " + baseUrl);

exports.config = {
  seleniumPort: 4444,
  baseUrl: baseUrl,
  params: {
    screen: {
      width: 1280,
      height: 800
    },
    screenshotPath: "./report/protractor",
    login: {
      username: 'admin',
      password: 'admin'
    }
  },
  allScriptsTimeout: 150000,
  capabilities: capabilities,

  suites: suites,

  jasmineNodeOpts: {
    defaultTimeoutInterval: 3600000
  },
  onPrepare: './utility/preparation.js'
};
