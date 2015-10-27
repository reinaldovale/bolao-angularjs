'use strict';
angular.module('bolao', ['bolao.carrossel', 'bolao.acordeon', 'ngTouch', 'googleOauth']);

angular.module('bolao')
.factory('BD', ['$http', '$templateCache', '$q', function($http, $templateCache, $q) {
    var defineHttpParametros = function(parametros) {
        return {
            method: parametros.method ? parametros.method : 'POST',
            url: parametros.url ? 'https://fili-us-east-1.searchly.com/bolao/jogo' + parametros.url : 'https://fili-us-east-1.searchly.com/bolao/jogo',
            data: parametros.dados ? parametros.dados : '',
            headers: {
                'Authorization': 'Basic c2l0ZTpjZGFhOTgyYjE4MWM0MTRiZTg3Yzk1ODdhOThkMjg5NA=='
            },
            cache: $templateCache
        };
    }, 
    query_boleiros = {
        "aggs": {
            "boleiros": {
                "terms": {
                    "field": "boleiro.raw",
                    "size": 0,
                    "order": {
                        "pontos": "desc",
                        "placares": "desc"
                    }
                },
                "aggs": {
                    "foto": {
                        "terms": {
                            "field": "foto.raw"
                        }
                    },
                    "pontos": {
                        "sum": {
                            "script": "if(doc['gaba_manda'].value==''||doc['gaba_visit'].value==''||doc['mandante_gols'].value==''||doc['visitante_gols'].value==''){0}else if(doc['gaba_manda'].value==doc['mandante_gols'].value&&doc['gaba_visit'].value==doc['visitante_gols'].value){3}else if((doc['gaba_manda'].value==doc['gaba_visit'].value&&doc['mandante_gols'].value==doc['visitante_gols'].value)||(doc['gaba_manda'].value<doc['gaba_visit'].value&&doc['mandante_gols'].value<doc['visitante_gols'].value)||(doc['gaba_manda'].value>doc['gaba_visit'].value&&doc['mandante_gols'].value>doc['visitante_gols'].value)){1}else{0}"
                        }
                    },
                    "placares": {
                        "sum": {
                            "script": "if(doc['gaba_manda'].value==''||doc['gaba_visit'].value==''||doc['mandante_gols'].value==''||doc['visitante_gols'].value==''){0}else if(doc['gaba_manda'].value==doc['mandante_gols'].value&&doc['gaba_visit'].value==doc['visitante_gols'].value){1}else if((doc['gaba_manda'].value==doc['gaba_visit'].value&&doc['mandante_gols'].value==doc['visitante_gols'].value)||(doc['gaba_manda'].value<doc['gaba_visit'].value&&doc['mandante_gols'].value<doc['visitante_gols'].value)||(doc['gaba_manda'].value>doc['gaba_visit'].value&&doc['mandante_gols'].value>doc['visitante_gols'].value)){0}else{0}"
                        }
                    }
                }
            }
        },
        "size": 0
    }, 
    query_rodada_pelo_id = {
        "query": {
            "bool": {
                "must": [{
                    "term": {
                        "rodada_id": 1
                    }
                }, {
                    "term": {
                        "boleiro.raw": "modelo"
                    }
                }]
            }
        }
    }, 
    query_rodadas_pelo_id = {
        "query": {
            "bool": {
                "must": {
                    "term": {
                        "rodada_id": 1
                    }
                },
                "must_not": {
                    "term": {
                        "boleiro": "gabarito"
                    }
                }
            }
        }
    };
    
    return {
        cadastrarBoleiroES: function(user) {
            var deferred = $q.defer(),
            rodadaPadrao = {id: 1, jogos: []};
            
            this.pegarRodadaES('modelo', rodadaPadrao.id).then(
            function(response) {
                rodadaPadrao.jogos = response.data.hits.hits;
                var rodadas = [];
                rodadas.push(rodadaPadrao);

                var jogoPadrao = response.data.hits.hits[0]._source;
                jogoPadrao.boleiro = user.name;
                jogoPadrao.foto = user.picture;
                
                $http(defineHttpParametros({dados:jogoPadrao})).then(function(response) {
                    deferred.resolve(jogoPadrao);
                }
                );
            }
            );
            return deferred.promise;
        },
        pegarBoleirosES: function() {
            var deferred = $q.defer(); 
            $http(defineHttpParametros({dados:query_boleiros, url:'/_search'})).then(function(response) {
                var boleiros = [];
                var array = response.data.aggregations.boleiros.buckets;
                boleiros = array.map(function(boleiroES) {
                    var foto = (boleiroES.foto.buckets.length > 0) ? boleiroES.foto.buckets[0].key : '';
                    return {
                        "boleiro": boleiroES.key,
                        "foto": foto,
                        "pontos": boleiroES.pontos.value,
                        "placares": boleiroES.placares.value
                    };
                }
                );
                deferred.resolve(boleiros);
            }
            );
            return deferred.promise;
        },        
        pegarRodadaES: function(idBoleiro, idRodada) {
            query_rodada_pelo_id.query.bool.must[0].term.rodada_id = idRodada;
            query_rodada_pelo_id.query.bool.must[1].term['boleiro.raw'] = idBoleiro;            
            return $http(defineHttpParametros({dados:query_rodada_pelo_id, url:'/_search'}));            
        },
        pegarJogosES: function(idBoleiro, idRodada) {
            query_rodada_pelo_id.query.bool.must[0].term.rodada_id = idRodada;
            query_rodada_pelo_id.query.bool.must[1].term['boleiro.raw'] = idBoleiro;            
            return $http(defineHttpParametros({dados:query_rodada_pelo_id, url:'/_search'}));            
        },
        pegarRodadasES: function(idRodada) {
            query_rodadas_pelo_id.query.bool.must.term.rodada_id = idRodada;
            return $http(defineHttpParametros({dados:query_rodadas_pelo_id, url:'/_search'}));             
        },
        atualizarEmLoteES: function(dados) {
            return $http(defineHttpParametros({dados:dados, url:'/_bulk'}));            
        }
    };
}])
.directive('menu', function() {
    return {
        restrict: 'E',
        transclude: 'true',
        replace: 'false',
        templateUrl: 'components/acordeon/diretivas/diretiva-menu.html',
        scope: 'true',
        controller: function($scope) {
            $scope.menuActive = '';
            $scope.abrir = function() {                               
                $scope.menuActive = $scope.menuActive === '' ? 'menu-active' : '';
            };
        }
    }
});
