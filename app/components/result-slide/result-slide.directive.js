(function () {
    'use strict';

    var resultSlide = {
        templateUrl: 'app/components/result-slide/result-slide.html',
        controller: resultSlideController
    };

    angular
        .module('newlotApp')
        .component('resultSlide', resultSlide);

    resultSlideController.$inject = ['Result'];

    function resultSlideController(Result) {
        var vm = this;
        vm.results = [];
        vm.result = null;
        vm.totalItems = 0;
        vm.currentPage = 0;
        vm.offset = 0;
        vm.loadMore = false;
        vm.previousClick = previousClick;
        vm.nextClick = nextClick;

        _getResultByPage({ limit: 10, page: 1 });

        function previousClick() {
            if (vm.currentPage < vm.totalItems - 1) {
                vm.result = vm.results[++vm.currentPage];
                if (vm.loadMore && vm.results.length === vm.currentPage) {
                    _getResultByPage({ limit: 10, page: vm.offset + 1 });
                }
            }
        }

        function nextClick() {
            if (vm.currentPage > 0)
                vm.result = vm.results[--vm.currentPage];
        }

        function _getResultByPage(pageJson) {
            Result.get(pageJson, function (response) {
                if (response.docs && response.docs.length > 0) {
                    vm.results = vm.results.concat(response.docs);
                    vm.result = vm.results[vm.currentPage];
                    vm.totalItems = response.total;
                    vm.offset = response.offset + 1;
                    vm.loadMore = response.offset * pageJson.limit + response.docs.length < response.total;
                }
            });
        }
    }
})();
