!function(t){"use strict";t.module("ngLoading",[]).directive("loading",function(){return{restrict:"EA",templateUrl:"../templates/loading.html",scope:{total:"=",complete:"="},link:function(e,o,l){t.isNumber(e.total)&&t.isNumber(e.complete)?e.$watch("complete",function(){e.total==e.complete?o.hide():t.element(".loading-progress").css({width:e.complete/e.total*100+"%"})}):(console.error("total or complete is NaN!"),o.hide())}}})}(angular);