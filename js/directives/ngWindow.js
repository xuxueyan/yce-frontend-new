/**
 * @desc: window弹窗类组件
 * @author: Mark
 */
(function(){
    'use strict';
    angular.module('ngWinodw', [])
        .directive('window', function(){
            return {
                restrict: 'EA',
                templateUrl: '../templates/ngWindow/window.html',
                scope: {
                    config: '='
                },
                transclude: true,
                controller: ['$scope', '$rootScope', function ($scope, $rootScope){
                    $scope.closeWindow = function (id){
                        $rootScope.window[id] = false;
                    };
                }]
            }
        })

})(angular);
