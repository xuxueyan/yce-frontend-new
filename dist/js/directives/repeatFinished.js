!function(){"use strict";angular.module("repeatFinished",[]).directive("repeatFinished",function($timeout){return{restrict:"A",link:function(e,i,n){if(e.$last===!0){var t=n.repeatFinished||"repeatFinished";$timeout(function(){e.$emit(t)})}}}})}(angular);