var LoginPage = require('../pageObject/loginPage.js');
describe('LoginPage ', function() {
  var Page = new LoginPage();
  beforeEach(function(){
    Page.visitPage();
    browser.ignoreSynchronization = true;
  });

  it('Should have login screen', function() {
    expect(element(Page.getPageElement()).isPresent()).to.eventually.be.true;
  });

  /**
   * To verify if the user can login unsuccessfully.
   * Steps:
   * 1. Execute the login method of Login Page with incorrect username/password
   * 2. Expect the error message will be shown on the login page.
   */
  it('Should display login error message', function() {
    Page.login("incorrect username", "incorrect password").then(function(){
      expect(element(Page.loginError).isDisplayed()).to.eventually.be.true;
    });
  });

  /**
   * To verify if the user can login successfully.
   * Steps:
   * 1. Execute the login method of Login Page with correct username/password
   * 2. Expect the after login page will be shown.
   */
  it('Should show a page after login', function() {
    Page.login("admin", "admin").then(function(){
      expect(element(by.id("header-wrapper")).isDisplayed()).to.eventually.be.true;
    });
  });
});
