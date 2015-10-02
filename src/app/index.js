'use strict';
angular.module('bolao', ['bolao.carrossel', 'bolao.acordeon', 'ngTouch', 'googleOauth']);

angular.module('bolao')
.factory('BD', ['$http', '$templateCache', function($http, $templateCache) {
    
    var query_boleiros = {  "fields": [    "boleiro",    "visitante_gols",    "mandante_gols"  ],    "aggs": {    "boleiros": {      "terms": {        "field": "boleiro",        "size": 0,        "order": {          "pontos": "desc",          "placares" : "desc"        }      },      "aggs": {        "pontos": {          "sum": {            "script": "if(doc['gaba_manda'].value==''||doc['gaba_visit'].value==''||doc['mandante_gols'].value==''||doc['visitante_gols'].value==''){0}else if(doc['gaba_manda'].value==doc['mandante_gols'].value&&doc['gaba_visit'].value==doc['visitante_gols'].value){3}else if((doc['gaba_manda'].value==doc['gaba_visit'].value&&doc['mandante_gols'].value==doc['visitante_gols'].value)||(doc['gaba_manda'].value<doc['gaba_visit'].value&&doc['mandante_gols'].value<doc['visitante_gols'].value)||(doc['gaba_manda'].value>doc['gaba_visit'].value&&doc['mandante_gols'].value>doc['visitante_gols'].value)){1}else{0}"          }        },        "placares": {          "sum": {          	"script": "if(doc['gaba_manda'].value==''||doc['gaba_visit'].value==''||doc['mandante_gols'].value==''||doc['visitante_gols'].value==''){0}else if(doc['gaba_manda'].value==doc['mandante_gols'].value&&doc['gaba_visit'].value==doc['visitante_gols'].value){1}else if((doc['gaba_manda'].value==doc['gaba_visit'].value&&doc['mandante_gols'].value==doc['visitante_gols'].value)||(doc['gaba_manda'].value<doc['gaba_visit'].value&&doc['mandante_gols'].value<doc['visitante_gols'].value)||(doc['gaba_manda'].value>doc['gaba_visit'].value&&doc['mandante_gols'].value>doc['visitante_gols'].value)){0}else{0}"          }        }      }    }  },    "size": 0},
    query_rodada_pelo_id = {  "query": {    "bool": {        "must": [{ "term": { "rodada_id": 2 }},            { "term": { "boleiro": "reinaldo" }}        ]    }  }},
    query_rodadas_pelo_id = {  "query": {    "bool": {        "must":  { "term": { "rodada_id": 1 }},"must_not": { "term": { "boleiro": "gabarito" }}        }    }  },
    boleiros,
    gabarito, 
    apiUrl = 'bd.json', 
    
    removeGabarito = function(boleiro) {
        if (boleiro.nome === 'Gabarito') {
            gabarito = boleiro;
        } 
        else {
            return atualizarBoleiro(boleiro);
        }
    }
    , 
    atualizarBoleiro = function(boleiro) {
        //             var rodadas = [], 
        var rodada = null ;
        for (var numero = 0; numero < boleiro.rodadas.length; numero++) {
            rodada = boleiro.rodadas[numero];
            for (var j = 0; j < rodada.jogos.length; j++) {
                var jogoBoleiro = rodada.jogos[j];
                var jogoGabarito = gabarito.rodadas[numero].jogos[j];
                jogoBoleiro.pontos = calcularPontuacao(jogoBoleiro, jogoGabarito);
                
                if (jogoBoleiro.pontos === 3) {
                    rodada.placares++;
                }
                rodada.pontos += jogoBoleiro.pontos;
            
            }
            boleiro.pontos = boleiro.pontos + rodada.pontos;
            boleiro.placares = boleiro.placares + rodada.placares;
        }
        
        //             var rodadaConsideradas = boleiro.rodadas.filter(function(rodada) {
        //                 return rodada.pontos > 0;
        //             }).length;
        //             boleiro.mediaPontos = boleiro.pontos / rodadaConsideradas;
        //             boleiro.mediaPlacares = boleiro.placares / rodadaConsideradas;
        boleiro.totalRodadas = boleiro.rodadas.length;
        //             console.log(boleiro);
        return boleiro;
    }
    , 
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
    }
    , 
    removeRodadas = function(boleiro) {
        
        angular.extend(pegarBoleiroPor(boleiro.id), boleiro);
        boleiro.rodadas = [];
        return boleiro;
    }
    , 
    pegarBoleiroPor = function(id) {
        var boleiro = boleiros.filter(function(b) {
            if (b.id === id) {
                return b;
            }
        }
        );
        return boleiro[0];
    }
    , 
    pegarRodadaPor = function(id, rodadas) {
        for (var i = 0; i < rodadas.length; i++) {
            if (rodadas[i].id === id) {
                return rodadas[i];
            }
        }
    }
    ;
    
    return {
        pegarBoleirosES: function() {
            return $http({
                method: 'POST',
                url: 'https://fili-us-east-1.searchly.com/bolao/jogo/_search',
                headers: {
                    'Authorization': 'Basic c2l0ZTpjZGFhOTgyYjE4MWM0MTRiZTg3Yzk1ODdhOThkMjg5NA=='
                },
                data: query_boleiros,
                cache: $templateCache
            });
        },
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
                var b = JSON.parse(JSON.stringify(response.data));
                return b.filter(removeGabarito).map(removeRodadas);
            }
            );
        },
        
        pegarRodadaES: function(idBoleiro, idRodada) {
            query_rodada_pelo_id.query.bool.must[0].term.rodada_id = idRodada;
            query_rodada_pelo_id.query.bool.must[1].term.boleiro = idBoleiro;
//             query_rodada_pelo_id.query.
            return $http({
                method: 'POST',
                url: 'https://fili-us-east-1.searchly.com/bolao/jogo/_search',
                headers: {
                    'Authorization': 'Basic c2l0ZTpjZGFhOTgyYjE4MWM0MTRiZTg3Yzk1ODdhOThkMjg5NA=='
                },
                data: query_rodada_pelo_id,
                cache: $templateCache
            });
        },
        pegarRodadasES: function(idRodada) {
            query_rodadas_pelo_id.query.bool.must.term.rodada_id = idRodada;  
            return $http({
                method: 'POST',
                url: 'https://fili-us-east-1.searchly.com/bolao/jogo/_search',
                headers: {
                    'Authorization': 'Basic c2l0ZTpjZGFhOTgyYjE4MWM0MTRiZTg3Yzk1ODdhOThkMjg5NA=='
                },
                data: query_rodadas_pelo_id,
                cache: $templateCache
            });
        },
        atualizarEmLoteES: function(dados) {
            return $http({
                method: 'POST',
                url: 'https://fili-us-east-1.searchly.com/bolao/jogo/_bulk',
                headers: {
                    'Authorization': 'Basic c2l0ZTpjZGFhOTgyYjE4MWM0MTRiZTg3Yzk1ODdhOThkMjg5NA=='
                },
                data: dados,
                cache: $templateCache
            });
        },
        pegarRodada: function(idBoleiro, idRodada) {
            var bo = pegarBoleiroPor(idBoleiro);
            return pegarRodadaPor(idRodada, bo.rodadas);
        }
    };
}]);
