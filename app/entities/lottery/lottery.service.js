(function() {
    'use strict';
    angular
        .module('newlotApp')
        .factory('Lottery', Lottery);

    Lottery.$inject = ['$resource', 'DateUtils'];

    function Lottery ($resource, DateUtils) {
        var resourceUrl =  'api/lotteries/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.createdAt = DateUtils.convertDateTimeFromServer(data.createdAt);
                        data.updatedAt = DateUtils.convertDateTimeFromServer(data.updatedAt);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
