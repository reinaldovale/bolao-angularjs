angular.module('bolao')
.controller('MenuCtrl', function($scope, $rootScope, toastr) {
    $rootScope.$on('novoUsuario', function(ev, args) {
        $scope.abrir();
    }
    );
    $scope.menuActive = '';
    $scope.abrir = function() {
        $scope.menuActive = $scope.menuActive === '' ? 'menu-active' : '';
    }
    ;

}
);
