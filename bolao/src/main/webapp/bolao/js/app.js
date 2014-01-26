angular.module('website', ['ngAnimate'])
    .controller('MainCtrl', function ($scope) {
        $scope.slides = [
            {image: 'images/img00.jpg', description: 'Image 00'},
            {image: 'images/img01.jpg', description: 'Image 01'},
            {image: 'images/img02.jpg', description: 'Image 02'},
            {image: 'images/img03.jpg', description: 'Image 03'},
            {image: 'images/img04.jpg', description: 'Image 04'}
        ];

        $scope.mostrarDetalhe = true;        
        $scope.direction = 'right';
        $scope.currentIndex = 0;
        
        $scope.mostrar = function(){
            $scope.mostrarDetalhe = !$scope.mostrarDetalhe;
        };

        $scope.setCurrentSlideIndex = function (index) {
        	index = parseInt(index);        		
            if(typeof index === 'number' && isFinite(index) && index <= $scope.slides.length) {
                    
            	$scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
                $scope.currentIndex = index;
            }
            
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };
    });

