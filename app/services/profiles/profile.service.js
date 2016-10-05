(function() {
    'use strict';

    angular
        .module('newlotApp')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = ['$q', '$http', 'SERVER_BACKEND'];

    function ProfileService($q, $http, SERVER_BACKEND) {

        var dataPromise;

        var service = {
            getProfileInfo : getProfileInfo
        };

        return service;

        function getProfileInfo() {
            if (angular.isUndefined(dataPromise)) {
                dataPromise = $http.get(SERVER_BACKEND+'api/account/profile').then(function(result) {
                    if (result.data.activeProfiles) {
                        var response = {};
                        response.activeProfiles = result.data.activeProfiles;
                        response.ribbonEnv = result.data.ribbonEnv;
                        response.inProduction = result.data.activeProfiles.indexOf("prod") !== -1;
                        return response;
                    }
                });
            }
            return dataPromise;
        }
    }
})();
