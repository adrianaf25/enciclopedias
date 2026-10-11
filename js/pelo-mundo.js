// Pelo Mundo: agrupa obras por continente, botões sobre o mapa
(function () {
  var obras = window.TIMELINE_OBRAS || [];
  var enciclopedias = window.ENCICLOPEDIAS || [];
  var mapaContainer = document.getElementById('mapa-container');
  if (!mapaContainer) return;

  var CONTINENTES = {
    'europa': 'Europa',
    'asia': 'Ásia',
    'africa': 'África',
    'america-norte': 'América do Norte'
  };

  var PAIS_CONTINENTE = {
    'Grécia': 'europa', 'Grécia (Atenas)': 'europa',
    'Itália': 'europa', 'Provavelmente Itália': 'europa', 'Itália (atual)': 'europa',
    'Espanha': 'europa', 'França': 'europa', 'Alemanha': 'europa', 'Alemanha (atual)': 'europa',
    'Suíça': 'europa', 'Suíça (atual)': 'europa',
    'Países Baixos': 'europa', 'Reino Unido': 'europa', 'Reino Unido (atual)': 'europa',
    'Escócia, Reino Unido': 'europa',
    'Império Bizantino': 'europa',
    'Incerto': 'europa', 'Desconhecido': 'europa',
    'Dinamarca': 'europa', 'Noruega': 'europa', 'Suécia': 'europa',
    'Polónia': 'europa', 'Polónia (atual)': 'europa',
    'Hungria': 'europa', 'Hungria (atual)': 'europa',
    'Bulgária': 'europa', 'Chéquia (atual)': 'europa',
    'Croácia (atual)': 'europa', 'Estónia (atual)': 'europa',
    'Roménia (atual)': 'europa', 'Portugal': 'europa',
    'Rússia': 'europa', 'Rússia (atual)': 'europa',
    'Rússia (atual) / Alemanha (atual)': 'europa',
    'Reino Unido / Estados Unidos': 'europa',
    'China': 'asia', 'Indonésia': 'asia', 'Israel': 'asia',
    'Líbano': 'asia', 'Líbano (atual) / Egito': 'asia',
    'Mianmar': 'asia', 'Sri Lanka': 'asia', 'Turquia': 'asia',
    'Cartago, atual Tunísia': 'africa',
    'Egito': 'africa',
    'Estados Unidos': 'america-norte', 'México': 'america-norte'
  };

  var NON_OC_CONTINENTE = {
    'nao_oc1': 'asia', 'nao_oc2': 'asia', 'nao_oc3': 'asia',
    'nao_oc4': 'asia', 'nao_oc5': 'asia', 'nao_oc6': 'asia',
    'nao_oc7': 'asia', 'nao_oc8': 'africa'
  };

  var NON_OC_PAIS = {
    'nao_oc1': 'China', 'nao_oc2': 'Iraque',
    'nao_oc3': 'Uzbequistão', 'nao_oc4': 'China',
    'nao_oc5': 'Iraque', 'nao_oc6': 'China',
    'nao_oc7': 'China', 'nao_oc8': 'Egito'
  };

  var NORMALIZA_PAIS = {
    'Grécia (Atenas)': 'Grécia',
    'Provavelmente Itália': 'Itália',
    'Escócia, Reino Unido': 'Reino Unido',
    'Incerto': 'Desconhecido',
    'Cartago, atual Tunísia': 'Tunísia (Cartago)'
  };

  function getPaisObra(obra) {
    if (NON_OC_PAIS[obra.id]) return NON_OC_PAIS[obra.id];
    var local = obra.fichaData ? obra.fichaData.local : '';
    if (!local) return 'Desconhecido';
    return NORMALIZA_PAIS[local] || local;
  }

  function getContinenteObra(obra) {
    if (NON_OC_CONTINENTE[obra.id]) return NON_OC_CONTINENTE[obra.id];
    var local = obra.fichaData ? obra.fichaData.local : '';
    return PAIS_CONTINENTE[local] || 'europa';
  }

  function getContinenteEnc(enc) {
    return PAIS_CONTINENTE[enc.pais] || 'europa';
  }

  var gruposObras = {};
  var gruposEnc = {};
  Object.keys(CONTINENTES).forEach(function (cid) {
    gruposObras[cid] = [];
    gruposEnc[cid] = [];
  });

  obras.forEach(function (o) {
    var cid = getContinenteObra(o);
    if (gruposObras[cid]) gruposObras[cid].push(o);
  });

  enciclopedias.forEach(function (e) {
    var cid = getContinenteEnc(e);
    if (gruposEnc[cid]) gruposEnc[cid].push(e);
  });

  // Painel outras
  var painelOutras = document.getElementById('outras-painel');
  var painelTitulo = document.getElementById('outras-painel-titulo');
  var painelLista = document.getElementById('outras-painel-lista');
  var painelClose = document.getElementById('outras-painel-close');

  function abrirOutras(continenteNome, lista) {
    painelTitulo.textContent = continenteNome + ' — Outras enciclopédias';
    painelLista.innerHTML = '';
    var porPais = {};
    lista.forEach(function (enc) {
      var p = enc.pais || 'Desconhecido';
      if (!porPais[p]) porPais[p] = [];
      porPais[p].push(enc);
    });
    Object.keys(porPais).sort().forEach(function (pais) {
      var grupo = document.createElement('div');
      grupo.className = 'outras-pais-grupo';
      var paisNome = document.createElement('div');
      paisNome.className = 'outras-pais-nome';
      paisNome.textContent = pais;
      grupo.appendChild(paisNome);
      porPais[pais].forEach(function (enc) {
        var li = document.createElement('li');
        var tit = document.createElement('div');
        tit.className = 'outras-titulo';
        tit.textContent = enc.titulo;
        li.appendChild(tit);
        if (enc.autor) {
          var aut = document.createElement('div');
          aut.className = 'outras-autor';
          aut.textContent = enc.autor;
          li.appendChild(aut);
        }
        var ano = document.createElement('div');
        ano.className = 'outras-ano';
        ano.textContent = enc.ano;
        li.appendChild(ano);
        grupo.appendChild(li);
      });
      painelLista.appendChild(grupo);
    });
    painelOutras.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function fecharOutras() {
    painelOutras.classList.remove('active');
    document.body.style.overflow = '';
  }

  painelClose.addEventListener('click', fecharOutras);
  painelOutras.addEventListener('click', function (e) {
    if (e.target === painelOutras) fecharOutras();
  });

  // Painel do continente selecionado
  var painel = document.getElementById('continente-painel');
  var painelTituloEl = document.getElementById('continente-painel-titulo');
  var painelBotoes = document.getElementById('mundo-botoes');
  var painelFechar = document.getElementById('continente-painel-fechar');
  var mapaBtns = mapaContainer.querySelectorAll('.mapa-btn');
  var continenteAtivo = null;

  function abrirContinente(cid) {
    var nome = CONTINENTES[cid];
    if (!nome) return;

    if (continenteAtivo === cid) {
      fecharContinente();
      return;
    }

    continenteAtivo = cid;

    mapaBtns.forEach(function (b) {
      b.classList.toggle('ativo', b.getAttribute('data-continente') === cid);
    });

    painelTituloEl.textContent = nome;
    painelBotoes.innerHTML = '';

    var obrasList = gruposObras[cid] || [];
    var encList = gruposEnc[cid] || [];

    // Agrupa obras por país
    var porPais = {};
    var paisOrdem = [];
    obrasList.forEach(function (obra) {
      var pais = getPaisObra(obra);
      if (!porPais[pais]) {
        porPais[pais] = [];
        paisOrdem.push(pais);
      }
      porPais[pais].push(obra);
    });

    paisOrdem.sort(function (a, b) { return a.localeCompare(b, 'pt'); });
    paisOrdem.forEach(function (pais) {
      var secao = document.createElement('div');
      secao.className = 'mundo-pais-grupo';

      var paisLabel = document.createElement('div');
      paisLabel.className = 'mundo-pais-nome';
      paisLabel.textContent = pais;
      secao.appendChild(paisLabel);

      var botoes = document.createElement('div');
      botoes.className = 'mundo-botoes';

      porPais[pais].forEach(function (obra) {
        var btn = document.createElement('button');
        btn.className = 'mundo-botao';
        btn.type = 'button';
        btn.title = obra.nome;
        var img = document.createElement('img');
        img.src = obra.thumb;
        img.alt = obra.nome;
        img.loading = 'lazy';
        btn.appendChild(img);
        var label = document.createElement('span');
        label.className = 'mundo-botao-nome';
        label.textContent = obra.nome;
        btn.appendChild(label);
        btn.addEventListener('click', function () { abrirCarrossel(obra); });
        botoes.appendChild(btn);
      });

      secao.appendChild(botoes);
      painelBotoes.appendChild(secao);
    });

    if (encList.length) {
      var outrasSecao = document.createElement('div');
      outrasSecao.className = 'mundo-pais-grupo';
      var outrasLabel = document.createElement('div');
      outrasLabel.className = 'mundo-pais-nome';
      outrasLabel.textContent = 'Outras enciclopédias';
      outrasSecao.appendChild(outrasLabel);

      var outrasBotoes = document.createElement('div');
      outrasBotoes.className = 'mundo-botoes';
      var btnOutras = document.createElement('button');
      btnOutras.className = 'mundo-botao-outras';
      btnOutras.type = 'button';
      btnOutras.title = 'Outras enciclopédias';
      var circulo = document.createElement('div');
      circulo.className = 'mundo-outras-circulo';
      btnOutras.appendChild(circulo);
      var labelOutras = document.createElement('span');
      labelOutras.className = 'mundo-botao-nome';
      labelOutras.textContent = 'Ver lista (' + encList.length + ')';
      btnOutras.appendChild(labelOutras);
      (function (n, l) {
        btnOutras.addEventListener('click', function () { abrirOutras(n, l); });
      })(nome, encList);
      outrasBotoes.appendChild(btnOutras);
      outrasSecao.appendChild(outrasBotoes);
      painelBotoes.appendChild(outrasSecao);
    }

    painel.classList.add('aberto');
    painel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function fecharContinente() {
    continenteAtivo = null;
    mapaBtns.forEach(function (b) { b.classList.remove('ativo'); });
    painel.classList.remove('aberto');
    painelBotoes.innerHTML = '';
  }

  mapaBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      abrirContinente(btn.getAttribute('data-continente'));
    });
  });

  painelFechar.addEventListener('click', fecharContinente);

  // Esconde botões de continentes sem dados
  mapaBtns.forEach(function (btn) {
    var cid = btn.getAttribute('data-continente');
    var total = (gruposObras[cid] || []).length + (gruposEnc[cid] || []).length;
    if (!total) btn.style.display = 'none';
  });

  var abrirCarrossel = window._carrossel ? window._carrossel.abrir : function () {};

  document.addEventListener('keydown', function (e) {
    if (painelOutras.classList.contains('active') && e.key === 'Escape') {
      fecharOutras();
    }
  });
})();
