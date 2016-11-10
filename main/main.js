requirejs.config({
    paths: {
        jQuery: '../lib/jquery.min',
        angular: '../lib/angular.min',
        angularRouter: '../lib/angular-route.min',
        angularAnimate: '../lib/angular-animate.min',
        ngNotify: '../lib/angular-atomic-notify',
        api: '../js/common/api',
        utils: '../js/common/utils'
    },
    shim: {
        'angular': {
            deps: ['jQuery'],
            exports: 'angular'
        },
        angularRouter: {
            deps: ['angular'],
            exports: 'ngRoute'
        },
        angularAnimate: {
            deps: ['angular']
        },
        ngNotify: {
            deps: ['angular']
        },
        api: {
            deps: ['angular']
        },
        utils: {
            deps: ['angular']
        }
    }
});

// 手动开启angular服务
require(['angular', 'app'], function(angular){
    angular.element(document).ready(function(){
        angular.bootstrap(document, ['yceMain']);
    });

});

