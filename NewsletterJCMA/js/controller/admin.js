angular.module('controllers')
.controller('adminCtrl', ['$scope','$location',  function($scope, $location) {


     $('.navbar').removeClass('hide');
     $('.navbar').addClass('showMenu');

    setTimeout(function () {
      $('.miniLogo').addClass('showLogo');
    }, 2000);

  $scope.login = function() {
      $location.path('/login');
  };
  $scope.register = function() {
      $location.path('/admin');
  };
  $scope.openImportView = function() {
    $location.path('/importCSV');
  };
  $scope.createNews = function() {
    $location.path('/createNews');
  };
  $scope.createList = function() {
      $location.path('/createList');
  };
  $scope.openGroupsView = function() {
      $location.path('/createGroup');
  };
  $scope.showListNews = function() {
      $location.path('/listNews');
  };
  $scope.goToStat = function() {
      $location.path('/stats');
  };
}]);
