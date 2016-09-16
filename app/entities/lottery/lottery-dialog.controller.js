(function() {
    'use strict';

    angular
        .module('newlotApp')
        .controller('LotteryDialogController', LotteryDialogController);

    LotteryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Lottery', 'User'];

    function LotteryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Lottery, User) {
        var vm = this;

        vm.lottery = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.lottery.id !== null) {
                Lottery.update(vm.lottery, onSaveSuccess, onSaveError);
            } else {
                Lottery.save(vm.lottery, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('newlotApp:lotteryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.createdAt = false;
        vm.datePickerOpenStatus.updatedAt = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
