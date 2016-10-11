(function () {
    'use strict';

    angular
        .module('newlotApp')
        .factory('PasswordResetInit', PasswordResetInit);

    PasswordResetInit.$inject = ['$resource', 'SERVER_BACKEND'];

    function PasswordResetInit($resource, SERVER_BACKEND) {
        var service = $resource(SERVER_BACKEND + 'api/forgot', {}, {});

        return service;
    }
})();
