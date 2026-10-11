// Código partilhado: buildFichaHTML, carrossel e botão voltar ao topo
(function () {
  var overlay = document.getElementById('carrossel');
  if (!overlay) return;

  var imgEl = document.getElementById('carrossel-img');
  var fichaEl = document.getElementById('ficha-html');
  var btnPrev = document.getElementById('carrossel-prev');
  var btnNext = document.getElementById('carrossel-next');
  var btnClose = document.getElementById('carrossel-close');
  var contador = document.getElementById('carrossel-contador');
  var legendaEl = document.getElementById('carrossel-legenda');

  var slides = [];
  var indice = 0;

  function getLang() { return document.documentElement.lang || 'pt'; }

  var AUTOR_ORIGINAL = {
    'Espeusipo': 'Speusippus',
    'Aristóteles': 'Aristoteles',
    'Catão, o Censor': 'Marcus Porcius Cato',
    'Marco Terêncio Varrão': 'Marcus Terentius Varro',
    'Plínio, o Velho': 'Gaius Plinius Secundus',
    'Caio Júlio Solino': 'Gaius Iulius Solinus',
    'Marciano Capela': 'Martianus Capella',
    'Cassiodoro': 'Cassiodorus',
    'Santo Isidoro de Sevilha': 'Isidorus Hispalensis',
    'Hrabano Mauro': 'Hrabanus Maurus',
    'Miguel Pselo': 'Michael Psellos',
    'Theophilus Presbyter (pseudónimo)': 'Theophilus Presbyter',
    'Honório Augustodunense': 'Honorius Augustodunensis',
    'Hugo de São Vítor': 'Hugo de Sancto Victore',
    'Herrad de Landsberg': 'Herrad von Landsberg',
    'Gervásio de Tilbury': 'Gervasius Tilburiensis',
    'Bartolomeu Inglês': 'Bartholomaeus Anglicus',
    'Vicente de Beauvais': 'Vincentius Bellovacensis',
    'Denis Diderot e Jean le Rond d\'Alembert': 'Denis Diderot et Jean le Rond d\'Alembert',
    'Andrew Bell, Colin Macfarquhar e William Smellie': 'Andrew Bell, Colin Macfarquhar and William Smellie',
    'Löbel e Franke; depois F. A. Brockhaus': 'Löbel und Franke; danach F. A. Brockhaus'
  };

  var TITULO_ORIGINAL = {
    'Léxico Suidas': 'Suda'
  };

  var TITULO_PT = {
    'Praecepta ad Filium': 'Preceitos ao Filho',
    'Disciplinarum libri IX; Rerum divinarum et humanarum antiquitates; Imagines': 'Nove Livros das Disciplinas; Antiguidades Divinas e Humanas; Imagens',
    'Historia Naturalis': 'História Natural',
    'Collectanea rerum memorabilium (Polyhistor)': 'Coleção de Coisas Memoráveis (Polyhistor)',
    'De nuptiis Mercurii et Philologiae': 'Sobre as Núpcias de Mercúrio e da Filologia',
    'Institutiones divinarum et humanarum lectionum': 'Instituições das Leituras Divinas e Humanas',
    'Originum sive Etymologiarum libri XX (Etimologias)': 'Origens ou Etimologias',
    'De universo': 'Sobre o Universo',
    'De omnifaria doctrina': 'Sobre a Doutrina Universal',
    'De diversis artibus (Schedula diversarum artium)': 'Sobre as Diversas Artes (Programa das Diversas Artes)',
    'Liber floridus': 'O Livro Florido',
    'Imago mundi': 'Imagem do Mundo',
    'Didascalicon: de studio legendi': 'Didascálicon: Sobre o Estudo da Leitura',
    'Hortus deliciarum': 'Jardim das Delícias',
    'Otia imperialia (Solatium imperatoris)': 'Ócios Imperiais (Consolo do Imperador)',
    'De proprietatibus rerum': 'Sobre as Propriedades das Coisas',
    'Speculum maius': 'O Grande Espelho',
    'Mappe monde / L\'Image du monde': 'Mapa do Mundo / A Imagem do Mundo',
    'Li livres dou tresor': 'O Livro do Tesouro',
    'Visión deleitable de la filosofía y artes liberales': 'Visão Deleitável da Filosofia e das Artes Liberais',
    'Dictionarium historicum, geographicum et poeticum': 'Dicionário Histórico, Geográfico e Poético',
    'Orbis disciplinarum, tam sacrarum quam prophanarum, epitome': 'Epítome do Mundo das Disciplinas, Sagradas e Profanas',
    'Le grand dictionnaire historique, ou le mélange curieux de l\'histoire sainte et profane': 'O Grande Dicionário Histórico, ou a Mistura Curiosa da História Sagrada e Profana',
    'Dictionnaire universel des arts et sciences': 'Dicionário Universal das Artes e Ciências',
    'Dictionnaire historique et critique': 'Dicionário Histórico e Crítico',
    'Cyclopaedia: or, An universal dictionary of arts and sciences': 'Ciclopédia, ou Dicionário Universal das Artes e Ciências',
    'Encyclopédie, ou Dictionnaire raisonné des sciences, des arts et des métiers': 'Enciclopédia, ou Dicionário Racional das Ciências, Artes e Ofícios',
    'Encyclopaedia Britannica; or, A dictionary of arts and sciences, compiled upon a new plan': 'Enciclopédia Britânica, ou Dicionário de Artes e Ciências, Compilado segundo um Novo Plano',
    'Conversations-Lexikon (Brockhaus)': 'Léxico de Conversação (Brockhaus)'
  };

  var NOME_ORIGINAL = {
    'Espeusipo': 'Speusippus',
    'Aristóteles': 'Aristoteles',
    'Catão': 'Cato',
    'Varrão': 'Varro',
    'Plínio': 'Plinius',
    'Solino': 'Solinus',
    'Marciano Capela': 'Martianus Capella',
    'Cassiodoro': 'Cassiodorus',
    'Isidoro de Sevilha': 'Isidorus Hispalensis',
    'Hrabano Mauro': 'Hrabanus Maurus',
    'Miguel Pselo': 'Michael Psellos',
    'Honório Augustodunense': 'Honorius Augustodunensis',
    'Hugo de São Vítor': 'Hugo de Sancto Victore',
    'Gervásio de Tilbury': 'Gervasius Tilburiensis',
    'Bartolomeu Inglês': 'Bartholomaeus Anglicus',
    'Vicente de Beauvais': 'Vincentius Bellovacensis',
    'Diderot e d\'Alembert': 'Diderot et d\'Alembert',
    'Enc. Britannica': 'Enc. Britannica'
  };

  var SEM_TITULO_ORIGINAL = {
    'Obra enciclopédica (fragmentos)': true,
    'Escritos didáticos do Liceu': true
  };

  var SEM_AUTOR_ORIGINAL = {
    'Desconhecido': true
  };

  var LEGENDA_EN = {
    'Espeusipo - 1493. Rijksmuseum, Netherlands. Public Domain.':
      'Speusippus - 1493. Rijksmuseum, Netherlands. Public Domain.',
    'Espeusipo - Thomas Stanley, 1655, The History of Philosophy. Public domain, via Wikimedia Commons.':
      'Speusippus - Thomas Stanley, 1655, The History of Philosophy. Public domain, via Wikimedia Commons.',
    'Aristóteles - c. 1500. Internet Archive.':
      'Aristotle - c. 1500. Internet Archive.',
    'Catão, o Censor - Dr. Manuel at German Wikipedia. Public domain, via Wikimedia Commons.':
      'Cato the Elder - Dr. Manuel at German Wikipedia. Public domain, via Wikimedia Commons.',
    'Varrão - Andre Thevet. Public domain, via Wikimedia Commons.':
      'Varro - Andre Thevet. Public domain, via Wikimedia Commons.',
    'Plínio, o Velho - Geoffrey, 1850. Public domain, via Wikimedia Commons.':
      'Pliny the Elder - Geoffrey, 1850. Public domain, via Wikimedia Commons.',
    'Solino - 1493. Rijksmuseum, Netherlands. Public Domain.':
      'Solinus - 1493. Rijksmuseum, Netherlands. Public Domain.',
    'Capa de uma reedição de De nuptiis Philologiae et Mercurio — Martianus Capella, and other text(s), por Cyprian, of Carthage, Pseudo-. Leiden University Libraries, Netherlands. Public Domain.':
      'Cover of a reissue of De nuptiis Philologiae et Mercurio — Martianus Capella, and other text(s), by Cyprian, of Carthage, Pseudo-. Leiden University Libraries, Netherlands. Public Domain.',
    'De nuptiis Philologiae et Mercurii — Martianus Capella, por Marciano Capella. Leiden University Libraries, Netherlands. Public Domain.':
      'De nuptiis Philologiae et Mercurii — Martianus Capella, by Martianus Capella. Leiden University Libraries, Netherlands. Public Domain.',
    'Cassiodoro - 1493. Rijksmuseum, Netherlands. Public Domain.':
      'Cassiodorus - 1493. Rijksmuseum, Netherlands. Public Domain.',
    'Cassiodorus, F. M. A. Cassiodorus. Fragment (parte 1), 826. Europeana.':
      'Cassiodorus, F. M. A. Cassiodorus. Fragment (part 1), 826. Europeana.',
    'Cassiodorus, F. M. A. Cassiodorus. Fragment (parte 2), 826. Europeana.':
      'Cassiodorus, F. M. A. Cassiodorus. Fragment (part 2), 826. Europeana.',
    'Isidoro de Sevilha, edição de 1577. Imagem proveniente dos acervos da Biblioteca Nacional de Espanha.':
      'Isidore of Seville, 1577 edition. Image from the collections of the National Library of Spain.',
    'Santo Isidoro de Sevilha - Mariano Salvator Maella (inv.) / Emmanuel Salvator Carmona (inc.), 1775. Biblioteca Nacional de Espanha.':
      'Saint Isidore of Seville - Mariano Salvator Maella (inv.) / Emmanuel Salvator Carmona (inc.), 1775. National Library of Spain.',
    'Hrabano Mauro - Hrabanus Maurus, 780–856 (GND: 118553909). ÖNB Viewer / Österreichische Nationalbibliothek (Austrian National Library).':
      'Hrabanus Maurus - Hrabanus Maurus, 780–856 (GND: 118553909). ÖNB Viewer / Österreichische Nationalbibliothek (Austrian National Library).',
    'Michael Psellus, De omnifaria doctrina, edição de Johann Albert Fabricius, Bibliotheca Graeca, 1712. Bibliotheca Graeca, sive Notitia scriptorum veterum Graecorum ... Editio tertia, ab auctore recognita et plurimis locis aucta. 5. De scriptoribus Graecis Christianis ... — Allacci, Leo, 1723. Austrian National Library, Austria. No Copyright - Non-Commercial Use Only.':
      'Michael Psellus, De omnifaria doctrina, edited by Johann Albert Fabricius, Bibliotheca Graeca, 1712. Bibliotheca Graeca, sive Notitia scriptorum veterum Graecorum ... Editio tertia, ab auctore recognita et plurimis locis aucta. 5. De scriptoribus Graecis Christianis ... — Allacci, Leo, 1723. Austrian National Library, Austria. No Copyright - Non-Commercial Use Only.',
    'Miguel Pselo - Séc. XII–XIII. Codex 234, f. 245a, Mount Athos, Pantokrator Monastery.':
      'Michael Psellos - 12th–13th c. Codex 234, f. 245a, Mount Athos, Pantokrator Monastery.',
    'Miguel Pselo - De omnifaria doctrina, ms. Florença, Biblioteca Medicea Laurenziana, Plut. 86,15, fol. 162r, 1347.':
      'Michael Psellos - De omnifaria doctrina, ms. Florence, Biblioteca Medicea Laurenziana, Plut. 86,15, fol. 162r, 1347.',
    'Honório Augustodunense - St. Gallen, Stiftsbibliothek, Cod. Sang. 1075, p. 282. Wikimedia Commons.':
      'Honorius Augustodunensis - St. Gallen, Stiftsbibliothek, Cod. Sang. 1075, p. 282. Wikimedia Commons.',
    'Hugo de São Vítor - Miniatura inglesa anónima, séc. XIII.':
      'Hugh of Saint Victor - Anonymous English miniature, 13th c.',
    'Hugo de São Vítor - Hugo de São Vítor redige o Didascalicon. Pergaminho Vucanius 45, f° 130, Leyde, Bibliothek der Rijkuniversiteit, séc. XIII.':
      'Hugh of Saint Victor - Hugh of Saint Victor writing the Didascalicon. Parchment Vucanius 45, f° 130, Leyde, Bibliothek der Rijkuniversiteit, 13th c.',
    'Abadessa de Herrad — A table from Hortus Deliciarum (facsimile, 1818). After Herrad of Landsberg. Public domain, via Wikimedia Commons.':
      'Abbess Herrad — A table from Hortus Deliciarum (facsimile, 1818). After Herrad of Landsberg. Public domain, via Wikimedia Commons.',
    'Bartolomeu Inglês - 1711. Bibliothèque nationale de France. Public domain, via Wikimedia Commons.':
      'Bartholomaeus Anglicus - 1711. Bibliothèque nationale de France. Public domain, via Wikimedia Commons.',
    'Fragmento de De Proprietatibus Rerum, séc. XIV (pág. 1) — Bartholomaeus Anglicus — National Library of Finland, Finland — Public Domain':
      'Fragment of De Proprietatibus Rerum, 14th c. (p. 1) — Bartholomaeus Anglicus — National Library of Finland, Finland — Public Domain',
    'Fragmento de De Proprietatibus Rerum, séc. XIV (pág. 2) — Bartholomaeus Anglicus — National Library of Finland, Finland — Public Domain':
      'Fragment of De Proprietatibus Rerum, 14th c. (p. 2) — Bartholomaeus Anglicus — National Library of Finland, Finland — Public Domain',
    'Fragmento de De Proprietatibus Rerum, séc. XIV (pág. 3) — Bartholomaeus Anglicus — National Library of Finland, Finland — Public Domain':
      'Fragment of De Proprietatibus Rerum, 14th c. (p. 3) — Bartholomaeus Anglicus — National Library of Finland, Finland — Public Domain',
    'Fragmento de De Proprietatibus Rerum, séc. XIV (pág. 4) — Bartholomaeus Anglicus — National Library of Finland, Finland — Public Domain':
      'Fragment of De Proprietatibus Rerum, 14th c. (p. 4) — Bartholomaeus Anglicus — National Library of Finland, Finland — Public Domain',
    'Vicente de Beauvais - Speculum Historiale (manuscrito), 1478. Public domain, via Wikimedia Commons.':
      'Vincent of Beauvais - Speculum Historiale (manuscript), 1478. Public domain, via Wikimedia Commons.',
    'Gautier de Metz, Image du monde, séc. XIV — Gossuin de Metz. Public domain, via Wikimedia Commons.':
      'Gautier de Metz, Image du monde, 14th c. — Gossuin de Metz. Public domain, via Wikimedia Commons.',
    'Le grand dictionaire historique ou Le mélange curieux de l\'histoire sacrée et profane, nouvelle et dernière édition revue, corrigée et augmentée, reedição de 1712. Europeana.':
      'Le grand dictionaire historique ou Le mélange curieux de l\'histoire sacrée et profane, nouvelle et dernière édition revue, corrigée et augmentée, 1712 reissue. Europeana.',
    'Pierre Bayle - Dictionaire historique et critique, Tome Premier A–G, frontispício. Reinier Leers, Rotterdam, 1697. Public domain, via Wikimedia Commons.':
      'Pierre Bayle - Dictionaire historique et critique, Tome Premier A–G, frontispiece. Reinier Leers, Rotterdam, 1697. Public domain, via Wikimedia Commons.',
    'Pág. 17 — Encyclopédie, Vol. 1':
      'P. 17 — Encyclopédie, Vol. 1',
    'Pág. 18 — Discurso Preliminar — Encyclopédie, Vol. 1':
      'P. 18 — Preliminary Discourse — Encyclopédie, Vol. 1',
    'Pág. 67 — Advertência sobre restantes colaboradores — Encyclopédie, Vol. 1':
      'P. 67 — Notice on remaining contributors — Encyclopédie, Vol. 1',
    'Pág. 73 — Observações, referência a Bacon — Encyclopédie, Vol. 1':
      'P. 73 — Observations, reference to Bacon — Encyclopédie, Vol. 1',
    'Pág. 76 — 1ª Página do A — Encyclopédie, Vol. 1':
      'P. 76 — 1st Page of A — Encyclopédie, Vol. 1',
    'Pág. 856 — Última Página do A e 1º Volume — Encyclopédie, Vol. 1':
      'P. 856 — Last Page of A and 1st Volume — Encyclopédie, Vol. 1',
    'Página da Encyclopaedia Britannica — Encyclopaedia Britannica, 1797. National Library of the Czech Republic, Czech Republic. No Copyright - Non-Commercial Use Only.':
      'Page from the Encyclopaedia Britannica — Encyclopaedia Britannica, 1797. National Library of the Czech Republic, Czech Republic. No Copyright - Non-Commercial Use Only.',
    'William Smellie - W. H. Lizars (gravura) segundo G. Watson. Wellcome Collection, United Kingdom. CC BY.':
      'William Smellie - W. H. Lizars (engraving) after G. Watson. Wellcome Collection, United Kingdom. CC BY.',
    'Relógio — Turkestan — Brockhaus, 1903':
      'Clock — Turkestan — Brockhaus, 1903'
  };

  function traduzirLegenda(legenda) {
    if (!legenda) return '';
    if (getLang() !== 'en') return legenda;
    return LEGENDA_EN[legenda] || legenda;
  }

  function buildFichaHTML(d) {
    var lang = getLang();
    var isEn = lang === 'en';

    var tituloOrig, tituloTrad;
    if (SEM_TITULO_ORIGINAL[d.titulo]) {
      tituloOrig = isEn ? d.titulo_en : d.titulo;
      tituloTrad = null;
    } else {
      tituloOrig = TITULO_ORIGINAL[d.titulo] || d.titulo;
      tituloTrad = isEn ? d.titulo_en : (TITULO_PT[d.titulo] || d.titulo);
      if (tituloTrad && tituloTrad.toLowerCase() === tituloOrig.toLowerCase()) {
        tituloTrad = null;
      }
    }

    var autorOrig, autorTrad;
    if (SEM_AUTOR_ORIGINAL[d.autor]) {
      autorOrig = isEn ? d.autor_en : d.autor;
      autorTrad = null;
    } else {
      autorOrig = AUTOR_ORIGINAL[d.autor] || d.autor;
      autorTrad = isEn ? d.autor_en : d.autor;
    }

    function secao(label, content, collapsible) {
      var wrapper = document.createElement('div');
      wrapper.className = 'ficha-cell';

      var lbl = document.createElement('div');
      lbl.className = 'ficha-cell-label';
      lbl.textContent = label;
      wrapper.appendChild(lbl);

      var textWrap = document.createElement('div');
      var val = document.createElement('div');
      val.className = 'ficha-text-content';
      val.textContent = content;
      textWrap.appendChild(val);
      wrapper.appendChild(textWrap);

      if (collapsible) {
        textWrap.className = 'ficha-text-collapsed';
        var btn = document.createElement('button');
        btn.className = 'ficha-ler-mais';
        btn.textContent = isEn ? 'Read more' : 'Ler mais';
        btn.addEventListener('click', function () {
          var isCollapsed = textWrap.classList.toggle('ficha-text-collapsed');
          btn.textContent = isCollapsed
            ? (isEn ? 'Read more' : 'Ler mais')
            : (isEn ? 'Read less' : 'Ler menos');
        });
        wrapper.appendChild(btn);
        setTimeout(function () {
          if (textWrap.scrollHeight <= textWrap.clientHeight + 10) {
            textWrap.classList.remove('ficha-text-collapsed');
            btn.style.display = 'none';
          }
        }, 50);
      }

      return wrapper;
    }

    function nomeCell(label, nomeOriginal, trad) {
      var cell = document.createElement('div');
      cell.className = 'ficha-cell';
      var lbl = document.createElement('div');
      lbl.className = 'ficha-cell-label';
      lbl.textContent = label;
      cell.appendChild(lbl);
      var val = document.createElement('div');
      val.className = 'ficha-cell-value';
      val.textContent = nomeOriginal;
      cell.appendChild(val);
      if (trad && trad !== nomeOriginal) {
        var tradEl = document.createElement('div');
        tradEl.className = 'ficha-cell-value-trad';
        tradEl.textContent = '(' + trad + ')';
        cell.appendChild(tradEl);
      }
      return cell;
    }

    var container = document.createElement('div');
    container.className = 'ficha-corpo';

    var headerImg = document.createElement('img');
    headerImg.className = 'ficha-header-img';
    headerImg.src = d.headerImg;
    headerImg.alt = d.titulo;
    container.appendChild(headerImg);

    var row1 = document.createElement('div');
    row1.className = 'ficha-row ficha-row-titulo';
    row1.appendChild(nomeCell(
      isEn ? 'Title' : 'Título',
      tituloOrig,
      tituloTrad
    ));
    row1.appendChild(nomeCell(
      isEn ? 'Author(s)' : 'Autor(es)',
      autorOrig,
      autorTrad
    ));
    container.appendChild(row1);

    var row2 = document.createElement('div');
    row2.className = 'ficha-row ficha-row-ano';
    var cellAno = document.createElement('div');
    cellAno.className = 'ficha-cell';
    cellAno.innerHTML = '<div class="ficha-cell-label">' + (isEn ? 'Year' : 'Ano') + '</div>' +
      '<div class="ficha-cell-value">' + (isEn ? d.ano_en : d.ano) + '</div>';
    row2.appendChild(cellAno);
    var cellLocal = document.createElement('div');
    cellLocal.className = 'ficha-cell';
    cellLocal.innerHTML = '<div class="ficha-cell-label">' + (isEn ? 'Place' : 'Local') + '</div>' +
      '<div class="ficha-cell-value">' + (isEn ? d.local_en : d.local) + '</div>';
    row2.appendChild(cellLocal);
    container.appendChild(row2);

    var row3 = document.createElement('div');
    row3.className = 'ficha-row-full';
    row3.appendChild(secao(
      isEn ? 'History & Curiosities' : 'História & Curiosidades',
      isEn ? d.historia_en : d.historia,
      true
    ));
    container.appendChild(row3);

    var row4 = document.createElement('div');
    row4.className = 'ficha-row-full';
    row4.appendChild(secao(
      isEn ? 'Editions' : 'Edições',
      isEn ? d.edicoes_en : d.edicoes,
      true
    ));
    container.appendChild(row4);

    return container;
  }

  function abrirCarrossel(obra) {
    slides = [];

    if (obra.fichaHTML && obra.fichaData) {
      slides.push({ type: 'html', data: obra.fichaData });
    } else if (obra.ficha) {
      slides.push({ type: 'img', src: obra.ficha, legenda: obra.fichaLegenda || '' });
    }
    obra.galeria.forEach(function (g) {
      if (typeof g === 'string') {
        slides.push({ type: 'img', src: g, legenda: '' });
      } else {
        slides.push({ type: 'img', src: g.src, legenda: g.legenda || '' });
      }
    });

    indice = 0;
    mostrarSlide();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function fecharCarrossel() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    fichaEl.innerHTML = '';
    fichaEl.classList.remove('active');
  }

  function mostrarSlide() {
    var slide = slides[indice];
    if (slide.type === 'html') {
      imgEl.style.display = 'none';
      fichaEl.innerHTML = '';
      fichaEl.appendChild(buildFichaHTML(slide.data));
      fichaEl.classList.add('active');
      legendaEl.textContent = '';
    } else {
      fichaEl.classList.remove('active');
      fichaEl.innerHTML = '';
      imgEl.style.display = '';
      imgEl.src = slide.src;
      legendaEl.textContent = traduzirLegenda(slide.legenda);
    }
    contador.textContent = (indice + 1) + ' / ' + slides.length;
    btnPrev.hidden = slides.length <= 1;
    btnNext.hidden = slides.length <= 1;
  }

  function navegar(dir) {
    indice = (indice + dir + slides.length) % slides.length;
    mostrarSlide();
  }

  btnClose.addEventListener('click', fecharCarrossel);
  btnPrev.addEventListener('click', function () { navegar(-1); });
  btnNext.addEventListener('click', function () { navegar(1); });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) fecharCarrossel();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') fecharCarrossel();
    if (e.key === 'ArrowLeft') navegar(-1);
    if (e.key === 'ArrowRight') navegar(1);
  });

  document.addEventListener('langchange', function () {
    if (!overlay.classList.contains('active')) return;
    var slide = slides[indice];
    if (slide && slide.type === 'html') {
      fichaEl.innerHTML = '';
      fichaEl.appendChild(buildFichaHTML(slide.data));
    } else if (slide && slide.type === 'img') {
      legendaEl.textContent = traduzirLegenda(slide.legenda);
    }
  });

  window._carrossel = {
    abrir: abrirCarrossel,
    fechar: fecharCarrossel,
    nomeOriginal: function (nome) { return NOME_ORIGINAL[nome] || nome; }
  };

  // Botão voltar ao topo
  var btnTopo = document.getElementById('btn-topo');
  if (btnTopo) {
    window.addEventListener('scroll', function () {
      btnTopo.classList.toggle('visible', window.scrollY > 400);
    });
    btnTopo.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
