'use strict';

// Declare app level module which depends on views, and components
var newsLettapp = angular.module('NewsLettApp', ['controllers','ngRoute']);

newsLettapp.config(['$routeProvider', function($routeProvider, $http, $location) {

    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
    })
    .when('/admin', {
        templateUrl: 'templates/admin.html'
    })
    .otherwise({redirectTo: '/login'});
}]);
