angular.module('controllers')
.controller('HomeCtrl', ['$location','$rootScope', function($location, $rootScope) {

  $rootScope.goHome = function() {
    if( $rootScope.userId == undefined )
      $location.path('/login', false);
    else
      $location.path('/admin',false);
  }
  $rootScope.newsFeed = function() {
    $location.path('/listNews');
  }
  $rootScope.deconnexion = function() {
    $location.path('/login');
  }

}]);
