angular.module('bolao')
.controller('MenuCtrl', function($scope) {
    $scope.menuActive = '';
    
    $scope.$on('$locationChangeSuccess', function(event, newUrl) {
        //         if (/^((?!\/menu).)*$/.test(newUrl)) {
        //             $scope.menuActive = '';
        //         }
//         
var t =0;
        $scope.menuActive = '';
    }
    );
    
    $scope.abrir = function() {
        if ($scope.menuActive === '') {
            $scope.menuActive = 'menu-active';
            //             $location.path('menu');
        } 
        else {
            $scope.menuActive = '';
            //             $location.path('/');
        }
    }
    ;
}
);
