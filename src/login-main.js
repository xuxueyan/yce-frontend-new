requirejs.config({
    paths: {
        jQuery: 'lib/jquery.min',
        angular: 'lib/angular.min',
        ngNotify: 'lib/angular-atomic-notify',
        api: 'js/common/api',
        utils: 'js/common/utils',
        clearClass: 'js/directives/clearClass'
    },
    shim: {
        'angular': {
            deps: ['jQuery'],
            exports: 'angular'
        },
        ngNotify: {
            deps: ['angular']
        },
        api: {
            deps: ['angular']
        },
        utils: {
            deps: ['angular']
        },
        clearClass: {
            deps: ['angular']
        }
    }
});

// 手动开启angular服务
require(['angular','login-app'], function(angular){
    angular.element(document).ready(function(){
        angular.bootstrap(document,['login']);
    });

});

