import { capabilities, company, process } from './data.js';
import { filterCapabilities, getDisclosure, validateEnquiry } from './lib.js';
const qs = (s, r = document) => r.querySelector(s);
const qsa = (s, r = document) => [...r.querySelectorAll(s)];
function renderCapabilities(filter = 'all') { const grid = qs('#capabilityGrid'); if (!grid)
    return; grid.innerHTML = filterCapabilities(capabilities, filter).map(item => `<button class="capability-card" type="button" data-capability="${item.id}"><div class="capability-media"><img src="${item.image.source}" alt="${item.image.alt}" loading="lazy"><span>${getDisclosure(item.image)}</span></div><div class="capability-copy"><small>${item.number} / KAPACITA</small><h3>${item.title}</h3><p>${item.summary}</p><i>Otevřít detail ↗</i></div></button>`).join(''); }
function renderProcess() { const list = qs('#processList'); if (!list)
    return; list.innerHTML = process.map(item => `<li><span>${item.number}</span><div><h3>${item.title}</h3><p>${item.text}</p></div></li>`).join(''); }
function openCapability(id) { const item = capabilities.find(x => x.id === id); const dialog = qs('#capabilityDialog'); const content = dialog && qs('[data-capability-content]', dialog); if (!item || !dialog || !content)
    return; content.innerHTML = `<div class="capability-dialog-media"><img src="${item.image.source}" alt="${item.image.alt}"><span>${getDisclosure(item.image)}</span></div><div class="capability-dialog-copy"><p class="eyebrow">${item.number} / CAPABILITY</p><h2>${item.title}</h2><p>${item.summary}</p><ul>${item.bullets.map(x => `<li>${x}</li>`).join('')}</ul><div class="future-case"><small>FORMÁT BUDOUCÍ REFERENCE</small><strong>Klient · lokalita · rozsah · rok · technické řešení · fotografie</strong><p>Obsah realizace dodá společnost po schválení. Tato demo karta není tvrzením o dokončeném projektu.</p></div><button class="button button--orange" type="button" data-open-enquiry>Firemní poptávka</button></div>`; dialog.showModal(); }
function bindNavigation() { const t = qs('#menuToggle'), n = qs('#mobileNav'); t?.addEventListener('click', () => { const open = t.getAttribute('aria-expanded') !== 'true'; t.setAttribute('aria-expanded', String(open)); n?.toggleAttribute('hidden', !open); document.body.classList.toggle('nav-open', open); }); n?.addEventListener('click', e => { if (e.target.closest('a')) {
    n.hidden = true;
    t?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
} }); }
function bindForm() { const d = qs('#enquiryDialog'), f = qs('#enquiryForm'); document.addEventListener('click', e => { if (e.target.closest('[data-open-enquiry]'))
    d?.showModal(); }); f?.addEventListener('submit', e => { e.preventDefault(); const fd = new FormData(f); const data = { organisation: String(fd.get('organisation') || ''), ico: String(fd.get('ico') || ''), contact: String(fd.get('contact') || ''), email: String(fd.get('email') || ''), phone: String(fd.get('phone') || ''), projectType: String(fd.get('projectType') || ''), location: String(fd.get('location') || ''), phase: String(fd.get('phase') || ''), budget: String(fd.get('budget') || ''), deadline: String(fd.get('deadline') || ''), message: String(fd.get('message') || '') }; const errors = validateEnquiry(data); qsa('[data-error]', f).forEach(x => x.textContent = ''); Object.entries(errors).forEach(([k, v]) => { const n = qs(`[data-error="${k}"]`, f); if (n)
    n.textContent = v; }); if (Object.keys(errors).length)
    return; f.innerHTML = `<div class="success-state"><span>✓</span><p class="eyebrow">DEMO / READY</p><h2>Firemní zadání je připravené.</h2><p>Tato demonstrační verze osobní údaje neodesílá. Produkční web bude napojen na schválenou firemní adresu nebo CRM.</p><button class="button button--dark" type="button" data-dialog-close>Zavřít</button></div>`; }); }
function bindDialogs() { qsa('dialog').forEach(d => d.addEventListener('click', e => { const t = e.target; if (t === d || t.closest('[data-dialog-close]'))
    d.close(); })); }
function bindInteractions() { qs('#capabilityFilters')?.addEventListener('click', e => { const b = e.target.closest('[data-filter]'); if (!b)
    return; qsa('[data-filter]').forEach(x => x.classList.remove('is-active')); b.classList.add('is-active'); renderCapabilities(b.dataset.filter); }); qs('#capabilityGrid')?.addEventListener('click', e => { const b = e.target.closest('[data-capability]'); if (b)
    openCapability(b.dataset.capability); }); }
renderCapabilities();
renderProcess();
bindNavigation();
bindForm();
bindDialogs();
bindInteractions();
console.info(`${company.legalName} demo initialized`);
