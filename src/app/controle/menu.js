angular.module('bolao')
.controller('MenuCtrl', function($scope) {
    $scope.menuActive = '';
    
    $scope.$on('$locationChangeSuccess', function(event, newUrl) {
        //         if (/^((?!\/menu).)*$/.test(newUrl)) {
        //             $scope.menuActive = '';
        //         }
        $scope.menuActive = '';
    }
    );
    
    $scope.abrir = function() {
        $scope.menuActive = ($scope.menuActive === '') ? 'menu-active' : '';        
    };
}
);
