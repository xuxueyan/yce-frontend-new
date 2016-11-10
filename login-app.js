
define(['angular', 'ngNotify', 'api', 'utils', 'clearClass'],function(angular){

	var app = angular.module('login',['atomic-notify', 'clearClass']);

	app.controller('loginController',function($scope, $http, atomicNotifyService){

		$scope.login = function (){
			var data = {
				username: $scope.userName,
				password: $scope.userPassword
			};
			var loginToken = yce.api.access.login($http, data);

			utils.responseHandler(loginToken, function (data){
				if(data.code == 0){
					atomicNotifyService.success('登陆成功', 2000);

					var data = JSON.parse(data.data);

					localStorage.userId = data.userId;
					localStorage.sessionId = data.sessionId;
					localStorage.orgId = data.orgId;
					localStorage.userName = data.userName;

					window.location.pathname = '/static/main/index.html';
				}else {
					atomicNotifyService.error(data.message, 2000);
				}
			},function (data){
				atomicNotifyService.error('服务器异常', 2000);
			});
		};

		//form回车键登陆
		$scope.enterLogin = function ($event){
			if($event.keyCode == 13)
				$scope.login();
		};


	});

	return app;

});