(function() {
    'use strict';

    angular
        .module('newlotApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('result-vietlot', {
            parent: 'entity',
            url: '/result-vietlot?page&sort&search',
            data: {
                authorities: ['user'],
                pageTitle: 'ResultVietlots'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/result-vietlot/result-vietlots.html',
                    controller: 'ResultVietlotController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
            }
        })
        .state('result-vietlot-detail', {
            parent: 'entity',
            url: '/result-vietlot/{id}',
            data: {
                authorities: ['user'],
                pageTitle: 'ResultVietlot'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/result-vietlot/result-vietlot-detail.html',
                    controller: 'ResultVietlotDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'ResultVietlot', function($stateParams, ResultVietlot) {
                    return ResultVietlot.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'result-vietlot',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('result-vietlot-detail.edit', {
            parent: 'result-vietlot-detail',
            url: '/detail/edit',
            data: {
                authorities: ['user']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/result-vietlot/result-vietlot-dialog.html',
                    controller: 'ResultVietlotDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ResultVietlot', function(ResultVietlot) {
                            return ResultVietlot.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('result-vietlot.new', {
            parent: 'result-vietlot',
            url: '/new',
            data: {
                authorities: ['user']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/result-vietlot/result-vietlot-dialog.html',
                    controller: 'ResultVietlotDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                code: null,
                                resultDate: null,
                                num1: null,
                                num2: null,
                                num3: null,
                                num4: null,
                                num5: null,
                                num6: null,
                                award1: null,
                                award2: null,
                                award3: null,
                                award4: null,
                                createdAt: null,
                                updatedAt: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('result-vietlot', null, { reload: 'result-vietlot' });
                }, function() {
                    $state.go('result-vietlot');
                });
            }]
        })
        .state('result-vietlot.edit', {
            parent: 'result-vietlot',
            url: '/{id}/edit',
            data: {
                authorities: ['user']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/result-vietlot/result-vietlot-dialog.html',
                    controller: 'ResultVietlotDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ResultVietlot', function(ResultVietlot) {
                            return ResultVietlot.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('result-vietlot', null, { reload: 'result-vietlot' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('result-vietlot.delete', {
            parent: 'result-vietlot',
            url: '/{id}/delete',
            data: {
                authorities: ['user']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/result-vietlot/result-vietlot-delete-dialog.html',
                    controller: 'ResultVietlotDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ResultVietlot', function(ResultVietlot) {
                            return ResultVietlot.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('result-vietlot', null, { reload: 'result-vietlot' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
