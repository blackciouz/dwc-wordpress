// Digital World Coaching — DWC v3 (identité Stitch : noir café + or chaud)
// Menu mobile, lien actif, reveal au scroll, compteurs animés, init Lucide, envoi du formulaire (mailto / wa.me)

// ---- Coordonnées centralisées (fictives, remplaçables) ----
var DWC_EMAIL = 'contact@digitalworldcoaching.com';
var DWC_PHONE_HREF = 'tel:+22997000000';
var DWC_WA_NUMBER = '22997000000';

document.addEventListener('DOMContentLoaded', function () {

    // ---- Menu mobile (nav pilule + burger) ----
    var navToggle = document.getElementById('dwc-nav-toggle');
    var mobileMenu = document.getElementById('dwc-mobile-menu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('open');
            var spans = navToggle.querySelectorAll('span');
            var open = mobileMenu.classList.contains('open');
            if (spans.length >= 3) {
                spans[0].style.transform = open ? 'rotate(45deg) translateY(7px)' : '';
                spans[1].style.opacity = open ? '0' : '';
                spans[2].style.transform = open ? 'rotate(-45deg) translateY(-7px)' : '';
            }
        });

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

        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('open');
            }
        });
    }

    // ---- Lien actif selon la page courante ----
    var currentPath = window.location.pathname;
    var currentPage = currentPath.split('/').pop() || 'index.html';
    if (currentPage.indexOf('detail') === 0) { currentPage = 'services.html'; }

    document.querySelectorAll('.dwc-nav-links a, .dwc-mobile-menu a').forEach(function (link) {
        var href = link.getAttribute('href');
        if (!href || href.charAt(0) === '#') return;
        var target = href.split('#')[0].split('/').pop();
        if (target === currentPage) {
            link.classList.add('active');
        }
    });

    // ---- Reveal au scroll ----
    var revealEls = document.querySelectorAll('.dwc-reveal');
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

    // ---- Compteurs animés (stats) ----
    function animateCounter(el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var prefix = el.getAttribute('data-prefix') || '';
        var duration = 1400;
        var start = null;

        function step(ts) {
            if (!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = prefix + target.toFixed(decimals) + suffix;
            }
        }
        requestAnimationFrame(step);
    }

    var counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
        if ('IntersectionObserver' in window) {
            var ioCount = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        ioCount.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });
            counters.forEach(function (el) { ioCount.observe(el); });
        } else {
            counters.forEach(animateCounter);
        }
    }

    // ---- Icônes Lucide ----
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }

    // ---- Formulaire de contact / devis : envoi via mailto ou WhatsApp (aucun backend) ----
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
            var modality = get('f-modality');
            var message = get('f-message');
            var mode = (window.DWC_SUBMIT_MODE === 'whatsapp') ? 'whatsapp' : 'email';

            var lines = [
                'Bonjour Digital World Coaching,',
                '',
                'Nom : ' + (name || '—'),
                'Email : ' + (email || '—'),
                'WhatsApp : ' + (phone || '—'),
                'Service souhaité : ' + (service || '—'),
                'Modalité : ' + (modality || '—'),
                '',
                'Message :',
                message || '—'
            ];
            var text = lines.join('\n');

            if (mode === 'whatsapp') {
                var url = 'https://wa.me/' + DWC_WA_NUMBER + '?text=' + encodeURIComponent(text);
                window.open(url, '_blank', 'noopener');
            } else {
                var subject = 'Demande de contact — ' + (service || 'Site web') + (name ? ' — ' + name : '');
                window.location.href = 'mailto:' + DWC_EMAIL +
                    '?subject=' + encodeURIComponent(subject) +
                    '&body=' + encodeURIComponent(text);
            }
        });
    }

    // ---- Bouton "Envoyer via WhatsApp" -> bascule le mode puis soumet ----
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

    // ---- Année du footer ----
    var yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});