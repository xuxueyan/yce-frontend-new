define(['angular', 'angularRouter', 'ngNotify', 'angularAnimate', 'api', 'utils', 'repeatFinished', 'ngLoading', 'ngWindow', 'ngSilder'], function(angular){

    var yceMain = angular.module('yceMain',['ngRoute', 'atomic-notify', 'ngAnimate', 'repeatFinished', 'ngLoading', 'ngWinodw', 'rzModule']);

    yceMain.controller('mainController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope){

        $rootScope.window = {};

        //页面显示当前登陆者名称
        $scope.userName = localStorage.userName;

        //点击右上角退出登录
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

            .when('/userManage',{
                templateUrl: 'views/userManage.html',
                controller: 'userManageCtrl',
                resolve: {
                    delay: ctrlRegister('userManageCtrl',['controllers/userManage.js'])
                }
            })

            .when('/dcManage',{
                templateUrl: 'views/dcManage.html',
                controller: 'dataCenterCtrl',
                resolve: {
                    delay: ctrlRegister('dataCenterCtrl',['controllers/dcManage.js'])
                }
            })

            .when('/orgManage',{
                templateUrl: 'views/orgManage.html',
                controller: 'organizationCtrl',
                resolve: {
                    delay: ctrlRegister('organizationCtrl',['controllers/orgManage.js'])
                }
            })

            .otherwise({redirectTo: '/appManage'});
    }]);

    return yceMain;

});