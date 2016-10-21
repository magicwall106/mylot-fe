(function () {
    'use strict';

    var resultLatest = {
        templateUrl: 'app/components/result-latest/result-latest.html',
        controller: resultLatestController
    };

    angular
        .module('newlotApp')
        .component('resultLatest', resultLatest);

    resultLatestController.$inject = ['Result'];

    function resultLatestController(Result) {
        var vm = this;
        vm.result = null;
        vm.endTime = 0;
        vm.currentLots = 100;
        vm.progressValue = 0;

        _getResultByPage({latest: true});
        
        function _getResultByPage(pageJson) {
            Result.get(pageJson, function (response) {
                if (response.docs && response.docs.length > 0) {
                    vm.result = response.docs[0];
                    vm.endTime = (new Date(vm.result.resultDate)).getTime();
                    vm.currentLots = response.currentLots;
                    vm.progressValue = (vm.currentLots / 8100000 * 100 < 10) ? 10 : vm.currentLots / 8100000 * 100;
                }
            });
        }
    }
})();
