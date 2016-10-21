(function() {
    'use strict';

    angular
        .module('newlotApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('lottery', {
            parent: 'entity',
            url: '/lottery',
            data: {
                authorities: ['user'],
                pageTitle: 'Lotteries'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/lottery/lotteries.html',
                    controller: 'LotteryController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('lottery-detail', {
            parent: 'entity',
            url: '/lottery/{id}',
            data: {
                authorities: ['user'],
                pageTitle: 'Lottery'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/lottery/lottery-detail.html',
                    controller: 'LotteryDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Lottery', function($stateParams, Lottery) {
                    return Lottery.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'lottery',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('lottery-detail.edit', {
            parent: 'lottery-detail',
            url: '/detail/edit',
            data: {
                authorities: ['user']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lottery/lottery-dialog.html',
                    controller: 'LotteryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Lottery', function(Lottery) {
                            return Lottery.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('lottery.new', {
            parent: 'lottery',
            url: '/new',
            data: {
                authorities: ['user']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lottery/lottery-dialog.html',
                    controller: 'LotteryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                status: null,
                                num1: null,
                                num2: null,
                                num3: null,
                                num4: null,
                                num5: null,
                                num6: null,
                                createdAt: null,
                                updatedAt: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('lottery', null, { reload: 'lottery' });
                }, function() {
                    $state.go('lottery');
                });
            }]
        })
        .state('lottery.edit', {
            parent: 'lottery',
            url: '/{id}/edit',
            data: {
                authorities: ['user']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lottery/lottery-dialog.html',
                    controller: 'LotteryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Lottery', function(Lottery) {
                            return Lottery.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('lottery', null, { reload: 'lottery' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('lottery.delete', {
            parent: 'lottery',
            url: '/{id}/delete',
            data: {
                authorities: ['user']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lottery/lottery-delete-dialog.html',
                    controller: 'LotteryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Lottery', function(Lottery) {
                            return Lottery.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('lottery', null, { reload: 'lottery' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
