angular.module('controllers')
  .controller('StatCtrl', ['$scope', '$http', '$rootScope', '$location', 'Get', 'toastr',
    function($scope, $http, $rootScope, $location, Get, toastr) {

      $scope.graph = {};
      $scope.graph.data = [0,0,0,0];

      $scope.graph.series = ['Statistiques de vos '+$scope.nbNews+" newsletters"];
      $scope.graph.labels = ['Mail envoyé', 'Mail ouvert', 'Lien cliqué'];
      $scope.stats = [];
      $scope.nbNews = 0;

      if ($rootScope.userId == undefined)
        $location.path('/login');

      Get.listNewsLetterByUserId($rootScope.userId).then(function(listNews) {
        if (listNews.data != undefined) {
          angular.forEach(listNews.data, function(news, index) {
              $scope.nbNews++;
            Get.statLienClique(news.neId).then(function(nbLienClique) {

              Get.nombreMailOuvert(news.neId).then(function(nbMailOuvert) {

                Get.nombreMailEnvoye(news.neId).then(function(nbMailEnvoye) {
                  nbLienClique = isNaN(parseInt(nbLienClique.data)) ? 0 : parseInt(nbLienClique.data);
                  nbMailEnvoye = isNaN(parseInt(nbMailEnvoye.data)) ? 0 : parseInt(nbMailEnvoye.data);
                  nbMailOuvert = isNaN(parseInt(nbMailOuvert.data)) ? 0 : parseInt(nbMailOuvert.data);

                  var newsData = {};
                  newsData.graph = [];
                  newsData.idNews = news.neId;
                  newsData.title = news.neTitre;
                  newsData.text = news.neTextContent;

                  newsData.nbEnvoye = nbMailEnvoye;
                  newsData.nbOuvert = nbMailOuvert;
                  newsData.nbLien   = nbLienClique;

                  newsData.graph = [nbMailEnvoye,nbMailOuvert,nbLienClique];

                  $scope.stats.push(newsData);

                  $scope.graph.data[0] += nbMailEnvoye;
                  $scope.graph.data[1] += nbMailOuvert;
                  $scope.graph.data[2] += nbLienClique;

                });
              });
            });

          });

        } else {
          toastr.error("Vous n'avez aucune newsletter.. Ecrivez en une !", 'Désolé')
        }

      });


    }]);
