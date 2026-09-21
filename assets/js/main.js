/**
 * SDI — Sistema Digital de Informações
 * Interações da interface. JavaScript puro, sem dependências.
 *
 * Módulos:
 *   1. Header ao rolar
 *   2. Menu mobile
 *   3. Reveal on scroll (IntersectionObserver)
 *   4. Ano corrente no rodapé
 */
(function () {
  "use strict";

  /* Marca que o JS está ativo: o CSS só esconde os elementos de .reveal
     quando esta classe existe, garantindo o conteúdo visível sem JS. */
  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ======================================================================
     1. HEADER AO ROLAR
     Transparente sobre o hero, sólido e com blur após o scroll.
     ====================================================================== */

  function initHeader() {
    var header = document.querySelector("[data-header]");
    if (!header) return;

    var ticking = false;

    function update() {
      header.classList.toggle("is-solid", window.scrollY > 24);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );

    update();
  }

  /* ======================================================================
     2. MENU MOBILE
     Painel em tela cheia, com trava de scroll, fechamento por Esc,
     por clique num link e ao voltar para a largura de desktop.
     ====================================================================== */

  function initMobileMenu() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var panel = document.querySelector("[data-menu-panel]");
    if (!toggle || !panel) return;

    /* Mesmo ponto em que o CSS troca o menu mobile pela navegação desktop. */
    var desktop = window.matchMedia("(min-width: 1200px)");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      panel.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    /* Evita o painel ficar preso aberto ao girar o aparelho ou redimensionar. */
    desktop.addEventListener("change", function (event) {
      if (event.matches) setOpen(false);
    });
  }

  /* ======================================================================
     3. REVEAL ON SCROLL
     Aparece uma vez e para de observar. O stagger é lido de data-stagger
     no contêiner e aplicado como delay em cada filho .reveal.
     ====================================================================== */

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    /* Sem suporte a IntersectionObserver ou com reduced-motion:
       mostra tudo de imediato. */
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    /* Aplica o atraso escalonado entre irmãos. */
    document.querySelectorAll("[data-stagger]").forEach(function (group) {
      var step = parseInt(group.getAttribute("data-stagger"), 10) || 80;
      group.querySelectorAll(":scope > .reveal").forEach(function (child, i) {
        child.style.setProperty("--reveal-delay", i * step + "ms");
      });
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* ======================================================================
     4. ANO CORRENTE NO RODAPÉ
     ====================================================================== */

  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ====================================================================== */

  function init() {
    initHeader();
    initMobileMenu();
    initReveal();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
