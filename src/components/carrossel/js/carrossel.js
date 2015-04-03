'use strict';
angular.module('bolao.carrossel', [])
.directive('carrossel', ['BD', '$timeout', function(BD, $timeout) {
        return {
            restrict: 'E',
            transclude: 'true',
            replace: 'true',
            templateUrl: 'components/carrossel/diretivas/diretiva-carrossel.html',
            scope: {
                totalPaginas: '=',
                boleiro: '='
            },
            controller: function($scope) {
                
                $scope.direcao = 'esquerda';
                $scope.paginas = [];
                
                var eu = this, 
                
                paginaAtual = 1, 
                alternarPagina = function(paginaSelecionada) {
                    angular.forEach($scope.paginas, function(pagina) {
                        if (pagina.conteudo.id === paginaSelecionada) {
                            pagina.exibir();
                            return;
                        }
                    });
                };
                
                $scope.atualizarPagina = function(paginaSelecionada, direcao) {
                    
                    if (direcao === undefined) {
                        $scope.direcao = (paginaAtual >= paginaSelecionada) ? 'esquerda' : 'direita';
                    } 
                    else {
                        $scope.direcao = direcao;
                    }
                    
                    var novaRodada = true;
                    var abortar = false;
                    angular.forEach($scope.paginas, function(pagina) {
                        if (pagina.conteudo.id === paginaAtual) {
                            pagina.ocultar();
                            abortar = true;
                        }
                        
                        if (pagina.conteudo.id === paginaSelecionada) {
                            novaRodada = false;
                        }
                        
                        if (!novaRodada && abortar) {
                            return;
                        }
                    });
                    
                    if (novaRodada) {
                        $scope.boleiro.rodadas.push(BD.pegarRodada($scope.boleiro.id, paginaSelecionada));
                    }
                    
                    $timeout(function() {
                        alternarPagina(paginaSelecionada);
                    }, 100);
                    
//                     $scope.$digest();
                    
                    paginaAtual = paginaSelecionada;
                };
                
                $scope.ehPaginaAtual = function(paginaSelecionada) {
                    return paginaAtual === paginaSelecionada;
                };
                
                $scope.proximaPagina = function() {
                    var pagina = paginaAtual, 
                    paginaSelecionada = (pagina < $scope.totalPaginas) ? ++pagina : 1;
                    $scope.atualizarPagina(paginaSelecionada, 'direita');
                };
                
                $scope.paginaAnterior = function() {
                    var pagina = paginaAtual, 
                    paginaSelecionada = (pagina > 1) ? --pagina : $scope.totalPaginas;
                    $scope.atualizarPagina(paginaSelecionada, 'esquerda');
                };
                
                eu.adicionarPagina = function(pagina) {
                    if (paginaAtual === 1) {
                        pagina.exibir();
                    }
                    $scope.paginas.push(pagina);
                };
            }
        };
    }])
.directive('pagina', function() {
    return {
        require: '^carrossel',
        restrict: 'E',
        transclude: 'true',
        replace: 'true',
        scope: {
            conteudo: '='
        },
        link: function(scope, element, attrs, carrosselControle) {
            
            scope.exibir = function() {
                scope.visivel = true;
                scope.detalheVisivel = true;
            };
            
            scope.ocultar = function() {
                scope.visivel = false;
                scope.detalheVisivel = false;
            };
            
            scope.alternarDetalhe = function() {
                scope.detalheVisivel = !scope.detalheVisivel;
            };
            
            scope.ocultar();
            carrosselControle.adicionarPagina(scope);
        },
        templateUrl: 'components/carrossel/diretivas/diretiva-paginas.html'
    };
});