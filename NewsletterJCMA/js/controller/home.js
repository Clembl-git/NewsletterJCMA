angular.module('controllers')
.controller('HomeCtrl', ['$location','$rootScope', function($location, $rootScope) {

  $rootScope.goHome = function() {
    if( $rootScope.userId == undefined )
      $location.path('/login');
    else
      $location.path('/admin');
  }
  $rootScope.listNews = function() {
    $location.path('/listNews');
  }
  $rootScope.deconnexion = function() {
    $location.path('/login');
      $('.imgLogo').removeClass('rotateLogo');
      window.localStorage.removeItem("userId");
      window.localStorage.removeItem("userEmail");
  }
  $rootScope.createNews = function(){
    $location.path('/createNews');
  }

}]);
