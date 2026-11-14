/* 12 de Outubro | JavaScript
   Toasts de boas-vindas e de confirmação, botão de copiar a oração
   e animação dos blocos ao rolar a página. */

document.addEventListener('DOMContentLoaded', function () {

    /* 1. Toast de boas-vindas, 1,2 segundo depois de abrir a página */
    var boasVindas = bootstrap.Toast.getOrCreateInstance(document.getElementById('toastBoasVindas'));
    setTimeout(function () { boasVindas.show(); }, 1200);

    /* 2. Copiar a oração e avisar com um toast */
    document.getElementById('btnCopiar').addEventListener('click', function () {
        var texto = document.getElementById('textoOracao').innerText.trim();

        var avisar = function () {
            bootstrap.Toast.getOrCreateInstance(document.getElementById('toastCopiado')).show();
        };

        /* plano B para navegadores que bloqueiam o clipboard */
        var copiarAntigo = function () {
            var area = document.createElement('textarea');
            area.value = texto;
            document.body.appendChild(area);
            area.select();
            document.execCommand('copy');
            document.body.removeChild(area);
            avisar();
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(texto).then(avisar).catch(copiarAntigo);
        } else {
            copiarAntigo();
        }
    });

    /* 3. Os blocos aparecem suavemente quando entram na tela */
    var reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduzirMovimento && 'IntersectionObserver' in window) {
        var observador = new IntersectionObserver(function (entradas, obs) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('is-visible');
                    obs.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('main .container > *').forEach(function (bloco) {
            bloco.classList.add('reveal');
            observador.observe(bloco);
        });
    }
});
