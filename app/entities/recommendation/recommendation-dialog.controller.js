(function() {
    'use strict';

    angular
        .module('newlotApp')
        .controller('RecommendationDialogController', RecommendationDialogController);

    RecommendationDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Recommendation', 'User'];

    function RecommendationDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Recommendation, User) {
        var vm = this;

        vm.recommendation = entity;
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
            if (vm.recommendation.id !== null) {
                Recommendation.update(vm.recommendation, onSaveSuccess, onSaveError);
            } else {
                Recommendation.save(vm.recommendation, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('newlotApp:recommendationUpdate', result);
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
