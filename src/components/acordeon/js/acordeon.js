'use strict';
angular.module('bolao.acordeon', [])
.directive('acordeon', function($timeout, $rootScope) {
    return {
        restrict: 'E',
        transclude: 'true',
        replace: 'false',
        templateUrl: 'components/acordeon/diretivas/diretiva-acordeon.html',
        scope: 'true',
        controller: function($scope) {
            
//             itens = [];
//             $scope.$watch('boleiros', function(locations) {
//                   itens = [];
//             });
            
//             $rootScope.$on('novoUsuario', function(ev, boleiros) {
//                  itens = [];
//             }
//             );

//             verificarRebaixado();
                

            var eu = this,
            itens = [],
            prm = []
              
            
            
            , 
            TOTAL_PREMIADOS = 2
              
            
            
            , 
            premiados = 0
              
            
            
            , 
            reb = []
              
            
            
            , 
            TOTAL_REBAIXADOS = 2
              
            
            
            , 
            rebaixados = 0
              
            
            
            , 
            indiceAtual = 0
              
            
            
            , 
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
                        }
                        );
                        if (maiores.length > 0) {
                            var mPT = maiores[0].boleiro.pontos
                              
                            
                            
                            , 
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
                            }
                            );
                            itemCorrente.tipo = 'item-rebaixado';
                            reb.push(itemCorrente);
                        }
                    }
                }
            }
              
            
            
            , 
            
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
                        }
                        );
                        if (menores.length > 0) {
                            var mPT = menores[0].boleiro.pontos
                              
                            
                            
                            , 
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
                            }
                            );
                            itemCorrente.tipo = 'item-premiado';
                            prm.push(itemCorrente);
                        } 
                        else {
                            verificarRebaixado(itemCorrente);
                        }
                    }
                
                }
            }
            ;
            
            eu.adicionarItem = function(item) {
                verificarPremiado(item);
                itens.push(item);
            }
            ;
            
            eu.abrir = function(indice) {
                if (indice === indiceAtual) {
                    if (itens[indiceAtual].visivel) {
                        itens[indice].ocultar();
                    } 
                    else {
                        itens[indice].exibir();
                    }
                } 
                else {
                    itens[indiceAtual].ocultar();
                    itens[indice].exibir();
                }
                indiceAtual = indice;
            }
            ;
        
        }
    };
}
)
.directive('item', function(BD, $window, $timeout) {
    return {
        require: '^acordeon',
        restrict: 'E',
        transclude: 'true',
        replace: 'false',
        scope: {
            boleiro: '=',
            indice: '@'
        },
        link: function(scope, element, attrs, acordeonControle) {
            scope.direcao = 'esquerda';
            
            scope.exibir = function() {
                scope.visivel = true;
                scope.situacao = 'item-aberto';
                $timeout(function() {
                    element[0].scrollIntoView();        
                }, 500);
                
            }
            ;
            
            scope.abrir = function(indice) {                
                var rodada_id = 1;
                scope.boleiro.rodadas = scope.boleiro.rodadas || [];
                var rodada = scope.boleiro.rodadas
                .filter(function(rodada) {
                    return rodada.id === rodada_id;
                }
                )[0];
                
                if (!rodada) {
                    BD.pegarRodadaES(scope.boleiro.boleiro, rodada_id)
                    .then(function(response) {
                        scope.boleiro.rodadas.push(response);
                    }
                    , function errorCallback(response) {
                        console.log(response);
                    }
                    );
                }
                acordeonControle.abrir(indice);
            }
            ;
            
            scope.ocultar = function() {
                scope.visivel = false;
                scope.situacao = 'item-fechado';
            }
            ;
            scope.ocultar();
            acordeonControle.adicionarItem(scope);
        },
        templateUrl: 'components/acordeon/diretivas/diretiva-item.html'
    };
}
);
