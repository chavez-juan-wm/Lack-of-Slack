/*
    Author: Juan M. Chavez
    Date: 3-2-17
    File: index.route.js
    Description: This handles all of the routing in our single page application

    3/10
    Added a route to '/auth'
 */

export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('auth', {
        url: '/auth',
        templateUrl: 'app/auth/auth.html',
        controller: 'AuthController',
        controllerAs: 'auth'
    });

  $urlRouterProvider.otherwise('/');
}