angular.module("bolao").run(["$templateCache", function($templateCache) {$templateCache.put("app/parcial/inicio.html","<acordeon class=\"conteiner-itens hbox space-between\"><item ng-repeat=\"boleiro in boleiros | orderBy:[\'-pontos\',\'-placares\']\" boleiro=\"boleiro\" indice=\"{{$index}}\"><carrossel total-paginas=\"38\" boleiro=\"boleiro\"><pagina ng-repeat=\"rodada in boleiro.rodadas\" conteudo=\"rodada\"><form ng-submit=\"atualizar(boleiro, rodada.id)\"><table class=\"rodada\"><tr class=\"cabecalho-pagina\"><td colspan=\"3\">Mandante</td><td></td><td colspan=\"3\">Visitante</td></tr><tr ng-repeat=\"jogo in rodada.jogos\"><td class=\"time-escudo\"><img ng-src=\"assets/images/times/{{jogo._source.mandante}}1.png\"></td><td class=\"time-nome\">{{jogo._source.mandante}}</td><td class=\"time-placar\"><palpite jogo-data=\"{{jogo._source.rodadas_data}}\" gols=\"jogo._source.mandante_gols\"></palpite></td><td>x</td><td class=\"time-placar\"><palpite jogo-data=\"{{jogo._source.rodadas_data}}\" gols=\"jogo._source.visitante_gols\"></palpite></td><td class=\"time-nome\">{{jogo._source.visitante}}</td><td class=\"time-escudo\"><img ng-src=\"assets/images/times/{{jogo._source.visitante}}1.png\"></td></tr></table><input ng-show=\"ehAtualizavel(rodada)\" type=\"submit\" id=\"submit\" value=\"Atualizar\" stop-event=\"touchend click\"></form></pagina></carrossel></item></acordeon>");
$templateCache.put("app/parcial/adm/adm-flex.html","<nav><div ng-repeat=\"rodada in (0|number:38 - 2 ) track by $index\" ng-click=\"atualizarRodada($index + 1);\" ng-class=\"{\'ativo\':($index + 1) == rodadaAtual.id}\">{{$index + 1}}</div></nav><header><div>Mandante</div><div>Placar</div><div>Visitante</div></header><div class=\"jogos\" ng-show=\"estaCarregando\"><img class=\"buiu\" ng-src=\"assets/images/buiu.gif\"></div><div class=\"jogos\" ng-repeat=\"rodada in gabarito.rodadas\" ng-show=\"rodada.rodadaAtiva\"><article class=\"jogo\" ng-repeat=\"jogo in rodada.jogos\"><div class=\"escudo\"><img ng-src=\"assets/images/times/MarcaSerpro.gif\"></div><div>{{jogo._source.mandante}}</div><div class=\"placar\">{{jogo._source.mandante_gols}}</div><div class=\"placar\">x</div><div class=\"placar\">{{jogo._source.visitante_gols}}</div><div>{{jogo._source.visitante}}</div><div class=\"escudo\"><img ng-src=\"assets/images/times/MarcaSerpro.gif\"></div></article></div><footer><div>Número: {{rodadaAtual.id}}</div><div>Total de Pontos: {{rodadaAtual.pontos}}</div><div>Data: {{rodadaAtual.data | date : \'dd/MM/yyyy\'}}</div><div>Total de Placares: {{rodadaAtual.placares}}</div><div><a href=\"/\">Início</a></div></footer>");
$templateCache.put("app/parcial/adm/adm.html","<nav><ul layout=\"row\" layout-wrap=\"\" layout-align=\"center center\"><li flex=\"2\" class=\"ponto\" ng-repeat=\"pagina in (0|number:38 - 2 ) track by $index\">{{$index + 1}}</li></ul></nav><session layout=\"column\" class=\"jogos\"><header layout=\"row\"><div flex=\"40\" class=\"dois\">Mandante</div><div flex=\"20\">Placar</div><div flex=\"40\" class=\"dois\">Visitante</div></header><article layout=\"row\" ng-repeat=\"jogo in gabarito.rodadas[0].jogos\"><div flex=\"15\" class=\"um\"><img ng-src=\"assets/images/times/{{jogo._source.mandante}}.png\"></div><div flex=\"20\" class=\"dois\">{{jogo._source.mandante}}</div><div flex=\"10\" class=\"um\">{{jogo._source.mandante_gols}}</div><div flex=\"10\">x</div><div flex=\"10\" class=\"dois\">{{jogo._source.visitante_gols}}</div><div flex=\"20\" class=\"um\">{{jogo._source.visitante}}</div><div flex=\"15\" class=\"dois\"><img ng-src=\"assets/images/times/{{jogo._source.visitante}}.png\"></div></article></session><footer><header layout=\"row\"><div flex=\"\">Número:</div><div flex=\"\">Total de Pontos:</div><div flex=\"\">Data:</div><div flex=\"\">Total de Placares:</div></header><session><div>{{conteudo.id}}</div><div>{{conteudo.pontos}}</div><div>{{conteudo.data | date : \'dd/MM/yyyy\'}}</div><div>{{conteudo.placares}}</div></session><a href=\"/\">Início</a></footer>");
$templateCache.put("app/parcial/home/home.html","<div class=\"mdl-grid demo-content\"><div class=\"demo-cards mdl-cell mdl-cell--12-col mdl-grid\"><div class=\"demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col\"><div class=\"mdl-card__title mdl-card--expand mdl-color--grey-900\"><h2 class=\"mdl-card__title-text\">Reinaldo</h2></div><div class=\"mdl-card__actions mdl-card--border\"><a href=\"#\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">Pontos</a> <span class=\"mdl-badge\" data-badge=\"350\"></span> <a href=\"#\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">Placares</a> <span class=\"mdl-badge\" data-badge=\"50\"></span></div><div class=\"mdl-card__menu demo-card__menu--left\"><button class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect\"><img src=\"app/parcial/home/images/Reinaldo.jpg\" class=\"demo-avatar--home\"></button></div></div><div class=\"demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col\"><div class=\"mdl-card__title mdl-card--expand mdl-color--teal-300\"><h2 class=\"mdl-card__title-text\">Updates</h2></div><div class=\"mdl-card__supporting-text mdl-color-text--grey-600\">Non dolore elit adipisicing ea reprehenderit consectetur culpa.</div><div class=\"mdl-card__actions mdl-card--border\"><a href=\"#\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">Read More</a></div></div><div class=\"demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col\"><div class=\"mdl-card__title mdl-card--expand mdl-color--teal-300\"><h2 class=\"mdl-card__title-text\">Updates</h2></div><div class=\"mdl-card__supporting-text mdl-color-text--grey-600\">Non dolore elit adipisicing ea reprehenderit consectetur culpa.</div><div class=\"mdl-card__actions mdl-card--border\"><a href=\"#\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">Read More</a></div></div><div class=\"demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col\"><div class=\"mdl-card__title mdl-card--expand mdl-color--teal-300\"><h2 class=\"mdl-card__title-text\">Updates</h2></div><div class=\"mdl-card__supporting-text mdl-color-text--grey-600\">Non dolore elit adipisicing ea reprehenderit consectetur culpa.</div><div class=\"mdl-card__actions mdl-card--border\"><a href=\"#\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">Read More</a></div></div><div class=\"demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col\"><div class=\"mdl-card__title mdl-card--expand mdl-color--teal-300\"><h2 class=\"mdl-card__title-text\">Updates</h2></div><div class=\"mdl-card__supporting-text mdl-color-text--grey-600\">Non dolore elit adipisicing ea reprehenderit consectetur culpa.</div><div class=\"mdl-card__actions mdl-card--border\"><a href=\"#\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">Read More</a></div></div><div class=\"demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col\"><div class=\"mdl-card__title mdl-card--expand mdl-color--teal-300\"><h2 class=\"mdl-card__title-text\">Updates</h2></div><div class=\"mdl-card__supporting-text mdl-color-text--grey-600\">Non dolore elit adipisicing ea reprehenderit consectetur culpa.</div><div class=\"mdl-card__actions mdl-card--border\"><a href=\"#\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">Read More</a></div></div><div class=\"demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col\"><div class=\"mdl-card__title mdl-card--expand mdl-color--teal-300\"><h2 class=\"mdl-card__title-text\">Updates</h2></div><div class=\"mdl-card__supporting-text mdl-color-text--grey-600\">Non dolore elit adipisicing ea reprehenderit consectetur culpa.</div><div class=\"mdl-card__actions mdl-card--border\"><a href=\"#\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">Read More</a></div></div><div class=\"demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col\"><div class=\"mdl-card__title mdl-card--expand mdl-color--teal-300\"><h2 class=\"mdl-card__title-text\">Updates</h2></div><div class=\"mdl-card__supporting-text mdl-color-text--grey-600\">Non dolore elit adipisicing ea reprehenderit consectetur culpa.</div><div class=\"mdl-card__actions mdl-card--border\"><a href=\"#\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">Read More</a></div></div><div class=\"demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col\"><div class=\"mdl-card__title mdl-card--expand mdl-color--teal-300\"><h2 class=\"mdl-card__title-text\">Updates</h2></div><div class=\"mdl-card__supporting-text mdl-color-text--grey-600\">Non dolore elit adipisicing ea reprehenderit consectetur culpa.</div><div class=\"mdl-card__actions mdl-card--border\"><a href=\"#\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">Read More</a></div></div><div class=\"demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col\"><div class=\"mdl-card__title mdl-card--expand mdl-color--teal-300\"><h2 class=\"mdl-card__title-text\">Updates</h2></div><div class=\"mdl-card__supporting-text mdl-color-text--grey-600\">Non dolore elit adipisicing ea reprehenderit consectetur culpa.</div><div class=\"mdl-card__actions mdl-card--border\"><a href=\"#\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">Read More</a></div></div></div></div>");
$templateCache.put("app/parcial/home/home_velho.html","<div class=\"mdl-grid demo-content\"><div class=\"demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid\"><svg fill=\"currentColor\" width=\"200px\" height=\"200px\" viewbox=\"0 0 1 1\" class=\"demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop\"><use xlink:href=\"#piechart\" mask=\"url(#piemask)\"></use><text x=\"0.5\" y=\"0.5\" font-family=\"Roboto\" font-size=\"0.3\" fill=\"#888\" text-anchor=\"middle\" dy=\"0.1\">82<tspan font-size=\"0.2\" dy=\"-0.07\">%</tspan></text></svg><svg fill=\"currentColor\" width=\"200px\" height=\"200px\" viewbox=\"0 0 1 1\" class=\"demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop\"><use xlink:href=\"#piechart\" mask=\"url(#piemask)\"></use><text x=\"0.5\" y=\"0.5\" font-family=\"Roboto\" font-size=\"0.3\" fill=\"#888\" text-anchor=\"middle\" dy=\"0.1\">82<tspan dy=\"-0.07\" font-size=\"0.2\">%</tspan></text></svg><svg fill=\"currentColor\" width=\"200px\" height=\"200px\" viewbox=\"0 0 1 1\" class=\"demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop\"><use xlink:href=\"#piechart\" mask=\"url(#piemask)\"></use><text x=\"0.5\" y=\"0.5\" font-family=\"Roboto\" font-size=\"0.3\" fill=\"#888\" text-anchor=\"middle\" dy=\"0.1\">82<tspan dy=\"-0.07\" font-size=\"0.2\">%</tspan></text></svg><svg fill=\"currentColor\" width=\"200px\" height=\"200px\" viewbox=\"0 0 1 1\" class=\"demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop\"><use xlink:href=\"#piechart\" mask=\"url(#piemask)\"></use><text x=\"0.5\" y=\"0.5\" font-family=\"Roboto\" font-size=\"0.3\" fill=\"#888\" text-anchor=\"middle\" dy=\"0.1\">82<tspan dy=\"-0.07\" font-size=\"0.2\">%</tspan></text></svg></div><div class=\"demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--8-col\"><svg fill=\"currentColor\" viewbox=\"0 0 500 250\" class=\"demo-graph\"><use xlink:href=\"#chart\"></use></svg><svg fill=\"currentColor\" viewbox=\"0 0 500 250\" class=\"demo-graph\"><use xlink:href=\"#chart\"></use></svg></div><div class=\"demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing\"><div class=\"demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop\"><div class=\"mdl-card__title mdl-card--expand mdl-color--teal-300\"><h2 class=\"mdl-card__title-text\">Updates</h2></div><div class=\"mdl-card__supporting-text mdl-color-text--grey-600\">Non dolore elit adipisicing ea reprehenderit consectetur culpa.</div><div class=\"mdl-card__actions mdl-card--border\"><a href=\"#\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">Read More</a></div></div><div class=\"demo-separator mdl-cell--1-col\"></div><div class=\"demo-options mdl-card mdl-color--deep-purple-500 mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop\"><div class=\"mdl-card__supporting-text mdl-color-text--blue-grey-50\"><h3>View options</h3><ul><li><label for=\"chkbox1\" class=\"mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect\"><input type=\"checkbox\" id=\"chkbox1\" class=\"mdl-checkbox__input\"> <span class=\"mdl-checkbox__label\">Click per object</span></label></li><li><label for=\"chkbox2\" class=\"mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect\"><input type=\"checkbox\" id=\"chkbox2\" class=\"mdl-checkbox__input\"> <span class=\"mdl-checkbox__label\">Views per object</span></label></li><li><label for=\"chkbox3\" class=\"mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect\"><input type=\"checkbox\" id=\"chkbox3\" class=\"mdl-checkbox__input\"> <span class=\"mdl-checkbox__label\">Objects selected</span></label></li><li><label for=\"chkbox4\" class=\"mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect\"><input type=\"checkbox\" id=\"chkbox4\" class=\"mdl-checkbox__input\"> <span class=\"mdl-checkbox__label\">Objects viewed</span></label></li></ul></div><div class=\"mdl-card__actions mdl-card--border\"><a href=\"#\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--blue-grey-50\">Change location</a><div class=\"mdl-layout-spacer\"></div><i class=\"material-icons\">location_on</i></div></div></div></div>");
$templateCache.put("app/parcial/menu/header.html","<div class=\"mdl-layout__header-row\"><span class=\"mdl-layout-title\">Home</span><div class=\"mdl-layout-spacer\"></div><div class=\"mdl-textfield mdl-js-textfield mdl-textfield--expandable\"><label class=\"mdl-button mdl-js-button mdl-button--icon\" for=\"search\"><i class=\"material-icons\">search</i></label><div class=\"mdl-textfield__expandable-holder\"><input class=\"mdl-textfield__input\" type=\"text\" id=\"search\"> <label class=\"mdl-textfield__label\" for=\"search\">Enter your query...</label></div></div><button class=\"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon\" id=\"hdrbtn\"><i class=\"material-icons\">more_vert</i></button><ul class=\"mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right\" for=\"hdrbtn\"><li class=\"mdl-menu__item\">About</li><li class=\"mdl-menu__item\">Contact</li><li class=\"mdl-menu__item\">Legal information</li></ul></div>");
$templateCache.put("app/parcial/menu/menu.html","<header class=\"demo-drawer-header\"><img src=\"app/parcial/home/images/user.jpg\" class=\"demo-avatar\"><div class=\"demo-avatar-dropdown\"><span>hello@example.com</span><div class=\"mdl-layout-spacer\"></div><button id=\"accbtn\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon\"><i class=\"material-icons\" role=\"presentation\">arrow_drop_down</i> <span class=\"visuallyhidden\">Accounts</span></button><ul class=\"mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect\" for=\"accbtn\"><li class=\"mdl-menu__item\">hello@example.com</li><li class=\"mdl-menu__item\">info@example.com</li><li class=\"mdl-menu__item\"><i class=\"material-icons\">add</i>Add another account...</li></ul></div></header><nav class=\"demo-navigation mdl-navigation mdl-color--blue-grey-800\"><a class=\"mdl-navigation__link\" href=\"/\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">home</i>Home</a> <a class=\"mdl-navigation__link\" href=\"adm-flex\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">inbox</i>Inbox</a> <a class=\"mdl-navigation__link\" href=\"\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">delete</i>Trash</a> <a class=\"mdl-navigation__link\" href=\"\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">report</i>Spam</a> <a class=\"mdl-navigation__link\" href=\"\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">forum</i>Forums</a> <a class=\"mdl-navigation__link\" href=\"\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">flag</i>Updates</a> <a class=\"mdl-navigation__link\" href=\"\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">local_offer</i>Promos</a> <a class=\"mdl-navigation__link\" href=\"\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">shopping_cart</i>Purchases</a> <a class=\"mdl-navigation__link\" href=\"\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">people</i>Social</a><div class=\"mdl-layout-spacer\"></div><a class=\"mdl-navigation__link\" href=\"\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">help_outline</i><span class=\"visuallyhidden\">Help</span></a></nav>");
$templateCache.put("app/parcial/menu/menu_velho.html","<div ng-controller=\"MenuCtrl\" class=\"{{menuActive}}\"><header><span class=\"menu-anchor\" ng-click=\"abrir()\"></span><h1><a href=\"#\">Bolão dos Combinados</a></h1></header><div class=\"menu-main\"><figure><img ng-src=\"launcher-icon-2x.png\"></figure><ul><li><a ng-controller=\"LoginCtrl\" ng-click=\"authenticate(\'google\')\">Login</a></li><li><a href=\"adm\">Administracao</a></li><li><a href=\"adm-flex\">Admin-Flex</a></li><li><a href=\"teste\">Teste</a></li><li><a ng-controller=\"PerfilCtrl\" ng-click=\"cadastrar()\">Cadastro</a></li></ul></div></div>");
$templateCache.put("components/acordeon/diretivas/diretiva-acordeon.html","<div class=\"acordeon main\" ng-transclude=\"\"></div>");
$templateCache.put("components/acordeon/diretivas/diretiva-item.html","<div class=\"item {{situacao}}\"><div class=\"item-cabecalho {{situacao}} {{tipo}}\" ng-click=\"abrir(indice)\"><figure><img ng-src=\"{{boleiro.foto}}\"> <img ng-src=\"assets/images/times/Flamengo.png\"><figcaption>Meu campeão: 10 pontos</figcaption></figure><div class=\"nome\">{{boleiro.boleiro}}</div><div class=\"valores\">Pontos<br>{{boleiro.pontos}}</div><div class=\"valores\">Placares<br>{{boleiro.placares}}</div></div><div ng-transclude=\"\"></div></div>");
$templateCache.put("components/acordeon/diretivas/diretiva-palpite.html","<div><span ng-show=\"somenteLeitura\">{{gols}}</span> <input ng-show=\"!somenteLeitura\" type=\"number\" min=\"0\" ng-model=\"gols\" stop-event=\"touchend click\"></div>");
$templateCache.put("components/carrossel/diretivas/diretiva-carrossel.html","<div class=\"carrossel\"><nav class=\"navegacao\"><ul class=\"pontos\"><li class=\"ponto\" ng-class=\"{\'ativo\':ehPaginaAtual($index + 1)}\" ng-repeat=\"pagina in (0|number:totalPaginas - 2 ) track by $index\" ng-click=\"atualizarPagina($index + 1);\">{{$index + 1}}</li></ul></nav><div ng-transclude=\"\" class=\"paginas {{direcao}}\" ng-swipe-left=\"paginaAnterior()\" ng-swipe-right=\"proximaPagina()\"></div><a class=\"seta anterior\" ng-click=\"paginaAnterior()\"></a> <a class=\"seta proxima\" ng-click=\"proximaPagina()\"></a></div>");
$templateCache.put("components/carrossel/diretivas/diretiva-paginas.html","<div class=\"pagina\" ng-hide=\"!visivel\"><div class=\"conteudo\" ng-transclude=\"\" ng-click=\"alternarDetalhe()\"></div><div ng-click=\"alternarDetalhe()\" class=\"detalhe\" ng-class=\"{ocultar : !detalheVisivel}\"><table class=\"detalhe-rodada\"><tr><td class=\"cabecalho-detalhe-rodada\" colspan=\"4\">Detalhes da Rodada</td></tr><tr><td class=\"esquerda\">Número:</td><td class=\"esquerda\">{{conteudo.id}}</td><td class=\"esquerda\">Total de Pontos:</td><td class=\"direita\">{{conteudo.pontos}}</td></tr><tr><td class=\"esquerda\">Data:</td><td class=\"esquerda\">{{conteudo.data | date : \'dd/MM/yyyy\'}}</td><td class=\"esquerda\">Total de Placares:</td><td class=\"direita\">{{conteudo.placares}}</td></tr></table></div></div>");}]);