/**
 * @desc: loading
 * @author: Mark
 * @usage:
 *      <div loading class="loading" total="1" complete="complete"></div>
 *          total 为当前页面总的请求数, complete为当前页面已完成的请求书, 在data.code == 0 时设置 $scope.complete++;
 *      注意:
 *          在每一个使用ngLoading的controller.js的顶部应初始化设置 $scope.complete = 0;
 *
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
