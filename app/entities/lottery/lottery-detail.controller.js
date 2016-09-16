(function() {
    'use strict';

    angular
        .module('newlotApp')
        .controller('LotteryDetailController', LotteryDetailController);

    LotteryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Lottery', 'User'];

    function LotteryDetailController($scope, $rootScope, $stateParams, previousState, entity, Lottery, User) {
        var vm = this;

        vm.lottery = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('newlotApp:lotteryUpdate', function(event, result) {
            vm.lottery = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
