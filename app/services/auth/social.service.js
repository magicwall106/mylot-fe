(function () {
    'use strict';

    angular
        .module('newlotApp')
        .factory('Social', Social);

    Social.$inject = ['$resource', 'SERVER_BACKEND'];

    function Social($resource, SERVER_BACKEND) {
        return $resource(SERVER_BACKEND + 'api/auth/facebook', {}, {});
    }
})();
