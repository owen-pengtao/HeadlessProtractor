var Page = require('../utility/page.js');
var globalCommons = require('../utility/common.js');
var LoginPage = (function () {
    function LoginPage(){
        this.pathURL = '/login';
        this.screenElement = by.id('loginPageInner');
        this.usernameInput = by.id('username');
        this.passwordInput = by.id('password');
        this.loginButton = by.id('login');
        this.loginError = by.css('#loginPageInner .login-error-message');
    }

    LoginPage.prototype = new Page();
    LoginPage.prototype.constructor = LoginPage;


    /**
     * The login method is used for execute the login operation.
     * @param username
     * @param passoword
     */
    LoginPage.prototype.login = function(username, passoword) {
        var deferred = protractor.promise.defer(), that = this;
        username = username || browser.params.login.username;
        password = passoword || browser.params.login.password;

        globalCommons.waitForElementPresent(element(this.screenElement)).then(function () {
            return element(that.usernameInput).sendKeys(username);
        }).then(function () {
            return element(that.passwordInput).sendKeys(password);
        }).then(function () {
            return element(that.loginButton).click();
        }).then(function () {
            deferred.fulfill();
        });
        return deferred.promise;
    };

    return LoginPage;
})();
module.exports = LoginPage;