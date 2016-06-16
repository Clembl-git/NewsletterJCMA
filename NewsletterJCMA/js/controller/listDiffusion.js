angular.module('controllers')
  .controller('listCtrl', ['$scope', '$http', '$rootScope', 'Get', 'toastr',
    function($scope, $http, $rootScope, Get, toastr) {

      $scope.listContact = {};
      console.log($rootScope.userId);

      Get.listContactForUser($rootScope.userId)
        .then(function(listC) {
          console.log(listC);
          $scope.listContact = listC.data;

        })

    }]);
