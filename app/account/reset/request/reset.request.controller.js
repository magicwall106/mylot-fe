(function () {
    'use strict';

    angular
        .module('newlotApp')
        .controller('RequestResetController', RequestResetController);

    RequestResetController.$inject = ['$timeout', 'Auth'];

    function RequestResetController($timeout, Auth) {
        var vm = this;

        vm.error = null;
        vm.errorEmailNotExists = null;
        vm.requestReset = requestReset;
        vm.resetAccount = {};
        vm.logout = Auth.logout();
        vm.success = null;

        $timeout(function () { angular.element('#email').focus(); });

        function requestReset() {

            vm.error = null;
            vm.errorEmailNotExists = null;
            Auth.resetPasswordInit(vm.resetAccount.email).then(function () {
                vm.success = 'OK';
            }).catch(function (response) {
                vm.success = null;
                if (response.status === 400 && response.data.msg === 'Account with that email address does not exist.') {
                    vm.errorEmailNotExists = 'ERROR';
                } else if(esponse.status === 400 && response.data.msg === 'You are logging as a user'){
                    vm.errorIsLogged = 'ERROR'; 
                } else {
                    vm.error = 'ERROR';
                }
            });
        }
    }
})();
