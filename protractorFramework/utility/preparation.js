/**
 * Created by Tony on 11/26/14.
 * Desc: This file is used for the preparation before the spec files executed.
 */
var LoginPage = require('../pageObject/loginPage.js');
var HtmlReporter = require('protractor-html-screenshot-reporter');

require('jasmine-bail-fast');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
global.expect   = chai.expect;


var today = new Date(),
    timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '-' + today.getHours() + 'h-' + today.getMinutes() + 'm';

var reporter = new HtmlReporter({
    baseDirectory: browser.params.screenshotPath, // a location to store screen shots.
    docTitle: 'Loglogic Protractor Reporter',
    docName: 'report.html'
});

browser.driver.manage().window().setSize(browser.params.screen.width, browser.params.screen.height);

jasmine.getEnv().addReporter(reporter);
jasmine.getEnv().bailFast();
/**
 * prepare for log in before execute the test cases.
 * @type {LoginPage}
 */
var loginPage = new LoginPage();
loginPage.visitPage();
loginPage.login();