angular.module('controllers')
  .controller('createGroupCtrl', ['$scope', '$http', '$rootScope', '$location', 'Get', 'toastr',
    function($scope, $http, $rootScope, $location, Get, toastr)
    {
      if ($rootScope.userId == undefined)
        $location.path('/login');

      $scope.listContact = {};
      $scope.selectedContact = [];

      Get.listContactForUser(8)
        .then(function(mListContact) {
          console.log(mListContact);
          $scope.listContact = mListContact.data;
          //console.log($scope.listContact);
        });

    $scope.selected = $scope.listContact[0];

    $scope.contactSelected = function(contact)
    {
        console.log($scope.selected[0]);
        $scope.selectedContact.push($scope.selected[0]);
        $scope.removeContactFromID($scope.selected[0].coId);
    };

    $scope.contactUnselected = function(contact)
    {
        console.log($scope.selected2[0]);
        $scope.listContact.push($scope.selected2[0]);
        $scope.removeContactGroupFromID($scope.selected2[0].coId);
    };

    $scope.removeContactFromID = function(id)
    {
      console.log(id);

        angular.forEach($scope.listContact, function(contact, i)
        {
          if (contact.coId == id) {
              $scope.listContact.splice($scope.listContact.indexOf(contact), 1);
          }
        })
    };

    $scope.removeContactGroupFromID = function(id)
    {
      console.log(id);

        angular.forEach($scope.selectedContact, function(contact, i)
        {
          if (contact.coId == id) {
              $scope.selectedContact.splice($scope.selectedContact.indexOf(contact), 1);
          }
        })
    };

    $scope.groupName;

    $scope.createGroup = function()
    {
        console.log($scope.groupName);

        if ($scope.groupName != undefined) {
            Get.createNewGroup($scope.groupName, "Description", $rootScope.userId)
            .then(function(idGroup) {
              console.log(idGroup);

              var listContactId = "";

              angular.forEach($scope.selectedContact, function(contact, i)
              {
                  listContactId += contact.coId + ",";
              })

              listContactId = listContactId.substring(0, listContactId.length - 1);

              console.log($scope.selectedContact);
              Get.addContactsToGroup(idGroup.data, listContactId)
              .then (function() {

                angular.forEach($scope.selectedContact, function(contact, i)
                {
                  $scope.listContact.push(contact);
                })

                $scope.selectedContact = [];

                toastr.success("Le groupe " + $scope.groupName + " a été crée avec succès.", "Création de groupe");

                $scope.groupName = "";
              })
            })
        }
        else {
          toastr.error("Veuillez rentrer un nom de groupe.", "Manque d'information");
        }
    };
  }
  ]);
