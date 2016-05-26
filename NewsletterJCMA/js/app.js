'use strict';

// Declare app level module which depends on views, and components
var newsLettapp = angular.module('NewsLettApp', ['ngRoute']);

newsLettapp.config(['$routeProvider', function($routeProvider, $http, $location) {

    $routeProvider.otherwise({redirectTo: '/login'});


    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    });
    $routeProvider.when('/contact', {
        templateUrl: 'contact.html'
    });
    $routeProvider.when('/admin', {
        templateUrl: 'templates/admin.html'
    });

}]);
newsLettapp.controller('loginCtrl', ['$scope','$location',
  function($scope, $location, $http) {
      console.log("login");

    $scope.login = function(){
      $location.path('/admin');
    };
    $scope.register = function(){
      $location.path('/admin');
    }

    }
]);

newsLettapp.controller('adminCtrl', ['$scope',
    function($scope) {

          $scope.login = function(){
            $location.path('/admin');
          };
          $scope.register = function(){
            $location.path('/admin');
          }
    }
]);
