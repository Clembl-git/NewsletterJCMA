angular.module('controllers')
  .controller('modifyGroupCtrl', ['$scope', '$http', '$rootScope', '$location', 'Get', 'toastr',
    function($scope, $http, $rootScope, $location, Get, toastr)
    {
      if ($rootScope.userId == undefined)
        $location.path('/login');

      console.log($rootScope.userId);

      $scope.listGroups = {};
      $scope.listContactUser = {};

      Get.listContactForUser($rootScope.userId)
        .then(function(mListContact) {
          $scope.listContactUser = mListContact.data;
      });

      $scope.selectedContact = $scope.listContactUser[0];

      $scope.getListGroupFromUserId = function()
      {
        Get.listGroupesForUser($rootScope.userId)
        .then(function(listGroupes) {
            console.log(listGroupes);
            $scope.listGroups = listGroupes.data;
        })
      };

    $scope.getListGroupFromUserId();

    $scope.selected = $scope.listGroups[0];

    $scope.listContactFromGroupSelected = {};
    $scope.selectedContactFromGroup = $scope.listContactFromGroupSelected[0];

    $scope.getListContactForGroup = function()
    {
        Get.getListContactForGroupe($scope.selected[0].grId)
        .then(function(listContact) {
            console.log(listContact);

            $scope.listContactFromGroupSelected = listContact.data;
        })
    };


    $scope.groupSelected = function()
    {
        $scope.getListContactForGroup();
    };

    $scope.deleteGroupSelected = function()
    {
        console.log($scope.selected);

        if ($scope.selected != undefined)
        {
            Get.deleteGroup($scope.selected[0].grId)
            .then(function(){
                $scope.getListGroupFromUserId();
            })
        }
    };

    $scope.addContactToGroupSelected = function()
    {
        console.log($scope.selectedContact);

        if ($scope.selected != undefined)
        {
            if ($scope.selectedContact != undefined)
            {
                Get.addContactsToGroup($scope.selected[0].grId, $scope.selectedContact[0].coId)
                .then(function() {
                    $scope.getListContactForGroup();
                })
            }
            else {
              toastr.error("Veuillez sélectionner un contact", "Erreur de sélection");
            }
        }
        else {
          toastr.error("Veuillez sélectionner un groupe", "Erreur de sélection");
        }

    };

    $scope.deleteContactToGroupSelected = function()
    {
        if ($scope.selectedContactFromGroup != undefined)
        {
            console.log($scope.selectedContactFromGroup);
            Get.deleteContactToGroupe($scope.selected[0].grId, $scope.selectedContactFromGroup[0].coId)
            .then(function(){
                $scope.getListContactForGroup();
            })
        }
        else {
          toastr.error("Veuillez sélectionner un contact à supprimer", "Erreur de sélection");
        }
    };

  }
]);
