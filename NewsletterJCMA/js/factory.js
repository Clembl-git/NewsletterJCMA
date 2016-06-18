angular.module('factory', [])

.factory('Get', function($http) {
  return {
    collabs: {
      list: {},
    },
    bCheckUserPassword: function(email, mdp){
        return httpGetRequest($http, 'users/checkUserPassword/'+email+"/"+mdp);
    },
    addUser: function(nom, prenom, email, pwd) {
      return httpGetRequest($http, "users/addUser/" + nom + "/" + prenom + "/" + email + "/" + pwd);
    },
    listNewsLetterByUserId: function(idUser) {
      return httpGetRequest($http, "users/getListNewsLetterByUserId/" + idUser);
    },
    saveListContact: function(csvJson) {
      return httpPostRequest($http, "contacts/addListContact", csvJson);
    },
    listContactForUser: function(idUser){
      return httpGetRequest($http, "contacts/getListContactForUser/"+ idUser);
    },
    createNewsletter: function(news) {
      return httpPostRequest($http, "newsletter/createNewsLetter", news);
    },
    updateNewsLetter: function(news) {
      return httpPostRequest($http, "newsletter/updateNewsLetter", news);
    },
    deleteNewsletter: function(idNews) {
      return httpGetRequest($http, "newsletter/deleteNewsLetter/"+idNews);
    },
    nombreMailOuvert: function(idNews) {
      return httpGetRequest($http, "newsletter/getNombreMailOuvert/" + idNews);
    },
    nombreMailEnvoye: function(idNews) {
      return httpGetRequest($http, "newsletter/getNombreMailEnvoye/" + idNews);
    },
    statLienClique: function(idNews) {
      return httpGetRequest($http, "newsletter/getStatLienClique/" + idNews);
    },
    addGroupeToNewsLetter: function(idGroupe,idNewsLetter) {
      return httpGetRequest($http, "newsletter/addGroupeToNewsLetter/" + idGroupe+"/"+idNewsLetter);
    },
    sendNewsLetter: function(idNews) {
      return httpGetRequest($http, "newsletter/sendNewsLetter/"+idNews);
    },
    listGroupesForUser: function(idUser) {
      return httpGetRequest($http, "groupes/getListGroupesForUser/" + idUser);
    }


}
});

var baseUrlWS = "http://localhost:4242/";
/* GET sur la requête passé en paramètre */
/* Return une promise HTTP, une réponse asynchrone contenant le retour de la requête  */
function httpGetRequest($http, request) {
  var req = {
    method: 'GET',
    url: baseUrlWS + request,
    headers: {
      'Content-Type':'Accept: application/json, text/plain, * / *'
    }
  };
    return $http(req);
 }

 /* POST sur l'url passé en paramètre
    @param data : le body de la requête */
 /* Return une promise HTTP, une réponse asynchrone contenant le retour de la requête  */
 function httpPostRequest($http, request, data) {
   var req = {
     method: 'POST',
     url: baseUrlWS + request,
     headers: {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
     },
     data: data
   };
     return $http(req);
  }
