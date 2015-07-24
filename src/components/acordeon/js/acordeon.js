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
            TOTAL_PREMIADOS = 2,
            minPontoPremiado = 0,
            minPontoRebaixado = 0,
            minPlacarRebaixado = 0,
            premiados = 0,
            TOTAL_REBAIXADOS = 2,
            rebaixados = 0,
            indiceAtual = 0,
            
            verificarPremiado = function(itemCorrente) {                
                if(premiados < TOTAL_PREMIADOS && (minPontoPremiado === 0 || minPontoPremiado >= itemCorrente.boleiro.pontos)) {
                        itemCorrente.tipo = 'item-premiado';
                        premiados++;
                        minPontoPremiado = itemCorrente.boleiro.pontos;
                }
                else {
                    if(minPontoPremiado < itemCorrente.boleiro.pontos) {
                        angular.forEach($scope.itens, function(item) {
                                if(item.boleiro.pontos === minPontoPremiado) {
                                    item.tipo = '';
                                }
                        });
                        minPontoPremiado = itemCorrente.boleiro.pontos;  
                        itemCorrente.tipo = 'item-premiado';                
                    }
                    else {
                        if(minPontoPremiado === itemCorrente.boleiro.pontos) {
                            angular.forEach($scope.itens, function(item) {
                                if(item.boleiro.pontos === minPontoPremiado) {
                                    if(itemCorrente.boleiro.placares > item.boleiro.placares) {
                                        item.tipo = '';
                                        itemCorrente.tipo = 'item-premiado';
                                    }
                                    else if(itemCorrente.boleiro.placares === item.boleiro.placares) {
                                        itemCorrente.tipo = 'item-premiado';
                                    }
                                }
                            });
                        }
                        else {
                            itemCorrente.tipo = '';
                            verificarRebaixado(itemCorrente);
                        }
                    }                    
                }           
            },    

            verificarRebaixado = function(itemCorrente) {
console.log('Entrada: \tPT = \t' + itemCorrente.boleiro.pontos + '\tPL = \t' + itemCorrente.boleiro.placares + '\tTipo = ' + itemCorrente.tipo + '\nminPT = ' + minPontoRebaixado +  '\tminPL = ' + minPlacarRebaixado + '\tRebaixados = ' + rebaixados);                                        
                if(rebaixados < TOTAL_REBAIXADOS) {
//console.log('PT = \t' + itemCorrente.boleiro.pontos + '\tPL = \t' + itemCorrente.boleiro.placares + '\tTipo = ' + itemCorrente.tipo + '\nminPT = ' + minPontoRebaixado +  '\tminPL = ' + minPlacarRebaixado + '\tRebaixados = ' + rebaixados);                        
                    itemCorrente.tipo = 'item-rebaixado';
                    rebaixados++;                   
                    if(minPontoRebaixado === 0) { 
                        minPontoRebaixado = itemCorrente.boleiro.pontos;
                        minPlacarRebaixado = itemCorrente.boleiro.placares;
                    }
                    else if(minPontoRebaixado < itemCorrente.boleiro.pontos) {
                                minPontoRebaixado = itemCorrente.boleiro.pontos;
                                minPlacarRebaixado = itemCorrente.boleiro.placares;
                        }
                    else if(minPontoRebaixado === itemCorrente.boleiro.pontos) {
                        if(minPlacarRebaixado < itemCorrente.boleiro.placares) {
                                minPlacarRebaixado = itemCorrente.boleiro.placares;
                        }
                        if(minPlacarRebaixado === itemCorrente.boleiro.placares) {
                                rebaixados--;
                        }                                               
                    }
                }
                 else if(minPontoRebaixado >= itemCorrente.boleiro.pontos) {  
//console.log('PT = \t' + itemCorrente.boleiro.pontos + '\tPL = \t' + itemCorrente.boleiro.placares + '\tTipo = ' + itemCorrente.tipo + '\nminPT = ' + minPontoRebaixado +  '\tminPL = ' + minPlacarRebaixado + '\tRebaixados = ' + rebaixados);                    
                        var rebaixadoSaiu = false,
                            minPontoRebaixadoTemp = itemCorrente.boleiro.pontos,
                            minPlacarRebaixadoTemp = itemCorrente.boleiro.placares;
                            
                        angular.forEach($scope.itens, function(item) {
                                if(item.tipo ==='item-rebaixado') {
                                        if(item.boleiro.pontos === minPontoRebaixado) {
                                                if(item.boleiro.pontos > itemCorrente.boleiro.pontos || (item.boleiro.pontos === itemCorrente.boleiro.pontos && item.boleiro.placares > itemCorrente.boleiro.placares) ) {
                                                        item.tipo = '';
                                                        rebaixadoSaiu = true;
                                                        itemCorrente.tipo = 'item-rebaixado';
                                                }                                                                                                     
                                        }
                                        if(item.tipo ==='item-rebaixado') {
                                                                                                
                                                if(item.boleiro.pontos > minPontoRebaixadoTemp || (item.boleiro.pontos === minPontoRebaixadoTemp && item.boleiro.placares > minPlacarRebaixadoTemp)) {
                                                        minPontoRebaixadoTemp = item.boleiro.pontos;
                                                        minPlacarRebaixadoTemp = item.boleiro.placares;
                                                }
                                        }
                                }
                        });
                        if(rebaixadoSaiu) {
                                rebaixados--;
                        }
                        minPontoRebaixado = minPontoRebaixadoTemp;
                        minPlacarRebaixado = minPlacarRebaixadoTemp;            
                }
console.log('Saída: \tPT = \t' + itemCorrente.boleiro.pontos + '\tPL = \t' + itemCorrente.boleiro.placares + '\tTipo = ' + itemCorrente.tipo + '\nminPT = ' + minPontoRebaixado +  '\tminPL = ' + minPlacarRebaixado + '\tRebaixados = ' + rebaixados);                                      
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
