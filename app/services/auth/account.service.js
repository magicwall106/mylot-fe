(function() {
    'use strict';

    angular
        .module('newlotApp')
        .factory('Account', Account);

    Account.$inject = ['$resource', 'SERVER_BACKEND'];

    function Account ($resource, SERVER_BACKEND) {
        var service = $resource( SERVER_BACKEND + 'api/account/profile', {}, {
            'get': { method: 'GET', params: {}, isArray: false,
                interceptor: {
                    response: function(response) {
                        return response;
                    }
                }
            }
        });

        return service;
    }
})();
