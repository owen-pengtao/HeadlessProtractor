var suites = {
  search   : 'tests/search.js'
};

var baseUrl;
if ( process.env.SERVER_HOSTNAME ) {
  baseUrl = "http://" + process.env.SERVER_HOSTNAME;
} else {
  baseUrl = 'https://www.google.com';
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

var HtmlReporter = require('protractor-jasmine2-screenshot-reporter');
var reporter = new HtmlReporter({
  dest: "./report/protractor", // a location to store screen shots.
  docTitle: 'HeadLess Protractor Reporter',
  cleanDestination: true,
  showSummary: false,
  showConfiguration: false,
  reportTitle: null,
  filename: 'report.html'
});


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
  // Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },

  // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },
  onPrepare: function() {
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    global.expect = chai.expect;

    browser.driver.manage().window().setSize(browser.params.screen.width, browser.params.screen.height);
    jasmine.getEnv().addReporter(reporter);

    return browser.sleep(1000);
  }
};
