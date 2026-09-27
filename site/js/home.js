// Digital World Coaching — Page d'accueil
// Compteur animé des statistiques + parallaxe légère des halos

document.addEventListener('DOMContentLoaded', function () {

    // ---- Compteur animé des 3 statistiques ----
    function animateCounter(el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var decimals = (el.getAttribute('data-decimals') || '0');
        var decimalsN = parseInt(decimals, 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var prefix = el.getAttribute('data-prefix') || '';
        var duration = 1400;
        var start = null;

        function step(ts) {
            if (!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            // easeOutCubic
            var eased = 1 - Math.pow(1 - progress, 3);
            var value = target * eased;
            el.textContent = prefix + value.toFixed(decimalsN) + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = prefix + target.toFixed(decimalsN) + suffix;
            }
        }
        requestAnimationFrame(step);
    }

    var counters = document.querySelectorAll('.dwc-stat-value[data-count]');
    if (counters.length) {
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });
            counters.forEach(function (el) { io.observe(el); });
        } else {
            counters.forEach(animateCounter);
        }
    }

    // ---- Parallaxe légère des halos du hero ----
    var halos = document.querySelectorAll('.dwc-parallax');
    if (halos.length && window.matchMedia('(min-width: 768px)').matches) {
        window.addEventListener('scroll', function () {
            var y = window.pageYOffset;
            halos.forEach(function (el, i) {
                var speed = 0.08 + i * 0.05;
                el.style.transform = 'translateY(' + (y * speed) + 'px)';
            });
        }, { passive: true });
    }
});