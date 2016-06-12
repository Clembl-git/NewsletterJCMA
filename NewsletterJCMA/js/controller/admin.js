angular.module('controllers')
.controller('adminCtrl', ['$scope','$location',  function($scope, $location) {
  $scope.login = function() {
      $location.path('/login', false);
  };
  $scope.register = function() {
      $location.path('/admin', false);
  };
  $scope.openImportView = function() {
    $location.path('/importCSV', false);
  };
  $scope.createNews = function() {
    $location.path('/createNews', false);
  }
}]);
