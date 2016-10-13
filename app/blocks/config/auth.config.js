(function () {
    'use strict';

    /*angular
        .module('newlotApp')
        .config(authConfig);

    authConfig.$inject = ['$authProvider'];
    function authConfig($authProvider) {
        // Facebook
        $authProvider.facebook({
            clientId: '1808754339355619',
            responseType: 'token',
            name: 'facebook',
            url: '/auth/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: window.location.origin + '/',
            requiredUrlParams: ['display', 'scope'],
            scope: ['email', 'public_profile'],
            scopeDelimiter: ',',
            display: 'popup',
            oauthType: '2.0',
            popupOptions: { width: 580, height: 400 }
        });
        //$authProvider.tokenHeader = 'Authorization';
        $authProvider.httpInterceptor = function() { return true; };
        //$authProvider.storageType = 'localStorage';
        //$authProvider.unlinkUrl = '/auth/unlink/';
    }*/




    /*$authProvider.httpInterceptor = function() { return true; },
    $authProvider.withCredentials = false;
    $authProvider.tokenRoot = null;
    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/signup';
    $authProvider.unlinkUrl = '/auth/unlink/';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'satellizer';
    $authProvider.tokenHeader = 'Authorization';
    $authProvider.tokenType = 'Bearer';
    $authProvider.storageType = 'localStorage';*/

    // Facebook
    /*$authProvider.facebook({
    clientId: '1808754339355619',
    name: 'facebook',
    url: '/auth/facebook',
    authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
    redirectUri: window.location.origin + '/',
    requiredUrlParams: ['display', 'scope'],
    scope: ['email'],
    scopeDelimiter: ',',
    display: 'popup',
    oauthType: '2.0',
    popupOptions: { width: 580, height: 400 }
    });*/

})();
