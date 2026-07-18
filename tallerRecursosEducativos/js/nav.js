// js/nav.js
// Inyecta el shell (topbar + sidebar) y la navegación anterior/siguiente
// a partir de TALLER_NAV (nav-data.js). Solo se usa en páginas con
// class="tiene-sidebar" en <body> (curso.html y páginas de módulos).
// Lee data-module / data-page / data-root desde <body>.

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  if (!body.classList.contains('tiene-sidebar')) return;

  const root = body.dataset.root || './';   // "./" en la raíz, "../" en cualquier módulo
  const modId = body.dataset.module || null; // "01".."10", ausente en curso.html
  const pageId = body.dataset.page || null;  // "00".."0N"

  renderTopbar(root);
  renderModuleBar(modId);
  renderSidebar(root, modId, pageId);
  renderFooterNav(root, modId, pageId);
  renderModulosGrid(root);
  initSidebarToggle();
});

function renderTopbar(root) {
  document.getElementById('site-header').innerHTML = `
    <header class="topbar">
      <a class="topbar__marca" href="${root}curso.html">${TALLER_NAV.siteTitle}</a>
      <button class="topbar__toggle" id="toggleSidebar" aria-expanded="true">☰ Menú</button>
    </header>`;
}

function renderModuleBar(modId) {
  const mount = document.getElementById('site-modulebar');
  if (!mount) return;
  if (!modId) { mount.innerHTML = ''; return; }

  const mod = TALLER_NAV.modules.find(m => m.id === modId);
  document.body.classList.add('con-modulo');
  mount.innerHTML = `<div class="subbarra-modulo">Módulo ${mod.id} — ${mod.title}</div>`;
}

function renderSidebar(root, modId, pageId) {
  const modulesHtml = TALLER_NAV.modules.map(m => {
    const isCurrent = m.id === modId;
    const pagesHtml = m.pages.map(p => {
      const href = isCurrent ? p.file : `${root}${m.slug}/${p.file}`;
      const activo = isCurrent && p.id === pageId ? ' activo' : '';
      return `<a href="${href}" class="${activo.trim()}">${p.title}</a>`;
    }).join('');

    return `
      <details class="sidebar__modulo" ${isCurrent ? 'open' : ''}>
        <summary class="${isCurrent ? 'activo-modulo' : ''}">Módulo ${m.id} — ${m.title}</summary>
        <div class="sidebar__paginas">${pagesHtml}</div>
      </details>`;
  }).join('');

  document.getElementById('site-sidebar').innerHTML = `
    <aside class="sidebar" id="sidebarPanel">
      <a class="sidebar__inicio" href="${root}curso.html">🏠 Inicio del curso</a>
      ${modulesHtml}
    </aside>`;
}

function renderFooterNav(root, modId, pageId) {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  if (!modId) {
    // curso.html: sin módulo activo — ofrece empezar por el primero.
    const primerModulo = TALLER_NAV.modules[0];
    footer.innerHTML = `
      <footer class="pie">
        <div class="nav-prev-next">
          <span></span>
          <a class="btn-nav btn-nav--siguiente" href="${root}${primerModulo.slug}/index.html">Comenzar Módulo ${primerModulo.id} →</a>
        </div>
      </footer>`;
    return;
  }

  const modIndex = TALLER_NAV.modules.findIndex(m => m.id === modId);
  const mod = TALLER_NAV.modules[modIndex];
  const pageIndex = mod.pages.findIndex(p => p.id === pageId);
  const prevPage = mod.pages[pageIndex - 1] || null;
  const nextPage = mod.pages[pageIndex + 1] || null;
  const nextMod = TALLER_NAV.modules[modIndex + 1] || null;

  footer.innerHTML = `
    <footer class="pie">
      <div class="nav-prev-next">
        ${prevPage
          ? `<a class="btn-nav" href="${prevPage.file}">← ${prevPage.title}</a>`
          : `<span></span>`}
        ${nextPage
          ? `<a class="btn-nav btn-nav--siguiente" href="${nextPage.file}">${nextPage.title} →</a>`
          : (nextMod
              ? `<a class="btn-nav btn-nav--siguiente" href="${root}${nextMod.slug}/index.html">Ir a Módulo ${nextMod.id} →</a>`
              : `<a class="btn-nav btn-nav--siguiente" href="${root}curso.html">Volver al inicio →</a>`)}
      </div>
    </footer>`;
}

function renderModulosGrid(root) {
  const mount = document.getElementById('modulos-grid');
  if (!mount) return;

  mount.innerHTML = TALLER_NAV.modules.map(m => `
    <a class="modulo-tarjeta" href="${root}${m.slug}/index.html">
      <div class="modulo-tarjeta__numero">Módulo ${m.id}</div>
      <div class="modulo-tarjeta__titulo">${m.title}</div>
    </a>`).join('');
}

function initSidebarToggle() {
  const btn = document.getElementById('toggleSidebar');
  if (!btn) return;
  const oculto = localStorage.getItem('taller-sidebar-oculto') === '1';
  document.body.classList.toggle('sidebar-oculto', oculto);
  btn.setAttribute('aria-expanded', String(!oculto));

  btn.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-oculto');
    const estaOculto = document.body.classList.contains('sidebar-oculto');
    localStorage.setItem('taller-sidebar-oculto', estaOculto ? '1' : '0');
    btn.setAttribute('aria-expanded', String(!estaOculto));
  });
}
