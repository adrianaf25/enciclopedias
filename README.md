# Exposição Virtual

Site estático (HTML, CSS e JavaScript puros, sem frameworks nem dependências) para apresentar uma exposição virtual de um projeto académico. Suporta vídeo de fundo, vídeos e imagens na galeria, e texto.

## Estrutura

```
index.html          → página inicial
sobre.html          → página Sobre a Exposição
percursos.html      → página Percursos
contacto.html       → página Contacto
css/style.css        → estilos
js/script.js         → menu mobile + lightbox de Percursos
assets/images/        → imagens e thumbnails
assets/videos/        → vídeo de entrada e vídeos da exposição
```

## Como editar

- **Página inicial**: edita o [index.html](index.html).
- **Sobre**: edita o [sobre.html](sobre.html).
- **Percursos**: edita o [percursos.html](percursos.html); para adicionar cartões, copia um bloco `<article class="gallery-item">...</article>`.
- **Contacto**: edita o [contacto.html](contacto.html).
- **Imagens/vídeos**: substitui os ficheiros em `assets/images/` e `assets/videos/` mantendo os mesmos nomes, ou atualiza os caminhos (`src`/`data-src`) na página correspondente.
- **Cores/tema**: ajusta as variáveis no topo do [css/style.css](css/style.css) (`--bg`, `--accent`, etc.).

## Ver localmente

Basta abrir o `index.html` num navegador. Para evitar problemas de autoplay de vídeo em alguns navegadores, é recomendado correr um servidor local simples:

```bash
npx serve .
```

ou, com Python:

```bash
python3 -m http.server 8080
```

depois abre `http://localhost:8080`.

## Publicar gratuitamente (sem custos)

Qualquer uma destas opções é 100% gratuita para este tipo de site estático:

### Opção 1 — GitHub Pages (recomendado)
1. Cria um repositório novo no GitHub e envia estes ficheiros.
2. Vai a **Settings → Pages**.
3. Em "Branch", escolhe `main` e pasta `/root`, depois guarda.
4. O site fica disponível em `https://<o-teu-user>.github.io/<nome-do-repo>/`.

### Opção 2 — Netlify
1. Cria conta gratuita em netlify.com.
2. Arrasta a pasta do projeto para o Netlify Drop (não precisa de Git).
3. Recebe um link público instantâneo.

### Opção 3 — Vercel / Cloudflare Pages
Funciona da mesma forma: liga o repositório Git e faz deploy automático, sem custos para sites estáticos.

## Nota sobre vídeos

Vídeos grandes tornam o site lento. Para um projeto académico, comprime os vídeos antes de os colocar em `assets/videos/` (resolução 720p–1080p costuma ser suficiente).
