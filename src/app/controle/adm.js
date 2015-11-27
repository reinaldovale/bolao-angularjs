angular.module('bolao')
.controller('AdmCtrl', function($scope, $auth, $location, toastr, Conta, BD, SatellizerStorage) {
    var calcularRodada = function(rodada) {
//         angular.forEach(rodada.jogos, function(jogo) {
//             if(doc['gaba_manda'].empty||doc['gaba_visit'].empty||doc['mandante_gols'].empty||doc['visitante_gols'].empty){0}else if(doc['gaba_manda'].value==doc['mandante_gols'].value&&doc['gaba_visit'].value==doc['visitante_gols'].value){3}else if((doc['gaba_manda'].value==doc['gaba_visit'].value&&doc['mandante_gols'].value==doc['visitante_gols'].value)||(doc['gaba_manda'].value<doc['gaba_visit'].value&&doc['mandante_gols'].value<doc['visitante_gols'].value)||(doc['gaba_manda'].value>doc['gaba_visit'].value&&doc['mandante_gols'].value>doc['visitante_gols'].value)){1}else{0}
//             if(doc['gaba_manda'].empty||doc['gaba_visit'].empty||doc['mandante_gols'].empty||doc['visitante_gols'].empty){0}else if(doc['gaba_manda'].value==doc['mandante_gols'].value&&doc['gaba_visit'].value==doc['visitante_gols'].value){1}else if((doc['gaba_manda'].value==doc['gaba_visit'].value&&doc['mandante_gols'].value==doc['visitante_gols'].value)||(doc['gaba_manda'].value<doc['gaba_visit'].value&&doc['mandante_gols'].value<doc['visitante_gols'].value)||(doc['gaba_manda'].value>doc['gaba_visit'].value&&doc['mandante_gols'].value>doc['visitante_gols'].value)){0}else{0}
//         });
        rodada.pontos = 10;
        rodada.placares = 3;
        rodada.data = rodada.jogos[0]._source.rodadas_data;
        $scope.rodadaAtual = rodada;        
    }
    
    $scope.atualizarRodada = function(rodada_id) {
        if($scope.estaCarregando) {
            return;
        }
        $scope.estaCarregando = true;
        var buscaRemota = true;
        if ($scope.gabarito === undefined) {
            $scope.gabarito = {
                "boleiro": "gabarito"
            };
            $scope.gabarito.rodadas = [];
        }
        
        angular.forEach($scope.gabarito.rodadas, function(rodada, indice) {
            if (rodada.id === rodada_id) {
                rodada.rodadaAtiva = true;
                $scope.rodadaAtual = rodada;
                buscaRemota = false;
                $scope.estaCarregando = false;
            } 
            else {
                rodada.rodadaAtiva = false;
            }
        }
        );
        
        if (buscaRemota) {
            BD.pegarRodadaES('gabarito', rodada_id)
            .then(function(rodada) {
                rodada.rodadaAtiva = true;
                calcularRodada(rodada);
                $scope.gabarito.rodadas.push(rodada);

                $scope.estaCarregando = false;            
            }
            );
        }
    }
    ;
    
    $scope.atualizarRodada(1);
    
    
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
