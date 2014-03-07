'use strict';

angular.module('bolao.diretivas.carrossel', ['ngAnimate'])
    .directive('carrossel', function() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'js/diretiva-carrossel.html' ,
            scope: false,
            controller: function ($scope) {
                var eu = this,
                slides = $scope.slides = [];                
                        
                eu.direction = $scope.direction = 'right';
                eu.mostrarDetalhe = true;
                $scope.currentIndex = 0;
                
                eu.adicionarPagina = function(pagina, element) {
                  slides.push(pagina);                  
                };
        
                $scope.setCurrentSlideIndex = eu.setCurrentSlideIndex = function (index) {
                    index = parseInt(index);        		
                    if(typeof index === 'number' && isFinite(index) && index > -1 && index < $scope.slides.length) {
                      if($scope.currentIndex < index) {
                        $scope.currentIndex = index - 1;
                        $scope.nextSlide();
                      }
                      else {
                        $scope.currentIndex = index + 1;
                        $scope.prevSlide();
                      }
                      
                            
//                          $scope.direction = eu.direction = (index > $scope.currentIndex) ? 'left' : 'right';
//                         $scope.currentIndex = index;
                    }
                    
                };
        
                $scope.isCurrentSlideIndex = function (index) {
                    return eu.isCurrentSlideIndex(index);
                };
                
                eu.isCurrentSlideIndex = function (index) {
                    return $scope.currentIndex === index;
                };
        
                $scope.nextSlide = function () {
                     $scope.direction = eu.direction = 'right';
//                     angular.forEach(slides, function(slide) {
//                         slide.direction = $scope.direction;
//                     });
                    $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
                    slides.forEach(function(slide) {
                      slide.direction = 'right';
                    });
                };
        
                $scope.prevSlide = function () {
                    $scope.direction = eu.direction = 'left';
//                     angular.forEach(slides, function(slide) {
//                         slide.direction = $scope.direction;
//                     });
                    $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
                    slides.forEach(function(slide) {
                      slide.direction = 'left';
                    });
                };
            }
            
        };
    })
    .directive('pagina', function() {
    return {
      require: '^carrossel',
      restrict: 'E',
      transclude: true,
//       replace: true,
      scope: {
        mostrarDescricao: '@',
      },
      link: function(scope, element, attrs, carrosselControle) {
        scope.isCurrentSlideIndex = function () {
          return carrosselControle.isCurrentSlideIndex(scope.$parent.$index);
        };
        
        scope.setCurrentSlideIndex = function () {
          carrosselControle.setCurrentSlideIndex(scope.$parent.$index);
        };
        
        carrosselControle.adicionarPagina(scope, element);
        
        scope.detalheVisivel = true;
                                      
        scope.alternarDetalhe = function(){
            return scope.isCurrentSlideIndex() && scope.detalheVisivel;
//             scope.detalheVisivel = !scope.detalheVisivel;
        };
      },
      templateUrl: 'js/diretiva-paginas.html'
    };
  });