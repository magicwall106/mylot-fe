(function () {
    'use strict';

    angular
        .module('newlotApp')
        .factory('Rate', Rate);

    Rate.$inject = ['$resource', 'SERVER_BACKEND'];

    function Rate ($resource, SERVER_BACKEND) {
        var service = $resource(SERVER_BACKEND + 'api/rate', {}, {
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
