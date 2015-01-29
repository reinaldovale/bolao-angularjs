var bolao = angular.module('bolao', ['bolao.carrossel']);

bolao.factory('locations', function($http) {
  var promise = null;

  return function() {
    if (promise) {
      // If we've already asked for this data once,
      // return the promise that already exists.
      return promise;
    } else {
      promise = $http.get('locations/locations.json');
      return promise;
    }
  };
});

bolao.controller('RodadaControle', ['$scope', function($scope) {
    $scope.rodadas = [
                    {image: 'common/img/pages/img00.jpg', descricao: 'Image 00', detalhe: true},
                    {image: 'common/img/pages/img01.jpg', descricao: 'Image 01', detalhe: false},
                    {image: 'common/img/pages/img02.jpg', descricao: 'Image 02', detalhe: false},
                    {image: 'common/img/pages/img03.jpg', descricao: 'Image 03', detalhe: true},
                    {image: 'common/img/pages/img04.jpg', descricao: 'Image 04', detalhe: false}
                ];
//     var t = true;                
//     $scope.alternar = function() {
//         return t = !t;
//     }
}]);