angular.module('controllers')
.controller('StatCtrl', ['$scope','$http', '$rootScope', '$location', 'Get', 'toastr',
 function($scope, $http, $rootScope, $location, Get, toastr) {


  $scope.graph = {};
  $scope.stats = [];
  var byNews = {
    idNews: null,
    nbLien: null,
    nbOuvert: null,
    nbEnvoye: null,
    title: null,
  };

  if($rootScope.userId == undefined)
    $location.path('/login');

    Get.listNewsLetterByUserId($rootScope.userId).then(function(listNews){
      if(listNews.data != undefined) {
        angular.forEach(listNews.data, function(news) {
          console.log(news);
          byNews.idNews = news.neId;
          byNews.title = news.neTitre;
          Get.statLienClique(news.neId).then(function(nbLienClique) {
              byNews.nbLien = nbLienClique.data;
          });
          Get.nombreMailOuvert(news.neId).then(function(nbMailOuvert) {
              byNews.nbOuvert = nbMailOuvert.data;

          });
          Get.nombreMailEnvoye(news.neId).then(function(nbMailEnvoye) {
              byNews.nbEnvoye = nbMailEnvoye.data;
          });
          $scope.stats.push(byNews);
        });
        console.log($scope.stats);
      } else {
        toastr.error("Vous n'avez aucune newsletter.. Ecrivez en une !",'Désolé')
      }
    });

   $scope.graph.data = [
     [16, 15, 20, 12, 16, 12, 8],
     [16, 15, 20, 12, 16, 12, 8],
     [16, 15, 20, 12, 16, 12, 8],
     [8, 9, 4, 12, 8, 12, 14]
   ];
   $scope.graph.labels = ['Mon', 'Tue', 'Sun'];
   $scope.graph.series = ['Awake', 'Asleep','3','4'];

   }]);
