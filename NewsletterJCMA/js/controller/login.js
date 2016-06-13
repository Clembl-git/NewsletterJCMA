angular.module('controllers')
.controller('loginCtrl',  ['$scope','$http', '$location', '$rootScope','toastr','factoRequest',
function($scope, $http, $location, $rootScope, toastr, factoRequest) {


     $('.navbar').removeClass('showMenu');
     $('.navbar').addClass('hide');

      $('.mainView').css('margin-top','350px');
      $('body').css('overflow','hidden');
      $('.imgLogo').fadeIn("slow");


  $scope.login = function(){
    $('.imgLogo').fadeOut();
    factoRequest.checkUserPassword($scope.email, $scope.password)
    .then(function(idUser) {
      console.log(idUser);
      if(idUser.data.usId != undefined) {
        toastr.success('Bienvenue internaute','Connecté');
        $rootScope.userId = idUser.data.usId;
        $rootScope.userEmail = $scope.email;

          $location.path('/admin', false);
      } else {
       toastr.error('Utilisateur introuvable ou mot de passe incorrect','Echec d\'authentification');
      }
    });

  }
  $scope.register = function(){
    $location.path('/register', false);
  }

}]);
