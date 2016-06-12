angular.module('controllers')
.controller('registerCtrl', ['$scope','$http', '$location', 'factoRequest', 'toastr',
 function($scope, $http, $location, factoRequest, toastr) {

  $scope.register = function() {
    if( $scope.nom != undefined && $scope.prenom != undefined &&  $scope.email != undefined && $scope.password != undefined )
    {
      factoRequest.addUser($scope.nom, $scope.prenom, $scope.email, $scope.password)
      .then(function(res) {
        toastr.success('Bravo ! ','Votre compte à bien été créé');
        setTimeout(function () { $location.path('/admin',false);   }, 1000);
      });
    }
    else {
      toastr.error('Echec d\'authentification', 'La saisie de tous les champs est obligatoire');
    }
  }

}]);
