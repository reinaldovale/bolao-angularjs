'use strict';

angular.module('bolao').
config(function(TokenProvider) {
    // Demo configuration for the "angular-oauth demo" project on Google.
    // Log in at will!
    
    // Sorry about this way of getting a relative URL, powers that be.
    //     var baseUrl = document.URL.replace('example/demo.html', '');
    var baseUrl = document.URL.replace('teste.html', '');
    
    TokenProvider.extendConfig({
        clientId: '1041203641186-p7ift3msto8too87sqtkbq3so9j6qcp0.apps.googleusercontent.com',
        redirectUri: baseUrl + 'oauth2callback.html',
        // allow lunching demo from a mirror
        scopes: ["https://www.googleapis.com/auth/userinfo.email"]
    });
}
).
controller('Oauth', function($rootScope, $scope, $window, $http, Token) {
    $scope.authenticate = function() {
        var extraParams = $scope.askApproval ? {approval_prompt: 'force'} : {};
        Token.getTokenByPopup(extraParams)
        .then(function(params) {
            // Success getting token from popup.
            
            // Verify the token before setting it, to avoid the confused 'deputy' problem.
            Token.verifyAsync(params.access_token).
            then(function(data) {
                $http.get('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + params.access_token)
                .success(function(user) {
                    //$rootScope.$apply(function() {
                    user.accessToken = params.access_token;
                    Token.set(JSON.stringify(user));
                    //});
                }
                );
            }
            , function() {
                alert("Failed to verify token.")
            }
            );
        
        }
        , function() {
            // Failure getting token from popup.
            alert("Failed to get token from popup.");
        }
        );
    }
    ;
}
)
.controller('ControlePrincipal', ['$timeout', '$scope', '$http', '$window', 'BD', 'Token', function($timeout, $scope, $http, $window, BD, Token) {
    
    //$scope.boleiros = [];
    $scope.gabarito = {};
    
    BD.pegarBoleirosES()
    .then(function(boleiros) {
        //         $scope.$apply(iniciar(boleiros));
        iniciar(boleiros);
    }
    );
    
    $scope.telaAdmin = function() {
        var user = Token.get();
        if (!user) {
            alert('logar primeiro!');
        } 
        else {
            user = JSON.parse(Token.get());
            if (user.name === 'Reinaldo Vale') {
                $window.location.href = 'teste.html';
            } 
            else {
                alert('Voce nao tem permissao!')
            }
        }
    }
    ;
    
    $scope.telaCadastro = function() {
        var user = Token.get()
          
        , 
        cadastrar = true;
        if (!user) {
            alert('logar primeiro!');
        } 
        else {
            user = JSON.parse(Token.get());
            
            for (var i = 0; i < $scope.boleiros.length; i++) {
                if ($scope.boleiros[i].boleiro === user.name) {
                    alert('Você já está cadastrado!');
                    cadastrar = false;
                    break;
                }
            }
            if (cadastrar) {
                $scope.boleiros = BD.cadastrarBoleiroES(user)
                .then(function(boleiros) {
                    $timeout(function() {
                        iniciar(boleiros);
                        $scope.$digest();
                    
                    }
                    );
                }
                );
            }
        }
    }
    ;
    
    function iniciar(boleiros) {
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
        }
        );
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
            var vistGols = jogo._source.visitante_gols === null ? "\"\"" : jogo._source.visitante_gols,
                mandGols = jogo._source.mandante_gols === null ? "\"\"" : jogo._source.mandante_gols;
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
])
.controller('ControleAtualizacao', ['$scope', 'BD', function($scope, BD) {
    
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
                var gabVistGols = jogoGabarito._source.visitante_gols === null ? "\"\"" : jogoGabarito._source.visitante_gols,
                gabMandGols = jogoGabarito._source.mandante_gols === null ? "\"\"" : jogoGabarito._source.mandante_gols;

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
]);
