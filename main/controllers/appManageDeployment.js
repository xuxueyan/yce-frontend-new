define(function (){

    return function appManageDeploymentCtrl($scope, $http, $rootScope){

        $scope.applyData = {
            "appName": "", //应用名
            "orgName": "", //组织名
            "orgId": localStorage.orgId,
            "userId": localStorage.userId,
            "dcIdList": [], //数据中心id值
            "deployment": {
                "metadata": {
                    "name": "", //应用名
                    "namespace": "", //组织名称
                    "labels": {
                        "name": "", //应用名
                        "author": localStorage.userName,
                        "version": "" //镜像截取
                    }
                },
                "spec": {
                    "replicas": 1, // 副本数 Number类型
                    "template": {
                        "spec": {
                            "volumes":[{
                                "name": "", //存储卷名字
                                "hostPath": {
                                    "path": ""  //存储卷宿主文件
                                }
                            }],
                            "containers": [
                                {
                                    "name": "", //应用名
                                    //环境变量
                                    "env": [
                                        {
                                            "name": "DB_USER",
                                            "value": ""
                                        },
                                        {
                                            "name": "DB_PASS",
                                            "value": ""
                                        }
                                    ],
                                    //镜像
                                    "image": "",
                                    //规格
                                    "resources": {
                                        "limits": {
                                            "cpu": "",
                                            "memory": ""
                                        }
                                    },
                                    //开放端口
                                    "ports": [
                                        {
                                            "name": "",
                                            "containerPort": null, //Number类型
                                            "protocol": ""
                                        }
                                    ],
                                    "volumeMounts": [
                                        {
                                            "name": "", //存储卷名字
                                            "mountPath": "", //存储卷应用目录
                                            "readOnly": true //存储卷是否只读
                                        }
                                    ]
                                    //健康检查
                                    //"livenessProbe": {
                                    //    "httpGet": {
                                    //        "path": "", // URL
                                    //        "port": null  // Port
                                    //    },
                                    //    "periodSeconds": null, // 每隔
                                    //    "initialDelaySeconds": null //生效时间
                                    //}
                                }
                            ]
                        }
                    }

                }
            }
        };

        var data = {
            orgId: localStorage.orgId,
            userId: localStorage.userId
        };

        // 发布应用前获取初始化数据(数据中心, 规格等信息)
        var initToken = yce.api.apply.applyInit($http, data);
        utils.responseHandler(initToken, function(data){
            if(data.code == 0){
                var data = JSON.parse(data.data);
                // 组织名

                $scope.applyData.orgName = data.orgName;
                $scope.applyData.deployment.metadata.namespace = data.orgName;

                /**
                 * 数据中心:
                 *  $scope.dataCenters -> 渲染html
                 *  $scope.dcList -> 发送后端,存储选中数据中心的id
                 */
                $scope.dataCenters = data.dataCenters;
                // 规格
                $scope.quotas = data.quotas;
            }
        });


        /**
         * angular-slider配置
         * @github
         */
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

        /**
         * 添加 删除 环境变量信息
         * @param Name Value
         */
        $scope.addApplyEnv = function (){
            $scope.applyData.deployment.spec.template.spec.containers[0].env.push({});
        };

        $scope.deleteApplyEnv = function(index){
            $scope.applyData.deployment.spec.template.spec.containers[0].env.splice(index, 1);
        };

        /**
         * 添加 删除 开放端口信息
         * @param Name containerPort protocol
         *
         * 定义协议数组
         * @param TCP UDP
         */

        $scope.protocolArray = ['TCP', 'UDP'];

        $scope.addApplyPort = function (){
            $scope.applyData.deployment.spec.template.spec.containers[0].ports.push({});
        };

        $scope.deleteApplyPort = function (index){
            $scope.applyData.deployment.spec.template.spec.containers[0].ports.splice(index, 1);
        };

        /**
         * 添加 删除 标签组信息
         * @param Key Value
         *
         * 定义添加标签循环数组
         *  发送给后端需要转换为 key&value 格式
         */

        $scope.labelArray = [];

        $scope.addApplyLabel = function (){
            $scope.labelArray.push({});

        };

        $scope.deleteApplyLabel = function (index){
            $scope.labelArray.splice(index, 1);
        };

        /**
         * 添加 删除 HostPath存储卷
         */
        $scope.addApplyHostPath = function (){
            $scope.applyData.deployment.spec.template.spec.containers[0].volumeMounts.push({});
        };

        $scope.deleteApplyHostPath = function (index){
            $scope.applyData.deployment.spec.template.spec.containers[0].volumeMounts.splice(index, 1);
        };

        /**
         * 镜像列表选取
         * @window
         */

        $scope.getImageList = function (){
            $rootScope.window.select = true;

            $scope.imgSelectConfig = {
                id: 'select',
                title: '选择镜像'
            };

            var imageListToken = yce.api.image.imageList($http);
            utils.responseHandler(imageListToken, function(data){
                if(data.code == 0){
                    $scope.imageList = JSON.parse(data.data).images;
                }
            });

            //点击选择镜像后操作
            $scope.selectImage = function (name){
                $rootScope.window.select = false;
                $scope.applyData.deployment.spec.template.spec.containers[0].image = name;
            };
        };

        /**
         * 监听应用名,赋予(同步)相关值
         * 可以将应用名的ng-model改为$scope.applyData.deployment.metadata.labels.name
         * 然后在提交表单时依次赋值
         */
        $scope.$watch('applyData.appName', function(newValue){
            if(newValue){
                $scope.applyData.deployment.metadata.name = newValue;
                $scope.applyData.deployment.spec.template.spec.containers[0].name = newValue;
                $scope.applyData.deployment.metadata.labels.name = newValue;
            }

        });



            //提交表单
        $scope.applySubmit = function (){

            //数据中心未处理!!!
            //hostPath!!
            console.log(JSON.stringify($scope.applyData));

        };

    }
});