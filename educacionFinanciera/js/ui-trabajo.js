// Trabajo Hub (Job Search, Training Courses & Boss Negotiation Chat) — educacionFinanciera

    // RENDERIZAR SUB-VISTAS DEL MÓDULO TRABAJO
    function renderTrabajoStage(subView = 'main') {
      if (subView !== 'negociacion') {
        initNegChat();
      }
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      const titleElem = document.getElementById('hub-stage-title');
      const subtitleElem = document.getElementById('hub-stage-subtitle');
      const iconBox = document.getElementById('hub-stage-icon-box');

      if (iconBox) {
        iconBox.style.cursor = 'default';
        iconBox.onclick = null;
        iconBox.removeAttribute('title');
        iconBox.className = 'hub-stage-header-icon dock-icon-box icon-trabajo';
        iconBox.innerHTML = '<span>💼</span>';
      }
      if (titleElem) titleElem.innerText = '💼 Trabajo';
      if (subtitleElem) subtitleElem.innerText = 'Desarrollo profesional e ingresos laborales';

      const curJob = state.currentJob;

      if (subView === 'busqueda') {
        const curJobId = curJob ? curJob.id : null;

        container.innerHTML = `
          <div class="personal-subview-box">
            <!-- CABECERA: TÍTULO Y BOTÓN VOLVER -->
            <div class="personal-subview-top">
              <span style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">🔍 Búsqueda de Trabajo</span>
              <button type="button" class="personal-subview-back-btn" onclick="renderTrabajoStage('main')">
                <span>◀ Volver</span>
              </button>
            </div>

            <!-- SITUACIÓN LABORAL ACTUAL DEL PERSONAJE -->
            <div style="background: ${curJob ? '#f0fdf4' : '#f8fafc'}; border: 1.5px solid ${curJob ? '#a7f3d0' : '#e2e8f0'}; border-radius: 8px; padding: 7px 9px; margin-bottom: 7px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 0.58rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Estado Laboral Actual</div>
                <div style="font-size: 0.82rem; font-weight: 800; color: ${curJob ? '#15803d' : '#0f172a'};">
                  ${curJob ? `${curJob.icon || '💼'} ${curJob.name}` : '💼 Sin empleo activo ($0)'}
                </div>
              </div>
              ${curJob ? `
                <div style="text-align: right;">
                  <div style="font-size: 0.84rem; font-weight: 800; color: #059669;">$${(curJob.salary || 0).toLocaleString('es-CL')} líquido</div>
                  <button type="button" onclick="confirmResignationModal()" style="background: none; border: none; font-size: 0.74rem; color: #b91c1c; font-weight: 700; cursor: pointer; text-decoration: underline; padding: 2px 0; margin-top: 2px; display: inline-block;">${curJob.isFreelance ? 'Dejar actividad independiente' : 'Renunciar al empleo'}</button>
                </div>
              ` : `
                <div style="font-size: 0.65rem; color: #94a3b8; font-style: italic;">Disponible para contratación</div>
              `}
            </div>

            <!-- LISTADO EN 2 COLUMNAS DE OFERTAS DE TRABAJO -->
            <div class="jobs-grid-2col">
              ${jobOffersData.map(job => {
                const isCurrent = curJobId === job.id;
                return `
                  <div class="job-offer-card ${isCurrent ? 'active-job' : ''}">
                    <div>
                      <div class="job-offer-title">${job.icon} ${job.name}</div>
                      
                      <!-- SUELDO BRUTO Y LÍQUIDO -->
                      <div class="job-offer-salaries">
                        ${job.isFreelance ? `
                          <div class="job-salary-row liquid" style="border-top: none; padding-top: 0; margin-top: 0;">
                            <span>Sueldo variable estimado:</span>
                            <span>$${job.salary.toLocaleString('es-CL')} Aprox.</span>
                          </div>
                        ` : job.isCommercial ? `
                          <div class="job-salary-row">
                            <span style="color: #64748b;">Sueldo Bruto base:</span>
                            <strong>$${job.grossSalary.toLocaleString('es-CL')}</strong>
                          </div>
                          <div class="job-salary-row liquid">
                            <span>Sueldo Líquido base:</span>
                            <span>$${job.salary.toLocaleString('es-CL')} + Comisiones</span>
                          </div>
                        ` : `
                          <div class="job-salary-row">
                            <span style="color: #64748b;">Sueldo Bruto:</span>
                            <strong>$${job.grossSalary.toLocaleString('es-CL')}</strong>
                          </div>
                          <div class="job-salary-row liquid">
                            <span>Sueldo Líquido:</span>
                            <span>$${job.salary.toLocaleString('es-CL')}</span>
                          </div>
                        `}
                      </div>

                      <!-- CONDICIONES Y REQUISITOS -->
                      <div class="job-offer-info">
                        <div><strong>Condiciones:</strong> ${job.conditions}</div>
                        <div class="job-req-tag ${job.hasCourseReq || job.hasExpReq ? 'has-req' : ''}">
                          <strong>Requisitos:</strong> ${job.requirements}
                        </div>
                      </div>
                    </div>

                    <!-- BOTÓN DE ACCIÓN / CONTRATACIÓN -->
                    ${isCurrent ? `
                      <button type="button" class="job-apply-btn btn-actual" disabled>
                        ✓ ${job.isFreelance ? 'Actividad actual' : 'Empleo actual'}
                      </button>
                    ` : `
                      <button type="button" class="job-apply-btn btn-postular" onclick="applyToJob('${job.id}')">
                        ${job.isFreelance ? 'Quiero ser independiente' : 'Postular'}
                      </button>
                    `}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      } else if (subView === 'main') {
        // VISTA PRINCIPAL DE TRABAJO: SITUACIÓN LABORAL ACTUAL ARRIBA + 3 OPCIONES EN 3 COLUMNAS
        container.innerHTML = `
          <div class="personal-subview-box">
            <!-- PANEL SUPERIOR: SITUACIÓN LABORAL ACTUAL -->
            <div style="background: ${curJob ? '#f0fdf4' : '#f8fafc'}; border: 1.5px solid ${curJob ? '#a7f3d0' : '#e2e8f0'}; border-radius: 9px; padding: 9px 12px; margin-bottom: 9px; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-size: 0.58rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;">
                    Situación Laboral Actual
                  </div>
                  <div style="font-size: 0.88rem; font-weight: 800; color: ${curJob ? '#15803d' : '#0f172a'}; margin-top: 1px; display: flex; align-items: center; gap: 5px;">
                    <span>${curJob ? (curJob.icon || '💼') : '💼'}</span>
                    <span>${curJob ? curJob.name : 'Sin empleo activo'}</span>
                  </div>
                </div>
                <div style="text-align: right;">
                  ${curJob ? `
                    <div style="font-size: 0.86rem; font-weight: 800; color: #059669;">
                      $${(curJob.salary || 0).toLocaleString('es-CL')} líquido
                    </div>
                    <button type="button" onclick="confirmResignationModal()" style="background: none; border: none; font-size: 0.74rem; color: #b91c1c; font-weight: 700; cursor: pointer; text-decoration: underline; padding: 2px 0; margin-top: 2px; display: inline-block;">
                      ${curJob.isFreelance ? 'Dejar actividad independiente' : 'Renunciar al empleo'}
                    </button>
                  ` : `
                    <div style="font-size: 0.80rem; font-weight: 800; color: #64748b;">$0 ingresos</div>
                    <div style="font-size: 0.63rem; color: #0284c7; font-weight: 600;">Disponible para contratación</div>
                  `}
                </div>
              </div>
            </div>

            <!-- 3 OPCIONES EN 3 COLUMNAS -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
              <!-- 1. NEGOCIACIÓN SALARIAL -->
              <div class="trabajo-col-card" onclick="renderTrabajoStage('negociacion')">
                <div class="trabajo-col-icon">📈</div>
                <div class="trabajo-col-title">Negociación Salarial</div>
                <div class="trabajo-col-desc">Ascensos y aumentos</div>
              </div>

              <!-- 2. CAPACITACIÓN -->
              <div class="trabajo-col-card highlight-card" onclick="renderTrabajoStage('capacitacion')">
                <div class="trabajo-col-icon">🎓</div>
                <div class="trabajo-col-title">Capacitación</div>
                <div class="trabajo-col-desc">Cursos y certif.</div>
              </div>

              <!-- 3. BÚSQUEDA DE TRABAJO -->
              <div class="trabajo-col-card" onclick="renderTrabajoStage('busqueda')">
                <div class="trabajo-col-icon">🔍</div>
                <div class="trabajo-col-title">Búsqueda de Trabajo</div>
                <div class="trabajo-col-desc">Ofertas y postulación</div>
              </div>
            </div>
          </div>
        `;
      } else if (subView === 'capacitacion') {
        // VISTA DE CAPACITACIÓN Y CERTIFICACIONES
        const completedCourseIds = (state.courses || []).map(c => typeof c === 'string' ? c : c.id);

        container.innerHTML = `
          <div class="personal-subview-box">
            <!-- CABECERA: TÍTULO Y BOTÓN VOLVER -->
            <div class="personal-subview-top">
              <span style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">🎓 Capacitación y Certificaciones</span>
              <button type="button" class="personal-subview-back-btn" onclick="renderTrabajoStage('main')">
                <span>◀ Volver</span>
              </button>
            </div>

            <!-- LISTADO DE CURSOS EN 2 COLUMNAS DIRECTO -->
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
              ${coursesCatalogData.map(course => {
                const isCompleted = completedCourseIds.includes(course.id);
                const isLocked = Boolean(course.prereqId && !completedCourseIds.includes(course.prereqId));

                return `
                  <div class="course-card ${isCompleted ? 'completed' : ''}">
                    <div>
                      <div style="font-size: 0.73rem; font-weight: 800; color: #0f172a; line-height: 1.2; margin: 0 0 3px 0;">
                        ${course.areaIcon} ${course.name}
                      </div>
                      <div style="font-size: 0.60rem; color: #64748b; margin-bottom: 4px;">
                        ⏱️ ${course.hours} hrs • <strong style="color: #0284c7;">$${course.price.toLocaleString('es-CL')}</strong>
                      </div>
                      <div style="font-size: 0.58rem; color: #475569; line-height: 1.25; margin-bottom: 7px;">
                        ${course.desc}
                      </div>
                    </div>

                    <div style="margin-top: auto;">
                      ${isCompleted ? `
                        <button type="button" class="btn-course-completed" disabled>✓ Curso completado</button>
                      ` : isLocked ? `
                        <button type="button" class="btn-course-locked" disabled>🔒 No disponible</button>
                      ` : `
                        <button type="button" class="btn-course-enroll" onclick="openEnrollCourseModal('${course.id}')">Matricularse</button>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      } else if (subView === 'negociacion') {
        // VISTA DE NEGOCIACIÓN SALARIAL (TIPO CHAT O CASO FREELANCE / DESEMPLEADO)
        if (!state.currentJob) {
          container.innerHTML = `
            <div class="personal-subview-box">
              <div class="personal-subview-top">
                <span style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">📈 Negociación Salarial</span>
                <button type="button" class="personal-subview-back-btn" onclick="renderTrabajoStage('main')">
                  <span>◀ Volver</span>
                </button>
              </div>
              <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 9px; padding: 14px; text-align: center; margin-top: 10px;">
                <div style="font-size: 1.8rem; margin-bottom: 6px;">💼</div>
                <div style="font-size: 0.86rem; font-weight: 800; color: #b45309; margin-bottom: 4px;">Sin Empleo Activo</div>
                <div style="font-size: 0.72rem; color: #78350f; line-height: 1.4; max-width: 300px; margin: 0 auto 12px auto;">
                  Para solicitar aumentos de sueldo o ascensos de cargo, primero debes postular y ser contratado en un puesto de trabajo.
                </div>
                <button type="button" class="btn-course-enroll" style="max-width: 200px; margin: 0 auto; display: block;" onclick="renderTrabajoStage('busqueda')">
                  Ir a Búsqueda de Trabajo
                </button>
              </div>
            </div>
          `;
          return;
        }

        if (state.currentJob.isFreelance) {
          container.innerHTML = `
            <div class="personal-subview-box">
              <div class="personal-subview-top">
                <span style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">📈 Negociación Salarial</span>
                <button type="button" class="personal-subview-back-btn" onclick="renderTrabajoStage('main')">
                  <span>◀ Volver</span>
                </button>
              </div>
              <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 9px; padding: 16px 14px; text-align: center; margin-top: 10px;">
                <div style="font-size: 1.8rem; margin-bottom: 6px;">🚀</div>
                <div style="font-size: 0.88rem; font-weight: 800; color: #15803d; margin-bottom: 4px;">¡Tú eres tu propio jefe!</div>
                <div style="font-size: 0.72rem; color: #166534; line-height: 1.45; max-width: 320px; margin: 0 auto;">
                  Como trabajador independiente no tienes con quién negociar sueldos ni jerarquías corporativas.
                </div>
              </div>
            </div>
          `;
          return;
        }

        // Empleado dependiente: Chat interactivo (se reinicia fresco)
        initNegChat();

        container.innerHTML = `
          <div class="personal-subview-box">
            <div class="personal-subview-top">
              <span style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">📈 Negociación Salarial</span>
              <button type="button" class="personal-subview-back-btn" onclick="renderTrabajoStage('main')">
                <span>◀ Volver</span>
              </button>
            </div>

            <!-- CONTENEDOR DEL CHAT -->
            <div class="neg-chat-container">
              <div class="neg-chat-header">
                <div class="neg-chat-avatar">👔</div>
                <div>
                  <div style="font-size: 0.76rem; font-weight: 800;">Jefatura Directa</div>
                  <div style="font-size: 0.60rem; color: #94a3b8;">${state.currentJob.name}</div>
                </div>
              </div>

              <div id="neg-chat-messages-container" class="neg-chat-messages">
                <!-- Se llena con renderNegChatMessages() -->
              </div>

              <div id="neg-chat-options-container" class="neg-chat-options">
                <!-- Se llena con renderNegChatOptions() -->
              </div>
            </div>
          </div>
        `;
        renderNegChatMessages();
        renderNegChatOptions();
      } else {
        renderTrabajoStage('main');
      }
    }

    // ==========================================================================
    // LÓGICA DE MATRÍCULA Y PAGO DE CURSOS DE CAPACITACIÓN
    // ==========================================================================
    function openEnrollCourseModal(courseId) {
      const course = coursesCatalogData.find(c => c.id === courseId);
      if (!course) return;

      const modalRoot = document.getElementById('job-modal-root');
      if (!modalRoot) return;

      const cash = state.cash || 0;
      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      const totalAvailable = cash + bankAccounts.reduce((sum, a) => sum + (a.balance || 0), 0);
      const canAfford = totalAvailable >= course.price;

      let paymentOptionsHtml = '';
      if (canAfford) {
        paymentOptionsHtml = `
          <div style="font-size: 0.64rem; font-weight: 700; color: #475569; margin: 8px 0 4px 0;">Selecciona el medio de pago:</div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="display: flex; align-items: center; gap: 6px; font-size: 0.68rem; color: #1e293b; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 5px 8px; cursor: pointer;">
              <input type="radio" name="payment_source" value="cash" ${cash >= course.price ? 'checked' : (cash > 0 ? '' : 'disabled')} />
              <span>💵 Dinero en Efectivo ($${cash.toLocaleString('es-CL')}${cash < course.price ? ' - Saldo insuficiente' : ''})</span>
            </label>
            ${bankAccounts.map((acc, idx) => `
              <label style="display: flex; align-items: center; gap: 6px; font-size: 0.68rem; color: #1e293b; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 5px 8px; cursor: pointer;">
                <input type="radio" name="payment_source" value="account_${idx}" ${cash < course.price && acc.balance >= course.price ? 'checked' : (acc.balance >= course.price ? '' : 'disabled')} />
                <span>🏦 ${acc.name || 'Cuenta Bancaria'} ($${(acc.balance || 0).toLocaleString('es-CL')}${acc.balance < course.price ? ' - Saldo insuficiente' : ''})</span>
              </label>
            `).join('')}
          </div>
        `;
      } else {
        paymentOptionsHtml = `
          <div style="font-size: 0.68rem; color: #b91c1c; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 7px 9px; margin-top: 8px; line-height: 1.35;">
            ⚠️ <strong>Fondos insuficientes:</strong> El arancel del curso es de $${course.price.toLocaleString('es-CL')} y tu liquidez total es de $${totalAvailable.toLocaleString('es-CL')}. Necesitas $${(course.price - totalAvailable).toLocaleString('es-CL')} adicionales para matricularte.
          </div>
        `;
      }

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeJobModal()">
          <div class="job-modal-card">
            <div class="job-modal-header" style="background: #f0f9ff; border-bottom: 1px solid #bae6fd;">
              <div class="job-modal-icon-badge" style="background: #e0f2fe; color: #0284c7; border: 1.5px solid #7dd3fc;">
                ${course.areaIcon}
              </div>
              <div>
                <div class="job-modal-title" style="color: #0369a1;">Matrícula de Capacitación</div>
                <div class="job-modal-subtitle">${course.areaLabel}</div>
              </div>
            </div>

            <div class="job-modal-body">
              <div class="job-modal-job-box" style="background: #ffffff;">
                <div style="font-size: 0.88rem; font-weight: 800; color: #0f172a;">${course.name}</div>
                <div style="font-size: 0.65rem; color: #64748b; margin: 3px 0 6px 0; line-height: 1.3;">
                  ${course.desc}
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #e2e8f0; padding-top: 6px; margin-top: 4px;">
                  <span style="font-size: 0.68rem; color: #475569;">⏱️ Duración: <strong>${course.hours} horas cronológicas</strong></span>
                  <span style="font-size: 0.86rem; font-weight: 800; color: #0284c7;">$${course.price.toLocaleString('es-CL')}</span>
                </div>
              </div>

              ${paymentOptionsHtml}

              <div style="display: flex; gap: 8px; margin-top: 12px;">
                ${canAfford ? `
                  <button type="button" class="btn-job-modal-confirm" onclick="confirmCourseEnrollment('${course.id}')">
                    Confirmar y Pagar $${course.price.toLocaleString('es-CL')}
                  </button>
                ` : `
                  <button type="button" class="btn-job-modal-confirm" disabled style="opacity: 0.5; cursor: not-allowed;">
                    Fondos Insuficientes
                  </button>
                `}
                <button type="button" class="btn-job-modal-cancel" onclick="closeJobModal()">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function confirmCourseEnrollment(courseId) {
      const course = coursesCatalogData.find(c => c.id === courseId);
      if (!course) return;

      const selectedInput = document.querySelector('input[name="payment_source"]:checked');
      const paymentSource = selectedInput ? selectedInput.value : 'cash';

      // Descontar fondos
      if (paymentSource === 'cash') {
        if ((state.cash || 0) < course.price) {
          alert('No tienes suficiente efectivo para pagar este curso.');
          return;
        }
        state.cash -= course.price;
      } else if (paymentSource.startsWith('account_')) {
        const accIdx = parseInt(paymentSource.replace('account_', ''), 10);
        if (!state.bankAccounts || !state.bankAccounts[accIdx] || (state.bankAccounts[accIdx].balance || 0) < course.price) {
          alert('La cuenta seleccionada no tiene saldo suficiente.');
          return;
        }
        state.bankAccounts[accIdx].balance -= course.price;
      }

      // Registrar curso aprobado en el personaje
      if (!Array.isArray(state.courses)) state.courses = [];
      if (!state.courses.some(c => (typeof c === 'string' ? c : c.id) === course.id)) {
        state.courses.push({
          id: course.id,
          code: course.code,
          name: course.name,
          area: course.area,
          level: course.level,
          hours: course.hours
        });
      }

      // CASO INDEPENDIENTE / FREELANCE: AUMENTOS AUTOMÁTICOS
      let freelanceMsg = '';
      if (state.currentJob && state.currentJob.isFreelance) {
        const isFavored = course.favorsJobs.includes(state.currentJob.id);
        const gainRate = isFavored ? course.gainFavored : course.gainBase;
        const raiseAmount = Math.round((state.currentJob.salary || 950000) * gainRate);
        state.currentJob.salary = (state.currentJob.salary || 950000) + raiseAmount;
        if (!Array.isArray(state.appliedCourseRaises)) state.appliedCourseRaises = [];
        state.appliedCourseRaises.push(course.id);
        freelanceMsg = `\n\n🚀 Como trabajador independiente, tus ingresos aumentan automáticamente un ${(gainRate * 100).toFixed(0)}% (+$${raiseAmount.toLocaleString('es-CL')}). Nuevo ingreso estimado: $${state.currentJob.salary.toLocaleString('es-CL')} Aprox.`;
      }

      closeJobModal();
      renderTrabajoStage('capacitacion');
      if (typeof updateHUD === 'function') updateHUD();

      alert(`¡Felicitaciones! Has completado con éxito '${course.name}'.${freelanceMsg}`);
    }

    // ==========================================================================
    // LÓGICA DEL CHAT DE NEGOCIACIÓN SALARIAL
    // ==========================================================================
    let negChatMessages = [];
    let negChatStep = 'initial';
    let negChatAskedRaise = false;
    let negChatAskedPromotion = false;

    function initNegChat() {
      const initialGreetings = [
        'Hola, ¿qué te trae por acá?',
        '¡Hola! Cuéntame, ¿en qué te puedo ayudar hoy?',
        'Buenas, ¿qué novedades me traes?'
      ];
      negChatMessages = [
        { sender: 'boss', text: initialGreetings[Math.floor(Math.random() * initialGreetings.length)] }
      ];
      negChatStep = 'initial';
      negChatAskedRaise = false;
      negChatAskedPromotion = false;
    }

    function renderNegChatMessages() {
      const container = document.getElementById('neg-chat-messages-container');
      if (!container) return;
      container.innerHTML = negChatMessages.map(msg => `
        <div class="neg-msg-bubble ${msg.sender === 'boss' ? 'neg-msg-boss' : 'neg-msg-user'}">
          ${msg.text}
        </div>
      `).join('');
      container.scrollTop = container.scrollHeight;
    }

    function renderNegChatOptions() {
      const container = document.getElementById('neg-chat-options-container');
      if (!container || !state.currentJob) return;

      if (!Array.isArray(state.appliedCourseRaises)) state.appliedCourseRaises = [];
      const completedIds = (state.courses || []).map(c => typeof c === 'string' ? c : c.id);
      const pendingCourses = coursesCatalogData.filter(c => completedIds.includes(c.id) && !state.appliedCourseRaises.includes(c.id));

      if (pendingCourses.length > 0) {
        pendingCourses.sort((a, b) => {
          const aFav = a.favorsJobs.includes(state.currentJob.id) ? 1 : 0;
          const bFav = b.favorsJobs.includes(state.currentJob.id) ? 1 : 0;
          return bFav - aFav;
        });
      }
      const bestCourse = pendingCourses.length > 0 ? pendingCourses[0] : null;

      let html = '';

      if (negChatStep === 'initial') {
        html = `
          <div style="font-size: 0.60rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Selecciona qué responder:</div>
          <button type="button" class="neg-option-btn" onclick="handleNegChatOption('saludar')">
            <span>💬</span> <span>"Hola, solo pasé a saludar"</span>
          </button>
          ${!negChatAskedRaise ? `
            <button type="button" class="neg-option-btn" onclick="handleNegChatOption('aumento')">
              ${bestCourse ? `<span>🎓</span> <span>"Terminé el curso de <strong>${bestCourse.name}</strong>, con esto espero podamos revisar mi sueldo."</span>` : `<span>💰</span> <span>"Quisiera ver la posibilidad de un aumento de sueldo."</span>`}
            </button>
          ` : ''}
          ${!negChatAskedPromotion ? `
            <button type="button" class="neg-option-btn" onclick="handleNegChatOption('ascenso')">
              <span>📈</span> <span>"Vi que hay una vacante abierta y me gustaría postular a un ascenso."</span>
            </button>
          ` : ''}
        `;
      } else if (negChatStep === 'after_greeting') {
        html = `
          <div style="font-size: 0.60rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Selecciona qué responder:</div>
          <button type="button" class="neg-option-btn" onclick="handleNegChatOption('despedir')">
            <span>🚪</span> <span>"Gracias, vuelvo a mis labores."</span>
          </button>
          ${!negChatAskedRaise ? `
            <button type="button" class="neg-option-btn" onclick="handleNegChatOption('aumento')">
              <span>💰</span> <span>"Aprovechando la instancia, quería consultar por una mejora de sueldo."</span>
            </button>
          ` : ''}
          ${!negChatAskedPromotion ? `
            <button type="button" class="neg-option-btn" onclick="handleNegChatOption('ascenso')">
              <span>📈</span> <span>"También quería preguntar: ¿qué opciones de ascenso existen en el área?"</span>
            </button>
          ` : ''}
        `;
      } else if (negChatStep === 'after_raise_approved') {
        html = `
          <div style="font-size: 0.60rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Selecciona qué responder:</div>
          <button type="button" class="neg-option-btn" onclick="handleNegChatOption('despedir_agradecer')">
            <span>🤝</span> <span>"¡Excelente noticia! Muchas gracias por el reconocimiento."</span>
          </button>
          ${!negChatAskedPromotion ? `
            <button type="button" class="neg-option-btn" onclick="handleNegChatOption('ascenso')">
              <span>📈</span> <span>"¿Esta certificación habilita también la opción de postular a un ascenso?"</span>
            </button>
          ` : ''}
        `;
      } else if (negChatStep === 'after_raise_needs_course') {
        html = `
          <div style="font-size: 0.60rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Selecciona qué responder:</div>
          <button type="button" class="neg-option-btn" onclick="handleNegChatOption('despedir_entendido')">
            <span>📝</span> <span>"Entendido, buscaré esa certificación y volveremos a hablar."</span>
          </button>
          ${!negChatAskedPromotion ? `
            <button type="button" class="neg-option-btn" onclick="handleNegChatOption('ascenso')">
              <span>📈</span> <span>"¿Y existen opciones de ascenso mientras tanto?"</span>
            </button>
          ` : ''}
          <button type="button" class="neg-option-btn" onclick="handleNegChatOption('despedir')">
            <span>🚪</span> <span>"Comprendido, gracias por la orientación."</span>
          </button>
        `;
      } else if (negChatStep === 'after_health_low') {
        html = `
          <div style="font-size: 0.60rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Selecciona qué responder:</div>
          <button type="button" class="neg-option-btn" onclick="handleNegChatOption('despedir_salud')">
            <span>🧘</span> <span>"Comprendo, me enfocaré en recuperar el bienestar y el equilibrio."</span>
          </button>
          <button type="button" class="neg-option-btn" onclick="handleNegChatOption('despedir')">
            <span>🚪</span> <span>"Entendido, gracias por hacérmelo notar."</span>
          </button>
        `;
      } else if (negChatStep === 'after_promo_approved') {
        html = `
          <div style="font-size: 0.60rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Selecciona qué responder:</div>
          <button type="button" class="neg-option-btn" onclick="handleNegChatOption('despedir_agradecer')">
            <span>🤝</span> <span>"¡Muchas gracias por la confianza! Asumo el nuevo cargo con gran compromiso."</span>
          </button>
        `;
      } else if (negChatStep === 'after_promo_needs_course') {
        html = `
          <div style="font-size: 0.60rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Selecciona qué responder:</div>
          <button type="button" class="neg-option-btn" onclick="handleNegChatOption('despedir_entendido')">
            <span>📝</span> <span>"De acuerdo, buscaré certificarme en ese nivel avanzado."</span>
          </button>
          ${!negChatAskedRaise ? `
            <button type="button" class="neg-option-btn" onclick="handleNegChatOption('aumento')">
              <span>💰</span> <span>"¿Podríamos revisar al menos un ajuste de sueldo mientras tanto?"</span>
            </button>
          ` : ''}
          <button type="button" class="neg-option-btn" onclick="handleNegChatOption('despedir')">
            <span>🚪</span> <span>"Entendido, gracias por el tiempo."</span>
          </button>
        `;
      } else if (negChatStep === 'after_max_level') {
        html = `
          <div style="font-size: 0.60rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Selecciona qué responder:</div>
          <button type="button" class="neg-option-btn" onclick="handleNegChatOption('despedir_agradecer')">
            <span>🤝</span> <span>"¡Muchas gracias por la sinceridad y el tremendo apoyo!"</span>
          </button>
          <button type="button" class="neg-option-btn" onclick="handleNegChatOption('despedir_agradecer')">
            <span>🚀</span> <span>"Lo tendré muy en cuenta para mis próximos pasos. ¡Gracias por el consejo!"</span>
          </button>
        `;
      } else if (negChatStep === 'ended') {
        html = `
          <div style="text-align: center; padding: 6px 0;">
            <div style="font-size: 0.65rem; color: #64748b; margin-bottom: 6px;">Conversación finalizada</div>
            <button type="button" class="personal-subview-back-btn" style="margin: 0 auto; display: inline-flex;" onclick="renderTrabajoStage('main')">
              <span>◀ Volver a Trabajo</span>
            </button>
          </div>
        `;
      }

      container.innerHTML = html;
    }

    function handleNegChatOption(optionType) {
      if (!state.currentJob) return;

      const optionsContainer = document.getElementById('neg-chat-options-container');
      if (optionsContainer && optionType !== 'despedir' && optionType !== 'despedir_agradecer' && optionType !== 'despedir_entendido' && optionType !== 'despedir_salud') {
        optionsContainer.innerHTML = `
          <div style="font-size: 0.62rem; color: #94a3b8; font-style: italic; padding: 6px 0; text-align: center;">
            Escribiendo...
          </div>
        `;
      }

      if (optionType === 'saludar') {
        negChatMessages.push({ sender: 'user', text: 'Hola, solo pasé a saludar.' });
        renderNegChatMessages();
        setTimeout(() => {
          const greetingReplies = [
            '¡Hola! Qué alivio, pensé que venías a pedir plata... jajaja.',
            '¡Qué milagro! Por lo general cuando entran acá es para quejarse... jajaja.',
            '¡Hola! Menos mal, ya me asustaba pensando en qué se había roto... ¡Saludos!'
          ];
          negChatMessages.push({
            sender: 'boss',
            text: greetingReplies[Math.floor(Math.random() * greetingReplies.length)]
          });
          negChatStep = 'after_greeting';
          renderNegChatMessages();
          renderNegChatOptions();
        }, 350);
      } else if (optionType === 'aumento') {
        negChatAskedRaise = true;
        if (!Array.isArray(state.appliedCourseRaises)) state.appliedCourseRaises = [];
        const completedIds = (state.courses || []).map(c => typeof c === 'string' ? c : c.id);
        const pendingCourses = coursesCatalogData.filter(c => completedIds.includes(c.id) && !state.appliedCourseRaises.includes(c.id));

        if (pendingCourses.length > 0) {
          pendingCourses.sort((a, b) => {
            const aFav = a.favorsJobs.includes(state.currentJob.id) ? 1 : 0;
            const bFav = b.favorsJobs.includes(state.currentJob.id) ? 1 : 0;
            return bFav - aFav;
          });
        }
        const bestCourse = pendingCourses.length > 0 ? pendingCourses[0] : null;

        if (bestCourse) {
          negChatMessages.push({ sender: 'user', text: `Terminé el curso de <strong>${bestCourse.name}</strong>, con esto espero podamos revisar mi sueldo.` });
        } else {
          negChatMessages.push({ sender: 'user', text: 'Quisiera ver la posibilidad de un aumento de sueldo.' });
        }
        renderNegChatMessages();

        setTimeout(() => {
          // 1. Validar salud mental o emocional
          if ((state.healthMental || 40) < 20 || (state.healthEmotional || 40) < 20) {
            const healthLowReplies = [
              'Te veo con cara de cansancio nivel zombi... Primero recupera el sueño y la salud, después hablamos de números.',
              'Antes de asumir más carga o exigencias, necesitas descansar un poco. ¡Recupera energías primero y luego lo vemos!',
              'Se nota que el estrés te está pasando la cuenta. Cuidemos primero tu bienestar; de números hablamos cuando estés mejor.'
            ];
            negChatMessages.push({
              sender: 'boss',
              text: healthLowReplies[Math.floor(Math.random() * healthLowReplies.length)]
            });
            negChatStep = 'after_health_low';
            renderNegChatMessages();
            renderNegChatOptions();
            return;
          }

          // 2. Revisar si hay curso para aumento
          if (bestCourse) {
            const isFav = bestCourse.favorsJobs.includes(state.currentJob.id);
            const rate = isFav ? bestCourse.gainFavored : bestCourse.gainBase;
            const raise = Math.round((state.currentJob.salary || 0) * rate);

            state.currentJob.salary = (state.currentJob.salary || 0) + raise;
            if (state.currentJob.grossSalary) {
              state.currentJob.grossSalary = Math.round(state.currentJob.grossSalary * (1 + rate));
            }
            state.appliedCourseRaises.push(bestCourse.id);

            const raiseApprovedReplies = [
              `¡Justo me llegó el aviso de que aprobaste <strong>'${bestCourse.name}'</strong>! Da gusto ver ese compromiso, así que te ganaste un aumento de $${raise.toLocaleString('es-CL')}. ¡Bien merecido!`,
              `¡Justo lo que quería ver! Me enteré de tu certificación en <strong>'${bestCourse.name}'</strong> y rinde frutos: te subimos el sueldo en $${raise.toLocaleString('es-CL')}. ¡Excelente trabajo!`,
              `Déjame revisar... ¡oh, veo que completaste <strong>'${bestCourse.name}'</strong>! Eso demuestra ganas de crecer: te autoricé un aumento de $${raise.toLocaleString('es-CL')}. ¡Felicitaciones!`
            ];
            negChatMessages.push({
              sender: 'boss',
              text: raiseApprovedReplies[Math.floor(Math.random() * raiseApprovedReplies.length)]
            });
            negChatStep = 'after_raise_approved';
            renderNegChatMessages();
            renderNegChatOptions();
            if (typeof updateHUD === 'function') updateHUD();
          } else {
            // Recomendar cursos (hasta 2 si están disponibles)
            const favoredCourses = coursesCatalogData.filter(c => c.favorsJobs.includes(state.currentJob.id) && !completedIds.includes(c.id));
            const availableToSuggest = favoredCourses.length > 0 
              ? favoredCourses 
              : coursesCatalogData.filter(c => !completedIds.includes(c.id));

            const hasMultiple = availableToSuggest.length >= 2;
            const suggestedTxt = hasMultiple
              ? `<strong>'${availableToSuggest[0].name}'</strong> o <strong>'${availableToSuggest[1].name}'</strong>`
              : `<strong>'${availableToSuggest[0]?.name || coursesCatalogData[0].name}'</strong>`;

            const raiseNeedsCourseReplies = [
              `Por ahora no es posible darte un aumento. Pero si apruebas ${suggestedTxt}, ahí sí tendré el respaldo para pedirlo y de seguro te lo aprueban.`,
              `En este momento la respuesta es no. Sin embargo, si te capacitas aprobando ${suggestedTxt}, se abre la puerta de inmediato para mejorar tu sueldo.`,
              `Lamentablemente ahora no puedo subirte el sueldo. Pero no te desanimes: saca la certificación de ${suggestedTxt} y verás que las opciones de aumento llegan solas.`
            ];
            negChatMessages.push({
              sender: 'boss',
              text: raiseNeedsCourseReplies[Math.floor(Math.random() * raiseNeedsCourseReplies.length)]
            });
            negChatStep = 'after_raise_needs_course';
            renderNegChatMessages();
            renderNegChatOptions();
          }
        }, 400);
      } else if (optionType === 'ascenso') {
        negChatAskedPromotion = true;
        negChatMessages.push({ sender: 'user', text: 'Vi que hay una vacante abierta y me gustaría postular a un ascenso.' });
        renderNegChatMessages();

        setTimeout(() => {
          // 1. Validar salud mental y emocional
          if ((state.healthMental || 40) < 20 || (state.healthEmotional || 40) < 20) {
            const healthLowReplies = [
              'Te veo con cara de cansancio nivel zombi... Primero recupera el sueño y la salud, después hablamos de números.',
              'Antes de asumir más carga o exigencias, necesitas descansar un poco. ¡Recupera energías primero y luego lo vemos!',
              'Se nota que el estrés te está pasando la cuenta. Cuidemos primero tu bienestar; de números hablamos cuando estés mejor.'
            ];
            negChatMessages.push({
              sender: 'boss',
              text: healthLowReplies[Math.floor(Math.random() * healthLowReplies.length)]
            });
            negChatStep = 'after_health_low';
            renderNegChatMessages();
            renderNegChatOptions();
            return;
          }

          // 2. Verificar curso Nivel Avanzado que favorezca su puesto (🌟)
          if (!Array.isArray(state.promotionsEarned)) state.promotionsEarned = [];
          const completedIds = (state.courses || []).map(c => typeof c === 'string' ? c : c.id);
          const advCoursesFavored = coursesCatalogData.filter(c => c.level === 'avanzado' && c.favorsJobs.includes(state.currentJob.id));

          // Buscar si tiene alguno aprobado que no haya usado para ascenso
          const availableAdv = advCoursesFavored.find(c => completedIds.includes(c.id) && !state.promotionsEarned.includes(c.id));

          if (availableAdv) {
            // Ascender
            const currentLevel = state.currentJob.level || 1;
            const newLevel = currentLevel + 1;
            state.currentJob.level = newLevel;

            // Formatear nombre: ej. "Gestión Operativa Nivel 2"
            let baseName = state.currentJob.name.replace(/\s+Nivel\s+\d+/i, '').replace(/\s*\/\s*Administrativa/i, '').trim();
            state.currentJob.name = `${baseName} Nivel ${newLevel}`;

            // Aumento de sueldo por ascenso (+15%)
            const raise = Math.round((state.currentJob.salary || 0) * 0.15);
            state.currentJob.salary = (state.currentJob.salary || 0) + raise;
            if (state.currentJob.grossSalary) {
              state.currentJob.grossSalary = Math.round(state.currentJob.grossSalary * 1.15);
            }
            state.promotionsEarned.push(availableAdv.id);

            const promoApprovedReplies = [
              `Déjame ver en el sistema... ¡oh, veo que aprobaste <strong>'${availableAdv.name}'</strong>! Eso cambia todo: desde hoy asumes como '${state.currentJob.name}' con un aumento de $${raise.toLocaleString('es-CL')} en tu sueldo. ¡Felicitaciones!`,
              `¡Me enteré de que completaste <strong>'${availableAdv.name}'</strong>! Era justo el requisito que faltaba para postularte: a partir de hoy eres '${state.currentJob.name}' con un aumento de $${raise.toLocaleString('es-CL')}.`,
              `Justamente me llegó la confirmación de tu certificación en <strong>'${availableAdv.name}'</strong>. Valida totalmente tu ascenso: desde hoy pasas a '${state.currentJob.name}' con $${raise.toLocaleString('es-CL')} más de sueldo.`
            ];
            negChatMessages.push({
              sender: 'boss',
              text: promoApprovedReplies[Math.floor(Math.random() * promoApprovedReplies.length)]
            });
            negChatStep = 'after_promo_approved';
            renderNegChatMessages();
            renderNegChatOptions();
            if (typeof updateHUD === 'function') updateHUD();
          } else {
            // No tiene el curso avanzado requerido (recomendar hasta 2 si están disponibles)
            const missingAdvList = advCoursesFavored.filter(c => !completedIds.includes(c.id));
            if (missingAdvList.length > 0) {
              const hasMultipleAdv = missingAdvList.length >= 2;
              const advTxt = hasMultipleAdv
                ? `<strong>'${missingAdvList[0].name}'</strong> o <strong>'${missingAdvList[1].name}'</strong>`
                : `<strong>'${missingAdvList[0].name}'</strong>`;

              const promoNeedsCourseReplies = [
                `Paso a paso... para ese sillón necesitas la certificación avanzada de ${advTxt}. ¡Apenas tengas ${hasMultipleAdv ? 'alguna' : 'esa certificación'}, el puesto es tuyo!`,
                `Para dar ese gran salto la empresa exige la especialización de ${advTxt}. ¡Aprueba ${hasMultipleAdv ? 'uno de ellos' : 'el curso'} y subes de nivel!`,
                `Me gusta la ambición, pero el requisito obligatorio es aprobar ${advTxt}. ¡Termina ${hasMultipleAdv ? 'cualquiera de ellos' : 'el programa'} y lo hacemos oficial!`
              ];
              negChatMessages.push({
                sender: 'boss',
                text: promoNeedsCourseReplies[Math.floor(Math.random() * promoNeedsCourseReplies.length)]
              });
              negChatStep = 'after_promo_needs_course';
            } else {
              const maxLevelReplies = [
                'Has alcanzado el nivel máximo de desarrollo para tu posición actual. ¡Has demostrado un desempeño excepcional! Yo no debería decirte esto porque eres un gran aporte a la empresa, pero con tus capacidades quizás deberías independizarte o buscar un trabajo en otra parte, porque como vas ya solo te queda reemplazarme, ¡jajaja!',
                '¡Llegaste a la cima de esta área! Desempeño impecable. Entre nosotros: con lo que sabes deberías emprender o buscar un puesto de gerencia afuera, ¡porque acá el único puesto que te va quedando es el mío! Jajaja.',
                'La verdad, eres un aporte tremendo y creo que topaste techo, pero con tu nivel podrías armar tu propia empresa o buscar un nuevo desafío afuera, antes de que me quites mi escritorio, ¡jajaja!'
              ];
              negChatMessages.push({
                sender: 'boss',
                text: maxLevelReplies[Math.floor(Math.random() * maxLevelReplies.length)]
              });
              negChatStep = 'after_max_level';
            }
            renderNegChatMessages();
            renderNegChatOptions();
          }
        }, 450);
      } else if (optionType === 'despedir') {
        negChatMessages.push({ sender: 'user', text: 'Gracias, vuelvo a mis labores.' });
        renderNegChatMessages();
        setTimeout(() => {
          const farewellReplies = [
            '¡Que tengas un buen día!',
            '¡Dale! Ánimo con la jornada.',
            '¡Nos vemos! A seguir con todo.'
          ];
          negChatMessages.push({
            sender: 'boss',
            text: farewellReplies[Math.floor(Math.random() * farewellReplies.length)]
          });
          negChatStep = 'ended';
          renderNegChatMessages();
          renderNegChatOptions();
        }, 300);
      } else if (optionType === 'despedir_agradecer') {
        negChatMessages.push({ sender: 'user', text: '¡Muchas gracias por todo!' });
        renderNegChatMessages();
        setTimeout(() => {
          const thanksReplies = [
            '¡A ti! A ponerle ganas al día.',
            '¡De nada! Que rinda esa motivación.',
            '¡Merecido! A celebrar y seguir con todo.'
          ];
          negChatMessages.push({
            sender: 'boss',
            text: thanksReplies[Math.floor(Math.random() * thanksReplies.length)]
          });
          negChatStep = 'ended';
          renderNegChatMessages();
          renderNegChatOptions();
        }, 300);
      } else if (optionType === 'despedir_entendido') {
        negChatMessages.push({ sender: 'user', text: 'Entendido, buscaré esa certificación y volveremos a hablar.' });
        renderNegChatMessages();
        setTimeout(() => {
          const studyReplies = [
            '¡Así me gusta! Éxito con los estudios.',
            '¡Esa es la actitud! Apenas tengas el diploma hablamos.',
            '¡Perfecto! Ponerle cabeza a los cursos siempre paga bien.'
          ];
          negChatMessages.push({
            sender: 'boss',
            text: studyReplies[Math.floor(Math.random() * studyReplies.length)]
          });
          negChatStep = 'ended';
          renderNegChatMessages();
          renderNegChatOptions();
        }, 300);
      } else if (optionType === 'despedir_salud') {
        negChatMessages.push({ sender: 'user', text: 'Comprendo, me enfocaré en recuperar el bienestar y el equilibrio.' });
        renderNegChatMessages();
        setTimeout(() => {
          const healthReplies = [
            '¡Por favor duerme y descansa! La salud va primero.',
            'Tómate un respiro de verdad. El trabajo no se va a escapar.',
            'A desconectarse y recargar pilas. Cuídate mucho.'
          ];
          negChatMessages.push({
            sender: 'boss',
            text: healthReplies[Math.floor(Math.random() * healthReplies.length)]
          });
          negChatStep = 'ended';
          renderNegChatMessages();
          renderNegChatOptions();
        }, 300);
      }
    }

    // CERRAR MODAL DE POSTULACIÓN
    function closeJobModal() {
      const modalRoot = document.getElementById('job-modal-root');
      if (modalRoot) modalRoot.innerHTML = '';
    }

    // APLICAR / POSTULAR A UN EMPLEO (VALIDACIÓN DE REQUISITOS)
    function applyToJob(jobId) {
      const job = jobOffersData.find(j => j.id === jobId);
      if (!job) return;

      const modalRoot = document.getElementById('job-modal-root');
      if (!modalRoot) return;

      // Evaluar requisitos
      const missingReqs = [];
      if (Array.isArray(job.reqs)) {
        job.reqs.forEach(req => {
          if (!req.check()) {
            missingReqs.push(req);
          }
        });
      }

      if (missingReqs.length === 0) {
        // CUMPLE REQUISITOS: Pide confirmar aceptación del empleo
        modalRoot.innerHTML = `
          <div class="job-modal-backdrop" onclick="if(event.target === this) closeJobModal()">
            <div class="job-modal-card success-card">
              <div class="job-modal-header">
                <div class="job-modal-icon-badge success-badge">✓</div>
                <div>
                  <div class="job-modal-title">${job.hasCourseReq || job.hasExpReq ? '¡Cumples con los Requisitos!' : 'Postulación Disponible'}</div>
                  <div class="job-modal-subtitle">${job.hasCourseReq || job.hasExpReq ? 'Postulación aprobada por el empleador' : 'Este puesto no exige requisitos previos de entrada'}</div>
                </div>
              </div>

              <div class="job-modal-body">
                <div class="job-modal-job-box">
                  <div style="font-size: 0.92rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 6px;">
                    <span>${job.icon}</span> <span>${job.name}</span>
                  </div>
                  ${job.isFreelance ? `
                    <div style="display: flex; justify-content: space-between; margin-top: 6px; font-size: 0.72rem;">
                      <span style="color: #64748b;">Sueldo variable estimado:</span>
                      <strong style="color: #059669; font-size: 0.82rem;">
                        $${job.salary.toLocaleString('es-CL')} Aprox.
                      </strong>
                    </div>
                  ` : job.isCommercial ? `
                    <div style="display: flex; justify-content: space-between; margin-top: 6px; font-size: 0.72rem;">
                      <span style="color: #64748b;">Sueldo Líquido base:</span>
                      <strong style="color: #059669; font-size: 0.82rem;">
                        $${job.salary.toLocaleString('es-CL')} + Comisiones
                      </strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 2px; font-size: 0.68rem;">
                      <span style="color: #64748b;">Sueldo Bruto base:</span>
                      <strong style="color: #334155;">$${job.grossSalary.toLocaleString('es-CL')}</strong>
                    </div>
                  ` : `
                    <div style="display: flex; justify-content: space-between; margin-top: 6px; font-size: 0.72rem;">
                      <span style="color: #64748b;">Sueldo Líquido:</span>
                      <strong style="color: #059669; font-size: 0.82rem;">
                        $${job.salary.toLocaleString('es-CL')}
                      </strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 2px; font-size: 0.68rem;">
                      <span style="color: #64748b;">Sueldo Bruto:</span>
                      <strong style="color: #334155;">$${job.grossSalary.toLocaleString('es-CL')}</strong>
                    </div>
                  `}
                  <div style="font-size: 0.63rem; color: #475569; margin-top: 5px; line-height: 1.35; border-top: 1px dashed #e2e8f0; padding-top: 4px;">
                    <div><strong>Condiciones:</strong> ${job.conditions}</div>
                    <div style="margin-top: 3px; color: ${job.hasCourseReq || job.hasExpReq ? '#15803d' : '#64748b'};">
                      <strong>Requisitos:</strong> ${job.requirements}
                    </div>
                  </div>
                </div>

                <div style="text-align: center; margin: 9px 0 6px 0;">
                  <div style="font-size: 0.76rem; font-weight: 800; color: #0f172a;">
                    ${job.isFreelance ? '¿Confirmas que deseas trabajar como independiente?' : '¿Confirmas que aceptas este puesto de trabajo?'}
                  </div>
                  <div style="font-size: 0.63rem; color: #64748b; margin-top: 2px;">
                    ${job.isFreelance ? 'Al confirmar, comenzarás a trabajar por cuenta propia.' : 'Al aceptar, se firmará tu contratación y se actualizarán tus ingresos.'}
                  </div>
                </div>

                ${state.currentJob ? `
                  <div style="font-size: 0.62rem; color: #b45309; background: #fffbeb; border: 1px solid #fef3c7; border-radius: 6px; padding: 4px 6px; text-align: center; margin-bottom: 8px;">
                    ⚠️ Nota: Esta opción reemplazará tu ocupación actual (<em>${state.currentJob.name}</em>).
                  </div>
                ` : ''}

                <div style="display: flex; gap: 8px; margin-top: 10px;">
                  <button type="button" class="btn-job-modal-confirm" onclick="confirmJobAcceptance('${job.id}')">
                    ${job.isFreelance ? 'Confirmo' : 'Aceptar Empleo'}
                  </button>
                  <button type="button" class="btn-job-modal-cancel" onclick="closeJobModal()">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        // NO CUMPLE REQUISITOS: Informa cuáles no tiene y la razón de rechazo
        modalRoot.innerHTML = `
          <div class="job-modal-backdrop" onclick="if(event.target === this) closeJobModal()">
            <div class="job-modal-card reject-card">
              <div class="job-modal-header">
                <div class="job-modal-icon-badge reject-badge">✕</div>
                <div>
                  <div class="job-modal-title" style="color: #b91c1c;">Postulación No Aceptada</div>
                  <div class="job-modal-subtitle">No cumples con los requisitos exigidos</div>
                </div>
              </div>

              <div class="job-modal-body">
                <div style="font-size: 0.72rem; color: #334155; line-height: 1.4; margin-bottom: 8px;">
                  Has postulado a <strong>${job.icon} ${job.name}</strong>, pero tu postulación <strong>no ha sido aceptada</strong> porque este puesto exige requisitos pendientes:
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 8px; font-size: 0.65rem; color: #475569; margin-bottom: 8px; text-align: left;">
                  <strong>Requisitos del cargo:</strong> ${job.requirements}
                </div>

                <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 9px;">
                  ${missingReqs.map(req => `
                    <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 6px 8px; text-align: left;">
                      <div style="font-size: 0.70rem; font-weight: 800; color: #b91c1c; display: flex; align-items: center; gap: 4px;">
                        <span>❌ Requisito pendiente:</span> <span>${req.label}</span>
                      </div>
                      <div style="font-size: 0.63rem; color: #7f1d1d; margin-top: 2px; line-height: 1.3;">
                        ${req.desc}
                      </div>
                    </div>
                  `).join('')}
                </div>

                <div style="font-size: 0.63rem; color: #475569; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 8px; line-height: 1.35; margin-bottom: 10px;">
                  💡 <strong>¿Cómo cumplir los requisitos?</strong> Puedes obtener la certificación de un curso en la sección de <strong>Capacitación</strong> y adquirir experiencia laboral previa postulando a opciones sin requisitos de entrada (Gestión Comercial, Freelance o Apoyo Operativo).
                </div>

                <button type="button" class="btn-job-modal-close" onclick="closeJobModal()">
                  Entendido
                </button>
              </div>
            </div>
          </div>
        `;
      }
    }

    // CONFIRMAR Y ACEPTAR EMPLEO
    function confirmJobAcceptance(jobId) {
      const job = jobOffersData.find(j => j.id === jobId);
      if (!job) return;

      if (!Array.isArray(state.jobHistory)) state.jobHistory = [];
      if (state.currentJob && !state.jobHistory.some(h => h.id === state.currentJob.id)) {
        state.jobHistory.push({ id: state.currentJob.id, name: state.currentJob.name });
      }

      state.currentJob = {
        id: job.id,
        name: job.name,
        salary: job.salary,
        grossSalary: job.isFreelance ? null : job.grossSalary,
        isFreelance: Boolean(job.isFreelance),
        isCommercial: Boolean(job.isCommercial),
        icon: job.icon,
        code: job.code,
        badge: job.badge,
        type: job.badge,
        schedule: job.isFreelance ? 'Horario flexible / Por proyectos' : (job.id === 'job_op2' ? 'Horario flexible' : 'Jornada completa'),
        conditions: job.conditions,
        requirements: job.requirements
      };

      if (!state.jobHistory.some(h => h.id === job.id)) {
        state.jobHistory.push({ id: job.id, name: job.name });
      }

      closeJobModal();
      renderTrabajoStage('busqueda');
    }

    // MODAL DE CONFIRMACIÓN DE RENUNCIA
    function confirmResignationModal() {
      if (!state.currentJob) return;
      const modalRoot = document.getElementById('job-modal-root');
      if (!modalRoot) return;

      const job = state.currentJob;
      const isFreelance = Boolean(job.isFreelance);

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeJobModal()">
          <div class="job-modal-card" style="border-color: #fca5a5;">
            <div class="job-modal-header" style="background: #fff5f5; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: #fee2e2; color: #dc2626; border: 1.5px solid #fca5a5; font-size: 1.1rem; width: 34px; height: 34px;">
                ⚠️
              </div>
              <div>
                <div class="job-modal-title" style="color: #991b1b; font-size: 0.95rem;">
                  ${isFreelance ? '¿Dejar actividad independiente?' : '¿Confirmas tu renuncia?'}
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.72rem; margin-top: 2px;">
                  ${isFreelance ? 'Estás a punto de pausar tu actividad autónoma' : 'Estás a punto de dejar tu puesto de trabajo actual'}
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 14px 16px;">
              <div class="job-modal-job-box" style="background: #fffafa; border-color: #fecaca; padding: 10px 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.92rem; font-weight: 800; color: #0f172a;">${job.name}</span>
                  <span style="font-size: 0.68rem; font-weight: 700; color: #b91c1c; background: #fee2e2; padding: 2px 7px; border-radius: 4px;">
                    ${isFreelance ? 'Independiente' : 'Puesto actual'}
                  </span>
                </div>
                <div style="font-size: 0.76rem; color: #64748b; margin-top: 5px;">
                  Ingreso que dejarás de percibir: <strong style="color: #b91c1c;">$${(job.salary || 0).toLocaleString('es-CL')} líquido/mes</strong>
                </div>
              </div>

              <div style="font-size: 0.74rem; color: #7f1d1d; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 6px; padding: 9px 11px; line-height: 1.42; margin: 10px 0 12px 0;">
                ⚠️ <strong>Consecuencia:</strong> Tu estado laboral pasará a <em>"Sin empleo activo"</em> y dejarás de recibir estos ingresos mensuales hasta que postules a otro puesto o inicies una nueva actividad.
              </div>

              <div style="display: flex; gap: 8px; margin-top: 10px;">
                <button type="button" class="btn-job-modal-danger" style="font-size: 0.80rem; padding: 10px 12px;" onclick="executeResignation()">
                  ${isFreelance ? 'Sí, dejar actividad' : 'Sí, confirmar renuncia'}
                </button>
                <button type="button" class="btn-job-modal-cancel" style="font-size: 0.78rem; padding: 10px 14px;" onclick="closeJobModal()">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // EJECUTAR RENUNCIA TRAS CONFIRMACIÓN
    function executeResignation() {
      if (state.currentJob) {
        if (!Array.isArray(state.jobHistory)) state.jobHistory = [];
        if (!state.jobHistory.some(h => h.id === state.currentJob.id)) {
          state.jobHistory.push({ id: state.currentJob.id, name: state.currentJob.name });
        }
      }
      state.currentJob = null;
      const inBusqueda = document.querySelector('.jobs-grid-2col');
      closeJobModal();
      if (inBusqueda) {
        renderTrabajoStage('busqueda');
      } else {
        renderTrabajoStage('main');
      }
    }

    // Alias retrocompatible
    function resignCurrentJob() {
      confirmResignationModal();
    }

    // ==========================================================================
    // MÓDULO BANCO: CUENTAS BANCARIAS, DEPÓSITOS Y CIERRE
    // ==========================================================================
