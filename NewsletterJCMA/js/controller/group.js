angular.module('controllers')
  .controller('createGroupCtrl', ['$scope', '$http', '$rootScope', 'Get', 'toastr',
    function($scope, $http, $rootScope, Get, toastr) {

      $scope.listContact = {};

      Get.listContactForUser(8)
        .then(function(mListContact) {
          console.log(mListContact);
          $scope.listContact = mListContact.data;
        })

    }
  ]);
