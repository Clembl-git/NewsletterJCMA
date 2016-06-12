'use strict';

// Declare app level module which depends on views, and components/dependency
var newsLettapp = angular.module('NewsLettApp', ['controllers','factory','ngRoute','ngCsvImport','ngAnimate', 'toastr']);
angular.module('controllers', []);


// setup editor options
newsLettapp.config(['$routeProvider', function($routeProvider, $http, $location) {

    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
    })
    .when('/admin', {
        templateUrl: 'templates/admin.html'
    })
    .when('/register', {
        templateUrl: 'templates/register.html'
    })
    .when('/importCSV', {
        templateUrl: 'templates/importCSV.html'
    })
    .when('/createList', {
        templateUrl: 'templates/createList.html'
    })
    .when('/createNews', {
        templateUrl: 'templates/createNews.html'
    })
    .otherwise({redirectTo: '/login'});
}]);
