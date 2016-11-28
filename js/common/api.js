/**
 * Created by Mark on 16/10/13.
 */
(function(angular){

    if( typeof angular == undefined)
        throw new Error('angular is undefined!');

    /**
     *  请求方法
     */
    const GET = 'GET';
    const POST = 'POST';
    const PUT = 'PUT';

    /**
     *  全局访问作用域
     */

    var yce = {};

    window.yce = yce;

    function createRequest(http, url, method, data, cache){
        data = data || {};
        method = method || GET;
        cache = cache || false;
        if(method.toLowerCase() == 'get'){
            var params = '';
            if(data != undefined){
                angular.forEach(data, function(value, key){
                    params += key + "=" + value + "&";
                })
            }
            if(params.length > 0){
                params = params.substr(0,params.length - 1);
                url +="?" +params;
                data = {};
            }
        }
        var headers = {'Authorization': localStorage.sessionId};
        if(cache == false){
            headers['Cache-Control'] = 'no-cache';
            headers['Pragma'] = 'no-cache';
        }
        return http(
            {
                url:url,
                method:method,
                data:data,
                cache:cache,
                headers:headers
            }
        );
    }

    ////////////////////
    //
    // 接口定义
    //
    ////////////////////

    yce.api = {};




    /**
     *
     * 访问接口
     * 包含login, logout
     *
     * */
    yce.api.access = {};


    yce.api.access.login = function (http, data){
        return createRequest(http, '/api/v1/users/login', POST, data);
    };

    yce.api.access.logout = function (http, data){
        return createRequest(http, '/api/v1/users/logout', POST, data);
    };

    /**
     *
     * 用户类接口
     * 包含navList, 修改密码等
     *
     * */

    yce.api.user = {};

    yce.api.user.navList = function (http, data){
        return createRequest(http, '/api/v1/organizations/'+ data.orgId +'/users/'+ data.userId+'/navList');
    };
    yce.api.user.userList = function (http){
        return createRequest(http, '/api/v1/user');
    };



    /**
     *
     * dashBoard接口
     *
     * */

    yce.api.dashBoard = {};

    yce.api.dashBoard.resourceList = function (http, data){
        return createRequest(http, '/api/v1/organizations/'+ data.orgId +'/resourcestat');
    };

    yce.api.dashBoard.applymentList = function (http, data){
        return createRequest(http, '/api/v1/organizations/'+ data.orgId +'/deploymentstat');
    };

    yce.api.dashBoard.handleList = function(http, data){
        return createRequest(http, '/api/v1/organizations/'+ data.orgId +'/operationstat');
    };



    /**
     *  应用接口
     * applymentList 发布应用Init applySubmit 升级 扩容 删除
     * */

    yce.api.apply = {};

    yce.api.apply.applymentList = function (http, data){
        return createRequest(http, '/api/v1/organizations/' + data.orgId + '/users/' + data.userId + '/deployments');
    };

    yce.api.apply.applyInit = function (http, data){
        return createRequest(http, '/api/v1/organizations/' + data.orgId + '/users/' + data.userId + '/deployments/init');
    };
    yce.api.apply.applySubmit = function (http, data){
        return createRequest(http, '/api/v1/organizations/' + data.orgId + '/users/' + data.userId + '/deployments/new', POST, data);
    };
    yce.api.apply.update = function(http, data){
        return createRequest(http, '/api/v1/organizations/' + data.orgId + '/deployments/' + data.appName + '/rolling', POST, data);
    }
    yce.api.apply.capacity = function(http, data){
        return createRequest(http, '/api/v1/organizations/' + data.orgId + '/deployments/' + data.appName + '/scale', POST, data);
    }
    yce.api.apply.applyDelete = function(http, data){
        return createRequest(http, '/api/v1/organizations/' + data.orgId + '/deployments/' + data.appName + '/delete', POST, data);
    }



    /**
     * 镜像接口
     * imageList
     * */

    yce.api.image = {};

    yce.api.image.imageList = function (http){
        return createRequest(http, '/api/v1/registry/images');
    };




     /**
     *
     * extensions 接口
     * 服务管理，创建服务，创建访问点，等
     * */
     yce.api.extensions = {};

     yce.api.extensions.extensionList = function (http, data){
        return createRequest(http, '/api/v1/organizations/'+data.orgId+'/users/'+data.userId+'/extensions');
     }




     /**
     *
     * template 接口
     * 模板管理，模板镜像 等
     * */
     yce.api.template = {};
     
     yce.api.template.templateList = function (http, data){
        return createRequest(http, '/api/v1/organizations/'+data.orgId+'/users/'+data.userId+'/templates');
     }




    /**
     *
     * dateCenter 接口
     * 数据中心管理，添加数据中心 等
     * */
     yce.api.dateCenter = {};
     
     yce.api.dateCenter.dateCenterList = function (http){
        return createRequest(http, '/api/v1/datacenter');
     }




    /**
     *
     * organization 接口
     * 组织管理，添加组织 等
     * */
     yce.api.organization = {};
     
     yce.api.organization.organizationList = function (http){
        return createRequest(http, '/api/v1/organization');
     }






})(angular);