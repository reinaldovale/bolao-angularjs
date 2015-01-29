'use strict';

// angular.module('bolao.carrossel', ['ngAnimate'])
angular.module('bolao.carrossel', [])
    .directive('carrossel', function() {
        return {
            restrict: 'E',
            transclude: true,
//             replace: true,
            templateUrl: 'ui/carrossel/diretivas/diretiva-carrossel.html' ,
            scope: true,
            controller: function ($scope) {
              
                var eu = this;
                $scope.paginas = [];
                $scope.indiceAtual = 0;
                
                eu.adicionarPagina = function(pagina) {
                  if(pagina.indice === 0) {
                      pagina.visivel = true;
                    pagina.exibir();
                  }
                  $scope.paginas.push(pagina);                  
                };
        
                $scope.atualizarIndice = function (indice) {
                    indice = parseInt(indice);        		
                    if(typeof indice === 'number' && isFinite(indice) && indice > -1 && indice < $scope.paginas.length) {
                      if($scope.indiceAtual < indice) {
                        $scope.indiceAtual = indice - 1;
                        $scope.proximaPagina();
                      }
                      else {
                        $scope.indiceAtual = indice + 1;
                        $scope.paginaAnterior();
                      }
                    }
                    
                };
        
                $scope.indicePaginaAtual = function (indice) {                    
                    return $scope.indiceAtual === indice;
                };
        
                $scope.proximaPagina = function () {                 
                    $scope.indiceAtual = ($scope.indiceAtual < $scope.paginas.length - 1) ? ++$scope.indiceAtual : 0;
                    $scope.paginas.forEach(function(pag, indice) {
                      if($scope.indiceAtual === indice) {
                        pag.exibir();                        
                      }
                      else {
                        pag.ocultar();
                      }
                      pag.direcao = 'direita';
                    });
                };
        
                $scope.paginaAnterior = function () {
                    $scope.indiceAtual = ($scope.indiceAtual > 0) ? --$scope.indiceAtual : $scope.paginas.length - 1;
                    $scope.paginas.forEach(function(pag, indice) {
                      if($scope.indiceAtual === indice) {
                        pag.exibir();                        
                      }
                      else {
                        pag.ocultar();
                      }
                      pag.direcao = 'esquerda';
                    });
                };
            }
            
        };
    })
    .directive('pagina', function() {
    return {
      require: '^carrossel',
      restrict: 'E',
      transclude: true,
//       replace: true,
      scope: {
        conteudo: '='
      },
      link: function(scope, element, attrs, carrosselControle) {
        scope.visivel = false;
        scope.indice = scope.$parent.$index;
        scope.detalheVisivel = false;
        scope.direcao = 'esquerda';

        scope.exibir = function() {          
//             scope.visivel = true;
            scope.detalheVisivel = true;
        }

        scope.ocultar = function() {          
//             scope.visivel = false;
            scope.detalheVisivel = false;
        }
                                  
        scope.alternarDetalhe = function() {          
            scope.detalheVisivel = !scope.detalheVisivel;
            return scope.detalheVisivel;
        };

        carrosselControle.adicionarPagina(scope);
      },
      templateUrl: 'ui/carrossel/diretivas/diretiva-paginas.html'
    };
  });