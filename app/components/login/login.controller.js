(function () {
    'use strict';

    angular
        .module('newlotApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', /*'$auth',*/ 'Social'];

    function LoginController($rootScope, $state, $timeout, Auth, $uibModalInstance, /*$auth, */Social) {
        var vm = this;

        vm.authenticationError = false;
        vm.cancel = cancel;
        vm.credentials = {};
        vm.login = login;
        vm.password = null;
        vm.register = register;
        vm.rememberMe = true;
        vm.requestResetPassword = requestResetPassword;
        vm.username = null;
        vm.authenticate = authenticate;
        $timeout(function () { angular.element('#username').focus(); });

        function cancel() {
            vm.credentials = {
                username: null,
                password: null,
                rememberMe: true
            };
            vm.authenticationError = false;
            $uibModalInstance.dismiss('cancel');
        }

        function login(event) {
            event.preventDefault();
            Auth.login({
                username: vm.username,
                password: vm.password,
                rememberMe: vm.rememberMe
            }).then(function (data) {
                vm.authenticationError = false;
                $uibModalInstance.close();
                if ($state.current.name === 'register' || $state.current.name === 'activate' ||
                    $state.current.name === 'finishReset' || $state.current.name === 'requestReset') {
                    $state.go('home');
                }

                $rootScope.$broadcast('authenticationSuccess');

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is succesful, go to stored previousState and clear previousState
                if (Auth.getPreviousState()) {
                    var previousState = Auth.getPreviousState();
                    Auth.resetPreviousState();
                    $state.go(previousState.name, previousState.params);
                }
            }).catch(function () {
                vm.authenticationError = true;
            });
        }

        function register() {
            $uibModalInstance.dismiss('cancel');
            $state.go('register');
        }

        function requestResetPassword() {
            $uibModalInstance.dismiss('cancel');
            $state.go('requestReset');
        }

        /*function authenticate(provider) {
            $auth.authenticate(provider)
                .then(function (response) {
                    Auth.authFacebook(response, function (data) {
                        console.log(data);
                    }, function (err) {
                        console.log(data);
                    });
                }).catch(function (error) {
                    if (error.message) {
                        // Satellizer promise reject error.
                        console.log(error.message);
                    } else if (error.data) {
                        // HTTP response error from server
                        console.log(error.data.message, error.status);
                    } else {
                        console.log(error);
                    }
                });
        }*/
    }
})();
