var SearchPage = require('../pageObject/searchPage.js');
describe('SearchPage ', function() {
  var Page = new SearchPage();
  beforeEach(function(){
    browser.ignoreSynchronization = true;
    browser.driver.get('https://www.google.com');
  });

  it('Should have search screen', function() {
    expect(element(Page.getPageElement()).isPresent()).to.eventually.be.true;
  });


  it('Should display search error message', function() {
    Page.search("HeadlessProtractor Owen Peng").then(function(){
      expect(browser.getCurrentUrl()).to.eventually.equal('https://www.google.com/#q=HeadlessProtractor+Owen+Peng');
      browser.sleep(3000);
    }).then(function(){
      expect(element(by.xpath('//a[contains(text(), "GitHub - owen-pengtao/HeadlessProtractor")]')).isPresent()).to.eventually.be.true;
    });
  });

});
