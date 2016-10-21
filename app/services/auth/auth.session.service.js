(function() {
    'use strict';

    angular
        .module('newlotApp')
        .factory('AuthServerProvider', AuthServerProvider);

    AuthServerProvider.$inject = ['$http', '$localStorage', 'SERVER_BACKEND' ];

    function AuthServerProvider ($http, $localStorage, SERVER_BACKEND ) {
        var service = {
            getToken: getToken,
            hasValidToken: hasValidToken,
            login: login,
            logout: logout
        };

        return service;

        function getToken () {
            var token = $localStorage.authenticationToken;
            return token;
        }

        function hasValidToken () {
            var token = this.getToken();
            return !!token;
        }

        function login (credentials) {
            var data = 'email=' + encodeURIComponent(credentials.username) +
                '&password=' + encodeURIComponent(credentials.password);

            return $http.post(SERVER_BACKEND + 'api/login', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (response, status, headers, config) {
                return response;
            }).error(function (data, status, header, config) {
                return data;
            });
        }

        function logout () {   
            // logout from the server
            $http.get(SERVER_BACKEND + 'api/logout').success(function (response) {
                delete $localStorage.authenticationToken;
                // to get a new csrf token call the api
                $http.get(SERVER_BACKEND + 'api/account/profile');
                return response;
            });
            
        }
    }
})();
