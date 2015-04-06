'use strict';

angular.module('bolao', ['bolao.carrossel', 'bolao.acordeon']);

angular.module('bolao')
.factory('BD', ['$http', '$templateCache', function($http, $templateCache) {
        
        var contador = 0, 
        boleiros, 
        apiUrl = 'bd.json', 
        id, 
        boleirosSemRodadas = function(boleiro) {
            boleiro.rodadas = [];
            return boleiro;
        }, 
        pegarBoleiroPor = function(id, boleiros) {
            for (var i = 0; i < boleiros.length; i++) {
                if (boleiros[i].id === id) {
                    return boleiros[i];
                }
            }
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
                    var b = [];
                    angular.copy(boleiros, b);
                    return b.map(boleirosSemRodadas);
                });
            },
            
            pegarRodada: function(idBoleiro, idRodada) {
                var bo = pegarBoleiroPor(idBoleiro, boleiros);
                return pegarRodadaPor(idRodada, bo.rodadas);
            }
        };
    }]);
