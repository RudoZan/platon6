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

  const sequence = [];

  // 1. Portada principal del taller (index.html)
  sequence.push({
    type: 'portada',
    title: 'Volver a la portada',
    href: `${root}index.html`
  });

  // 2. Inicio del curso con cuadrícula de módulos (curso.html)
  sequence.push({
    type: 'curso',
    modId: null,
    pageId: null,
    title: 'Inicio del curso',
    href: `${root}curso.html`
  });

  // 3. Secuencia continua de todas las páginas de todos los módulos
  TALLER_NAV.modules.forEach(m => {
    m.pages.forEach(p => {
      sequence.push({
        type: 'page',
        modId: m.id,
        modSlug: m.slug,
        pageId: p.id,
        pageFile: p.file,
        pageTitle: p.title,
        href: `${root}${m.slug}/${p.file}`
      });
    });
  });

  // Identificar el índice de la página actual en la secuencia continua
  let currIndex = -1;
  if (!modId) {
    // Si no hay modId, estamos en curso.html
    currIndex = 1;
  } else {
    currIndex = sequence.findIndex(s => s.type === 'page' && s.modId === modId && s.pageId === pageId);
  }

  if (currIndex === -1) return;

  const prevItem = sequence[currIndex - 1] || null;
  const nextItem = sequence[currIndex + 1] || null;

  // Renderizar botón Anterior
  let prevHtml = '<span></span>';
  if (prevItem) {
    let label = '';
    let href = prevItem.href;

    if (prevItem.type === 'portada') {
      label = '← Volver a la portada';
    } else if (prevItem.type === 'curso') {
      label = '← Inicio del curso';
    } else if (prevItem.type === 'page') {
      if (prevItem.modId === modId) {
        label = `← ${prevItem.pageTitle}`;
        href = prevItem.pageFile;
      } else {
        label = `← Mód. ${prevItem.modId}: ${prevItem.pageTitle}`;
      }
    }
    prevHtml = `<a class="btn-nav" href="${href}">${label}</a>`;
  }

  // Renderizar botón Siguiente
  let nextHtml = '<span></span>';
  if (nextItem) {
    let label = '';
    let href = nextItem.href;

    if (nextItem.type === 'page') {
      if (nextItem.modId === modId) {
        label = `${nextItem.pageTitle} →`;
        href = nextItem.pageFile;
      } else {
        label = `Mód. ${nextItem.modId}: ${nextItem.pageTitle} →`;
      }
    } else if (nextItem.type === 'curso') {
      label = `Inicio del curso →`;
    }
    nextHtml = `<a class="btn-nav btn-nav--siguiente" href="${href}">${label}</a>`;
  } else {
    nextHtml = `<a class="btn-nav btn-nav--siguiente" href="${root}curso.html">Volver al inicio →</a>`;
  }

  footer.innerHTML = `
    <footer class="pie">
      <div class="nav-prev-next">
        ${prevHtml}
        ${nextHtml}
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
