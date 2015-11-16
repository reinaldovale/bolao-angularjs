angular.module('bolao')
.controller('AdmCtrl', function($scope, $auth, $location, toastr, Conta, BD, SatellizerStorage) {    
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