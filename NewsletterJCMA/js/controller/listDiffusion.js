angular.module('controllers')
  .controller('listCtrl', ['$scope', '$http', '$rootScope', 'Get', 'toastr',
    function($scope, $http, $rootScope, Get, toastr) {

      $scope.listContact = {};
      $scope.listNews = {};

      console.log($rootScope.userId);

      Get.listGroupesForUser($rootScope.userId)
        .then(function(listG) {
          console.log(listG);
          $scope.listGroupe = listG.data;

        })

      Get.listNewsLetterByUserId($rootScope.userId)
        .then(function(listC) {
          console.log(listC);
          $scope.listNews = listC.data;
        })

      $scope.saveListDiffusion = function(){
          Get.addGroupeToNewsLetter($scope.groupeSelected[0].grId,$scope.newsSelected[0].neId)
        .then(function(listC) {
          console.log("listC");
          console.log(listC);
          //$scope.listNews = listC.data;
        })
      };



    }]);
