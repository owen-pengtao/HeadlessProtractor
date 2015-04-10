/**
 * Created by Tony on 11/26/14.
 * This file is used for defining some extended function.
 */
var globalCommons = {
    waitForElementPresent: function (elm, _bool, options){
        _bool = _bool === undefined ? true : _bool;
        var timeout = options && options.timeout ? options.timeout : 240000;
        var waitDisplay = function(_bool){
            return browser.wait(function () {
                         return elm.isDisplayed().then(function(isDisplayed){
                            return _bool === isDisplayed;
                         }, function(err){
                             return !_bool;
                         });
                    },timeout);
        },
        waitPresent = function(_bool){
            return browser.wait(function () {
                return elm.isPresent().then(function(isPresent){
                    return _bool === isPresent;
                });

             },timeout);
        };

        if (_bool) {
            return waitPresent(_bool).then(function(){
                return waitDisplay(_bool);
            };
        }else{
           return waitDisplay(_bool); 
        }
    },
    repeatUntilDone : function (workPromise, work, _expire, resolvedFn){
        var t = this;
        work = work || null;
        _expire = _expire ? _expire : 20;
        _expire--;
        if(_expire > 0){
            return workPromise().then(resolvedFn ? resolvedFn : null, function (err){
                return browser.sleep(500).then(function (){
                    if(work){
                        work();
                    }
                    t.repeatUntilDone(workPromise, work, _expire, resolvedFn);
                });
            });
        }else{
            return browser.sleep(0);
        }
    },
    waitForElementsCountToEqual : function (elem, _count) {
        return browser.wait(function () {
            return element.all(elem).count().then(function (count){
                return _count === count;
            });
        });
    }
};
module.exports = globalCommons;
