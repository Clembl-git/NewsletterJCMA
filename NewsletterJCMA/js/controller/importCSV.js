angular.module('controllers')
.controller('importCtrl',  ['$scope','$http', '$parse', '$rootScope','$location','factoRequest',
function($scope, $http, $parse, $rootScope, $location, factoRequest) {
  $scope.listHeader = [];
  $scope.csv = {
     content: null,
     header: true,
     headerVisible: true,
     separator: ',',
     separatorVisible: true,
     result: null,
     encoding: 'ISO-8859-1',
     encodingVisible: true,
     stringifyCsv: null
   };
   console.log($scope.csv.header);

   $scope.sendCsvDataToDB = function () {
      var user,
          csvToDb = {},
          //Récupère les id du choix de chaques select
          nomValue = $('#selectNom option:selected').attr('value'),
          prenomValue = $('#selectPrenom option:selected').attr('value'),
          mailValue = $('#selectMail option:selected').attr('value');

      csvToDb.idUser = $rootScope.userId;
      csvToDb.Contact = [];

      if( nomValue != prenomValue && prenomValue != mailValue ) {
        angular.forEach($scope.csv.result, function(csvRow, key) {
          user = {};
          angular.forEach(csvRow, function(rowVal, rowName) {
           switch (rowName) {
             case nomValue:
              user.coNom = rowVal;
              break;
             case prenomValue:
               user.coPrenom = rowVal;
              break;
             case mailValue:
               user.coMail = rowVal;
              break;
             default:
               break;
           }
         })
         csvToDb.Contact.push(user);
       })
       factoRequest.importListContact(csvToDb).then(function(res){
         console.log("import done");
         setTimeout(function () {
           $location.path('/admin', false);
         }, 1000);
       });

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
 }]);
