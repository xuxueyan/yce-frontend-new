define(function (){

    return function appManageCtrl($scope, $http, $rootScope, atomicNotifyService){

    	var data = {
    		orgId: localStorage.orgId,
    		userId: localStorage.userId
    	};
		//初始化loading
		$scope.complete = 0;
    	$scope.loadAppManageList = function() {
    		var appManageListToken = yce.api.apply.applymentList($http, data);

			utils.responseHandler(appManageListToken, function(data){
    			if(data.code == 0){
    				$scope.appManageList = JSON.parse(data.data);
					$scope.complete++;
				}
    		});
    	}
    	$scope.loadAppManageList();



        //点击“升级”按钮
        $scope.toUpdate = function (dcName, item, dcId){

            $rootScope.window.update = true;
            $scope.updateConfig = {
                id: 'update',
                title: '升级'
            };

            //获取当前镜像名
            var oldImage = (item.deploy.spec.template.spec.containers[0].image).substring(0,(item.deploy.spec.template.spec.containers[0].image).lastIndexOf(':'));
          
            //定义传递的json
            $scope.upDateData = {
                "dcIdList": [],
                "strategy": {
                    "image": "img.reg.3g:15000/2048:latest"
                },
                "appName": item.deploy.metadata.name,
                "comments": "",
                "orgId": localStorage.orgId,
                "userId": localStorage.userId,
                "sessionId": localStorage.sessionId,
                "dcId": Number(dcId)
            };
            //push dcId
            $scope.upDateData.dcIdList.push(dcId);
            //获取到参数里的dcName
            $scope.dcName = dcName;

            //点击镜像列表，双向绑定到页面
            $scope.selectImage = function(item){
                $scope.window.select = false;
                $scope.image = item;
                var newImage = item.substring(0,item.lastIndexOf(':'));
                //判断当前item的镜像名是否与选取的是否相同
                if(newImage != oldImage){
                    $scope.errorPrompt = true;
                }else{
                    $scope.errorPrompt = false;
                }
            };

            //点击提交镜像升级
            $scope.updateSubmit = function(){
                var updateToken = yce.api.apply.update($http, $scope.upDateData);

                utils.responseHandler(updateToken, function(data){
                    if(data.code == 0){
                        //镜像升级页面影藏
                        $rootScope.window.update = false;
                        $scope.loadAppManageList();
                        atomicNotifyService.success(data.message, 2000);
                    }else{
                        atomicNotifyService.error(data.message, 2000);
                    }
                });
            };
        };

        //升级里获取镜像列表
        $scope.getImageList = function(){
            $scope.window.select = true;
            $scope.imgSelectConfig = {
                id: 'select',
                title: '镜像'
            };
            var imageListToken = yce.api.image.imageList($http);
            utils.responseHandler(imageListToken, function(data){
                if(data.code == 0){
                    $scope.imageList = JSON.parse(data.data).images;
                }
            });
        };



        //扩容
        $scope.toCapacity = function(dcId, item){
            //显示扩容页面
            $scope.window.capacity = true;
            $scope.capacityConfig = {
                id: 'capacity',
                title: '扩容'
            };

            //扩容时需要传递的json
            $scope.capacityData = {
                "newSize": item.deploy.spec.replicas,
                "dcIdList": [],
                "userId": Number(localStorage.userId),
                "comments": "",
                "appName": item.deploy.metadata.name,
                "imageName": item.deploy.spec.template.spec.containers[0].image,
                "orgId": localStorage.orgId,
                "sessionId": localStorage.sessionId,
                "dcId": dcId
            };
            $scope.capacityData.dcIdList.push(dcId);
            $scope.capacityData.comments = "scale to "+$scope.capacityData.newSize+" instances";
        };

        //点击提交
        $scope.capacitySubmit = function(){
            var capacityToken = yce.api.apply.capacity($http, $scope.capacityData);
            utils.responseHandler(capacityToken, function(data){
                if(data.code == 0){
                    $scope.loadAppManageList();
                    $scope.window.capacity = false;
                    atomicNotifyService.success(data.message, 2000);
                }else{
                    atomicNotifyService.error(data.message, 2000);
                }
            });
        };

        //扩容的实例个数
        $scope.slider = {
            value: 1,
            options: {
                ceil: 10,
                floor: 1,
                showSelectionBar: true,
                showTicks: true,
                getTickColor: function(value) {
                    return '#d8e0f3';
                }
            }
        };




        //删除
        $scope.toApplyDelete = function(dcId,item){
            //显示删除页
            $scope.window.applyDelete = true;
            $scope.applyDeleteConfig = {
                id: 'applyDelete',
                title: '删除'
            };

            //删除时需要传递的json
            var applyDeleteData = {
                "userId": localStorage.userId,
                "dcIdList": [],
                "sessionId": localStorage.sessionId,
                "comments": "delete app: " + item.deploy.metadata.name,
                "orgId": localStorage.orgId,
                "appName": item.deploy.metadata.name
            };
            applyDeleteData.dcIdList.push(dcId);

            //点击"确定"
            $scope.applyDeleteSubmit = function(){
                var applyDeleteToken = yce.api.apply.applyDelete($http, applyDeleteData);
                utils.responseHandler(applyDeleteToken, function(data){
                    if(data.code == 0){
                        $scope.loadAppManageList();
                        $scope.window.applyDelete = false;
                        atomicNotifyService.success(data.message, 2000);
                    }else{
                        atomicNotifyService.error(data.message, 2000);
                    }
                });
            };
        };



        //回滚
        $scope.applyRollback = function(item,dcId){
            //显示历史版本页面
            $scope.window.applyRollback = true;
            $scope.applyRollbackConfig = {
                id: 'applyRollback',
                title: '回滚'
            };
            var applyHistory = {
                "sessionId": localStorage.sessionId,
                "orgId": localStorage.orgId,
                "appName": item.deploy.metadata.name,
                "dcId": dcId
            };
            //获取回滚页面repeat数据
            var applyHistoryToken = yce.api.apply.history($http, applyHistory);
            utils.responseHandler(applyHistoryToken, function(data){
                $scope.historyDate = JSON.parse(data.data);
            });

            //点击”回滚到此版本“按钮
            $scope.historyRollback = function(date){
                //传递的json
                var historyRollbackDate = {
                    "newSize": date.newSize,
                    "dcIdList": [],
                    "image": date.image,
                    "comments": "scale to " + date.newSize + " instances",
                    "appName": item.deploy.metadata.name,
                    "sessionId": localStorage.sessionId,
                    "userId": localStorage.userId,
                    "orgId": localStorage.orgId
                };
                historyRollbackDate.dcIdList.push(dcId);
                //点击”回滚到此版本“按钮发送的请求
                var historyRollbackToken = yce.api.apply.historyRollback($http, historyRollbackDate);
                utils.responseHandler(historyRollbackToken, function(data){
                    if(data.code == 0){
                        $scope.window.applyRollback = false;
                        atomicNotifyService.success(data.message, 2000);
                    }else{
                        atomicNotifyService.error(data.message, 2000);
                    }
                });
            };
        };

        //点击应用名称
        $scope.showAppDeployDetail = function(item){
            $scope.window.deployDetail = true;
            $scope.deployDetailConfig = {
                id: 'deployDetail',
                title: '发布详情'
            };
            $scope.deployDetailDate = item;
        };

        //点击应用实例
        $scope.showAppPodDetail = function(item, dcId){
            $scope.window.appPodDetail = true;
            $scope.appPodDetailConfig = {
                id: 'appPodDetail',
                title: '发布详情'
            };
            $scope.appPodDetailDate = item;
        };



        

    };
});