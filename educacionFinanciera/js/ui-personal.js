// Personal (Mi Estado) Hub: Bienestar, 3-Col Budget, Net Worth, Investor Test & Secret Audit — educacionFinanciera

    function renderPersonalStage(subView = 'main') {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      const titleElem = document.getElementById('hub-stage-title');
      const subtitleElem = document.getElementById('hub-stage-subtitle');
      const iconBox = document.getElementById('hub-stage-icon-box');

      if (iconBox) {
        iconBox.className = 'hub-stage-header-icon dock-icon-box icon-estado';
        iconBox.style.cursor = 'pointer';
        iconBox.title = 'Resumen de variables del personaje';
        iconBox.onclick = () => renderPersonalStage('secret_summary');
      }

      if (titleElem) titleElem.innerText = 'Personal';
      if (subtitleElem) {
        subtitleElem.innerText = subView === 'secret_summary'
          ? 'Resumen secreto de variables del personaje'
          : 'Vida personal, bienestar y finanzas';
      }

      const homes = (state.selectedHomes && state.selectedHomes.length >= 2)
        ? state.selectedHomes.map(i => homeOptions[i] || homeOptions[0])
        : [homeOptions[1], homeOptions[0]];

      const jobs = (state.selectedJobs && state.selectedJobs.length >= 2)
        ? state.selectedJobs.map(i => jobOptions[i] || jobOptions[0])
        : [jobOptions[1], jobOptions[0]];

      const transports = (state.selectedTransports && state.selectedTransports.length >= 2)
        ? state.selectedTransports.map(i => transportOptions[i] || transportOptions[0])
        : [transportOptions[1], transportOptions[2]];

      // Realidad actual del personaje:
      // Máximo 1 trabajo, pero puede tener múltiples propiedades y múltiples vehículos.
      // Al partir no tiene nada; si no tiene trabajo, propiedades o vehículos, simplemente no se muestra.
      const currentJob = state.currentJob;
      const properties = Array.isArray(state.properties) ? state.properties : [];
      const vehicles = Array.isArray(state.vehicles) ? state.vehicles : [];

      let assetItemsHtml = '';

      if (currentJob) {
        assetItemsHtml += `
          <div class="personal-asset-item">
            <div class="personal-asset-icon">${currentJob.icon || '💼'}</div>
            <div class="personal-asset-type">Trabajo</div>
            <div class="personal-asset-name">${typeof currentJob === 'string' ? currentJob : currentJob.name}</div>
          </div>
        `;
      }

      properties.forEach(p => {
        const icon = typeof p === 'object' && p.icon ? p.icon : '🏠';
        const name = typeof p === 'object' && p.name ? p.name : p;
        assetItemsHtml += `
          <div class="personal-asset-item">
            <div class="personal-asset-icon">${icon}</div>
            <div class="personal-asset-type">Propiedad</div>
            <div class="personal-asset-name">${name}</div>
          </div>
        `;
      });

      vehicles.forEach(v => {
        const icon = typeof v === 'object' && v.icon ? v.icon : '🚗';
        const name = typeof v === 'object' && v.name ? v.name : v;
        assetItemsHtml += `
          <div class="personal-asset-item">
            <div class="personal-asset-icon">${icon}</div>
            <div class="personal-asset-type">Vehículo</div>
            <div class="personal-asset-name">${name}</div>
          </div>
        `;
      });

      const actualSituationHtml = assetItemsHtml ? `
        <!-- 3. POSESIONES ACTUALES DEBAJO DE PATRIMONIO (SOLO SI TIENE POSESIONES) -->
        <div class="personal-assets-block" style="margin-top: 8px;">
          <div class="personal-assets-title">
            <span>📌</span> <span>Situación Actual</span>
          </div>
          <div class="personal-assets-grid">
            ${assetItemsHtml}
          </div>
        </div>
      ` : '';

      // Cuentas líquidas contratadas (solo las que existen en state.bankAccounts)
      const liquidAccounts = (state.bankAccounts || []).filter(acc =>
        acc.isLiquid || ['corriente', 'vista', 'rut'].some(k => (acc.id || '').toLowerCase().includes(k) || (acc.name || '').toLowerCase().includes(k))
      );
      const totalLiquid = (state.cash || 0) + liquidAccounts.reduce((sum, a) => sum + (a.balance || 0), 0);

      // Si no tiene empleo, el sueldo refleja estrictamente 0
      const salary = currentJob ? (currentJob.salary || 0) : 0;

      if (subView === 'main') {
        container.innerHTML = `
          <!-- 1. INDICADORES DIRECTOS: BIENESTAR EN 20 CORAZONES Y DINERO EN EFECTIVO -->
          <div class="personal-kpis-row">
            <div class="personal-kpi-card kpi-bienestar">
              <div class="personal-kpi-top">
                <span class="personal-kpi-label">Bienestar</span>
                <span class="personal-kpi-icon" style="font-size: 1.15rem;">${getBienestarFace(state.mentalPeace)}</span>
              </div>
              ${renderHeartsMeter(state.mentalPeace)}
            </div>

            <div class="personal-kpi-card kpi-efectivo">
              <div class="personal-kpi-top">
                <span class="personal-kpi-label">Dinero Disponible</span>
                <span class="personal-kpi-icon">💵</span>
              </div>
              <div class="personal-kpi-value">$${totalLiquid.toLocaleString('es-CL')}</div>
              <div style="font-size: 0.58rem; color: #64748b; margin-top: 2px;">Liquidez Total</div>
            </div>
          </div>

          <!-- 2. BOTONES DE ACCESO DIRECTO -->
          <div class="personal-access-grid">
            <button type="button" class="personal-access-btn" onclick="renderPersonalStage('inversionista')">
              <div class="personal-access-left">
                <div class="personal-access-icon">🎯</div>
                <div class="personal-access-texts">
                  <div class="personal-access-name">
                    Perfil de Inversionista${state.riskTestResult ? `: <span style="color: ${state.riskTestResult.color}; font-weight: 800;">${state.riskTestResult.label}</span>` : ''}
                  </div>
                  <div class="personal-access-desc">Tolerancia al riesgo, liquidez y horizonte</div>
                </div>
              </div>
              <span class="personal-access-arrow">➔</span>
            </button>

            <button type="button" class="personal-access-btn" onclick="renderPersonalStage('presupuesto')">
              <div class="personal-access-left">
                <div class="personal-access-icon">📊</div>
                <div class="personal-access-texts">
                  <div class="personal-access-name">Presupuesto Mensual</div>
                  <div class="personal-access-desc">Dinero disponible, ingresos y regla 50/30/20</div>
                </div>
              </div>
              <span class="personal-access-arrow">➔</span>
            </button>

            <button type="button" class="personal-access-btn" onclick="renderPersonalStage('patrimonio')">
              <div class="personal-access-left">
                <div class="personal-access-icon">💰</div>
                <div class="personal-access-texts">
                  <div class="personal-access-name">Patrimonio & Liquidez</div>
                  <div class="personal-access-desc">Efectivo disponible, reservas e inversiones totales</div>
                </div>
              </div>
              <span class="personal-access-arrow">➔</span>
            </button>

            <button type="button" class="personal-access-btn" onclick="goToInterestsScreen()">
              <div class="personal-access-left">
                <div class="personal-access-icon">⭐</div>
                <div class="personal-access-texts">
                  <div class="personal-access-name">Intereses Personales y Preferencias</div>
                  <div class="personal-access-desc">Configura tus intereses y preferencias personales</div>
                </div>
              </div>
              <span class="personal-access-arrow">➔</span>
            </button>
          </div>

          <!-- 3. POSESIONES ACTUALES DEBAJO DE PATRIMONIO -->
          ${actualSituationHtml}
        `;
      } else if (subView === 'inversionista') {
        const result = state.riskTestResult;

        let statusBoxHtml = '';
        if (!result) {
          statusBoxHtml = `
            <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 12px 10px; text-align: center; margin-bottom: 9px;">
              <div style="font-size: 1.25rem; margin-bottom: 4px;">📋</div>
              <div style="font-size: 0.72rem; font-weight: 700; color: #1e293b;">Aún no has realizado el test de perfil de inversionista</div>
              <div style="font-size: 0.60rem; color: #64748b; margin-top: 3px; line-height: 1.3;">
                Responde 5 breves preguntas para identificar tu tolerancia a la volatilidad y los instrumentos recomendados.
              </div>
            </div>
            <button type="button" class="btn-step-next" style="width: 100%; margin: 0; padding: 9px; font-size: 0.78rem;" onclick="startRiskTest()">
              Ir al test
            </button>
          `;
        } else {
          statusBoxHtml = `
            <div style="background: #ffffff; border: 1.5px solid ${result.color}; border-radius: 8px; padding: 10px; margin-bottom: 8px; text-align: center;">
              <div style="font-size: 0.60rem; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Tu Perfil Determinado</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: ${result.color}; margin: 3px 0;">
                ${result.label}
              </div>
              <div style="font-size: 0.68rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">
                Puntaje obtenido: ${result.score} de 15 puntos
              </div>
              <p style="font-size: 0.63rem; color: #475569; line-height: 1.35; margin: 0; text-align: left; background: #f8fafc; padding: 7px 9px; border-radius: 6px;">
                ${result.desc}
              </p>
            </div>

            <button type="button" class="btn-step-next" style="width: 100%; margin: 0; padding: 9px; font-size: 0.78rem;" onclick="startRiskTest()">
              Ir al test
            </button>
          `;
        }

        container.innerHTML = `
          <div class="personal-subview-box">
            <!-- CABECERA: TÍTULO A LA IZQUIERDA Y BOTÓN VOLVER A LA DERECHA -->
            <div class="personal-subview-top">
              <span style="font-size: 0.85rem; font-weight: 800; color: #8b5cf6;">🎯 Perfil de Inversionista</span>
              <button type="button" class="personal-subview-back-btn" onclick="renderPersonalStage('main')">
                <span>◀ Volver</span>
              </button>
            </div>

            <!-- DESCRIPCIÓN DEL PERFIL DE INVERSIONISTA -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 9px; margin-bottom: 7px;">
              <p style="font-size: 0.64rem; color: #475569; line-height: 1.35; margin: 0;">
                El perfil de inversionista evalúa tu tolerancia a las fluctuaciones del mercado y el plazo de tus inversiones. Con estas respuestas, clasifica tu perfil en tres categorías: Conservador, Moderado o Arriesgado.
              </p>
            </div>

            <!-- RESULTADO O INVITACIÓN A HACER TEST -->
            ${statusBoxHtml}
          </div>
        `;
      } else if (subView === 'presupuesto') {
        const baseItems = Array.isArray(state.budgetItems) ? state.budgetItems : [];
        const debtItems = (Array.isArray(state.debts) && state.debts.length > 0) ? state.debts.map(d => ({
          id: d.id,
          name: d.name,
          desc: d.desc || 'Cuota mensual de deuda',
          icon: d.icon || '💳',
          budget: d.monthlyPayment || d.budget || 0,
          real: d.real !== undefined ? d.real : (d.monthlyPayment || d.budget || 0),
          isDebt: true
        })) : [];
        const customItems = Array.isArray(state.customBudgetItems) ? state.customBudgetItems : [];
        const allBudgetItems = [...baseItems, ...debtItems, ...customItems];

        const totalBudget = allBudgetItems.reduce((acc, i) => acc + (i.budget || 0), 0);
        const totalReal = allBudgetItems.reduce((acc, i) => acc + (i.real !== undefined ? i.real : (i.budget || 0)), 0);
        const netBudgetDifference = salary - totalBudget;

        const accountsRowsHtml = liquidAccounts.map(acc => `
          <tr style="border-top: 1px solid #f1f5f9;">
            <td style="padding: 4px 2px; color: #334155; font-size: 0.70rem;">
              <span style="margin-right: 4px;">${acc.icon || '💳'}</span> ${acc.name}
            </td>
            <td style="padding: 4px 2px; text-align: right; font-weight: 700; color: #0f172a; font-size: 0.70rem; white-space: nowrap;">
              $${(acc.balance || 0).toLocaleString('es-CL')}
            </td>
          </tr>
        `).join('');

        container.innerHTML = `
          <div class="personal-subview-box">
            <!-- CABECERA: TÍTULO A LA IZQUIERDA Y BOTÓN VOLVER A LA DERECHA -->
            <div class="personal-subview-top">
              <span style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">📊 Presupuesto Mensual</span>
              <button type="button" class="personal-subview-back-btn" onclick="renderPersonalStage('main')">
                <span>◀ Volver</span>
              </button>
            </div>

            <!-- FILA 2 COLUMNAS: DINERO DISPONIBLE (IZQ) E INGRESO ESTIMADO (DER - ANGOSTO) -->
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 6px; margin-bottom: 7px; align-items: stretch;">

              <!-- 1. COLUMNA IZQUIERDA: DINERO DISPONIBLE -->
              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 8px; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                  <div>
                    <div style="font-size: 0.65rem; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.3px;">Dinero Disponible</div>
                    <div style="font-size: 0.56rem; color: #64748b;">Liquidez inmediata</div>
                  </div>
                  <div style="font-size: 0.95rem; font-weight: 800; color: #0284c7; font-family: var(--font-title); white-space: nowrap;">
                    $${totalLiquid.toLocaleString('es-CL')}
                  </div>
                </div>

                <!-- TABLA CUENTAS LÍQUIDAS -->
                <table style="width: 100%; border-collapse: collapse; margin-top: auto;">
                  <tbody>
                    <tr style="border-top: 1px solid #f1f5f9;">
                      <td style="padding: 4px 2px; color: #334155; font-size: 0.70rem;">
                        <span style="margin-right: 2px;">💵</span> Efectivo
                      </td>
                      <td style="padding: 4px 2px; text-align: right; font-weight: 700; color: #0f172a; font-size: 0.70rem; white-space: nowrap;">
                        $${(state.cash || 0).toLocaleString('es-CL')}
                      </td>
                    </tr>
                    ${accountsRowsHtml}
                  </tbody>
                </table>
              </div>

              <!-- 2. COLUMNA DERECHA: INGRESO ESTIMADO -->
              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 8px; display: flex; flex-direction: column;">
                <div style="margin-bottom: 5px;">
                  <div style="font-size: 0.65rem; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.3px;">Ingreso estimado</div>
                </div>

                <!-- LÍNEA ÚNICA DE EMPLEO Y MONTO -->
                <table style="width: 100%; border-collapse: collapse; margin-top: auto;">
                  <tbody>
                    <tr style="border-top: 1px solid #f1f5f9;">
                      <td style="padding: 4px 2px; color: #334155; font-size: 0.70rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 105px;" title="${currentJob ? (typeof currentJob === 'string' ? currentJob : currentJob.name) : 'Sin empleo'}">
                        <span style="margin-right: 2px;">💼</span> ${currentJob ? (typeof currentJob === 'string' ? currentJob : currentJob.name) : 'Sin empleo'}
                      </td>
                      <td style="padding: 4px 2px; text-align: right; font-weight: 700; color: ${salary > 0 ? '#0f172a' : '#64748b'}; font-size: 0.70rem; white-space: nowrap;">
                        $${salary.toLocaleString('es-CL')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

            <!-- TABLA DE PRESUPUESTO MENSUAL (3 COLUMNAS: ITEM / PRESUPUESTO / GASTO REAL) -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-bottom: 7px;">
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f1f5f9; border-bottom: 1.5px solid #cbd5e1; color: #475569; font-weight: 700; text-transform: uppercase; font-size: 0.68rem; letter-spacing: 0.3px;">
                    <th style="padding: 6px 8px; text-align: left;">Ítem</th>
                    <th style="padding: 6px 8px; text-align: right; width: 105px;">Presupuesto</th>
                    <th style="padding: 6px 8px; text-align: right; width: 90px;">Gasto Real</th>
                  </tr>
                </thead>
                <tbody>
                  ${allBudgetItems.map((item) => `
                    <tr style="border-bottom: 1px solid #f1f5f9; background: ${item.isDebt ? '#fffbeb' : '#ffffff'};">
                      <td style="padding: 6px 8px;">
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <span style="font-size: 0.90rem;">${item.icon || '📌'}</span>
                          <div style="line-height: 1.25;">
                            <div style="font-weight: 700; color: #0f172a; font-size: 0.75rem;">${item.name}</div>
                            <div style="font-size: 0.62rem; color: #64748b;">${item.desc || ''}</div>
                          </div>
                          ${item.id && item.id.startsWith('custom_') ? `
                            <button type="button" onclick="deleteCustomBudgetItem('${item.id}')" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 0.68rem; margin-left: auto; padding: 0 4px;" title="Eliminar ítem">✖</button>
                          ` : ''}
                        </div>
                      </td>
                      <td style="padding: 6px 8px; text-align: right;">
                        ${item.isDebt ? `
                          <span style="font-weight: 700; color: #b45309; font-size: 0.74rem;">$${item.budget.toLocaleString('es-CL')}</span>
                        ` : `
                          <div style="display: inline-flex; align-items: center; gap: 3px;">
                            <span style="color: #64748b; font-size: 0.68rem;">$</span>
                            <input type="number" min="0" step="5000" value="${item.budget || 0}"
                              onchange="updateBudgetItem('${item.id}', this.value)"
                              style="width: 72px; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px 5px; font-size: 0.74rem; text-align: right; font-weight: 700; color: #0284c7; background: #ffffff;" />
                          </div>
                        `}
                      </td>
                      <td style="padding: 6px 8px; text-align: right; font-weight: 700; color: #334155; font-size: 0.74rem;">
                        $${(item.real !== undefined ? item.real : (item.budget || 0)).toLocaleString('es-CL')}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot>
                  <tr style="border-top: 1.5px solid #cbd5e1; background: #f8fafc; font-weight: 800;">
                    <td style="padding: 6px 8px; color: #0f172a; font-size: 0.74rem;">Total Gastos</td>
                    <td style="padding: 6px 8px; text-align: right; color: #0284c7; font-size: 0.76rem;">$${totalBudget.toLocaleString('es-CL')}</td>
                    <td style="padding: 6px 8px; text-align: right; color: #0f172a; font-size: 0.76rem;">$${totalReal.toLocaleString('es-CL')}</td>
                  </tr>
                  ${salary > 0 ? `
                    <tr style="background: ${netBudgetDifference >= 0 ? '#f0fdf4' : '#fef2f2'}; font-size: 0.68rem;">
                      <td style="padding: 5px 8px; color: ${netBudgetDifference >= 0 ? '#166534' : '#991b1b'}; font-weight: 700;">
                        ${netBudgetDifference >= 0 ? '✅ Superávit Presupuestado' : '⚠️ Déficit Presupuestado'}
                      </td>
                      <td colspan="2" style="padding: 5px 8px; text-align: right; font-weight: 800; color: ${netBudgetDifference >= 0 ? '#15803d' : '#b91c1c'}; font-size: 0.74rem;">
                        ${netBudgetDifference >= 0 ? `+$${netBudgetDifference.toLocaleString('es-CL')}` : `-$${Math.abs(netBudgetDifference).toLocaleString('es-CL')}`}
                      </td>
                    </tr>
                  ` : ''}
                </tfoot>
              </table>
            </div>

            <!-- BOTÓN Y FORMULARIO PARA AGREGAR ÍTEMS -->
            <div style="margin-bottom: 7px;">
              ${!state.showAddBudgetForm ? `
                <button type="button" onclick="toggleAddBudgetForm(true)" style="width: 100%; padding: 7px; border: 1.5px dashed #cbd5e1; background: #ffffff; border-radius: 6px; font-size: 0.72rem; font-weight: 700; color: #0284c7; cursor: pointer;">
                  + Agregar ítem
                </button>
              ` : `
                <div style="background: #ffffff; border: 1px solid #38bdf8; border-radius: 8px; padding: 9px 11px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
                  <div style="font-size: 0.74rem; font-weight: 800; color: #0284c7; margin-bottom: 7px;">➕ Nuevo Ítem de Presupuesto</div>
                  
                  <!-- Selector Tipo Libre vs Ahorro/Inversión -->
                  <div style="display: flex; gap: 6px; margin-bottom: 7px;">
                    <button type="button" onclick="changeNewBudgetType('free')" style="flex: 1; padding: 5px; border-radius: 5px; border: 1px solid ${state.newBudgetType === 'free' ? '#0284c7' : '#cbd5e1'}; background: ${state.newBudgetType === 'free' ? '#e0f2fe' : '#f8fafc'}; font-size: 0.68rem; font-weight: 700; color: ${state.newBudgetType === 'free' ? '#0369a1' : '#64748b'}; cursor: pointer;">
                      🏷️ Tipo Libre
                    </button>
                    <button type="button" onclick="changeNewBudgetType('invest')" style="flex: 1; padding: 5px; border-radius: 5px; border: 1px solid ${state.newBudgetType === 'invest' ? '#8b5cf6' : '#cbd5e1'}; background: ${state.newBudgetType === 'invest' ? '#ede9fe' : '#f8fafc'}; font-size: 0.68rem; font-weight: 700; color: ${state.newBudgetType === 'invest' ? '#6d28d9' : '#64748b'}; cursor: pointer;">
                      💎 Ahorro / Inversión
                    </button>
                  </div>

                  <div style="display: flex; flex-direction: column; gap: 6px;">
                    <div>
                      <label style="font-size: 0.62rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">Nombre del Ítem</label>
                      <input type="text" id="new-budget-name" placeholder="Ej: Fondo vacaciones / Ahorro auto" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 5px; padding: 5px 7px; font-size: 0.70rem;" />
                    </div>

                    ${state.newBudgetType === 'invest' ? `
                      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                        <div>
                          <label style="font-size: 0.62rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">Instrumento</label>
                          <select id="new-budget-invest-type" onchange="changeInvestInstrument(this.value)" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 5px; padding: 4px 6px; font-size: 0.68rem; background: #ffffff;">
                            <option value="alcancia" ${state.newBudgetInvestType === 'alcancia' ? 'selected' : ''}>1. Alcancía / Colchón</option>
                            <option value="dap" ${state.newBudgetInvestType === 'dap' ? 'selected' : ''}>2. Depósito a Plazo (DAP)</option>
                            <option value="dolares" ${state.newBudgetInvestType === 'dolares' ? 'selected' : ''}>3. Compra de Dólares</option>
                            <option value="fondos" ${state.newBudgetInvestType === 'fondos' ? 'selected' : ''}>4. Fondo Mutuo</option>
                          </select>
                        </div>
                        <div>
                          <label style="font-size: 0.62rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">Origen del Dinero</label>
                          <select id="new-budget-source" ${state.newBudgetInvestType === 'alcancia' ? 'disabled' : ''} style="width: 100%; border: 1px solid #cbd5e1; border-radius: 5px; padding: 4px 6px; font-size: 0.68rem; background: ${state.newBudgetInvestType === 'alcancia' ? '#f1f5f9' : '#ffffff'};">
                            <option value="Efectivo">💵 Dinero en Efectivo</option>
                            ${state.newBudgetInvestType !== 'alcancia' ? (state.bankAccounts || []).map(acc => `<option value="${acc.name}">${acc.icon || '💳'} ${acc.name}</option>`).join('') : ''}
                          </select>
                        </div>
                      </div>
                    ` : ''}

                    <div>
                      <label style="font-size: 0.62rem; font-weight: 700; color: #475569; display: block; margin-bottom: 2px;">Monto Presupuestado ($)</label>
                      <input type="number" id="new-budget-amount" min="0" step="5000" style="width: 100%; border: 1px solid #cbd5e1; border-radius: 5px; padding: 5px 7px; font-size: 0.70rem;" />
                    </div>

                    <div style="display: flex; gap: 6px; margin-top: 4px;">
                      <button type="button" onclick="saveNewBudgetItem()" style="flex: 1; padding: 6px 12px; background: #0284c7; color: #ffffff; border: none; border-radius: 5px; font-size: 0.70rem; font-weight: 700; cursor: pointer;">Guardar ítem</button>
                      <button type="button" onclick="toggleAddBudgetForm(false)" style="padding: 6px 12px; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 5px; font-size: 0.70rem; font-weight: 600; cursor: pointer;">Cancelar</button>
                    </div>
                  </div>
                </div>
              `}
            </div>
          </div>
        `;
      } else if (subView === 'patrimonio') {
        const liquidAccounts = (state.bankAccounts || []).filter(a => a.type !== 'credit');
        const reservesAmount = state.reserves || 0;
        const investedAmount = state.invested || 0;
        const propertiesValue = (state.properties || []).reduce((acc, p) => acc + (p.value || 0), 0);
        const vehiclesValue = (state.vehicles || []).reduce((acc, v) => acc + (v.value || 0), 0);
        const totalAssets = totalLiquid + reservesAmount + investedAmount + propertiesValue + vehiclesValue;
        const totalDebtBalance = (state.debts || []).reduce((acc, d) => acc + (d.totalDebt || d.monthlyPayment || 0), 0);
        const netWorth = totalAssets - totalDebtBalance;

        const monthlyExpenses = (state.budgetItems || []).reduce((acc, i) => acc + (i.real !== undefined ? i.real : (i.budget || 0)), 0);
        const emergencyMonths = (monthlyExpenses > 0 && reservesAmount > 0) ? (reservesAmount / monthlyExpenses).toFixed(1) : 0;

        container.innerHTML = `
          <div class="personal-subview-box">
            <!-- CABECERA: TÍTULO A LA IZQUIERDA Y BOTÓN VOLVER A LA DERECHA -->
            <div class="personal-subview-top">
              <span style="font-size: 0.88rem; font-weight: 800; color: #059669;">💰 Patrimonio & Liquidez</span>
              <button type="button" class="personal-subview-back-btn" onclick="renderPersonalStage('main')">
                <span>◀ Volver</span>
              </button>
            </div>

            <!-- PATRIMONIO NETO TOTAL -->
            <div style="background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%); border: 1px solid #a7f3d0; border-radius: 8px; padding: 8px 10px; margin-bottom: 7px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 0.65rem; color: #047857; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px;">Patrimonio Neto Total</div>
                <div style="font-size: 0.58rem; color: #065f46;">Activos ($${totalAssets.toLocaleString('es-CL')}) - Pasivos ($${totalDebtBalance.toLocaleString('es-CL')})</div>
              </div>
              <div style="font-size: 1.15rem; font-weight: 800; color: #047857; font-family: var(--font-title);">$${netWorth.toLocaleString('es-CL')}</div>
            </div>

            <!-- DESGLOSE DE ACTIVOS REALES -->
            <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 7px;">

              <!-- 1. LIQUIDEZ Y CUENTAS -->
              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 7px; padding: 7px 9px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span style="font-size: 0.65rem; font-weight: 700; color: #1e293b;">💵 Dinero Disponible (Liquidez)</span>
                  <strong style="font-size: 0.82rem; font-weight: 800; color: #0284c7;">$${totalLiquid.toLocaleString('es-CL')}</strong>
                </div>
                <div style="font-size: 0.68rem; color: #334155; display: flex; flex-direction: column; gap: 3px;">
                  <div style="display: flex; justify-content: space-between;">
                    <span>• Efectivo físico:</span>
                    <strong>$${(state.cash || 0).toLocaleString('es-CL')}</strong>
                  </div>
                  ${liquidAccounts.length > 0 ? liquidAccounts.map(a => `
                    <div style="display: flex; justify-content: space-between;">
                      <span>• ${a.icon || '💳'} ${a.name}:</span>
                      <strong>$${(a.balance || 0).toLocaleString('es-CL')}</strong>
                    </div>
                  `).join('') : `
                    <div style="font-size: 0.62rem; color: #94a3b8; font-style: italic;">• Sin cuentas bancarias contratadas</div>
                  `}
                </div>
              </div>

              <!-- 2. RESERVAS E INVERSIONES -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 7px; padding: 7px 9px;">
                  <div style="font-size: 0.62rem; font-weight: 700; color: #1e293b; margin-bottom: 2px;">🛡️ Fondo Reservas</div>
                  <div style="font-size: 0.82rem; font-weight: 800; color: ${reservesAmount > 0 ? '#059669' : '#64748b'};">$${reservesAmount.toLocaleString('es-CL')}</div>
                  <div style="font-size: 0.58rem; color: #94a3b8; margin-top: 2px;">${reservesAmount > 0 ? 'Fondo para imprevistos' : 'Sin fondo acumulado'}</div>
                </div>

                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 7px; padding: 7px 9px;">
                  <div style="font-size: 0.62rem; font-weight: 700; color: #1e293b; margin-bottom: 2px;">📈 Inversiones Activas</div>
                  <div style="font-size: 0.82rem; font-weight: 800; color: ${investedAmount > 0 ? '#8b5cf6' : '#64748b'};">$${investedAmount.toLocaleString('es-CL')}</div>
                  <div style="font-size: 0.58rem; color: #94a3b8; margin-top: 2px;">${investedAmount > 0 ? 'Rentabilizando' : 'Sin inversiones activas'}</div>
                </div>
              </div>

              <!-- 3. DEUDAS Y COMPROMISOS -->
              <div style="background: #ffffff; border: 1px solid ${state.debts && state.debts.length > 0 ? '#fecaca' : '#e2e8f0'}; border-radius: 7px; padding: 7px 9px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span style="font-size: 0.65rem; font-weight: 700; color: ${state.debts && state.debts.length > 0 ? '#b91c1c' : '#1e293b'};">💳 Deudas y Créditos</span>
                  <strong style="font-size: 0.82rem; font-weight: 800; color: ${state.debts && state.debts.length > 0 ? '#b91c1c' : '#059669'};">
                    ${state.debts && state.debts.length > 0 ? `$${state.monthlyDebt.toLocaleString('es-CL')}/mes` : '$0'}
                  </strong>
                </div>
                ${state.debts && state.debts.length > 0 ? `
                  <div style="font-size: 0.68rem; color: #334155; display: flex; flex-direction: column; gap: 3px;">
                    ${state.debts.map(d => `
                      <div style="display: flex; justify-content: space-between;">
                        <span>• ${d.name}:</span>
                        <strong style="color: #b91c1c;">$${(d.monthlyPayment || 0).toLocaleString('es-CL')}/mes</strong>
                      </div>
                    `).join('')}
                  </div>
                ` : `
                  <div style="font-size: 0.62rem; color: #059669; font-weight: 600;">✅ Cero deudas: sin créditos contraídos</div>
                `}
              </div>

              <!-- 4. BIENES RAÍCES Y VEHÍCULOS -->
              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 7px; padding: 7px 9px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                  <span style="font-size: 0.65rem; font-weight: 700; color: #1e293b;">🏠 Propiedades y Vehículos</span>
                  <strong style="font-size: 0.78rem; font-weight: 800; color: #475569;">$${(propertiesValue + vehiclesValue).toLocaleString('es-CL')}</strong>
                </div>
                <div style="font-size: 0.62rem; color: #94a3b8; font-style: italic;">
                  ${(propertiesValue + vehiclesValue) > 0 ? 'Bienes inscritos a tu nombre' : 'Sin bienes raíces ni vehículos registrados ($0)'}
                </div>
              </div>

            </div>

            <!-- COBERTURA REAL DE EMERGENCIA -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; padding: 7px 9px; font-size: 0.68rem; color: #475569; display: flex; align-items: center; justify-content: space-between;">
              <span>🛡️ Cobertura Fondo Emergencia:</span>
              ${emergencyMonths > 0 ? `
                <strong style="color: #059669;">~${emergencyMonths} meses de gastos</strong>
              ` : `
                <strong style="color: ${monthlyExpenses > 0 ? '#b91c1c' : '#64748b'};">${monthlyExpenses > 0 ? '0 meses (Sin fondo acumulado)' : '0 meses'}</strong>
              `}
            </div>
          </div>
        `;
      } else if (subView === 'secret_summary') {
        const hPhysical = state.healthPhysical !== undefined ? state.healthPhysical : 20;
        const hEmotional = state.healthEmotional !== undefined ? state.healthEmotional : 40;
        const hMental = state.healthMental !== undefined ? state.healthMental : 40;
        const peace = Math.max(0, Math.min(100, hPhysical + hEmotional + hMental));
        const peaceHearts = Math.min(20, Math.max(0, Math.round(peace / 5)));
        const peaceFace = getBienestarFace(peace);

        // Trabajo
        const job = state.currentJob;
        const jobName = job ? (typeof job === 'string' ? job : job.name) : null;
        const jobSalaryGross = job && job.grossSalary ? job.grossSalary : null;
        const jobSalaryNet = job && job.salary ? job.salary : (jobSalaryGross ? Math.round(jobSalaryGross * 0.81) : null);
        const jobType = job && job.type ? job.type : (job ? 'Dependiente' : null);
        const jobSchedule = job && job.schedule ? job.schedule : (job ? 'Jornada completa' : null);
        const jobReq = job && job.requirements ? job.requirements : null;

        // Cursos / Estudios cursados
        const courses = Array.isArray(state.courses) ? state.courses : [];

        // Dinero y Liquidez
        const cashPhysical = state.cash || 0;
        const reservesAmount = state.reserves || 0;
        const investedAmount = state.invested || 0;
        const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
        const debts = Array.isArray(state.debts) ? state.debts : [];

        // Cuentas Bancarias específicas
        const findAccount = (patterns) => bankAccounts.find(a => patterns.some(p => (a.id || '').toLowerCase().includes(p) || (a.name || '').toLowerCase().includes(p)));
        const accRut = findAccount(['rut']);
        const accCorriente = findAccount(['corriente']);
        const accVista = findAccount(['vista']);
        const accAhorro = findAccount(['ahorro']);
        const otherAccounts = bankAccounts.filter(a => a !== accRut && a !== accCorriente && a !== accVista && a !== accAhorro);

        // Créditos y Deudas específicos
        const findDebt = (patterns) => debts.find(d => patterns.some(p => (d.id || '').toLowerCase().includes(p) || (d.name || '').toLowerCase().includes(p)));
        const debtTarjeta = findDebt(['tarjeta', 'visa', 'mastercard']);
        const debtLinea = findDebt(['linea', 'línea']);
        const debtConsumo = findDebt(['consumo', 'personal']);
        const debtAuto = findDebt(['auto', 'vehicular', 'automotriz']);
        const debtHipotecario = findDebt(['hipotecario', 'vivienda']);
        const otherDebts = debts.filter(d => d !== debtTarjeta && d !== debtLinea && d !== debtConsumo && d !== debtAuto && d !== debtHipotecario);

        // Perfil de Inversionista
        const risk = state.riskTestResult;

        // Estilo de vida valorado
        const homeValued = (state.selectedHomes && state.selectedHomes.length > 0)
          ? state.selectedHomes.map(i => homeOptions[i] ? homeOptions[i].name : '').filter(Boolean).join(' / ')
          : (state.lifestyleChoices?.home || 'No definido');
        const jobValued = (state.selectedJobs && state.selectedJobs.length > 0)
          ? state.selectedJobs.map(i => jobOptions[i] ? jobOptions[i].name : '').filter(Boolean).join(' / ')
          : (state.lifestyleChoices?.job || 'No definido');
        const transportValued = (state.selectedTransports && state.selectedTransports.length > 0)
          ? state.selectedTransports.map(i => transportOptions[i] ? transportOptions[i].name : '').filter(Boolean).join(' / ')
          : (state.lifestyleChoices?.transport || 'No definido');

        // Intereses (15 categorías)
        const categories = Array.isArray(state.categories) ? state.categories : [];

        container.innerHTML = `
          <div class="personal-subview-box" style="max-height: 480px; overflow-y: auto; padding-right: 2px;">
            <!-- CABECERA: TÍTULO A LA IZQUIERDA Y BOTÓN VOLVER A LA DERECHA -->
            <div class="personal-subview-top">
              <div>
                <span style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">🔍 Variables del Personaje</span>
                <div style="font-size: 0.58rem; color: #64748b;">Auditoría completa de variables de estado</div>
              </div>
              <button type="button" class="personal-subview-back-btn" onclick="renderPersonalStage('main')">
                <span>◀ Volver</span>
              </button>
            </div>

            <!-- 1. BIENESTAR -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 9px; margin-bottom: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-size: 0.70rem; font-weight: 800; color: #0f172a;">🧘 Bienestar</span>
                <span style="font-size: 0.62rem; font-weight: 700; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 1px 6px; border-radius: 4px;">${peace}% (${peaceHearts}/20 corazones) ${peaceFace}</span>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <div style="flex: 1;">
                  ${renderHeartsMeter(peace)}
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px; font-size: 0.58rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 3px 6px; min-width: 108px; flex-shrink: 0;">
                  <div style="display: flex; justify-content: space-between; gap: 4px;">
                    <span style="color: #64748b;">Física:</span>
                    <strong style="color: #0f172a; font-family: monospace;">${hPhysical}/20</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; gap: 4px;">
                    <span style="color: #64748b;">Emocional:</span>
                    <strong style="color: #0f172a; font-family: monospace;">${hEmotional}/40</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; gap: 4px;">
                    <span style="color: #64748b;">Mental:</span>
                    <strong style="color: #0f172a; font-family: monospace;">${hMental}/40</strong>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. SITUACIÓN LABORAL Y ESTUDIOS -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 9px; margin-bottom: 6px;">
              <div style="font-size: 0.70rem; font-weight: 800; color: #0f172a; margin-bottom: 5px;">💼 Situación Laboral & Estudios Cursados</div>

              <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.65rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 3px; border-bottom: 1px dashed #f1f5f9;">
                  <span style="color: #475569;">• Empleo actual:</span>
                  ${job ? `
                    <span style="font-weight: 700; color: #0f172a;">${jobName} <span style="font-weight: 600; color: #64748b;">(${jobType})</span></span>
                  ` : `
                    <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #94a3b8; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">Sin empleo actual ($0)</span>
                  `}
                </div>

                ${job ? `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 3px; border-bottom: 1px dashed #f1f5f9;">
                    <span style="color: #475569;">• ${job.isFreelance ? 'Ingreso estimado:' : 'Sueldo Bruto / Líquido:'}</span>
                    <span style="font-weight: 700; color: #0284c7;">
                      ${job.isFreelance ? `
                        <strong style="color: #059669;">Sueldo variable estimado: $${(job.salary || 0).toLocaleString('es-CL')} Aprox.</strong>
                      ` : `
                        ${jobSalaryGross ? '$' + jobSalaryGross.toLocaleString('es-CL') : 'N/A'} bruto / 
                        <strong style="color: #059669;">${jobSalaryNet ? '$' + jobSalaryNet.toLocaleString('es-CL') : '$0'}</strong> líq.
                      `}
                    </span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 3px; border-bottom: 1px dashed #f1f5f9;">
                    <span style="color: #475569;">• Horario / Jornada:</span>
                    <span style="font-weight: 600; color: #334155;">${jobSchedule}</span>
                  </div>
                ` : ''}

                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 2px;">
                  <span style="color: #475569;">• Estudios / Cursos:</span>
                  ${courses.length > 0 ? `
                    <span style="font-weight: 700; color: #047857;">${courses.map(c => typeof c === 'object' ? c.name : c).join(', ')}</span>
                  ` : `
                    <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #94a3b8; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">Sin cursos registrados</span>
                  `}
                </div>
              </div>
            </div>

            <!-- 3. DINERO, LIQUIDEZ Y PATRIMONIO -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 9px; margin-bottom: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <span style="font-size: 0.70rem; font-weight: 800; color: #0f172a;">💵 Dinero, Liquidez & Ahorros</span>
                <span style="font-size: 0.74rem; font-weight: 800; color: #0284c7;">$${totalLiquid.toLocaleString('es-CL')} disp.</span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 3px; font-size: 0.65rem;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #475569;">• Dinero en efectivo físico:</span>
                  <strong style="color: #0f172a;">$${cashPhysical.toLocaleString('es-CL')}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #475569;">• Fondo de Reserva:</span>
                  <strong style="color: ${reservesAmount > 0 ? '#059669' : '#94a3b8'};">
                    $${reservesAmount.toLocaleString('es-CL')} ${reservesAmount === 0 ? '(Sin fondo acumulado)' : ''}
                  </strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #475569;">• Inversiones Activas:</span>
                  <strong style="color: ${investedAmount > 0 ? '#8b5cf6' : '#94a3b8'};">
                    $${investedAmount.toLocaleString('es-CL')} ${investedAmount === 0 ? '(Sin inversiones)' : ''}
                  </strong>
                </div>
              </div>
            </div>

            <!-- 4. CUENTAS BANCARIAS ABIERTAS (TODAS LAS VARIABLES INCLUSO NULAS) -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 9px; margin-bottom: 6px;">
              <div style="font-size: 0.70rem; font-weight: 800; color: #0f172a; margin-bottom: 5px;">🏦 Cuentas Bancarias (Todas las Variables)</div>

              <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.65rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 3px; border-bottom: 1px dashed #f1f5f9;">
                  <span style="color: #334155; font-weight: 600;">• Cuenta RUT (BancoEstado):</span>
                  ${accRut ? `
                    <span style="font-size: 0.60rem; font-weight: 700; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 1px 5px; border-radius: 4px;">Abierta ($${(accRut.balance || 0).toLocaleString('es-CL')})</span>
                  ` : `
                    <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #94a3b8; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">No tiene</span>
                  `}
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 3px; border-bottom: 1px dashed #f1f5f9;">
                  <span style="color: #334155; font-weight: 600;">• Cuenta Corriente:</span>
                  ${accCorriente ? `
                    <span style="font-size: 0.60rem; font-weight: 700; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 1px 5px; border-radius: 4px;">Abierta ($${(accCorriente.balance || 0).toLocaleString('es-CL')})</span>
                  ` : `
                    <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #94a3b8; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">No tiene</span>
                  `}
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 3px; border-bottom: 1px dashed #f1f5f9;">
                  <span style="color: #334155; font-weight: 600;">• Cuenta Vista (Otras):</span>
                  ${accVista ? `
                    <span style="font-size: 0.60rem; font-weight: 700; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 1px 5px; border-radius: 4px;">Abierta ($${(accVista.balance || 0).toLocaleString('es-CL')})</span>
                  ` : `
                    <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #94a3b8; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">No tiene</span>
                  `}
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 3px; border-bottom: 1px dashed #f1f5f9;">
                  <span style="color: #334155; font-weight: 600;">• Cuenta de Ahorro:</span>
                  ${accAhorro ? `
                    <span style="font-size: 0.60rem; font-weight: 700; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 1px 5px; border-radius: 4px;">Abierta ($${(accAhorro.balance || 0).toLocaleString('es-CL')})</span>
                  ` : `
                    <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #94a3b8; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">No tiene</span>
                  `}
                </div>

                ${otherAccounts.length > 0 ? otherAccounts.map(a => `
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #334155; font-weight: 600;">• ${a.name || 'Otra cuenta'}:</span>
                    <span style="font-size: 0.60rem; font-weight: 700; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 1px 5px; border-radius: 4px;">Abierta ($${(a.balance || 0).toLocaleString('es-CL')})</span>
                  </div>
                `).join('') : ''}
              </div>
            </div>

            <!-- 5. CRÉDITOS Y PASIVOS (TODAS LAS VARIABLES INCLUSO NULAS) -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 9px; margin-bottom: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <span style="font-size: 0.70rem; font-weight: 800; color: #0f172a;">💳 Créditos & Deudas (Todas las Variables)</span>
                <span style="font-size: 0.64rem; font-weight: 800; color: ${state.monthlyDebt > 0 ? '#b91c1c' : '#059669'};">
                  ${state.monthlyDebt > 0 ? `$${state.monthlyDebt.toLocaleString('es-CL')}/mes` : 'Sin deudas ($0)'}
                </span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.65rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 3px; border-bottom: 1px dashed #f1f5f9;">
                  <span style="color: #334155; font-weight: 600;">• Tarjeta de Crédito:</span>
                  ${state.creditCard ? `
                    <span style="font-size: 0.60rem; font-weight: 700; background: #eff6ff; color: #1e40af; border: 1px solid #93c5fd; padding: 1px 5px; border-radius: 4px;">Activa ($${(state.creditCard.limit || 950000).toLocaleString('es-CL')} cupo)</span>
                  ` : (debtTarjeta ? `
                    <span style="font-size: 0.60rem; font-weight: 700; background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; padding: 1px 5px; border-radius: 4px;">Deuda: $${(debtTarjeta.monthlyPayment || 0).toLocaleString('es-CL')}/mes</span>
                  ` : `
                    <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">No contratada ($0)</span>
                  `)}
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 3px; border-bottom: 1px dashed #f1f5f9;">
                  <span style="color: #334155; font-weight: 600;">• Línea de Crédito:</span>
                  ${state.creditLine ? `
                    <span style="font-size: 0.60rem; font-weight: 700; background: #eff6ff; color: #1e40af; border: 1px solid #93c5fd; padding: 1px 5px; border-radius: 4px;">Activa ($${(state.creditLine.limit || 500000).toLocaleString('es-CL')} cupo)</span>
                  ` : (debtLinea ? `
                    <span style="font-size: 0.60rem; font-weight: 700; background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; padding: 1px 5px; border-radius: 4px;">Uso: $${(debtLinea.monthlyPayment || 0).toLocaleString('es-CL')}/mes</span>
                  ` : `
                    <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">No contratada ($0)</span>
                  `)}
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 3px; border-bottom: 1px dashed #f1f5f9;">
                  <span style="color: #334155; font-weight: 600;">• Crédito de Consumo:</span>
                  ${debtConsumo ? `
                    <span style="font-size: 0.60rem; font-weight: 700; background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; padding: 1px 5px; border-radius: 4px;">Cuota: $${(debtConsumo.monthlyPayment || 0).toLocaleString('es-CL')}/mes</span>
                  ` : `
                    <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">No tiene ($0)</span>
                  `}
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 3px; border-bottom: 1px dashed #f1f5f9;">
                  <span style="color: #334155; font-weight: 600;">• Crédito Automotriz:</span>
                  ${debtAuto ? `
                    <span style="font-size: 0.60rem; font-weight: 700; background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; padding: 1px 5px; border-radius: 4px;">Cuota: $${(debtAuto.monthlyPayment || 0).toLocaleString('es-CL')}/mes</span>
                  ` : `
                    <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">No tiene ($0)</span>
                  `}
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 3px; border-bottom: 1px dashed #f1f5f9;">
                  <span style="color: #334155; font-weight: 600;">• Crédito Hipotecario:</span>
                  ${debtHipotecario ? `
                    <span style="font-size: 0.60rem; font-weight: 700; background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; padding: 1px 5px; border-radius: 4px;">Dividendo: $${(debtHipotecario.monthlyPayment || 0).toLocaleString('es-CL')}/mes</span>
                  ` : `
                    <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">No tiene ($0)</span>
                  `}
                </div>

                ${otherDebts.length > 0 ? otherDebts.map(d => `
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #334155; font-weight: 600;">• ${d.name || 'Otro crédito'}:</span>
                    <span style="font-size: 0.60rem; font-weight: 700; background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; padding: 1px 5px; border-radius: 4px;">Cuota: $${(d.monthlyPayment || 0).toLocaleString('es-CL')}/mes</span>
                  </div>
                `).join('') : ''}
              </div>
            </div>

            <!-- 5.1 PÓLIZAS DE SEGURO -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 9px; margin-bottom: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-size: 0.70rem; font-weight: 800; color: #0f172a;">🛡️ Pólizas de Seguro Activas</span>
                <span style="font-size: 0.62rem; font-weight: 700; color: ${(state.insurances && state.insurances.length > 0) ? '#047857' : '#64748b'};">
                  ${(state.insurances || []).length} pólizas
                </span>
              </div>
              <div style="font-size: 0.64rem; color: #475569;">
                ${(state.insurances && state.insurances.length > 0) ? `
                  <div style="display: flex; flex-direction: column; gap: 3px;">
                    ${state.insurances.map(ins => {
                      const insSub = ins.assetSub || (ins.type ? ((getUserInsuranceAssets(ins.type).find(a => a.id === ins.assetId || a.name === ins.associatedTo) || {}).sub) : '');
                      const displayTitle = (insSub && !ins.name.includes(insSub)) ? `${ins.name} (${insSub})` : ins.name;
                      return `
                      <div style="display: flex; justify-content: space-between; align-items: center; background: #f0fdf4; border: 1px solid #dcfce7; border-radius: 4px; padding: 2px 6px;">
                        <span style="font-size: 0.60rem; font-weight: 600; color: #166534;">• ${displayTitle}</span>
                        <strong style="font-size: 0.58rem; color: #15803d;">${ins.costDisplay || '$' + (ins.costMonthly || 0).toLocaleString('es-CL') + '/mes'}</strong>
                      </div>
                    `;
                    }).join('')}
                  </div>
                ` : `
                  <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #94a3b8; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">Sin seguros contratados</span>
                `}
              </div>
            </div>

            <!-- 6. PERFIL DE INVERSIONISTA -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 9px; margin-bottom: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-size: 0.70rem; font-weight: 800; color: #0f172a;">🎯 Perfil de Inversionista</span>
                ${risk ? `
                  <span style="font-size: 0.62rem; font-weight: 800; color: ${risk.color || '#8b5cf6'}; background: #f5f3ff; border: 1px solid #ddd6fe; padding: 1px 6px; border-radius: 4px;">
                    ${risk.label} (${risk.score}/15 pts)
                  </span>
                ` : `
                  <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #94a3b8; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">
                    No realizado
                  </span>
                `}
              </div>
              <div style="font-size: 0.64rem; color: #475569; line-height: 1.35;">
                ${risk ? risk.desc : 'El personaje aún no realiza el test de tolerancia al riesgo (5 preguntas).'}
              </div>
            </div>

            <!-- 7. ESTILO DE VIDA VALORADO -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 9px; margin-bottom: 6px;">
              <div style="font-size: 0.70rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">🌟 Estilo de Vida Valorado (Onboarding)</div>

              <div style="display: flex; flex-direction: column; gap: 3px; font-size: 0.65rem;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #475569;">• Vivienda valorada:</span>
                  <strong style="color: #0f172a; text-align: right;">${homeValued}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #475569;">• Trabajo valorado:</span>
                  <strong style="color: #0f172a; text-align: right;">${jobValued}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #475569;">• Transporte valorado:</span>
                  <strong style="color: #0f172a; text-align: right;">${transportValued}</strong>
                </div>
              </div>
            </div>

            <!-- 8. INTERESES PERSONALES -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 9px; margin-bottom: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <span style="font-size: 0.70rem; font-weight: 800; color: #0f172a;">🏷️ Intereses (${categories.length} categorías)</span>
                <span style="font-size: 0.62rem; font-weight: 700; color: #0284c7;">${state.assignedBolitas || 21}/${state.totalBolitas || 25} bolitas</span>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 0.62rem;">
                ${categories.map(c => {
                  const dots = c.dots || 1;
                  const dotsSymbols = dots === 3 ? '●●●' : (dots === 2 ? '●●○' : '●○○');
                  const dotsColor = dots === 3 ? '#047857' : (dots === 2 ? '#0284c7' : '#94a3b8');
                  return `
                    <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 4px; padding: 2px 5px;">
                      <span style="color: #334155; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 110px;" title="${c.name}">${c.name}</span>
                      <strong style="color: ${dotsColor}; font-size: 0.60rem; margin-left: 4px;">${dotsSymbols} (${dots})</strong>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- 9. PROPIEDADES Y VEHÍCULOS -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 9px; margin-bottom: 6px;">
              <div style="font-size: 0.70rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">🏠 Propiedades & Vehículos Registrados</div>

              <div style="display: flex; flex-direction: column; gap: 3px; font-size: 0.65rem;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #475569;">• Bienes raíces:</span>
                  ${properties.length > 0 ? `
                    <strong style="color: #047857;">${properties.map(p => typeof p === 'object' ? p.name : p).join(', ')}</strong>
                  ` : `
                    <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #94a3b8; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">Sin propiedades (0)</span>
                  `}
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #475569;">• Vehículos:</span>
                  ${vehicles.length > 0 ? `
                    <strong style="color: #047857;">${vehicles.map(v => typeof v === 'object' ? v.name : v).join(', ')}</strong>
                  ` : `
                    <span style="font-size: 0.60rem; font-weight: 600; background: #f8fafc; color: #94a3b8; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px;">Sin vehículos (0)</span>
                  `}
                </div>
              </div>
            </div>

            <!-- 10. SESIÓN Y AUDITORÍA -->
            <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 7px; padding: 6px 9px; font-size: 0.62rem; color: #64748b; display: flex; justify-content: space-between; align-items: center;">
              <span>🏷️ Sesión Taller: <strong style="color: #0f172a;">${state.sessionCode || 'Sin código (Local)'}</strong></span>
              <span>Diapositiva: <strong style="color: #0284c7;">N° ${state.currentSlideIdx + 1}</strong></span>
            </div>

          </div>
        `;
      }
    }

    // GESTIÓN INTERACTIVA DE ÍTEMS DE PRESUPUESTO
    function updateBudgetItem(itemId, val) {
      const num = Math.max(0, parseInt(val, 10) || 0);
      if (state.debts) {
        const dItem = state.debts.find(d => d.id === itemId);
        if (dItem) {
          dItem.budget = num;
          dItem.real = num;
          dItem.monthlyPayment = num;
          state.monthlyDebt = state.debts.reduce((acc, d) => acc + (d.monthlyPayment || 0), 0);
          renderPersonalStage('presupuesto');
          return;
        }
      }
      if (state.budgetItems) {
        const item = state.budgetItems.find(i => i.id === itemId);
        if (item) {
          item.budget = num;
          item.real = num;
        }
      }
      if (state.customBudgetItems) {
        const cItem = state.customBudgetItems.find(i => i.id === itemId);
        if (cItem) {
          cItem.budget = num;
          cItem.real = num;
        }
      }
      renderPersonalStage('presupuesto');
    }

    function toggleAddBudgetForm(show) {
      state.showAddBudgetForm = show;
      renderPersonalStage('presupuesto');
    }

    function changeNewBudgetType(type) {
      state.newBudgetType = type;
      renderPersonalStage('presupuesto');
    }

    function changeInvestInstrument(val) {
      state.newBudgetInvestType = val;
      renderPersonalStage('presupuesto');
    }

    function saveNewBudgetItem() {
      const nameInput = document.getElementById('new-budget-name');
      const amountInput = document.getElementById('new-budget-amount');
      const investSelect = document.getElementById('new-budget-invest-type');
      const sourceSelect = document.getElementById('new-budget-source');

      const name = nameInput ? nameInput.value.trim() : '';
      const amount = amountInput ? Math.max(0, parseInt(amountInput.value, 10) || 0) : 0;
      const isInvest = state.newBudgetType === 'invest';
      const investType = investSelect ? investSelect.value : (state.newBudgetInvestType || 'alcancia');
      const source = (isInvest && investType === 'alcancia') ? 'Efectivo' : (sourceSelect ? sourceSelect.value : 'Efectivo');

      if (!name) {
        alert('Por favor escribe un nombre para el ítem.');
        return;
      }

      if (!state.customBudgetItems) state.customBudgetItems = [];

      const investIcons = {
        alcancia: '🐖',
        dap: '⏳',
        dolares: '💵',
        fondos: '📊'
      };

      const investLabels = {
        alcancia: 'Alcancía / Colchón',
        dap: 'Depósito a Plazo',
        dolares: 'Compra de Dólares',
        fondos: 'Fondo Mutuo'
      };

      state.customBudgetItems.push({
        id: 'custom_' + Date.now(),
        name,
        desc: isInvest ? `${investLabels[investType] || 'Inversión'} (Origen: ${source})` : 'Gasto libre',
        icon: isInvest ? (investIcons[investType] || '💎') : '🏷️',
        budget: amount,
        real: amount,
        isInvest,
        investType,
        source
      });

      state.showAddBudgetForm = false;
      renderPersonalStage('presupuesto');
    }

    function deleteCustomBudgetItem(itemId) {
      if (state.customBudgetItems) {
        state.customBudgetItems = state.customBudgetItems.filter(i => i.id !== itemId);
        renderPersonalStage('presupuesto');
      }
    }


    function startRiskTest() {
      if (!state.riskTempAnswers) state.riskTempAnswers = [];
      renderRiskTestQuestion(0);
    }

    function selectRiskAnswer(qIdx, points) {
      if (!state.riskTempAnswers) state.riskTempAnswers = [];
      state.riskTempAnswers[qIdx] = points;

      // Actualizar visualmente las opciones en el DOM sin recargar la pantalla completa (evita parpadeo/saltos)
      const optButtons = document.querySelectorAll('.risk-opt-btn');
      optButtons.forEach(btn => {
        const btnPoints = parseInt(btn.getAttribute('data-points'), 10);
        const isSelected = (btnPoints === points);
        btn.style.border = isSelected ? '1.5px solid #8b5cf6' : '1.5px solid #cbd5e1';
        btn.style.background = isSelected ? '#f5f3ff' : '#ffffff';
        const textSpan = btn.querySelector('.risk-opt-text');
        if (textSpan) textSpan.style.color = isSelected ? '#5b21b6' : '#1e293b';
        const badgeSpan = btn.querySelector('.risk-opt-badge');
        if (badgeSpan) {
          badgeSpan.style.color = isSelected ? '#6d28d9' : '#64748b';
          badgeSpan.style.background = isSelected ? '#ede9fe' : '#f1f5f9';
        }
      });

      // Actualizar contador de respondidas
      const countEl = document.getElementById('risk-answered-count');
      if (countEl) {
        const answeredCount = state.riskTempAnswers.filter(v => v !== undefined && v !== null).length;
        countEl.textContent = `${answeredCount} de 5 respondidas`;
      }

      // Ocultar mensaje de advertencia si existía
      const errorBox = document.getElementById('risk-test-error-box');
      if (errorBox) errorBox.style.display = 'none';
    }

    function renderRiskTestQuestion(qIdx, errorMsg = '') {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      const q = officialRiskQuestions[qIdx];
      if (!q) return;

      if (!state.riskTempAnswers) state.riskTempAnswers = [];
      const currentSelected = state.riskTempAnswers[qIdx];
      const answeredCount = state.riskTempAnswers.filter(v => v !== undefined && v !== null).length;

      container.innerHTML = `
        <div class="personal-subview-box">
          <div class="personal-subview-top">
            <span style="font-size: 0.85rem; font-weight: 800; color: #8b5cf6;">📝 Test de Perfil de Inversionista</span>
            <button type="button" class="personal-subview-back-btn" onclick="renderPersonalStage('inversionista')">
              <span>Salir del test</span>
            </button>
          </div>

          <!-- Barra de Progreso del Test -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <span style="font-size: 0.64rem; font-weight: 700; color: #0f172a;">Pregunta ${qIdx + 1} de 5</span>
            <span id="risk-answered-count" style="font-size: 0.60rem; color: #64748b;">${answeredCount} de 5 respondidas</span>
          </div>
          <div style="height: 4px; background: #e2e8f0; border-radius: 999px; overflow: hidden; margin-bottom: 8px;">
            <div style="height: 100%; width: ${((qIdx + 1) / 5) * 100}%; background: linear-gradient(90deg, #8b5cf6 0%, #6d28d9 100%);"></div>
          </div>

          <!-- Enunciado de la Pregunta (sin recuadro, texto normal y con espacio previo) -->
          <p style="font-size: 0.74rem; font-weight: 400; color: #0f172a; line-height: 1.35; margin: 11px 0 10px 0;">
            ${q.question}
          </p>

          <!-- Opciones A, B, C -->
          <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 9px;">
            ${q.options.map((opt) => {
        const isSelected = currentSelected === opt.points;
        return `
                <button type="button" class="decision-btn risk-opt-btn" data-points="${opt.points}" style="margin: 0; padding: 8px 10px; display: flex; align-items: center; justify-content: space-between; border: 1.5px solid ${isSelected ? '#8b5cf6' : '#cbd5e1'}; background: ${isSelected ? '#f5f3ff' : '#ffffff'}; border-radius: 8px; cursor: pointer; transition: all 0.15s ease;" onclick="selectRiskAnswer(${qIdx}, ${opt.points})">
                  <span class="risk-opt-text" style="font-size: 0.70rem; font-weight: 400; color: ${isSelected ? '#5b21b6' : '#1e293b'}; text-align: left; line-height: 1.3;">
                    ${opt.text}
                  </span>
                  <span class="risk-opt-badge" style="font-size: 0.64rem; font-weight: 700; color: ${isSelected ? '#6d28d9' : '#64748b'}; background: ${isSelected ? '#ede9fe' : '#f1f5f9'}; padding: 3px 7px; border-radius: 6px; white-space: nowrap; margin-left: 8px;">
                    ${opt.points} ${opt.points === 1 ? 'pto' : 'pts'}
                  </span>
                </button>
              `;
      }).join('')}
          </div>

          <div id="risk-test-error-box" style="${errorMsg ? 'display: flex;' : 'display: none;'} background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.62rem; font-weight: 600; padding: 6px 9px; border-radius: 6px; margin-bottom: 8px; align-items: center; gap: 6px;">
            <span>⚠️</span> <span>${errorMsg}</span>
          </div>

          <!-- Botones de Navegación: Anterior y Siguiente -->
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-top: 4px;">
            <button type="button" class="risk-nav-btn risk-nav-btn-prev" onclick="${qIdx > 0 ? `renderRiskTestQuestion(${qIdx - 1})` : `renderPersonalStage('inversionista')`}">
              ◀ Anterior
            </button>

            <button type="button" class="risk-nav-btn risk-nav-btn-next" onclick="${qIdx < 4 ? `renderRiskTestQuestion(${qIdx + 1})` : `goToRiskFinalScreen()`}">
              Siguiente ▶
            </button>
          </div>
        </div>
      `;
    }

    function goToRiskFinalScreen() {
      if (!state.riskTempAnswers) state.riskTempAnswers = [];

      const unanswered = [];
      for (let i = 0; i < officialRiskQuestions.length; i++) {
        if (state.riskTempAnswers[i] === undefined || state.riskTempAnswers[i] === null) {
          unanswered.push(i + 1);
        }
      }

      if (unanswered.length > 0) {
        // Pantalla final cuando el test aún no se ha completado
        renderRiskIncompleteScreen(unanswered);
      } else {
        // Pantalla final con resultado oficial
        const totalScore = state.riskTempAnswers.reduce((a, b) => a + b, 0);
        let result = {};

        if (totalScore <= 8) {
          result = {
            score: totalScore,
            label: "Conservador",
            color: "#059669",
            bg: "#ecfdf5",
            desc: "Priorizas la seguridad y preservación de tu capital por sobre la rentabilidad. Prefieres retornos garantizados y estabilidad sin sobresaltos."
          };
        } else if (totalScore <= 11) {
          result = {
            score: totalScore,
            label: "Moderado",
            color: "#d97706",
            bg: "#fef3c7",
            desc: "Buscas rentabilidad por encima de la inflación aceptando oscilaciones moderadas a mediano plazo. Equilibras crecimiento y seguridad."
          };
        } else {
          result = {
            score: totalScore,
            label: "Arriesgado",
            color: "#8b5cf6",
            bg: "#ede9fe",
            desc: "Buscas maximizar el crecimiento de tu patrimonio a largo plazo y toleras caídas temporales sabiendo que el tiempo compensa la volatilidad."
          };
        }

        state.riskTestResult = result;
        renderRiskTestSummary(result);
      }
    }

    function renderRiskIncompleteScreen(unanswered) {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      container.innerHTML = `
        <div class="personal-subview-box">
          <div class="personal-subview-top">
            <span style="font-size: 0.85rem; font-weight: 800; color: #8b5cf6;">📝 Test de Perfil de Inversionista</span>
            <button type="button" class="personal-subview-back-btn" onclick="renderPersonalStage('inversionista')">
              <span>Salir del test</span>
            </button>
          </div>

          <div style="background: #ffffff; border: 1.5px solid #f59e0b; border-radius: 8px; padding: 14px 10px; margin-bottom: 9px; text-align: center;">
            <div style="font-size: 1.5rem; line-height: 1; margin-bottom: 6px;">📋</div>
            <div style="font-size: 0.84rem; font-weight: 800; color: #b45309; margin-bottom: 7px;">
              Aún no has completado el test
            </div>
            <div style="font-size: 0.64rem; color: #b45309; font-weight: 700; background: #fef3c7; padding: 7px 9px; border-radius: 6px; text-align: left;">
              Preguntas pendientes: <strong>Pregunta ${unanswered.join(', Pregunta ')}</strong>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-top: 4px;">
            <button type="button" class="risk-nav-btn risk-nav-btn-prev" onclick="renderRiskTestQuestion(4)">
              ◀ Anterior
            </button>
          </div>
        </div>
      `;
    }

    function renderRiskTestSummary(result) {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      container.innerHTML = `
        <div class="personal-subview-box">
          <div class="personal-subview-top">
            <span style="font-size: 0.85rem; font-weight: 800; color: #8b5cf6;">📝 Test de Perfil de Inversionista</span>
            <button type="button" class="personal-subview-back-btn" onclick="renderPersonalStage('inversionista')">
              <span>Salir del test</span>
            </button>
          </div>

          <div style="background: #ffffff; border: 1.5px solid ${result.color}; border-radius: 8px; padding: 10px; margin-bottom: 8px; text-align: center;">
            <div style="font-size: 0.60rem; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Tu Perfil Determinado</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: ${result.color}; margin: 3px 0;">
              ${result.label}
            </div>
            <div style="font-size: 0.68rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">
              Puntaje obtenido: ${result.score} de 15 puntos
            </div>
            <p style="font-size: 0.63rem; color: #475569; line-height: 1.35; margin: 0; text-align: left; background: #f8fafc; padding: 7px 9px; border-radius: 6px;">
              ${result.desc}
            </p>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-top: 4px;">
            <button type="button" class="risk-nav-btn risk-nav-btn-prev" onclick="renderRiskTestQuestion(4)">
              ◀ Anterior
            </button>
          </div>
        </div>
      `;
    }

    // ACCIÓN AL PINCHAR UN ICONO DE LA ZONA INFERIOR
