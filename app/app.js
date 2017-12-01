'use strict';
// Declare app level module which depends on views, and components
angular.module('EnoticeBoardWebApp', [
  'ngRoute'
  , 'EnoticeBoardWebApp.home'
  , 'EnoticeBoardWebApp.welcome'
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);