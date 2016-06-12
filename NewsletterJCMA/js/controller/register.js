angular.module('controllers')
.controller('registerCtrl', ['$scope','$http', 'factoRequest', function($scope, $http, factoRequest) {

  $scope.register = function() {
    if( $scope.nom != undefined && $scope.prenom != undefined &&  $scope.email != undefined && $scope.password != undefined )
    {
      factoRequest.addUser($scope.nom, $scope.prenom, $scope.email, $scope.password)
      .then(function(res) {
        console.log(res);
      });
    }
    else {
      alert('La saisie de tous les champs est obligatoire');
    }
  }

}]);
