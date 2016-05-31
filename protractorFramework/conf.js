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
var screen = [1440, 900];
if ( process.env.DISPLAY_SIZE ) {
  var arr = process.env.DISPLAY_SIZE.split("x");
  screen = [Number(arr[0]), Number(arr[1])];
  console.log("DISPLAY width X height: " + screen.join(" X "));
}
console.log("Browser:" + capabilities.browserName + ", Base URL: " + baseUrl);

exports.config = {
  seleniumPort: 4444,
  baseUrl: baseUrl,
  params: {
    screen: {
      width: screen[0],
      height: screen[1]
    },
    screenshotPath: "./report/protractor",
    login: {
      username: 'admin',
      password: 'admin'
    }
  },
  allScriptsTimeout: 30000,
  capabilities: capabilities,

  suites: suites,

  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  },
  onPrepare: './utility/preparation.js'
};
