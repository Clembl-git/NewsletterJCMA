angular.module('controllers')
  .controller('listCtrl', ['$scope', '$http', '$rootScope', 'Get', 'toastr', '$mdMedia', '$mdDialog',
    function($scope, $http, $rootScope, Get, toastr, $mdMedia, $mdDialog) {

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

          toastr.success("succes","Groupe Créer")
          //$scope.listNews = listC.data;
        })
      };

      $scope.manageGroups = function(ev)
      {
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'home.html#/modifyGroupDialog',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
          })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
          $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
          }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
          });
        };

        function DialogController($scope, $mdDialog)
        {
          $scope.hide = function() {
            $mdDialog.hide();
          };
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        }
      };
    }]);
