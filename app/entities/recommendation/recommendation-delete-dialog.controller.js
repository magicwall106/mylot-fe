(function() {
    'use strict';

    angular
        .module('newlotApp')
        .controller('RecommendationDeleteController',RecommendationDeleteController);

    RecommendationDeleteController.$inject = ['$uibModalInstance', 'entity', 'Recommendation'];

    function RecommendationDeleteController($uibModalInstance, entity, Recommendation) {
        var vm = this;

        vm.recommendation = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Recommendation.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
