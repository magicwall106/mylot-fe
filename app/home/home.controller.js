(function () {
    'use strict';

    angular
        .module('newlotApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController($scope, Principal, LoginService, $state) {
        var vm = this;
        vm.account = null;
        vm.isAuthenticated = Principal.isAuthenticated();
        vm.login = LoginService.open;
        vm.register = register;

        $scope.$on('authenticationSuccess', function () {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }

        function register() {
            $state.go('register');
        }
    }
})();
