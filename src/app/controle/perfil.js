angular.module('bolao')
.controller('PerfilCtrl', function($scope, $auth, $location, toastr, Conta, BD, SatellizerStorage) {
    $scope.getPerfil = function() {
        Conta.getPerfil()
        .then(function(response) {
            $scope.user = response.data;
            toastr.success('Cadastrado com sucesso!');
            $location.path('/');
        }
        )
        .catch(function(response) {
            toastr.error(response.data.message, response.status);
        }
        );
    }
    ;
    $scope.cadastrar = function() {

        var usuario = SatellizerStorage.get("usuario"), 
        cadastrar = true;

        if (!usuario) {
            toastr.warning('logar primeiro!');
        } 
        else {
            usuario = JSON.parse(usuario);

            BD.pegarBoleiros()
            .then(function(boleiros) {
            
                for (var i = 0; i < boleiros.length; i++) {
                    if (boleiros[i].boleiro === usuario.name) {
                        toastr.warning('Você já está cadastrado!');
                        cadastrar = false;
                        break;
                    }
                }
                if (cadastrar) {
                    boleiros = BD.cadastrarBoleiroES(usuario)
                    .then(function(boleiro) {
                        toastr.success('Cadastrado com sucesso!');
                        $location.path('/');
                    },
                    function errorCallback(response) {
                        toastr.error(response.data.message, response.status);
                    });
                }            
            });
        }        
    };
}
);
