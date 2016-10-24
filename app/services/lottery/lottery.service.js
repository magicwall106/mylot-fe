(function () {
    'use strict';

    angular
        .module('newlotApp')
        .factory('Lottery', Lottery);

    Lottery.$inject = ['$resource', 'SERVER_BACKEND'];

    function Lottery ($resource, SERVER_BACKEND) {
        var service = $resource(SERVER_BACKEND + 'api/lottery', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'save': { method:'POST' },
            'update': { method:'PUT' },
            'delete':{ method:'DELETE'}
        });

        return service;
    }
})();
