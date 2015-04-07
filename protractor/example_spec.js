describe('Go to google.com', function() {
  beforeEach(function() {
    browser.driver.get('https://www.google.com/');
  });

  it('Should show search screen', function() {
    expect(browser.driver.getTitle()).toEqual('Google');
  });
});
