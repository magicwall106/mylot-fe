(function() {
    'use strict';

    angular
        .module('newlotApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController ($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.totalItems = 64;
        vm.currentPage = 4;
        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.pageChanged = pageChanged;
        vm.endTime = 1483203600000;  //get from server 
        vm.processValue = getProcessValue;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }

        function register () {
            $state.go('register');
        }

        function pageChanged(event){
            alert(event);
        }
        function getProcessValue(){
            let now = new Date();
            return now.getTime()/vm.endTime*100;
        }
    }
})();
