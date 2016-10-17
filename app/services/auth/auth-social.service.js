(function() {
    'use strict';

    angular
        .module('newlotApp')
        .factory('AuthSocial', AuthSocial);

    AuthSocial.$inject = ['$resource','SERVER_BACKEND'];

    function AuthSocial ($resource, SERVER_BACKEND) {
        var service = $resource(SERVER_BACKEND + 'api/auth/facebook/token', {}, {
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });

        return service;
    }
})();
