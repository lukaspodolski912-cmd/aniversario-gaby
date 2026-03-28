function setFavicon(iconPath) {
  let link = document.querySelector("link[rel*='icon']");
  
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  link.type = 'image/png';
  link.href = iconPath ? iconPath + '?v=' + new Date().getTime() : '';
}

const hiddenIcon = '';
const finalIcon = 'imagens/favicon.png';

document.documentElement.classList.remove('no-js');

(function () {

  const targetDate = new Date('2026-03-27T00:00:00');
  const originalTitle = 'Parabéns, Gaby ❤️';
  const hiddenTitle = 'Mais perto do que longe!';

  const countdownEl = document.getElementById('countdown');
  const prelaunch = document.getElementById('prelaunch');
  const main = document.getElementById('main');
  const statusTitulo = document.getElementById('status-titulo');
  const statusSubtitle = document.getElementById('status-subtitle');

  let observer;
  let liberado = false;

  function pad(n) {
    return n.toString().padStart(2, '0');
  }

  function iniciarAnimacaoTexto() {
    const paragraphs = document.querySelectorAll('.card-content p');

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    paragraphs.forEach(p => observer.observe(p));
  }

  function mostrarMain() {
  statusTitulo.textContent = 'Parabéns, Gaby!';
  statusSubtitle.textContent = 'A grande data chegou';

  setTimeout(() => {
    prelaunch.classList.add('hidden');

    setTimeout(() => {
      prelaunch.classList.add('hidden');

      setTimeout(() => {
        prelaunch.style.display = 'none';
      }, 800);
      main.classList.remove('hidden');

      setTimeout(() => {
        iniciarAnimacaoTexto();
      }, 300);

    }, 800);

  }, 2500);
}

  function update() {
    const now = new Date();
    let diff = targetDate - now;

    if (diff > 0) {
      document.title = hiddenTitle;
      setFavicon(hiddenIcon);
    }

    if (diff <= 0 && !liberado) {
      liberado = true;

      document.title = originalTitle;
      setFavicon(finalIcon);

      mostrarMain();
      clearInterval(timer);
      countdownEl.textContent = '00d 00h 00m 00s';
      return;
    }

    if (diff <= 0) return;

    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000);
    diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);

    countdownEl.textContent =
      `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }

  update();
  const timer = setInterval(update, 1000);

})();
