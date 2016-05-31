describe('Go to google.com', function() {
  beforeEach(function() {
    browser.driver.get('https://www.google.com');
  });

  it('The title Should be: Google', function() {
    expect(browser.driver.getTitle()).toEqual('Google');
  });
});
