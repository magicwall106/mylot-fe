(function() {
    'use strict';

    angular
        .module('newlotApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('contact', {
            parent: 'app',
            url: '/contact',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/contact/contact.html',
                    controller: 'ContactController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
