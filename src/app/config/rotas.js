angular.module("bolao")
.config(function ($routeProvider, $httpProvider, $locationProvider) {
	$routeProvider.when("/", {
		templateUrl: "app/parcial/inicio.html",
		controller: "ControlePrincipal"	
	})
	.when("/adm", {
		templateUrl: "app/parcial/teste.html",
		controller: "AdmCtrl"
	});
// 	.otherwise({
//     template: "This route isn't set!"
//   	});
	$routeProvider.otherwise({redirectTo: "/"});
	$locationProvider.html5Mode(true);
// 	$httpProvider.useApplyAsync(true);
});
