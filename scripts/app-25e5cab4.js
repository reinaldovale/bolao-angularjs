"use strict";angular.module("bolao.carrossel",[]).directive("carrossel",["BD","$timeout","$rootScope",function(e,a){return{restrict:"E",transclude:"true",replace:"true",templateUrl:"components/carrossel/diretivas/diretiva-carrossel.html",scope:{totalPaginas:"=",boleiro:"="},controller:["$scope",function(o){o.direcao="esquerda",o.paginas=[];var t=this,l=1,i=function(e){for(var a=0;a<o.paginas.length;a++)if(o.paginas[a].conteudo.id===e){o.paginas[a].exibir();break}};o.atualizarPagina=function(t,r){o.direcao=void 0===r?l>=t?"esquerda":"direita":r;var s=!0,n=!1;angular.forEach(o.paginas,function(e){e.conteudo.id===l&&(e.ocultar(),n=!0),e.conteudo.id===t&&(s=!1),!s&&n}),s?e.pegarRodadaES(o.boleiro.boleiro,t).then(function(e){a(function(){o.boleiro.rodadas.push(e),o.$digest(),i(t),l=t})},function(r){console.log(r),console.log("Tentando novamente..."),e.pegarRodadaES(o.boleiro.boleiro,t).then(function(e){a(function(){o.boleiro.rodadas.push(e),o.$digest(),i(t),l=t})},function(r){console.log(r),console.log("Iniciando um novo cadastro..."),e.cadastrarRodadaES(o.boleiro,t).then(function(r){0===r.jogos.length?e.pegarRodadaES(o.boleiro.boleiro,t).then(function(e){a(function(){o.boleiro.rodadas.push(e),o.$digest(),i(t),l=t})},function(e){console.log(e),console.log("Busca de rodada após cadastro falhou")}):a(function(){o.boleiro.rodadas.push(r),o.$digest(),i(t),l=t})},function(r){console.log(r),e.pegarRodadaES(o.boleiro.boleiro,t).then(function(e){a(function(){o.boleiro.rodadas.push(e),o.$digest(),i(t),l=t})},function(e){console.log(e),console.log("Click novamente no número da rodada")})})})}):a(function(){i(t),l=t})},o.ehPaginaAtual=function(e){return l===e},o.proximaPagina=function(){var e=l,a=e<o.totalPaginas?++e:1;o.atualizarPagina(a,"direita")},o.paginaAnterior=function(){var e=l,a=e>1?--e:o.totalPaginas;o.atualizarPagina(a,"esquerda")},t.adicionarPagina=function(e){1===l&&e.exibir(),o.paginas.push(e)}}]}}]).directive("pagina",function(){return{require:"^carrossel",restrict:"E",transclude:"true",replace:"true",scope:{conteudo:"="},link:function(e,a,o,t){e.exibir=function(){e.visivel=!0,e.detalheVisivel=!1},e.ocultar=function(){e.visivel=!1,e.detalheVisivel=!1},e.alternarDetalhe=function(){e.detalheVisivel=!e.detalheVisivel},e.ocultar(),t.adicionarPagina(e)},templateUrl:"components/carrossel/diretivas/diretiva-paginas.html"}}),angular.module("bolao.acordeon",[]).directive("acordeon",["$timeout","$rootScope",function(){return{restrict:"E",transclude:"true",replace:"false",templateUrl:"components/acordeon/diretivas/diretiva-acordeon.html",scope:"true",controller:["$scope",function(){var e=this,a=[],o=[],t=2,l=0,i=[],r=2,s=0,n=0,d=function(e){if(r>s){for(var a=0;a<i.length;a++)if(i[a].boleiro.pontos===e.boleiro.pontos&&i[a].boleiro.placares===e.boleiro.placares){s--;break}e.tipo="item-rebaixado",s++,i.push(e)}else{for(var o=!1,a=0;a<i.length;a++)if(i[a].boleiro.pontos===e.boleiro.pontos&&i[a].boleiro.placares===e.boleiro.placares){o=!0;break}if(o)e.tipo="item-rebaixado",i.push(e);else{var t=i.filter(function(a){return a.boleiro.pontos>e.boleiro.pontos||a.boleiro.pontos===e.boleiro.pontos&&a.boleiro.placares>e.boleiro.placares});if(t.length>0){for(var l=t[0].boleiro.pontos,n=t[0].boleiro.placares,a=1;a<t.length;a++)(t[a].boleiro.pontos>l||t[a].boleiro.pontos===l&&t[a].boleiro.placares>n)&&(l=t[a].boleiro.pontos,n=t[a].boleiro.placares);i=i.filter(function(e){var a=!0;return e.boleiro.pontos===l&&e.boleiro.placares===n&&(e.tipo="",a=!1),a}),e.tipo="item-rebaixado",i.push(e)}}}},c=function(e){if(t>l){for(var a=0;a<o.length;a++)if(o[a].boleiro.pontos===e.boleiro.pontos&&o[a].boleiro.placares===e.boleiro.placares){l--;break}e.tipo="item-premiado",l++,o.push(e)}else{for(var i=!1,a=0;a<o.length;a++)if(o[a].boleiro.pontos===e.boleiro.pontos&&o[a].boleiro.placares===e.boleiro.placares){i=!0;break}if(i)e.tipo="item-premiado",o.push(e);else{var r=o.filter(function(a){return a.boleiro.pontos<e.boleiro.pontos||a.boleiro.pontos===e.boleiro.pontos&&a.boleiro.placares<e.boleiro.placares});if(r.length>0){for(var s=r[0].boleiro.pontos,n=r[0].boleiro.placares,a=1;a<r.length;a++)(r[a].boleiro.pontos<s||r[a].boleiro.pontos===s&&r[a].boleiro.placares<n)&&(s=r[a].boleiro.pontos,n=r[a].boleiro.placares);o=o.filter(function(e){var a=!0;return e.boleiro.pontos===s&&e.boleiro.placares===n&&(e.tipo="",d(e),a=!1),a}),e.tipo="item-premiado",o.push(e)}else d(e)}}};e.adicionarItem=function(e){c(e),a.push(e)},e.abrir=function(e){e===n?a[n].visivel?a[e].ocultar():a[e].exibir():(a[n].ocultar(),a[e].exibir()),n=e}}]}}]).directive("item",["BD","$window","$timeout",function(e,a,o){return{require:"^acordeon",restrict:"E",transclude:"true",replace:"false",scope:{boleiro:"=",indice:"@"},link:function(a,t,l,i){a.direcao="esquerda",a.exibir=function(){a.visivel=!0,a.situacao="item-aberto",o(function(){t[0].scrollIntoView()},500)},a.abrir=function(o){var t=1;a.boleiro.rodadas=a.boleiro.rodadas||[];var l=a.boleiro.rodadas.filter(function(e){return e.id===t})[0];l||e.pegarRodadaES(a.boleiro.boleiro,t).then(function(e){a.boleiro.rodadas.push(e)},function(e){console.log(e)}),i.abrir(o)},a.ocultar=function(){a.visivel=!1,a.situacao="item-fechado"},a.ocultar(),i.adicionarItem(a)},templateUrl:"components/acordeon/diretivas/diretiva-item.html"}}]),angular.module("bolao",["bolao.carrossel","bolao.acordeon","ngTouch","ngRoute","toastr","satellizer"]),angular.module("bolao").factory("BD",["$http","$templateCache","$q","$timeout",function(e,a,o,t){var l=[],i=function(e){return{method:e.method?e.method:"POST",url:e.url?"https://fili-us-east-1.searchly.com/bolao"+e.url:"https://fili-us-east-1.searchly.com/bolao/jogo",data:e.dados?e.dados:"",skipAuthorization:!0,headers:{Authorization:"Basic c2l0ZTpjZGFhOTgyYjE4MWM0MTRiZTg3Yzk1ODdhOThkMjg5NA=="},cache:a}},r={aggs:{boleiros:{terms:{field:"boleiro.raw",size:0,order:{pontos:"desc",placares:"desc"}},aggs:{foto:{terms:{field:"foto.raw"}},pontos:{sum:{script:"if(doc['gaba_manda'].empty||doc['gaba_visit'].empty||doc['mandante_gols'].empty||doc['visitante_gols'].empty){0}else if(doc['gaba_manda'].value==doc['mandante_gols'].value&&doc['gaba_visit'].value==doc['visitante_gols'].value){3}else if((doc['gaba_manda'].value==doc['gaba_visit'].value&&doc['mandante_gols'].value==doc['visitante_gols'].value)||(doc['gaba_manda'].value<doc['gaba_visit'].value&&doc['mandante_gols'].value<doc['visitante_gols'].value)||(doc['gaba_manda'].value>doc['gaba_visit'].value&&doc['mandante_gols'].value>doc['visitante_gols'].value)){1}else{0}"}},placares:{sum:{script:"if(doc['gaba_manda'].empty||doc['gaba_visit'].empty||doc['mandante_gols'].empty||doc['visitante_gols'].empty){0}else if(doc['gaba_manda'].value==doc['mandante_gols'].value&&doc['gaba_visit'].value==doc['visitante_gols'].value){1}else if((doc['gaba_manda'].value==doc['gaba_visit'].value&&doc['mandante_gols'].value==doc['visitante_gols'].value)||(doc['gaba_manda'].value<doc['gaba_visit'].value&&doc['mandante_gols'].value<doc['visitante_gols'].value)||(doc['gaba_manda'].value>doc['gaba_visit'].value&&doc['mandante_gols'].value>doc['visitante_gols'].value)){0}else{0}"}}}}},size:0},s={query:{bool:{must:[{term:{rodada_id:1}},{term:{"boleiro.raw":"modelo"}}]}}},n={query:{bool:{must:{term:{rodada_id:1}},must_not:[{term:{"boleiro.raw":"gabarito"}},{term:{"boleiro.raw":"modelo"}}]}}};return{pegarBoleiros:function(e){var a=this,i=o.defer();return 0===l.length||e&&e.remoto?a.pegarBoleirosES().then(function(e){t(function(){l=e,i.resolve(l)})},function(){i.reject("Servidor falhou ao buscar rodada de ID = "+rodada_id)}):i.resolve(l),i.promise},cadastrarRodadaES:function(a,t){var l=this,r=o.defer();return l.pegarRodadaES("modelo",t).then(function(o){for(var s=o.jogos,n="",d=0;d<s.length;d++){var c=s[d]._source;c.boleiro=a.boleiro,c.foto=a.foto,n+='{ "index" : { "_index" : "bolao", "_type" : "jogo"} }\n{"boleiro": "'+c.boleiro+'", "foto": "'+c.foto+'", "rodada_id": "'+c.rodada_id+'", "rodadas_data": "'+c.rodadas_data+'","mandante": "'+c.mandante+'","mandante_gols": "", "visitante": "'+c.visitante+'", "visitante_gols": "", "gaba_visit": "", "gaba_manda": ""}\n'}e(i({dados:n,url:"/_bulk"})).then(function(){e(i({url:"/_flush"})).then(function(){l.pegarRodadaES(a.boleiro,t).then(function(e){r.resolve(e)},function(){r.reject("Servidor falhou ao buscar rodada de ID = "+t)})},function(){r.reject("Servidor falhou ao fazer o _flush!")})},function(){r.reject("Servidor falhou ao cadastrar rodada!")})},function(){r.reject("Servidor falhou ao buscar modelo!")}),r.promise},cadastrarBoleiroES:function(a){var t=this,r=o.defer(),s={id:1,jogos:[]};return t.pegarRodadaES("modelo",s.id).then(function(o){for(var t=o.jogos,s="",n=0;n<t.length;n++){var d=t[n]._source;d.boleiro=a.name,d.foto=a.picture,s+='{ "index" : { "_index" : "bolao", "_type" : "jogo"} }\n{"boleiro": "'+d.boleiro+'", "foto": "'+d.foto+'", "rodada_id": "'+d.rodada_id+'", "rodadas_data": "'+d.rodadas_data+'","mandante": "'+d.mandante+'","mandante_gols": "", "visitante": "'+d.visitante+'", "visitante_gols": "", "gaba_visit": "", "gaba_manda": ""}\n'}e(i({dados:s,url:"/_bulk"})).then(function(){e(i({url:"/_flush"})).then(function(){var e={boleiro:a.name,foto:a.picture,pontos:0,placares:0};l.push(e),r.resolve(e)})})}),r.promise},pegarBoleirosES:function(){var a=o.defer();return e(i({dados:r,url:"/jogo/_search"})).then(function(e){var o=e.data.aggregations.boleiros.buckets;l=o.map(function(e){var a=e.foto.buckets.length>0?e.foto.buckets[0].key:"";return{boleiro:e.key,foto:a,pontos:e.pontos.value,placares:e.placares.value}}),a.resolve(l)},function(e){a.reject("Servidor falhou, tente novamente. Detalhes: "+e.data.error)}),a.promise},pegarRodadaES:function(a,t){var l=o.defer();return s.query.bool.must[0].term.rodada_id=t,s.query.bool.must[1].term["boleiro.raw"]=a,e(i({dados:s,url:"/jogo/_search"})).then(function(e){e.data.hits.hits.length<10?l.reject("Servidor não devolveu os jogos, tente novamente"):l.resolve({id:t,jogos:e.data.hits.hits})},function(e){l.reject("Servidor falhou, tente novamente. Detalhes: "+e)}),l.promise},pegarRodadasES:function(a){var t=o.defer();return n.query.bool.must.term.rodada_id=a,e(i({dados:n,url:"/jogo/_search"})).then(function(a){if(a.data.hits.total>10){for(var l=a.data.hits.hits,r=a.data.hits.total,s=10,d=[],c=s;r>c;c+=s)d.push(e(i({dados:n,url:"/jogo/_search?from="+c})));o.all(d).then(function(e){angular.forEach(e,function(e){l=l.concat(e.data.hits.hits)}),t.resolve(l)})}else t.resolve(a.data.hits.hits)}),t.promise},atualizarEmLoteES:function(a){return e(i({dados:a,url:"/jogo/_bulk"}))}}}]).directive("stopEvent",function(){return{restrict:"A",link:function(e,a,o){a.on(o.stopEvent,function(e){e.stopPropagation()})}}}).directive("palpite",function(){return{restrict:"E",transclude:"true",replace:"false",templateUrl:"components/acordeon/diretivas/diretiva-palpite.html",scope:{jogoData:"@",gols:"="},link:function(e){{var a=new Date(Date.parse(e.jogoData));a.getTime()<=(new Date).getTime()}e.somenteLeitura=a.getTime()<=(new Date).getTime()?!0:!1}}}),angular.module("bolao").factory("Conta",["$http",function(e){return{getPerfil:function(){return e.get("https://www.googleapis.com/oauth2/v1/userinfo")}}}]),angular.module("bolao").factory("Boleiros",["$http",function(e){return{getPerfil:function(){return e.get("https://www.googleapis.com/oauth2/v1/userinfo")}}}]),angular.module("bolao").controller("ControlePrincipal",["$auth","$timeout","$rootScope","$scope","$http","$window","BD","toastr","Conta",function(e,o,t,l,i,r,s,n){function d(e){for(l.boleiros||(l.boleiros=[]);l.boleiros.length>0;)a.pop();l.boleiros=e.filter(function(e){var a=!0;return("gabarito"===e.boleiro||"modelo"===e.boleiro)&&(a=!1,"gabarito"===e.boleiro&&(l.gabarito=e)),a})}l.gabarito={},s.pegarBoleiros().then(function(e){d(e)},function(e){n.error(e)}),l.telaAdmin=function(){var a=e.getToken();a?(a=JSON.parse(e.getToken()),"Reinaldo Vale"===a.name?r.location.href="teste.html":alert("Voce nao tem permissao!")):alert("logar primeiro!")},l.atualizar=function(e,a){var o="";e.rodadas.filter(function(e){return e.id===a})[0].jogos.forEach(function(e){var a=null===e._source.visitante_gols?'""':e._source.visitante_gols,t=null===e._source.mandante_gols?'""':e._source.mandante_gols;o=o+'{ "update": {"_id":"'+e._id+'"} }\n{ "doc" : {"visitante_gols" : '+a+', "mandante_gols": '+t+'}, "detect_noop": true }\n'}),s.atualizarEmLoteES(o)},l.somenteLeitura=function(e){{var a=new Date(Date.parse(e));a.getTime()<=(new Date).getTime()}return a.getTime()<=(new Date).getTime()?!0:!1},l.ehAtualizavel=function(e){var a=e.jogos[0]._source.rodadas_data;return!l.somenteLeitura(a)}}]),angular.module("bolao").controller("LoginCtrl",["$scope","$location","$auth","toastr","SatellizerStorage","Conta",function(e,a,o,t,l,i){e.login=function(){o.login(e.user).then(function(){t.success("You have successfully signed in"),a.path("/")})["catch"](function(e){t.error(e.data.message,e.status)})},e.authenticate=function(e){o.authenticate(e).then(function(){i.getPerfil().then(function(o){l.set("usuario",JSON.stringify(o.data)),t.success("Você logou com sucesso no "+e),a.path("/")})})["catch"](function(e){t.error(e.data.message)})}}]),angular.module("bolao").controller("PerfilCtrl",["$scope","$auth","$location","toastr","Conta","BD","SatellizerStorage",function(e,a,o,t,l,i,r){e.getPerfil=function(){l.getPerfil().then(function(a){e.user=a.data,t.success("Cadastrado com sucesso!"),o.path("/")})["catch"](function(e){t.error(e.data.message,e.status)})},e.cadastrar=function(){var e=r.get("usuario"),a=!0;e?(e=JSON.parse(e),i.pegarBoleiros().then(function(l){for(var r=0;r<l.length;r++)if(l[r].boleiro===e.name){t.warning("Você já está cadastrado!"),a=!1;break}a&&(l=i.cadastrarBoleiroES(e).then(function(){t.success("Cadastrado com sucesso!"),o.path("/")},function(e){t.error(e.data.message,e.status)}))})):t.warning("logar primeiro!")}}]),angular.module("bolao").controller("MenuCtrl",["$scope",function(e){e.menuActive="",e.$on("$locationChangeSuccess",function(){e.menuActive=""}),e.abrir=function(){e.menuActive=""===e.menuActive?"menu-active":""}}]),angular.module("bolao").controller("AdmCtrl",["$scope","$auth","$location","toastr","Conta","BD","SatellizerStorage",function(e,a,o,t,l,i){var r=function(a){a.pontos=10,a.placares=3,a.data=a.jogos[0]._source.rodadas_data,e.rodadaAtual=a};e.atualizarRodada=function(a){if(!e.estaCarregando){e.estaCarregando=!0;var o=!0;void 0===e.gabarito&&(e.gabarito={boleiro:"gabarito"},e.gabarito.rodadas=[]),angular.forEach(e.gabarito.rodadas,function(t){t.id===a?(t.rodadaAtiva=!0,e.rodadaAtual=t,o=!1,e.estaCarregando=!1):t.rodadaAtiva=!1}),o&&i.pegarRodadaES("gabarito",a).then(function(a){a.rodadaAtiva=!0,r(a),e.gabarito.rodadas.push(a),e.estaCarregando=!1})}},e.atualizarRodada(1),e.atualizar=function(a){i.pegarRodadasES(a).then(function(o){var t="",l=o,r=e.gabarito.rodadas.filter(function(e){return e.id===a})[0];angular.forEach(r.jogos,function(e){var a=null===e._source.visitante_gols?'""':e._source.visitante_gols,o=null===e._source.mandante_gols?'""':e._source.mandante_gols;t=t+'{ "update": {"_id":"'+e._id+'"} }\n{ "doc" : {"visitante_gols" : '+a+', "mandante_gols": '+o+'}, "detect_noop": true }\n',angular.forEach(l,function(l){e._source.mandante===l._source.mandante&&(t=t+'{ "update": {"_id":"'+l._id+'"} }\n{ "doc" : {"gaba_visit" : '+a+', "gaba_manda": '+o+'}, "detect_noop": true }\n')})}),i.atualizarEmLoteES(t)})}}]),angular.module("bolao").config(["$routeProvider","$httpProvider","$locationProvider",function(e,a,o){e.when("/",{templateUrl:"app/parcial/home/home.html",controller:"ControlePrincipal"}).when("/adm",{templateUrl:"app/parcial/adm/adm.html",controller:"AdmCtrl"}).when("/adm-flex",{templateUrl:"app/parcial/adm/adm-flex.html",controller:"AdmCtrl"}).when("/teste",{templateUrl:"app/parcial/mdl-template-dashboard/index.html",controller:"AdmCtrl"}),e.otherwise({redirectTo:"/"}),o.html5Mode(!0)}]),angular.module("bolao").config(["$authProvider",function(e){e.google({clientId:"1041203641186-p7ift3msto8too87sqtkbq3so9j6qcp0.apps.googleusercontent.com",responseType:"token"})}]),angular.module("bolao").run(["$templateCache",function(e){e.put("app/parcial/inicio.html",'<acordeon class="conteiner-itens hbox space-between"><item ng-repeat="boleiro in boleiros | orderBy:[\'-pontos\',\'-placares\']" boleiro="boleiro" indice="{{$index}}"><carrossel total-paginas="38" boleiro="boleiro"><pagina ng-repeat="rodada in boleiro.rodadas" conteudo="rodada"><form ng-submit="atualizar(boleiro, rodada.id)"><table class="rodada"><tr class="cabecalho-pagina"><td colspan="3">Mandante</td><td></td><td colspan="3">Visitante</td></tr><tr ng-repeat="jogo in rodada.jogos"><td class="time-escudo"><img ng-src="assets/images/times/{{jogo._source.mandante}}1.png"></td><td class="time-nome">{{jogo._source.mandante}}</td><td class="time-placar"><palpite jogo-data="{{jogo._source.rodadas_data}}" gols="jogo._source.mandante_gols"></palpite></td><td>x</td><td class="time-placar"><palpite jogo-data="{{jogo._source.rodadas_data}}" gols="jogo._source.visitante_gols"></palpite></td><td class="time-nome">{{jogo._source.visitante}}</td><td class="time-escudo"><img ng-src="assets/images/times/{{jogo._source.visitante}}1.png"></td></tr></table><input ng-show="ehAtualizavel(rodada)" type="submit" id="submit" value="Atualizar" stop-event="touchend click"></form></pagina></carrossel></item></acordeon>'),e.put("app/parcial/adm/adm-flex.html",'<nav><div ng-repeat="rodada in (0|number:38 - 2 ) track by $index" ng-click="atualizarRodada($index + 1);" ng-class="{\'ativo\':($index + 1) == rodadaAtual.id}">{{$index + 1}}</div></nav><header><div>Mandante</div><div>Placar</div><div>Visitante</div></header><div class="jogos" ng-show="estaCarregando"><img class="buiu" ng-src="assets/images/buiu.gif"></div><div class="jogos" ng-repeat="rodada in gabarito.rodadas" ng-show="rodada.rodadaAtiva"><article class="jogo" ng-repeat="jogo in rodada.jogos"><div class="escudo"><img ng-src="assets/images/times/MarcaSerpro.gif"></div><div>{{jogo._source.mandante}}</div><div class="placar">{{jogo._source.mandante_gols}}</div><div class="placar">x</div><div class="placar">{{jogo._source.visitante_gols}}</div><div>{{jogo._source.visitante}}</div><div class="escudo"><img ng-src="assets/images/times/MarcaSerpro.gif"></div></article></div><footer><div>Número: {{rodadaAtual.id}}</div><div>Total de Pontos: {{rodadaAtual.pontos}}</div><div>Data: {{rodadaAtual.data | date : \'dd/MM/yyyy\'}}</div><div>Total de Placares: {{rodadaAtual.placares}}</div><div><a href="/">Início</a></div></footer>'),e.put("app/parcial/adm/adm.html",'<nav><ul layout="row" layout-wrap="" layout-align="center center"><li flex="2" class="ponto" ng-repeat="pagina in (0|number:38 - 2 ) track by $index">{{$index + 1}}</li></ul></nav><session layout="column" class="jogos"><header layout="row"><div flex="40" class="dois">Mandante</div><div flex="20">Placar</div><div flex="40" class="dois">Visitante</div></header><article layout="row" ng-repeat="jogo in gabarito.rodadas[0].jogos"><div flex="15" class="um"><img ng-src="assets/images/times/{{jogo._source.mandante}}.png"></div><div flex="20" class="dois">{{jogo._source.mandante}}</div><div flex="10" class="um">{{jogo._source.mandante_gols}}</div><div flex="10">x</div><div flex="10" class="dois">{{jogo._source.visitante_gols}}</div><div flex="20" class="um">{{jogo._source.visitante}}</div><div flex="15" class="dois"><img ng-src="assets/images/times/{{jogo._source.visitante}}.png"></div></article></session><footer><header layout="row"><div flex="">Número:</div><div flex="">Total de Pontos:</div><div flex="">Data:</div><div flex="">Total de Placares:</div></header><session><div>{{conteudo.id}}</div><div>{{conteudo.pontos}}</div><div>{{conteudo.data | date : \'dd/MM/yyyy\'}}</div><div>{{conteudo.placares}}</div></session><a href="/">Início</a></footer>'),e.put("app/parcial/home/home.html",'<div class="mdl-grid demo-content"><div class="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing"><div class="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop"><div class="mdl-card__title mdl-card--expand mdl-color--teal-300"><h2 class="mdl-card__title-text">Updates</h2></div><div class="mdl-card__supporting-text mdl-color-text--grey-600">Non dolore elit adipisicing ea reprehenderit consectetur culpa.</div><div class="mdl-card__actions mdl-card--border"><a href="#" class="mdl-button mdl-js-button mdl-js-ripple-effect">Read More</a></div></div></div><div class="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing"><div class="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop"><div class="mdl-card__title mdl-card--expand mdl-color--teal-300"><h2 class="mdl-card__title-text">Updates</h2></div><div class="mdl-card__supporting-text mdl-color-text--grey-600">Non dolore elit adipisicing ea reprehenderit consectetur culpa.</div><div class="mdl-card__actions mdl-card--border"><a href="#" class="mdl-button mdl-js-button mdl-js-ripple-effect">Read More</a></div></div><div class="demo-separator mdl-cell--1-col"></div></div><div class="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing"><div class="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop"><div class="mdl-card__title mdl-card--expand mdl-color--teal-300"><h2 class="mdl-card__title-text">Updates</h2></div><div class="mdl-card__supporting-text mdl-color-text--grey-600">Non dolore elit adipisicing ea reprehenderit consectetur culpa.</div><div class="mdl-card__actions mdl-card--border"><a href="#" class="mdl-button mdl-js-button mdl-js-ripple-effect">Read More</a></div></div><div class="demo-separator mdl-cell--1-col"></div></div></div>'),e.put("app/parcial/mdl-template-dashboard/index.html",'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="description" content="A front-end template that helps you build fast, modern mobile web apps."><meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"><title>Material Design Lite</title><meta name="mobile-web-app-capable" content="yes"><link rel="icon" sizes="192x192" href="images/android-desktop.png"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black"><meta name="apple-mobile-web-app-title" content="Material Design Lite"><link rel="apple-touch-icon-precomposed" href="images/ios-desktop.png"><meta name="msapplication-TileImage" content="images/touch/ms-touch-icon-144x144-precomposed.png"><meta name="msapplication-TileColor" content="#3372DF"><link rel="shortcut icon" href="images/favicon.png"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en"><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"><link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.cyan-light_blue.min.css"><link rel="stylesheet" href="styles.css"></head><body><div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header"><header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600"><div class="mdl-layout__header-row"><span class="mdl-layout-title">Home</span><div class="mdl-layout-spacer"></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable"><label class="mdl-button mdl-js-button mdl-button--icon" for="search"><i class="material-icons">search</i></label><div class="mdl-textfield__expandable-holder"><input class="mdl-textfield__input" type="text" id="search"> <label class="mdl-textfield__label" for="search">Enter your query...</label></div></div><button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn"><i class="material-icons">more_vert</i></button><ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn"><li class="mdl-menu__item">About</li><li class="mdl-menu__item">Contact</li><li class="mdl-menu__item">Legal information</li></ul></div></header><div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50"><header class="demo-drawer-header"><img src="images/user.jpg" class="demo-avatar"><div class="demo-avatar-dropdown"><span>hello@example.com</span><div class="mdl-layout-spacer"></div><button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons" role="presentation">arrow_drop_down</i> <span class="visuallyhidden">Accounts</span></button><ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn"><li class="mdl-menu__item">hello@example.com</li><li class="mdl-menu__item">info@example.com</li><li class="mdl-menu__item"><i class="material-icons">add</i>Add another account...</li></ul></div></header><nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800"><a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Inbox</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Trash</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Forums</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">flag</i>Updates</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_offer</i>Promos</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">shopping_cart</i>Purchases</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">people</i>Social</a><div class="mdl-layout-spacer"></div><a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span class="visuallyhidden">Help</span></a></nav></div><main class="mdl-layout__content mdl-color--grey-100"><div class="mdl-grid demo-content"><div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid"><svg fill="currentColor" width="200px" height="200px" viewbox="0 0 1 1" class="demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop"><use xlink:href="#piechart" mask="url(#piemask)"></use><text x="0.5" y="0.5" font-family="Roboto" font-size="0.3" fill="#888" text-anchor="middle" dy="0.1">82<tspan font-size="0.2" dy="-0.07">%</tspan></text></svg><svg fill="currentColor" width="200px" height="200px" viewbox="0 0 1 1" class="demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop"><use xlink:href="#piechart" mask="url(#piemask)"></use><text x="0.5" y="0.5" font-family="Roboto" font-size="0.3" fill="#888" text-anchor="middle" dy="0.1">82<tspan dy="-0.07" font-size="0.2">%</tspan></text></svg><svg fill="currentColor" width="200px" height="200px" viewbox="0 0 1 1" class="demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop"><use xlink:href="#piechart" mask="url(#piemask)"></use><text x="0.5" y="0.5" font-family="Roboto" font-size="0.3" fill="#888" text-anchor="middle" dy="0.1">82<tspan dy="-0.07" font-size="0.2">%</tspan></text></svg><svg fill="currentColor" width="200px" height="200px" viewbox="0 0 1 1" class="demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop"><use xlink:href="#piechart" mask="url(#piemask)"></use><text x="0.5" y="0.5" font-family="Roboto" font-size="0.3" fill="#888" text-anchor="middle" dy="0.1">82<tspan dy="-0.07" font-size="0.2">%</tspan></text></svg></div><div class="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--8-col"><svg fill="currentColor" viewbox="0 0 500 250" class="demo-graph"><use xlink:href="#chart"></use></svg><svg fill="currentColor" viewbox="0 0 500 250" class="demo-graph"><use xlink:href="#chart"></use></svg></div><div class="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing"><div class="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop"><div class="mdl-card__title mdl-card--expand mdl-color--teal-300"><h2 class="mdl-card__title-text">Updates</h2></div><div class="mdl-card__supporting-text mdl-color-text--grey-600">Non dolore elit adipisicing ea reprehenderit consectetur culpa.</div><div class="mdl-card__actions mdl-card--border"><a href="#" class="mdl-button mdl-js-button mdl-js-ripple-effect">Read More</a></div></div><div class="demo-separator mdl-cell--1-col"></div><div class="demo-options mdl-card mdl-color--deep-purple-500 mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop"><div class="mdl-card__supporting-text mdl-color-text--blue-grey-50"><h3>View options</h3><ul><li><label for="chkbox1" class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"><input type="checkbox" id="chkbox1" class="mdl-checkbox__input"> <span class="mdl-checkbox__label">Click per object</span></label></li><li><label for="chkbox2" class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"><input type="checkbox" id="chkbox2" class="mdl-checkbox__input"> <span class="mdl-checkbox__label">Views per object</span></label></li><li><label for="chkbox3" class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"><input type="checkbox" id="chkbox3" class="mdl-checkbox__input"> <span class="mdl-checkbox__label">Objects selected</span></label></li><li><label for="chkbox4" class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"><input type="checkbox" id="chkbox4" class="mdl-checkbox__input"> <span class="mdl-checkbox__label">Objects viewed</span></label></li></ul></div><div class="mdl-card__actions mdl-card--border"><a href="#" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--blue-grey-50">Change location</a><div class="mdl-layout-spacer"></div><i class="material-icons">location_on</i></div></div></div></div></main></div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="position: fixed; left: -1000px; height: -1000px;"><defs><mask id="piemask" maskcontentunits="objectBoundingBox"><circle cx="0.5" cy="0.5" r="0.49" fill="white"></circle><circle cx="0.5" cy="0.5" r="0.40" fill="black"></circle></mask><g id="piechart"><circle cx="0.5" cy="0.5" r="0.5"></circle><path d="M 0.5 0.5 0.5 0 A 0.5 0.5 0 0 1 0.95 0.28 z" stroke="none" fill="rgba(255, 255, 255, 0.75)"></path></g></defs></svg><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 500 250" style="position: fixed; left: -1000px; height: -1000px;"><defs><g id="chart"><g id="Gridlines"><line fill="#888888" stroke="#888888" stroke-miterlimit="10" x1="0" y1="27.3" x2="468.3" y2="27.3"></line><line fill="#888888" stroke="#888888" stroke-miterlimit="10" x1="0" y1="66.7" x2="468.3" y2="66.7"></line><line fill="#888888" stroke="#888888" stroke-miterlimit="10" x1="0" y1="105.3" x2="468.3" y2="105.3"></line><line fill="#888888" stroke="#888888" stroke-miterlimit="10" x1="0" y1="144.7" x2="468.3" y2="144.7"></line><line fill="#888888" stroke="#888888" stroke-miterlimit="10" x1="0" y1="184.3" x2="468.3" y2="184.3"></line></g><g id="Numbers"><text transform="matrix(1 0 0 1 485 29.3333)" fill="#888888" font-family="\'Roboto\'" font-size="9">500</text><text transform="matrix(1 0 0 1 485 69)" fill="#888888" font-family="\'Roboto\'" font-size="9">400</text><text transform="matrix(1 0 0 1 485 109.3333)" fill="#888888" font-family="\'Roboto\'" font-size="9">300</text><text transform="matrix(1 0 0 1 485 149)" fill="#888888" font-family="\'Roboto\'" font-size="9">200</text><text transform="matrix(1 0 0 1 485 188.3333)" fill="#888888" font-family="\'Roboto\'" font-size="9">100</text><text transform="matrix(1 0 0 1 0 249.0003)" fill="#888888" font-family="\'Roboto\'" font-size="9">1</text><text transform="matrix(1 0 0 1 78 249.0003)" fill="#888888" font-family="\'Roboto\'" font-size="9">2</text><text transform="matrix(1 0 0 1 154.6667 249.0003)" fill="#888888" font-family="\'Roboto\'" font-size="9">3</text><text transform="matrix(1 0 0 1 232.1667 249.0003)" fill="#888888" font-family="\'Roboto\'" font-size="9">4</text><text transform="matrix(1 0 0 1 309 249.0003)" fill="#888888" font-family="\'Roboto\'" font-size="9">5</text><text transform="matrix(1 0 0 1 386.6667 249.0003)" fill="#888888" font-family="\'Roboto\'" font-size="9">6</text><text transform="matrix(1 0 0 1 464.3333 249.0003)" fill="#888888" font-family="\'Roboto\'" font-size="9">7</text></g><g id="Layer_5"><polygon opacity="0.36" stroke-miterlimit="10" points="0,223.3 48,138.5 154.7,169 211,88.5 294.5,80.5 380,165.2 437,75.5 469.5,223.3"></polygon></g><g id="Layer_4"><polygon stroke-miterlimit="10" points="469.3,222.7 1,222.7 48.7,166.7 155.7,188.3 212,132.7 296.7,128 380.7,184.3 436.7,125"></polygon></g></g></defs></svg><a href="https://github.com/google/material-design-lite/blob/master/templates/dashboard/" target="_blank" id="view-source" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored mdl-color-text--white">View Source</a><script src="https://code.getmdl.io/1.1.3/material.min.js"></script></body></html>'),e.put("app/parcial/menu/header.html",'<div class="mdl-layout__header-row"><span class="mdl-layout-title">Home</span><div class="mdl-layout-spacer"></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable"><label class="mdl-button mdl-js-button mdl-button--icon" for="search"><i class="material-icons">search</i></label><div class="mdl-textfield__expandable-holder"><input class="mdl-textfield__input" type="text" id="search"> <label class="mdl-textfield__label" for="search">Enter your query...</label></div></div><button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn"><i class="material-icons">more_vert</i></button><ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn"><li class="mdl-menu__item">About</li><li class="mdl-menu__item">Contact</li><li class="mdl-menu__item">Legal information</li></ul></div>'),e.put("app/parcial/menu/menu.html",'<header class="demo-drawer-header"><img src="app/parcial/mdl-template-dashboard/images/user.jpg" class="demo-avatar"><div class="demo-avatar-dropdown"><span>hello@example.com</span><div class="mdl-layout-spacer"></div><button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"><i class="material-icons" role="presentation">arrow_drop_down</i> <span class="visuallyhidden">Accounts</span></button><ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn"><li class="mdl-menu__item">hello@example.com</li><li class="mdl-menu__item">info@example.com</li><li class="mdl-menu__item"><i class="material-icons">add</i>Add another account...</li></ul></div></header><nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800"><a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Inbox</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Trash</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Forums</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">flag</i>Updates</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_offer</i>Promos</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">shopping_cart</i>Purchases</a> <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">people</i>Social</a><div class="mdl-layout-spacer"></div><a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span class="visuallyhidden">Help</span></a></nav>'),e.put("app/parcial/menu/menu_velho.html",'<div ng-controller="MenuCtrl" class="{{menuActive}}"><header><span class="menu-anchor" ng-click="abrir()"></span><h1><a href="#">Bolão dos Combinados</a></h1></header><div class="menu-main"><figure><img ng-src="launcher-icon-2x.png"></figure><ul><li><a ng-controller="LoginCtrl" ng-click="authenticate(\'google\')">Login</a></li><li><a href="adm">Administracao</a></li><li><a href="adm-flex">Admin-Flex</a></li><li><a href="teste">Teste</a></li><li><a ng-controller="PerfilCtrl" ng-click="cadastrar()">Cadastro</a></li></ul></div></div>'),e.put("components/acordeon/diretivas/diretiva-acordeon.html",'<div class="acordeon main" ng-transclude=""></div>'),e.put("components/acordeon/diretivas/diretiva-item.html",'<div class="item {{situacao}}"><div class="item-cabecalho {{situacao}} {{tipo}}" ng-click="abrir(indice)"><figure><img ng-src="{{boleiro.foto}}"> <img ng-src="assets/images/times/Flamengo.png"><figcaption>Meu campeão: 10 pontos</figcaption></figure><div class="nome">{{boleiro.boleiro}}</div><div class="valores">Pontos<br>{{boleiro.pontos}}</div><div class="valores">Placares<br>{{boleiro.placares}}</div></div><div ng-transclude=""></div></div>'),e.put("components/acordeon/diretivas/diretiva-palpite.html",'<div><span ng-show="somenteLeitura">{{gols}}</span> <input ng-show="!somenteLeitura" type="number" min="0" ng-model="gols" stop-event="touchend click"></div>'),e.put("components/carrossel/diretivas/diretiva-carrossel.html",'<div class="carrossel"><nav class="navegacao"><ul class="pontos"><li class="ponto" ng-class="{\'ativo\':ehPaginaAtual($index + 1)}" ng-repeat="pagina in (0|number:totalPaginas - 2 ) track by $index" ng-click="atualizarPagina($index + 1);">{{$index + 1}}</li></ul></nav><div ng-transclude="" class="paginas {{direcao}}" ng-swipe-left="paginaAnterior()" ng-swipe-right="proximaPagina()"></div><a class="seta anterior" ng-click="paginaAnterior()"></a> <a class="seta proxima" ng-click="proximaPagina()"></a></div>'),e.put("components/carrossel/diretivas/diretiva-paginas.html",'<div class="pagina" ng-hide="!visivel"><div class="conteudo" ng-transclude="" ng-click="alternarDetalhe()"></div><div ng-click="alternarDetalhe()" class="detalhe" ng-class="{ocultar : !detalheVisivel}"><table class="detalhe-rodada"><tr><td class="cabecalho-detalhe-rodada" colspan="4">Detalhes da Rodada</td></tr><tr><td class="esquerda">Número:</td><td class="esquerda">{{conteudo.id}}</td><td class="esquerda">Total de Pontos:</td><td class="direita">{{conteudo.pontos}}</td></tr><tr><td class="esquerda">Data:</td><td class="esquerda">{{conteudo.data | date : \'dd/MM/yyyy\'}}</td><td class="esquerda">Total de Placares:</td><td class="direita">{{conteudo.placares}}</td></tr></table></div></div>')
}]);