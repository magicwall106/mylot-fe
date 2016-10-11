(function() {
    'use strict';

    angular
        .module('newlotApp')
        .factory('PasswordResetFinish', PasswordResetFinish);

    PasswordResetFinish.$inject = ['$resource', 'SERVER_BACKEND'];

    function PasswordResetFinish($resource, SERVER_BACKEND) {
        var service = $resource(SERVER_BACKEND + 'api/reset/finish', {}, {});

        return service;
    }
})();
