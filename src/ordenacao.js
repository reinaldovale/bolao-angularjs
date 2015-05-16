// var participantes = [1, 2, 10, 4, 2, 1, 7, 7, 10, 4, 2, 10, 5, 8, 8, 8, 6, 6];

var Premiados = (function() {
  var premiados = [],
  rebaixados = [],
  normais = [],
  controle = 3,
  controleR = 2,
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
    else {
      min = x;
    }
    
    if(ehRepetido) {
      premiados.push(x);
    }
    else {      
      controle--;
      if(controle < 0) {
        normalizarControle(x);
      }
      else {
        premiados.push(x);
      }
    }
  },
  
  normalizarControle = function(x) {
    var novoMin = max;
    
    for(var p = 0; p < premiados.length; p++) {      
      if(premiados[p] === min) {
        verificarRebaixado(premiados.splice(p, 1)[0]);
      }
      if (novoMin > premiados[p]) {
        novoMin = premiados[p];
      } 
    }
    controle++;
    min = novoMin > x ? x : novoMin;
    premiados.push(x);
  },

  verificarRebaixado = function(x) {
    var adicionar = false;
    if(controleR > 0) {
      rebaixados.push(x);
      controleR--;
    }
    else {
      var remover = [];
      var maior = 0;
      for(var i=0; i< rebaixados.length; i++) {
        if(rebaixados[i] === x) {
          adicionar = true;
          break;
        }
        else if(rebaixados[i] > x) {
          adicionar = true;
          maior = (rebaixados[i] > maior) ? rebaixados[i] : maior;          
        }
      }

      if(maior > 0){
        removeAll(rebaixados, maior);
      }
      if(adicionar) {
        rebaixados.push(x);
      }
      else {
        normais.push(x);
      }
    }
  },
  removeAll = function(array, valor) {
    for(var i = array.length; i--;) {
      if (array[i] === valor) {
        normais.push(array.splice(i, 1)[0]);
      }
    }
  };
  
  return {
    destacarPremiados: function(participantes) {
      for(var i = 0; i < participantes.length; i++) {
        verificaPremiado(participantes[i]);
      }

      var b = {},
      teste = 'Reinaldo';


      for(var i = 6; i--;) {
        b[teste] = b[teste] ? b[teste] + 1 : i;
        console.log("\t teste  \t\t", b);
      }
      console.log("\n teste  \t\t", b);


     // console.log(participantes.length + "\t Participantes  \t", participantes);
     // console.log(premiados.length + "\t Premiados  \t\t", premiados);
     // console.log(normais.length + "\t Normais  \t\t\t", normais);
     // console.log(rebaixados.length + "\t Rebaixados  \t\t", rebaixados);
    }
  };  
})();

var participantes = [4, 3, 1, 2, 10, 4, 2, 1, 7, 0, 7, 10, 4, 2, 10, 5, 8, 8, 8, 6, 6, 0, 2];
Premiados.destacarPremiados(participantes);