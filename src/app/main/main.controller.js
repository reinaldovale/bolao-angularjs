'use strict';

angular.module('bolao')
.controller('ControlePrincipal', ['$scope', 'BD', function($scope, BD) {
        
        $scope.boleiros = [];
        
        BD.pegarBoleiros()
        .then(function(dados) {
            $scope.boleiros = dados;
        });
    }]);
