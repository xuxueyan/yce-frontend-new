requirejs.config({
    paths: {
        jQuery: '../lib/jquery.min',
        angular: '../lib/angular.min',
        angularRouter: '../lib/angular-route.min',
        angularAnimate: '../lib/angular-animate.min',
        ngSilder: '../lib/angular-slider',
        ngNotify: '../lib/angular-atomic-notify',
        api: '../js/common/api',
        utils: '../js/common/utils',
        repeatFinished: '../js/directives/repeatFinished',
        echarts: '../lib/echarts',
        ngLoading: '../js/directives/ngLoading',
        ngWindow: '../js/directives/ngWindow',
        ngPaging: '../js/directives/ngPaging',
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
        ngSilder: {
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
        },
        repeatFinished: {
            deps: ['angular']
        },
        ngLoading: {
            deps: ['angular']
        },
        ngWindow: {
            deps: ['angular']
        },
        ngPaging: {
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

