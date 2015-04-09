var suites = {
    login   : 'tests/login.js'
};

var baseUrl;
if ( process.env.UNITY_HOSTNAME ) {
	baseUrl = "http://" + process.env.UNITY_HOSTNAME + ":" + ( parseInt(process.env.UNITY_BASEPORT) + 80 );
} else {
    baseUrl = 'http://10.108.16.94:9680';
}
console.log("Base URL: " + baseUrl);

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
    capabilities: {
        'browserName': 'chrome'
    },

    suites: suites,

    jasmineNodeOpts: {
        defaultTimeoutInterval: 3600000
    },
    onPrepare: './utility/preparation.js'
};
