'use strict';

angular.module('bolao')
  .controller('ControlePrincipal', ['$scope', 'BD', function($scope, BD) {
    $scope.boleiros = [];

    var bd = new BD();
    // fetch data and publish on scope
    bd.pegarBoleiros().then(function() {
        $scope.boleiros = bd.boleiros;
    });
    
}]);
