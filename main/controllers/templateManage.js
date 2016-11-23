define(function (){

    return function templateManageCtrl($scope, $http){
        
        var data = {
            orgId: localStorage.orgId,
            userId: localStorage.userId
        };
        //模板列表获取
        function templateInitFn() {
            var templateListToken = yce.api.template.templateList($http, data);

            utils.responseHandler(templateListToken, function(data){

                $scope.templateList = JSON.parse(data.data)
                angular.forEach($scope.templateList.templates, function(i){
                    i.deployment = JSON.parse(i.deployment);
                });
            });
        };
        templateInitFn();

    }
});