// 10, 4, 2, 1, 7, 10, 4


var Premiados = function() {
  var premiados = [],
  controle = 3,
  max = 0,
  min = 0,
  
  verificaPremiado = function(x) {
    if(x >= max) {
      max = x;  
      adicionarPremiado(x);
    }
    else {
      if(x >= min) {
        adicionarPremiado(x);
      }
      else {
        if(controle > 0) {
          min = x;
          adicionarPremiado(x);
        }
        else {
          verificarRebaixado(x);
        }
      }
    }
  },
  
  adicionarPremiado = function(x) {
    var ehRepetido = false;
    if(premiados.length > 0) {
      for(var p = 0; p < premiados.length; p++) {
        if(premiados[p] === x) {
          ehRepetido = true;
          break;
        }
      }
    }
    if(ehRepetido) {
      premiados.push(x);
    }
    else {      
      controle--;
      if(controle < 0) {
        normalizarControle();
      }
      else {
        premiados.push(x);
      }
    }
  },
  
  normalizarControle = function(x) {
    for(var p = 0; p < premiados.length; p++) {
      if(premiados[p] > x) {
        continue;
      }
      else {
        console.log("e agora josé", x);
      }
    }
  };
  
  return {
    destacarPremiados: function(participantes) {
      for(var i = 0; i < participantes.length; i++) {
        verificaPremiado(participantes[i]);
      }
    }
  }  
}

var participantes = [10, 4, 2, 1, 7, 10, 4];

var p = new Premiados();
p.destacarPremiados(participantes);
