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
                  if($scope.paginas.length === 0) {
                    pagina.exibir("esquerda");
                  }
                  $scope.paginas.push(pagina);                  
                };
        
                $scope.atualizarIndice = function (indice, direcao) {
                  $scope.paginas[$scope.indiceAtual].ocultar();                  
                  $scope.paginas[indice].exibir(direcao);
                  $scope.indiceAtual = indice;
                };
        
                $scope.ehIndicePaginaAtual = function (indice) {                    
                    return $scope.indiceAtual === indice;
                };
        
                $scope.proximaPagina = function () {  
                  var indiceAtual = $scope.indiceAtual,           
                  novoIndiceAtual = (indiceAtual < $scope.paginas.length - 1) ? ++indiceAtual : 0;
                    $scope.atualizarIndice(novoIndiceAtual, "direita");
                };
        
                $scope.paginaAnterior = function () {
                    var indiceAtual = $scope.indiceAtual,
                    novoIndiceAtual = (indiceAtual > 0) ? --indiceAtual : $scope.paginas.length - 1;                    
                    $scope.atualizarIndice(novoIndiceAtual, "esquerda");
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
        
        scope.exibir = function(direcao) {          
            scope.visivel = true;
            scope.direcao = direcao;
            scope.detalheVisivel = true;
        }

        scope.ocultar = function() {          
            scope.visivel = false;
            scope.detalheVisivel = false;
        }
                                  
        scope.alternarDetalhe = function() {          
            scope.detalheVisivel = !scope.detalheVisivel;
            return scope.detalheVisivel;
        };

        scope.ocultar();
        carrosselControle.adicionarPagina(scope);
      },
      templateUrl: 'ui/carrossel/diretivas/diretiva-paginas.html'
    };
  });