(function () {
    'use strict';

    angular
        .module('newlotApp')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['Principal', 'Auth', '$filter', '$auth'];

    function SettingsController(Principal, Auth, $filter, $auth) {
        var vm = this;

        vm.error = null;
        vm.save = save;
        vm.settingsAccount = null;
        vm.success = null;
        vm.authenticate = authenticate;

        vm.popup1 = {
            opened: false
        };
        vm.openDobPicker = function () {
            vm.popup1.opened = true;
        };
        vm.dateOptions = {
            dateDisabled: 'disabled',
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(1900, 6, 10),
            startingDay: 1
        };

        /**
         * Store the "settings account" in a separate variable, and not in the shared "account" variable.
         */
        var copyAccount = function (account) {
            return {
                activated: account.activated,
                email: account.email,
                profile: {
                    firstname: account.profile.firstname,
                    lastname: account.profile.lastname,
                    dob: $filter('date')(account.profile.dob, "dd-MM-yyyy")
                },
                google: account.google || '',
                facebook: account.facebook || ''
            };
        };

        Principal.identity().then(function (account) {
            vm.settingsAccount = copyAccount(account);
        });

        function save() {
            Auth.updateAccount(vm.settingsAccount).then(function () {
                vm.error = null;
                vm.success = 'OK';
                Principal.identity(true).then(function (account) {
                    vm.settingsAccount = copyAccount(account);
                });
            }).catch(function () {
                vm.success = null;
                vm.error = 'ERROR';
            });
        }

        function authenticate(provider) {
            $auth.authenticate(provider)
                .then(function () {
                    toastr.success('You have successfully signed in with ' + provider + '!');
                    $location.path('/');
                })
                .catch(function (error) {
                    if (error.message) {
                        // Satellizer promise reject error.
                        toastr.error(error.message);
                    } else if (error.data) {
                        // HTTP response error from server
                        toastr.error(error.data.message, error.status);
                    } else {
                        toastr.error(error);
                    }
                });
        }
    }
})();
