/**
 * @desc: loading
 * @author: Mark
 */
(function(){
    'use strict';
    angular.module('ngLoading', [])
        .directive('loading', function(){
            return {
                restrict: 'EA',
                templateUrl: '../templates/loading.html',
                scope: {
                    total: '=',
                    complete: '='
                },
                link: function (scope,element,attr){
                    if(angular.isNumber(scope.total) && angular.isNumber(scope.complete)){
                        scope.$watch('complete', function (){
                            if(scope.total == scope.complete){
                                element.hide();
                            }else{
                                angular.element('.loading-progress').css({
                                    width: (scope.complete/scope.total) * 100 + '%'
                                });
                            }

                        });
                    }else{
                        console.error('total or complete is NaN!');
                    }

                }
            }
        })

})(angular);
