define(function (){

    return function userManageCtrl($scope, $http){
        
        var data = {
            orgId: localStorage.orgId,
            userId: localStorage.userId
        };
        //模板列表获取
        function userInitFn() {
            var userListToken = yce.api.userManage.getUserList($http, data);

            utils.responseHandler(userListToken, function(data){
                $scope.userList = JSON.parse(data.data);
                console.log(angular.toJson($scope.userList));
            });
        };
        userInitFn();

    }
});