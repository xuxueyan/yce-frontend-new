define(function(){return function($scope,$http,atomicNotifyService){$scope.serviceData={orgId:localStorage.orgId,userId:localStorage.userId,serviceName:"",orgName:"",dcIdList:[],service:{kind:"Service",apiVersion:"v1",metadata:{name:"",labels:{name:"",namespace:"",author:localStorage.userName,type:"service"}},spec:{type:"",selector:{},ports:[{name:"",protocol:""}]}}};var e={orgId:localStorage.orgId,userId:localStorage.userId},a=yce.api.extensions.serviceInit($http,e);utils.responseHandler(a,function(e){if(0==e.code){var e=JSON.parse(e.data);$scope.serviceDateCenter=e.dataCenters,$scope.serviceData.orgName=e.orgName,$scope.serviceData.service.metadata.labels.namespace=e.orgName}}),$scope.protocolArray=["TCP","UDP"],$scope.selector=[{}],$scope.addSelector=function(){$scope.selector.push({})},$scope.deleteSelector=function(e){$scope.selector.splice(e,1)},$scope.addServicePort=function(){$scope.serviceData.service.spec.ports.push({})},$scope.deleteServicePort=function(e){$scope.serviceData.service.spec.ports.splice(e,1)},$scope.serviceLabelArray=[],$scope.addServiceLabel=function(){$scope.serviceLabelArray.push({})},$scope.deleteServiceLabel=function(e){$scope.serviceLabelArray.splice(e,1)},$scope.$watch("serviceData.serviceName",function(e){e&&($scope.serviceData.service.metadata.name=e,$scope.serviceData.service.metadata.labels.name=e)}),$scope.serviceApply=function(){angular.forEach($scope.serviceData.dcIdList,function(e,a){e===!1&&$scope.applyData.dcIdList.splice(a,1)}),0==$scope.serviceRadio?$scope.serviceData.service.spec.type="ClusterIP":1==$scope.serviceRadio&&($scope.serviceData.service.spec.type="NodePort"),$scope.selector.length>0&&angular.forEach($scope.selector,function(e,a){$scope.serviceData.service.spec.selector[e.key]=e.value}),$scope.serviceLabelArray.length>0&&angular.forEach($scope.serviceLabelArray,function(e,a){$scope.serviceData.service.metadata.labels[e.key]=e.value});var e=yce.api.extensions.serviceSubmit($http,$scope.serviceData);utils.responseHandler(e,function(e){0==e.code?(atomicNotifyService.success(e.message,2e3),$timeout(function(){window.location.hash="#/extensions"},500)):atomicNotifyService.error(e.message,2e3)})}}});