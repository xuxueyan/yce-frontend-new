define(function (){

    return function appManageCtrl($scope, $http, $rootScope){

    	var data = {
    		orgId: localStorage.orgId,
    		userId: localStorage.userId
    	};
        $scope.complete = 0;
    	function appManageInitFn() {

    		var appManageListToken = yce.api.apply.applymentList($http, data);
			utils.responseHandler(appManageListToken, function(data){
               // console.log(angular.toJson(data))
    			if(data.code == 0){
    				$scope.appManageList = JSON.parse(data.data);
					$scope.complete++;
				}
    		});

    	}
    	appManageInitFn();



        //点击“升级”按钮
		$scope.toUpdate = function (dcName, item, dcId){
            var oldImageData = item.deploy.spec.template.spec.containers[0].image;
            var oldImage = oldImageData.substr(0,oldImageData.lastIndexOf(':'));
        //    var newImage = item.substr(0,item.lastIndexOf(':'));

            $scope.param = {
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
            $scope.param.dcIdList.push(dcId);

			$rootScope.window.update = true;
			$scope.updateConfig = {
				id: 'update',
				title: '升级'
			};
            $scope.dcName = dcName;
            //点击提交镜像升级
            $scope.submit = function(param){
                var postimageListToken = yce.api.image.postimageList($http, param);
                utils.responseHandler(postimageListToken, function(data){
                    if(data.code == 0){
                        console.log("ok");
                        window.location.pathname = '/static/main/'
                    }
                });
            }

            //点击镜像列表，双向绑定到页面
            $scope.selectImage = function(item){
                $scope.window.select = false;
                $scope.image = item;
                var newImage = item.substr(0,item.lastIndexOf(':'));
                if(newImage != oldImage){
                    $scope.rollShow = true;
                }else{
                    $scope.rollShow = false;
                }

            }
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











    }
});