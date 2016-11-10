
define(['angular', 'angularRouter', 'ngNotify', 'angularAnimate', 'api', 'utils'], function(angular){

    var yceMain = angular.module('yceMain',['ngRoute', 'atomic-notify', 'ngAnimate']);

    yceMain.controller('mainController',function($scope, $http){

        $scope.quit = function (){
            var data = {
                userName: localStorage.userName
            };
            var logoutToken = yce.api.access.logout($http, data);

            utils.responseHandler(logoutToken, function(data){
                window.location.pathname = '/static/';
                localStorage.clear();
            });
        };

        $scope.getNavList = function(){
            var data = {
                orgId: localStorage.orgId,
                userId: localStorage.userId
            };
            var navListToken = yce.api.user.navList($http, data);

            utils.responseHandler(navListToken,function (data){
                if(data.code == 0){
                    var data = JSON.parse(data.data);
                    $scope.navList = data.list;
                }
            });

        };
        $scope.getNavList();


    });

    yceMain.config(['$routeProvider', '$controllerProvider', function ($routeProvider, $controllerProvider){

        var ctrlRegister = function(ctrlName, ctrlModule) {
            return function ($q) {
                var defer = $q.defer();

                require(ctrlModule, function (controller) {

                    $controllerProvider.register(ctrlName, controller);

                    defer.resolve();
                });
                return defer.promise;
            }
        };

        $routeProvider
            .when('/dashBoard', {
                templateUrl: 'views/dashBoard.html'

            })

            .when('/appManage', {
                templateUrl: 'views/appManage.html',
                controller: 'appManageCtrl',
                resolve: {
                    delay: ctrlRegister('appManageCtrl',['controllers/appManage.js'])
                }
            })
    }]);




    return yceMain;

});