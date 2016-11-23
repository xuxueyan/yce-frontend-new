define(function (){

    return function dataCenterCtrl($scope, $http){
        
        var data = {
            orgId: localStorage.orgId,
            userId: localStorage.userId
        };
        //数据中心列表获取
        function dataCenterInitFn() {
            var dataCenterListToken = yce.api.dateCenter.dateCenterList($http, data);

            utils.responseHandler(dataCenterListToken, function(data){
                $scope.dataCenterList = JSON.parse(data.data);
                angular.forEach($scope.dataCenterList.datacenters, function(i){
                    i.nodePort = JSON.parse(i.nodePort)
                })
            });
        };
        dataCenterInitFn();

    }
});