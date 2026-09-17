# SDI — Site institucional

Site estático em HTML5, CSS3 e JavaScript puro. Não há build, dependências
nem instalação: basta enviar o conteúdo desta pasta para o diretório do
domínio (`public_html` no cPanel) e o site funciona.

Para testar localmente, abra `index.html` direto no navegador.

---

## Pendências antes de publicar

### 1. Screenshots reais do aplicativo

Há **7 containers preparados** aguardando as telas reais. Cada um está marcado
no HTML com:

```html
<!-- Inserir screenshot real do SDI aqui — tela "..." -->
```

Para localizá-los:

```bash
grep -n "Inserir screenshot real" index.html
```

Coloque os arquivos em `assets/images/app/` e substitua o bloco
`<div class="shot-placeholder">…</div>` por:

```html
<img src="assets/images/app/nome-da-tela.webp"
     alt="Descrição da tela"
     width="300" height="620" loading="lazy">
```

As telas esperadas, conforme o briefing:

| Tela | Onde aparece |
|---|---|
| Acesso simples e seguro (Entrar com Gov.br) | Hero e seção Gov.br |
| Consulte seus processos | Hero (aparelho de trás) e seção Meus Processos |
| Busca e acompanhamento | Seção de busca |
| Navegação simples (menu do app) | Seção Aplicativo + Web |

Na seção Aplicativo + Web, o menu está desenhado em CSS (`.app-menu`). O
comentário no HTML indica como trocá-lo pela screenshot real.

### 2. URLs de acesso ao sistema

Os botões "Acessar SDI" e "Área do Cidadão" apontam para `#`. São
**12 ocorrências**, todas marcadas com `<!-- TODO: URL real ... -->`:

```bash
grep -rn "TODO.*URL" *.html
```

### 3. Domínio

Ajustar `https://www.sdi.com.br/` para o domínio definitivo em:

- `index.html`, `politica-de-privacidade.html`, `termos-de-uso.html` (canonical e Open Graph)
- `robots.txt`
- `sitemap.xml`

```bash
grep -rn "sdi.com.br" . --include="*.html" --include="*.txt" --include="*.xml"
```

### 4. Imagem de compartilhamento (Open Graph)

Criar `assets/images/backgrounds/og-sdi.jpg` em 1200×630px. O meta tag já
está configurado e aponta para esse caminho.

### 5. Textos legais

A Política de Privacidade e os Termos de Uso são textos-base institucionais e
estão marcados com `TODO` pedindo validação jurídica e a inclusão dos dados do
controlador (razão social, CNPJ, endereço e contato do encarregado/DPO).

---

## Estrutura

```
index.html                  Página principal (22 seções)
politica-de-privacidade.html
termos-de-uso.html
404.html
robots.txt
sitemap.xml
favicon.ico

assets/
  css/style.css             Folha única, organizada em 13 seções numeradas
  js/main.js                5 módulos, sem dependências
  images/                   hero/ app/ mockups/ backgrounds/
  logos/sdi/                sdi-azul.png · sdi-branco.png · sdi-icone.png
  logos/egoverna/           egoverna-preto.png · egoverna-branco.png
  icons/                    favicons e ícones de aplicativo
```

### Onde mexer no CSS

Todas as cores, raios, sombras e transições estão em `:root`, no topo de
`assets/css/style.css`. O arquivo tem um sumário numerado no início.

Duas distinções importantes na paleta:

- `--color-blue` (`#0878f9`) — decorativo: ícones, glows, bordas. **Não usar em texto.**
- `--color-blue-600` (`#0563d6`) — sempre que o azul precisar carregar texto (5.58:1 sobre branco, WCAG AA).

### Ocultar a seção "100% Digital"

A menção a assinatura eletrônica vem de material institucional anterior. Para
ocultar a seção, basta comentar ou remover a `<section class="section section--dark">`
que contém `class="digital"` em `index.html`.

---

## Verificações já feitas

- HTML válido e bem-formado nas 4 páginas; um `<h1>` por página, hierarquia de headings sem saltos
- Todos os links internos e âncoras resolvem; nenhum arquivo referenciado faltando
- Contraste WCAG AA em todas as combinações de texto (nenhuma reprovação)
- Todas as imagens com `alt`, `width` e `height`; 5 com `loading="lazy"`
- FAQ com `aria-expanded`, `aria-controls`, `role="region"` e navegação por teclado
- `prefers-reduced-motion` respeitado; o conteúdo aparece normalmente sem JavaScript
- Sem overflow horizontal de 320px a 1920px
- Zero dependências de framework, zero scripts externos
- Logos otimizadas (a principal foi de 878 KB para 70 KB)
