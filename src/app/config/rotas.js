angular.module("bolao")
.config(function ($routeProvider, $httpProvider, $locationProvider) {
	$routeProvider.when("/", {
		templateUrl: "app/parcial/home/home.html",
		controller: "ControlePrincipal"	
	})
	.when("/adm", {
		templateUrl: "app/parcial/adm/adm.html",
		controller: "AdmCtrl"
	})
	.when("/adm-flex", {
		templateUrl: "app/parcial/adm/adm-flex.html",
		controller: "AdmCtrl"
	})
	.when("/teste", {
		templateUrl: "app/parcial/mdl-template-dashboard/index.html",
		controller: "AdmCtrl"
	});	
// 	.otherwise({
//     template: "This route isn't set!"
//   	});
	$routeProvider.otherwise({redirectTo: "/"});
	$locationProvider.html5Mode(true);
// 	$httpProvider.useApplyAsync(true);
})
.run(function () {
    var mdlUpgradeDom = false;
    setInterval(function() {
      if (mdlUpgradeDom) {
        componentHandler.upgradeDom();
        mdlUpgradeDom = false;
      }
    }, 200);

    var observer = new MutationObserver(function () {
      mdlUpgradeDom = true;
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    /* support <= IE 10
    angular.element(document).bind('DOMNodeInserted', function(e) {
        mdlUpgradeDom = true;
    });
    */
});