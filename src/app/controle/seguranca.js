angular.module('bolao')
.controller('LoginCtrl', function($scope, $location, $auth, toastr, SatellizerStorage, Conta) {
    $scope.login = function() {
        $auth.login($scope.user)
        .then(function() {
            toastr.success('You have successfully signed in');
            $location.path('/');
        }
        )
        .catch(function(response) {
            toastr.error(response.data.message, response.status);
        }
        );
    }
    ;
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
        .then(function() {
            
            Conta.getPerfil()
            .then(function(response) {                
                SatellizerStorage.set("usuario", JSON.stringify(response.data));                
                toastr.success('Você logou com sucesso no ' + provider);
                $location.path('/');
            }
            );
        }
        )
        .catch(function(response) {
            toastr.error(response.data.message);
        }
        );
    }
    ;
}
);
