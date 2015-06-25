'use strict';
angular.module('bolao', ['bolao.carrossel', 'bolao.acordeon', 'ngTouch']);

angular.module('bolao')
.factory('BD', ['$http', '$templateCache', function($http, $templateCache) {
        
        var boleiros, 
        gabarito, 
        apiUrl = 'bd.json', 
        
        removeGabarito = function(boleiro) {
            if (boleiro.nome === 'Gabarito') {
                gabarito = boleiro;
            } 
            else {
                return atualizarBoleiros(boleiro);
            }
        }, 
        atualizarBoleiros = function(boleiro) {
            //             var rodadas = [], 
            var rodada = null;
            for (var numero = 0; numero < boleiro.rodadas.length; numero++) {
                rodada = boleiro.rodadas[numero];
                for (var j = 0; j < rodada.jogos.length; j++) {
                    var jogoBoleiro = rodada.jogos[j];
                    var jogoGabarito = gabarito.rodadas[numero].jogos[j];
                    jogoBoleiro.pontos = calcularPontuacao(jogoBoleiro, jogoGabarito);
                    
                    rodada.pontos += jogoBoleiro.pontos;
                    //console.log(boleiro.nome, 'Rodada', rodada.id, 'jogo', j, '\n B.mand: ', jogoBoleiro.mandante.gols, 'B.vis: ', jogoBoleiro.visitante.gols, 'G.mand: ', jogoGabarito.mandante.gols, 'G.vis: ', jogoGabarito.visitante.gols, 'pontos: ', calcularPontuacao(jogoBoleiro, jogoGabarito));
                }
            }
            boleiro.pontos = boleiro.rodadas.reduce(function(pontos, rodada) {
                return pontos + rodada.pontos;
            }, 0);
            
            for (var i = 0; i < boleiro.rodadas.length; i++) {
                var jogos = boleiro.rodadas[i].jogos.filter(function(jogo) {
                    if (jogo.pontos === 3) {
                        return jogo;
                    }
                });
                
                boleiro.placares += boleiro.rodadas[i].placares = jogos.length;
            }
            var rodadaConsideradas = boleiro.rodadas.filter(function(rodada) {
                return rodada.pontos > 0;
            }).length;
            boleiro.mediaPontos = boleiro.pontos / rodadaConsideradas;
            boleiro.mediaPlacares = boleiro.placares / rodadaConsideradas;
            boleiro.totalRodadas = boleiro.rodadas.length;
            //             console.log(boleiro);
            return boleiro;
        }, 
        calcularPontuacao = function(jogoBoleiro, jogoGabarito) {
            if (jogoGabarito.mandante.gols === '' || jogoGabarito.visitante.gols === '' || jogoBoleiro.mandante.gols === '' || jogoBoleiro.visitante.gols === '') {
                return 0;
            } 
            else if (jogoGabarito.mandante.gols === jogoBoleiro.mandante.gols && jogoGabarito.visitante.gols === jogoBoleiro.visitante.gols) {
                return 3;
            } 
            else if (
            (jogoGabarito.mandante.gols === jogoGabarito.visitante.gols && jogoBoleiro.mandante.gols === jogoBoleiro.visitante.gols) || 
            (jogoGabarito.mandante.gols < jogoGabarito.visitante.gols && jogoBoleiro.mandante.gols < jogoBoleiro.visitante.gols) || 
            (jogoGabarito.mandante.gols > jogoGabarito.visitante.gols && jogoBoleiro.mandante.gols > jogoBoleiro.visitante.gols)) {
                return 1;
            } 
            else {
                return 0;
            }
        }, 
        removeRodadas = function(boleiro) {
            
            angular.extend(pegarBoleiroPor(boleiro.id), boleiro);
            //                 var bo = pegarBoleiroPor(boleiro.id);
            //                 bo = boleiro;
            boleiro.rodadas = [];
            return boleiro;
        }, 
        pegarBoleiroPor = function(id) {
            var boleiro = boleiros.filter(function(b) {
                if (b.id === id) {
                    return b;
                }
            });
            return boleiro[0];
        //             for (var i = 0; i < boleiros.length; i++) {
        //                 if (boleiros[i].id === id) {
        //                     return boleiros[i];
        //                 }
        //             }            
        }, 
        pegarRodadaPor = function(id, rodadas) {
            for (var i = 0; i < rodadas.length; i++) {
                if (rodadas[i].id === id) {
                    return rodadas[i];
                }
            }
        };
        
        return {
            pegarBoleiros: function() {
                return $http({
                    method: 'GET',
                    url: apiUrl,
                    cache: $templateCache,
                    headers: {
                        'X-Api-Secret': 'xxx',
                        'Authorization': 'xxx',
                        'Content-Type': 'undefined'
                    }
                })
                .then(function(response) {
                    boleiros = response.data;
                    //var b = boleiros;
                    //var b = [];
                    //angular.copy(boleiros, b);
                    var b = JSON.parse(JSON.stringify(response.data));
                    return b.filter(removeGabarito).map(removeRodadas);
                });
            },
            
            pegarRodada: function(idBoleiro, idRodada) {
                var bo = pegarBoleiroPor(idBoleiro);
                return pegarRodadaPor(idRodada, bo.rodadas);
            }
        };
    }]);

// angular.module('bolao')
// .filter('destacar', function() {  
//    return function(input, param1) {
//            console.log('\n\n\n\--------------------------------------------------------');
//             for (var i = 0; i < input.length; i++) {
//                 console.log(input[i].nome + " -> " + input[i][param1]);
//             } 
//       return input;  
//    };  
//  });  