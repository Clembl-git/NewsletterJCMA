angular.module('controllers')
.controller('HomeCtrl', ['$location','$rootScope', function($location, $rootScope) {
var countHomeClicked = 0;
  $rootScope.goHome = function() {
    countHomeClicked++;
    countHomeClicked % 2 != 0 ?  $('.imgLogo').removeClass('rotateLogo') :   $('.imgLogo').addClass('rotateLogo')  ;

    if( $rootScope.userId == undefined )
      $location.path('/login');
    else {
      $location.path('/admin');
    }
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
