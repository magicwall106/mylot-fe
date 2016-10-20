(function () {
    'use strict';

    angular
        .module('newlotApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController($scope, Principal, LoginService, $state) {
        var vm = this;
        vm.account = null;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.login = LoginService.open;
        vm.register = register;

        function register() {
            $state.go('register');
        }
    }
})();
