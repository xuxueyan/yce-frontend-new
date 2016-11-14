define(function (){

    return function appManageCtrl($scope, $http){

    	var data = {
    		orgId: localStorage.orgId,
    		userId: localStorage.userId
    	};


    	function appManageInitFn() {

    		var  appManageListToken = yce.api.appManage.getAppManageList($http, data);

    		utils.responseHandler(appManageListToken, function(data){
    			
    			if(data.code == 0){
    				// console.log(angular.toJson(JSON.parse(data.data)));
    				$scope.appManageList = JSON.parse(data.data);


    			}
    		});

    	}
    	appManageInitFn();

    }
});