(function() {
    'use strict';

    angular
        .module('newlotApp')
        .controller('ResultVietlotDeleteController',ResultVietlotDeleteController);

    ResultVietlotDeleteController.$inject = ['$uibModalInstance', 'entity', 'ResultVietlot'];

    function ResultVietlotDeleteController($uibModalInstance, entity, ResultVietlot) {
        var vm = this;

        vm.resultVietlot = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ResultVietlot.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
