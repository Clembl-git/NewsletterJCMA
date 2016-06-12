angular.module('controllers')
.controller('listCtrl', [ '$scope', '$http', '$rootScope', 'factoRequest','toastr'
function($scope, $http, $rootScope, factoRequest, toastr){

  $scope.listContact = {};
  console.log($rootScope.userId);

  factoRequest.getListContactForUser($rootScope.userId)
  .then(function(listC){
      console.log(listC);
      $scope.listContact = listC.data;

  })

}]);
