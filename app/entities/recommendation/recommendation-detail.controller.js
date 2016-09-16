(function() {
    'use strict';

    angular
        .module('newlotApp')
        .controller('RecommendationDetailController', RecommendationDetailController);

    RecommendationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Recommendation', 'User'];

    function RecommendationDetailController($scope, $rootScope, $stateParams, previousState, entity, Recommendation, User) {
        var vm = this;

        vm.recommendation = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('newlotApp:recommendationUpdate', function(event, result) {
            vm.recommendation = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
