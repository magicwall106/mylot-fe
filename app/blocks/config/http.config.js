(function() {
    'use strict';

    angular
        .module('newlotApp')
        .config(httpConfig);

    httpConfig.$inject = ['$urlRouterProvider', '$httpProvider', 'httpRequestInterceptorCacheBusterProvider', '$urlMatcherFactoryProvider'];

    function httpConfig($urlRouterProvider, $httpProvider, httpRequestInterceptorCacheBusterProvider, $urlMatcherFactoryProvider) {

        //enable CSRF
        //$httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN';
        //$httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
        $httpProvider.defaults.withCredentials = true;
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
        //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
        //Cache everything except rest api requests
        httpRequestInterceptorCacheBusterProvider.setMatchlist([ /.*protected.*/], true);

        $urlRouterProvider.otherwise('/');

        $httpProvider.interceptors.push('errorHandlerInterceptor');
        $httpProvider.interceptors.push('authExpiredInterceptor');
        $httpProvider.interceptors.push('notificationInterceptor');
        //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        $urlMatcherFactoryProvider.type('boolean', {
            name : 'boolean',
            decode: function(val) { return val === true || val === 'true'; },
            encode: function(val) { return val ? 1 : 0; },
            equals: function(a, b) { return this.is(a) && a === b; },
            is: function(val) { return [true,false,0,1].indexOf(val) >= 0; },
            pattern: /bool|true|0|1/
        });
    }
})();
