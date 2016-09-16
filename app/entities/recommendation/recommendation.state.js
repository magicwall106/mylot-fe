(function() {
    'use strict';

    angular
        .module('newlotApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('recommendation', {
            parent: 'entity',
            url: '/recommendation',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Recommendations'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/recommendation/recommendations.html',
                    controller: 'RecommendationController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('recommendation-detail', {
            parent: 'entity',
            url: '/recommendation/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Recommendation'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/recommendation/recommendation-detail.html',
                    controller: 'RecommendationDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Recommendation', function($stateParams, Recommendation) {
                    return Recommendation.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'recommendation',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('recommendation-detail.edit', {
            parent: 'recommendation-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/recommendation/recommendation-dialog.html',
                    controller: 'RecommendationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Recommendation', function(Recommendation) {
                            return Recommendation.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('recommendation.new', {
            parent: 'recommendation',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/recommendation/recommendation-dialog.html',
                    controller: 'RecommendationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                condition: null,
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
                    $state.go('recommendation', null, { reload: 'recommendation' });
                }, function() {
                    $state.go('recommendation');
                });
            }]
        })
        .state('recommendation.edit', {
            parent: 'recommendation',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/recommendation/recommendation-dialog.html',
                    controller: 'RecommendationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Recommendation', function(Recommendation) {
                            return Recommendation.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('recommendation', null, { reload: 'recommendation' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('recommendation.delete', {
            parent: 'recommendation',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/recommendation/recommendation-delete-dialog.html',
                    controller: 'RecommendationDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Recommendation', function(Recommendation) {
                            return Recommendation.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('recommendation', null, { reload: 'recommendation' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
