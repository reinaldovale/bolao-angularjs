'use strict';
angular.module('bolao', ['bolao.carrossel', 'bolao.acordeon', 'ngTouch', 'googleOauth']);

angular.module('bolao')
.factory('BD', ['$http', '$templateCache', '$q', function($http, $templateCache, $q) {
    var defineHttpParametros = function(parametros) {
        return {
            method: parametros.method ? parametros.method : 'POST',
            url: parametros.url ? 'https://fili-us-east-1.searchly.com/bolao' + parametros.url : 'https://fili-us-east-1.searchly.com/bolao/jogo',
            data: parametros.dados ? parametros.dados : '',
            headers: {
                'Authorization': 'Basic c2l0ZTpjZGFhOTgyYjE4MWM0MTRiZTg3Yzk1ODdhOThkMjg5NA=='
            },
            cache: $templateCache
        };
    }
      
    
    , 
    /*
      Input = {    "MANDANTE":"Palmeiras",    "Placar":"",    "FIELD3":"x",    "FIELD4":"",    "VISITANTE":"Atlético-MG",    "RODADA":"1a rodada",    "DATA":"09/05/2015",    "DIA":"Sáb",    "HORA":"18:30:00",    "Pontos":0  }
      
      Output = { "index" : { "_index" : "bolao", "_type" : "jogo"} }
              {"boleiro": "modelo", "rodada_id": "1", "rodadas_data": "2015-06-09T21:30:00.000Z","mandante": "Palmeiras","mandante_gols": "", "visitante": "Atlético-MG", "visitante_gols": "", "gaba_visit": "", "gaba_manda": ""}
    */
    tabelaControleParaModeloES = function(modeloJson) {
        var dados = '';
        for (i = 0; i < modelo.length; i++) {
            var data = modelo[i].DATA.match(/\d{2}/g).concat((modelo[i].HORA.match(/\d{2}/g) || ["00", "00", "00"]))
              
            
            , 
            dataFinal = new Date(data[2] + data[3] + '-' + data[1] + '-' + data[0] + ' ' + data[4] + ':' + data[5] + ':' + data[6]).toJSON();
            dados += '{ "index" : { "_index" : "bolao", "_type" : "jogo"} }\n{"boleiro": "modelo", "rodada_id": "' + modelo[i].RODADA.match(/\d/g).join("") + '", "rodadas_data": "' + dataFinal + '","mandante": "' + modelo[i].MANDANTE + '","mandante_gols": "", "visitante": "' + modelo[i].VISITANTE + '", "visitante_gols": "", "gaba_visit": "", "gaba_manda": ""}\n';
        }
    }
      
    
    , 
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
                            "script": "if(doc['gaba_manda'].empty||doc['gaba_visit'].empty||doc['mandante_gols'].empty||doc['visitante_gols'].empty){0}else if(doc['gaba_manda'].value==doc['mandante_gols'].value&&doc['gaba_visit'].value==doc['visitante_gols'].value){3}else if((doc['gaba_manda'].value==doc['gaba_visit'].value&&doc['mandante_gols'].value==doc['visitante_gols'].value)||(doc['gaba_manda'].value<doc['gaba_visit'].value&&doc['mandante_gols'].value<doc['visitante_gols'].value)||(doc['gaba_manda'].value>doc['gaba_visit'].value&&doc['mandante_gols'].value>doc['visitante_gols'].value)){1}else{0}"
                        }
                    },
                    "placares": {
                        "sum": {
                            "script": "if(doc['gaba_manda'].empty||doc['gaba_visit'].empty||doc['mandante_gols'].empty||doc['visitante_gols'].empty){0}else if(doc['gaba_manda'].value==doc['mandante_gols'].value&&doc['gaba_visit'].value==doc['visitante_gols'].value){1}else if((doc['gaba_manda'].value==doc['gaba_visit'].value&&doc['mandante_gols'].value==doc['visitante_gols'].value)||(doc['gaba_manda'].value<doc['gaba_visit'].value&&doc['mandante_gols'].value<doc['visitante_gols'].value)||(doc['gaba_manda'].value>doc['gaba_visit'].value&&doc['mandante_gols'].value>doc['visitante_gols'].value)){0}else{0}"
                        }
                    }
                }
            }
        },
        "size": 0
    }
      
    , 
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
    }
      
    
    , 
    query_rodadas_pelo_id = {
        "query": {
            "bool": {
                "must": {
                    "term": {
                        "rodada_id": 1
                    }
                },
                "must_not": [{
                    "term": {
                        "boleiro.raw": "gabarito"
                    }
                }, {
                    "term": {
                        "boleiro.raw": "modelo"
                    }
                }]
            }
        }
    };
    
    return {
        cadastrarRodadaES: function(boleiro, rodada_id) {
            var self = this, 
            deferred = $q.defer();
            
            self.pegarRodadaES('modelo', rodada_id)
            .then(
            function(response) {
                var jogos = response.jogos;
                
                var dados = '';
                for (var i = 0; i < jogos.length; i++) {
                    var jogo = jogos[i]._source;
                    jogo.boleiro = boleiro.boleiro;
                    jogo.foto = boleiro.foto;
                    dados += '{ "index" : { "_index" : "bolao", "_type" : "jogo"} }\n{"boleiro": "' + jogo.boleiro + '", "foto": "' + jogo.foto + '", "rodada_id": "' + jogo.rodada_id + '", "rodadas_data": "' + jogo.rodadas_data + '","mandante": "' + jogo.mandante + '","mandante_gols": "", "visitante": "' + jogo.visitante + '", "visitante_gols": "", "gaba_visit": "", "gaba_manda": ""}\n';
                }
                $http(defineHttpParametros({
                    dados: dados,
                    url: '/_bulk'
                }))
                .then(
                function(response) {
                    $http(defineHttpParametros({
                        url: '/_flush'
                    }))
                    .then(
                    function(response) {
                        self.pegarRodadaES(boleiro.boleiro, rodada_id)
                        .then(
                        function(response) {
                            deferred.resolve(response);
                        },
                        function errorCallback(response) {
                            deferred.reject("Servidor falhou ao buscar rodada de ID = " + rodada_id);
                        })
                    },
                    function errorCallback(response) {
                    deferred.reject("Servidor falhou ao fazer o _flush!");
                    })
                },
                function errorCallback(response) {
                    deferred.reject("Servidor falhou ao cadastrar rodada!");
                });
            }, 
            function errorCallback(response) {
                deferred.reject("Servidor falhou ao buscar modelo!");
            }
            );
            return deferred.promise;
        },
        cadastrarBoleiroES: function(user) {
            var self = this;
            var deferred = $q.defer()
              
            
            , 
            rodadaPadrao = {
                id: 1,
                jogos: []
            };
            
            self.pegarRodadaES('modelo', rodadaPadrao.id)
            .then(function(response) {
                var jogos = response.jogos;
                
                var dados = '';
                for (var i = 0; i < jogos.length; i++) {
                    var jogo = jogos[i]._source;
                    jogo.boleiro = user.name;
                    jogo.foto = user.picture;
                    dados += '{ "index" : { "_index" : "bolao", "_type" : "jogo"} }\n{"boleiro": "' + jogo.boleiro + '", "foto": "' + jogo.foto + '", "rodada_id": "' + jogo.rodada_id + '", "rodadas_data": "' + jogo.rodadas_data + '","mandante": "' + jogo.mandante + '","mandante_gols": "", "visitante": "' + jogo.visitante + '", "visitante_gols": "", "gaba_visit": "", "gaba_manda": ""}\n';
                    //rodadaPadrao.jogos.push(jogo);
                }
                $http(defineHttpParametros({
                    dados: dados,
                    url: '/_bulk'
                }))
                .then(function(response) {
                    $http(defineHttpParametros({
                        url: '/_flush'
                    }))
                    .then(function(response) {
                        self.pegarBoleirosES()
                        .then(function(response) {
                            deferred.resolve(response);
                        }
                        );
                    }
                    );
                }
                );
            }
            );
            return deferred.promise;
        },
        pegarBoleirosES: function() {
            var deferred = $q.defer();
            $http(defineHttpParametros({
                dados: query_boleiros,
                url: '/jogo/_search'
            }))
            .then(function(response) {
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
            var deferred = $q.defer()
              , 
            self = this;
            query_rodada_pelo_id.query.bool.must[0].term.rodada_id = idRodada;
            query_rodada_pelo_id.query.bool.must[1].term['boleiro.raw'] = idBoleiro;
            $http(defineHttpParametros({
                dados: query_rodada_pelo_id,
                url: '/jogo/_search'
            }))
            .then(
            function(response) {
                if (response.data.hits.hits.length < 10) {
                    deferred.reject("Servidor não devolveu os jogos, tente novamente");
                
                } 
                else {
                    deferred.resolve({
                        "id": idRodada,
                        "jogos": response.data.hits.hits
                    });
                }
            }
            , 
            function errorCallback(response) {
                deferred.reject("Servidor falhou, tente novamente. Detalhes: " + response);
            }
            );
            return deferred.promise;
        },
        pegarRodadasES: function(idRodada) {
            var deferred = $q.defer();
            query_rodadas_pelo_id.query.bool.must.term.rodada_id = idRodada;
            $http(defineHttpParametros({
                dados: query_rodadas_pelo_id,
                url: '/jogo/_search'
            }))
            .then(function(response) {
                if (response.data.hits.total > 10) {
                    var jogos = response.data.hits.hits
                      , 
                    total = response.data.hits.total
                      , 
                    passo = 10
                      , 
                    promises = [];
                    
                    for (var i = passo; i < total; i += passo) {
                        promises
                        .push($http(defineHttpParametros({
                            dados: query_rodadas_pelo_id,
                            url: '/jogo/_search?from=' + i
                        })));
                    }
                    $q.all(promises)
                    .then(function(responses) {
                        angular.forEach(responses, function(response) {
                            jogos = jogos.concat(response.data.hits.hits);
                        }
                        );
                        deferred.resolve(jogos);
                    }
                    );
                } 
                else {
                    deferred.resolve(response.data.hits.hits);
                }
            }
            );
            return deferred.promise;
        },
        atualizarEmLoteES: function(dados) {
            return $http(defineHttpParametros({
                dados: dados,
                url: '/jogo/_bulk'
            }));
        }
    };
}
])
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
            }
            ;
        }
    }
}
)
.directive('stopEvent', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            element.on(attr.stopEvent, function(e) {
                e.stopPropagation();
            }
            );
        }
    };
}
)
.directive('palpite', function() {
    return {
        restrict: 'E',
        transclude: 'true',
        replace: 'false',
        templateUrl: 'components/acordeon/diretivas/diretiva-palpite.html',
        scope: {
            jogoData: '@',
            gols: '='
        },
        link: function(scope) {
            var dataJogo = new Date(Date.parse(scope.jogoData));
            //TODO: data corrente deverá vim de fonte segura.
            var t = dataJogo.getTime() <= new Date().getTime();
            if (dataJogo.getTime() <= new Date().getTime()) {
                scope.somenteLeitura = true;
            } 
            else {
                scope.somenteLeitura = false;
            }
        }
    }
}
);
