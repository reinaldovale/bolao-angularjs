angular.module("bolao")
.config(function ($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "app/parcial/inicio.html",
		controller: "ControlePrincipal"	
	})
	.when("/adm", {
		templateUrl: "app/parcial/teste.html",
		controller: "ControleAtualizacao"
	})
	.otherwise({
    template: "This route isn't set!"
  	});
// 	$routeProvider.otherwise({redirectTo: "/"});

});
