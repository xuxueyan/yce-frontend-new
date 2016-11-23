define(['angular', 'angularRouter', 'ngNotify', 'angularAnimate', 'api', 'utils', 'repeatFinished', 'ngLoading', 'ngWindow', 'ngSilder'], function(angular){

    var yceMain = angular.module('yceMain',['ngRoute', 'atomic-notify', 'ngAnimate', 'repeatFinished', 'ngLoading', 'ngWinodw', 'rzModule']);

    yceMain.controller('mainController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope){

        $rootScope.window = {};
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

        $scope.complete = 0;

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

                    $scope.complete++;

                }
            });

        };
        $scope.getNavList();


        $scope.subUser = function(id, name){
            $scope.showSubUser = id + name;
        };


    }]);

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
                templateUrl: 'views/dashBoard.html',
                controller: 'dashBoardCtrl',
                resolve: {
                    delay: ctrlRegister('dashBoardCtrl',['controllers/dashBoard.js'])
                }

            })
            .when('/appManage', {
                templateUrl: 'views/appManage.html',
                controller: 'appManageCtrl',
                resolve: {
                    delay: ctrlRegister('appManageCtrl',['controllers/appManage.js'])
                }
            })
            .when('/appManageDeployment', {
                templateUrl: 'views/appManageDeployment.html',
                controller: 'appManageDeploymentCtrl',
                resolve: {
                    delay: ctrlRegister('appManageDeploymentCtrl',['controllers/appManageDeployment.js'])
                }

            })

<<<<<<< HEAD
            .when('/extensions',{
                templateUrl: 'views/extensions.html',
                controller: 'extensionsCtrl',
                resolve: {
                    delay: ctrlRegister('extensionsCtrl',['controllers/extensions.js'])
                }
            })

            .when('/imageManage',{
                templateUrl: 'views/imageManage.html',
                controller: 'imageManageCtrl',
                resolve: {
                    delay: ctrlRegister('imageManageCtrl',['controllers/imageManage.js'])
                }
            })

            .when('/tpManage',{
                templateUrl: 'views/templateManage.html',
                controller: 'templateManageCtrl',
                resolve: {
                    delay: ctrlRegister('templateManageCtrl',['controllers/templateManage.js'])
                }
            })

            .otherwise({redirectTo: '/dashBoard'});
=======
            .otherwise({redirectTo: '/appManage'});
>>>>>>> 716ae18e74a39f7688c1e83d90c223f79856d598
    }]);

    return yceMain;

});