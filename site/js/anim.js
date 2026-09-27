/* ============================================================
   Digital World Coaching — DWC v4 : moteur d'animations
   Vanilla JS, zéro dépendance. GPU-friendly (transform/opacity),
   IntersectionObserver, prefers-reduced-motion respecté.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;

  function onReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  onReady(function () {

    /* ---------- 1. Liseré de progression au scroll + état nav ---------- */
    var header = document.querySelector('.dwc-header');
    var nav = document.querySelector('.dwc-nav');
    if (header && nav && !document.getElementById('dwc-progress')) {
      var bar = document.createElement('div');
      bar.className = 'dwc-scroll-progress';
      bar.id = 'dwc-progress';
      document.body.appendChild(bar);
    }
    var progress = document.getElementById('dwc-progress');
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var doc = document.documentElement;
        var max = doc.scrollHeight - window.innerHeight;
        var ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        if (progress) progress.style.transform = 'scaleX(' + ratio + ')';
        if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- 2. Reveal stagger : les .dwc-reveal d'un même groupe apparaissent en cascade ---------- */
    var revealEls = Array.prototype.slice.call(document.querySelectorAll('.dwc-reveal'));
    if ('IntersectionObserver' in window && !reduced) {
      // Regrouper par parent : plus le rang est haut, plus le délai est court
      var groups = new Map();
      revealEls.forEach(function (el) {
        var p = el.parentElement || document.body;
        if (!groups.has(p)) groups.set(p, []);
        groups.get(p).push(el);
      });
      groups.forEach(function (els) {
        els.forEach(function (el, i) {
          el.style.setProperty('--dwc-delay', Math.min(i * 0.09, 0.45).toFixed(2) + 's');
        });
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('revealed'); });
    }

    /* ---------- 3. Titre hero : découpage mot par mot slide-up ---------- */
    if (!reduced) {
      document.querySelectorAll('.dwc-hero .dwc-h1').forEach(function (h1) {
        if (h1.getAttribute('data-split') === 'done') return;
        var walk = function (node) {
          var out = [];
          node.childNodes.forEach(function (child) {
            if (child.nodeType === 3) {
              child.textContent.split(/(\s+)/).forEach(function (part) {
                if (!part) return;
                if (/^\s+$/.test(part)) out.push(document.createTextNode(' '));
                else {
                  var wrap = document.createElement('span');
                  wrap.className = 'dwc-w';
                  var inner = document.createElement('span');
                  inner.className = 'dwc-wi';
                  inner.textContent = part;
                  wrap.appendChild(inner);
                  out.push(wrap);
                }
              });
            } else if (child.nodeType === 1) {
              var clone = child.cloneNode(false);
              var nested = walk(child);
              nested.forEach(function (n) { clone.appendChild(n); });
              out.push(clone);
            }
          });
          return out;
        };
        var parts = walk(h1);
        h1.textContent = '';
        parts.forEach(function (p) { h1.appendChild(p); });
        h1.setAttribute('data-split', 'done');
        var words = h1.querySelectorAll('.dwc-wi');
        words.forEach(function (w, i) {
          w.style.transitionDelay = (0.12 + i * 0.055).toFixed(3) + 's';
        });
        // Déclenchement après le premier paint
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { h1.classList.add('dwc-title-in'); });
        });
      });
    }

    /* ---------- 4. Particules flottantes discrètes du hero ---------- */
    if (!reduced && !isTouch) {
      document.querySelectorAll('.dwc-hero').forEach(function (hero) {
        if (hero.querySelector('.dwc-particles')) return;
        var field = document.createElement('div');
        field.className = 'dwc-particles';
        field.setAttribute('aria-hidden', 'true');
        for (var i = 0; i < 14; i++) {
          var p = document.createElement('i');
          p.className = 'dwc-p';
          var size = (Math.random() * 3 + 1.5).toFixed(1);
          p.style.width = size + 'px';
          p.style.height = size + 'px';
          p.style.left = (Math.random() * 100).toFixed(2) + '%';
          p.style.setProperty('--p-drift', (Math.random() * 4 - 2).toFixed(2) + 'rem');
          p.style.setProperty('--p-opacity', (Math.random() * 0.35 + 0.15).toFixed(2));
          var dur = (Math.random() * 14 + 11).toFixed(1);
          var delay = (-Math.random() * 20).toFixed(1);
          p.style.animationDuration = dur + 's';
          p.style.animationDelay = delay + 's';
          field.appendChild(p);
        }
        hero.appendChild(field);
      });
    }

    /* ---------- 5. Compteurs animés (déjà dans nav.js v3 — on ajoute les barres) ---------- */
    function animateBar(bar) {
      var fill = bar.querySelector('.dwc-bar-fill');
      if (!fill) return;
      var w = parseFloat(bar.getAttribute('data-bar') || '1');
      fill.style.setProperty('--bar-w', w);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { fill.classList.add('is-filled'); });
      });
    }
    var bars = document.querySelectorAll('[data-bar]');
    if (bars.length) {
      if ('IntersectionObserver' in window) {
        var ioBar = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { animateBar(entry.target); ioBar.unobserve(entry.target); }
          });
        }, { threshold: 0.4 });
        bars.forEach(function (el) { ioBar.observe(el); });
      } else {
        bars.forEach(animateBar);
      }
    }

    /* ---------- 6. Lignes de stepper / rails de timeline qui se dessinent ---------- */
    if ('IntersectionObserver' in window && !reduced) {
      var ioLine = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-drawn');
            ioLine.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });
      document.querySelectorAll('.dwc-step-line, .dwc-steps-h, .dwc-timeline').forEach(function (el) {
        ioLine.observe(el);
      });
    } else {
      document.querySelectorAll('.dwc-step-line, .dwc-steps-h, .dwc-timeline').forEach(function (el) {
        el.classList.add('is-drawn');
      });
    }

    /* ---------- 7. Tilt 3D léger sur les cartes (desktop seulement) ---------- */
    if (!isTouch && !reduced) {
      document.querySelectorAll('.dwc-tilt').forEach(function (card) {
        var raf = null;
        card.addEventListener('mousemove', function (e) {
          if (raf) return;
          raf = requestAnimationFrame(function () {
            var r = card.getBoundingClientRect();
            var px = (e.clientX - r.left) / r.width - 0.5;
            var py = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = 'perspective(900px) rotateX(' + (-py * 5).toFixed(2) + 'deg) rotateY(' + (px * 7).toFixed(2) + 'deg) translateY(-5px)';
            raf = null;
          });
        });
        card.addEventListener('mouseleave', function () {
          card.style.transform = '';
        });
        card.addEventListener('blur', function () { card.style.transform = ''; });
        window.addEventListener('scroll', function () {
          if (raf) { cancelAnimationFrame(raf); raf = null; }
          card.style.transform = '';
        }, { passive: true });
      });
    }

    /* ---------- 8. Spotlight curseur (visuels + grandes cartes) ---------- */
    if (!isTouch && !reduced) {
      document.querySelectorAll('.dwc-spot').forEach(function (el) {
        var raf = null;
        el.addEventListener('mousemove', function (e) {
          if (raf) return;
          raf = requestAnimationFrame(function () {
            var r = el.getBoundingClientRect();
            el.style.setProperty('--spot-x', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
            el.style.setProperty('--spot-y', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
            raf = null;
          });
        });
      });
    }

    /* ---------- 9. Filtres services : réorganisation FLIP + fade ---------- */
    document.querySelectorAll('#dwc-filters .dwc-filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var grid = document.getElementById('dwc-services-grid');
        if (!grid) return;
        var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-category]'));
        var filter = btn.getAttribute('data-filter');

        // Positions avant
        var first = new Map();
        cards.forEach(function (c) {
          if (c.style.display !== 'none') first.set(c, c.getBoundingClientRect());
        });

        document.querySelectorAll('.dwc-filter-btn').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        // Applique le filtre puis anime
        cards.forEach(function (c) {
          var show = filter === 'all' || c.getAttribute('data-category') === filter;
          c.style.display = show ? (c.tagName === 'A' ? 'grid' : 'flex') : 'none';
        });

        requestAnimationFrame(function () {
          cards.forEach(function (c) {
            if (c.style.display === 'none') return;
            var f = first.get(c);
            var l = c.getBoundingClientRect();
            if (f) {
              var dx = f.left - l.left, dy = f.top - l.top;
              if (dx || dy) {
                c.style.transition = 'none';
                c.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
                requestAnimationFrame(function () {
                  c.style.transition = 'transform 0.5s var(--ease-out), opacity 0.4s ease';
                  c.style.transform = '';
                });
              }
            } else {
              // Carte qui réapparaît : fondu montant
              c.style.opacity = '0';
              c.style.transform = 'translateY(16px)';
              c.style.transition = 'none';
              requestAnimationFrame(function () {
                c.style.transition = 'opacity 0.45s ease ' + (cards.indexOf(c) % 5) * 0.06 + 's, transform 0.5s var(--ease-out)';
                c.style.opacity = '1';
                c.style.transform = '';
              });
            }
          });
        });
      });
    });

    /* ---------- 10. Labels flottants sur les champs de formulaire ---------- */
    document.querySelectorAll('.dwc-field').forEach(function (field) {
      var input = field.querySelector('input.dwc-input, textarea.dwc-textarea');
      var label = field.querySelector('label');
      if (!input || !label) return;
      // Seulement les champs texte : on opte par classe (les selects gardent leur label au-dessus)
      if (input.type === 'radio' || input.type === 'checkbox') return;
      field.classList.add('is-float');
      function sync() {
        field.classList.toggle('is-floated', !!input.value);
      }
      input.addEventListener('focus', function () { field.classList.add('is-floated'); });
      input.addEventListener('blur', sync);
      input.addEventListener('input', sync);
      sync();
    });
    // Le label reste lisible pour les lecteurs d'écran ; le placeholder sert d'exemple au focus.

    /* ---------- 11. Boutons submit : état loading → succès ---------- */
    function bindSubmitState(form, btn, done) {
      if (!form || !btn || btn.getAttribute('data-anim-state') === 'bound') return;
      btn.setAttribute('data-anim-state', 'bound');
      form.addEventListener('submit', function () {
        if (btn.classList.contains('is-loading') || btn.classList.contains('is-success')) return;
        btn.classList.add('is-loading');
        setTimeout(function () {
          btn.classList.remove('is-loading');
          btn.classList.add('is-success');
          var label = btn.querySelector('.dwc-btn-label');
          var original = btn.innerHTML;
          if (label) {
            btn.innerHTML = '<i data-lucide="check"></i> Demande envoyée — à tout de suite !';
            if (window.lucide && lucide.createIcons) lucide.createIcons();
          }
          setTimeout(function () {
            btn.classList.remove('is-success');
            btn.innerHTML = original;
            if (window.lucide && lucide.createIcons) lucide.createIcons();
          }, 3200);
          if (done) done();
        }, 900);
      }, true);
    }
    // Formulaires avec bouton label marqué .dwc-btn-label
    document.querySelectorAll('form').forEach(function (form) {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) bindSubmitState(form, btn, null);
    });
    // Le clic "WhatsApp" déclenche le même état via le submit du formulaire (capture)

    /* ---------- 12. FAQ : hauteur fluide (details → animation du contenu) ---------- */
    document.querySelectorAll('details.dwc-faq').forEach(function (d) {
      var summary = d.querySelector('summary');
      var content = d.querySelector('.dwc-faq-a');
      if (!summary || !content || reduced) return;
      summary.addEventListener('click', function (e) {
        if (d.hasAttribute('open')) {
          e.preventDefault();
          var h = content.scrollHeight;
          content.style.height = h + 'px';
          content.style.transition = 'height 0.4s var(--ease-out), opacity 0.3s ease';
          content.style.overflow = 'hidden';
          requestAnimationFrame(function () {
            content.style.height = '0px';
            content.style.opacity = '0';
          });
          setTimeout(function () {
            d.removeAttribute('open');
            content.style.height = '';
            content.style.transition = '';
            content.style.opacity = '';
          }, 380);
        } else {
          // Ouverture : laisser le navigateur ouvrir puis animer l'apparition
          requestAnimationFrame(function () {
            content.style.height = '0px';
            content.style.opacity = '0';
            content.style.overflow = 'hidden';
            content.style.transition = 'height 0.45s var(--ease-out), opacity 0.35s ease 0.08s';
            var h = content.scrollHeight;
            requestAnimationFrame(function () {
              content.style.height = h + 'px';
              content.style.opacity = '1';
            });
            setTimeout(function () {
              content.style.height = '';
              content.style.overflow = '';
              content.style.transition = '';
            }, 460);
          });
        }
      });
    });

    /* ---------- 13. Marquee de compétences (duplication pour boucle parfaite) ---------- */
    document.querySelectorAll('.dwc-marquee-track').forEach(function (track) {
      if (track.getAttribute('data-clone') === 'done') return;
      // La moitié dupliquée vit sous translateX animé : on la retire du flux scrollable
      track.style.width = '50%';
      track.style.boxSizing = 'content-box';
      track.setAttribute('data-clone', 'done');
      track.innerHTML += track.innerHTML;
    });

  });
})();