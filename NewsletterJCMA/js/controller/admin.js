angular.module('controllers')
  .controller('adminCtrl', ['$rootScope', '$location', function($rootScope, $location) {


    $('.navbar').removeClass('hide');
    $('.navbar').addClass('showMenu');

    setTimeout(function() {
      $('.miniLogo').addClass('showLogo');
    }, 500);

    $rootScope.login = function() {
      $location.path('/login');
    };
    $rootScope.register = function() {
      $location.path('/admin');
    };
    $rootScope.openImportView = function() {
      $location.path('/importCSV');
    };
    $rootScope.createNews = function() {
      $location.path('/createNews');
    };
    $rootScope.createList = function() {
      $location.path('/createList');
    };
    $rootScope.openGroupsView = function() {
      $location.path('/createGroup');
    };
    $rootScope.showListNews = function() {
      $location.path('/listNews');
    };
    $rootScope.goToStat = function() {
      $location.path('/stats');
    };
  }]);
