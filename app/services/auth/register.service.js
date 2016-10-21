(function () {
    'use strict';

    angular
        .module('newlotApp')
        .factory('Register', Register);

    Register.$inject = ['$resource', 'SERVER_BACKEND'];

    function Register ($resource, SERVER_BACKEND) {
        return $resource(SERVER_BACKEND + 'api/signup', {}, {});
    }
})();
