(function(){
    'use strict';
    angular.module('clearClass', [])
        .directive('clearClass', function($timeout){
            return {
                restrict: 'C',
                scope: false,
                link: function (scope, ele, attr){

                    scope.$watch('shakeBool', function (newValue){

                        $timeout(function(){
                            scope.shakeBool = false;

                        }, 1500);
                    });
                }
            }
        })

})(angular);