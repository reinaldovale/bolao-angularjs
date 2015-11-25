angular.module("bolao").run(["$templateCache", function($templateCache) {$templateCache.put("app/parcial/adm-flex.html","<section class=\"adm\"><nav><div ng-repeat=\"pagina in (0|number:38 - 2 ) track by $index\">{{$index + 1}}</div></nav><header><div>Mandante</div><div>Placar</div><div>Visitante</div></header><div class=\"jogos\"><article class=\"jogo\" ng-repeat=\"jogo in gabarito.rodadas[0].jogos\"><div class=\"escudo\"><img ng-src=\"assets/images/times/{{jogo._source.mandante}}.png\"></div><div>{{jogo._source.mandante}}</div><div class=\"placar\">{{jogo._source.mandante_gols}}</div><div class=\"placar\">x</div><div class=\"placar\">{{jogo._source.visitante_gols}}</div><div>{{jogo._source.visitante}}</div><div class=\"escudo\"><img ng-src=\"assets/images/times/{{jogo._source.visitante}}.png\"></div></article></div><footer><div>Número: {{conteudo.id}}</div><div>Total de Pontos: {{conteudo.pontos}}</div><div>Data: {{conteudo.data | date : \'dd/MM/yyyy\'}}</div><div>Total de Placares: {{conteudo.placares}}</div><br><a href=\"/\">Início</a></footer></section>");
$templateCache.put("app/parcial/adm.html","<nav><ul layout=\"row\" layout-wrap=\"\" layout-align=\"center center\"><li flex=\"2\" class=\"ponto\" ng-repeat=\"pagina in (0|number:38 - 2 ) track by $index\">{{$index + 1}}</li></ul></nav><session layout=\"column\" class=\"jogos\"><header layout=\"row\"><div flex=\"40\" class=\"dois\">Mandante</div><div flex=\"20\">Placar</div><div flex=\"40\" class=\"dois\">Visitante</div></header><article layout=\"row\" ng-repeat=\"jogo in gabarito.rodadas[0].jogos\"><div flex=\"15\" class=\"um\"><img ng-src=\"assets/images/times/{{jogo._source.mandante}}.png\"></div><div flex=\"20\" class=\"dois\">{{jogo._source.mandante}}</div><div flex=\"10\" class=\"um\">{{jogo._source.mandante_gols}}</div><div flex=\"10\">x</div><div flex=\"10\" class=\"dois\">{{jogo._source.visitante_gols}}</div><div flex=\"20\" class=\"um\">{{jogo._source.visitante}}</div><div flex=\"15\" class=\"dois\"><img ng-src=\"assets/images/times/{{jogo._source.visitante}}.png\"></div></article></session><footer><header layout=\"row\"><div flex=\"\">Número:</div><div flex=\"\">Total de Pontos:</div><div flex=\"\">Data:</div><div flex=\"\">Total de Placares:</div></header><session><div>{{conteudo.id}}</div><div>{{conteudo.pontos}}</div><div>{{conteudo.data | date : \'dd/MM/yyyy\'}}</div><div>{{conteudo.placares}}</div></session><a href=\"/\">Início</a></footer>");
$templateCache.put("app/parcial/inicio.html","<div ng-include=\"\'app/parcial/menu.html\'\"></div><acordeon class=\"conteiner-itens hbox space-between\"><item ng-repeat=\"boleiro in boleiros | orderBy:[\'-pontos\',\'-placares\']\" boleiro=\"boleiro\" indice=\"{{$index}}\"><carrossel total-paginas=\"38\" boleiro=\"boleiro\"><pagina ng-repeat=\"rodada in boleiro.rodadas\" conteudo=\"rodada\"><form ng-submit=\"atualizar(boleiro, rodada.id)\"><table class=\"rodada\"><tr class=\"cabecalho-pagina\"><td colspan=\"3\">Mandante</td><td></td><td colspan=\"3\">Visitante</td></tr><tr ng-repeat=\"jogo in rodada.jogos\"><td class=\"time-escudo\"><img ng-src=\"assets/images/times/{{jogo._source.mandante}}1.png\"></td><td class=\"time-nome\">{{jogo._source.mandante}}</td><td class=\"time-placar\"><palpite jogo-data=\"{{jogo._source.rodadas_data}}\" gols=\"jogo._source.mandante_gols\"></palpite></td><td>x</td><td class=\"time-placar\"><palpite jogo-data=\"{{jogo._source.rodadas_data}}\" gols=\"jogo._source.visitante_gols\"></palpite></td><td class=\"time-nome\">{{jogo._source.visitante}}</td><td class=\"time-escudo\"><img ng-src=\"assets/images/times/{{jogo._source.visitante}}1.png\"></td></tr></table><input ng-show=\"ehAtualizavel(rodada)\" type=\"submit\" id=\"submit\" value=\"Atualizar\" stop-event=\"touchend click\"></form></pagina></carrossel></item></acordeon>");
$templateCache.put("app/parcial/menu.html","<div ng-controller=\"MenuCtrl\" class=\"{{menuActive}}\"><header><span class=\"menu-anchor\" ng-click=\"abrir()\"></span><h1><a href=\"#\">Bolão dos Combinados</a></h1></header><div class=\"menu-main\"><figure><img ng-src=\"launcher-icon-2x.png\"></figure><ul><li><a ng-controller=\"LoginCtrl\" ng-click=\"authenticate(\'google\')\">Login</a></li><li><a href=\"adm\">Administracao</a></li><li><a ng-controller=\"PerfilCtrl\" ng-click=\"cadastrar()\">Cadastro</a></li></ul></div></div>");
$templateCache.put("components/acordeon/diretivas/diretiva-acordeon.html","<div class=\"acordeon main\" ng-transclude=\"\"></div>");
$templateCache.put("components/acordeon/diretivas/diretiva-item.html","<div class=\"item {{situacao}}\"><div class=\"item-cabecalho {{situacao}} {{tipo}}\" ng-click=\"abrir(indice)\"><figure><img ng-src=\"{{boleiro.foto}}\"> <img ng-src=\"assets/images/times/Flamengo.png\"><figcaption>Meu campeão: 10 pontos</figcaption></figure><div class=\"nome\">{{boleiro.boleiro}}</div><div class=\"valores\">Pontos<br>{{boleiro.pontos}}</div><div class=\"valores\">Placares<br>{{boleiro.placares}}</div></div><div ng-transclude=\"\"></div></div>");
$templateCache.put("components/acordeon/diretivas/diretiva-palpite.html","<div><span ng-show=\"somenteLeitura\">{{gols}}</span> <input ng-show=\"!somenteLeitura\" type=\"number\" min=\"0\" ng-model=\"gols\" stop-event=\"touchend click\"></div>");
$templateCache.put("components/carrossel/diretivas/diretiva-carrossel.html","<div class=\"carrossel\"><nav class=\"navegacao\"><ul class=\"pontos\"><li class=\"ponto\" ng-class=\"{\'ativo\':ehPaginaAtual($index + 1)}\" ng-repeat=\"pagina in (0|number:totalPaginas - 2 ) track by $index\" ng-click=\"atualizarPagina($index + 1);\">{{$index + 1}}</li></ul></nav><div ng-transclude=\"\" class=\"paginas {{direcao}}\" ng-swipe-left=\"paginaAnterior()\" ng-swipe-right=\"proximaPagina()\"></div><a class=\"seta anterior\" ng-click=\"paginaAnterior()\"></a> <a class=\"seta proxima\" ng-click=\"proximaPagina()\"></a></div>");
$templateCache.put("components/carrossel/diretivas/diretiva-paginas.html","<div class=\"pagina\" ng-hide=\"!visivel\"><div class=\"conteudo\" ng-transclude=\"\" ng-click=\"alternarDetalhe()\"></div><div ng-click=\"alternarDetalhe()\" class=\"detalhe\" ng-class=\"{ocultar : !detalheVisivel}\"><table class=\"detalhe-rodada\"><tr><td class=\"cabecalho-detalhe-rodada\" colspan=\"4\">Detalhes da Rodada</td></tr><tr><td class=\"esquerda\">Número:</td><td class=\"esquerda\">{{conteudo.id}}</td><td class=\"esquerda\">Total de Pontos:</td><td class=\"direita\">{{conteudo.pontos}}</td></tr><tr><td class=\"esquerda\">Data:</td><td class=\"esquerda\">{{conteudo.data | date : \'dd/MM/yyyy\'}}</td><td class=\"esquerda\">Total de Placares:</td><td class=\"direita\">{{conteudo.placares}}</td></tr></table></div></div>");}]);