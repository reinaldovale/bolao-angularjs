angular.module("bolao").run(["$templateCache", function($templateCache) {$templateCache.put("components/navbar/navbar.html","<nav class=\"navbar\" ng-controller=\"NavbarCtrl\"><a href=\"https://github.com/Swiip/generator-gulp-angular\">Gulp Angular</a><ul><li class=\"active\"><a ng-href=\"#\">Home</a></li><li><a ng-href=\"#\">About</a></li><li><a ng-href=\"#\">Contact</a></li></ul><ul><li><a ng-href=\"#\">Current date: {{ date | date:\'yyyy-MM-dd\' }}</a></li></ul></nav>");
$templateCache.put("components/acordeon/diretivas/diretiva-acordeon.html","<div class=\"acordeon main\" ng-transclude=\"\"></div>");
$templateCache.put("components/acordeon/diretivas/diretiva-item.html","<div class=\"item {{situacao}}\"><div class=\"item-cabecalho {{situacao}} {{tipo}}\" ng-click=\"abrir(indice)\"><figure><img ng-src=\"{{boleiro.foto}}\"> <img ng-src=\"assets/images/times/Flamengo.png\"><figcaption>Meu campeão: 10 pontos</figcaption></figure><div class=\"nome\">{{boleiro.boleiro}}</div><div class=\"valores\">Pontos<br>{{boleiro.pontos}}</div><div class=\"valores\">Placares<br>{{boleiro.placares}}</div></div><div ng-transclude=\"\"></div></div>");
$templateCache.put("components/acordeon/diretivas/diretiva-palpite.html","<div><span ng-show=\"somenteLeitura\">{{gols}}</span> <input ng-show=\"!somenteLeitura\" type=\"number\" min=\"0\" ng-model=\"gols\" stop-event=\"touchend click\"></div>");
$templateCache.put("components/carrossel/diretivas/diretiva-carrossel.html","<div class=\"carrossel\"><nav class=\"navegacao\"><ul class=\"pontos\"><li class=\"ponto\" ng-class=\"{\'ativo\':ehPaginaAtual($index + 1)}\" ng-repeat=\"pagina in (0|number:totalPaginas - 2 ) track by $index\" ng-click=\"atualizarPagina($index + 1);\">{{$index + 1}}</li></ul></nav><div ng-transclude=\"\" class=\"paginas {{direcao}}\" ng-swipe-left=\"paginaAnterior()\" ng-swipe-right=\"proximaPagina()\"></div><a class=\"seta anterior\" ng-click=\"paginaAnterior()\"></a> <a class=\"seta proxima\" ng-click=\"proximaPagina()\"></a></div>");
$templateCache.put("components/carrossel/diretivas/diretiva-paginas.html","<div class=\"pagina\" ng-hide=\"!visivel\"><div class=\"conteudo\" ng-transclude=\"\" ng-click=\"alternarDetalhe()\"></div><div ng-click=\"alternarDetalhe()\" class=\"detalhe\" ng-class=\"{ocultar : !detalheVisivel}\"><table class=\"detalhe-rodada\"><tr><td class=\"cabecalho-detalhe-rodada\" colspan=\"4\">Detalhes da Rodada</td></tr><tr><td class=\"esquerda\">Número:</td><td class=\"esquerda\">{{conteudo.id}}</td><td class=\"esquerda\">Total de Pontos:</td><td class=\"direita\">{{conteudo.pontos}}</td></tr><tr><td class=\"esquerda\">Data:</td><td class=\"esquerda\">{{conteudo.data | date : \'dd/MM/yyyy\'}}</td><td class=\"esquerda\">Total de Placares:</td><td class=\"direita\">{{conteudo.placares}}</td></tr></table></div></div>");}]);