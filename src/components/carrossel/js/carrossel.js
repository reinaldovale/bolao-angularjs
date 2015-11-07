'use strict';
angular.module('bolao.carrossel', [])
.directive('carrossel', ['BD', '$timeout', '$rootScope', function(BD, $timeout, $rootScope) {
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
            var eu = this
              
            
            , 
            paginaAtual = 1
              
            
            
            
            
            
            , 
            alternarPagina = function(paginaSelecionada) {
                for (var i = 0; i < $scope.paginas.length; i++) {
                    if ($scope.paginas[i].conteudo.id === paginaSelecionada) {
                        $scope.paginas[i].exibir();
                        break;
                    }
                }
            }
            ;
            $scope.atualizarPagina = function(paginaSelecionada, direcao) {
                if (direcao === undefined) {
                    $scope.direcao = (paginaAtual >= paginaSelecionada) ? 'esquerda' : 'direita';
                } else {
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
                }
                );
                if (novaRodada) {
                    BD.pegarRodadaES($scope.boleiro.boleiro, paginaSelecionada)
                    .then(
                    function(response) {
                        $timeout(function() {
                            $scope.boleiro.rodadas.push(response);
                            $scope.$digest();
                            alternarPagina(paginaSelecionada);
                            paginaAtual = paginaSelecionada;
                        }
                        );
                    }
                    , 
                    function errorCallback(response) {
                        console.log(response);
                        console.log("Tentando novamente...");
                        BD.pegarRodadaES($scope.boleiro.boleiro, paginaSelecionada)
                        .then(
                        function(response) {
                            $timeout(function() {
                                $scope.boleiro.rodadas.push(response);
                                $scope.$digest();
                                alternarPagina(paginaSelecionada);
                                paginaAtual = paginaSelecionada;
                            }
                            );
                        
                        }
                        , 
                        function errorCallback(response) {
                            console.log(response);
                            console.log("Iniciando um novo cadastro...");
                            BD.cadastrarRodadaES($scope.boleiro, paginaSelecionada)
                            .then(
                            function(response) {
                                if (response.jogos.length === 0) {
                                    BD.pegarRodadaES($scope.boleiro.boleiro, paginaSelecionada)
                                    .then(
                                    function(response) {
                                        $timeout(function() {
                                            $scope.boleiro.rodadas.push(response);
                                            $scope.$digest();
                                            alternarPagina(paginaSelecionada);
                                            paginaAtual = paginaSelecionada;
                                        }
                                        );
                                    
                                    }
                                    , 
                                    function errorCallback(response) {
                                        console.log(response);
                                        console.log("Busca de rodada após cadastro falhou");
                                    }
                                    );
                                } 
                                else {
                                    $timeout(function() {
                                        $scope.boleiro.rodadas.push(response);
                                        $scope.$digest();
                                        alternarPagina(paginaSelecionada);
                                        paginaAtual = paginaSelecionada;
                                    }
                                    );
                                }
                            }
                            , 
                            function errorCallback(response) {
                                console.log(response);
                                BD.pegarRodadaES($scope.boleiro.boleiro, paginaSelecionada)
                                .then(
                                function(response) {
                                    $timeout(function() {
                                        $scope.boleiro.rodadas.push(response);
                                        $scope.$digest();
                                        alternarPagina(paginaSelecionada);
                                        paginaAtual = paginaSelecionada;
                                    }
                                    );
                                
                                }
                                , 
                                function errorCallback(response) {
                                    console.log(response);
                                    console.log("Click novamente no número da rodada");
                                }
                                );
                            
                            }
                            );
                        }
                        );
                    }
                    );
                
                } 
                else {
                    $timeout(function() {
                        alternarPagina(paginaSelecionada);
                        paginaAtual = paginaSelecionada;
                    }
                    );
                }
            }
            ;
            
            $scope.ehPaginaAtual = function(paginaSelecionada) {
                return paginaAtual === paginaSelecionada;
            }
            ;
            $scope.proximaPagina = function() {
                var pagina = paginaAtual
                  
                
                
                
                
                
                
                
                
                , paginaSelecionada = (pagina < $scope.totalPaginas) ? ++pagina : 1;
                $scope.atualizarPagina(paginaSelecionada, 'direita');
            }
            ;
            $scope.paginaAnterior = function() {
                var pagina = paginaAtual
                  
                
                
                
                
                
                
                
                , 
                paginaSelecionada = (pagina > 1) ? --pagina : $scope.totalPaginas;
                $scope.atualizarPagina(paginaSelecionada, 'esquerda');
            }
            ;
            eu.adicionarPagina = function(pagina) {
                if (paginaAtual === 1) {
                    pagina.exibir();
                }
                $scope.paginas.push(pagina);
            }
            ;
        }
    };
}
]).directive('pagina', function() {
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
                scope.detalheVisivel = false;
            }
            ;
            scope.ocultar = function() {
                scope.visivel = false;
                scope.detalheVisivel = false;
            }
            ;
            scope.alternarDetalhe = function() {
                scope.detalheVisivel = !scope.detalheVisivel;
            }
            ;
            scope.ocultar();
            carrosselControle.adicionarPagina(scope);
        },
        templateUrl: 'components/carrossel/diretivas/diretiva-paginas.html'
    };
}
);
