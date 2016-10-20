(function () {
    'use strict';

    angular
        .module('newlotApp')
        .config(flashConfig);

    flashConfig.$inject = ['FlashProvider'];

    function flashConfig(FlashProvider) {
        FlashProvider.setTimeout(5000);
        FlashProvider.setShowClose(true);
        FlashProvider.setTemplatePreset('transclude');
    }
})();
