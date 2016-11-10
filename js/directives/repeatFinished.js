/**
 * @desc: ngRepeat循环完成指令
 * @author: Mark
 */
(function(){
    'use strict';
    angular.module('repeatFinished', [])
        .directive('repeatFinished', function($timeout){
            return {
                restrict: 'A',
                link: function (scope,element,attr){

                    if(scope.$last === true)
                    {
                        var emitMessage = attr['repeatFinished'] || 'repeatFinished';
                        $timeout(function () {
                            scope.$emit(emitMessage);
                        });
                    }
                },
            }
        })

})(angular);