describe('Go to google.com', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.driver.get('https://www.google.com');
  });

  it('The title Should be: Google', function() {
    expect(browser.driver.getTitle()).toEqual('Google');
    element(by.xpath('//input[@type="text"]')).sendKeys("HeadlessProtractor").then(function(){
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }).then(function(){
      expect(browser.getCurrentUrl()).toEqual('https://www.google.com/#q=HeadlessProtractor');
      browser.sleep(3000);
    }).then(function(){
      expect(element(by.xpath('//a[contains(text(), "GitHub - owen-pengtao/HeadlessProtractor")]')).isPresent()).toBeTruthy();
    });
  });
});
