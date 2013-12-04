angular.module('bolao', [ 'ui.bootstrap' ]);
function ClassificacaoCtrl($scope) {
	$scope.oneAtATime = true;

	$scope.boleiros = [ {
		nome : "Reinaldo Vale",
		img : "daniel.png",
		pontos : 100,
		placares : 50
	}, {
		nome : "Zeneto",
		img : "daniel.png",
		pontos : 60,
		placares : 50
	} ];

	$scope.$watch('boleiro.verDetalhe', function(newValue, oldValue) {
		$scope.newValue = newValue;
		$scope.oldValue = oldValue;
	});

	$scope.items = [ 'Item 1', 'Item 2', 'Item 3' ];

	$scope.addItem = function() {
		var newItemNo = $scope.items.length + 1;
		$scope.items.push('Item ' + newItemNo);
	};
}