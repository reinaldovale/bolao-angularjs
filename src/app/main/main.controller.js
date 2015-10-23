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
        redirectUri: baseUrl + 'oauth2callback.html', // allow lunching demo from a mirror
        scopes: ["https://www.googleapis.com/auth/userinfo.email"]
    });
}).
controller('Oauth', function($rootScope, $scope, $window, $http, Token) {
    $scope.authenticate = function() {
            var extraParams = $scope.askApproval ? {approval_prompt: 'force'} : {};
            Token.getTokenByPopup(extraParams)
            .then(function(params) {
                // Success getting token from popup.

                // Verify the token before setting it, to avoid the confused deputy problem.
                Token.verifyAsync(params.access_token).
                then(function(data) {
                    $http.get('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + params.access_token)
                    .success(function(user) {
                        //$rootScope.$apply(function() {
                        user.accessToken = params.access_token;
                        Token.set(JSON.stringify(user));
                    //});
                    });
                }, function() {
                    alert("Failed to verify token.")
                });
            
            }, function() {
                // Failure getting token from popup.
                alert("Failed to get token from popup.");
            });
        };


})
.controller('ControlePrincipal', ['$scope', '$http', '$window', 'BD', 'Token', function($scope, $http, $window, BD, Token) {
                
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
        };
        
        $scope.boleiros = [];
        $scope.gabarito = {
            "key": "gabarito"
        };
        
        BD.pegarBoleirosES().then(function(response) {
            $scope.boleiros = response.data.aggregations.boleiros.buckets;
        }
        );
        
        
        var rodadas = $scope.gabarito.rodadas;
        if (rodadas === undefined) {
            $scope.gabarito.rodadas = rodadas = [];
        }
        
        var rodada = {
            id: 1,
            jogos: []
        };
        BD.pegarRodadaES($scope.gabarito.key, rodada.id).then(function(response) {
            rodada.jogos = response.data.hits.hits;
            $scope.gabarito.rodadas.push(rodada);
        }
        );
        
        $scope.atualizar = function(rodada_id) {
            console.log($scope.gabarito);
        }
    }
])

.controller('ControleAtualizacao', ['$scope', 'BD', function($scope, BD) {
        
        BD.pegarRodadaES('gabarito', 1).then(function(response) {
            var jogos = response.data.hits.hits;
            
            if ($scope.gabarito === undefined) {
                $scope.gabarito = {
                    "key": "gabarito"
                };
            }
            if ($scope.gabarito.rodadas === undefined) {
                $scope.gabarito.rodadas = [];
                var rodada = {
                    id: 1,
                    jogos: jogos
                };
                $scope.gabarito.rodadas.push(rodada);
            }
        
        }
        );
        $scope.atualizar = function(rodada_id) {
            BD.pegarRodadasES(rodada_id).then(function(response) {
                var atualizacaoEmLote = '';
                var jogosParaAtualizar = response.data.hits.hits;
                var rodadaGabarito = $scope.gabarito.rodadas.filter(function(rodada) {
                    return rodada.id === rodada_id;
                });
                angular.forEach(rodadaGabarito[0].jogos, function(jogoGabarito) {
                    atualizacaoEmLote = atualizacaoEmLote + '{ "update": {"_id":"' + jogoGabarito._id + '"} }\n{ "doc" : {"visitante_gols" : ' + jogoGabarito._source.visitante_gols + ', "mandante_gols": ' + jogoGabarito._source.mandante_gols + '}, "detect_noop": true }\n';
                    angular.forEach(jogosParaAtualizar, function(jogoBoleiro) {
                        if (jogoGabarito._source.mandante === jogoBoleiro._source.mandante) {
                            atualizacaoEmLote = atualizacaoEmLote + '{ "update": {"_id":"' + jogoBoleiro._id + '"} }\n{ "doc" : {"gaba_visit" : ' + jogoGabarito._source.visitante_gols + ', "gaba_manda": ' + jogoGabarito._source.mandante_gols + '}, "detect_noop": true }\n';
                        
                        }
                    
                    });
                });
                
                BD.atualizarEmLoteES(atualizacaoEmLote);
            });
        };
    }
]);
