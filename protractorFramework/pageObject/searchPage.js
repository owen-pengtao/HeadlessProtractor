var Page = require('../utility/page.js');
var globalCommons = require('../utility/common.js');
var SearchPage = (function () {
  function SearchPage() {
    this.screenElement = by.id('hplogo');
    this.searchInput   = by.xpath('//input[@type="text"]');
    this.searchButton  = by.xpath('//input[@title="Search"]');
  }

  SearchPage.prototype = new Page();
  SearchPage.prototype.constructor = SearchPage;


  SearchPage.prototype.search = function (searchText) {
    var deferred = protractor.promise.defer(), that = this;
    globalCommons.waitForElementPresent(element(this.screenElement)).then(function () {
      element(that.searchInput).sendKeys(searchText);
    }).then(function () {
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }).then(function () {
      deferred.fulfill();
    });
    return deferred.promise;
  };

  return SearchPage;
})();
module.exports = SearchPage;