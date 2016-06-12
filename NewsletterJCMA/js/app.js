'use strict';

// Declare app level module which depends on views, and components/dependency
var newsLettapp = angular.module('NewsLettApp',
//Ajout des modules JS, des factories et des librairies "globales"
 ['controllers','factory','ngRoute','ngCsvImport','ngAnimate','toastr']
);

//Instancie une liste pour le module controllers
angular.module('controllers', [])
//Défini un HomeController avec des méthodes globales à toute l'app
.controller('HomeCtrl', ['$location','$rootScope', function($location, $rootScope){
  $rootScope.goHome = function(){
    if($rootScope.userId == undefined)
      $location.path('/login', false);
    else
      $location.path('/admin',false);
  }
}]);

//Définition des différentes routes utilisés par l'app
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
    .when('/createGroup', {
        templateUrl: 'templates/groups.html'
    })
    //Redirection par défaut en cas d'url invalide
    .otherwise({redirectTo: '/login'});
}]);
