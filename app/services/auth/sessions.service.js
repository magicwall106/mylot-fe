(function() {
    'use strict';

    angular
        .module('newlotApp')
        .factory('Sessions', Sessions);

    Sessions.$inject = ['$resource', 'SERVER_BACKEND'];

    function Sessions ($resource, SERVER_BACKEND) {
        return $resource(SERVER_BACKEND + 'api/account/sessions/:series', {}, {
            'getAll': { method: 'GET', isArray: true}
        });
    }
})();
