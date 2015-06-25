'use strict';
angular.module('bolao.acordeon', [])
.directive('acordeon', function() {
    return {
        restrict: 'E',
        transclude: 'true',
        replace: 'true',
        templateUrl: 'components/acordeon/diretivas/diretiva-acordeon.html',
        scope: 'true',
        controller: function($scope) {
            
            $scope.itens = [];
            
            var eu = this,
            maxPremiados = 2,
            minPontoPremiado = 0,
            premiados = 0,
            maxRebaixado = 2,
            rebaixados = 0,
            indiceAtual = 0,
            verificarPremiado = function(itemCorrente) {                
                if(premiados < maxPremiados) {
                    itemCorrente.tipo = "item-premiado";
                    premiados++;     
                    if(minPontoPremiado === 0) {
                        minPontoPremiado = itemCorrente.boleiro.pontos;
                    }
                    if(minPontoPremiado > itemCorrente.boleiro.pontos) {
                        minPontoPremiado = itemCorrente.boleiro.pontos;
                    }
                }
                else {
                    if(minPontoPremiado < itemCorrente.boleiro.pontos) {
                        angular.forEach($scope.itens, function(item, indice) {
                                if(item.boleiro.pontos === minPontoPremiado) {
                                    item.tipo = "";
                                }
                        });
                        minPontoPremiado = itemCorrente.boleiro.pontos;  
                        itemCorrente.tipo = "item-premiado";                
                    }
                    else {
                        if(minPontoPremiado === itemCorrente.boleiro.pontos) {
                            angular.forEach($scope.itens, function(item, indice) {
                                if(item.boleiro.pontos === minPontoPremiado) {
                                    if(itemCorrente.boleiro.placares > item.boleiro.placares) {
                                        item.tipo = "";
                                        itemCorrente.tipo = "item-premiado";
                                    }
                                    else if(itemCorrente.boleiro.placares === item.boleiro.placares) {
                                        itemCorrente.tipo = "item-premiado";
                                    }
                                }
                            });
                        }
                    }                    
                }           
            };            
            
            eu.adicionarItem = function(item) {
                item.tipo = 'premiado';
                verificarPremiado(item);
                //verificarRebaixado(item);
                $scope.itens.push(item);
            };            
            
            eu.abrir = function(indice) {
                if (indice === indiceAtual) {
                    if ($scope.itens[indiceAtual].visivel) {
                        $scope.itens[indice].ocultar();
                    } 
                    else {
                        $scope.itens[indice].exibir();
                    }
                } 
                else {
                    $scope.itens[indiceAtual].ocultar();
                    $scope.itens[indice].exibir();
                }
                indiceAtual = indice;
            };
        }
    };
})
.directive('item', ['BD', function(BD) {
        return {
            require: '^acordeon',
            restrict: 'E',
            transclude: 'true',
            replace: 'true',
            scope: {
                boleiro: '=',
                indice: '@'
            },
            link: function(scope, element, attrs, acordeonControle) {
                scope.direcao = 'esquerda';
                
                scope.exibir = function() {
                    scope.visivel = true;
                    scope.situacao = 'item-aberto';
                };
                
                scope.abrir = function(indice) {
                    var rodadas = scope.boleiro.rodadas;
                    if (typeof rodadas === 'object' && rodadas instanceof Array) {
                        if (!rodadas.length) {
                            scope.boleiro.rodadas.push(BD.pegarRodada(scope.boleiro.id, 1));
                        }                     
                    }
                    acordeonControle.abrir(indice);
                };
                
                scope.ocultar = function() {
                    scope.visivel = false;
                    scope.situacao = 'item-fechado';
                };
                scope.ocultar();
                acordeonControle.adicionarItem(scope);
            },
            templateUrl: 'components/acordeon/diretivas/diretiva-item.html'
        };
    }]);
