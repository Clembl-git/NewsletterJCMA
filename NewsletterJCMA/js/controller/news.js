angular.module('controllers')
 .controller('newsCtrl', ['$scope','$http', '$rootScope','factoRequest', function($http, $scope, factoRequest, $rootScope){
      //HTML Text Editor initialisation
    var textEditor = CKEDITOR.replace( 'editor' );
    //Quick live modif sur l'éditeur
    setTimeout(function () {
      //réactive le bouton sauvegarder
      $('.cke_button__save').removeClass('cke_button_disabled');
      $('.cke_button__image').on('click',function(){
        setTimeout(function () {
          //Lien de redirection pour heberger des images
          $('.cke_dialog_ui_hbox_last')[0].innerHTML = "<a href='http://www.hostingpics.net' target='_blank' class='hostImgLink'><h3>Host my image online</h3></a>";
        }, 1000);
      });
      //Bind la sauvegarde sur le btn de l'éditeur
      $('.cke_button__save').on('click', function(){
        btnSaveNews();
      });
    }, 1000);


    textEditor.on('change', function( evt ) {
      console.log("textchanged : "+evt.editor.getData());
    });


    $scope.btnSaveNews = function(){
      var news = {};
      console.log($rootScope.userId);
      news.neTextContent = textEditor.getData();
      news.neUserId = $rootScope.userId;
      news.neTitre = $('#newsTitle').val();
      news.UrlLink = $('#newsUrl').val();
      news.neUrlImage = "";

      factoRequest.createNewsletter(news).then(function(resp){
        console.log("created");
        console.log(resp);
      });
   };
 }]);
