define(function (){

    return function userManageCtrl($scope, $http){
        
        var data = {
            orgId: localStorage.orgId,
            userId: localStorage.userId
        };
        //用户列表获取
        function userInitFn() {
            var userListToken = yce.api.user.UserList($http, data);

            utils.responseHandler(userListToken, function(data){
                $scope.userList = JSON.parse(data.data);
            });
        };
        userInitFn();

    }
});