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
    .when('/register', {
        templateUrl: 'templates/register.html'
    })
    .otherwise({redirectTo: '/login'});
}]);


newsLettapp.controller('loginCtrl', ['$scope','$location',
  function($scope, $location, $http) {
      console.log("login");

    $scope.login = function(){
      $location.path('/admin');
    };
      console.log($location.path());
    $scope.register = function(){
      console.log($location.path());
      $location.path('/register');
    }


    }
]);

newsLettapp.controller('adminCtrl', ['$scope',
    function($scope) {

          $scope.login = function(){
            $location.path('/admin');
          };

          
    }
]);

newsLettapp.controller('registerCtrl', ['$scope',
    function($scope) {



          
    }
]);