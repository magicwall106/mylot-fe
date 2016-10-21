(function() {
    'use strict';

    angular
        .module('newlotApp')
        .factory('Activate', Activate);

    Activate.$inject = ['$resource','SERVER_BACKEND'];

    function Activate ($resource, SERVER_BACKEND) {
        var service = $resource(SERVER_BACKEND + 'api/account/activate', {}, {
            'get': { method: 'GET', params: {}, isArray: false}
        });

        return service;
    }
})();
