(function() {
    'use strict';

    angular
        .module('newlotApp')
        .factory('Contact', Contact);

    Contact.$inject = ['$resource', 'SERVER_BACKEND'];

    function Contact ($resource, SERVER_BACKEND) {
        return $resource(SERVER_BACKEND + 'api/contact', {}, {});
    }
})();
