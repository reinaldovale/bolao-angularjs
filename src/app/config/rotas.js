angular.module("bolao")
.config(function ($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "app/parcial/inicio.html",
		controller: "ControlePrincipal"	
	});
	$routeProvider.when("/adm", {
		templateUrl: "app/parcial/teste.html",
		controller: "ControleAtualizacao"
	});	
	$routeProvider.otherwise({redirectTo: "/"});
});
