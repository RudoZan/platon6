(() => {
  const panel = document.createElement('aside');
  panel.className = 'debug-panel';
  panel.setAttribute('aria-label', 'Estado de depuracion de la simulacion');

  const heading = document.createElement('h2');
  heading.textContent = 'Debug de simulacion';

  const header = document.createElement('div');
  header.className = 'debug-panel-header';

  const resetButton = document.createElement('button');
  resetButton.className = 'debug-panel-reset';
  resetButton.type = 'button';
  resetButton.textContent = 'Reiniciar';
  resetButton.title = 'Borrar el progreso y reiniciar la simulacion';
  resetButton.setAttribute('aria-label', 'Borrar el progreso y reiniciar la simulacion');
  resetButton.addEventListener('click', () => {
    if (typeof window.resetSimulators === 'function') window.resetSimulators();
  });

  const metadata = document.createElement('div');
  metadata.className = 'debug-panel-metadata';

  metadata.textContent = 'Estado en memoria. Se pierde al recargar o cerrar la pagina.';

  const groupsContainer = document.createElement('div');
  groupsContainer.className = 'debug-panel-groups';
  const groups = [
    ['persona', 'Persona'],
    ['config', 'Configuracion'],
    ['simulation', 'Simulacion'],
    ['finances', 'Finanzas'],
    ['assets', 'Activos'],
    ['work', 'Trabajo'],
    ['wellbeing', 'Bienestar'],
    ['interface', 'Interfaz']
  ];
  const groupViews = groups.map(([key, label], index) => {
    const section = document.createElement('details');
    section.className = 'debug-panel-group';
    section.open = index === 0;

    const summary = document.createElement('summary');
    summary.textContent = label;

    const content = document.createElement('pre');
    content.className = 'debug-panel-snapshot';
    content.tabIndex = 0;

    section.append(summary, content);
    groupsContainer.append(section);
    return { key, content };
  });

  header.append(heading, resetButton);
  panel.append(header, metadata, groupsContainer);
  document.body.append(panel);

  function renderSnapshot() {
    if (typeof window.getSimulationDebugState !== 'function') {
      groupsContainer.textContent = 'No se pudo acceder al estado en memoria.';
      return;
    }

    const state = window.getSimulationDebugState();
    groupViews.forEach(({ key, content }) => {
      content.textContent = JSON.stringify(state[key] ?? {}, null, 2);
    });
  }

  renderSnapshot();
  window.setInterval(renderSnapshot, 1000);
  window.addEventListener('focus', renderSnapshot);
})();