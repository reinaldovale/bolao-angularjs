'use strict';

angular.module('bolao')
.controller('ControlePrincipal', function($auth, $timeout, $rootScope, $scope, $http, $window, BD, toastr, Conta) {
    $scope.gabarito = {};
    
    BD.pegarBoleiros()
    .then(function(boleiros) {
        iniciar(boleiros);
    }
    , 
    function errorCallback(erro) {
        toastr.error(erro);
    }
    );
    
    $rootScope.$on('novoUsuario', function(ev, boleiros) {
        $timeout(function() {            
            $scope.boleiros = [];            
            $scope.$digest();
            iniciar(boleiros);        
        }
        );
    }
    );
    
    $scope.telaAdmin = function() {
        var user = $auth.getToken();
        if (!user) {
            alert('logar primeiro!');
        } 
        else {
            user = JSON.parse($auth.getToken());
            if (user.name === 'Reinaldo Vale') {
                $window.location.href = 'teste.html';
            } 
            else {
                alert('Voce nao tem permissao!')
            }
        }
    }
    ;
    function iniciar(boleiros) {       
        if(!$scope.boleiros) {
            $scope.boleiros = [];
        }
        while ($scope.boleiros.length > 0) {
            a.pop();
        }
        $scope.boleiros = boleiros
        .filter(function(boleiro) {
            var retorno = true;
            if (boleiro.boleiro === 'gabarito' || boleiro.boleiro === 'modelo') {
                retorno = false;
                if (boleiro.boleiro === 'gabarito') {
                    $scope.gabarito = boleiro;
                }
            }
            return retorno;
        });

        var t = 0;
        
    }
    ;
    
    //     var rodadas = $scope.gabarito.rodadas;
    //     if (rodadas === undefined) {
    //         $scope.gabarito.rodadas = [];
    //     }
    
    //     var rodada = {
    //         id: 1,
    //         jogos: []
    //     };
    //     BD.pegarRodadaES($scope.gabarito.boleiro, rodada.id).then(function(response) {
    //         rodada.jogos = response.data.hits.hits;
    //         $scope.gabarito.rodadas.push(rodada);
    //     }
    //     );
    
    $scope.atualizar = function(boleiro, rodada_id) {
        var atualizacaoEmLote = '';
        boleiro.rodadas.filter(function(rodada) {
            return rodada.id === rodada_id;
        }
        )[0].jogos.forEach(function(jogo) {
            var vistGols = jogo._source.visitante_gols === null  ? "\"\"" : jogo._source.visitante_gols
              
            
            
            , 
            mandGols = jogo._source.mandante_gols === null  ? "\"\"" : jogo._source.mandante_gols;
            atualizacaoEmLote = atualizacaoEmLote + '{ "update": {"_id":"' + jogo._id + '"} }\n{ "doc" : {"visitante_gols" : ' + vistGols + ', "mandante_gols": ' + mandGols + '}, "detect_noop": true }\n';
        }
        );
        BD.atualizarEmLoteES(atualizacaoEmLote);
    }
    ;
    
    $scope.somenteLeitura = function(dataJogoStr) {
        var dataJogo = new Date(Date.parse(dataJogoStr));
        //TODO: data corrente deverá vim de fonte segura.
        var t = dataJogo.getTime() <= new Date().getTime();
        if (dataJogo.getTime() <= new Date().getTime()) {
            return true;
        } 
        else {
            return false;
        }
    }
    ;
    $scope.ehAtualizavel = function(rodada) {
        var dataJogoStr = rodada.jogos[0]._source.rodadas_data;
        return !$scope.somenteLeitura(dataJogoStr);
    }
    ;
}
)
.controller('ControleAtualizacao', function($scope, BD) {
    
    BD.pegarRodadaES('gabarito', 1)
    .then(function(response) {
        if ($scope.gabarito === undefined) {
            $scope.gabarito = {
                "boleiro": "gabarito"
            };
        }
        if ($scope.gabarito.rodadas === undefined) {
            $scope.gabarito.rodadas = [];
            $scope.gabarito.rodadas.push(response);
        }
    
    }
    );
    $scope.atualizar = function(rodada_id) {
        BD.pegarRodadasES(rodada_id).then(function(jogos) {
            var atualizacaoEmLote = '';
            var jogosParaAtualizar = jogos;
            var rodadaGabarito = $scope.gabarito.rodadas
            .filter(function(rodada) {
                return rodada.id === rodada_id;
            }
            )[0];
            angular.forEach(rodadaGabarito.jogos, function(jogoGabarito) {
                var gabVistGols = jogoGabarito._source.visitante_gols === null  ? "\"\"" : jogoGabarito._source.visitante_gols
                  
                
                
                , 
                gabMandGols = jogoGabarito._source.mandante_gols === null  ? "\"\"" : jogoGabarito._source.mandante_gols;
                
                atualizacaoEmLote = atualizacaoEmLote + '{ "update": {"_id":"' + jogoGabarito._id + '"} }\n{ "doc" : {"visitante_gols" : ' + gabVistGols + ', "mandante_gols": ' + gabMandGols + '}, "detect_noop": true }\n';
                angular.forEach(jogosParaAtualizar, function(jogoBoleiro) {
                    
                    if (jogoGabarito._source.mandante === jogoBoleiro._source.mandante) {
                        atualizacaoEmLote = atualizacaoEmLote + '{ "update": {"_id":"' + jogoBoleiro._id + '"} }\n{ "doc" : {"gaba_visit" : ' + gabVistGols + ', "gaba_manda": ' + gabMandGols + '}, "detect_noop": true }\n';
                    }
                }
                );
            }
            );
            BD.atualizarEmLoteES(atualizacaoEmLote);
        }
        );
    }
    ;
}
);
