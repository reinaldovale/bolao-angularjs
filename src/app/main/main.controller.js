'use strict';

angular.module('bolao')
  .controller('ControlePrincipal', ['$scope', 'BD', function($scope, BD) {

    $scope.boleiros = [];

//     var bd = new BD();
//     bd.pegarBoleiros().then(function() {
//         $scope.boleiros = bd.boleiros;
//     });

    
    BD.pegarBoleiros()
      .then(function(dados) {
            $scope.boleiros = dados;            
       });
    
}]);
