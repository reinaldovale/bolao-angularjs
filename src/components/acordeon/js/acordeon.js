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
            prm = [], 
            TOTAL_PREMIADOS = 2, 
            premiados = 0, 
            reb = [], 
            TOTAL_REBAIXADOS = 2, 
            rebaixados = 0, 
            indiceAtual = 0, 
            verificarRebaixado = function(itemCorrente) {
                if (rebaixados < TOTAL_REBAIXADOS) {
                    for (var i = 0; i < reb.length; i++) {
                        if (reb[i].boleiro.pontos === itemCorrente.boleiro.pontos && reb[i].boleiro.placares === itemCorrente.boleiro.placares) {
                            rebaixados--;
                            break;
                        }
                    }
                    itemCorrente.tipo = 'item-rebaixado';
                    rebaixados++;
                    reb.push(itemCorrente);
                } 
                else {
                    var iguais = false;
                    for (var i = 0; i < reb.length; i++) {
                        if (reb[i].boleiro.pontos === itemCorrente.boleiro.pontos && reb[i].boleiro.placares === itemCorrente.boleiro.placares) {
                            iguais = true;
                            break;
                        }
                    }
                    
                    if (iguais) {
                        
                        itemCorrente.tipo = 'item-rebaixado';
                        reb.push(itemCorrente);
                    } 
                    else {                        
                        var maiores = reb.filter(function(item) {
                            return (item.boleiro.pontos > itemCorrente.boleiro.pontos) || (item.boleiro.pontos === itemCorrente.boleiro.pontos && item.boleiro.placares > itemCorrente.boleiro.placares);
                        });
                        if (maiores.length > 0) {
                            var mPT = maiores[0].boleiro.pontos, 
                            mPL = maiores[0].boleiro.placares;
                            for (var i = 1; i < maiores.length; i++) {
                                if (maiores[i].boleiro.pontos > mPT || (maiores[i].boleiro.pontos === mPT && maiores[i].boleiro.placares > mPL)) {
                                    mPT = maiores[i].boleiro.pontos;
                                    mPL = maiores[i].boleiro.placares;
                                }
                            }
                            
                            reb = reb.filter(function(item) {
                                var rt = true;
                                if (item.boleiro.pontos === mPT && item.boleiro.placares === mPL) {
                                    item.tipo = '';
                                    rt = false;
                                }
                                return rt;
                            });
                            itemCorrente.tipo = 'item-rebaixado';
                            reb.push(itemCorrente);
                        }
                    }
                }
            }, 
            
            verificarPremiado = function(itemCorrente) {
                if (premiados < TOTAL_PREMIADOS) {
                    for (var i = 0; i < prm.length; i++) {
                        if (prm[i].boleiro.pontos === itemCorrente.boleiro.pontos && prm[i].boleiro.placares === itemCorrente.boleiro.placares) {
                            premiados--;
                            break;
                        }
                    }
                    itemCorrente.tipo = 'item-premiado';
                    premiados++;
                    prm.push(itemCorrente);
                } 
                else {
                    var iguais = false;
                    for (var i = 0; i < prm.length; i++) {
                        if (prm[i].boleiro.pontos === itemCorrente.boleiro.pontos && prm[i].boleiro.placares === itemCorrente.boleiro.placares) {
                            iguais = true;
                            break;
                        }
                    }
                    
                    if (iguais) {
                        itemCorrente.tipo = 'item-premiado';
                        prm.push(itemCorrente);
                    } 
                    else {
                        var menores = prm.filter(function(item) {
                            return (item.boleiro.pontos < itemCorrente.boleiro.pontos) || (item.boleiro.pontos === itemCorrente.boleiro.pontos && item.boleiro.placares < itemCorrente.boleiro.placares);
                        });
                        if (menores.length > 0) {
                            var mPT = menores[0].boleiro.pontos, 
                            mPL = menores[0].boleiro.placares;
                            for (var i = 1; i < menores.length; i++) {
                                if (menores[i].boleiro.pontos < mPT || (menores[i].boleiro.pontos === mPT && menores[i].boleiro.placares < mPL)) {
                                    mPT = menores[i].boleiro.pontos;
                                    mPL = menores[i].boleiro.placares;
                                }
                            }
                            
                            prm = prm.filter(function(item) {
                                var rt = true;
                                if (item.boleiro.pontos === mPT && item.boleiro.placares === mPL) {
                                    item.tipo = '';
                                    verificarRebaixado(item);
                                    rt = false;
                                }
                                return rt;
                            });
                            itemCorrente.tipo = 'item-premiado';
                            prm.push(itemCorrente);
                        } 
                        else {
                            verificarRebaixado(itemCorrente);
                        }
                    }
                
                }
            };
            
            eu.adicionarItem = function(item) {
                verificarPremiado(item);
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
