angular.module('controllers')
.controller('createGroupCtrl', [ '$scope', '$http', '$rootScope', 'factoRequest','toastr',
function($scope, $http, $rootScope, factoRequest, toastr) {

  $scope.listContact = {};

  factoRequest.getListContactForUser(8)
  .then(function(mListContact){
     console.log(mListContact);
     $scope.listContact = mListContact.data;
  })

}]);
