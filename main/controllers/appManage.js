define(function (){

    return function appManageCtrl($scope, $http, $rootScope){

    	var data = {
    		orgId: localStorage.orgId,
    		userId: localStorage.userId
    	};

		//初始化loading
		$scope.complete = 0;

    	function appManageInitFn() {

    		var appManageListToken = yce.api.apply.applymentList($http, data);
			utils.responseHandler(appManageListToken, function(data){
    			if(data.code == 0){
    				$scope.appManageList = JSON.parse(data.data);
					$scope.complete++;

				}
    		});

    	}
    	appManageInitFn();


		$scope.toUpdate = function (){
			$rootScope.window.handle = true;
			$scope.updateConfig = {
				id: 'handle',
				title: '升级'

			};
		};

    }
});