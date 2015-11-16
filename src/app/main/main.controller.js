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
    
//     $rootScope.$on('novoUsuario', function(ev, boleiros) {
//         $timeout(function() {            
//             $scope.boleiros = [];            
//             $scope.$digest();
//             iniciar(boleiros);        
//         }
//         );
//     }
//     );
    
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
);

