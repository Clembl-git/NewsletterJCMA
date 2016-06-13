angular.module('controllers') // CONTROLEURS LIST NEWS && CREATE NEWS
 .controller('createNewsCtrl', ['$scope','$http', '$rootScope','$location','factoRequest', 'toastr',
  function($scope, $http, $rootScope, $location, factoRequest, toastr){

    var textEditor = CKEDITOR.replace( 'editor' );  //HTML Text Editor initialisation
    setTimeout(function () {
      $('.cke_button__save').removeClass('cke_button_disabled');  //réactive le bouton sauvegarder
      $('.cke_button__image').on('click',function() {
        setTimeout(function () {
          //Lien de redirection pour heberger des images
          $('.cke_dialog_ui_hbox_last')[0].innerHTML = "<a href='http://www.hostingpics.net' target='_blank' class='hostImgLink'><h3>Host my image online</h3></a>";
        }, 1000);
      });
      //Bind la sauvegarde sur le btn de l'éditeur
      $('.cke_button__save').on('click', function(){
          $scope.btnSaveNews();
      });
    }, 1000);



    $scope.btnSaveNews = function(){
      var news = {};
      console.log("click");
      if( $rootScope.userId == undefined ) {
        toastr.error('Vous avez été déconnecté','Erreur');
        $location.path('/login');
      }
      else {
        news.neTextContent = textEditor.getData()
        news.neTextContent =  news.neTextContent.replace(/"+/g, '\'');;
        news.neUserId = $rootScope.userId;
        news.neTitre = $('#newsTitle').val();
        news.UrlLink = $('#newsUrl').val();
        news.neUrlImage = "";

        if( news.neTextContent != "" && news.neTitre != "" ) {
          factoRequest.createNewsletter(news)
          .then(function(resp){
            toastr.success("Votre newsLetter a été créé","Succès");
            console.log(resp);
          });

        } else {
          toastr.error("Vous devez saisir du texte et un titre", "Erreur");
        }
    }
   };


 }])

.controller('listNewsCtrl', ['$scope','$http', '$rootScope','$location', '$sce', 'factoRequest', 'toastr',
function($scope, $http, $rootScope, $location, $sce, factoRequest, toastr){
console.log("listN");

   $scope.listNews = {};

   factoRequest.getListNewsLetterByUserId($rootScope.userId)
   .then(function(listN){
     console.log(listN);
     $scope.listNews =  listN.data;
   });

   $scope.sanitizeHtml = function(string) {
     return $sce.trustAsHtml(string);
   }
}]);
