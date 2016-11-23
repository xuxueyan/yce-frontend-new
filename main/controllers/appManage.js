define(function (){

    return function appManageCtrl($scope, $http, $rootScope){

    	var data = {
    		orgId: localStorage.orgId,
    		userId: localStorage.userId
    	};

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
			$rootScope.window.update = true;
			$scope.updateConfig = {
				id: 'update',
				title: '升级'

			};
		};

    }
});