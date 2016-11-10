/**
 *
 *  项目通用工具包
 */

(function (){

    /**
     *  全局访问作用域
     */

    var utils = {};

    window.utils = utils;

    utils.responseHandler = function (token, success, error){

        if(token!= null && token!= undefined){
            token.success(function(data, status){
                success(data, status);
            }).error(function (data, status){
                if(error)
                    error(data, status);
            });
        }
    };


})();