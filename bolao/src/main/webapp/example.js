angular.module('bolao', [ 'ui.bootstrap' ]);
function ClassificacaoCtrl($scope) {
	$scope.oneAtATime = false;

	$scope.boleiros = [ {
		nome : "Reinaldo Valee",
		img : "daniel.png",
		pontos : 100,
		placares : 50
	}, {
		nome : "Zeneto",
		img : "caracu.jpg",
		pontos : 60,
		placares : 50
	} , {
		nome : "Russo",
		img : "daniel.png",
		pontos : 10,
		placares : 4
	} , {
		nome : "Diel do Vale",
		img : "boca.png",
		pontos : 10,
		placares : 4
	}];

	
	
	
	
	
	
	 $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 200 + ((slides.length + (25 * slides.length)) % 150);
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/200',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }
	
	
	
	
	
	
	
	
	
}