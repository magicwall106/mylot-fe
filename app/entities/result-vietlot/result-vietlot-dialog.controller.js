(function() {
    'use strict';

    angular
        .module('newlotApp')
        .controller('ResultVietlotDialogController', ResultVietlotDialogController);

    ResultVietlotDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ResultVietlot'];

    function ResultVietlotDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ResultVietlot) {
        var vm = this;

        vm.resultVietlot = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.resultVietlot.id !== null) {
                ResultVietlot.update(vm.resultVietlot, onSaveSuccess, onSaveError);
            } else {
                ResultVietlot.save(vm.resultVietlot, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('newlotApp:resultVietlotUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.resultDate = false;
        vm.datePickerOpenStatus.createdAt = false;
        vm.datePickerOpenStatus.updatedAt = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
