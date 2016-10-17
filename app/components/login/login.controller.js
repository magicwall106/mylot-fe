(function () {
    'use strict';

    angular
        .module('newlotApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance'];

    function LoginController($rootScope, $state, $timeout, Auth, $uibModalInstance) {
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

        vm.loginFacebook = loginFacebook;
        vm.socialStatus = socialStatus;

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

        function statusChangeCallback(response) {
            console.log('statusChangeCallback');
            console.log(response);
            // The response object is returned with a status field that lets the
            // app know the current login status of the person.
            // Full docs on the response object can be found in the documentation
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                console.log('connected');
                //Auth.authFacebook(response.authResponse)
                Auth.authFacebook({access_token: response.authResponse.accessToken})
                    .then(function(data){
                        console.log(data);
                    }).catch(function(err){
                        console.log(err);
                    });
                /*FB.api('/me', function (response) {
                    console.log('Good to see you, ' + response.name + '.');
                    
                });*/
            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                console.log('not_authorized');
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                FB.login(function (response) {
                    if (response.authResponse) {
                        console.log('Welcome!  Fetching your information.... ');
                        FB.api('/me', function (response) {
                            console.log('Good to see you, ' + response.name + '.');
                        });
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                }, { scope: 'email' });

                Auth.authFacebook({authResponse: response.authResponse})
                .then(function(response){
                    

                }).catch(function(err){

                });
            }
        }

        // This function is called when someone finishes with the Login
        // Button.  See the onlogin handler attached to it in the sample
        // code below.
        function socialStatus() {
            FB.getLoginStatus(function (response) {
                return response.status === 'connected';
            });
        }

        function loginFacebook() {
            FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });
        };
    }
})();
