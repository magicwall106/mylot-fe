(function () {
    'use strict';

    angular
        .module('newlotApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['Principal', 'LoginService', '$state', 'Contact'];

    function ContactController(Principal, LoginService, $state, Contact) {
        var vm = this;

        vm.success = null;
        vm.error = null;
        vm.errorValidate = null;
        vm.contact = null;
        vm.submitContact = submitContact;

        function submitContact() {

            Contact.save(vm.contact, function (response) {
                if (response) {
                    vm.success = "OK";
                }
            }, function (err) {
                if (err.status === 401 && err.data) {
                    vm.errorValidate = "ERROR";
                } 
                vm.error = "ERROR";

            });
        }
    }
})();
