/**
 * User: Jacky
 * Date: 11/19/14
 * Time: 16:12
 * Desc: This file is used for testing the functionality of blok management
 */
var globalCommons = require('../utility/common.js');

var Page = (function () {
    /**
     * The constructor of page object, it is a base class for each page.
     * All of the pageObject class need to be the children of this class and they need to define their own pathURL and screenElement.
     * @constructor
     */
    function Page(){
        this.pathURL = "/";
        this.screenElement = null;
    }

    /**
     * The method for visit one page.
     */
    Page.prototype.visitPage = function() {
        return browser.get(this.pathURL);
    };

    /**
     * The method for visit one page.
     */
    Page.prototype.untils = globalCommons;

    /**
     * The method for get the flag element of one page to verify if the certain page is shown.
     */
    Page.prototype.getPageElement = function(){
        return this.screenElement;
    };

    Page.prototype.waitForPageShown = function(){
        this.untils.waitForElementPresent(element(this.getPageElement()));
        return browser.sleep(0);
    };

    /**
     * The method for reload the current page.
     */
    Page.prototype.refreshPage = function() {
        return browser.refresh();
    };


    return Page;
})();
module.exports = Page;