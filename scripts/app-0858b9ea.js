"use strict";angular.module("bolao.carrossel",[]).directive("carrossel",["BD","$timeout","$rootScope",function(o,a){return{restrict:"E",transclude:"true",replace:"true",templateUrl:"components/carrossel/diretivas/diretiva-carrossel.html",scope:{totalPaginas:"=",boleiro:"="},controller:["$scope",function(e){e.direcao="esquerda",e.paginas=[];var t=this,i=1,r=function(o){for(var a=0;a<e.paginas.length;a++)if(e.paginas[a].conteudo.id===o){e.paginas[a].exibir();break}};e.atualizarPagina=function(t,n){e.direcao=void 0===n?i>=t?"esquerda":"direita":n;var s=!0,l=!1;angular.forEach(e.paginas,function(o){o.conteudo.id===i&&(o.ocultar(),l=!0),o.conteudo.id===t&&(s=!1),!s&&l}),s?o.pegarRodadaES(e.boleiro.boleiro,t).then(function(o){a(function(){e.boleiro.rodadas.push(o),e.$digest(),r(t),i=t})},function(n){console.log(n),console.log("Tentando novamente..."),o.pegarRodadaES(e.boleiro.boleiro,t).then(function(o){a(function(){e.boleiro.rodadas.push(o),e.$digest(),r(t),i=t})},function(n){console.log(n),console.log("Iniciando um novo cadastro..."),o.cadastrarRodadaES(e.boleiro,t).then(function(n){0===n.jogos.length?o.pegarRodadaES(e.boleiro.boleiro,t).then(function(o){a(function(){e.boleiro.rodadas.push(o),e.$digest(),r(t),i=t})},function(o){console.log(o),console.log("Busca de rodada após cadastro falhou")}):a(function(){e.boleiro.rodadas.push(n),e.$digest(),r(t),i=t})},function(n){console.log(n),o.pegarRodadaES(e.boleiro.boleiro,t).then(function(o){a(function(){e.boleiro.rodadas.push(o),e.$digest(),r(t),i=t})},function(o){console.log(o),console.log("Click novamente no número da rodada")})})})}):a(function(){r(t),i=t})},e.ehPaginaAtual=function(o){return i===o},e.proximaPagina=function(){var o=i,a=o<e.totalPaginas?++o:1;e.atualizarPagina(a,"direita")},e.paginaAnterior=function(){var o=i,a=o>1?--o:e.totalPaginas;e.atualizarPagina(a,"esquerda")},t.adicionarPagina=function(o){1===i&&o.exibir(),e.paginas.push(o)}}]}}]).directive("pagina",function(){return{require:"^carrossel",restrict:"E",transclude:"true",replace:"true",scope:{conteudo:"="},link:function(o,a,e,t){o.exibir=function(){o.visivel=!0,o.detalheVisivel=!1},o.ocultar=function(){o.visivel=!1,o.detalheVisivel=!1},o.alternarDetalhe=function(){o.detalheVisivel=!o.detalheVisivel},o.ocultar(),t.adicionarPagina(o)},templateUrl:"components/carrossel/diretivas/diretiva-paginas.html"}}),angular.module("bolao.acordeon",[]).directive("acordeon",["$timeout","$rootScope",function(){return{restrict:"E",transclude:"true",replace:"false",templateUrl:"components/acordeon/diretivas/diretiva-acordeon.html",scope:"true",controller:["$scope",function(){var o=this,a=[],e=[],t=2,i=0,r=[],n=2,s=0,l=0,d=function(o){if(n>s){for(var a=0;a<r.length;a++)if(r[a].boleiro.pontos===o.boleiro.pontos&&r[a].boleiro.placares===o.boleiro.placares){s--;break}o.tipo="item-rebaixado",s++,r.push(o)}else{for(var e=!1,a=0;a<r.length;a++)if(r[a].boleiro.pontos===o.boleiro.pontos&&r[a].boleiro.placares===o.boleiro.placares){e=!0;break}if(e)o.tipo="item-rebaixado",r.push(o);else{var t=r.filter(function(a){return a.boleiro.pontos>o.boleiro.pontos||a.boleiro.pontos===o.boleiro.pontos&&a.boleiro.placares>o.boleiro.placares});if(t.length>0){for(var i=t[0].boleiro.pontos,l=t[0].boleiro.placares,a=1;a<t.length;a++)(t[a].boleiro.pontos>i||t[a].boleiro.pontos===i&&t[a].boleiro.placares>l)&&(i=t[a].boleiro.pontos,l=t[a].boleiro.placares);r=r.filter(function(o){var a=!0;return o.boleiro.pontos===i&&o.boleiro.placares===l&&(o.tipo="",a=!1),a}),o.tipo="item-rebaixado",r.push(o)}}}},c=function(o){if(t>i){for(var a=0;a<e.length;a++)if(e[a].boleiro.pontos===o.boleiro.pontos&&e[a].boleiro.placares===o.boleiro.placares){i--;break}o.tipo="item-premiado",i++,e.push(o)}else{for(var r=!1,a=0;a<e.length;a++)if(e[a].boleiro.pontos===o.boleiro.pontos&&e[a].boleiro.placares===o.boleiro.placares){r=!0;break}if(r)o.tipo="item-premiado",e.push(o);else{var n=e.filter(function(a){return a.boleiro.pontos<o.boleiro.pontos||a.boleiro.pontos===o.boleiro.pontos&&a.boleiro.placares<o.boleiro.placares});if(n.length>0){for(var s=n[0].boleiro.pontos,l=n[0].boleiro.placares,a=1;a<n.length;a++)(n[a].boleiro.pontos<s||n[a].boleiro.pontos===s&&n[a].boleiro.placares<l)&&(s=n[a].boleiro.pontos,l=n[a].boleiro.placares);e=e.filter(function(o){var a=!0;return o.boleiro.pontos===s&&o.boleiro.placares===l&&(o.tipo="",d(o),a=!1),a}),o.tipo="item-premiado",e.push(o)}else d(o)}}};o.adicionarItem=function(o){c(o),a.push(o)},o.abrir=function(o){o===l?a[l].visivel?a[o].ocultar():a[o].exibir():(a[l].ocultar(),a[o].exibir()),l=o}}]}}]).directive("item",["BD","$window","$timeout",function(o,a,e){return{require:"^acordeon",restrict:"E",transclude:"true",replace:"false",scope:{boleiro:"=",indice:"@"},link:function(a,t,i,r){a.direcao="esquerda",a.exibir=function(){a.visivel=!0,a.situacao="item-aberto",e(function(){t[0].scrollIntoView()},500)},a.abrir=function(e){var t=1;a.boleiro.rodadas=a.boleiro.rodadas||[];var i=a.boleiro.rodadas.filter(function(o){return o.id===t})[0];i||o.pegarRodadaES(a.boleiro.boleiro,t).then(function(o){a.boleiro.rodadas.push(o)},function(o){console.log(o)}),r.abrir(e)},a.ocultar=function(){a.visivel=!1,a.situacao="item-fechado"},a.ocultar(),r.adicionarItem(a)},templateUrl:"components/acordeon/diretivas/diretiva-item.html"}}]),angular.module("bolao",["bolao.carrossel","bolao.acordeon","ngTouch","ngRoute","toastr","satellizer","ngMaterial"]),angular.module("bolao").factory("BD",["$http","$templateCache","$q","$timeout",function(o,a,e,t){var i=[],r=function(o){return{method:o.method?o.method:"POST",url:o.url?"https://fili-us-east-1.searchly.com/bolao"+o.url:"https://fili-us-east-1.searchly.com/bolao/jogo",data:o.dados?o.dados:"",skipAuthorization:!0,headers:{Authorization:"Basic c2l0ZTpjZGFhOTgyYjE4MWM0MTRiZTg3Yzk1ODdhOThkMjg5NA=="},cache:a}},n={aggs:{boleiros:{terms:{field:"boleiro.raw",size:0,order:{pontos:"desc",placares:"desc"}},aggs:{foto:{terms:{field:"foto.raw"}},pontos:{sum:{script:"if(doc['gaba_manda'].empty||doc['gaba_visit'].empty||doc['mandante_gols'].empty||doc['visitante_gols'].empty){0}else if(doc['gaba_manda'].value==doc['mandante_gols'].value&&doc['gaba_visit'].value==doc['visitante_gols'].value){3}else if((doc['gaba_manda'].value==doc['gaba_visit'].value&&doc['mandante_gols'].value==doc['visitante_gols'].value)||(doc['gaba_manda'].value<doc['gaba_visit'].value&&doc['mandante_gols'].value<doc['visitante_gols'].value)||(doc['gaba_manda'].value>doc['gaba_visit'].value&&doc['mandante_gols'].value>doc['visitante_gols'].value)){1}else{0}"}},placares:{sum:{script:"if(doc['gaba_manda'].empty||doc['gaba_visit'].empty||doc['mandante_gols'].empty||doc['visitante_gols'].empty){0}else if(doc['gaba_manda'].value==doc['mandante_gols'].value&&doc['gaba_visit'].value==doc['visitante_gols'].value){1}else if((doc['gaba_manda'].value==doc['gaba_visit'].value&&doc['mandante_gols'].value==doc['visitante_gols'].value)||(doc['gaba_manda'].value<doc['gaba_visit'].value&&doc['mandante_gols'].value<doc['visitante_gols'].value)||(doc['gaba_manda'].value>doc['gaba_visit'].value&&doc['mandante_gols'].value>doc['visitante_gols'].value)){0}else{0}"}}}}},size:0},s={query:{bool:{must:[{term:{rodada_id:1}},{term:{"boleiro.raw":"modelo"}}]}}},l={query:{bool:{must:{term:{rodada_id:1}},must_not:[{term:{"boleiro.raw":"gabarito"}},{term:{"boleiro.raw":"modelo"}}]}}};return{pegarBoleiros:function(o){var a=this,r=e.defer();return 0===i.length||o&&o.remoto?a.pegarBoleirosES().then(function(o){t(function(){i=o,r.resolve(i)})},function(){r.reject("Servidor falhou ao buscar rodada de ID = "+rodada_id)}):r.resolve(i),r.promise},cadastrarRodadaES:function(a,t){var i=this,n=e.defer();return i.pegarRodadaES("modelo",t).then(function(e){for(var s=e.jogos,l="",d=0;d<s.length;d++){var c=s[d]._source;c.boleiro=a.boleiro,c.foto=a.foto,l+='{ "index" : { "_index" : "bolao", "_type" : "jogo"} }\n{"boleiro": "'+c.boleiro+'", "foto": "'+c.foto+'", "rodada_id": "'+c.rodada_id+'", "rodadas_data": "'+c.rodadas_data+'","mandante": "'+c.mandante+'","mandante_gols": "", "visitante": "'+c.visitante+'", "visitante_gols": "", "gaba_visit": "", "gaba_manda": ""}\n'}o(r({dados:l,url:"/_bulk"})).then(function(){o(r({url:"/_flush"})).then(function(){i.pegarRodadaES(a.boleiro,t).then(function(o){n.resolve(o)},function(){n.reject("Servidor falhou ao buscar rodada de ID = "+t)})},function(){n.reject("Servidor falhou ao fazer o _flush!")})},function(){n.reject("Servidor falhou ao cadastrar rodada!")})},function(){n.reject("Servidor falhou ao buscar modelo!")}),n.promise},cadastrarBoleiroES:function(a){var t=this,n=e.defer(),s={id:1,jogos:[]};return t.pegarRodadaES("modelo",s.id).then(function(e){for(var t=e.jogos,s="",l=0;l<t.length;l++){var d=t[l]._source;d.boleiro=a.name,d.foto=a.picture,s+='{ "index" : { "_index" : "bolao", "_type" : "jogo"} }\n{"boleiro": "'+d.boleiro+'", "foto": "'+d.foto+'", "rodada_id": "'+d.rodada_id+'", "rodadas_data": "'+d.rodadas_data+'","mandante": "'+d.mandante+'","mandante_gols": "", "visitante": "'+d.visitante+'", "visitante_gols": "", "gaba_visit": "", "gaba_manda": ""}\n'}o(r({dados:s,url:"/_bulk"})).then(function(){o(r({url:"/_flush"})).then(function(){var o={boleiro:a.name,foto:a.picture,pontos:0,placares:0};i.push(o),n.resolve(o)})})}),n.promise},pegarBoleirosES:function(){var a=e.defer();return o(r({dados:n,url:"/jogo/_search"})).then(function(o){var e=o.data.aggregations.boleiros.buckets;i=e.map(function(o){var a=o.foto.buckets.length>0?o.foto.buckets[0].key:"";return{boleiro:o.key,foto:a,pontos:o.pontos.value,placares:o.placares.value}}),a.resolve(i)},function(o){a.reject("Servidor falhou, tente novamente. Detalhes: "+o.data.error)}),a.promise},pegarRodadaES:function(a,t){var i=e.defer();return s.query.bool.must[0].term.rodada_id=t,s.query.bool.must[1].term["boleiro.raw"]=a,o(r({dados:s,url:"/jogo/_search"})).then(function(o){o.data.hits.hits.length<10?i.reject("Servidor não devolveu os jogos, tente novamente"):i.resolve({id:t,jogos:o.data.hits.hits})},function(o){i.reject("Servidor falhou, tente novamente. Detalhes: "+o)}),i.promise},pegarRodadasES:function(a){var t=e.defer();return l.query.bool.must.term.rodada_id=a,o(r({dados:l,url:"/jogo/_search"})).then(function(a){if(a.data.hits.total>10){for(var i=a.data.hits.hits,n=a.data.hits.total,s=10,d=[],c=s;n>c;c+=s)d.push(o(r({dados:l,url:"/jogo/_search?from="+c})));e.all(d).then(function(o){angular.forEach(o,function(o){i=i.concat(o.data.hits.hits)}),t.resolve(i)})}else t.resolve(a.data.hits.hits)}),t.promise},atualizarEmLoteES:function(a){return o(r({dados:a,url:"/jogo/_bulk"}))}}}]).directive("stopEvent",function(){return{restrict:"A",link:function(o,a,e){a.on(e.stopEvent,function(o){o.stopPropagation()})}}}).directive("palpite",function(){return{restrict:"E",transclude:"true",replace:"false",templateUrl:"components/acordeon/diretivas/diretiva-palpite.html",scope:{jogoData:"@",gols:"="},link:function(o){{var a=new Date(Date.parse(o.jogoData));a.getTime()<=(new Date).getTime()}o.somenteLeitura=a.getTime()<=(new Date).getTime()?!0:!1}}}),angular.module("bolao").factory("Conta",["$http",function(o){return{getPerfil:function(){return o.get("https://www.googleapis.com/oauth2/v1/userinfo")}}}]),angular.module("bolao").factory("Boleiros",["$http",function(o){return{getPerfil:function(){return o.get("https://www.googleapis.com/oauth2/v1/userinfo")}}}]),angular.module("bolao").controller("ControlePrincipal",["$auth","$timeout","$rootScope","$scope","$http","$window","BD","toastr","Conta",function(o,e,t,i,r,n,s,l){function d(o){for(i.boleiros||(i.boleiros=[]);i.boleiros.length>0;)a.pop();i.boleiros=o.filter(function(o){var a=!0;return("gabarito"===o.boleiro||"modelo"===o.boleiro)&&(a=!1,"gabarito"===o.boleiro&&(i.gabarito=o)),a})}i.gabarito={},s.pegarBoleiros().then(function(o){d(o)},function(o){l.error(o)}),i.telaAdmin=function(){var a=o.getToken();a?(a=JSON.parse(o.getToken()),"Reinaldo Vale"===a.name?n.location.href="teste.html":alert("Voce nao tem permissao!")):alert("logar primeiro!")},i.atualizar=function(o,a){var e="";o.rodadas.filter(function(o){return o.id===a})[0].jogos.forEach(function(o){var a=null===o._source.visitante_gols?'""':o._source.visitante_gols,t=null===o._source.mandante_gols?'""':o._source.mandante_gols;e=e+'{ "update": {"_id":"'+o._id+'"} }\n{ "doc" : {"visitante_gols" : '+a+', "mandante_gols": '+t+'}, "detect_noop": true }\n'}),s.atualizarEmLoteES(e)},i.somenteLeitura=function(o){{var a=new Date(Date.parse(o));a.getTime()<=(new Date).getTime()}return a.getTime()<=(new Date).getTime()?!0:!1},i.ehAtualizavel=function(o){var a=o.jogos[0]._source.rodadas_data;return!i.somenteLeitura(a)}}]),angular.module("bolao").controller("LoginCtrl",["$scope","$location","$auth","toastr","SatellizerStorage","Conta",function(o,a,e,t,i,r){o.login=function(){e.login(o.user).then(function(){t.success("You have successfully signed in"),a.path("/")})["catch"](function(o){t.error(o.data.message,o.status)})},o.authenticate=function(o){e.authenticate(o).then(function(){r.getPerfil().then(function(e){i.set("usuario",JSON.stringify(e.data)),t.success("Você logou com sucesso no "+o),a.path("/")})})["catch"](function(o){t.error(o.data.message)})}}]),angular.module("bolao").controller("PerfilCtrl",["$scope","$auth","$location","toastr","Conta","BD","SatellizerStorage",function(o,a,e,t,i,r,n){o.getPerfil=function(){i.getPerfil().then(function(a){o.user=a.data,t.success("Cadastrado com sucesso!"),e.path("/")})["catch"](function(o){t.error(o.data.message,o.status)})},o.cadastrar=function(){var o=n.get("usuario"),a=!0;o?(o=JSON.parse(o),r.pegarBoleiros().then(function(i){for(var n=0;n<i.length;n++)if(i[n].boleiro===o.name){t.warning("Você já está cadastrado!"),a=!1;break}a&&(i=r.cadastrarBoleiroES(o).then(function(){t.success("Cadastrado com sucesso!"),e.path("/")},function(o){t.error(o.data.message,o.status)}))})):t.warning("logar primeiro!")}}]),angular.module("bolao").controller("MenuCtrl",["$scope",function(o){o.menuActive="",o.$on("$locationChangeSuccess",function(){o.menuActive=""}),o.abrir=function(){o.menuActive=""===o.menuActive?"menu-active":""}}]),angular.module("bolao").controller("AdmCtrl",["$scope","$auth","$location","toastr","Conta","BD","SatellizerStorage",function(o,a,e,t,i,r){var n=function(a){a.pontos=10,a.placares=3,a.data=a.jogos[0]._source.rodadas_data,o.rodadaAtual=a};o.atualizarRodada=function(a){if(!o.estaCarregando){o.estaCarregando=!0;var e=!0;void 0===o.gabarito&&(o.gabarito={boleiro:"gabarito"},o.gabarito.rodadas=[]),angular.forEach(o.gabarito.rodadas,function(t){t.id===a?(t.rodadaAtiva=!0,o.rodadaAtual=t,e=!1,o.estaCarregando=!1):t.rodadaAtiva=!1}),e&&r.pegarRodadaES("gabarito",a).then(function(a){a.rodadaAtiva=!0,n(a),o.gabarito.rodadas.push(a),o.estaCarregando=!1})}},o.atualizarRodada(1),o.atualizar=function(a){r.pegarRodadasES(a).then(function(e){var t="",i=e,n=o.gabarito.rodadas.filter(function(o){return o.id===a})[0];angular.forEach(n.jogos,function(o){var a=null===o._source.visitante_gols?'""':o._source.visitante_gols,e=null===o._source.mandante_gols?'""':o._source.mandante_gols;t=t+'{ "update": {"_id":"'+o._id+'"} }\n{ "doc" : {"visitante_gols" : '+a+', "mandante_gols": '+e+'}, "detect_noop": true }\n',angular.forEach(i,function(i){o._source.mandante===i._source.mandante&&(t=t+'{ "update": {"_id":"'+i._id+'"} }\n{ "doc" : {"gaba_visit" : '+a+', "gaba_manda": '+e+'}, "detect_noop": true }\n')})}),r.atualizarEmLoteES(t)})}}]),angular.module("bolao").config(["$routeProvider","$httpProvider","$locationProvider",function(o,a,e){o.when("/",{templateUrl:"app/parcial/inicio.html",controller:"ControlePrincipal"}).when("/adm",{templateUrl:"app/parcial/adm.html",controller:"AdmCtrl"}).when("/adm-flex",{templateUrl:"app/parcial/adm-flex.html",controller:"AdmCtrl"}),o.otherwise({redirectTo:"/"}),e.html5Mode(!0)}]),angular.module("bolao").config(["$authProvider",function(o){o.google({clientId:"1041203641186-p7ift3msto8too87sqtkbq3so9j6qcp0.apps.googleusercontent.com",responseType:"token"})}]),angular.module("bolao").run(["$templateCache",function(o){o.put("app/parcial/adm-flex.html",'<nav><div ng-repeat="rodada in (0|number:38 - 2 ) track by $index" ng-click="atualizarRodada($index + 1);" ng-class="{\'ativo\':($index + 1) == rodadaAtual.id}">{{$index + 1}}</div></nav><header><div>Mandante</div><div>Placar</div><div>Visitante</div></header><div class="jogos" ng-show="estaCarregando"><img class="buiu" ng-src="assets/images/buiu.gif"></div><div class="jogos" ng-repeat="rodada in gabarito.rodadas" ng-show="rodada.rodadaAtiva"><article class="jogo" ng-repeat="jogo in rodada.jogos"><div class="escudo"><img ng-src="assets/images/times/{{jogo._source.mandante}}.png"></div><div>{{jogo._source.mandante}}</div><div class="placar">{{jogo._source.mandante_gols}}</div><div class="placar">x</div><div class="placar">{{jogo._source.visitante_gols}}</div><div>{{jogo._source.visitante}}</div><div class="escudo"><img ng-src="assets/images/times/{{jogo._source.visitante}}.png"></div></article></div><footer><div>Número: {{rodadaAtual.id}}</div><div>Total de Pontos: {{rodadaAtual.pontos}}</div><div>Data: {{rodadaAtual.data | date : \'dd/MM/yyyy\'}}</div><div>Total de Placares: {{rodadaAtual.placares}}</div><div><a href="/">Início</a></div></footer>'),o.put("app/parcial/adm.html",'<nav><ul layout="row" layout-wrap="" layout-align="center center"><li flex="2" class="ponto" ng-repeat="pagina in (0|number:38 - 2 ) track by $index">{{$index + 1}}</li></ul></nav><session layout="column" class="jogos"><header layout="row"><div flex="40" class="dois">Mandante</div><div flex="20">Placar</div><div flex="40" class="dois">Visitante</div></header><article layout="row" ng-repeat="jogo in gabarito.rodadas[0].jogos"><div flex="15" class="um"><img ng-src="assets/images/times/{{jogo._source.mandante}}.png"></div><div flex="20" class="dois">{{jogo._source.mandante}}</div><div flex="10" class="um">{{jogo._source.mandante_gols}}</div><div flex="10">x</div><div flex="10" class="dois">{{jogo._source.visitante_gols}}</div><div flex="20" class="um">{{jogo._source.visitante}}</div><div flex="15" class="dois"><img ng-src="assets/images/times/{{jogo._source.visitante}}.png"></div></article></session><footer><header layout="row"><div flex="">Número:</div><div flex="">Total de Pontos:</div><div flex="">Data:</div><div flex="">Total de Placares:</div></header><session><div>{{conteudo.id}}</div><div>{{conteudo.pontos}}</div><div>{{conteudo.data | date : \'dd/MM/yyyy\'}}</div><div>{{conteudo.placares}}</div></session><a href="/">Início</a></footer>'),o.put("app/parcial/inicio.html",'<acordeon class="conteiner-itens hbox space-between"><item ng-repeat="boleiro in boleiros | orderBy:[\'-pontos\',\'-placares\']" boleiro="boleiro" indice="{{$index}}"><carrossel total-paginas="38" boleiro="boleiro"><pagina ng-repeat="rodada in boleiro.rodadas" conteudo="rodada"><form ng-submit="atualizar(boleiro, rodada.id)"><table class="rodada"><tr class="cabecalho-pagina"><td colspan="3">Mandante</td><td></td><td colspan="3">Visitante</td></tr><tr ng-repeat="jogo in rodada.jogos"><td class="time-escudo"><img ng-src="assets/images/times/{{jogo._source.mandante}}1.png"></td><td class="time-nome">{{jogo._source.mandante}}</td><td class="time-placar"><palpite jogo-data="{{jogo._source.rodadas_data}}" gols="jogo._source.mandante_gols"></palpite></td><td>x</td><td class="time-placar"><palpite jogo-data="{{jogo._source.rodadas_data}}" gols="jogo._source.visitante_gols"></palpite></td><td class="time-nome">{{jogo._source.visitante}}</td><td class="time-escudo"><img ng-src="assets/images/times/{{jogo._source.visitante}}1.png"></td></tr></table><input ng-show="ehAtualizavel(rodada)" type="submit" id="submit" value="Atualizar" stop-event="touchend click"></form></pagina></carrossel></item></acordeon>'),o.put("app/parcial/menu.html",'<div ng-controller="MenuCtrl" class="{{menuActive}}"><header><span class="menu-anchor" ng-click="abrir()"></span><h1><a href="#">Bolão dos Combinados</a></h1></header><div class="menu-main"><figure><img ng-src="launcher-icon-2x.png"></figure><ul><li><a ng-controller="LoginCtrl" ng-click="authenticate(\'google\')">Login</a></li><li><a href="adm">Administracao</a></li><li><a href="adm-flex">Admin-Flex</a></li><li><a ng-controller="PerfilCtrl" ng-click="cadastrar()">Cadastro</a></li></ul></div></div>'),o.put("components/acordeon/diretivas/diretiva-acordeon.html",'<div class="acordeon main" ng-transclude=""></div>'),o.put("components/acordeon/diretivas/diretiva-item.html",'<div class="item {{situacao}}"><div class="item-cabecalho {{situacao}} {{tipo}}" ng-click="abrir(indice)"><figure><img ng-src="{{boleiro.foto}}"> <img ng-src="assets/images/times/Flamengo.png"><figcaption>Meu campeão: 10 pontos</figcaption></figure><div class="nome">{{boleiro.boleiro}}</div><div class="valores">Pontos<br>{{boleiro.pontos}}</div><div class="valores">Placares<br>{{boleiro.placares}}</div></div><div ng-transclude=""></div></div>'),o.put("components/acordeon/diretivas/diretiva-palpite.html",'<div><span ng-show="somenteLeitura">{{gols}}</span> <input ng-show="!somenteLeitura" type="number" min="0" ng-model="gols" stop-event="touchend click"></div>'),o.put("components/carrossel/diretivas/diretiva-carrossel.html",'<div class="carrossel"><nav class="navegacao"><ul class="pontos"><li class="ponto" ng-class="{\'ativo\':ehPaginaAtual($index + 1)}" ng-repeat="pagina in (0|number:totalPaginas - 2 ) track by $index" ng-click="atualizarPagina($index + 1);">{{$index + 1}}</li></ul></nav><div ng-transclude="" class="paginas {{direcao}}" ng-swipe-left="paginaAnterior()" ng-swipe-right="proximaPagina()"></div><a class="seta anterior" ng-click="paginaAnterior()"></a> <a class="seta proxima" ng-click="proximaPagina()"></a></div>'),o.put("components/carrossel/diretivas/diretiva-paginas.html",'<div class="pagina" ng-hide="!visivel"><div class="conteudo" ng-transclude="" ng-click="alternarDetalhe()"></div><div ng-click="alternarDetalhe()" class="detalhe" ng-class="{ocultar : !detalheVisivel}"><table class="detalhe-rodada"><tr><td class="cabecalho-detalhe-rodada" colspan="4">Detalhes da Rodada</td></tr><tr><td class="esquerda">Número:</td><td class="esquerda">{{conteudo.id}}</td><td class="esquerda">Total de Pontos:</td><td class="direita">{{conteudo.pontos}}</td></tr><tr><td class="esquerda">Data:</td><td class="esquerda">{{conteudo.data | date : \'dd/MM/yyyy\'}}</td><td class="esquerda">Total de Placares:</td><td class="direita">{{conteudo.placares}}</td></tr></table></div></div>')}]);