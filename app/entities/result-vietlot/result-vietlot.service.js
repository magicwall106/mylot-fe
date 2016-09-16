(function() {
    'use strict';
    angular
        .module('newlotApp')
        .factory('ResultVietlot', ResultVietlot);

    ResultVietlot.$inject = ['$resource', 'DateUtils'];

    function ResultVietlot ($resource, DateUtils) {
        var resourceUrl =  'api/result-vietlots/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.resultDate = DateUtils.convertDateTimeFromServer(data.resultDate);
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
