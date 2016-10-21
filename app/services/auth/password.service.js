(function() {
    'use strict';

    angular
        .module('newlotApp')
        .factory('Password', Password);

    Password.$inject = ['$resource','SERVER_BACKEND'];

    function Password($resource, SERVER_BACKEND) {
        var service = $resource(SERVER_BACKEND + 'api/account/password', {}, {});

        return service;
    }
})();
