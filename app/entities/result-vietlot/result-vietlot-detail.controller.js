(function() {
    'use strict';

    angular
        .module('newlotApp')
        .controller('ResultVietlotDetailController', ResultVietlotDetailController);

    ResultVietlotDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ResultVietlot'];

    function ResultVietlotDetailController($scope, $rootScope, $stateParams, previousState, entity, ResultVietlot) {
        var vm = this;

        vm.resultVietlot = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('newlotApp:resultVietlotUpdate', function(event, result) {
            vm.resultVietlot = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
