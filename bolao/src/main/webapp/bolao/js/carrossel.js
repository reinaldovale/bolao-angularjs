'use strict';

angular.module('bolao.diretivas.carrossel', [])
    .directive('carrossel', function() {
        return {
            restrict: 'E',
            transclude: false,
            templateUrl: 'js/diretiva-carrossel.html' ,
            scope: {
                rotacaoAutomatica: '=',
                paginas: '='
            },
            link: function (scope) {
                scope.carrosselProvedor = {
                    rotacaoAutomatica : false,
                    paginas : 'Teste2',
                    alert: function () {
                        this.rotacaoAutomatica = true;
                        alert('Teste Interno');
                    }
                    
                };
            }
            
        };
    });