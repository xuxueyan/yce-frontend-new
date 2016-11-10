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





})(angular);