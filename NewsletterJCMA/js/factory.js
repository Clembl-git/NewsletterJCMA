angular.module('factory', [])

.factory('factoRequest', function($http) {
  return {
    collabs: {
      list: {},
    },
    checkUserPassword: function(email, mdp){
        return httpGetRequest($http, 'users/checkUserPassword/'+email+"/"+mdp);
    },
    addUser: function(nom, prenom, email, pwd) {
      return httpGetRequest($http, "users/addUser/" + nom + "/" + prenom + "/" + email + "/" + pwd);
    },
    importListContact: function(csvJson) {
      return httpPostRequest($http, "contacts/addListContact", csvJson);
    },
    createNewsletter: function(news) {
      return httpPostRequest($http, "newsletter/createNewsLetter", news);
    }
  }
});


function httpGetRequest($http, request) {
  var req = {
    method: 'GET',
    url:'http://localhost:4242/'+request,
    headers: {
      'Content-Type':'Accept: application/json, text/plain, * / *'
    }
  };
    return $http(req);
 }

 function httpPostRequest($http, request, data) {
   var req = {
     method: 'POST',
     url:'http://localhost:4242/'+request,
     headers: {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
     },
     data: data
   };
     return $http(req);
  }
