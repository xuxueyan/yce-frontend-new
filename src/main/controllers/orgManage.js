define(function (){

    return function organizationCtrl($scope, $http){
        
        var data = {
            orgId: localStorage.orgId,
            userId: localStorage.userId
        };
        //组织列表获取
        function organizationInitFn() {
            var organizationListToken = yce.api.organization.organizationList($http, data);

            utils.responseHandler(organizationListToken, function(data){
                $scope.organizationList = JSON.parse(data.data);
                angular.forEach($scope.organizationList.organizations, function(data){
                    data.dcIdList = JSON.parse(data.dcIdList)
                })
            });
        };
        organizationInitFn();

    }
});