angular.module('controllers')
.controller('loginCtrl',  ['$scope','$http', '$location', '$rootScope','toastr','factoRequest',
function($scope, $http, $location, $rootScope, toastr, factoRequest) {

  $scope.login = function(){
    factoRequest.checkUserPassword($scope.email, $scope.password)
    .then(function(idUser) {
      console.log(idUser);
      if(idUser.data.usId != undefined) {
        $rootScope.userId = idUser.data.usId;
        console.log($rootScope.userId);
        $rootScope.userEmail = $scope.email;
        $location.path('/admin', false);
      } else {
       toastr.error('Echec d\'authentification', 'Utilisateur introuvable ou mot de passe incorrect');
      }
    });

  }
  $scope.register = function(){
    $location.path('/register', false);
  }

}]);
