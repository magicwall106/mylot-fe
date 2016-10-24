(function () {
    'use strict';

    var orderTicket = {
        templateUrl: 'app/components/order-ticket/order-ticket.html',
        controller: orderTicketController
    };

    angular
        .module('newlotApp')
        .component('orderTicket', orderTicket);

    orderTicketController.$inject = ['Result', 'Lottery'];

    function orderTicketController(Result, Lottery) {
        var vm = this;
        vm.lotteries = new Array(1);
        vm.conditionEnum = ['Best', 'Worst', 'Emotion']
        vm.submitForm = submitForm;
        vm.randomTicket = randomTicket;
        vm.addTicket = addTicket;
        vm.removeTicket = removeTicket;

        vm.result = null;
        vm.endTime = 0;
        vm.currentLots = 100;
        vm.progressValue = 0;

        _getResultByPage({ latest: true });

        function _getResultByPage(pageJson) {
            Result.get(pageJson, function (response) {
                if (response.docs && response.docs.length > 0) {
                    vm.resultDate = response.docs[0].resultDate;
                    vm.resultId = response.docs[0]._id;

                    vm.result = response.docs[0];
                    vm.endTime = (new Date(vm.result.resultDate)).getTime();
                    vm.currentLots = response.currentLots;
                    vm.progressValue = (vm.currentLots / 8100000 * 100 < 10) ? 10 : vm.currentLots / 8100000 * 100;
                }
            });
        }

        function removeTicket(index) {
            if (index < vm.lotteries.length && vm.lotteries.length > 1) {
                vm.lotteries.splice(index, 1);
            }
        }

        function addTicket() {
            vm.lotteries.push({});
        }

        function submitForm() {
            for (var item in vm.lotteries) {
                vm.lotteries[item]["result"] = vm.resultId;
            }
            var form = vm.lotteries;
            Lottery.save({ form: form },
                function (response) {
                    var res = response;
                }, function (err) {
                    var error = err;
                });

        }

        function randomTicket() {

        }

    }
})();