document.addEventListener('DOMContentLoaded', () => {
  // Ano dinâmico no rodapé
  document.getElementById('year').textContent = new Date().getFullYear();

  // Header com sombra ao rolar
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Menu mobile
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  navToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open');
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
    });
  });

  // Animação de revelação ao rolar a página
  const revealEls = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));

  // Formulário de contato -> envia via WhatsApp
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formNote.textContent = 'Por favor, preencha todos os campos.';
      return;
    }

    const text = `Olá, meu nome é ${name}.\nE-mail: ${email}\n\n${message}`;
    const whatsappUrl = `https://wa.me/5527998021232?text=${encodeURIComponent(text)}`;

    formNote.textContent = 'Abrindo o WhatsApp...';
    window.open(whatsappUrl, '_blank');
    form.reset();
  });
});
