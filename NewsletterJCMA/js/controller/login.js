angular.module('controllers')
.controller('loginCtrl',  ['$scope','$http', '$location', '$rootScope','toastr','Get',
function($scope, $http, $location, $rootScope, toastr, Get) {
     $('.navbar').removeClass('showMenu');
     $('.navbar').addClass('hide');

    //Info stocké en session
    $rootScope.userId    = window.localStorage.getItem("userId") ;
    $rootScope.userEmail = window.localStorage.getItem("userMail");

    console.log("id + mail:"+ $rootScope.userId  + " " +   JSON.stringify($rootScope.userEmail));

    if($rootScope.userId != undefined && $rootScope.userEmail != undefined ) {
      setInfoFromLogin($rootScope.userId, $rootScope.userEmail);
    }

    $scope.login = function() {
      Get.bCheckUserPassword($scope.email, $scope.password)
      .then(function(idUser) {
        if( idUser.data.usId != undefined )
          setInfoFromLogin(idUser.data.usId , $scope.email);
        else
         toastr.error('Mot de passe ou login incorrect','Echec d\'authentification');
       });

  }
  $scope.register = function() {
    $location.path('/register', false);
  }

  function setInfoFromLogin(idUser, email) {
        $('.imgLogo').addClass('rotateLogo');
        window.localStorage.setItem("userId",  idUser);
        window.localStorage.setItem("userMail", email);
        $rootScope.userId = idUser;
        $rootScope.userEmail = email;
        toastr.success('Welcome back internaute n°'+idUser,'Connecté');
        $location.path('/admin');
      }
}]);
