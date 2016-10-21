(function () {
    'use strict';

    var rateBoard = {
        templateUrl: 'app/components/rate-board/rate-board.html',
        controller: rateBoardController
    };

    angular
        .module('newlotApp')
        .component('rateBoard', rateBoard);

    rateBoardController.$inject = ['Rate'];

    function rateBoardController(Rate) {
        var vm = this;
        vm.rates = [];
        _getRateBoard();
        function _getRateBoard() {
            Rate.get({}, function (response) {
                if (response.docs && response.docs.length > 0) {
                    vm.rates = response.docs[0].rates;
                }
            });
        }
    }
})();
