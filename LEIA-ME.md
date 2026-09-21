# SDI — Site institucional

Site estático em HTML5, CSS3 e JavaScript puro. Não há build, dependências
nem instalação: basta enviar o conteúdo desta pasta para o diretório do
domínio (`public_html` no cPanel) e o site funciona.

Para testar localmente, abra `index.html` direto no navegador.

---

## Pendências antes de publicar

### 1. Imagens

Todos os containers de imagem já usam arquivos reais, em `assets/images/app/`:

| Tela | Onde aparece |
|---|---|
| Escolha a instituição | hero e dobra do aplicativo |
| Login Gov.br | dobra "Acesso Gov.br" |
| Painel interno | Gestão Pública e CTA final |
| ISA | dobra da ISA |
| Selo do ecossistema | dobra do Workflow |

### 2. URLs de acesso ao sistema

O botão "Acessar o SDI" aponta para `#`. São **9 ocorrências**, todas
marcadas com `<!-- TODO: URL real ... -->`:

```bash
grep -rn "TODO.*URL" *.html
```

Os links das lojas (App Store e Google Play) já são definitivos.

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
index.html                  Página principal (10 seções):
                            hero · posicionamento · gestão pública ·
                            acesso Gov.br · aplicativo · benefícios +
                            comparativo · ISA · workflow · CTA · manifesto
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
  icons/                    favicons e ícones de aplicativo
```

### Onde mexer no CSS

Todas as cores, raios, sombras e transições estão em `:root`, no topo de
`assets/css/style.css`. O arquivo tem um sumário numerado no início.

Duas distinções importantes na paleta:

- `--color-blue` (`#0878f9`) — decorativo: ícones, glows, bordas. **Não usar em texto.**
- `--color-blue-600` (`#0563d6`) — sempre que o azul precisar carregar texto (5.58:1 sobre branco, WCAG AA).

---

## Verificações já feitas

- HTML válido e bem-formado nas 4 páginas; um `<h1>` por página, hierarquia de headings sem saltos
- Todos os links internos e âncoras resolvem; nenhum arquivo referenciado faltando
- Contraste WCAG AA em todas as combinações de texto (nenhuma reprovação)
- Todas as imagens com `alt`, `width` e `height`; 5 com `loading="lazy"`
- Tabela comparativa com `<caption>`, `scope` nos cabeçalhos e rolagem própria no mobile
- `prefers-reduced-motion` respeitado; o conteúdo aparece normalmente sem JavaScript
- Sem overflow horizontal de 320px a 1920px
- Zero dependências de framework, zero scripts externos
- Logos otimizadas (a principal foi de 878 KB para 70 KB)
- Mockups reais em WebP (19 a 70 KB cada)
- Sem menções ou logos do eGoverna: as marcas que apareciam dentro do print
  do painel também foram substituídas
