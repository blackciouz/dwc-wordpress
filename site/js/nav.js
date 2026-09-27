// Digital World Coaching — Navigation
// Menu mobile, effet scroll sur la nav pilule, lien actif, reveal au scroll, année footer
// v2 : injection du dégradé or->violet dans les tracés Lucide + logo SVG

var DWC_EMAIL = 'contact@digitalworldcoaching.com';
var DWC_PHONE_HREF = 'tel:+22997000000';
var DWC_WA_NUMBER = '22997000000';

document.addEventListener('DOMContentLoaded', function () {

    // ---- Dégradé or -> violet pour les tracés d'icônes Lucide (une seule defs par page) ----
    if (!document.getElementById('dwcIconGrad')) {
        var svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgDefs.setAttribute('aria-hidden', 'true');
        svgDefs.style.position = 'absolute';
        svgDefs.style.width = '0';
        svgDefs.style.height = '0';
        svgDefs.style.overflow = 'hidden';
        svgDefs.innerHTML =
            '<defs><linearGradient id="dwcIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="#f59e0b"/>' +
            '<stop offset="100%" stop-color="#a855f7"/>' +
            '</linearGradient></defs>';
        document.body.appendChild(svgDefs);
    }

    // ---- Menu mobile (nav pilule) ----
    var navToggle = document.getElementById('dwc-nav-toggle');
    var mobileMenu = document.getElementById('dwc-mobile-menu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('open');
            var spans = navToggle.querySelectorAll('span');
            var open = mobileMenu.classList.contains('open');
            if (spans.length >= 3) {
                spans[0].style.transform = open ? 'rotate(45deg) translateY(9px)' : '';
                spans[1].style.opacity = open ? '0' : '';
                spans[2].style.transform = open ? 'rotate(-45deg) translateY(-9px)' : '';
            }
        });

        // Fermer le menu au clic sur un lien
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('open');
                var spans = navToggle.querySelectorAll('span');
                if (spans.length >= 3) {
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '';
                    spans[2].style.transform = '';
                }
            });
        });

        // Fermer au clic en dehors
        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('open');
            }
        });
    }

    // ---- Effet de scroll sur la nav pilule ----
    var nav = document.querySelector('.dwc-nav');
    if (nav) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 50) {
                nav.style.background = 'rgba(10, 8, 18, 0.9)';
                nav.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35), 0 0 40px rgba(245,158,11,0.08)';
            } else {
                nav.style.background = 'rgba(10, 8, 18, 0.55)';
                nav.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.12)';
            }
        });
    }

    // ---- Lien actif selon la page courante ----
    var currentPath = window.location.pathname;
    var currentPage = currentPath.split('/').pop() || 'index.html';

    document.querySelectorAll('.dwc-nav-links a, .dwc-mobile-menu a').forEach(function (link) {
        var href = link.getAttribute('href');
        if (!href || href.charAt(0) === '#') return;
        var target = href.split('#')[0].split('/').pop();
        if (target === currentPage) {
            link.classList.add('active');
            // Retirer l'état actif des ancres internes de la même page
        }
    });

    // ---- Reveal au scroll ----
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });
            revealEls.forEach(function (el) { io.observe(el); });
        } else {
            revealEls.forEach(function (el) { el.classList.add('revealed'); });
        }
    }

    // ---- Année du footer ----
    var yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ---- Icônes Lucide (sécurisé si CDN indisponible) ----
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
        // Appliquer le dégradé or->violet aux tracés marqués .dwc-ic-grad
        document.querySelectorAll('.dwc-ic-grad').forEach(function (el) {
            el.style.stroke = 'url(#dwcIconGrad)';
        });
    }

    // ---- Page contact : envoi du formulaire via mailto / WhatsApp (aucun backend) ----
    var form = document.getElementById('dwc-contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var get = function (id) {
                var el = document.getElementById(id);
                return el ? (el.value || '').trim() : '';
            };
            var name = get('f-name');
            var email = get('f-email');
            var phone = get('f-phone');
            var service = get('f-service');
            var message = get('f-message');
            var mode = (window.DWC_SUBMIT_MODE === 'whatsapp') ? 'whatsapp' : 'email';

            var lines = [
                'Bonjour Digital World Coaching,',
                '',
                'Nom : ' + (name || '—'),
                'Email : ' + (email || '—'),
                'WhatsApp : ' + (phone || '—'),
                'Service souhaité : ' + (service || '—'),
                '',
                'Message :',
                message || '—'
            ];
            var text = lines.join('\n');

            var url;
            if (mode === 'whatsapp') {
                url = 'https://wa.me/' + DWC_WA_NUMBER + '?text=' + encodeURIComponent(text);
                window.open(url, '_blank', 'noopener');
            } else {
                var subject = 'Demande de contact — ' + (service || 'Site web') + (name ? ' — ' + name : '');
                url = 'mailto:' + DWC_EMAIL +
                      '?subject=' + encodeURIComponent(subject) +
                      '&body=' + encodeURIComponent(text);
                window.location.href = url;
            }
        });
    }

    // ---- Page contact : bouton WhatsApp -> mode WhatsApp puis envoi ----
    var waModeBtn = document.getElementById('dwc-submit-wa');
    if (waModeBtn && form) {
        waModeBtn.addEventListener('click', function () {
            window.DWC_SUBMIT_MODE = 'whatsapp';
            if (form.requestSubmit) {
                form.requestSubmit();
            } else {
                form.dispatchEvent(new Event('submit', { cancelable: true }));
            }
        });
    }
});