if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('pageshow', () => window.scrollTo(0, 0));

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
  menu.textContent = open ? 'Close' : 'Menu';
});
nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.textContent = 'Menu';
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

const enquiryForm = document.querySelector('#enquiry-form');
const formStatus = document.querySelector('#form-status');
enquiryForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = enquiryForm.querySelector('button[type="submit"]');
  button.disabled = true;
  button.innerHTML = 'Sending…';
  formStatus.textContent = 'Sending your enquiry…';
  try {
    const response = await fetch('https://formsubmit.co/ajax/Pbank0001@gmail.com', {
      method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(enquiryForm)
    });
    if (!response.ok) throw new Error('Submission failed');
    formStatus.textContent = 'Thank you — your enquiry was sent. We will be in touch soon.';
    enquiryForm.reset();
  } catch (error) {
    formStatus.textContent = 'We could not send this just now. Please call or WhatsApp +234 703 080 3037.';
  } finally {
    button.disabled = false;
    button.innerHTML = 'Send enquiry <span>→</span>';
  }
});
