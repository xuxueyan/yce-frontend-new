define(function (){

    return function extensionsCtrl($scope, $http){
        var data = {
            orgId: localStorage.orgId,
            userId: localStorage.userId
        };
        function extensionsInitFn() {
            var extensionsListToken = yce.api.extensions.ExtensionList($http, data);

            utils.responseHandler(extensionsListToken, function(data){

                $scope.extensionsList = JSON.parse(data.data)

            })
        }

        extensionsInitFn();

    }
});