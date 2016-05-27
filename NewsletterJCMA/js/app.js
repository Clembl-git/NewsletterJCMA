'use strict';

// Declare app level module which depends on views, and components
var newsLettapp = angular.module('NewsLettApp', ['ngRoute']);

newsLettapp.config(['$routeProvider', function($routeProvider, $http, $location) {



    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html'
    }); 
    $routeProvider.when('/admin', {
        templateUrl: 'templates/admin.html'
    });
    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html'
    });
      $routeProvider.otherwise({redirectTo: '/login'});

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
