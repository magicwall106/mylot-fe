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
            }).success(function (response) {
                return response;
            });
        }

        function logout () {

            
            // logout from the server
            $http.post('api/logout').success(function (response) {
                delete $localStorage.authenticationToken;
                // to get a new csrf token call the api
                $http.get('api/account');
                return response;
            });
            
        }
    }
})();
