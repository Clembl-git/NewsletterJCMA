angular.module('controllers')
.controller('loginCtrl',  ['$scope','$http', '$location', '$rootScope','toastr','factoRequest',
function($scope, $http, $location, $rootScope, toastr, factoRequest) {

  $scope.login = function(){
    factoRequest.checkUserPassword($scope.email, $scope.password)
    .then(function(idUser) {
      console.log(idUser);
      if(idUser.data.usId != undefined) {
        toastr.success('Bienvenue internaute','Connecté');
        $rootScope.userId = idUser.data.usId;
        $rootScope.userEmail = $scope.email;
        setTimeout(function () {
          $location.path('/admin', false);
        }, 500);
      } else {
       toastr.error('Utilisateur introuvable ou mot de passe incorrect','Echec d\'authentification');
      }
    });

  }
  $scope.register = function(){
    $location.path('/register', false);
  }

}]);
