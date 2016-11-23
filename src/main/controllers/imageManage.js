define(function (){

    return function imageManageCtrl($scope, $http){
        
        var data = {
            orgId: localStorage.orgId,
            userId: localStorage.userId
        };
        function imageManageInitFn() {
            var imageManageListToken = yce.api.image.imageList($http, data);

            utils.responseHandler(imageManageListToken, function(data){

                $scope.imageManageList = JSON.parse(data.data)

            })
        }

        imageManageInitFn();

    }
});