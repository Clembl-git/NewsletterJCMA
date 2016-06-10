angular.module('controllers', ['ngRoute','ngAnimate'])


.controller('loginCtrl',  function($scope, $http, $location, $rootScope, factoRequest) {

  $scope.login = function(){
    factoRequest.checkUserPassword($scope.email, $scope.password)
    .then(function(idUser) {
      if(idUser.data.usId != undefined) {
        $rootScope.userId = idUser.data.usId;
        console.log($rootScope.userId);
        $rootScope.userEmail = $scope.email;
        $location.path('/admin', false);
      }
    });

  }
  $scope.register = function(){
    $location.path('/register', false);
  }
  })
.controller('createListCtrl', function($scope, $location, factoRequest, $rootScope) {
    $scope.listContact = {};

    console.log($rootScope.userId);

        factoRequest.getListContactForUser($rootScope.userId)
        .then(function(listC){
            console.log(listC);
            $scope.listContact = listC.data;

        })
})

.controller('adminCtrl', function($scope, $location) {
  $scope.login = function() {
      $location.path('/login', false);
  };
  $scope.register = function() {
      $location.path('/admin', false);
  }
  $scope.openImportView = function() {
    $location.path('/importCSV', false);
  }
  $scope.createList = function() {
      $location.path('/createList', false);
  }
  $scope.openGroupsView = function() {
      $location.path('/createGroup', false);
  }
})

.controller('registerCtrl', function($scope, $http) {
  $scope.submitRegister = function() {
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
})

.controller('createGroupCtrl', function($scope, $http, factoRequest, $rootScope) {
  $scope.listContact = {};

  factoRequest.getListContactForUser(8)
  .then(function(mListContact){
    console.log(mListContact);
    $scope.listContact = mListContact.data;
  })
})

.controller('importCtrl', function($scope, $parse, $rootScope, $http) {
  $scope.listHeader = [];
  $scope.csv = {
     content: null,
     header: $scope.boolHeader,
     headerVisible: true,
     separator: ',',
     separatorVisible: true,
     result: null,
     encoding: 'ISO-8859-1',
     encodingVisible: true,
     stringifyCsv: null
   };

   $scope.sendCsvDataToDB = function () {
      var csvToDb = {};
      if($rootScope)
      csvToDb.idUser = $rootScope.userId;
      csvToDb.Contact = [];
      console.log($rootScope.userId);

      var nomValue = $('#selectNom option:selected').attr('value');
      var prenomValue = $('#selectPrenom option:selected').attr('value');
      var mailValue = $('#selectMail option:selected').attr('value');
      if(nomValue != prenomValue && prenomValue != mailValue)
      {
        angular.forEach($scope.csv.result, function(value, key)
        {
          var user = {};
          angular.forEach(value, function(value, key) {
           switch (key) {
             case nomValue:
              user.coNom = value;
              break;
             case prenomValue:
               user.coPrenom = value;
              break;
             case mailValue:
               user.coMail = value;
              break;
             default:
               break;
           }
         })
         csvToDb.Contact.push(user);
       })
       console.log(csvToDb);
      csvToDb = angular.toJson(csvToDb);
      console.log(csvToDb);
      httpPostRequest($http, 'contacts/addListContact', csvToDb);

      } else {
        alert("Vous ne pouvez pas associer deux fois le même champ de votre fichier à un attribut !");
      }
    };

   $scope.btnCsvToJSON = function(json) {
     $scope.listHeader = $scope.getCsvHeader(json);

     var result = JSON.stringify(json);
     $scope.csv.stringifyCsv = result;
     return result;
//     $scope.CsvToJSON(json);
   }

   $scope.CsvToJSON = function (json) {
     var objStr = JSON.stringify(json);
     var obj = null;
     try {
       obj = $parse(objStr)({});
     } catch(e){
       console.log("Error while parsing");
     }
     var result = JSON.stringify(obj).replace(/"+/g, '');
     $scope.csv.stringifyCsv = json.replace(/"+/g, '');
     return result.replace(/"+/g, '');
   };


   $scope.getCsvHeader = function(json) {
     firstItem = json[0] != undefined ? json[0] : null;
     var result = [];
     for (key in json[0]) {
        result.push(key);
     }
     return result;
   };
 });
