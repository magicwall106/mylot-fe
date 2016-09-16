(function() {
    'use strict';

    angular
        .module('newlotApp')
        .controller('LotteryDeleteController',LotteryDeleteController);

    LotteryDeleteController.$inject = ['$uibModalInstance', 'entity', 'Lottery'];

    function LotteryDeleteController($uibModalInstance, entity, Lottery) {
        var vm = this;

        vm.lottery = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Lottery.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
