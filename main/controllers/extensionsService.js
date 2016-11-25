define(function (){

    return function extensionsServiceCtrl($scope, $http, atomicNotifyService){
        $scope.serviceData= {
            "orgId": localStorage.orgId,
            "userId": localStorage.userId,
            "serviceName": "",
            "orgName": "",
            "dcIdList": [],
            "service": {
                "kind": "Service",
                "apiVersion": "v1",
                "metadata": {
                    "name": "",
                    "labels": {
                        "name": "",
                        "namespace":"",
                        "author" : localStorage.userName,
                        "type" : "service"
                    }
                },
                "spec": {
                    "type": "",
                    "selector": {},
                    "ports": [
                        {
                            "name": "",
                            "protocol": ""
                        }
                    ]
                }
            }
        };

        var data = {
            "orgId": localStorage.orgId,
            "userId": localStorage.userId
        };

        var serviceInitToken = yce.api.extensions.serviceInit($http, data);

        utils.responseHandler(serviceInitToken, function(data){
            if(data.code == 0){
                var data = JSON.parse(data.data);
                $scope.serviceDateCenter = data.dataCenters;

                $scope.serviceData.orgName = data.orgName;
                $scope.serviceData.service.metadata.labels.namespace = data.orgName;
            }
        });

        $scope.protocolArray = ['TCP', 'UDP'];


        /**
         * 选择器数组 添加 删除
         */

        $scope.selector = [{}];

        $scope.addSelector = function (){
            $scope.selector.push({});
        };
        $scope.deleteSelector = function(index){
            $scope.selector.splice(index, 1);
        };



        $scope.addServicePort = function (){
            $scope.serviceData.service.spec.ports.push({});
        };
        $scope.deleteServicePort = function (index){
            $scope.serviceData.service.spec.ports.splice(index ,1);
        };


        $scope.serviceLabelArray = [];

        $scope.addServiceLabel = function(){
            $scope.serviceLabelArray.push({});
        };


        $scope.deleteServiceLabel = function (index){
            $scope.serviceLabelArray.splice(index, 1);
        };

        $scope.$watch('serviceData.serviceName', function(newValue){
            if(newValue){
                $scope.serviceData.service.metadata.name = newValue;
                $scope.serviceData.service.metadata.labels.name = newValue;
            }

        });


        $scope.serviceApply = function (){

            angular.forEach($scope.serviceData.dcIdList, function(data, index){
                if(data === false){
                    $scope.applyData.dcIdList.splice(index, 1);
                }
            });

            if($scope.serviceRadio == 0)
                $scope.serviceData.service.spec.type = 'ClusterIP';
            else if($scope.serviceRadio == 1)
                $scope.serviceData.service.spec.type = 'NodePort';

            if($scope.selector.length > 0){
                angular.forEach($scope.selector, function(data, index){
                    $scope.serviceData.service.spec.selector[data.key] = data.value;
                });
            }

            if($scope.serviceLabelArray.length > 0){
                angular.forEach($scope.serviceLabelArray, function(data, index){
                    console.log(data);
                    $scope.serviceData.service.metadata.labels[data.key] = data.value;
                });
            }



            var serviceSubmitToken = yce.api.extensions.serviceSubmit($http, $scope.serviceData);

            utils.responseHandler(serviceSubmitToken, function (data){
                if(data.code ==0 ){
                    atomicNotifyService.success(data.message, 2000);
                    $timeout(function(){
                        window.location.hash = '#/extensions';
                    },500);
                }else{
                    atomicNotifyService.error(data.message, 2000);
                }
            });

        };



    }
});