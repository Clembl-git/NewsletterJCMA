angular.module('controllers') // CONTROLEURS LIST NEWS && CREATE NEWS
  .controller('createNewsCtrl', ['$scope', '$http', '$rootScope', '$location', 'Get', 'toastr',
    function($scope, $http, $rootScope, $location, Get, toastr) {

      var textEditor = CKEDITOR.replace('editor'); //HTML Text Editor initialisation
      textEditor.config.htmlEncodeOutput = false;
      textEditor.config.entities = false;
      setTimeout(function() {
        $('.cke_button__save').removeClass('cke_button_disabled'); //réactive le bouton sauvegarder
        $('.cke_button__image').on('click', function() {
          setTimeout(function() {
            //Lien de redirection pour heberger des images
            $('.cke_dialog_ui_hbox_last')[0].innerHTML = "<a href='http://www.hostingpics.net' target='_blank' class='hostImgLink'><h3>Host my image online</h3></a>";
          }, 1000);
        });
        //Bind la sauvegarde sur le btn de l'éditeur
        $('.cke_button__save').on('click', function() {
          $scope.btnSaveNews();
        });
      }, 1000);



      $scope.btnSaveNews = function() {
        var news = {};
        console.log("click");
        if ($rootScope.userId == undefined) {
          toastr.error('Vous avez été déconnecté', 'Erreur');
          $location.path('/login');
        } else {
          news.neTextContent = textEditor.getData()
          news.neTextContent = news.neTextContent.replace(/"+/g, '\'');
          news.neUserId = $rootScope.userId;
          news.neTitre = $('#newsTitle').val();
          news.UrlLink = $('#newsUrl').val();
          news.neUrlImage = "";

          if (news.neTextContent != "" && news.neTitre != "") {
            console.log(news.neTextContent);
            Get.createNewsletter(news)
              .then(function(resp) {
                toastr.success("Votre newsLetter a été créé", "Succès");
                console.log(resp);
              });

          } else {
            toastr.error("Vous devez saisir du texte et un titre", "Erreur");
          }
        }
      };



    }])

  .controller('listNewsCtrl', ['$scope', '$http', '$rootScope', '$location', '$sce', 'ngDialog', 'Get', 'toastr',
    function($scope, $http, $rootScope, $location, $sce, ngDialog, Get, toastr) {
      console.log("listN");
    if ($rootScope.userId == undefined)
      $location.path('/login');

      $scope.inEdition = false;

      $scope.listNews = {};
      Get.listNewsLetterByUserId($rootScope.userId)
        .then(function(listN) {
          console.log(listN);
          $scope.listNews = listN.data;
        });

      $scope.sanitizeHtml = function(string) {
        return $sce.trustAsHtml(string);
      };
      $scope.toDate = function(string){
        return new Date(string);
      }

      //garde l'instance en cours d'édition du ckeDitor
      var textEditor =null;
      $scope.isInEdition = false;


      $scope.manageGroupe = function(idGroup)
      {
        $rootScope.dialog =   ngDialog.open({ template: 'templates/modifyGroup.tmpl.html', className: 'ngdialog-theme-default' });
      };


      $scope.editNews = function(index) {
        console.log($scope.isInEdition);
        if($scope.isInEdition) {
          toastr.error("Une autre newsletter est déja en édition",'Action non autorisé');
        } else {
          $scope.isInEdition = true;
          $('#btnEdit'+index).css('display','none');
          $('#btnDel'+index).css('display','none');
          $('#btnSave'+index).css('display','block');
          $('#btnCancel'+index).css('display','block');

          console.log($('#newsTitle'+index));
          var titleValue =  $('#newsTitle'+index).text();
          //JS GOUROU MASTER TRICKS
          console.log(titleValue);
          $( "#newsTitle" + index).replaceWith( "<input type='text' class='title' id='newsTitle"+index+"'value='"+titleValue+"'/>" );

          setTimeout(function () {
            textEditor = CKEDITOR.replace("txtEditor" + index);
          }, 0);
        };

        $scope.delNews = function(index) {
          if($scope.isInEdition) {
            toastr.error("Une autre newsletter est déja en édition",'Action non autorisé');
          }
          //récupère l'id de la news dans l'input hidden
          Get.deleteNewsletter($('#newsId'+index).val()).then(function(res) {
            console.log(res);
            console.log(  $scope.listNews);
            $scope.listNews.slice(index,1);
            console.log(  $scope.listNews);
            toastr.success("Suppression effectué","Succès");

          });
        }
      };
      $scope.cancelEdition = function(index){

          $('#btnSave'+ index).css('display','none');
          $('#btnCancel'+ index).css('display','none');
          $('#btnEdit'+ index).css('display','block');
          $('#btnDel' + index).css('display','block');

          $("textarea[name='txtEditor" + index + "']")[0].value= $scope.listNews[index].neTextContent;
           $( "#newsTitle" + index  ).replaceWith( "<h2 type='text' class='title' id='newsTitle"+index+"'>"+ $scope.listNews[index].neTitre+"</h2>" );


          //Supprime l'instance de l'éditeur
          textEditor = null;
          $scope.isInEdition = false;
          CKEDITOR.instances["txtEditor" + index].destroy(true);
      }
      $scope.saveNews = function(index) {
          $scope.listNews[index].neTextContent =textEditor.getData();
          //Replace double quote by single for json
          $scope.listNews[index].neTextContent = escapeSpecialChars($scope.listNews[index].neTextContent);
          $scope.sNewsText = $scope.listNews[index].neTextContent;

          $scope.listNews[index].neId = $('#newsId'+index).val();
          $scope.listNews[index].neTitre = $('#newsTitle'+index).val();

          var titleValue =  $('#newsTitle'+index).val();
          $( "#newsTitle" + index  ).replaceWith( "<h2 type='text' class='title' id='newsTitle"+index+"'>"+titleValue+"</h2>" );

          console.log($scope.listNews[index].neTextContent);
          Get.updateNewsLetter($scope.listNews[index])
            .then(function(resp) {
              toastr.success("Votre newsLetter a été mise à jour", "Succès");
              $scope.cancelEdition(index);

            });
      };
      $scope.sendNewsletter = function(idNews) {
        Get.sendNewsLetter(idNews).then(function(resp){
          console.log(resp);
          toastr.success("Mail envoyé","Succès");
        });
      };
      $scope.duplicateNews = function(idNews) {
        Get.createNewsletter(idNews).then(function(resp){
          news.neTextContent = textEditor.getData()
          news.neTextContent = news.neTextContent.replace(/"+/g, '\'');
          news.neUserId = $rootScope.userId;
          news.neTitre = $('#newsTitle').val();
          news.UrlLink = $('#newsUrl').val();
          news.neUrlImage = "";

          console.log(news.neTextContent);
          Get.createNewsletter(news)
            .then(function(resp) {
              toastr.success("Votre newsLetter a été créé", "Succès");
              console.log(resp);
            });
        });
      };

    }]);

function escapeSpecialChars(string) {
    return string.replace(/\\n/g, "\\n")
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
};
