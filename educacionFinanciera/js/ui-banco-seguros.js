// Banco & Multi-Asset Seguros Hub — educacionFinanciera

    function closeBancoModal() {
      const modalRoot = document.getElementById('banco-modal-root');
      if (modalRoot) modalRoot.innerHTML = '';
    }

    function alertUpcomingBankFeature(secIdOrTitle, msg) {
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const sec = hubsData.banco.sections.find(s => s.id === secIdOrTitle || s.name === secIdOrTitle);
      const title = sec ? sec.name : secIdOrTitle;
      const icon = sec ? sec.icon : 'ℹ️';
      const shortDesc = sec ? sec.desc : '';
      const detail = (sec && sec.detailDesc) ? sec.detailDesc : (msg || `El producto o servicio de <strong>${title}</strong> estará habilitado en los próximos trimestres de la simulación.`);

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #cbd5e1;">
            <div class="job-modal-header" style="background: #f8fafc; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: #f1f5f9; color: #0284c7; border: 1.5px solid #cbd5e1; font-size: 1.25rem; width: 36px; height: 36px;">
                ${icon}
              </div>
              <div>
                <div class="job-modal-title" style="color: #0f172a; font-size: 0.95rem;">
                  ${title}
                </div>
                ${shortDesc ? `<div style="font-size: 0.64rem; color: #0284c7; font-style: italic; margin-top: 1px;">"${shortDesc}"</div>` : ''}
              </div>
            </div>

            <div class="job-modal-body" style="padding: 14px 16px;">
              <div style="font-size: 0.74rem; color: #334155; line-height: 1.45; margin-bottom: 14px;">
                ${detail}
              </div>
              <button type="button" onclick="closeBancoModal()" style="width: 100%; padding: 8px; font-size: 0.76rem; font-weight: 800; background: #0284c7; color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                Entendido
              </button>
            </div>
          </div>
        </div>
      `;
    }

    function renderBancoStage(subView = 'main') {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      const titleElem = document.getElementById('hub-stage-title');
      const subtitleElem = document.getElementById('hub-stage-subtitle');
      const iconBox = document.getElementById('hub-stage-icon-box');

      if (iconBox) {
        iconBox.style.cursor = 'default';
        iconBox.onclick = null;
        iconBox.removeAttribute('title');
        iconBox.className = 'hub-stage-header-icon dock-icon-box icon-banco';
        iconBox.innerHTML = '<span>🏦</span>';
      }
      if (titleElem) titleElem.innerText = '🏦 Banco';
      if (subtitleElem) subtitleElem.innerText = 'Servicios financieros y cuentas bancarias';

      if (subView === 'cuenta_ahorro' || subView === 'ahorro') {
        renderBankAccountView('ahorro');
        return;
      }
      if (subView === 'cuenta_rut_vista' || subView === 'rut_vista') {
        renderBankAccountView('rut_vista');
        return;
      }
      if (subView === 'cuenta_corriente' || subView === 'corriente') {
        renderCuentaCorrienteView();
        return;
      }
      if (subView === 'linea') {
        renderLineaCreditoView();
        return;
      }
      if (subView === 'tarjeta') {
        renderTarjetaCreditoView();
        return;
      }
      if (subView === 'fondos') {
        renderFondosMutuosView();
        return;
      }
      if (subView === 'depositos' || subView === 'dap') {
        renderDepositosPlazoView();
        return;
      }
      if (subView === 'seguros') {
        renderSegurosView();
        return;
      }

      // VISTA PRINCIPAL DEL BANCO
      container.innerHTML = `
        <div class="personal-subview-box">
          <!-- GRID 2 COLUMNAS DE PRODUCTOS BANCARIOS -->
          <div class="hub-grid-2col">
            ${hubsData.banco.sections.map(sec => {
              let clickAction = '';
              if (sec.id === 'ahorro') {
                clickAction = "renderBancoStage('cuenta_ahorro')";
              } else if (sec.id === 'rut_vista') {
                clickAction = "renderBancoStage('cuenta_rut_vista')";
              } else if (sec.id === 'corriente') {
                clickAction = "renderBancoStage('cuenta_corriente')";
              } else if (sec.id === 'linea') {
                clickAction = "renderBancoStage('linea')";
              } else if (sec.id === 'tarjeta') {
                clickAction = "renderBancoStage('tarjeta')";
              } else if (sec.id === 'fondos') {
                clickAction = "renderBancoStage('fondos')";
              } else if (sec.id === 'dap' || sec.id === 'depositos') {
                clickAction = "renderBancoStage('depositos')";
              } else if (sec.id === 'seguros') {
                clickAction = "renderBancoStage('seguros')";
              } else {
                clickAction = `alertUpcomingBankFeature('${sec.id}')`;
              }

              return `
                <div class="hub-option-card" onclick="${clickAction}">
                  <div class="hub-option-icon">${sec.icon || '📌'}</div>
                  <div class="hub-option-text" style="flex: 1;">
                    <div class="hub-option-name" style="font-size: 0.72rem; font-weight: 800; color: #0f172a; margin-bottom: 2px;">${sec.name}</div>
                    <div class="hub-option-desc" style="font-size: 0.58rem; color: #64748b; line-height: 1.25;">${sec.desc}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    function renderBankAccountView(accountKey) {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      const isAhorro = accountKey === 'ahorro';
      const secData = hubsData.banco.sections.find(s => s.id === (isAhorro ? 'ahorro' : 'rut_vista'));
      const title = secData ? secData.name : (isAhorro ? 'Cuenta de Ahorro' : 'Cuenta RUT / Vista');
      const icon = secData ? secData.icon : (isAhorro ? '🐖' : '💳');
      const shortDesc = secData ? secData.desc : '';
      const detailDesc = secData ? secData.detailDesc : '';

      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      const acc = isAhorro
        ? bankAccounts.find(a => (a.id || '').includes('ahorro') || (a.type || '').includes('ahorro'))
        : bankAccounts.find(a => (a.id || '').includes('rut') || (a.id || '').includes('vista') || (a.name || '').includes('RUT'));

      const otherAccounts = bankAccounts.filter(a => a !== acc);

      if (!acc) {
        // CUENTA NO CONTRATADA
        container.innerHTML = `
          <div class="personal-subview-box">
            <div class="personal-subview-top">
              <span style="font-size: 0.88rem; font-weight: 800; color: #047857;">${icon} ${title}</span>
              <button type="button" class="personal-subview-back-btn" onclick="renderBancoStage('main')">
                <span>◀ Volver</span>
              </button>
            </div>

            <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 9px; padding: 12px; margin-bottom: 9px; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03);">
              <div style="display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px;">
                <div style="font-size: 1.7rem; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; min-width: 44px;">
                  ${icon}
                </div>
                <div>
                  <div style="font-size: 0.86rem; font-weight: 800; color: #0f172a;">${title}</div>
                  <div style="font-size: 0.65rem; color: #0284c7; font-style: italic; margin-top: 1px;">"${shortDesc}"</div>
                  <div style="font-size: 0.68rem; color: #475569; line-height: 1.35; margin-top: 4px;">
                    ${detailDesc}
                  </div>
                </div>
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; padding: 8px 10px; margin-bottom: 12px; font-size: 0.68rem; display: flex; flex-direction: column; gap: 5px;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">• Requisitos de apertura:</span>
                  <strong style="color: #047857;">Sin requisitos</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">• Costo de apertura:</span>
                  <strong style="color: #047857;">$0 (Gratis)</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">• Costo de mantención:</span>
                  <strong style="color: #047857;">$0 mensual</strong>
                </div>
                ${isAhorro ? `
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: #64748b;">• Tasa de interés anual:</span>
                    <strong style="color: #047857;">Reajuste UF + 1,0% anual</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: #64748b;">• Modalidad de giros:</span>
                    <strong style="color: #047857;">Giro diferido (máx. 6 al año)</strong>
                  </div>
                ` : ''}
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">• Estado actual:</span>
                  <span style="color: #94a3b8; font-style: italic;">No contratada</span>
                </div>
              </div>

              <button type="button" class="btn-course-enroll" style="width: 100%; padding: 9px; font-size: 0.82rem; background: linear-gradient(135deg, #10b981 0%, #047857 100%); color: #ffffff; border: none; border-radius: 7px; cursor: pointer; font-weight: 800;" onclick="openBankAccountAction('${accountKey}')">
                Abrir cuenta
              </button>
            </div>
          </div>
        `;
        return;
      }

      // CUENTA CONTRATADA Y ACTIVA
      const balance = acc.balance || 0;
      const cash = state.cash || 0;

      container.innerHTML = `
        <div class="personal-subview-box">
          <div class="personal-subview-top">
            <span style="font-size: 0.88rem; font-weight: 800; color: #047857;">${icon} ${title}</span>
            <button type="button" class="personal-subview-back-btn" onclick="renderBancoStage('main')">
              <span>◀ Volver</span>
            </button>
          </div>

          <!-- PANEL DE SALDO ACTIVO -->
          <div style="background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%); border: 1.5px solid #a7f3d0; border-radius: 9px; padding: 10px 12px; margin-bottom: 8px; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03);">
            <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
              <span style="font-size: 0.58rem; font-weight: 700; background: #d1fae5; color: #047857; padding: 1px 6px; border-radius: 4px;">🟢 Cuenta Activa</span>
              <span style="font-size: 0.58rem; color: #065f46; font-weight: 600;">${isAhorro ? 'Giro diferido (máx. 6 al año) · Reajuste UF + 1,0%' : 'Débito / Vista'}</span>
            </div>
            <div style="font-size: 1.30rem; font-weight: 800; color: #047857; font-family: var(--font-title);">
              $${balance.toLocaleString('es-CL')}
            </div>
            <div style="font-size: 0.58rem; color: #065f46;">Saldo disponible en esta cuenta</div>
          </div>

          <!-- DESCRIPCIÓN DETALLADA DEL PRODUCTO -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 10px; margin-bottom: 8px;">
            <div style="font-size: 0.62rem; color: #0284c7; font-style: italic; margin-bottom: 2px;">"${shortDesc}"</div>
            <div style="font-size: 0.66rem; color: #475569; line-height: 1.35;">
              ${detailDesc}
            </div>
          </div>

          <!-- ACCIONES EN 3 COLUMNAS -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 4px;">
            <button type="button" onclick="promptDepositModal('${acc.id}')" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 10px 4px; background: #ffffff; border: 1.5px solid #86efac; border-radius: 8px; cursor: pointer; color: #166534; box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04); transition: transform 0.1s ease;">
              <span style="font-size: 1.25rem; line-height: 1;">📥</span>
              <span style="font-size: 0.66rem; font-weight: 800;">Depositar</span>
            </button>

            <button type="button" onclick="promptWithdrawModal('${acc.id}')" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 10px 4px; background: #ffffff; border: 1.5px solid #93c5fd; border-radius: 8px; cursor: pointer; color: #1e40af; box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04); transition: transform 0.1s ease;">
              <span style="font-size: 1.25rem; line-height: 1;">📤</span>
              <span style="font-size: 0.66rem; font-weight: 800; text-align: center; line-height: 1.15;">Girar / Transferir</span>
            </button>

            <button type="button" onclick="promptCloseBankAccount('${acc.id}')" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 10px 4px; background: #ffffff; border: 1.5px solid #fca5a5; border-radius: 8px; cursor: pointer; color: #991b1b; box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04); transition: transform 0.1s ease;">
              <span style="font-size: 1.25rem; line-height: 1;">⚠️</span>
              <span style="font-size: 0.66rem; font-weight: 800; text-align: center; line-height: 1.15;">Cerrar cuenta</span>
            </button>
          </div>
        </div>
      `;
    }

    function openBankAccountAction(accountKey) {
      if (!Array.isArray(state.bankAccounts)) state.bankAccounts = [];

      if (accountKey === 'ahorro') {
        if (!state.bankAccounts.some(a => a.id === 'acc_ahorro')) {
          state.bankAccounts.push({
            id: 'acc_ahorro',
            name: 'Cuenta de Ahorro',
            type: 'ahorro',
            icon: '🐖',
            isLiquid: true,
            balance: 0,
            openedAt: new Date().toISOString()
          });
        }
        renderBancoStage('cuenta_ahorro');
        alertUpcomingBankFeature('¡Cuenta de Ahorro abierta!', 'Tu Cuenta de Ahorro ha sido activada con costo $0. Ya puedes realizar depósitos desde tu efectivo o transferencias.');
      } else if (accountKey === 'rut_vista') {
        if (!state.bankAccounts.some(a => a.id === 'acc_rut_vista')) {
          state.bankAccounts.push({
            id: 'acc_rut_vista',
            name: 'Cuenta RUT / Vista',
            type: 'vista',
            icon: '💳',
            isLiquid: true,
            balance: 0,
            openedAt: new Date().toISOString()
          });
        }
        renderBancoStage('cuenta_rut_vista');
        alertUpcomingBankFeature('¡Cuenta RUT / Vista abierta!', 'Tu Cuenta RUT / Vista ha sido activada sin requisitos de renta mínima. Ya puedes depositar y manejar fondos líquidos.');
      }
      if (typeof updateHUD === 'function') updateHUD();
    }

    function promptDepositModal(accId) {
      const acc = (state.bankAccounts || []).find(a => a.id === accId);
      if (!acc) return;
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const cash = state.cash || 0;
      const otherAccounts = (state.bankAccounts || []).filter(a => a.id !== acc.id);

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #86efac;">
            <div class="job-modal-header" style="background: #f0fdf4; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: #dcfce7; color: #15803d; border: 1.5px solid #86efac; font-size: 1.1rem; width: 34px; height: 34px;">
                📥
              </div>
              <div>
                <div class="job-modal-title" style="color: #166534; font-size: 0.95rem;">
                  Depositar en ${acc.name}
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.72rem; margin-top: 2px;">
                  Saldo actual: $${(acc.balance || 0).toLocaleString('es-CL')}
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 14px 16px;">
              <div style="font-size: 0.66rem; font-weight: 700; color: #334155; margin-bottom: 5px;">Selecciona el origen de los fondos:</div>
              <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px;">
                <label style="display: flex; align-items: center; gap: 6px; font-size: 0.68rem; color: #1e293b; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; cursor: pointer;">
                  <input type="radio" name="bank_deposit_source" value="cash" checked />
                  <span>💵 Dinero en Efectivo ($${cash.toLocaleString('es-CL')} disponible)</span>
                </label>
                ${otherAccounts.map(o => `
                  <label style="display: flex; align-items: center; gap: 6px; font-size: 0.68rem; color: #1e293b; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; cursor: pointer;">
                    <input type="radio" name="bank_deposit_source" value="${o.id}" />
                    <span>${o.icon || '💳'} ${o.name} ($${(o.balance || 0).toLocaleString('es-CL')} disponible)</span>
                  </label>
                `).join('')}
              </div>

              <div style="font-size: 0.66rem; font-weight: 700; color: #334155; margin-bottom: 5px;">Monto a depositar ($):</div>
              <div style="margin-bottom: 14px;">
                <input type="number" id="bank-deposit-amount" min="1000" style="width: 100%; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 7px 9px; font-size: 0.88rem; font-weight: 700; color: #0f172a; outline: none; box-sizing: border-box;" />
              </div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 8px; font-size: 0.74rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">Cancelar</button>
                <button type="button" onclick="executeBankDeposit('${accId}')" style="flex: 1.5; padding: 8px; font-size: 0.74rem; font-weight: 800; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">Confirmar Depósito</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function executeBankDeposit(destId) {
      const destAcc = (state.bankAccounts || []).find(a => a.id === destId);
      if (!destAcc) return;

      const sourceRadio = document.querySelector('input[name="bank_deposit_source"]:checked');
      const sourceVal = sourceRadio ? sourceRadio.value : 'cash';

      const amountInput = document.getElementById('bank-deposit-amount');
      const amount = parseInt(amountInput ? amountInput.value : 0, 10);

      if (!amount || amount <= 0) {
        alertUpcomingBankFeature('Monto inválido', 'Por favor ingresa un monto válido mayor a $0 para depositar.');
        return;
      }

      if (sourceVal === 'cash') {
        const available = state.cash || 0;
        if (available < amount) {
          alertUpcomingBankFeature('Saldo insuficiente', `No tienes suficiente efectivo ($${available.toLocaleString('es-CL')}) para depositar $${amount.toLocaleString('es-CL')}.`);
          return;
        }
        state.cash -= amount;
        destAcc.balance = (destAcc.balance || 0) + amount;
      } else {
        const srcAcc = (state.bankAccounts || []).find(a => a.id === sourceVal);
        if (!srcAcc || (srcAcc.balance || 0) < amount) {
          alertUpcomingBankFeature('Saldo insuficiente', `La cuenta seleccionada no tiene saldo suficiente para transferir $${amount.toLocaleString('es-CL')}.`);
          return;
        }
        srcAcc.balance -= amount;
        destAcc.balance = (destAcc.balance || 0) + amount;
      }

      if (typeof updateHUD === 'function') updateHUD();

      const currentSubView = destId.includes('ahorro') ? 'cuenta_ahorro' : 'cuenta_rut_vista';
      renderBancoStage(currentSubView);

      alertUpcomingBankFeature('¡Depósito exitoso!', `Se han depositado $${amount.toLocaleString('es-CL')} en tu ${destAcc.name}.`);
    }

    function promptWithdrawModal(accId) {
      const acc = (state.bankAccounts || []).find(a => a.id === accId);
      if (!acc) return;
      if ((acc.balance || 0) <= 0) {
        alertUpcomingBankFeature('Sin fondos disponibles', `Tu ${acc.name} tiene saldo $0. Realiza un depósito primero para poder girar.`);
        return;
      }
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #93c5fd;">
            <div class="job-modal-header" style="background: #eff6ff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: #dbeafe; color: #1d4ed8; border: 1.5px solid #93c5fd; font-size: 1.1rem; width: 34px; height: 34px;">
                📤
              </div>
              <div>
                <div class="job-modal-title" style="color: #1e40af; font-size: 0.95rem;">
                  Girar dinero a Efectivo
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.72rem; margin-top: 2px;">
                  Desde ${acc.name} ($${(acc.balance || 0).toLocaleString('es-CL')} disponible)
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 14px 16px;">
              <div style="font-size: 0.68rem; font-weight: 700; color: #334155; margin-bottom: 5px;">Monto a retirar ($):</div>
              <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 14px;">
                <input type="number" id="bank-withdraw-amount" min="1000" max="${acc.balance || 0}" style="flex: 1; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 7px 9px; font-size: 0.88rem; font-weight: 700; color: #0f172a; outline: none; box-sizing: border-box;" />
                <button type="button" onclick="document.getElementById('bank-withdraw-amount').value = ${acc.balance || 0}" style="font-size: 0.68rem; font-weight: 700; background: #eff6ff; border: 1.5px solid #93c5fd; color: #1d4ed8; border-radius: 6px; padding: 7px 10px; cursor: pointer; white-space: nowrap;">Todo el saldo</button>
              </div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 8px; font-size: 0.74rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">Cancelar</button>
                <button type="button" onclick="executeBankWithdraw('${accId}')" style="flex: 1.5; padding: 8px; font-size: 0.74rem; font-weight: 800; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">Confirmar Giro</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function executeBankWithdraw(accId) {
      const acc = (state.bankAccounts || []).find(a => a.id === accId);
      if (!acc) return;

      const amountInput = document.getElementById('bank-withdraw-amount');
      const amount = parseInt(amountInput ? amountInput.value : 0, 10);

      if (!amount || amount <= 0) {
        alertUpcomingBankFeature('Monto inválido', 'Por favor ingresa un monto mayor a $0.');
        return;
      }

      if ((acc.balance || 0) < amount) {
        alertUpcomingBankFeature('Saldo insuficiente', `La cuenta solo dispone de $${(acc.balance || 0).toLocaleString('es-CL')}.`);
        return;
      }

      acc.balance -= amount;
      state.cash = (state.cash || 0) + amount;

      closeBancoModal();
      if (typeof updateHUD === 'function') updateHUD();

      const currentSubView = accId.includes('ahorro') ? 'cuenta_ahorro' : 'cuenta_rut_vista';
      renderBancoStage(currentSubView);

      alertUpcomingBankFeature('¡Giro realizado!', `Se retiraron $${amount.toLocaleString('es-CL')} desde tu ${acc.name} hacia tu Dinero en Efectivo.`);
    }

    function promptCloseBankAccount(accId) {
      const acc = (state.bankAccounts || []).find(a => a.id === accId);
      if (!acc) return;
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const balance = acc.balance || 0;
      const isCorriente = accId.includes('corriente') || (acc.type || '') === 'corriente';
      const lineaDebt = (isCorriente && state.creditLine) ? (Number(state.creditLine.used) || 0) : 0;
      const tarjetaDebt = (isCorriente && state.creditCard) ? (Number(state.creditCard.used) || 0) : 0;
      const totalDebtToClose = lineaDebt + tarjetaDebt;
      const availableFunds = balance + (Number(state.cash) || 0);
      const canPayDebts = availableFunds >= totalDebtToClose;

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #fca5a5;">
            <div class="job-modal-header" style="background: #fff5f5; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: #fee2e2; color: #dc2626; border: 1.5px solid #fca5a5; font-size: 1.1rem; width: 34px; height: 34px;">
                ⚠️
              </div>
              <div>
                <div class="job-modal-title" style="color: #991b1b; font-size: 0.95rem;">
                  ¿Cerrar ${acc.name}?
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.72rem; margin-top: 2px;">
                  El producto bancario dejará de estar activo
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 14px 16px;">
              ${isCorriente ? `
                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 7px; padding: 9px 11px; margin-bottom: 10px; font-size: 0.66rem; color: #334155; line-height: 1.4;">
                  <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">📋 Requisito de cierre en Chile:</div>
                  Para cerrar tu Cuenta Corriente es obligatorio <strong>liquidar todas las deudas vigentes</strong> de tu Línea de Crédito y Tarjeta de Crédito:<br/>
                  • Deuda Línea de Crédito: <strong style="color: ${lineaDebt > 0 ? '#dc2626' : '#047857'};">$${lineaDebt.toLocaleString('es-CL')}</strong><br/>
                  • Deuda Tarjeta de Crédito: <strong style="color: ${tarjetaDebt > 0 ? '#dc2626' : '#047857'};">$${tarjetaDebt.toLocaleString('es-CL')}</strong>
                </div>
              ` : ''}

              <div style="background: #fffafa; border: 1px solid #fecaca; border-radius: 7px; padding: 10px 12px; margin-bottom: 12px; font-size: 0.72rem; color: #7f1d1d; line-height: 1.4;">
                ${totalDebtToClose > 0 ? (canPayDebts ? `
                  Tienes una deuda total de <strong>$${totalDebtToClose.toLocaleString('es-CL')}</strong>. Al confirmar, se liquidará esta deuda usando tus fondos disponibles y el saldo restante se transferirá a tu <strong>Dinero en Efectivo</strong>.
                ` : `
                  ⛔ <strong>No puedes cerrar la cuenta aún:</strong> debes liquidar <strong>$${totalDebtToClose.toLocaleString('es-CL')}</strong> en deudas y actualmente cuentas con <strong>$${availableFunds.toLocaleString('es-CL')}</strong> entre saldo en cuenta y efectivo.
                `) : (balance > 0 ? `
                  El saldo acumulado de <strong style="color: #991b1b; font-size: 0.85rem;">$${balance.toLocaleString('es-CL')}</strong> será transferido de forma automática e íntegra a tu <strong>Dinero en Efectivo</strong>.
                ` : `
                  Esta cuenta tiene saldo $0 y no registra deudas pendientes. Se procederá con el cierre inmediato sin cargos asociados.
                `)}
              </div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 8px; font-size: 0.74rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">Cancelar</button>
                ${totalDebtToClose > 0 && !canPayDebts ? `
                  <button type="button" disabled style="flex: 1.5; padding: 8px; font-size: 0.72rem; font-weight: 800; background: #e2e8f0; color: #94a3b8; border: none; border-radius: 6px; cursor: not-allowed;">Fondos insuficientes para liquidar</button>
                ` : `
                  <button type="button" onclick="executeCloseBankAccount('${accId}')" style="flex: 1.5; padding: 8px; font-size: 0.74rem; font-weight: 800; background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">${totalDebtToClose > 0 ? `Liquidar $${totalDebtToClose.toLocaleString('es-CL')} y cerrar` : 'Sí, cerrar cuenta'}</button>
                `}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function executeCloseBankAccount(accId) {
      const accIdx = (state.bankAccounts || []).findIndex(a => a.id === accId);
      if (accIdx === -1) {
        closeBancoModal();
        return;
      }
      const acc = state.bankAccounts[accIdx];
      let balance = acc.balance || 0;
      const isCorriente = accId.includes('corriente') || (acc.type || '') === 'corriente';

      if (isCorriente) {
        const lineaDebt = state.creditLine ? (Number(state.creditLine.used) || 0) : 0;
        const tarjetaDebt = state.creditCard ? (Number(state.creditCard.used) || 0) : 0;
        const totalDebt = lineaDebt + tarjetaDebt;
        const totalAvailable = balance + (Number(state.cash) || 0);
        if (totalDebt > totalAvailable) {
          closeBancoModal();
          alertUpcomingBankFeature('Cierre bloqueado por deuda', 'Debes contar con fondos suficientes para liquidar las deudas de Línea de Crédito y Tarjeta de Crédito antes de cerrar la cuenta.');
          return;
        }
        if (totalDebt > 0) {
          if (balance >= totalDebt) {
            balance -= totalDebt;
          } else {
            const remainder = totalDebt - balance;
            balance = 0;
            state.cash = Math.max(0, (Number(state.cash) || 0) - remainder);
          }
          if (state.creditLine) state.creditLine.used = 0;
          if (state.creditCard) state.creditCard.used = 0;
        }
      }

      if (balance > 0) {
        state.cash = (state.cash || 0) + balance;
      }
      state.bankAccounts.splice(accIdx, 1);

      if (isCorriente) {
        if (state.creditLine && state.creditLine.associatedTo === 'acc_corriente') {
          state.creditLine = null;
          state.insurances = (state.insurances || []).filter(i => i.id !== 'desgravamen_linea');
        }
        if (state.creditCard && state.creditCard.associatedTo === 'acc_corriente') {
          state.creditCard = null;
        }
      }

      closeBancoModal();

      renderBancoStage('main');
      if (typeof updateHUD === 'function') updateHUD();

      alertUpcomingBankFeature(`Cuenta ${acc.name} cerrada`, `Se cerraron los productos asociados y se transfirieron $${balance.toLocaleString('es-CL')} a tu Dinero en Efectivo.`);
    }

    // ==========================================================================
    // CUENTA CORRIENTE: FLUJO COMERCIAL EN 3 ETAPAS Y VISTA ACTIVA
    // ==========================================================================
    let ccDraftPlan = {
      linea: false,
      lineaReviewed: false,
      tarjeta: false,
      tarjetaReviewed: false
    };

    function renderCuentaCorrienteView() {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      const acc = bankAccounts.find(a => (a.id || '').includes('corriente') || (a.type || '').includes('corriente') || (a.name || '').includes('Corriente'));

      if (!acc) {
        // ETAPA 1: SOLO PRESENTACIÓN DE LA CUENTA CORRIENTE (SIN CASILLAS NI OTROS PRODUCTOS)
        container.innerHTML = `
          <div class="personal-subview-box">
            <div class="personal-subview-top">
              <span style="font-size: 0.88rem; font-weight: 800; color: #047857;">🏦 Cuenta Corriente</span>
              <button type="button" class="personal-subview-back-btn" onclick="renderBancoStage('main')">
                <span>◀ Volver</span>
              </button>
            </div>

            <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 9px; padding: 12px; margin-bottom: 9px; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03);">
              <div style="display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px;">
                <div style="font-size: 1.7rem; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; min-width: 44px;">
                  🏦
                </div>
                <div>
                  <div style="font-size: 0.86rem; font-weight: 800; color: #0f172a;">Cuenta Corriente Bancaria</div>
                  <div style="font-size: 0.65rem; color: #0284c7; font-style: italic; margin-top: 1px;">"Manejo total de tu dinero con chequera, transferencias y respaldo."</div>
                  <div style="font-size: 0.68rem; color: #475569; line-height: 1.35; margin-top: 4px;">
                    Cuenta principal para centralizar tus ingresos, realizar transferencias sin topes bajos, emitir pagos y administrar tus finanzas cotidianas en el banco.
                  </div>
                </div>
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; padding: 8px 10px; margin-bottom: 12px; font-size: 0.68rem; display: flex; flex-direction: column; gap: 5px;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">• Medios de pago incluidos:</span>
                  <strong style="color: #0f172a;">Tarjeta de Débito y Transferencias</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">• Costo de apertura:</span>
                  <strong style="color: #047857;">$0</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">• Estado actual:</span>
                  <span style="color: #94a3b8; font-style: italic;">No contratada</span>
                </div>
              </div>

              <button type="button" class="btn-course-enroll" style="width: 100%; padding: 10px; font-size: 0.82rem; background: linear-gradient(135deg, #10b981 0%, #047857 100%); color: #ffffff; border: none; border-radius: 7px; cursor: pointer; font-weight: 800;" onclick="startCuentaCorrienteContractFlow()">
                Contratar Cuenta Corriente
              </button>
            </div>
          </div>
        `;
        return;
      }

      // CUENTA CORRIENTE ACTIVA
      const balance = acc.balance || 0;
      const hasLinea = !!state.creditLine;
      const hasTarjeta = !!state.creditCard;
      const hasFraude = (state.insurances || []).some(i => i.id === 'fraude_corriente' || i.type === 'fraude');

      container.innerHTML = `
        <div class="personal-subview-box">
          <div class="personal-subview-top">
            <span style="font-size: 0.88rem; font-weight: 800; color: #047857;">🏦 Cuenta Corriente</span>
            <button type="button" class="personal-subview-back-btn" onclick="renderBancoStage('main')">
              <span>◀ Volver</span>
            </button>
          </div>

          <!-- PANEL DE SALDO ACTIVO -->
          <div style="background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%); border: 1.5px solid #a7f3d0; border-radius: 9px; padding: 10px 12px; margin-bottom: 8px; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03);">
            <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 2px;">
              <span style="font-size: 0.58rem; font-weight: 700; background: #d1fae5; color: #047857; padding: 1px 6px; border-radius: 4px;">🟢 Cuenta Activa</span>
              <span style="font-size: 0.58rem; color: #065f46; font-weight: 600;">Plan Cuenta Corriente</span>
            </div>
            <div style="font-size: 1.30rem; font-weight: 800; color: #047857; font-family: var(--font-title);">
              $${balance.toLocaleString('es-CL')}
            </div>
            <div style="font-size: 0.58rem; color: #065f46;">Saldo disponible en esta cuenta</div>
          </div>

          <!-- RESUMEN DE PRODUCTOS ASOCIADOS EN EL PLAN -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; margin-bottom: 8px; font-size: 0.65rem;">
            <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">📦 Estado del Plan y Costos Mensuales:</div>
            <div style="display: flex; flex-direction: column; gap: 3px;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #64748b;">• Mantención Cuenta Corriente:</span>
                <strong style="color: ${hasLinea && hasTarjeta ? '#047857' : (hasLinea || hasTarjeta ? '#0284c7' : '#b45309')};">
                  ${hasLinea && hasTarjeta ? '$0/mes (¡100% bonificada por paquete!)' : (hasLinea || hasTarjeta ? '$7.000/mes (50% rebajada por 1 producto)' : '$14.000/mes (Base individual)')}
                </strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #64748b;">• Línea de Crédito:</span>
                <strong style="color: ${hasLinea ? '#047857' : '#94a3b8'};">${hasLinea ? '$500.000 cupo (Desgravamen: $1.900/mes)' : 'No contratada'}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #64748b;">• Tarjeta de Crédito:</span>
                <strong style="color: ${hasTarjeta ? '#047857' : '#94a3b8'};">${hasTarjeta ? '$950.000 cupo ($6.900 solo en uso)' : 'No contratada'}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #64748b;">• Seguro de Fraude:</span>
                <strong style="color: ${hasFraude ? '#047857' : '#94a3b8'};">${hasFraude ? 'Activo ($1.150/mes)' : 'No contratado'}</strong>
              </div>
            </div>
          </div>

          <!-- BOTONES DE ACCIÓN EN 3 COLUMNAS -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 4px;">
            <button type="button" onclick="promptDepositModal('${acc.id}')" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 10px 4px; background: #ffffff; border: 1.5px solid #86efac; border-radius: 8px; cursor: pointer; color: #166534; box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04); transition: transform 0.1s ease;">
              <span style="font-size: 1.25rem; line-height: 1;">📥</span>
              <span style="font-size: 0.66rem; font-weight: 800;">Depositar</span>
            </button>

            <button type="button" onclick="promptWithdrawModal('${acc.id}')" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 10px 4px; background: #ffffff; border: 1.5px solid #93c5fd; border-radius: 8px; cursor: pointer; color: #1e40af; box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04); transition: transform 0.1s ease;">
              <span style="font-size: 1.25rem; line-height: 1;">📤</span>
              <span style="font-size: 0.66rem; font-weight: 800; text-align: center; line-height: 1.15;">Girar / Transferir</span>
            </button>

            <button type="button" onclick="promptCloseBankAccount('${acc.id}')" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 10px 4px; background: #ffffff; border: 1.5px solid #fca5a5; border-radius: 8px; cursor: pointer; color: #991b1b; box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04); transition: transform 0.1s ease;">
              <span style="font-size: 1.25rem; line-height: 1;">⚠️</span>
              <span style="font-size: 0.66rem; font-weight: 800; text-align: center; line-height: 1.15;">Cerrar cuenta</span>
            </button>
          </div>
        </div>
      `;
    }

    function startCuentaCorrienteContractFlow() {
      ccDraftPlan = {
        linea: !!state.creditLine,
        lineaReviewed: !!state.creditLine,
        tarjeta: !!state.creditCard,
        tarjetaReviewed: !!state.creditCard
      };
      openCCPlanOfferModal();
    }

    // ETAPA 2: RESUMEN DE CONTRATACIÓN Y OFERTA COMERCIAL DEL EJECUTIVO
    function openCCPlanOfferModal() {
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const hasL = ccDraftPlan.linea;
      const hasT = ccDraftPlan.tarjeta;
      const ccMaintenance = (hasL && hasT) ? 0 : ((hasL || hasT) ? 7000 : 14000);
      const lineaFixedCost = hasL ? 1900 : 0;
      const totalFixedMonthly = ccMaintenance + lineaFixedCost;

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #10b981; max-width: 450px; max-height: 90vh; overflow-y: auto;">
            <div class="job-modal-header" style="background: linear-gradient(135deg, #047857 0%, #065f46 100%); color: #ffffff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.2rem; width: 36px; height: 36px;">
                🏦
              </div>
              <div>
                <div class="job-modal-title" style="color: #ffffff; font-size: 0.95rem;">
                  Solicitud de Cuenta Corriente
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.70rem; color: #d1fae5; margin-top: 2px;">
                  Revisa las condiciones y confirma tu contratación
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 12px 14px;">
              <!-- COSTO BASE Y OFERTA DEL EJECUTIVO -->
              <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 8px; padding: 9px 11px; margin-bottom: 10px;">
                <div style="font-size: 0.68rem; font-weight: 800; color: #92400e; margin-bottom: 3px;">
                  💬 Ejecutivo Comercial del Banco:
                </div>
                <div style="font-size: 0.65rem; color: #78350f; line-height: 1.38;">
                  "La Cuenta Corriente individual tiene una comisión de mantención de <strong>$14.000/mes</strong>. Sin embargo, tienes preaprobados dos productos adicionales: si sumas <strong>uno</strong> tu mantención baja a <strong>$7.000/mes</strong>, y si llevas <strong>ambos</strong> la mantención de tu Cuenta Corriente queda en <strong>$0/mes</strong>."
                </div>
              </div>

              <!-- OFERTAS ADICIONALES PARA BAJAR LA MANTENCIÓN -->
              <div style="font-size: 0.68rem; font-weight: 800; color: #0f172a; margin-bottom: 5px;">
                🎁 Productos preaprobados para rebajar tu mantención:
              </div>

              <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px;">
                <!-- OFERTA 1: LÍNEA DE CRÉDITO -->
                <div style="background: ${hasL ? '#f0fdf4' : '#ffffff'}; border: 1.5px solid ${hasL ? '#86efac' : '#cbd5e1'}; border-radius: 8px; padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                  <div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                      <strong style="font-size: 0.72rem; color: #0f172a;">⚡ Línea de Crédito ($500.000)</strong>
                      ${hasL ? `<span style="font-size: 0.55rem; font-weight: 800; background: #dcfce7; color: #166534; padding: 1px 6px; border-radius: 4px;">✓ Aceptada</span>` : (ccDraftPlan.lineaReviewed ? `<span style="font-size: 0.55rem; font-weight: 700; background: #f1f5f9; color: #64748b; padding: 1px 6px; border-radius: 4px;">Rechazada</span>` : '')}
                    </div>
                    <div style="font-size: 0.60rem; color: #047857; font-weight: 700; margin-top: 1px;">
                      Rebaja $7.000/mes en la mantención de tu Cuenta Corriente
                    </div>
                  </div>
                  <button type="button" onclick="openCCAddonDetailModal('linea')" style="padding: 5px 10px; font-size: 0.64rem; font-weight: 800; background: ${hasL ? '#ffffff' : '#0284c7'}; color: ${hasL ? '#0f172a' : '#ffffff'}; border: ${hasL ? '1px solid #cbd5e1' : 'none'}; border-radius: 6px; cursor: pointer; white-space: nowrap;">
                    ${hasL ? 'Ver / Cambiar' : 'Aceptar oferta'}
                  </button>
                </div>

                <!-- OFERTA 2: TARJETA DE CRÉDITO -->
                <div style="background: ${hasT ? '#f0fdf4' : '#ffffff'}; border: 1.5px solid ${hasT ? '#86efac' : '#cbd5e1'}; border-radius: 8px; padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                  <div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                      <strong style="font-size: 0.72rem; color: #0f172a;">💳 Tarjeta de Crédito ($950.000)</strong>
                      ${state.creditCard
                        ? `<span style="font-size: 0.55rem; font-weight: 800; background: #dcfce7; color: #166534; padding: 1px 6px; border-radius: 4px;">✓ Ya contratada (se suma al plan)</span>`
                        : (hasT ? `<span style="font-size: 0.55rem; font-weight: 800; background: #dcfce7; color: #166534; padding: 1px 6px; border-radius: 4px;">✓ Aceptada</span>` : (ccDraftPlan.tarjetaReviewed ? `<span style="font-size: 0.55rem; font-weight: 700; background: #f1f5f9; color: #64748b; padding: 1px 6px; border-radius: 4px;">Rechazada</span>` : ''))}
                    </div>
                    <div style="font-size: 0.60rem; color: #047857; font-weight: 700; margin-top: 1px;">
                      ${state.creditCard ? 'Tu tarjeta actual se asocia automáticamente y rebaja $7.000/mes tu mantención' : 'Rebaja $7.000/mes en la mantención de tu Cuenta Corriente'}
                    </div>
                  </div>
                  ${state.creditCard ? '' : `
                    <button type="button" onclick="openCCAddonDetailModal('tarjeta')" style="padding: 5px 10px; font-size: 0.64rem; font-weight: 800; background: ${hasT ? '#ffffff' : '#0284c7'}; color: ${hasT ? '#0f172a' : '#ffffff'}; border: ${hasT ? '1px solid #cbd5e1' : 'none'}; border-radius: 6px; cursor: pointer; white-space: nowrap;">
                      ${hasT ? 'Ver / Cambiar' : 'Aceptar oferta'}
                    </button>
                  `}
                </div>
              </div>

              <!-- RESUMEN ACTUAL DE LA CONTRATACIÓN -->
              <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 9px 11px; margin-bottom: 12px;">
                <div style="font-size: 0.68rem; font-weight: 800; color: #0f172a; margin-bottom: 5px;">
                  📋 Resumen de tu Cuenta Corriente y productos a contratar:
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.63rem;">
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: #475569;">• Mantención Cuenta Corriente:</span>
                    <strong style="color: ${ccMaintenance === 0 ? '#047857' : (ccMaintenance === 7000 ? '#0284c7' : '#b45309')};">
                      ${ccMaintenance === 0 ? '$0/mes (100% bonificada)' : `$${ccMaintenance.toLocaleString('es-CL')}/mes`}
                    </strong>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: #475569;">• Línea de Crédito ($500.000):</span>
                    <strong style="color: ${hasL ? '#0f172a' : '#94a3b8'};">
                      ${hasL ? 'Incluida (Desgravamen: $1.900/mes)' : 'No incluida'}
                    </strong>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: #475569;">• Tarjeta de Crédito ($950.000):</span>
                    <strong style="color: ${hasT ? '#0f172a' : '#94a3b8'};">
                      ${hasT ? 'Incluida ($6.900/mes solo si se usa)' : 'No incluida'}
                    </strong>
                  </div>
                  <div style="border-top: 1px dashed #cbd5e1; margin-top: 3px; padding-top: 5px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 800; color: #1e40af;">Costo mensual fijo total:</span>
                    <strong style="font-size: 0.80rem; font-weight: 900; color: #1e40af;">$${totalFixedMonthly.toLocaleString('es-CL')}/mes</strong>
                  </div>
                </div>
              </div>

              <!-- BOTONES FINALES DE CONFIRMACIÓN -->
              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 9px; font-size: 0.72rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">
                  Cancelar
                </button>
                <button type="button" onclick="submitOpenCuentaCorriente()" style="flex: 1.7; padding: 9px; font-size: 0.74rem; font-weight: 800; background: linear-gradient(135deg, #10b981 0%, #047857 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 2px 4px rgba(4, 120, 87, 0.25);">
                  Confirmar contratación
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // ETAPA 3: DETALLE Y CONDICIONES ("LETRA CHICA") DE LÍNEA DE CRÉDITO O TARJETA DE CRÉDITO
    function openCCAddonDetailModal(addonType) {
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const isLinea = addonType === 'linea';

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) openCCPlanOfferModal()">
          <div class="job-modal-card" style="border-color: #0284c7; max-width: 440px;">
            <div class="job-modal-header" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.2rem; width: 36px; height: 36px;">
                ${isLinea ? '⚡' : '💳'}
              </div>
              <div>
                <div class="job-modal-title" style="color: #ffffff; font-size: 0.95rem;">
                  ${isLinea ? 'Confirmar Línea de Crédito ($500.000)' : 'Confirmar Tarjeta de Crédito ($950.000)'}
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.70rem; color: #e0f2fe; margin-top: 2px;">
                  Detalle del producto y costos asociados
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 13px 15px;">
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; padding: 9px 11px; margin-bottom: 10px; font-size: 0.67rem; color: #334155; line-height: 1.4;">
                ${isLinea
                  ? '<strong>¿Qué es?</strong> Es un cupo de sobregiro de <strong>$500.000</strong> asociado a tu Cuenta Corriente que cubre pagos o giros automáticamente cuando tu saldo disponible llega a $0.'
                  : '<strong>¿Qué es?</strong> Es una tarjeta con cupo de <strong>$950.000</strong> para realizar compras nacionales e internacionales al contado o en cuotas.'}
              </div>

              <!-- CONDICIONES Y COSTOS QUE EL VENDEDOR NO MENCIONÓ ANTES -->
              <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 8px; padding: 9px 11px; margin-bottom: 12px; font-size: 0.64rem; color: #78350f; line-height: 1.4;">
                <div style="font-weight: 800; color: #92400e; margin-bottom: 4px;">
                  🔎 Condiciones y costos del producto:
                </div>
                ${isLinea ? `
                  • <strong>Beneficio en el plan:</strong> Rebaja en <strong>$7.000/mes</strong> la mantención de tu Cuenta Corriente.<br/>
                  • <strong>Costo fijo obligatorio:</strong> Requiere contratar un <strong>Seguro de Desgravamen de $1.900/mes</strong> (se cobra todos los meses aunque no uses el cupo).<br/>
                  • <strong>Costo por uso:</strong> Si utilizas el sobregiro, se cobra un interés diario de <strong>0,08%</strong> por los días utilizados.
                ` : `
                  • <strong>Beneficio en el plan:</strong> Rebaja en <strong>$7.000/mes</strong> la mantención de tu Cuenta Corriente.<br/>
                  • <strong>Costo de mantención:</strong> Tiene una comisión de administración de <strong>$6.900/mes</strong> que se cobra <strong>únicamente en los meses en que tengas compras o cuotas vigentes</strong> ($0/mes si no la utilizas).<br/>
                  • <strong>Intereses:</strong> Si pagas en cuotas con interés o solo el pago mínimo, se aplican intereses rotativos sobre el saldo adeudado.
                `}
              </div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="setCCAddonDecision('${addonType}', false)" style="flex: 1; padding: 9px; font-size: 0.72rem; font-weight: 700; background: #fff5f5; color: #b91c1c; border: 1px solid #fca5a5; border-radius: 6px; cursor: pointer;">
                  Rechazar
                </button>
                <button type="button" onclick="setCCAddonDecision('${addonType}', true)" style="flex: 1.4; padding: 9px; font-size: 0.72rem; font-weight: 800; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                  Aceptar ${isLinea ? 'Línea de Crédito' : 'Tarjeta de Crédito'}
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function setCCAddonDecision(addonType, accepted) {
      if (addonType === 'linea') {
        ccDraftPlan.linea = accepted;
        ccDraftPlan.lineaReviewed = true;
      } else if (addonType === 'tarjeta') {
        ccDraftPlan.tarjeta = accepted;
        ccDraftPlan.tarjetaReviewed = true;
      }
      openCCPlanOfferModal();
    }

    function recalcCuentaCorrienteMaintenance() {
      if (!Array.isArray(state.bankAccounts)) return;
      const cc = state.bankAccounts.find(a => a.id === 'acc_corriente');
      if (!cc) return;
      const hasL = !!state.creditLine;
      const hasT = !!state.creditCard;
      if (hasL && hasT) {
        cc.maintenance = 0;
      } else if (hasL || hasT) {
        cc.maintenance = 7000;
      } else {
        cc.maintenance = 14000;
      }
    }

    function submitOpenCuentaCorriente() {
      const alreadyHasFraud = (state.insurances || []).some(i => i.id === 'fraude_corriente' || i.id === 'fraude' || i.type === 'fraude');
      if (!alreadyHasFraud) {
        openCCFraudOfferModal();
        return;
      }
      finalizeOpenCuentaCorriente(false);
    }

    // ETAPA FINAL DE VENTA: OFERTA DE SEGURO DE FRAUDE DESPUÉS DE ACEPTAR LA CUENTA CORRIENTE
    function openCCFraudOfferModal() {
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop">
          <div class="job-modal-card" style="border-color: #f59e0b; max-width: 440px;">
            <div class="job-modal-header" style="background: linear-gradient(135deg, #d97706 0%, #b45309 100%); color: #ffffff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.2rem; width: 36px; height: 36px;">
                🛡️
              </div>
              <div>
                <div class="job-modal-title" style="color: #ffffff; font-size: 0.95rem;">
                  Último paso: ¿Agregar Seguro de Fraude?
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.70rem; color: #fef3c7; margin-top: 2px;">
                  Oferta complementaria antes de activar tu cuenta
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 13px 15px;">
              <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 7px; padding: 9px 11px; margin-bottom: 10px; font-size: 0.66rem; color: #78350f; line-height: 1.4;">
                <strong>💬 Ejecutivo Comercial:</strong> "Antes de finalizar la apertura de tu Cuenta Corriente, te ofrecemos proteger tus tarjetas y cuenta con nuestro <strong>Seguro de Fraude</strong> por solo <strong>$1.150/mes</strong>."
              </div>

              <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 9px 11px; margin-bottom: 12px; font-size: 0.64rem; color: #334155; line-height: 1.4;">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">
                  📋 Descripción, costo y beneficio:
                </div>
                • <strong>Costo mensual:</strong> <strong>$1.150/mes</strong> (cargo fijo mensual).<br/>
                • <strong>Cobertura (beneficio):</strong> Cubre el robo de dinero en efectivo por asalto presencial en cajeros automáticos y compras o giros forzados bajo intimidación.<br/>
                • <strong>Lo que debes saber (Ley de Fraudes 21.234):</strong> En Chile, las clonaciones, extravíos y transferencias electrónicas no autorizadas <strong>ya están cubiertos gratis por ley</strong> por el banco, sin necesidad de contratar este seguro.
              </div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="finalizeOpenCuentaCorriente(false)" style="flex: 1; padding: 9px; font-size: 0.72rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">
                  Rechazar seguro
                </button>
                <button type="button" onclick="finalizeOpenCuentaCorriente(true)" style="flex: 1.3; padding: 9px; font-size: 0.72rem; font-weight: 800; background: linear-gradient(135deg, #d97706 0%, #b45309 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                  Aceptar Seguro ($1.150/mes)
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function finalizeOpenCuentaCorriente(fraudeAccepted) {
      const lineaChecked = !!ccDraftPlan.linea;
      const tarjetaChecked = !!ccDraftPlan.tarjeta;

      if (!Array.isArray(state.bankAccounts)) state.bankAccounts = [];
      if (!Array.isArray(state.insurances)) state.insurances = [];

      const initialMaintenance = (lineaChecked && tarjetaChecked) ? 0 : ((lineaChecked || tarjetaChecked) ? 7000 : 14000);

      state.bankAccounts.push({
        id: 'acc_corriente',
        name: 'Cuenta Corriente',
        type: 'corriente',
        icon: '🏦',
        isLiquid: true,
        balance: 0,
        maintenance: initialMaintenance,
        openedAt: new Date().toISOString()
      });

      if (lineaChecked) {
        state.creditLine = {
          id: 'linea_credito',
          name: 'Línea de Crédito',
          limit: 500000,
          used: 0,
          associatedTo: 'acc_corriente'
        };
        if (!state.insurances.some(i => i.id === 'desgravamen_linea' || i.id === 'desgravamen')) {
          state.insurances.push({
            id: 'desgravamen_linea',
            type: 'desgravamen',
            name: 'Seguro de Desgravamen (Línea de Crédito)',
            costMonthly: 1900,
            costDisplay: '$1.900/mes',
            contractedAt: new Date().toISOString()
          });
        }
      }

      if (tarjetaChecked) {
        if (state.creditCard) {
          state.creditCard.isIndependent = false;
          state.creditCard.associatedTo = 'acc_corriente';
          state.creditCard.maintenance = 6900;
        } else {
          state.creditCard = {
            id: 'tarjeta_credito',
            name: 'Tarjeta de Crédito',
            isIndependent: false,
            limit: 950000,
            used: 0,
            maintenance: 6900,
            associatedTo: 'acc_corriente'
          };
        }
      }

      if (fraudeAccepted) {
        if (!state.insurances.some(i => i.id === 'fraude_corriente' || i.id === 'fraude' || i.type === 'fraude')) {
          const todayStr = new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });
          state.insurances.push({
            id: 'fraude_corriente',
            type: 'fraude',
            name: 'Seguro de Fraude',
            icon: '🛡️',
            associatedTo: 'Cuenta Corriente y Tarjetas',
            costMonthly: 1150,
            costDisplay: '$1.150/mes',
            contractedDate: todayStr,
            contractedAt: new Date().toISOString()
          });
        }
      }

      closeBancoModal();
      renderBancoStage('cuenta_corriente');
      if (typeof updateHUD === 'function') updateHUD();

      const extras = [];
      if (lineaChecked) extras.push('Línea $500.000');
      if (tarjetaChecked) extras.push('Tarjeta $950.000');
      if (fraudeAccepted) extras.push('Seguro de Fraude ($1.150/mes)');

      const extraText = extras.length > 0 ? ` junto con ${extras.join(', ')}` : ' (sin productos adicionales)';
      alertUpcomingBankFeature('¡Cuenta Corriente contratada!', `Tu Cuenta Corriente ha sido activada${extraText}. Mantención mensual de la cuenta: $${initialMaintenance.toLocaleString('es-CL')}/mes.`);
    }

    // ==========================================================================
    // LÍNEAS DE CRÉDITO: REQUISITO DE CUENTA CORRIENTE Y GESTIÓN
    // ==========================================================================
    function renderLineaCreditoView() {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      const hasCuentaCorriente = (state.bankAccounts || []).some(a => (a.id || '').includes('corriente') || (a.type || '').includes('corriente'));
      const line = state.creditLine;

      container.innerHTML = `
        <div class="personal-subview-box">
          <div class="personal-subview-top">
            <span style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">⚡ Líneas de Crédito</span>
            <button type="button" class="personal-subview-back-btn" onclick="renderBancoStage('main')">
              <span>◀ Volver</span>
            </button>
          </div>

          <!-- DESCRIPCIÓN Y NORMATIVA -->
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 9px; padding: 9px 12px; margin-bottom: 8px; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03);">
            <div style="font-size: 0.64rem; color: #0284c7; font-style: italic; margin-bottom: 2px;">
              "Un salvavidas de liquidez inmediata para salir de cualquier apuro."
            </div>
            <div style="font-size: 0.66rem; color: #475569; line-height: 1.35;">
              La Línea de Sobregiro es un crédito de auxilio que se activa automáticamente cuando el saldo de tu cuenta llega a $0. En Chile, <strong>requiere obligatoriamente tener Cuenta Corriente</strong> y contar con <strong>Seguro de Desgravamen</strong> para respaldar el cupo disponible.
            </div>
          </div>

          ${!hasCuentaCorriente ? `
            <!-- CASO: NO TIENE CUENTA CORRIENTE -->
            <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 9px; padding: 12px; margin-bottom: 8px; text-align: center;">
              <div style="font-size: 1.4rem; margin-bottom: 4px;">⚠️</div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #92400e; margin-bottom: 3px;">
                Requiere Cuenta Corriente
              </div>
              <div style="font-size: 0.64rem; color: #78350f; line-height: 1.35; margin-bottom: 10px;">
                La Línea de Crédito no se puede contratar de forma aislada. Debes abrir primero una Cuenta Corriente en el banco para acceder al cupo de sobregiro de $500.000. Además, al activarla obtendrás como beneficio una reducción de $7.000/mes en la mantención de tu Cuenta Corriente.
              </div>
              <button type="button" onclick="renderBancoStage('cuenta_corriente')" style="padding: 8px 14px; font-size: 0.72rem; font-weight: 800; background: #0284c7; color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                🏦 Ir a abrir Cuenta Corriente
              </button>
            </div>
          ` : (line ? `
            <!-- CASO: TIENE LÍNEA ACTIVA -->
            <div style="background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%); border: 1.5px solid #93c5fd; border-radius: 9px; padding: 11px 12px; margin-bottom: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-size: 0.58rem; font-weight: 700; background: #dbeafe; color: #1e40af; padding: 1px 6px; border-radius: 4px;">🟢 Línea Activa</span>
                <span style="font-size: 0.58rem; color: #0284c7; font-weight: 600;">Asociada a Cuenta Corriente</span>
              </div>
              <div style="font-size: 1.30rem; font-weight: 800; color: #1e40af; font-family: var(--font-title);">
                $${((line.limit || 500000) - (line.used || 0)).toLocaleString('es-CL')}
              </div>
              <div style="font-size: 0.58rem; color: #475569;">Cupo disponible de sobregiro (Total: $${(line.limit || 500000).toLocaleString('es-CL')})</div>
            </div>

            <!-- DETALLES DE COSTO Y SEGURO -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; margin-bottom: 8px; font-size: 0.65rem;">
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">• Monto ocupado / deuda:</span>
                  <strong style="color: #047857;">$${(line.used || 0).toLocaleString('es-CL')}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">• Tasa de interés diaria por uso:</span>
                  <strong style="color: #0284c7;">0,08% al día (solo si se usa)</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">• Seguro de Desgravamen:</span>
                  <strong style="color: #047857;">Activo ($1.900/mes)</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">• Beneficio Cuenta Corriente:</span>
                  <strong style="color: #047857;">Rebaja de $7.000/mes en mantención</strong>
                </div>
              </div>
            </div>

            <button type="button" onclick="promptCancelCreditLine()" style="width: 100%; padding: 8px; font-size: 0.72rem; font-weight: 700; background: #fff5f5; color: #b91c1c; border: 1px solid #fecaca; border-radius: 6px; cursor: pointer;">
              Renunciar / Cancelar Línea de Crédito
            </button>
          ` : `
            <!-- CASO: TIENE CUENTA CORRIENTE PERO NO ACTIVÓ LA LÍNEA -->
            <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 9px; padding: 12px; margin-bottom: 8px;">
              <div style="font-size: 0.76rem; font-weight: 800; color: #0f172a; margin-bottom: 3px;">
                Cupo preaprobado: $500.000
              </div>
              <div style="font-size: 0.64rem; color: #64748b; line-height: 1.35; margin-bottom: 10px;">
                Tienes Cuenta Corriente activa. Puedes habilitar tu Línea de Crédito de $500.000 con Seguro de Desgravamen asociado ($1.900/mes). <strong style="color: #047857;">Como beneficio, obtendrás una reducción de $7.000/mes en la mantención de tu Cuenta Corriente.</strong>
              </div>
              <button type="button" onclick="activateCreditLineAction()" style="width: 100%; padding: 9px; font-size: 0.76rem; font-weight: 800; background: #0284c7; color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                Activar Línea de Crédito ($500.000)
              </button>
            </div>
          `)}
        </div>
      `;
    }

    function activateCreditLineAction() {
      state.creditLine = {
        id: 'linea_credito',
        name: 'Línea de Crédito',
        limit: 500000,
        used: 0,
        associatedTo: 'acc_corriente'
      };
      if (!Array.isArray(state.insurances)) state.insurances = [];
      if (!state.insurances.some(i => i.id === 'desgravamen_linea' || i.id === 'desgravamen')) {
        state.insurances.push({
          id: 'desgravamen_linea',
          type: 'desgravamen',
          name: 'Seguro de Desgravamen (Línea de Crédito)',
          costMonthly: 1900,
          costDisplay: '$1.900/mes',
          contractedAt: new Date().toISOString()
        });
      }
      recalcCuentaCorrienteMaintenance();
      renderBancoStage('linea');
      if (typeof updateHUD === 'function') updateHUD();
      alertUpcomingBankFeature('¡Línea de Crédito activada!', 'Tu Línea de Sobregiro de $500.000 con Seguro de Desgravamen ($1.900/mes) está lista. Como beneficio, se aplicó una reducción de $7.000/mes en la mantención de tu Cuenta Corriente.');
    }

    function promptCancelCreditLine() {
      if (!state.creditLine) return;
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const debt = Number(state.creditLine.used) || 0;
      const ccAcc = (state.bankAccounts || []).find(a => a.id === 'acc_corriente' || a.type === 'corriente');
      const availableFunds = (ccAcc ? (Number(ccAcc.balance) || 0) : 0) + (Number(state.cash) || 0);
      const canPay = availableFunds >= debt;

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #fca5a5;">
            <div class="job-modal-header" style="background: #fff5f5; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: #fee2e2; color: #dc2626; border: 1.5px solid #fca5a5; font-size: 1.1rem; width: 34px; height: 34px;">
                ⚠️
              </div>
              <div>
                <div class="job-modal-title" style="color: #991b1b; font-size: 0.95rem;">
                  ¿Cancelar Línea de Crédito?
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.72rem; margin-top: 2px;">
                  Cupo de $500.000 · Deuda actual: $${debt.toLocaleString('es-CL')}
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 14px 16px;">
              <div style="background: #fffafa; border: 1px solid #fecaca; border-radius: 7px; padding: 10px 12px; margin-bottom: 12px; font-size: 0.72rem; color: #7f1d1d; line-height: 1.4;">
                ${debt > 0 ? (canPay
                  ? `Para cancelar la Línea de Crédito es obligatorio liquidar la deuda ocupada de <strong>$${debt.toLocaleString('es-CL')}</strong>. Al confirmar se descontará de tus fondos disponibles.`
                  : `⛔ No puedes cancelar la Línea de Crédito mientras mantengas una deuda de <strong>$${debt.toLocaleString('es-CL')}</strong> sin fondos suficientes para liquidarla.`)
                  : `Se dará de baja el cupo de sobregiro de $500.000 y se cancelará el seguro de desgravamen asociado. Tu Cuenta Corriente continuará activa (su mantención mensual se ajustará según tus productos activos).`}
              </div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 8px; font-size: 0.74rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">Volver</button>
                ${debt > 0 && !canPay ? `
                  <button type="button" disabled style="flex: 1.5; padding: 8px; font-size: 0.72rem; font-weight: 800; background: #e2e8f0; color: #94a3b8; border: none; border-radius: 6px; cursor: not-allowed;">Fondos insuficientes</button>
                ` : `
                  <button type="button" onclick="executeCancelCreditLine()" style="flex: 1.5; padding: 8px; font-size: 0.74rem; font-weight: 800; background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">${debt > 0 ? `Liquidar $${debt.toLocaleString('es-CL')} y cancelar` : 'Confirmar Cancelación'}</button>
                `}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function executeCancelCreditLine() {
      if (!state.creditLine) return;
      const debt = Number(state.creditLine.used) || 0;
      if (debt > 0) {
        const ccAcc = (state.bankAccounts || []).find(a => a.id === 'acc_corriente' || a.type === 'corriente');
        const ccBal = ccAcc ? (Number(ccAcc.balance) || 0) : 0;
        if (ccBal + (Number(state.cash) || 0) < debt) {
          closeBancoModal();
          return;
        }
        if (ccAcc && ccBal >= debt) {
          ccAcc.balance -= debt;
        } else {
          const rem = debt - ccBal;
          if (ccAcc) ccAcc.balance = 0;
          state.cash = Math.max(0, (Number(state.cash) || 0) - rem);
        }
      }
      state.creditLine = null;
      state.insurances = (state.insurances || []).filter(i => i.id !== 'desgravamen_linea' && i.id !== 'desgravamen');
      recalcCuentaCorrienteMaintenance();
      closeBancoModal();
      renderBancoStage('linea');
      if (typeof updateHUD === 'function') updateHUD();
      alertUpcomingBankFeature('Línea de Crédito cancelada', 'Se ha dado de baja tu cupo de sobregiro y seguro de desgravamen.');
    }

    // ==========================================================================
    // TARJETA DE CRÉDITO: INDEPENDIENTE O ASOCIADA A CUENTA CORRIENTE
    // ==========================================================================
    function renderTarjetaCreditoView() {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      const card = state.creditCard;
      const hasCuentaCorriente = (state.bankAccounts || []).some(a => (a.id || '').includes('corriente') || (a.type || '').includes('corriente'));

      container.innerHTML = `
        <div class="personal-subview-box">
          <div class="personal-subview-top">
            <span style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">💳 Tarjeta de Crédito</span>
            <button type="button" class="personal-subview-back-btn" onclick="renderBancoStage('main')">
              <span>◀ Volver</span>
            </button>
          </div>

          <!-- DESCRIPCIÓN Y LEY VENTAS ATADAS -->
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 9px; padding: 9px 12px; margin-bottom: 8px; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03);">
            <div style="font-size: 0.64rem; color: #0284c7; font-style: italic; margin-bottom: 2px;">
              "Compra hoy lo que necesitas y fináncialo en cómodas cuotas."
            </div>
            <div style="font-size: 0.66rem; color: #475569; line-height: 1.35;">
              Medio de pago con cupo rotativo para compras nacionales e internacionales. Si tienes Cuenta Corriente se integra como producto de tu plan rebajando tu mantención; si no tienes Cuenta Corriente, puedes contratarla de forma individual (y si más adelante abres la Cuenta Corriente, se sumará automáticamente a tu plan).
            </div>
          </div>

          ${card ? `
            <!-- TARJETA ACTIVA -->
            <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1.5px solid #334155; border-radius: 10px; padding: 12px 14px; margin-bottom: 8px; color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 0.60rem; font-weight: 800; letter-spacing: 0.5px; color: #38bdf8;">PLATINUM CREDIT</span>
                <span style="font-size: 0.56rem; background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); padding: 1px 6px; border-radius: 4px;">
                  ${hasCuentaCorriente ? 'Asociada a Cuenta Corriente' : 'Individual'}
                </span>
              </div>
              <div style="font-size: 1.30rem; font-weight: 800; font-family: var(--font-title); color: #f8fafc; margin-bottom: 2px;">
                $${((card.limit || 950000) - (card.used || 0)).toLocaleString('es-CL')}
              </div>
              <div style="font-size: 0.58rem; color: #94a3b8; display: flex; justify-content: space-between;">
                <span>Cupo disponible nacional/internacional</span>
                <span>Cupo total: $${(card.limit || 950000).toLocaleString('es-CL')}</span>
              </div>
            </div>

            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; margin-bottom: 8px; font-size: 0.65rem;">
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">• Estado en el banco:</span>
                  <strong style="color: #0f172a;">${hasCuentaCorriente ? 'Sumada a tu Plan Cuenta Corriente (-$7.000/mes mantención)' : 'Contratada individualmente (sin Cuenta Corriente)'}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">• Deuda actual / cuotas vigentes:</span>
                  <strong style="color: #047857;">$${(card.used || 0).toLocaleString('es-CL')}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">• Comisión de administración:</span>
                  <strong style="color: #0284c7;">$6.900/mes ($0 en meses sin compras)</strong>
                </div>
              </div>
            </div>

            <button type="button" onclick="promptCancelCreditCard()" style="width: 100%; padding: 8px; font-size: 0.72rem; font-weight: 700; background: #fff5f5; color: #b91c1c; border: 1px solid #fecaca; border-radius: 6px; cursor: pointer;">
              Dar de baja Tarjeta de Crédito
            </button>
          ` : `
            <!-- OPCIÓN ÚNICA DE CONTRATACIÓN -->
            <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 9px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="font-size: 0.76rem; color: #0f172a;">💳 Tarjeta de Crédito Bancaria</strong>
                <span style="font-size: 0.62rem; font-weight: 800; color: #0284c7;">Cupo preaprobado: $950.000</span>
              </div>
              <div style="font-size: 0.64rem; color: #64748b; line-height: 1.35; margin-bottom: 8px;">
                ${hasCuentaCorriente
                  ? 'Tienes Cuenta Corriente activa. Al contratar tu Tarjeta de Crédito se añadirá automáticamente a tu plan y <strong style="color: #047857;">obtendrás como beneficio una reducción de $7.000/mes en la mantención de tu Cuenta Corriente</strong>.'
                  : 'Actualmente no tienes Cuenta Corriente. Puedes contratar tu Tarjeta de Crédito de forma individual hoy y, si más adelante contratas la Cuenta Corriente, se sumará automáticamente como producto de tu plan para rebajar tu mantención.'}
              </div>
              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 9px; margin-bottom: 10px; font-size: 0.62rem; color: #475569;">
                • <strong>Comisión de administración:</strong> <strong>$6.900/mes</strong> (se cobra únicamente en meses con compras o saldo utilizado; $0 si no se usa).
              </div>
              <button type="button" onclick="activateCreditCardAction()" style="width: 100%; padding: 9px; font-size: 0.76rem; font-weight: 800; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                Contratar Tarjeta de Crédito ($950.000)
              </button>
            </div>
          `}
        </div>
      `;
    }

    function activateCreditCardAction() {
      const hasCuentaCorriente = (state.bankAccounts || []).some(a => (a.id || '').includes('corriente') || (a.type || '').includes('corriente'));
      state.creditCard = {
        id: 'tarjeta_credito',
        name: 'Tarjeta de Crédito',
        isIndependent: !hasCuentaCorriente,
        limit: 950000,
        used: 0,
        maintenance: 6900,
        associatedTo: hasCuentaCorriente ? 'acc_corriente' : null
      };
      recalcCuentaCorrienteMaintenance();
      renderBancoStage('tarjeta');
      if (typeof updateHUD === 'function') updateHUD();
      const extraMsg = hasCuentaCorriente
        ? 'Se ha añadido a tu Plan de Cuenta Corriente aplicando una reducción de $7.000/mes en la mantención de tu cuenta.'
        : 'Ha sido contratada de forma individual. Si más adelante abres una Cuenta Corriente, se sumará automáticamente a tu plan.';
      alertUpcomingBankFeature('¡Tarjeta de Crédito activada!', `Tu Tarjeta de Crédito con cupo de $950.000 está lista. ${extraMsg}`);
    }

    function promptCancelCreditCard() {
      if (!state.creditCard) return;
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const debt = Number(state.creditCard.used) || 0;
      const ccAcc = (state.bankAccounts || []).find(a => a.id === 'acc_corriente' || a.type === 'corriente');
      const availableFunds = (ccAcc ? (Number(ccAcc.balance) || 0) : 0) + (Number(state.cash) || 0);
      const canPay = availableFunds >= debt;

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #fca5a5;">
            <div class="job-modal-header" style="background: #fff5f5; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: #fee2e2; color: #dc2626; border: 1.5px solid #fca5a5; font-size: 1.1rem; width: 34px; height: 34px;">
                ⚠️
              </div>
              <div>
                <div class="job-modal-title" style="color: #991b1b; font-size: 0.95rem;">
                  ¿Dar de baja Tarjeta de Crédito?
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.72rem; margin-top: 2px;">
                  Cupo de $950.000 · Deuda actual: $${debt.toLocaleString('es-CL')}
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 14px 16px;">
              <div style="background: #fffafa; border: 1px solid #fecaca; border-radius: 7px; padding: 10px 12px; margin-bottom: 12px; font-size: 0.72rem; color: #7f1d1d; line-height: 1.4;">
                ${debt > 0 ? (canPay
                  ? `Para dar de baja la Tarjeta de Crédito es obligatorio liquidar la deuda vigente de <strong>$${debt.toLocaleString('es-CL')}</strong>. Al confirmar se descontará de tus fondos disponibles.`
                  : `⛔ No puedes dar de baja la Tarjeta de Crédito mientras mantengas una deuda de <strong>$${debt.toLocaleString('es-CL')}</strong> sin fondos suficientes para liquidarla.`)
                  : `Se procederá con la anulación de tu Tarjeta de Crédito y la eliminación de cobros de administración.`}
              </div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 8px; font-size: 0.74rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">Volver</button>
                ${debt > 0 && !canPay ? `
                  <button type="button" disabled style="flex: 1.5; padding: 8px; font-size: 0.72rem; font-weight: 800; background: #e2e8f0; color: #94a3b8; border: none; border-radius: 6px; cursor: not-allowed;">Fondos insuficientes</button>
                ` : `
                  <button type="button" onclick="executeCancelCreditCard()" style="flex: 1.5; padding: 8px; font-size: 0.74rem; font-weight: 800; background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">${debt > 0 ? `Liquidar $${debt.toLocaleString('es-CL')} y dar de baja` : 'Confirmar Baja'}</button>
                `}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function executeCancelCreditCard() {
      if (!state.creditCard) return;
      const debt = Number(state.creditCard.used) || 0;
      if (debt > 0) {
        const ccAcc = (state.bankAccounts || []).find(a => a.id === 'acc_corriente' || a.type === 'corriente');
        const ccBal = ccAcc ? (Number(ccAcc.balance) || 0) : 0;
        if (ccBal + (Number(state.cash) || 0) < debt) {
          closeBancoModal();
          return;
        }
        if (ccAcc && ccBal >= debt) {
          ccAcc.balance -= debt;
        } else {
          const rem = debt - ccBal;
          if (ccAcc) ccAcc.balance = 0;
          state.cash = Math.max(0, (Number(state.cash) || 0) - rem);
        }
      }
      state.creditCard = null;
      recalcCuentaCorrienteMaintenance();
      closeBancoModal();
      renderBancoStage('tarjeta');
      if (typeof updateHUD === 'function') updateHUD();
      alertUpcomingBankFeature('Tarjeta de Crédito cancelada', 'Se ha dado de baja tu tarjeta y su cupo.');
    }

    // ==========================================================================
    // DEPÓSITOS A PLAZO (DAP): MÚLTIPLES DEPÓSITOS FIJOS O RENOVABLES
    // ==========================================================================
    const dapCatalog = [
      {
        id: 'dap_30',
        name: 'Depósito a Plazo 30 días (Pesos)',
        shortName: 'DAP 30 días ($)',
        days: 30,
        currency: 'CLP',
        ratePeriod: 0.0042, // 0,42% por período de 30 días (~5,04% anual)
        rateDisplay: '0,42% a 30 días (~5,0% anual)',
        minAmount: 50000,
        desc: 'Horizonte corto de 1 mes con tasa conocida desde el primer día. Ideal para estacionar excedentes de caja sin riesgo.'
      },
      {
        id: 'dap_90',
        name: 'Depósito a Plazo 90 días (Pesos)',
        shortName: 'DAP 90 días ($)',
        days: 90,
        currency: 'CLP',
        ratePeriod: 0.0130, // 1,30% por período de 90 días (~5,20% anual)
        rateDisplay: '1,30% a 90 días (~5,2% anual)',
        minAmount: 50000,
        desc: 'Plazo trimestral con mejor premio por tasa que el de 30 días. El dinero permanece inmovilizado durante los 90 días.'
      },
      {
        id: 'dap_360_uf',
        name: 'Depósito a Plazo 360 días en UF',
        shortName: 'DAP 360 días (UF)',
        days: 360,
        currency: 'UF',
        ratePeriod: 0.0620, // UF (~4,0%) + 2,2% real anual = ~6,2% anual
        rateDisplay: 'UF + 2,2% anual (~6,2% estimado)',
        minAmount: 50000,
        desc: 'Protege tu capital contra la inflación más un interés real garantizado a 1 año plazo (plazo mínimo legal en UF: 90 días).'
      }
    ];

    function syncInvestedTotal() {
      const dapSum = (state.termDeposits || []).reduce((acc, d) => acc + (Number(d.principal) || 0), 0);
      const ffmmSum = (state.mutualFunds || []).reduce((acc, f) => acc + (Number(f.currentBalance) || 0), 0);
      const otherSum = (state.otherInvestments || []).reduce((acc, inv) => acc + (Number(inv.currentBalance) || 0), 0);
      const retirementAccountsSum = (Number(state.apvAccount?.balance) || 0) + (Number(state.cuenta2Account?.balance) || 0);
      const fxSum = typeof getForeignCurrenciesTotalCLP === 'function' ? getForeignCurrenciesTotalCLP() : 0;
      state.invested = dapSum + ffmmSum + otherSum + retirementAccountsSum + fxSum;
    }

    // ==========================================================================
    // FONDOS MUTUOS (FFMM): LEY ÚNICA DE FONDOS N° 20.712 Y NORMATIVA CMF
    // ==========================================================================

    const fondosMutuosCatalog = [
      {
        id: 'ffmm_conservador',
        name: 'Fondo Mutuo Conservador (Money Market)',
        shortName: 'FFMM Conservador',
        icon: '🛡️',
        riskLevel: 1,
        riskLabel: 'Conservador',
        riskColor: '#059669',
        riskBg: '#ecfdf5',
        expectedMonthlyRate: 0.0040, // ~0,40% mensual (~4,9% anual neto de TAC)
        monthlyVolatility: 0.0015,   // ±0,15% mensual
        rateDisplay: '~0,40% mensual esp. (~4,9% anual)',
        volatilityDisplay: '±0,15%/mes (Muy baja)',
        tacDisplay: '0,90% anual',
        rescueDays: 1,
        minAmount: 5000,
        initialSharePrice: 1250,
        desc: 'Invierte en depósitos a plazo y pagarés del Banco Central (< 90 días). Alta liquidez con rescate en 1 día hábil y fluctuación mínima.'
      },
      {
        id: 'ffmm_moderado',
        name: 'Fondo Mutuo Moderado (Balanceado UF + Acciones)',
        shortName: 'FFMM Moderado',
        icon: '⚖️',
        riskLevel: 2,
        riskLabel: 'Moderado',
        riskColor: '#d97706',
        riskBg: '#fef3c7',
        expectedMonthlyRate: 0.0065, // ~0,65% mensual (~8,1% anual neto de TAC)
        monthlyVolatility: 0.0120,   // ±1,20% mensual
        rateDisplay: '~0,65% mensual esp. (~8,1% anual)',
        volatilityDisplay: '±1,20%/mes (Media)',
        tacDisplay: '1,80% anual',
        rescueDays: 3,
        minAmount: 10000,
        initialSharePrice: 2400,
        desc: 'Combina 70% bonos en UF y 30% acciones. Busca superar la inflación a mediano plazo asumiendo variaciones mensuales moderadas (rescate en 3 días hábiles).'
      },
      {
        id: 'ffmm_arriesgado',
        name: 'Fondo Mutuo Arriesgado (Accionario Global)',
        shortName: 'FFMM Arriesgado',
        icon: '🚀',
        riskLevel: 3,
        riskLabel: 'Arriesgado',
        riskColor: '#8b5cf6',
        riskBg: '#ede9fe',
        expectedMonthlyRate: 0.0095, // ~0,95% mensual (~12,0% anual neto de TAC)
        monthlyVolatility: 0.0350,   // ±3,50% mensual
        rateDisplay: '~0,95% mensual esp. (~12,0% anual)',
        volatilityDisplay: '±3,50%/mes (Alta)',
        tacDisplay: '2,80% anual',
        rescueDays: 5,
        minAmount: 20000,
        initialSharePrice: 4100,
        desc: 'Invierte más del 90% en acciones internacionales y mercados emergentes. Mayor potencial de crecimiento a largo plazo con alta volatilidad de corto plazo (rescate en 5 días hábiles).'
      }
    ];

    function getUserRiskLevelNumber() {
      if (!state.riskTestResult || !state.riskTestResult.label) return 0;
      const lbl = state.riskTestResult.label.toLowerCase();
      if (lbl.includes('conservador')) return 1;
      if (lbl.includes('moderado')) return 2;
      if (lbl.includes('arriesgado')) return 3;
      return 1;
    }

    function goToRiskTestFromBanco() {
      if (typeof selectHudTab === 'function') {
        selectHudTab('estado');
      }
      if (typeof startRiskTest === 'function') {
        startRiskTest();
      } else if (typeof renderPersonalStage === 'function') {
        renderPersonalStage('inversionista');
      }
    }

    function renderFondosMutuosView() {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      if (!Array.isArray(state.mutualFunds)) state.mutualFunds = [];
      syncInvestedTotal();

      const activeFunds = state.mutualFunds;
      const totalContributed = activeFunds.reduce((sum, f) => sum + (Number(f.contributedCapital) || 0), 0);
      const totalCurrentBalance = activeFunds.reduce((sum, f) => sum + (Number(f.currentBalance) || 0), 0);
      const netGainLoss = totalCurrentBalance - totalContributed;
      const userRiskLevel = getUserRiskLevelNumber();

      container.innerHTML = `
        <div class="personal-subview-box">
          <div class="personal-subview-top">
            <span style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">📊 Fondos Mutuos (AGF)</span>
            <button type="button" class="personal-subview-back-btn" onclick="renderBancoStage('main')">
              <span>◀ Volver</span>
            </button>
          </div>

          <!-- RESUMEN DE CARTERA FFMM -->
          <div style="background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%); border: 1.5px solid #93c5fd; border-radius: 9px; padding: 10px 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 0.58rem; font-weight: 700; color: #1e40af; text-transform: uppercase;">Saldo Valorizado (${activeFunds.length} ${activeFunds.length === 1 ? 'fondo activo' : 'fondos activos'})</div>
              <div style="font-size: 1.20rem; font-weight: 800; color: #0284c7; font-family: var(--font-title);">
                $${totalCurrentBalance.toLocaleString('es-CL')}
              </div>
              <div style="font-size: 0.56rem; color: #64748b;">Capital aportado: $${totalContributed.toLocaleString('es-CL')}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.58rem; color: #64748b;">Rentabilidad acumulada</div>
              <div style="font-size: 0.92rem; font-weight: 800; color: ${netGainLoss >= 0 ? '#047857' : '#b91c1c'};">
                ${netGainLoss >= 0 ? `+$${netGainLoss.toLocaleString('es-CL')}` : `-$${Math.abs(netGainLoss).toLocaleString('es-CL')}`}
              </div>
            </div>
          </div>

          <!-- CATÁLOGO DE LOS 3 FONDOS MUTUOS -->
          <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px;">
            ${fondosMutuosCatalog.map(fund => {
              return `
                <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 8px 10px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <div>
                      <div style="font-size: 0.72rem; font-weight: 800; color: #0f172a;">${fund.icon} ${fund.name}</div>
                      <div style="font-size: 0.60rem; font-weight: 700; color: #047857; margin-top: 2px;">
                        Retorno esp.: ${fund.rateDisplay} · Volatilidad: ${fund.volatilityDisplay} · TAC: ${fund.tacDisplay}
                      </div>
                    </div>
                    <button type="button" onclick="openInvestFFMMModal('${fund.id}')" style="padding: 5px 11px; font-size: 0.64rem; font-weight: 800; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer; white-space: nowrap; flex-shrink: 0;">
                      Invertir
                    </button>
                  </div>
                  <div style="font-size: 0.60rem; color: #64748b; line-height: 1.3;">
                    ${fund.desc} (Mínimo $${fund.minAmount.toLocaleString('es-CL')}).
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- LISTADO DE FONDOS MUTUOS VIGENTES DEL PERSONAJE -->
          <div style="font-size: 0.72rem; font-weight: 800; color: #0f172a; margin-bottom: 5px;">
            📋 Mis Fondos Mutuos vigentes (${activeFunds.length}):
          </div>
          ${activeFunds.length === 0 ? `
            <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 10px; text-align: center; font-size: 0.64rem; color: #64748b;">
              No tienes inversiones activas en Fondos Mutuos.
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${activeFunds.map((pos, idx) => {
                const diff = pos.currentBalance - pos.contributedCapital;
                const pct = pos.contributedCapital > 0 ? ((diff / pos.contributedCapital) * 100).toFixed(2) : '0.00';
                const isPositive = diff >= 0;
                return `
                  <div style="background: #ffffff; border: 1.5px solid ${isPositive ? '#86efac' : '#fca5a5'}; border-radius: 8px; padding: 9px 11px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px; margin-bottom: 4px;">
                      <div>
                        <div style="display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">
                          <strong style="font-size: 0.72rem; color: #0f172a;">#${idx + 1} · ${pos.icon} ${pos.name}</strong>
                        </div>
                        <div style="font-size: 0.60rem; color: #334155; margin-top: 2px;">
                          Aportado: <strong>$${pos.contributedCapital.toLocaleString('es-CL')}</strong> · Saldo actual: <strong style="color: #0284c7;">$${pos.currentBalance.toLocaleString('es-CL')}</strong>
                          (<strong style="color: ${isPositive ? '#047857' : '#b91c1c'};">${isPositive ? '+' : '-'}$${Math.abs(diff).toLocaleString('es-CL')} / ${isPositive ? '+' : ''}${pct}%</strong>)
                        </div>
                        <div style="font-size: 0.58rem; color: #64748b; margin-top: 1px;">
                          Cuotas: <strong>${pos.shares.toFixed(4)}</strong> · Valor cuota: $${pos.currentSharePrice.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} · Meses transcurridos: ${pos.monthsSimulated || 0} · Pago rescate: <strong>${pos.rescueDays} ${pos.rescueDays === 1 ? 'día hábil' : 'días hábiles'}</strong>
                        </div>
                      </div>
                    </div>

                    <div style="display: flex; justify-content: flex-end; align-items: center; gap: 6px; margin-top: 6px; padding-top: 6px; border-top: 1px dashed #cbd5e1;">
                      <button type="button" onclick="simulateMonthFFMM('${pos.id}')" style="padding: 4px 9px; font-size: 0.58rem; font-weight: 800; background: #0284c7; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" title="Simular la variación del valor cuota durante 1 mes de mercado">
                        📈 Simular 1 Mes
                      </button>
                      <button type="button" onclick="openRedeemFFMMModal('${pos.id}')" style="padding: 4px 9px; font-size: 0.58rem; font-weight: 800; background: #047857; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" title="Rescatar total o parcialmente tus cuotas sin castigo">
                        💸 Rescatar (Total o Parcial)
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      `;
    }

    function openInvestFFMMModal(fundId) {
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const fund = fondosMutuosCatalog.find(f => f.id === fundId);
      if (!fund) return;

      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      const cash = Number(state.cash) || 0;

      const fundingOptions = [
        { id: 'cash', label: `💵 Dinero en Efectivo (Disponible: $${cash.toLocaleString('es-CL')})`, balance: cash, name: 'Dinero en Efectivo' },
        ...bankAccounts.map(a => ({
          id: a.id,
          label: `${a.icon || '🏦'} ${a.name} (Disponible: $${(a.balance || 0).toLocaleString('es-CL')})`,
          balance: Number(a.balance) || 0,
          name: a.name
        }))
      ];

      const defaultSource = fundingOptions.find(o => o.balance >= fund.minAmount) || fundingOptions[0];
      const defaultAmount = Math.max(fund.minAmount, Math.min(100000, defaultSource ? defaultSource.balance : fund.minAmount));
      const estimatedShares = (defaultAmount / fund.initialSharePrice).toFixed(4);

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #0284c7; max-width: 435px;">
            <div class="job-modal-header" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.2rem; width: 36px; height: 36px;">
                ${fund.icon}
              </div>
              <div>
                <div class="job-modal-title" style="color: #ffffff; font-size: 0.94rem;">
                  Aportar a ${fund.shortName}
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.66rem; color: #e0f2fe; margin-top: 2px;">
                  TAC ${fund.tacDisplay} · Rescate en ${fund.rescueDays} ${fund.rescueDays === 1 ? 'día hábil' : 'días hábiles'}
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 13px 15px;">
              <!-- 1. ORIGEN DE LOS FONDOS -->
              <div style="margin-bottom: 8px;">
                <label style="display: block; font-size: 0.64rem; font-weight: 700; color: #334155; margin-bottom: 3px;">
                  1. Origen del dinero para comprar cuotas:
                </label>
                <select id="ffmm-source-select" onchange="updateFFMMInvestPreview('${fund.id}')" style="width: 100%; padding: 7px 8px; border: 1.5px solid #cbd5e1; border-radius: 6px; font-size: 0.68rem; font-weight: 700; color: #0f172a; background: #ffffff;">
                  ${fundingOptions.map(opt => `
                    <option value="${opt.id}" ${defaultSource && defaultSource.id === opt.id ? 'selected' : ''}>${opt.label}</option>
                  `).join('')}
                </select>
              </div>

              <!-- 2. MONTO A INVERTIR -->
              <div style="margin-bottom: 8px;">
                <label style="display: block; font-size: 0.64rem; font-weight: 700; color: #334155; margin-bottom: 3px;">
                  2. Monto a aportar (Mínimo $${fund.minAmount.toLocaleString('es-CL')}):
                </label>
                <input id="ffmm-amount-input" type="number" min="${fund.minAmount}" step="5000" value="${defaultAmount}" oninput="updateFFMMInvestPreview('${fund.id}')" style="width: 100%; padding: 7px 9px; border: 1.5px solid #0284c7; border-radius: 6px; font-size: 0.80rem; font-weight: 800; color: #0f172a; box-sizing: border-box;" />
              </div>

              <!-- SIMULACIÓN DE COMPRA DE CUOTAS -->
              <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 8px 10px; margin-bottom: 9px; font-size: 0.62rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                  <span style="color: #475569;">Valor cuota vigente hoy:</span>
                  <strong style="color: #0f172a;">$${fund.initialSharePrice.toLocaleString('es-CL', { minimumFractionDigits: 2 })}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                  <span style="color: #475569;">Cuotas aproximadas a adquirir:</span>
                  <strong id="ffmm-preview-shares" style="color: #0284c7;">${estimatedShares} cuotas</strong>
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 4px; border-top: 1px dashed #cbd5e1;">
                  <span style="color: #475569;">Rentabilidad mensual esperada / Volatilidad:</span>
                  <strong style="color: #047857;">${fund.rateDisplay} (${fund.volatilityDisplay})</strong>
                </div>
              </div>

              <!-- ADVERTENCIA LEGAL CMF Y MENCIÓN DE PERFIL DE INVERSIONISTA -->
              <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 6px 8px; margin-bottom: 9px; font-size: 0.58rem; color: #92400e; line-height: 1.32;">
                <strong>ℹ️ Perfil de Inversionista y Valor Cuota (CMF):</strong> Este fondo está orientado a un perfil <strong>${fund.riskLabel}</strong>. Los valores de las cuotas son variables y las rentabilidades pasadas no garantizan que se repitan en el futuro.
              </div>

              <div id="ffmm-modal-error" style="display: none; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.62rem; font-weight: 700; padding: 6px 8px; border-radius: 6px; margin-bottom: 8px;"></div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 8px; font-size: 0.72rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">Cancelar</button>
                <button type="button" onclick="executeInvestFFMM('${fund.id}')" style="flex: 1.3; padding: 8px; font-size: 0.72rem; font-weight: 800; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                  Confirmar Aporte
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function updateFFMMInvestPreview(fundId) {
      const fund = fondosMutuosCatalog.find(f => f.id === fundId);
      if (!fund) return;
      const inputEl = document.getElementById('ffmm-amount-input');
      const amount = Math.max(0, Math.round(Number(inputEl ? inputEl.value : 0)));
      const shares = amount / fund.initialSharePrice;
      const sharesEl = document.getElementById('ffmm-preview-shares');
      if (sharesEl) sharesEl.textContent = `${shares.toFixed(4)} cuotas`;
    }

    function executeInvestFFMM(fundId) {
      const fund = fondosMutuosCatalog.find(f => f.id === fundId);
      if (!fund) return;

      const errorEl = document.getElementById('ffmm-modal-error');

      const sourceSelect = document.getElementById('ffmm-source-select');
      const amountInput = document.getElementById('ffmm-amount-input');
      const sourceId = sourceSelect ? sourceSelect.value : 'cash';
      const amount = Math.round(Number(amountInput ? amountInput.value : 0));

      if (!amount || amount < fund.minAmount) {
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.textContent = `⚠️ El aporte mínimo para este fondo es de $${fund.minAmount.toLocaleString('es-CL')}.`;
        }
        return;
      }

      if (sourceId === 'cash') {
        const available = Number(state.cash) || 0;
        if (amount > available) {
          if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.textContent = `⚠️ Saldo insuficiente en Efectivo ($${available.toLocaleString('es-CL')} disponibles).`;
          }
          return;
        }
        state.cash = available - amount;
      } else {
        const acc = (state.bankAccounts || []).find(a => a.id === sourceId);
        if (!acc || (Number(acc.balance) || 0) < amount) {
          if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.textContent = '⚠️ Saldo insuficiente en la cuenta bancaria seleccionada.';
          }
          return;
        }
        acc.balance = (Number(acc.balance) || 0) - amount;
      }

      if (!Array.isArray(state.mutualFunds)) state.mutualFunds = [];
      const sharesBought = amount / fund.initialSharePrice;

      state.mutualFunds.push({
        id: 'ffmm_pos_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        fundTypeId: fund.id,
        name: fund.shortName,
        fullName: fund.name,
        icon: fund.icon,
        riskLabel: fund.riskLabel,
        riskColor: fund.riskColor,
        riskBg: fund.riskBg,
        expectedMonthlyRate: fund.expectedMonthlyRate,
        monthlyVolatility: fund.monthlyVolatility,
        rescueDays: fund.rescueDays,
        minAmount: fund.minAmount,
        shares: sharesBought,
        initialSharePrice: fund.initialSharePrice,
        currentSharePrice: fund.initialSharePrice,
        contributedCapital: amount,
        currentBalance: amount,
        monthsSimulated: 0
      });

      syncInvestedTotal();
      closeBancoModal();
      renderBancoStage('fondos');
      if (typeof updateHUD === 'function') updateHUD();
    }

    function simulateMonthFFMM(posId) {
      if (!Array.isArray(state.mutualFunds)) return;
      const pos = state.mutualFunds.find(f => f.id === posId);
      if (!pos) return;

      // Generador normal estándar aproximado (Box-Muller) para volatilidad realista
      const u1 = Math.max(1e-7, Math.random());
      const u2 = Math.random();
      const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

      const monthlyReturn = pos.expectedMonthlyRate + (z * pos.monthlyVolatility);
      const prevBalance = pos.currentBalance;

      pos.currentSharePrice = Math.max(10, pos.currentSharePrice * (1 + monthlyReturn));
      pos.currentBalance = Math.round(pos.shares * pos.currentSharePrice);
      pos.monthsSimulated = (pos.monthsSimulated || 0) + 1;

      const delta = pos.currentBalance - prevBalance;
      const pctMonth = (monthlyReturn * 100).toFixed(2);

      syncInvestedTotal();
      renderBancoStage('fondos');
      if (typeof updateHUD === 'function') updateHUD();

      alertUpcomingBankFeature(
        delta >= 0 ? '📈 Variación Mensual Positiva (Valor Cuota)' : '📉 Variación Mensual Negativa (Valor Cuota)',
        `En el mes #${pos.monthsSimulated}, el valor cuota de ${pos.name} varió un ${delta >= 0 ? '+' : ''}${pctMonth}% (${delta >= 0 ? '+$' : '-$'}${Math.abs(delta).toLocaleString('es-CL')}). Nuevo saldo valorizado: $${pos.currentBalance.toLocaleString('es-CL')}.`
      );
    }

    function openRedeemFFMMModal(posId, presetAmount = null, presetDestId = null) {
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot || !Array.isArray(state.mutualFunds)) return;

      const pos = state.mutualFunds.find(f => f.id === posId);
      if (!pos) return;

      const catalogFund = fondosMutuosCatalog.find(f => f.id === pos.fundTypeId);
      const minStayBalance = pos.minAmount || (catalogFund ? catalogFund.minAmount : 5000);
      const minPartialRedeem = 5000;

      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      const destOptions = [
        { id: 'cash', label: '💵 Dinero en Efectivo' },
        ...bankAccounts.map(a => ({
          id: a.id,
          label: `${a.icon || '🏦'} ${a.name} (Saldo: $${(a.balance || 0).toLocaleString('es-CL')})`
        }))
      ];

      const defaultDest = presetDestId || (bankAccounts.length > 0 ? bankAccounts[0].id : 'cash');
      const initialAmount = presetAmount !== null ? presetAmount : pos.currentBalance;
      const diff = pos.currentBalance - pos.contributedCapital;

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #047857; max-width: 425px;">
            <div class="job-modal-header" style="background: linear-gradient(135deg, #047857 0%, #065f46 100%); color: #ffffff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.2rem; width: 36px; height: 36px;">
                💸
              </div>
              <div>
                <div class="job-modal-title" style="color: #ffffff; font-size: 0.92rem;">
                  Rescatar Fondos: ${pos.name}
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.66rem; color: #d1fae5; margin-top: 2px;">
                  Pago en ${pos.rescueDays} ${pos.rescueDays === 1 ? 'día hábil' : 'días hábiles'} · Sin comisión de salida
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 13px 15px;">
              <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 10px; margin-bottom: 9px; font-size: 0.62rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                  <span style="color: #475569;">Saldo estimado actual:</span>
                  <strong style="color: #0284c7;">$${pos.currentBalance.toLocaleString('es-CL')} (${pos.shares.toFixed(4)} cuotas)</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                  <span style="color: #475569;">Resultado acumulado a hoy:</span>
                  <strong style="color: ${diff >= 0 ? '#047857' : '#b91c1c'};">${diff >= 0 ? '+$' : '-$'}${Math.abs(diff).toLocaleString('es-CL')}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 3px; border-top: 1px dashed #cbd5e1;">
                  <span style="color: #64748b;">Mínimo rescate parcial / Saldo mín. permanencia:</span>
                  <strong style="color: #334155;">$${minPartialRedeem.toLocaleString('es-CL')} / $${minStayBalance.toLocaleString('es-CL')}</strong>
                </div>
              </div>

              <!-- 1. MONTO A RESCATAR (PARCIAL O TOTAL) -->
              <div style="margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
                  <label style="font-size: 0.64rem; font-weight: 700; color: #334155;">
                    1. Monto a rescatar (Parcial o Total):
                  </label>
                  <button type="button" onclick="setRedeemFFMMFullAmount(${pos.currentBalance})" style="padding: 2px 7px; font-size: 0.58rem; font-weight: 800; background: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; border-radius: 4px; cursor: pointer;">
                    Rescatar 100% ($${pos.currentBalance.toLocaleString('es-CL')})
                  </button>
                </div>
                <input id="ffmm-redeem-amount" type="number" min="${minPartialRedeem}" max="${pos.currentBalance}" step="1000" value="${initialAmount}" style="width: 100%; padding: 7px 9px; border: 1.5px solid #047857; border-radius: 6px; font-size: 0.80rem; font-weight: 800; color: #0f172a; box-sizing: border-box;" />
              </div>

              <!-- 2. CUENTA DE DESTINO -->
              <div style="margin-bottom: 9px;">
                <label style="display: block; font-size: 0.64rem; font-weight: 700; color: #334155; margin-bottom: 3px;">
                  2. Dónde abonar el dinero rescatado:
                </label>
                <select id="ffmm-redeem-dest" style="width: 100%; padding: 7px 8px; border: 1.5px solid #cbd5e1; border-radius: 6px; font-size: 0.68rem; font-weight: 700; color: #0f172a; background: #ffffff;">
                  ${destOptions.map(opt => `
                    <option value="${opt.id}" ${opt.id === defaultDest ? 'selected' : ''}>${opt.label}</option>
                  `).join('')}
                </select>
              </div>

              <!-- ADVERTENCIA DE VARIACIÓN DE VALOR CUOTA DE CIERRE -->
              <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 6px 8px; margin-bottom: 9px; font-size: 0.58rem; color: #92400e; line-height: 1.32;">
                <strong>⚠️ Aviso de Valor Cuota Variable:</strong> El rescate se procesa con el <strong>valor cuota de cierre</strong> del día hábil de liquidación (según horario de corte / <em>cut-off</em>), por lo que el monto final abonado o las cuotas rebajadas pueden variar respecto al estimado actual.
              </div>

              <div id="ffmm-redeem-error" style="display: none; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.62rem; font-weight: 700; padding: 6px 8px; border-radius: 6px; margin-bottom: 8px;"></div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 8px; font-size: 0.72rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">Cancelar</button>
                <button type="button" onclick="promptConfirmRedeemFFMM('${pos.id}')" style="flex: 1.4; padding: 8px; font-size: 0.72rem; font-weight: 800; background: #047857; color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                  Continuar a Confirmación ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function setRedeemFFMMFullAmount(fullBalance) {
      const inputEl = document.getElementById('ffmm-redeem-amount');
      if (inputEl) inputEl.value = fullBalance;
      const errorEl = document.getElementById('ffmm-redeem-error');
      if (errorEl) errorEl.style.display = 'none';
    }

    function promptConfirmRedeemFFMM(posId) {
      if (!Array.isArray(state.mutualFunds)) return;
      const pos = state.mutualFunds.find(f => f.id === posId);
      if (!pos) return;

      const amountInput = document.getElementById('ffmm-redeem-amount');
      const destSelect = document.getElementById('ffmm-redeem-dest');
      const errorEl = document.getElementById('ffmm-redeem-error');

      const redeemAmount = Math.round(Number(amountInput ? amountInput.value : 0));
      const destId = destSelect ? destSelect.value : 'cash';

      const catalogFund = fondosMutuosCatalog.find(f => f.id === pos.fundTypeId);
      const minStayBalance = pos.minAmount || (catalogFund ? catalogFund.minAmount : 5000);
      const minPartialRedeem = 5000;

      if (!redeemAmount || redeemAmount <= 0 || redeemAmount > pos.currentBalance) {
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.textContent = `⚠️ Ingresa un monto válido de hasta $${pos.currentBalance.toLocaleString('es-CL')}.`;
        }
        return;
      }

      const isFullRedeem = redeemAmount >= pos.currentBalance;
      const remainingBalance = pos.currentBalance - redeemAmount;

      if (!isFullRedeem) {
        if (redeemAmount < minPartialRedeem) {
          if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.textContent = `⚠️ El monto mínimo para un rescate parcial es de $${minPartialRedeem.toLocaleString('es-CL')}.`;
          }
          return;
        }
        if (remainingBalance < minStayBalance) {
          if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.textContent = `⚠️ El saldo restante ($${remainingBalance.toLocaleString('es-CL')}) quedaría bajo el mínimo de permanencia del fondo ($${minStayBalance.toLocaleString('es-CL')}). Realiza un rescate menor o selecciona "Rescatar 100%".`;
          }
          return;
        }
      }

      let destName = '💵 Dinero en Efectivo';
      if (destId !== 'cash') {
        const acc = (state.bankAccounts || []).find(a => a.id === destId);
        if (acc) destName = `${acc.icon || '🏦'} ${acc.name}`;
      }

      const sharesToRedeem = isFullRedeem ? pos.shares : (pos.shares * (redeemAmount / pos.currentBalance));
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #047857; max-width: 425px;">
            <div class="job-modal-header" style="background: linear-gradient(135deg, #047857 0%, #065f46 100%); color: #ffffff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.2rem; width: 36px; height: 36px;">
                ✅
              </div>
              <div>
                <div class="job-modal-title" style="color: #ffffff; font-size: 0.92rem;">
                  Confirmar Solicitud de Rescate
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.66rem; color: #d1fae5; margin-top: 2px;">
                  ${pos.icon} ${pos.fullName || pos.name}
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 13px 15px;">
              <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 9px 11px; margin-bottom: 9px; font-size: 0.64rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span style="color: #166534;">Tipo de operación:</span>
                  <strong style="color: #14532d;">${isFullRedeem ? 'Rescate Total (100% de las cuotas)' : 'Rescate Parcial'}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span style="color: #166534;">Monto estimado a rescatar:</span>
                  <strong style="color: #047857; font-size: 0.74rem;">$${redeemAmount.toLocaleString('es-CL')}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span style="color: #166534;">Cuotas aproximadas a liquidar:</span>
                  <strong style="color: #14532d;">${sharesToRedeem.toFixed(4)} cuotas</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span style="color: #166534;">Saldo remanente en el fondo:</span>
                  <strong style="color: #14532d;">$${remainingBalance.toLocaleString('es-CL')}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px; padding-top: 4px; border-top: 1px dashed #86efac;">
                  <span style="color: #166534;">Destino del abono:</span>
                  <strong style="color: #14532d;">${destName}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #166534;">Plazo reglamentario de pago:</span>
                  <strong style="color: #14532d;">${pos.rescueDays} ${pos.rescueDays === 1 ? 'día hábil' : 'días hábiles'}</strong>
                </div>
              </div>

              <div style="background: #fffbeb; border: 1px solid #fcd34d; border-radius: 6px; padding: 7px 9px; margin-bottom: 11px; font-size: 0.59rem; color: #92400e; line-height: 1.35;">
                <strong>📌 Declaración de liquidación:</strong> Entiendo que la solicitud de rescate es irrevocable una vez procesada y que el monto definitivo se calculará según el <strong>valor cuota de cierre</strong> del día hábil correspondiente, pudiendo presentar variaciones respecto al monto estimado hoy.
              </div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="openRedeemFFMMModal('${pos.id}', ${redeemAmount}, '${destId}')" style="flex: 1; padding: 8px; font-size: 0.72rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">
                  ◀ Volver
                </button>
                <button type="button" onclick="executeRedeemFFMM('${pos.id}', ${redeemAmount}, '${destId}')" style="flex: 1.4; padding: 8px; font-size: 0.72rem; font-weight: 800; background: #047857; color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                  ✅ Confirmar Rescate
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function executeRedeemFFMM(posId, confirmedAmount, confirmedDestId) {
      if (!Array.isArray(state.mutualFunds)) return;
      const idx = state.mutualFunds.findIndex(f => f.id === posId);
      if (idx === -1) return;

      const pos = state.mutualFunds[idx];
      const redeemAmount = Math.round(Number(confirmedAmount || 0));
      const destId = confirmedDestId || 'cash';

      if (!redeemAmount || redeemAmount <= 0 || redeemAmount > pos.currentBalance) {
        return;
      }

      let destName = 'Dinero en Efectivo';
      if (destId === 'cash') {
        state.cash = (Number(state.cash) || 0) + redeemAmount;
      } else {
        const acc = (state.bankAccounts || []).find(a => a.id === destId);
        if (acc) {
          acc.balance = (Number(acc.balance) || 0) + redeemAmount;
          destName = acc.name;
        } else {
          state.cash = (Number(state.cash) || 0) + redeemAmount;
        }
      }

      const isFullRedeem = redeemAmount >= pos.currentBalance;
      if (isFullRedeem) {
        state.mutualFunds.splice(idx, 1);
      } else {
        const fractionRedeemed = redeemAmount / pos.currentBalance;
        pos.shares = pos.shares * (1 - fractionRedeemed);
        pos.contributedCapital = Math.round(pos.contributedCapital * (1 - fractionRedeemed));
        pos.currentBalance = pos.currentBalance - redeemAmount;
      }

      syncInvestedTotal();
      closeBancoModal();
      renderBancoStage('fondos');
      if (typeof updateHUD === 'function') updateHUD();

      alertUpcomingBankFeature(
        isFullRedeem ? '✅ Rescate Total de Fondo Mutuo' : '✅ Rescate Parcial de Fondo Mutuo',
        `Se liquidaron cuotas por $${redeemAmount.toLocaleString('es-CL')} de tu ${pos.name} (plazo reglamentario: ${pos.rescueDays} ${pos.rescueDays === 1 ? 'día hábil' : 'días hábiles'}) y el dinero fue abonado en tu ${destName}.`
      );
    }

    function renderDepositosPlazoView() {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      if (!Array.isArray(state.termDeposits)) state.termDeposits = [];
      syncInvestedTotal();

      const activeDAPs = state.termDeposits;
      const totalCapital = activeDAPs.reduce((sum, d) => sum + (Number(d.principal) || 0), 0);
      const totalExpectedInterest = activeDAPs.reduce((sum, d) => sum + (Number(d.expectedInterest) || 0), 0);

      container.innerHTML = `
        <div class="personal-subview-box">
          <div class="personal-subview-top">
            <span style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">⏳ Depósitos a Plazo (DAP)</span>
            <button type="button" class="personal-subview-back-btn" onclick="renderBancoStage('main')">
              <span>◀ Volver</span>
            </button>
          </div>

          <!-- RESUMEN DE CARTERA DAP -->
          <div style="background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%); border: 1.5px solid #93c5fd; border-radius: 9px; padding: 10px 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 0.58rem; font-weight: 700; color: #1e40af; text-transform: uppercase;">Capital Invertido (${activeDAPs.length} ${activeDAPs.length === 1 ? 'depósito' : 'depósitos'})</div>
              <div style="font-size: 1.20rem; font-weight: 800; color: #0284c7; font-family: var(--font-title);">
                $${totalCapital.toLocaleString('es-CL')}
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.58rem; color: #64748b;">Interés al vencimiento</div>
              <div style="font-size: 0.92rem; font-weight: 800; color: #047857;">+$${totalExpectedInterest.toLocaleString('es-CL')}</div>
            </div>
          </div>

          <!-- EXPLICACIÓN NORMATIVA CHILE: FIJO VS RENOVABLE -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; margin-bottom: 8px; font-size: 0.62rem; color: #475569; line-height: 1.38;">
            <strong style="color: #0f172a;">• Regla CMF / Banco Central:</strong> Mientras el plazo corre, el dinero está <strong>100% inmovilizado</strong> y no puedes modificar el contrato ni retirar fondos.<br/>
            • <strong>DAP Fijo:</strong> Al vencer, el banco deposita automáticamente capital + intereses en tu cuenta.<br/>
            • <strong>DAP Renovable:</strong> Al vencer, tienes <strong>3 días hábiles bancarios</strong> para cobrarlo; si no lo retiras en ese plazo, se renueva automáticamente por otro período igual.
          </div>

          <!-- CATÁLOGO PARA TOMAR NUEVOS DEPÓSITOS -->
          <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px;">
            ${dapCatalog.map(item => `
              <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 8px 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <div>
                    <div style="font-size: 0.72rem; font-weight: 800; color: #0f172a;">⏳ ${item.name}</div>
                    <div style="font-size: 0.60rem; font-weight: 700; color: #047857; margin-top: 1px;">
                      Tasa garantizada: ${item.rateDisplay} · Mínimo $${item.minAmount.toLocaleString('es-CL')}
                    </div>
                  </div>
                  <button type="button" onclick="openContractDAPModal('${item.id}')" style="padding: 5px 11px; font-size: 0.64rem; font-weight: 800; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer; white-space: nowrap; flex-shrink: 0;">
                    Tomar DAP
                  </button>
                </div>
                <div style="font-size: 0.60rem; color: #64748b; line-height: 1.3;">
                  ${item.desc}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- LISTADO DE DEPÓSITOS VIGENTES DEL PERSONAJE -->
          <div style="font-size: 0.72rem; font-weight: 800; color: #0f172a; margin-bottom: 5px;">
            📋 Mis Depósitos a Plazo vigentes (${activeDAPs.length}):
          </div>
          ${activeDAPs.length === 0 ? `
            <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 10px; text-align: center; font-size: 0.64rem; color: #64748b;">
              No tienes Depósitos a Plazo vigentes. Selecciona uno arriba para invertir.
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${activeDAPs.map((dap, idx) => `
                <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 9px 11px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px; margin-bottom: 4px;">
                    <div>
                      <div style="display: flex; align-items: center; gap: 5px;">
                        <strong style="font-size: 0.72rem; color: #14532d;">#${idx + 1} · ${dap.name}</strong>
                        <span style="font-size: 0.55rem; font-weight: 800; background: ${dap.isRenewable ? '#dbeafe' : '#dcfce7'}; color: ${dap.isRenewable ? '#1e40af' : '#166534'}; padding: 1px 6px; border-radius: 4px;">
                          ${dap.isRenewable ? '🔄 Renovable' : '📥 Fijo (Abono al vencer)'}
                        </span>
                      </div>
                      <div style="font-size: 0.60rem; color: #166534; margin-top: 2px;">
                        Capital: <strong>$${dap.principal.toLocaleString('es-CL')}</strong> · Interés período: <strong style="color: #047857;">+$${dap.expectedInterest.toLocaleString('es-CL')}</strong> → Total al vencer: <strong>$${(dap.principal + dap.expectedInterest).toLocaleString('es-CL')}</strong>
                      </div>
                      <div style="font-size: 0.58rem; color: #15803d; margin-top: 1px;">
                        Plazo pactado: ${dap.days} días (Ciclo #${dap.cycle || 1}) · Cuenta asociada: <strong>${dap.payoutAccountName}</strong>
                      </div>
                    </div>
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-top: 6px; padding-top: 6px; border-top: 1px dashed #86efac;">
                    <span style="font-size: 0.57rem; color: #475569;">🔒 Inmovilizado y sin cambios hasta cumplir los ${dap.days} días</span>
                    <button type="button" onclick="simulateMaturityDAP('${dap.id}')" style="padding: 4px 9px; font-size: 0.58rem; font-weight: 800; background: #047857; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;" title="Simular que se cumplieron los ${dap.days} días del depósito">
                      ⏩ Simular llegada al vencimiento (${dap.days}d)
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;
    }

    function openContractDAPModal(dapTypeId) {
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const item = dapCatalog.find(d => d.id === dapTypeId);
      if (!item) return;

      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      const cash = Number(state.cash) || 0;

      const fundingOptions = [
        { id: 'cash', label: `💵 Dinero en Efectivo (Disponible: $${cash.toLocaleString('es-CL')})`, balance: cash, name: 'Dinero en Efectivo' },
        ...bankAccounts.map(a => ({
          id: a.id,
          label: `${a.icon || '🏦'} ${a.name} (Disponible: $${(a.balance || 0).toLocaleString('es-CL')})`,
          balance: Number(a.balance) || 0,
          name: a.name
        }))
      ];

      const defaultAmount = 100000;
      const defaultInterest = Math.round(defaultAmount * item.ratePeriod);

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #0284c7; max-width: 445px;">
            <div class="job-modal-header" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.2rem; width: 36px; height: 36px;">
                ⏳
              </div>
              <div>
                <div class="job-modal-title" style="color: #ffffff; font-size: 0.95rem;">
                  Tomar ${item.name}
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.70rem; color: #e0f2fe; margin-top: 2px;">
                  Tasa: ${item.rateDisplay}
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 13px 15px;">
              <!-- 1. ORIGEN Y DESTINO DE FONDOS -->
              <div style="margin-bottom: 9px;">
                <label style="display: block; font-size: 0.66rem; font-weight: 800; color: #0f172a; margin-bottom: 3px;">
                  1. ¿Desde qué cuenta financiarás (y dónde se abonará al vencer)?
                </label>
                <select id="dap-source-select" style="width: 100%; padding: 7px 9px; font-size: 0.70rem; border: 1.5px solid #cbd5e1; border-radius: 6px; background: #ffffff; color: #0f172a; font-weight: 600;">
                  ${fundingOptions.map(opt => `<option value="${opt.id}">${opt.label}</option>`).join('')}
                </select>
              </div>

              <!-- 2. MONTO A INVERTIR -->
              <div style="margin-bottom: 9px;">
                <label style="display: block; font-size: 0.66rem; font-weight: 800; color: #0f172a; margin-bottom: 3px;">
                  2. Monto a invertir (Mínimo $${item.minAmount.toLocaleString('es-CL')}):
                </label>
                <input type="number" id="dap-amount-input" min="${item.minAmount}" step="10000" value="${defaultAmount}" oninput="updateDAPPreview('${item.id}')" style="width: 100%; padding: 7px 9px; font-size: 0.80rem; font-weight: 800; border: 1.5px solid #cbd5e1; border-radius: 6px; color: #0f172a;" />
              </div>

              <!-- 3. MODALIDAD AL VENCIMIENTO (FIJO VS RENOVABLE) -->
              <div style="margin-bottom: 10px;">
                <label style="display: block; font-size: 0.66rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">
                  3. ¿Qué hacer cuando se cumplan los ${item.days} días?
                </label>
                <div style="display: flex; flex-direction: column; gap: 5px; font-size: 0.64rem;">
                  <label style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 7px 9px; display: flex; gap: 7px; align-items: flex-start; cursor: pointer;">
                    <input type="radio" name="dap-modality" value="fijo" checked style="margin-top: 2px; accent-color: #0284c7;" />
                    <div>
                      <strong style="color: #0f172a;">📥 Depósito Fijo (Abono automático al vencer)</strong>
                      <div style="color: #64748b; font-size: 0.58rem; line-height: 1.25;">Al cumplirse los ${item.days} días, el capital + intereses se depositan automáticamente en tu cuenta sin hacer trámites.</div>
                    </div>
                  </label>
                  <label style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 7px 9px; display: flex; gap: 7px; align-items: flex-start; cursor: pointer;">
                    <input type="radio" name="dap-modality" value="renovable" style="margin-top: 2px; accent-color: #0284c7;" />
                    <div>
                      <strong style="color: #0f172a;">🔄 Depósito Renovable (Plazo de gracia de 3 días hábiles al vencer)</strong>
                      <div style="color: #64748b; font-size: 0.58rem; line-height: 1.25;">No se puede modificar mientras corre el plazo. Al vencer dispones de 3 días hábiles bancarios para cobrarlo; si no lo haces, se renueva automáticamente por otros ${item.days} días.</div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- SIMULACIÓN DE GANANCIA -->
              <div style="background: #ecfdf5; border: 1.5px solid #86efac; border-radius: 8px; padding: 8px 10px; margin-bottom: 10px; font-size: 0.65rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                  <span style="color: #166534;">Interés ganado en ${item.days} días:</span>
                  <strong id="dap-preview-interest" style="color: #047857;">+$${defaultInterest.toLocaleString('es-CL')}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #166534; font-weight: 800;">Monto final al vencimiento:</span>
                  <strong id="dap-preview-total" style="color: #14532d; font-size: 0.76rem;">$${(defaultAmount + defaultInterest).toLocaleString('es-CL')}</strong>
                </div>
              </div>

              <div id="dap-modal-error" style="display: none; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.63rem; font-weight: 700; padding: 6px 8px; border-radius: 5px; margin-bottom: 8px;"></div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 8px; font-size: 0.72rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">
                  Cancelar
                </button>
                <button type="button" onclick="executeContractDAP('${item.id}')" style="flex: 1.5; padding: 8px; font-size: 0.74rem; font-weight: 800; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                  Confirmar inversión
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function updateDAPPreview(dapTypeId) {
      const item = dapCatalog.find(d => d.id === dapTypeId);
      if (!item) return;
      const amountInput = document.getElementById('dap-amount-input');
      const interestEl = document.getElementById('dap-preview-interest');
      const totalEl = document.getElementById('dap-preview-total');
      if (!amountInput || !interestEl || !totalEl) return;

      const amount = Math.max(0, Number(amountInput.value) || 0);
      const interest = Math.round(amount * item.ratePeriod);
      interestEl.innerText = `+$${interest.toLocaleString('es-CL')}`;
      totalEl.innerText = `$${(amount + interest).toLocaleString('es-CL')}`;
    }

    function executeContractDAP(dapTypeId) {
      const item = dapCatalog.find(d => d.id === dapTypeId);
      if (!item) return;

      const sourceId = document.getElementById('dap-source-select')?.value || 'cash';
      const amount = Math.round(Number(document.getElementById('dap-amount-input')?.value) || 0);
      const modality = document.querySelector('input[name="dap-modality"]:checked')?.value || 'fijo';
      const errEl = document.getElementById('dap-modal-error');

      if (amount < item.minAmount) {
        if (errEl) {
          errEl.style.display = 'block';
          errEl.innerText = `⚠️ El monto mínimo para contratar este Depósito a Plazo es de $${item.minAmount.toLocaleString('es-CL')}.`;
        }
        return;
      }

      let payoutAccountName = 'Dinero en Efectivo';
      if (sourceId === 'cash') {
        if ((Number(state.cash) || 0) < amount) {
          if (errEl) {
            errEl.style.display = 'block';
            errEl.innerText = `⚠️ No tienes suficiente Dinero en Efectivo ($${(state.cash || 0).toLocaleString('es-CL')}) para invertir $${amount.toLocaleString('es-CL')}.`;
          }
          return;
        }
        state.cash -= amount;
      } else {
        const acc = (state.bankAccounts || []).find(a => a.id === sourceId);
        if (!acc || (Number(acc.balance) || 0) < amount) {
          if (errEl) {
            errEl.style.display = 'block';
            errEl.innerText = `⚠️ Saldo insuficiente en ${acc ? acc.name : 'la cuenta seleccionada'} para invertir $${amount.toLocaleString('es-CL')}.`;
          }
          return;
        }
        acc.balance -= amount;
        payoutAccountName = acc.name;
      }

      if (!Array.isArray(state.termDeposits)) state.termDeposits = [];
      const expectedInterest = Math.round(amount * item.ratePeriod);

      state.termDeposits.push({
        id: 'dap_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        typeId: item.id,
        name: item.shortName,
        days: item.days,
        ratePeriod: item.ratePeriod,
        principal: amount,
        expectedInterest: expectedInterest,
        isRenewable: modality === 'renovable',
        payoutAccountId: sourceId,
        payoutAccountName: payoutAccountName,
        cycle: 1,
        createdAt: new Date().toISOString()
      });

      syncInvestedTotal();
      closeBancoModal();
      renderBancoStage('depositos');
      if (typeof updateHUD === 'function') updateHUD();

      alertUpcomingBankFeature(
        '¡Depósito a Plazo constituido!',
        `Invertiste $${amount.toLocaleString('es-CL')} en ${item.shortName} (${modality === 'renovable' ? 'Renovable automático' : 'Fijo con abono automático al vencer'}). Ganancia proyectada en ${item.days} días: +$${expectedInterest.toLocaleString('es-CL')}.`
      );
    }

    function simulateMaturityDAP(dapId) {
      const idx = (state.termDeposits || []).findIndex(d => d.id === dapId);
      if (idx === -1) return;
      const dap = state.termDeposits[idx];
      const totalPayout = (Number(dap.principal) || 0) + (Number(dap.expectedInterest) || 0);

      if (dap.isRenewable) {
        // EN UN DAP RENOVABLE, AL CUMPLIRSE EL PLAZO SE ABRE LA VENTANA LEGAL DE 3 DÍAS HÁBILES
        const modalRoot = document.getElementById('banco-modal-root');
        if (!modalRoot) return;

        modalRoot.innerHTML = `
          <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
            <div class="job-modal-card" style="border-color: #0284c7; max-width: 440px;">
              <div class="job-modal-header" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 12px 14px;">
                <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.2rem; width: 36px; height: 36px;">
                  🔄
                </div>
                <div>
                  <div class="job-modal-title" style="color: #ffffff; font-size: 0.95rem;">
                    Vencimiento de tu ${dap.name}
                  </div>
                  <div class="job-modal-subtitle" style="font-size: 0.70rem; color: #e0f2fe; margin-top: 2px;">
                    Plazo de gracia legal: 3 días hábiles bancarios
                  </div>
                </div>
              </div>

              <div class="job-modal-body" style="padding: 13px 15px;">
                <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 9px 11px; margin-bottom: 10px; font-size: 0.65rem; color: #14532d;">
                  • <strong>Capital invertido:</strong> $${dap.principal.toLocaleString('es-CL')}<br/>
                  • <strong>Intereses ganados (${dap.days} días):</strong> +$${dap.expectedInterest.toLocaleString('es-CL')}<br/>
                  • <strong>Total acumulado hoy:</strong> <strong style="font-size: 0.76rem;">$${totalPayout.toLocaleString('es-CL')}</strong>
                </div>

                <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 7px; padding: 9px 11px; margin-bottom: 12px; font-size: 0.64rem; color: #78350f; line-height: 1.38;">
                  <strong>📋 Normativa Banco Central / CMF:</strong> Como contrataste un <strong>Depósito Renovable</strong>, hoy que venció el plazo se abre una ventana única de <strong>3 días hábiles bancarios</strong>:<br/>
                  • Si das aviso dentro de estos 3 días, el banco abona los <strong>$${totalPayout.toLocaleString('es-CL')}</strong> en tu <strong>${dap.payoutAccountName}</strong>.<br/>
                  • Si dejas pasar los 3 días sin hacer nada, al 4° día hábil se renueva automáticamente por otros <strong>${dap.days} días</strong>.
                </div>

                <div style="display: flex; gap: 8px;">
                  <button type="button" onclick="executeRenewableDAPDecision('${dap.id}', 'collect')" style="flex: 1; padding: 9px; font-size: 0.70rem; font-weight: 800; background: #047857; color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                    📥 Cobrar dentro de los 3 días
                  </button>
                  <button type="button" onclick="executeRenewableDAPDecision('${dap.id}', 'renew')" style="flex: 1; padding: 9px; font-size: 0.70rem; font-weight: 800; background: #0284c7; color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                    🔄 Dejar que se renueve (${dap.days}d)
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        // DAP FIJO: ABONO AUTOMÁTICO EN LA CUENTA ASOCIADA O EFECTIVO
        let targetName = 'Dinero en Efectivo';
        const targetAcc = (state.bankAccounts || []).find(a => a.id === dap.payoutAccountId);
        if (targetAcc) {
          targetAcc.balance = (Number(targetAcc.balance) || 0) + totalPayout;
          targetName = targetAcc.name;
        } else {
          state.cash = (Number(state.cash) || 0) + totalPayout;
        }

        state.termDeposits.splice(idx, 1);
        syncInvestedTotal();
        renderBancoStage('depositos');
        if (typeof updateHUD === 'function') updateHUD();
        alertUpcomingBankFeature(
          '📥 DAP Fijo Vencido y Abonado Automáticamente',
          `Se cumplieron los ${dap.days} días de tu ${dap.name}. Al ser un Depósito Fijo, el banco transfirió automáticamente $${totalPayout.toLocaleString('es-CL')} ($${dap.principal.toLocaleString('es-CL')} de capital + $${dap.expectedInterest.toLocaleString('es-CL')} de intereses) a tu ${targetName}.`
        );
      }
    }

    function executeRenewableDAPDecision(dapId, decision) {
      const idx = (state.termDeposits || []).findIndex(d => d.id === dapId);
      if (idx === -1) {
        closeBancoModal();
        return;
      }
      const dap = state.termDeposits[idx];
      const totalPayout = (Number(dap.principal) || 0) + (Number(dap.expectedInterest) || 0);

      closeBancoModal();

      if (decision === 'collect') {
        let targetName = 'Dinero en Efectivo';
        const targetAcc = (state.bankAccounts || []).find(a => a.id === dap.payoutAccountId);
        if (targetAcc) {
          targetAcc.balance = (Number(targetAcc.balance) || 0) + totalPayout;
          targetName = targetAcc.name;
        } else {
          state.cash = (Number(state.cash) || 0) + totalPayout;
        }

        state.termDeposits.splice(idx, 1);
        syncInvestedTotal();
        renderBancoStage('depositos');
        if (typeof updateHUD === 'function') updateHUD();
        alertUpcomingBankFeature(
          '📥 DAP Renovable Cobrado en Ventana de 3 Días',
          `Diste orden de no renovar dentro de los 3 días hábiles posteriores al vencimiento. Se abonaron $${totalPayout.toLocaleString('es-CL')} en tu ${targetName}.`
        );
      } else {
        const prevPrincipal = dap.principal;
        const earned = dap.expectedInterest;
        dap.principal = totalPayout;
        dap.expectedInterest = Math.round(dap.principal * dap.ratePeriod);
        dap.cycle = (dap.cycle || 1) + 1;
        syncInvestedTotal();
        renderBancoStage('depositos');
        if (typeof updateHUD === 'function') updateHUD();
        alertUpcomingBankFeature(
          '🔄 DAP Renovado Automáticamente',
          `Pasaron los 3 días hábiles sin cobro: tus $${prevPrincipal.toLocaleString('es-CL')} + $${earned.toLocaleString('es-CL')} de intereses se reinvirtieron automáticamente por otro ciclo de ${dap.days} días (Nuevo capital: $${dap.principal.toLocaleString('es-CL')}).`
        );
      }
    }

    // ==========================================================================
    // SEGUROS: CATÁLOGO DE 7 PÓLIZAS CONTRATABLES Y CANCELABLES
    // ==========================================================================

    function renderSegurosView() {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      if (!Array.isArray(state.insurances)) state.insurances = [];

      const activeInsurances = state.insurances;
      const totalMonthlyCost = activeInsurances.reduce((sum, ins) => {
        return sum + (Number(ins.costMonthly) || 0);
      }, 0);

      container.innerHTML = `
        <div class="personal-subview-box">
          <div class="personal-subview-top">
            <span style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">🛡️ Pólizas de Seguros</span>
            <button type="button" class="personal-subview-back-btn" onclick="renderBancoStage('main')">
              <span>◀ Volver</span>
            </button>
          </div>

          <!-- RESUMEN SUPERIOR -->
          <div style="background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%); border: 1.5px solid #93c5fd; border-radius: 9px; padding: 10px 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 0.58rem; font-weight: 700; color: #1e40af; text-transform: uppercase;">Protección Activa</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: #0284c7; font-family: var(--font-title);">
                ${activeInsurances.length} ${activeInsurances.length === 1 ? 'Póliza contratada' : 'Pólizas contratadas'}
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.58rem; color: #64748b;">Prima mensual consolidada</div>
              <div style="font-size: 0.90rem; font-weight: 800; color: #047857;">$${totalMonthlyCost.toLocaleString('es-CL')}/mes</div>
            </div>
          </div>

          <!-- CATÁLOGO DE LOS 7 SEGUROS -->
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${segurosCatalog.map(item => {
              const matchingPolicies = activeInsurances.filter(i => i.type === item.id || i.id === item.id || (i.id || '').startsWith('ins_' + item.id));
              const isContracted = matchingPolicies.length > 0;
              const isEligible = item.checkEligible();

              let statusBadge = '';
              let actionButton = '';

              if (item.isMultiAsset) {
                // SEGUROS MULTI-BIEN (AUTOMOTRIZ Y VIVIENDA)
                if (isContracted) {
                  const countLabel = matchingPolicies.length === 1 
                    ? (item.id === 'automotriz' ? '1 vehículo asegurado' : '1 vivienda asegurada')
                    : (item.id === 'automotriz' ? `${matchingPolicies.length} vehículos asegurados` : `${matchingPolicies.length} viviendas aseguradas`);
                  statusBadge = `<span style="font-size: 0.56rem; font-weight: 700; background: #dcfce7; color: #15803d; border: 1px solid #86efac; padding: 1px 6px; border-radius: 4px;">🟢 ${countLabel}</span>`;
                  actionButton = `
                    <button type="button" onclick="openAssetInsuranceModal('${item.id}')" style="padding: 5px 12px; font-size: 0.64rem; font-weight: 800; background: #f0fdf4; color: #166534; border: 1.5px solid #86efac; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 3px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
                      <span>Ver seguros</span>
                    </button>
                  `;
                } else if (isEligible) {
                  actionButton = `
                    <button type="button" onclick="openAssetInsuranceModal('${item.id}')" style="padding: 5px 12px; font-size: 0.64rem; font-weight: 800; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 1px 3px rgba(2, 132, 199, 0.25);">
                      Contratar seguro
                    </button>
                  `;
                } else {
                  actionButton = `
                    <button type="button" disabled title="No tienes ${item.id === 'automotriz' ? 'vehículos' : 'viviendas'} registrados para asegurar" style="padding: 5px 9px; font-size: 0.60rem; font-weight: 600; background: #f1f5f9; color: #94a3b8; border: 1px solid #e2e8f0; border-radius: 6px; cursor: not-allowed;">
                      Requisito no cumplido
                    </button>
                  `;
                }
              } else {
                // SEGUROS UNITARIOS (FRAUDE, DESGRAVAMEN, CESANTÍA, VIDA, SALUD)
                if (isContracted) {
                  statusBadge = `<span style="font-size: 0.56rem; font-weight: 700; background: #dcfce7; color: #15803d; border: 1px solid #86efac; padding: 1px 6px; border-radius: 4px;">🟢 Contratado</span>`;
                  actionButton = `
                    <button type="button" onclick="openSingleInsuranceModal('${item.id}', 'view')" style="padding: 5px 12px; font-size: 0.64rem; font-weight: 800; background: #f0fdf4; color: #166534; border: 1.5px solid #86efac; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 3px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
                      <span>Ver seguro</span>
                    </button>
                  `;
                } else if (isEligible) {
                  actionButton = `
                    <button type="button" onclick="openSingleInsuranceModal('${item.id}', 'contract')" style="padding: 5px 12px; font-size: 0.64rem; font-weight: 800; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 1px 3px rgba(2, 132, 199, 0.25);">
                      Contratar seguro
                    </button>
                  `;
                } else {
                  actionButton = `
                    <button type="button" disabled style="padding: 5px 9px; font-size: 0.60rem; font-weight: 600; background: #f1f5f9; color: #94a3b8; border: 1px solid #e2e8f0; border-radius: 6px; cursor: not-allowed;">
                      Requisito no cumplido
                    </button>
                  `;
                }
              }

              return `
                <div style="background: #ffffff; border: 1.5px solid ${isContracted ? '#86efac' : '#e2e8f0'}; border-radius: 8px; padding: 8px 10px; box-shadow: 0 1px 2px rgba(15, 23, 42, 0.02);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <span style="font-size: 1.15rem;">${item.icon}</span>
                      <div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                          <strong style="font-size: 0.72rem; color: #0f172a;">${item.name}</strong>
                          ${statusBadge}
                        </div>
                        <div style="font-size: 0.58rem; font-weight: 700; color: ${isContracted ? '#047857' : '#0284c7'};">
                          ${item.costDisplay || ('$' + item.costMonthly.toLocaleString('es-CL') + '/mes')}
                        </div>
                      </div>
                    </div>

                    <!-- BOTÓN DE ACCIÓN (CONTRATAR O VER SEGURO) -->
                    <div>
                      ${actionButton}
                    </div>
                  </div>

                  <div style="font-size: 0.62rem; color: #475569; line-height: 1.3; margin-bottom: 4px;">
                    ${item.desc}
                  </div>

                  <div style="font-size: 0.56rem; color: #64748b; background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 5px; padding: 4px 6px;">
                    <span style="color: #475569; font-weight: 600;">• Condición:</span> ${item.requirementDesc}<br/>
                    <span style="color: #475569; font-weight: 600;">• Realidad CMF:</span> ${item.note}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // ==========================================================================
    // MODAL MULTI-BIEN PARA SEGURO VEHICULAR O DE VIVIENDA
    // Muestra listado de contratados con costo, fecha y botón terminar,
    // más listado de bienes disponibles con su precio específico para contratar.
    // ==========================================================================
    function openAssetInsuranceModal(insuranceId) {
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const item = segurosCatalog.find(c => c.id === insuranceId);
      if (!item) return;

      const allAssets = getUserInsuranceAssets(insuranceId);
      const activePolicies = (state.insurances || []).filter(i => i.type === insuranceId || i.id === insuranceId || (i.id || '').startsWith('ins_' + insuranceId));
      const contractedAssetIds = activePolicies.map(p => p.assetId || p.associatedId);
      const availableAssets = allAssets.filter(a => !contractedAssetIds.includes(a.id));

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #38bdf8; max-width: 460px; max-height: 88vh; overflow-y: auto;">
            <!-- CABECERA -->
            <div class="job-modal-header" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.25rem; width: 36px; height: 36px;">
                ${item.icon}
              </div>
              <div>
                <div class="job-modal-title" style="color: #ffffff; font-size: 0.95rem;">
                  Gestión: ${item.name}
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.70rem; color: #e0f2fe; margin-top: 2px;">
                  Pólizas individuales por bien · Puedes asegurar más de uno
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 12px 14px;">
              <!-- SECCIÓN 1: PÓLIZAS CONTRATADAS ACTIVAS -->
              <div style="margin-bottom: 12px;">
                <div style="font-size: 0.74rem; font-weight: 800; color: #0f172a; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: center;">
                  <span>🟢 Pólizas Contratadas Vigentes</span>
                  <span style="font-size: 0.62rem; color: #047857; font-weight: 700;">${activePolicies.length} ${insuranceId === 'automotriz' ? 'vehículo(s)' : 'vivienda(s)'}</span>
                </div>

                ${activePolicies.length > 0 ? `
                  <div style="display: flex; flex-direction: column; gap: 5px;">
                    ${activePolicies.map(p => {
                      const subDesc = p.assetSub || ((getUserInsuranceAssets(insuranceId).find(a => a.id === p.assetId || a.name === p.associatedTo) || {}).sub) || '';
                      return `
                      <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 9px 11px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                          <div>
                            <div style="font-size: 0.76rem; font-weight: 800; color: #166534;">
                              📌 ${p.associatedTo} ${subDesc ? `<span style="font-size: 0.64rem; font-weight: 600; color: #15803d;">(${subDesc})</span>` : ''}
                            </div>
                            <div style="font-size: 0.60rem; color: #15803d; margin-top: 2px;">
                              📅 Contratado: <strong>${p.contractedDate || p.contractedAt || 'Vigente'}</strong> · Prima: <strong style="color: #047857;">$${(p.costMonthly || 0).toLocaleString('es-CL')}/mes</strong>
                            </div>
                          </div>

                          <!-- BOTÓN PARA TERMINAR ESTA PÓLIZA ESPECÍFICA -->
                          <button type="button" onclick="showConfirmCancelInsuranceModal('${p.id}')" style="padding: 4px 9px; font-size: 0.62rem; font-weight: 800; background: #fff5f5; color: #b91c1c; border: 1px solid #fca5a5; border-radius: 5px; cursor: pointer; flex-shrink: 0; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
                            Terminar seguro
                          </button>
                        </div>

                        <!-- COBERTURA DETALLADA DEL SEGURO CONTRATADO -->
                        <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed #86efac;">
                          <div style="font-size: 0.58rem; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 3px;">
                            🛡️ Cobertura activa:
                          </div>
                          <div style="display: flex; flex-direction: column; gap: 2px;">
                            ${getInsuranceCoverages(insuranceId).map(c => `
                              <div style="font-size: 0.60rem; line-height: 1.35; ${c.startsWith('⛔') ? 'color: #b91c1c; font-weight: 700; background: #fef2f2; padding: 2px 5px; border-radius: 4px; border: 1px solid #fecaca;' : 'color: #14532d;'}">
                                ${c}
                              </div>
                            `).join('')}
                          </div>
                        </div>
                      </div>
                    `;
                    }).join('')}
                  </div>
                ` : `
                  <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 7px 9px; font-size: 0.64rem; color: #64748b; text-align: center;">
                    No tienes pólizas activas de ${item.name.toLowerCase()} en este momento.
                  </div>
                `}
              </div>

              <!-- SECCIÓN 2: BIENES DISPONIBLES PARA CONTRATAR -->
              <div style="margin-bottom: 12px;">
                <div style="font-size: 0.74rem; font-weight: 800; color: #0f172a; margin-bottom: 5px;">
                  📋 ${insuranceId === 'automotriz' ? 'Tus vehículos disponibles para asegurar:' : 'Tus inmuebles disponibles para asegurar:'}
                </div>

                ${availableAssets.length > 0 ? `
                  <div style="display: flex; flex-direction: column; gap: 5px;">
                    ${availableAssets.map(asset => `
                      <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 8px 10px; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                          <div style="font-size: 0.72rem; font-weight: 800; color: #0f172a;">
                            ${asset.icon} ${asset.name} <span style="font-size: 0.64rem; font-weight: 600; color: #0284c7;">(${asset.sub})</span>
                          </div>
                          <div style="font-size: 0.60rem; color: #64748b;">
                            Prima para este ${insuranceId === 'automotriz' ? 'vehículo' : 'inmueble'}: <strong style="color: #0284c7;">$${asset.price.toLocaleString('es-CL')}/mes</strong>
                          </div>
                          <div style="font-size: 0.58rem; color: #0284c7; margin-top: 2px;">
                            🛡️ Cobertura: ${insuranceId === 'automotriz' ? 'Colisiones, pérdida total y robo' : 'Incendio, sismos y catástrofes (no cubre robos)'}
                          </div>
                        </div>

                        <!-- BOTÓN CONTRATAR PARA ESTE BIEN ESPECÍFICO -->
                        <button type="button" onclick="showConfirmContractInsuranceModal('${insuranceId}', '${asset.id}')" style="padding: 5px 11px; font-size: 0.64rem; font-weight: 800; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 1px 3px rgba(2, 132, 199, 0.25);">
                          Contratar
                        </button>
                      </div>
                    `).join('')}
                  </div>
                ` : (allAssets.length > 0 ? `
                  <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 8px 10px; font-size: 0.64rem; color: #065f46; text-align: center; font-weight: 600;">
                    ✓ Todos tus ${insuranceId === 'automotriz' ? 'vehículos registrados' : 'inmuebles registrados'} ya cuentan con seguro activo.
                  </div>
                ` : `
                  <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 8px 10px; font-size: 0.64rem; color: #991b1b; text-align: center; font-weight: 700;">
                    ⛔ No tienes ${insuranceId === 'automotriz' ? 'vehículos registrados' : 'inmuebles registrados'} para asegurar.
                  </div>
                `)}
              </div>

              <!-- BOTÓN CERRAR -->
              <div style="display: flex; justify-content: flex-end;">
                <button type="button" onclick="closeBancoModal()" style="padding: 7px 16px; font-size: 0.72rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">
                  Volver / Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // ==========================================================================
    // MODAL PARA SEGUROS UNITARIOS (FRAUDE, DESGRAVAMEN, CESANTÍA, VIDA, SALUD)
    // ==========================================================================
    function openSingleInsuranceModal(insuranceId, mode) {
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const item = segurosCatalog.find(c => c.id === insuranceId);
      if (!item) return;

      const activeIns = (state.insurances || []).find(i => i.id === insuranceId || i.type === insuranceId);
      const assets = getUserInsuranceAssets(insuranceId);

      if (mode === 'contract') {
        modalRoot.innerHTML = `
          <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
            <div class="job-modal-card" style="border-color: #38bdf8; max-width: 440px;">
              <div class="job-modal-header" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 12px 14px;">
                <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.25rem; width: 36px; height: 36px;">
                  ${item.icon}
                </div>
                <div>
                  <div class="job-modal-title" style="color: #ffffff; font-size: 0.95rem;">
                    Contratar: ${item.name}
                  </div>
                  <div class="job-modal-subtitle" style="font-size: 0.72rem; color: #e0f2fe; margin-top: 2px;">
                    Prima: ${item.costDisplay || ('$' + item.costMonthly.toLocaleString('es-CL') + '/mes')}
                  </div>
                </div>
              </div>

              <div class="job-modal-body" style="padding: 13px 15px;">
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; padding: 8px 10px; margin-bottom: 10px; font-size: 0.68rem; color: #334155; line-height: 1.4;">
                  ${item.desc}
                </div>

                <div style="margin-bottom: 12px;">
                  ${item.id === 'fraude' ? `
                    <div style="font-size: 0.68rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">💳 Cuentas respaldadas:</div>
                    <div style="font-size: 0.65rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 7px 9px; color: #334155;">
                      ${assets.map(a => `• <strong>${a.name}</strong> (${a.sub})`).join('<br/>')}
                    </div>
                  ` : (item.id === 'desgravamen' ? `
                    <div style="font-size: 0.68rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">📑 Compromiso crediticio respaldado:</div>
                    <div style="font-size: 0.65rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 7px 9px; color: #334155;">
                      ${assets.map(a => `• <strong>${a.name}</strong> (${a.sub})`).join('<br/>')}
                    </div>
                  ` : (item.id === 'cesantia' ? `
                    <div style="font-size: 0.68rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">💼 Empleo y deuda asegurada:</div>
                    <div style="font-size: 0.65rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 7px 9px; color: #334155;">
                      • Empleo actual: <strong>${state.currentJob ? state.currentJob.name : 'Trabajador dependiente'}</strong><br/>
                      • Cobertura: Pago de hasta 6 cuotas de tu crédito ante despido involuntario.
                    </div>
                  ` : (item.id === 'vida' ? `
                    <div style="font-size: 0.65rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 7px 9px; color: #166534;">
                      • Beneficiarios recibirán: <strong>$20.000.000</strong> en dinero en efectivo garantizado ante fallecimiento o invalidez total y permanente del asegurado.
                    </div>
                  ` : `
                    <div style="font-size: 0.65rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 7px 9px; color: #166534;">
                      ✓ Libre contratación: Cobertura médica complementaria ambulatoria y hospitalaria para el titular.
                    </div>
                  `)))}
                </div>

                <div style="display: flex; gap: 8px; margin-top: 12px;">
                  <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 8px; font-size: 0.74rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">
                    Volver
                  </button>
                  <button type="button" onclick="showConfirmContractInsuranceModal('${item.id}')" style="flex: 1.6; padding: 8px; font-size: 0.74rem; font-weight: 800; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 1px 3px rgba(2, 132, 199, 0.3);">
                    Contratar Seguro
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        // MODO VER SEGURO CON FECHA, COSTO Y BOTÓN TERMINAR
        const assetDesc = activeIns ? (activeIns.associatedTo || 'Titular / Cuentas') : 'Titular';
        const singleSubDesc = (activeIns && activeIns.assetSub) || ((getUserInsuranceAssets(item.id).find(a => a.name === assetDesc || a.id === (activeIns && activeIns.assetId)) || {}).sub) || '';
        modalRoot.innerHTML = `
          <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
            <div class="job-modal-card" style="border-color: #86efac; max-width: 440px;">
              <div class="job-modal-header" style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #ffffff; padding: 12px 14px;">
                <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.25rem; width: 36px; height: 36px;">
                  ${item.icon}
                </div>
                <div>
                  <div class="job-modal-title" style="color: #ffffff; font-size: 0.95rem;">
                    Póliza Activa: ${item.name}
                  </div>
                  <div class="job-modal-subtitle" style="font-size: 0.72rem; color: #d1fae5; margin-top: 2px;">
                    🟢 Vigente · Prima: ${activeIns.costDisplay || item.costDisplay || ('$' + item.costMonthly.toLocaleString('es-CL') + '/mes')}
                  </div>
                </div>
              </div>

              <div class="job-modal-body" style="padding: 13px 15px;">
                <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 7px; padding: 9px 11px; margin-bottom: 10px;">
                  <div style="font-size: 0.58rem; font-weight: 700; color: #15803d; text-transform: uppercase;">Detalles de la Póliza:</div>
                  <div style="font-size: 0.80rem; font-weight: 800; color: #166534; margin-top: 2px;">
                    📌 ${assetDesc} ${singleSubDesc ? `<span style="font-size: 0.68rem; font-weight: 600; color: #15803d;">(${singleSubDesc})</span>` : ''}
                  </div>
                  <div style="font-size: 0.62rem; color: #15803d; margin-top: 2px;">
                    📅 Fecha de contratación: <strong>${activeIns.contractedDate || activeIns.contractedAt || 'Vigente'}</strong>
                  </div>
                </div>

                <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 9px 11px; margin-bottom: 10px;">
                  <div style="font-size: 0.60rem; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
                    <span>🛡️ Cobertura activa garantizada:</span>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 3px;">
                    ${getInsuranceCoverages(item.id).map(c => `
                      <div style="font-size: 0.64rem; line-height: 1.35; ${c.startsWith('⛔') ? 'color: #b91c1c; font-weight: 700; background: #fef2f2; padding: 4px 6px; border-radius: 4px; border: 1px solid #fecaca; margin-top: 2px;' : (c.startsWith('ℹ️') ? 'color: #0369a1; background: #e0f2fe; padding: 3px 6px; border-radius: 4px; margin-top: 2px;' : 'color: #14532d;')}">
                        ${c}
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div style="font-size: 0.62rem; color: #64748b; margin-bottom: 12px; line-height: 1.35;">
                  En Chile la ley permite terminar o renunciar a tus seguros voluntarios en cualquier momento sin costo ni penalización.
                </div>

                <!-- BOTONES -->
                <div style="display: flex; gap: 8px;">
                  <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 8px; font-size: 0.74rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">
                    Cerrar
                  </button>
                  <button type="button" onclick="showConfirmCancelInsuranceModal('${activeIns ? activeIns.id : item.id}')" style="flex: 1.4; padding: 8px; font-size: 0.74rem; font-weight: 800; background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 1px 3px rgba(185, 28, 28, 0.3);">
                    Terminar seguro
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }

    // ==========================================================================
    // MODAL DE CONFIRMACIÓN PARA CONTRATAR SEGURO (MULTI-BIEN O UNITARIO)
    // ==========================================================================
    function showConfirmContractInsuranceModal(insuranceId, assetId, assetName, assetSub, assetPrice) {
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const item = segurosCatalog.find(c => c.id === insuranceId);
      if (!item) return;

      if (assetId && (!assetName || !assetSub || !assetPrice)) {
        const assetObj = (getUserInsuranceAssets(insuranceId) || []).find(a => a.id === assetId);
        if (assetObj) {
          assetName = assetObj.name;
          assetSub = assetObj.sub;
          assetPrice = assetObj.price;
        }
      }

      const priceNum = Number(assetPrice || item.costMonthly || 0);
      const formattedPrice = '$' + priceNum.toLocaleString('es-CL') + '/mes';
      const targetLabel = assetName || item.name;
      const isMulti = item.isMultiAsset;
      const returnCall = isMulti ? `openAssetInsuranceModal('${insuranceId}')` : `openSingleInsuranceModal('${insuranceId}', 'contract')`;

      const coverages = getInsuranceCoverages(insuranceId);

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #38bdf8; max-width: 440px; box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.25);">
            <div class="job-modal-header" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.25rem; width: 36px; height: 36px;">
                ${item.icon}
              </div>
              <div>
                <div class="job-modal-title" style="color: #ffffff; font-size: 0.95rem;">
                  ¿Confirmas la contratación?
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.72rem; color: #e0f2fe; margin-top: 2px;">
                  ${item.name}
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 13px 15px;">
              <!-- 1. QUÉ ASEGURARÉ Y PRECIO -->
              <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 9px 11px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                  <div>
                    <div style="font-size: 0.58rem; font-weight: 700; color: #64748b; text-transform: uppercase;">¿Qué vas a asegurar?</div>
                    <div style="font-size: 0.82rem; font-weight: 800; color: #0f172a; margin-top: 2px;">
                      📌 ${targetLabel} ${assetSub ? `<span style="font-size: 0.68rem; font-weight: 600; color: #475569;">(${assetSub})</span>` : ''}
                    </div>
                  </div>
                  <div style="text-align: right; flex-shrink: 0;">
                    <div style="font-size: 0.58rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Precio a pagar</div>
                    <div style="font-size: 0.82rem; font-weight: 800; color: #0284c7; margin-top: 2px;">
                      ${formattedPrice}
                    </div>
                  </div>
                </div>
              </div>

              <!-- 2. QUÉ CUBRE EL SEGURO -->
              <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 9px 11px; margin-bottom: 10px;">
                <div style="font-size: 0.60rem; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
                  <span>🛡️ ¿Qué cubre este seguro?</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 3px;">
                  ${coverages.map(c => `
                    <div style="font-size: 0.64rem; line-height: 1.35; ${c.startsWith('⛔') ? 'color: #b91c1c; font-weight: 700; background: #fef2f2; padding: 4px 6px; border-radius: 4px; border: 1px solid #fecaca; margin-top: 2px;' : (c.startsWith('ℹ️') ? 'color: #0369a1; background: #e0f2fe; padding: 3px 6px; border-radius: 4px; margin-top: 2px;' : 'color: #14532d;')}">
                      ${c}
                    </div>
                  `).join('')}
                </div>
              </div>

              <div style="font-size: 0.64rem; color: #475569; margin-bottom: 12px; line-height: 1.35;">
                Al confirmar, la póliza entrará en vigencia inmediata y la prima mensual se integrará a tus compromisos fijos de vida. Puedes darla de baja cuando desees sin penalizaciones.
              </div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="${returnCall}" style="flex: 1; padding: 8px; font-size: 0.74rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">
                  Cancelar / Volver
                </button>
                <button type="button" onclick="${assetId ? `executeContractAssetInsurance('${insuranceId}', '${assetId}', '${(assetName || '').replace(/'/g, "\\'")}', '${(assetSub || '').replace(/'/g, "\\'")}', ${priceNum})` : `executeContractSingleInsurance('${insuranceId}')`}" style="flex: 1.5; padding: 8px; font-size: 0.74rem; font-weight: 800; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 1px 3px rgba(2, 132, 199, 0.3);">
                  Confirmar Contratación
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // ==========================================================================
    // MODAL DE CONFIRMACIÓN PARA TERMINAR / CANCELAR SEGURO
    // ==========================================================================
    function showConfirmCancelInsuranceModal(policyId) {
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const policy = (state.insurances || []).find(i => i.id === policyId || i.type === policyId);
      if (!policy) return;

      const isMulti = policy.type === 'automotriz' || policy.type === 'vivienda';
      const returnCall = isMulti ? `openAssetInsuranceModal('${policy.type}')` : `openSingleInsuranceModal('${policy.type || policy.id}', 'view')`;
      const formattedCost = '$' + (policy.costMonthly || 0).toLocaleString('es-CL') + '/mes';

      const coveragesMap = {
        automotriz: 'Daños materiales por choque, pérdida total y robo del vehículo.',
        vivienda: 'Incendio, terremoto y catástrofes estructurales (no cubre robos).',
        fraude: 'Robo de dinero por asalto en cajero y compras bajo intimidación.',
        desgravamen: 'Pago total del saldo deudor ante fallecimiento o invalidez.',
        cesantia: 'Pago de cuotas crediticias ante despido involuntario.',
        vida: 'Capital de $20.000.000 para beneficiarios ante fallecimiento o invalidez.',
        salud: 'Reembolso complementario de gastos médicos y hospitalarios.'
      };
      const lostCoverage = coveragesMap[policy.type] || coveragesMap[policy.id] || 'Protección ante imprevistos';
      const cancelSubDesc = policy.assetSub || (isMulti ? ((getUserInsuranceAssets(policy.type).find(a => a.id === policy.assetId || a.name === policy.associatedTo) || {}).sub) : '');

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #fca5a5; max-width: 440px; box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.25);">
            <div class="job-modal-header" style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: #ffffff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.25rem; width: 36px; height: 36px;">
                ⚠️
              </div>
              <div>
                <div class="job-modal-title" style="color: #ffffff; font-size: 0.95rem;">
                  ¿Confirmas terminar este seguro?
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.72rem; color: #fee2e2; margin-top: 2px;">
                  ${policy.name}
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 13px 15px;">
              <div style="background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px;">
                <div style="font-size: 0.60rem; font-weight: 700; color: #991b1b; text-transform: uppercase;">Póliza a dar de baja:</div>
                <div style="font-size: 0.82rem; font-weight: 800; color: #7f1d1d; margin-top: 3px;">
                  📌 ${policy.associatedTo || policy.name} ${cancelSubDesc ? `<span style="font-size: 0.68rem; font-weight: 600; color: #991b1b;">(${cancelSubDesc})</span>` : ''}
                </div>
                <div style="font-size: 0.62rem; color: #b91c1c; margin-top: 2px;">
                  📅 Contratado: ${policy.contractedDate || policy.contractedAt || 'Vigente'}
                </div>
                <div style="font-size: 0.72rem; font-weight: 800; color: #991b1b; margin-top: 4px;">
                  💵 Prima actual: ${formattedCost}
                </div>
                <div style="font-size: 0.64rem; color: #991b1b; margin-top: 4px; padding-top: 4px; border-top: 1px dashed #fca5a5;">
                  🛡️ Cobertura que perderás: <strong>${lostCoverage}</strong>
                </div>
              </div>

              <div style="background: #fff5f5; border: 1px solid #fca5a5; border-radius: 6px; padding: 8px 10px; margin-bottom: 12px; font-size: 0.65rem; color: #991b1b; line-height: 1.35;">
                ⚠️ <strong>Atención:</strong> Al confirmar el término de la póliza, este bien o titular dejará de estar protegido ante siniestros a partir de este momento. No se generarán cobros futuros.
              </div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="${returnCall}" style="flex: 1; padding: 8px; font-size: 0.74rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">
                  Volver / No terminar
                </button>
                <button type="button" onclick="executeCancelInsurance('${policy.id}')" style="flex: 1.5; padding: 8px; font-size: 0.74rem; font-weight: 800; background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 1px 3px rgba(185, 28, 28, 0.3);">
                  Confirmar Término
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // CONTRATAR PÓLIZA PARA UN BIEN ESPECÍFICO (AUTOMOTRIZ / VIVIENDA)
    function executeContractAssetInsurance(insuranceId, assetId, assetName, assetSub, assetPrice) {
      if (!Array.isArray(state.insurances)) state.insurances = [];
      const item = segurosCatalog.find(c => c.id === insuranceId);
      if (!item) return;

      if (!assetName || !assetPrice) {
        const assetObj = (getUserInsuranceAssets(insuranceId) || []).find(a => a.id === assetId);
        if (assetObj) {
          assetName = assetObj.name;
          assetSub = assetObj.sub;
          assetPrice = assetObj.price;
        }
      }

      const policyId = `ins_${insuranceId}_${assetId}`;
      // Evitar duplicados para el mismo bien
      if (state.insurances.some(i => i.id === policyId || i.assetId === assetId)) {
        alertUpcomingBankFeature('Póliza ya existente', 'Este bien ya cuenta con una póliza de seguro activa.');
        return;
      }

      const todayStr = new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });

      state.insurances.push({
        id: policyId,
        type: insuranceId,
        name: assetSub ? `${item.name} (${assetName} - ${assetSub})` : `${item.name} (${assetName})`,
        icon: item.icon,
        assetId: assetId,
        associatedTo: assetName,
        assetSub: assetSub,
        costMonthly: assetPrice,
        costDisplay: `$${assetPrice.toLocaleString('es-CL')}/mes`,
        contractedDate: todayStr,
        contractedAt: new Date().toISOString()
      });

      renderBancoStage('seguros');
      if (typeof updateHUD === 'function') updateHUD();
      // Reabrir el modal actualizado para que vea la póliza en la lista de contratados
      openAssetInsuranceModal(insuranceId);
      alertUpcomingBankFeature('¡Póliza contratada!', `Has asegurado exitosamente tu ${assetName}${assetSub ? ` (${assetSub})` : ''} por $${assetPrice.toLocaleString('es-CL')}/mes.`);
    }

    // CONTRATAR SEGURO UNITARIO
    function executeContractSingleInsurance(insuranceId) {
      if (!Array.isArray(state.insurances)) state.insurances = [];
      const item = segurosCatalog.find(c => c.id === insuranceId);
      if (!item) return;

      let associatedAsset = 'Titular / Cuentas personales';
      if (insuranceId === 'fraude') associatedAsset = 'Cuentas y Tarjetas';
      else if (insuranceId === 'desgravamen') associatedAsset = state.creditLine ? 'Línea de Crédito' : 'Crédito personal';
      else if (insuranceId === 'cesantia') associatedAsset = state.currentJob ? state.currentJob.name : 'Crédito personal';

      const todayStr = new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });

      state.insurances.push({
        id: item.id,
        type: item.id,
        name: item.name,
        icon: item.icon,
        costMonthly: item.costMonthly,
        costDisplay: item.costDisplay,
        associatedTo: associatedAsset,
        contractedDate: todayStr,
        contractedAt: new Date().toISOString()
      });

      closeBancoModal();
      renderBancoStage('seguros');
      if (typeof updateHUD === 'function') updateHUD();
      alertUpcomingBankFeature('¡Seguro contratado!', `Has contratado exitosamente ${item.name} (${item.costDisplay || '$' + item.costMonthly.toLocaleString('es-CL') + '/mes'}).`);
    }

    // TERMINAR PÓLIZA INDIVIDUAL
    function executeCancelInsurance(policyId) {
      if (!Array.isArray(state.insurances)) return;
      const targetPolicy = state.insurances.find(i => i.id === policyId || i.type === policyId);
      const policyType = targetPolicy ? targetPolicy.type : null;

      state.insurances = state.insurances.filter(i => i.id !== policyId && i.type !== policyId && !(i.name || '').toLowerCase().includes(policyId));

      renderBancoStage('seguros');
      if (typeof updateHUD === 'function') updateHUD();

      // Si es un seguro multi-bien (auto o vivienda), refrescar el modal para que vea la lista actualizada
      if (policyType === 'automotriz' || policyType === 'vivienda') {
        openAssetInsuranceModal(policyType);
      } else {
        closeBancoModal();
      }

      alertUpcomingBankFeature('Seguro terminado', `Se ha dado de baja la póliza de ${targetPolicy ? targetPolicy.name : 'Seguro'}.`);
    }

    // RENDERIZAR EN LA ZONA CENTRAL AL PINCHAR UN ICONO
