
angular.module('controllers',['ngRoute'])


.controller('loginCtrl', function($scope, $location, $http) {
      console.log("login");

    $scope.login = function(){
      console.log("loginCtrlClick");
      $location.path('/lgoin');
    };
    $scope.register = function(){
      console.log("loginCtrlClick");
      $location.path('/admin');
    }

    })

.controller('adminCtrl', function($scope, $location) {

          $scope.login = function(){
            $location.path('/login');
          };
          $scope.register = function(){
            $location.path('/admin');
          }
    });
