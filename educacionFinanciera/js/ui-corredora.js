function renderCorredoraStage(mode) {
  const container = document.getElementById('hub-stage-sections');
  if (!container || !['venta', 'arriendo', 'ambos'].includes(mode)) return;

  const isRental = mode === 'arriendo';
  const isCombined = mode === 'ambos';
  const title = isCombined ? 'Propiedades en venta y arriendo' : isRental ? 'Arriendos ofrecidos' : 'Ventas ofrecidas';
  const iconBox = document.getElementById('hub-stage-icon-box');
  const titleElem = document.getElementById('hub-stage-title');
  const subtitleElem = document.getElementById('hub-stage-subtitle');

  if (iconBox) {
    iconBox.style.cursor = 'default';
    iconBox.onclick = null;
    iconBox.removeAttribute('title');
    iconBox.className = 'hub-stage-header-icon dock-icon-box icon-corredora';
    iconBox.innerHTML = `<span>${isCombined ? '🏘️' : isRental ? '🔑' : '🏷️'}</span>`;
  }
  if (titleElem) titleElem.innerText = title;
  if (subtitleElem) subtitleElem.innerText = 'Compara alternativas para comprar o arrendar';

  container.innerHTML = `
    <div class="personal-subview-box">
      <div class="personal-subview-top">
        <span style="font-size:.86rem;font-weight:800;color:#0369a1;">${title}</span>
        <button type="button" class="personal-subview-back-btn" onclick="renderHubCentralStage('corredora')"><span>◀ Volver</span></button>
      </div>
      <div class="hub-grid-2col">
        ${corredoraHousingCatalog.map(property => {
          const priceLabel = isCombined
            ? `<div style="font-size:.68rem;font-weight:800;color:#0369a1;">Venta: ${property.priceUF.toLocaleString('es-CL')} UF ($${property.value.toLocaleString('es-CL')} Aprox.)</div><div style="font-size:.68rem;font-weight:800;color:#047857;">Arriendo: $${property.monthlyRent.toLocaleString('es-CL')} / mes</div>`
            : isRental
              ? `<div style="font-size:.76rem;font-weight:800;color:#047857;">$${property.monthlyRent.toLocaleString('es-CL')} / mes</div>`
              : `<div style="font-size:.76rem;font-weight:800;color:#0369a1;">${property.priceUF.toLocaleString('es-CL')} UF ($${property.value.toLocaleString('es-CL')} Aprox.)</div>`;
          return `
            <article style="min-width:0;background:#fff;border:1.5px solid #cbd5e1;border-radius:8px;padding:9px 10px;display:flex;flex-direction:column;gap:5px;">
              <div style="display:flex;align-items:flex-start;gap:7px;">
                <span style="font-size:1.25rem;line-height:1.2;">${property.icon}</span>
                <div style="min-width:0;">
                  <div style="font-size:.68rem;font-weight:800;color:#0f172a;">${property.name}</div>
                  <div style="font-size:.53rem;color:#64748b;">${property.preferenceName}</div>
                </div>
              </div>
              ${priceLabel}
              <div style="display:flex;gap:10px;font-size:.57rem;color:#475569;">
                <span>${property.bedrooms === '1 ambiente' ? '1 ambiente' : `${property.bedrooms} dormitorios`}</span>
                <span>${property.bathrooms} ${property.bathrooms === 1 ? 'baño' : 'baños'}</span>
                ${property.landArea ? `<span>Terreno ${property.landArea}</span>` : ''}
              </div>
              <div style="font-size:.57rem;line-height:1.35;color:#475569;">${property.desc}</div>
              <div style="display:flex;gap:5px;margin-top:auto;">
                <button type="button" onclick="openCorredoraTransactionModal('${property.id}','compra','${mode}')" style="flex:1;padding:6px 4px;border:0;border-radius:6px;background:#0369a1;color:#fff;font-size:.58rem;font-weight:800;cursor:pointer;">Comprar</button>
                <button type="button" onclick="openCorredoraTransactionModal('${property.id}','arriendo','${mode}')" style="flex:1;padding:6px 4px;border:0;border-radius:6px;background:#0369a1;color:#fff;font-size:.58rem;font-weight:800;cursor:pointer;">Arrendar</button>
              </div>
            </article>`;
        }).join('')}
      </div>
      ${isRental || isCombined ? '<div style="margin-top:7px;font-size:.54rem;line-height:1.35;color:#64748b;">Al firmar se paga un mes de garantía y el arriendo proporcional hasta fin de mes. Luego el canon se cobra mensualmente.</div>' : ''}
    </div>`;
}

function getCorredoraMonthLength(year, month) {
  return [31, isSimulationLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

function getCorredoraMonthIndex(year, month) {
  return ((Number(year) || 1) - 1) * 12 + (Number(month) || 0);
}

function getCorredoraProratedRent(rental, year, month, lastDay) {
  const monthLength = getCorredoraMonthLength(year, month);
  const monthIndex = getCorredoraMonthIndex(year, month);
  const start = rental.startDate || {};
  const end = rental.endDate || {};
  const firstDay = monthIndex === getCorredoraMonthIndex(start.year, start.month)
    ? Math.max(1, Number(start.day) || 1)
    : 1;
  const finalDay = rental.endDate && monthIndex === getCorredoraMonthIndex(end.year, end.month)
    ? Math.min(monthLength, Number(end.day) || monthLength)
    : Math.min(monthLength, Number(lastDay) || monthLength);
  const occupiedDays = Math.max(0, finalDay - firstDay + 1);
  return Math.round((Number(rental.monthlyRent) || 0) * occupiedDays / monthLength);
}

function getCorredoraFundingSources() {
  return [
    { id: 'cash', label: `Efectivo ($${(Number(state.finances.cash) || 0).toLocaleString('es-CL')})` },
    ...(Array.isArray(state.finances.bankAccounts) ? state.finances.bankAccounts : [])
      .filter(account => account.type !== 'credit')
      .map(account => ({
        id: account.id,
        label: `${account.icon || '🏦'} ${account.name} ($${(Number(account.balance) || 0).toLocaleString('es-CL')})`
      }))
  ];
}

function getCorredoraFundingSourceLabel(sourceId) {
  return getCorredoraFundingSources().find(source => source.id === sourceId)?.label.split(' (')[0]
    || 'Efectivo';
}

function renderCorredoraMain() {
  const container = document.getElementById('hub-stage-sections');
  if (!container) return;
  const titleElem = document.getElementById('hub-stage-title');
  const subtitleElem = document.getElementById('hub-stage-subtitle');
  const iconBox = document.getElementById('hub-stage-icon-box');
  if (titleElem) titleElem.innerText = hubsData.corredora.title;
  if (subtitleElem) subtitleElem.innerText = hubsData.corredora.subtitle;
  if (iconBox) {
    iconBox.style.cursor = 'default';
    iconBox.onclick = null;
    iconBox.removeAttribute('title');
    iconBox.className = 'hub-stage-header-icon dock-icon-box icon-corredora';
    iconBox.innerHTML = '<span>🏠</span>';
  }

  const [propertyOption, ...otherOptions] = hubsData.corredora.sections;
  const activeRentals = (state.assets.rentedProperties || []).filter(rental => rental.active);
  const fundingSources = getCorredoraFundingSources();
  container.innerHTML = `
    <div class="personal-subview-box">
      <div style="display:grid;grid-template-columns:minmax(0,1fr);margin-bottom:8px;">
        <div class="hub-option-card" style="width:100%;box-sizing:border-box;justify-content:center;" onclick="${propertyOption.action}">
          <div class="hub-option-icon">${propertyOption.icon}</div>
          <div class="hub-option-text"><div class="hub-option-name">${propertyOption.name}</div><div class="hub-option-desc">${propertyOption.desc}</div></div>
        </div>
      </div>
      <div class="hub-grid-2col">
        ${otherOptions.map(option => `
          <div class="hub-option-card" ${option.action ? `onclick="${option.action}"` : ''}>
            <div class="hub-option-icon">${option.icon}</div>
            <div class="hub-option-text"><div class="hub-option-name">${option.name}</div><div class="hub-option-desc">${option.desc}</div></div>
          </div>`).join('')}
      </div>
      ${activeRentals.length ? `
        <section style="margin-top:12px;border-top:1px solid #e2e8f0;padding-top:10px;">
          <div style="font-size:.76rem;font-weight:800;color:#0f172a;margin-bottom:7px;">Mis arriendos</div>
          <div style="display:grid;gap:7px;">
            ${activeRentals.map(rental => `
              <article style="display:grid;grid-template-columns:minmax(0,1fr) minmax(130px,.8fr);align-items:center;gap:8px;padding:8px;border:1px solid #cbd5e1;border-radius:7px;background:#fff;">
                <div style="min-width:0;"><div style="font-size:.65rem;font-weight:800;color:#0f172a;">${rental.name}</div><div style="font-size:.57rem;color:#475569;">Arriendo mensual: $${Number(rental.monthlyRent).toLocaleString('es-CL')}</div>${Number(rental.unpaidRent) > 0 ? `<div style="font-size:.54rem;color:#b91c1c;">Arriendo pendiente: $${Number(rental.unpaidRent).toLocaleString('es-CL')}</div>` : ''}</div>
                <label style="display:grid;gap:3px;font-size:.53rem;font-weight:700;color:#475569;">Descontar arriendo desde
                  <select onchange="changeCorredoraRentalSource('${rental.id}',this.value)" style="width:100%;min-width:0;padding:6px;border:1px solid #cbd5e1;border-radius:5px;background:#fff;font-size:.58rem;">
                    ${fundingSources.map(source => `<option value="${source.id}" ${source.id === rental.paymentSourceId ? 'selected' : ''}>${source.label}</option>`).join('')}
                  </select>
                </label>
                <button type="button" onclick="endCorredoraRental('${rental.id}','main')" style="grid-column:1/-1;padding:7px 9px;border:1px solid #b91c1c;border-radius:5px;background:#fff;color:#b91c1c;font-size:.56rem;font-weight:800;cursor:pointer;">Terminar arriendo</button>
              </article>`).join('')}
          </div>
        </section>` : ''}
    </div>`;
}

function changeCorredoraRentalSource(rentalId, sourceId) {
  const rental = (state.assets.rentedProperties || []).find(item => item.id === rentalId && item.active);
  if (!rental || !getCorredoraFundingSources().some(source => source.id === sourceId)) return;
  rental.paymentSourceId = sourceId;
  renderCorredoraMain();
}

function renderCorredoraSalesManagement() {
  const container = document.getElementById('hub-stage-sections');
  if (!container) return;
  const titleElem = document.getElementById('hub-stage-title');
  const subtitleElem = document.getElementById('hub-stage-subtitle');
  const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  if (titleElem) titleElem.innerText = 'Gestionar Venta';
  if (subtitleElem) subtitleElem.innerText = 'Publica y administra la venta de tus propiedades';

  const properties = Array.isArray(state.assets.properties) ? state.assets.properties : [];
  const listings = Array.isArray(state.assets.propertyListings) ? state.assets.propertyListings : [];
  const activePropertyIds = new Set(listings.filter(listing => listing.status === 'active').map(listing => listing.propertyInstanceId));
  const availableProperties = properties.filter(property => !activePropertyIds.has(property.id));
  const activeListings = listings.filter(listing => listing.status === 'active');
  const soldListings = listings.filter(listing => listing.status === 'sold').slice(-5).reverse();

  container.innerHTML = `
    <div class="personal-subview-box">
      <div class="personal-subview-top">
        <span style="font-size:.86rem;font-weight:800;color:#0369a1;">Publicar una propiedad</span>
        <button type="button" class="personal-subview-back-btn" onclick="renderCorredoraMain()"><span>◀ Volver</span></button>
      </div>
      ${availableProperties.length ? `
        <div style="display:grid;gap:6px;margin-bottom:12px;">
          ${availableProperties.map(property => `
            <article style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 9px;border:1px solid #cbd5e1;border-radius:7px;background:#fff;">
              <div style="min-width:0;"><div style="font-size:.66rem;font-weight:800;color:#0f172a;">${property.icon || '🏠'} ${property.name}</div><div style="font-size:.57rem;color:#64748b;">Valor referencial: $${Number(property.value || 0).toLocaleString('es-CL')}${property.mortgageDebtId ? ' · Crédito hipotecario activo' : ''}</div></div>
              <button type="button" onclick="openCorredoraSaleModal('${property.id}')" style="flex-shrink:0;padding:7px 10px;border:0;border-radius:5px;background:#0369a1;color:#fff;font-size:.57rem;font-weight:800;cursor:pointer;">Publicar venta</button>
            </article>`).join('')}
        </div>` : '<div style="padding:12px;border:1px solid #e2e8f0;border-radius:7px;background:#f8fafc;color:#64748b;font-size:.64rem;margin-bottom:10px;">No tienes propiedades disponibles para publicar. Compra una propiedad para ponerla en venta.</div>'}
      ${activeListings.length ? `
        <section style="border-top:1px solid #e2e8f0;padding-top:10px;">
          <div style="font-size:.75rem;font-weight:800;color:#0f172a;margin-bottom:7px;">Ofertas publicadas</div>
          <div style="display:grid;gap:6px;">
            ${activeListings.map(listing => `
              <article style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 9px;border:1px solid #bfdbfe;border-radius:7px;background:#eff6ff;">
                <div style="min-width:0;"><div style="font-size:.63rem;font-weight:800;color:#0f172a;">${listing.propertyName}</div><div style="font-size:.56rem;color:#475569;">Publicado: $${Number(listing.askingPrice).toLocaleString('es-CL')} · ${Number(listing.elapsedMonths) || 0} ${Number(listing.elapsedMonths) === 1 ? 'mes' : 'meses'} en venta</div></div>
                <div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0;">
                  <button type="button" onclick="openCorredoraSaleModal('${listing.propertyInstanceId}','${listing.id}')" style="padding:6px 8px;border:1px solid #0369a1;border-radius:5px;background:#fff;color:#0369a1;font-size:.54rem;font-weight:700;cursor:pointer;">Modificar oferta</button>
                  <button type="button" onclick="cancelCorredoraSaleListing('${listing.id}')" style="padding:6px 8px;border:1px solid #cbd5e1;border-radius:5px;background:#fff;color:#475569;font-size:.54rem;font-weight:700;cursor:pointer;">Retirar oferta</button>
                </div>
              </article>`).join('')}
          </div>
        </section>` : ''}
      ${soldListings.length ? `
        <section style="border-top:1px solid #e2e8f0;padding-top:10px;margin-top:10px;">
          <div style="font-size:.75rem;font-weight:800;color:#0f172a;margin-bottom:7px;">Ventas concretadas</div>
          <div style="display:grid;gap:5px;">
            ${soldListings.map(listing => `
              <div style="padding:7px 8px;border:1px solid #bbf7d0;border-radius:6px;background:#f0fdf4;font-size:.57rem;color:#166534;">
                <strong>${listing.propertyName}</strong> · Fecha: ${String(listing.soldDate?.day || 1).padStart(2, '0')}-${monthLabels[Number(listing.soldDate?.month) || 0]}-Año${String(listing.soldDate?.year || 1).padStart(2, '0')} · Venta: $${Number(listing.askingPrice).toLocaleString('es-CL')} · Comisión: $${Number(listing.commissionPaid).toLocaleString('es-CL')} · Hipoteca: $${Number(listing.mortgagePayoff).toLocaleString('es-CL')} · Neto: <strong>$${Number(listing.netProceeds).toLocaleString('es-CL')}</strong>
              </div>`).join('')}
          </div>
        </section>` : ''}
      <div style="margin-top:8px;font-size:.54rem;line-height:1.35;color:#64748b;">La comisión de venta simulada es 2% del precio publicado.</div>
    </div>`;
}

function getCorredoraSaleProbability(askingPrice, referenceValue) {
  const ratio = Number(askingPrice) / Math.max(1, Number(referenceValue) || 1);
  if (ratio <= 0.9) return 0.37;
  if (ratio <= 1) return 0.23;
  if (ratio <= 1.05) return 0.13;
  if (ratio <= 1.15) return 0.05;
  return 0.02;
}

function getCorredoraSaleProbabilityLabel(askingPrice, referenceValue) {
  const probability = getCorredoraSaleProbability(askingPrice, referenceValue);
  if (probability >= 0.35) return 'Muy alta';
  if (probability >= 0.2) return 'Alta';
  if (probability >= 0.1) return 'Normal';
  if (probability >= 0.04) return 'Baja';
  return 'Muy baja';
}

function openCorredoraSaleModal(propertyId, listingId = null) {
  const property = (state.assets.properties || []).find(item => item.id === propertyId);
  const listing = listingId
    ? (state.assets.propertyListings || []).find(item => item.id === listingId && item.status === 'active')
    : null;
  const modalRoot = document.getElementById('banco-modal-root');
  if (!property || !modalRoot || (listingId && !listing)) return;
  const referenceValue = Math.max(0, Number(property.value) || 0);
  const payoutOptions = getCorredoraFundingSources();
  const defaultPayout = listing?.payoutAccountId || payoutOptions[0]?.id || 'cash';
  const isEditing = Boolean(listing);

  modalRoot.innerHTML = `
    <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
      <div class="job-modal-card" style="max-width:430px;border-color:#0369a1;">
        <div class="job-modal-header" style="background:#0369a1;color:#fff;padding:12px 14px;">
          <div class="job-modal-icon-badge" style="background:rgba(255,255,255,.18);">🏷️</div>
          <div><div class="job-modal-title" style="color:#fff;">${isEditing ? 'Modificar oferta de venta' : 'Publicar propiedad en venta'}</div><div class="job-modal-subtitle" style="color:#dbeafe;">${property.name}</div></div>
        </div>
        <div class="job-modal-body" style="padding:13px 15px;">
          <div style="font-size:.62rem;color:#475569;margin-bottom:8px;">Precio sugerido: <strong>$${referenceValue.toLocaleString('es-CL')}</strong></div>
          <label for="corredora-sale-price" style="display:block;font-size:.63rem;font-weight:700;color:#334155;margin-bottom:4px;">Precio de publicación ($)</label>
          <input id="corredora-sale-price" type="number" min="1" step="100000" value="${listing ? Number(listing.askingPrice) : referenceValue}" oninput="updateCorredoraSalePreview('${property.id}')" style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #cbd5e1;border-radius:6px;margin-bottom:8px;">
          <div id="corredora-sale-preview" style="padding:8px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;font-size:.60rem;color:#475569;margin-bottom:9px;"></div>
          <label for="corredora-sale-payout" style="display:block;font-size:.63rem;font-weight:700;color:#334155;margin-bottom:4px;">Abonar el resultado de la venta en</label>
          <select id="corredora-sale-payout" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;">${payoutOptions.map(option => `<option value="${option.id}" ${option.id === defaultPayout ? 'selected' : ''}>${option.label}</option>`).join('')}</select>
          <div id="corredora-sale-error" style="display:none;margin-top:8px;padding:7px;border:1px solid #fecaca;border-radius:5px;background:#fef2f2;color:#b91c1c;font-size:.6rem;"></div>
          <div style="display:flex;gap:8px;margin-top:12px;">
            <button type="button" onclick="closeBancoModal()" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:6px;background:#f8fafc;">Cancelar</button>
            <button type="button" onclick="publishCorredoraSale('${property.id}','${listing?.id || ''}')" style="flex:1.4;padding:8px;border:0;border-radius:6px;background:#0369a1;color:#fff;font-weight:800;">${isEditing ? 'Guardar cambios' : 'Publicar oferta'}</button>
          </div>
        </div>
      </div>
    </div>`;
  updateCorredoraSalePreview(property.id);
}

function updateCorredoraSalePreview(propertyId) {
  const property = (state.assets.properties || []).find(item => item.id === propertyId);
  const preview = document.getElementById('corredora-sale-preview');
  if (!property || !preview) return;
  const price = Math.max(0, Number(document.getElementById('corredora-sale-price')?.value) || 0);
  const commission = Math.round(price * 0.02);
  const mortgage = (state.finances.debts || []).find(debt => debt.id === property.mortgageDebtId);
  const estimatedNet = Math.max(0, price - commission - (Number(mortgage?.remainingBalance) || 0));
  const probabilityLabel = getCorredoraSaleProbabilityLabel(price, property.value);
  preview.innerHTML = `Tasación comercial de la propiedad: <strong>$${Number(property.value).toLocaleString('es-CL')}</strong><br/>Probabilidad de venta estimada: <strong>${probabilityLabel}</strong><br/>Comisión de venta (2%): <strong>$${commission.toLocaleString('es-CL')}</strong>${property.mortgageDebtId ? `<br/>Saldo hipotecario pendiente estimado: $${(Number(mortgage?.remainingBalance) || 0).toLocaleString('es-CL')}` : ''}<br/>Monto neto estimado: <strong>$${estimatedNet.toLocaleString('es-CL')}</strong>`;
}

function publishCorredoraSale(propertyId, listingId = '') {
  const property = (state.assets.properties || []).find(item => item.id === propertyId);
  if (!property) return;
  if (!Array.isArray(state.assets.propertyListings)) state.assets.propertyListings = [];
  const existingListing = listingId
    ? state.assets.propertyListings.find(listing => listing.id === listingId && listing.status === 'active')
    : null;
  if (listingId && !existingListing) return;
  if (!existingListing && state.assets.propertyListings.some(listing => listing.propertyInstanceId === property.id && listing.status === 'active')) return;
  const askingPrice = Math.round(Number(document.getElementById('corredora-sale-price')?.value) || 0);
  const payoutAccountId = document.getElementById('corredora-sale-payout')?.value || 'cash';
  const error = document.getElementById('corredora-sale-error');
  if (askingPrice <= 0) {
    if (error) {
      error.style.display = 'block';
      error.textContent = 'Ingresa un precio de publicación mayor que cero.';
    }
    return;
  }

  if (existingListing) {
    existingListing.askingPrice = askingPrice;
    existingListing.payoutAccountId = payoutAccountId;
    existingListing.propertyName = property.name;
  } else {
    state.assets.propertyListings.push({
      id: `sale_listing_${property.id}_${Date.now()}`,
      propertyInstanceId: property.id,
      propertyCatalogId: property.catalogId || null,
      propertyName: property.name,
      referenceValue: Number(property.value) || askingPrice,
      askingPrice,
      commissionRate: 0.02,
      payoutAccountId,
      elapsedMonths: 0,
      status: 'active',
      listedDate: { year: Number(state.simulation.year) || 1, month: Number(state.simulation.month) || 0, day: Number(state.simulation.day) || 1 }
    });
  }
  closeBancoModal();
  renderCorredoraSalesManagement();
}

function cancelCorredoraSaleListing(listingId) {
  const listing = (state.assets.propertyListings || []).find(item => item.id === listingId && item.status === 'active');
  if (!listing) return;
  listing.status = 'withdrawn';
  listing.withdrawnDate = { year: Number(state.simulation.year) || 1, month: Number(state.simulation.month) || 0, day: Number(state.simulation.day) || 1 };
  renderCorredoraSalesManagement();
}

function processDailyCorredoraSales() {
  const evaluationDays = [6, 15, 28];
  const currentDay = Number(state.simulation.day) || 1;
  if (!evaluationDays.includes(currentDay)) return;
  if (!Array.isArray(state.assets.propertyListings)) state.assets.propertyListings = [];
  const completedSales = [];
  state.assets.propertyListings.forEach(listing => {
    if (listing.status !== 'active') return;
    const evaluationKey = `${Number(state.simulation.year) || 1}-${Number(state.simulation.month) || 0}-${currentDay}`;
    if (listing.lastEvaluationDate === evaluationKey) return;
    listing.lastEvaluationDate = evaluationKey;
    const property = (state.assets.properties || []).find(item => item.id === listing.propertyInstanceId);
    if (!property) {
      listing.status = 'withdrawn';
      return;
    }
    const listingStart = listing.listedDate || {};
    listing.elapsedMonths = Math.max(0, (((Number(state.simulation.year) || 1) - (Number(listingStart.year) || 1)) * 12)
      + (Number(state.simulation.month) || 0) - (Number(listingStart.month) || 0));
    if (Math.random() >= getCorredoraSaleProbability(listing.askingPrice, listing.referenceValue)) return;

    const price = Math.round(Number(listing.askingPrice) || 0);
    const commission = Math.round(price * (Number(listing.commissionRate) || 0.02));
    const mortgage = (state.finances.debts || []).find(debt => debt.id === property.mortgageDebtId);
    const mortgagePayoff = Math.max(0, Number(mortgage?.remainingBalance) || 0);
    const netProceeds = price - commission - mortgagePayoff;
    if (netProceeds < 0) return;

    withFinancialMovementDetail(`Venta de propiedad: ${property.name}`, () => {
      state.finances.cash = (Number(state.finances.cash) || 0) + price;
    });
    withFinancialMovementDetail(`Comisión por venta de ${property.name}`, () => chargeCorredoraSource('cash', commission, `Comisión por venta de ${property.name}`));
    if (mortgagePayoff > 0) {
      withFinancialMovementDetail(`Pago de saldo hipotecario por venta de ${property.name}`, () => chargeCorredoraSource('cash', mortgagePayoff, `Pago de saldo hipotecario por venta de ${property.name}`));
      state.finances.debts = state.finances.debts.filter(debt => debt.id !== mortgage.id);
      state.finances.insurances = (state.finances.insurances || []).filter(policy => policy.loanId !== mortgage.id);
    }
    if (listing.payoutAccountId !== 'cash' && netProceeds > 0) {
      const payoutAccount = (state.finances.bankAccounts || []).find(account => account.id === listing.payoutAccountId && account.type !== 'credit');
      if (payoutAccount) {
        withFinancialMovementDetail(`Abono neto de venta de ${property.name}`, () => {
          state.finances.cash = Math.max(0, (Number(state.finances.cash) || 0) - netProceeds);
          creditBankAccount(payoutAccount.id, netProceeds);
        });
      } else {
        listing.payoutAccountId = 'cash';
      }
    }
    state.assets.properties = state.assets.properties.filter(item => item.id !== property.id);
    listing.status = 'sold';
    listing.soldDate = { year: Number(state.simulation.year) || 1, month: Number(state.simulation.month) || 0, day: Number(state.simulation.day) || 1 };
    listing.commissionPaid = commission;
    listing.mortgagePayoff = mortgagePayoff;
    listing.netProceeds = netProceeds;
    completedSales.push({ propertyName: property.name, price, commission, mortgagePayoff, netProceeds });
  });

  if (typeof updateMonthlyDebtTotal === 'function') updateMonthlyDebtTotal();
  if (completedSales.length && state.interface.activeHudTab === 'corredora') renderCorredoraSalesManagement();
  if (typeof updateHUD === 'function') updateHUD();
  if (completedSales.length && typeof alertUpcomingBankFeature === 'function') {
    const saleMessages = completedSales.map(sale => `${sale.propertyName}: venta $${sale.price.toLocaleString('es-CL')}, comisión $${sale.commission.toLocaleString('es-CL')}${sale.mortgagePayoff ? `, saldo hipotecario $${sale.mortgagePayoff.toLocaleString('es-CL')}` : ''}, neto recibido $${sale.netProceeds.toLocaleString('es-CL')}`).join('<br/>');
    alertUpcomingBankFeature(completedSales.length === 1 ? '¡Propiedad vendida!' : '¡Ventas concretadas!', saleMessages);
  }
}

function getCorredoraMarketRent(property) {
  const catalogProperty = corredoraHousingCatalog.find(item => item.id === property.catalogId);
  if (catalogProperty) return Number(catalogProperty.monthlyRent) || 0;
  return Math.round((Number(property.value) || 0) * 0.0035 / 10000) * 10000;
}

function renderCorredoraRentalManagement() {
  const container = document.getElementById('hub-stage-sections');
  if (!container) return;
  const titleElem = document.getElementById('hub-stage-title');
  const subtitleElem = document.getElementById('hub-stage-subtitle');
  if (titleElem) titleElem.innerText = 'Gestionar Arriendo';
  if (subtitleElem) subtitleElem.innerText = 'Publica tus propiedades y administra los ingresos por arriendo';

  const properties = Array.isArray(state.assets.properties) ? state.assets.properties : [];
  const listings = Array.isArray(state.assets.propertyRentalListings) ? state.assets.propertyRentalListings : [];
  const activePropertyIds = new Set(listings.filter(listing => ['active', 'rented'].includes(listing.status)).map(listing => listing.propertyInstanceId));
  const availableProperties = properties.filter(property => !activePropertyIds.has(property.id));
  const activeOffers = listings.filter(listing => listing.status === 'active');
  const rentedListings = listings.filter(listing => listing.status === 'rented');
  const closedListings = listings.filter(listing => listing.status === 'closed').slice(-5).reverse();

  container.innerHTML = `
    <div class="personal-subview-box">
      <div class="personal-subview-top">
        <span style="font-size:.86rem;font-weight:800;color:#047857;">Publicar una propiedad en arriendo</span>
        <button type="button" class="personal-subview-back-btn" onclick="renderCorredoraMain()"><span>◀ Volver</span></button>
      </div>
      ${availableProperties.length ? `
        <div style="display:grid;gap:6px;margin-bottom:12px;">
          ${availableProperties.map(property => `
            <article style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 9px;border:1px solid #cbd5e1;border-radius:7px;background:#fff;">
              <div style="min-width:0;"><div style="font-size:.66rem;font-weight:800;color:#0f172a;">${property.icon || '🏠'} ${property.name}</div><div style="font-size:.57rem;color:#64748b;">Valor de arriendo referencial del sector: $${getCorredoraMarketRent(property).toLocaleString('es-CL')}/mes</div></div>
              <button type="button" onclick="openCorredoraRentalModal('${property.id}')" style="flex-shrink:0;padding:7px 10px;border:0;border-radius:5px;background:#047857;color:#fff;font-size:.57rem;font-weight:800;cursor:pointer;">Publicar arriendo</button>
            </article>`).join('')}
        </div>` : '<div style="padding:12px;border:1px solid #e2e8f0;border-radius:7px;background:#f8fafc;color:#64748b;font-size:.64rem;margin-bottom:10px;">No tienes propiedades propias disponibles para publicar en arriendo.</div>'}
      ${activeOffers.length ? `
        <section style="border-top:1px solid #e2e8f0;padding-top:10px;">
          <div style="font-size:.75rem;font-weight:800;color:#0f172a;margin-bottom:7px;">Ofertas de arriendo publicadas</div>
          <div style="display:grid;gap:6px;">
            ${activeOffers.map(listing => `
              <article style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 9px;border:1px solid #a7f3d0;border-radius:7px;background:#f0fdf4;">
                <div style="min-width:0;"><div style="font-size:.63rem;font-weight:800;color:#0f172a;">${listing.propertyName}</div><div style="font-size:.56rem;color:#475569;">Canon publicado: $${Number(listing.askingRent).toLocaleString('es-CL')}/mes · ${Number(listing.elapsedMonths) || 0} ${Number(listing.elapsedMonths) === 1 ? 'mes' : 'meses'} publicada</div></div>
                <div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0;">
                  <button type="button" onclick="openCorredoraRentalModal('${listing.propertyInstanceId}','${listing.id}')" style="padding:6px 8px;border:1px solid #047857;border-radius:5px;background:#fff;color:#047857;font-size:.54rem;font-weight:700;cursor:pointer;">Modificar oferta</button>
                  <button type="button" onclick="cancelCorredoraRentalListing('${listing.id}')" style="padding:6px 8px;border:1px solid #cbd5e1;border-radius:5px;background:#fff;color:#475569;font-size:.54rem;font-weight:700;cursor:pointer;">Retirar oferta</button>
                </div>
              </article>`).join('')}
          </div>
        </section>` : ''}
      ${rentedListings.length ? `
        <section style="border-top:1px solid #e2e8f0;padding-top:10px;margin-top:10px;">
          <div style="font-size:.75rem;font-weight:800;color:#0f172a;margin-bottom:7px;">Propiedades arrendadas</div>
          <div style="display:grid;gap:6px;">
            ${rentedListings.map(listing => `
              <article style="padding:8px 9px;border:1px solid #bbf7d0;border-radius:7px;background:#f0fdf4;">
                <div style="display:flex;justify-content:space-between;gap:8px;font-size:.59rem;color:#334155;"><strong>${listing.propertyName}</strong><span>Arriendo mensual: $${Number(listing.askingRent).toLocaleString('es-CL')}</span></div>
                <div style="margin-top:3px;font-size:.55rem;color:#475569;">Comisión mensual (5%): $${Math.round(Number(listing.askingRent) * 0.05).toLocaleString('es-CL')} · Ingreso neto: <strong>$${Math.round(Number(listing.askingRent) * 0.95).toLocaleString('es-CL')}</strong></div>
                <div style="margin-top:3px;font-size:.53rem;color:#64748b;">Abono en: ${getCorredoraFundingSourceLabel(listing.payoutAccountId)}</div>
                <button type="button" onclick="closeCorredoraRentalContract('${listing.id}')" style="margin-top:6px;padding:5px 8px;border:1px solid #b91c1c;border-radius:5px;background:#fff;color:#b91c1c;font-size:.53rem;font-weight:700;cursor:pointer;">Terminar contrato</button>
              </article>`).join('')}
          </div>
        </section>` : ''}
      ${closedListings.length ? `
        <section style="border-top:1px solid #e2e8f0;padding-top:10px;margin-top:10px;">
          <div style="font-size:.72rem;font-weight:800;color:#475569;margin-bottom:6px;">Arriendos finalizados</div>
          ${closedListings.map(listing => `<div style="padding:5px 7px;font-size:.55rem;color:#64748b;">${listing.propertyName} · Ingresos netos: $${Number(listing.netIncomeTotal || 0).toLocaleString('es-CL')} · Comisión: $${Number(listing.commissionTotal || 0).toLocaleString('es-CL')}</div>`).join('')}
        </section>` : ''}
      <div style="margin-top:8px;font-size:.54rem;line-height:1.35;color:#64748b;">La administración descuenta una comisión del 5% de cada canon mensual. El precio influye en la posibilidad de encontrar arrendatario.</div>
    </div>`;
}

function openCorredoraRentalModal(propertyId, listingId = null) {
  const property = (state.assets.properties || []).find(item => item.id === propertyId);
  const listing = listingId
    ? (state.assets.propertyRentalListings || []).find(item => item.id === listingId && item.status === 'active')
    : null;
  const modalRoot = document.getElementById('banco-modal-root');
  if (!property || !modalRoot || (listingId && !listing)) return;
  const marketRent = getCorredoraMarketRent(property);
  const fundingSources = getCorredoraFundingSources();
  const payoutAccountId = listing?.payoutAccountId || fundingSources[0]?.id || 'cash';

  modalRoot.innerHTML = `
    <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
      <div class="job-modal-card" style="max-width:430px;border-color:#047857;">
        <div class="job-modal-header" style="background:#047857;color:#fff;padding:12px 14px;">
          <div class="job-modal-icon-badge" style="background:rgba(255,255,255,.18);">🔑</div>
          <div><div class="job-modal-title" style="color:#fff;">${listing ? 'Modificar oferta de arriendo' : 'Publicar propiedad en arriendo'}</div><div class="job-modal-subtitle" style="color:#d1fae5;">${property.name}</div></div>
        </div>
        <div class="job-modal-body" style="padding:13px 15px;">
          <div style="font-size:.62rem;color:#475569;margin-bottom:8px;">Valor de arriendo referencial del sector: <strong>$${marketRent.toLocaleString('es-CL')}/mes</strong></div>
          <label for="corredora-rent-price" style="display:block;font-size:.63rem;font-weight:700;color:#334155;margin-bottom:4px;">Canon mensual publicado ($)</label>
          <input id="corredora-rent-price" type="number" min="1" step="10000" value="${listing ? Number(listing.askingRent) : marketRent}" oninput="updateCorredoraRentalPreview('${property.id}')" style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #cbd5e1;border-radius:6px;margin-bottom:8px;">
          <div id="corredora-rent-preview" style="padding:8px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;font-size:.60rem;color:#475569;margin-bottom:9px;"></div>
          <label for="corredora-rent-payout" style="display:block;font-size:.63rem;font-weight:700;color:#334155;margin-bottom:4px;">Abonar ingresos netos en</label>
          <select id="corredora-rent-payout" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;">${fundingSources.map(source => `<option value="${source.id}" ${source.id === payoutAccountId ? 'selected' : ''}>${source.label}</option>`).join('')}</select>
          <div id="corredora-rent-error" style="display:none;margin-top:8px;padding:7px;border:1px solid #fecaca;border-radius:5px;background:#fef2f2;color:#b91c1c;font-size:.6rem;"></div>
          <div style="display:flex;gap:8px;margin-top:12px;">
            <button type="button" onclick="closeBancoModal()" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:6px;background:#f8fafc;">Cancelar</button>
            <button type="button" onclick="publishCorredoraRental('${property.id}','${listing?.id || ''}')" style="flex:1.4;padding:8px;border:0;border-radius:6px;background:#047857;color:#fff;font-weight:800;">${listing ? 'Guardar cambios' : 'Publicar oferta'}</button>
          </div>
        </div>
      </div>
    </div>`;
  updateCorredoraRentalPreview(property.id);
}

function updateCorredoraRentalPreview(propertyId) {
  const property = (state.assets.properties || []).find(item => item.id === propertyId);
  const preview = document.getElementById('corredora-rent-preview');
  if (!property || !preview) return;
  const askingRent = Math.max(0, Number(document.getElementById('corredora-rent-price')?.value) || 0);
  preview.innerHTML = `Comisión de administración (5%): <strong>$${Math.round(askingRent * 0.05).toLocaleString('es-CL')}/mes</strong><br/>Ingreso neto estimado: <strong>$${Math.round(askingRent * 0.95).toLocaleString('es-CL')}/mes</strong><br/>Probabilidad de encontrar arrendatario: <strong>${getCorredoraSaleProbabilityLabel(askingRent, getCorredoraMarketRent(property))}</strong>`;
}

function publishCorredoraRental(propertyId, listingId = '') {
  const property = (state.assets.properties || []).find(item => item.id === propertyId);
  if (!property) return;
  if (!Array.isArray(state.assets.propertyRentalListings)) state.assets.propertyRentalListings = [];
  const existingListing = listingId
    ? state.assets.propertyRentalListings.find(listing => listing.id === listingId && listing.status === 'active')
    : null;
  if (listingId && !existingListing) return;
  if (!existingListing && state.assets.propertyRentalListings.some(listing => listing.propertyInstanceId === property.id && ['active', 'rented'].includes(listing.status))) return;
  const askingRent = Math.round(Number(document.getElementById('corredora-rent-price')?.value) || 0);
  const payoutAccountId = document.getElementById('corredora-rent-payout')?.value || 'cash';
  const error = document.getElementById('corredora-rent-error');
  if (askingRent <= 0) {
    if (error) {
      error.style.display = 'block';
      error.textContent = 'Ingresa un canon mensual mayor que cero.';
    }
    return;
  }

  if (existingListing) {
    existingListing.askingRent = askingRent;
    existingListing.payoutAccountId = payoutAccountId;
  } else {
    state.assets.propertyRentalListings.push({
      id: `rental_listing_${property.id}_${Date.now()}`,
      propertyInstanceId: property.id,
      propertyName: property.name,
      marketRent: getCorredoraMarketRent(property),
      askingRent,
      commissionRate: 0.05,
      payoutAccountId,
      elapsedMonths: 0,
      status: 'active',
      listedDate: { year: Number(state.simulation.year) || 1, month: Number(state.simulation.month) || 0, day: Number(state.simulation.day) || 1 }
    });
  }
  closeBancoModal();
  renderCorredoraRentalManagement();
}

function processDailyCorredoraRentals() {
  if (!Array.isArray(state.assets.propertyRentalListings)) state.assets.propertyRentalListings = [];
  const evaluationDays = [6, 15, 28];
  const day = Number(state.simulation.day) || 1;
  if (!evaluationDays.includes(day)) return;
  const newTenants = [];
  state.assets.propertyRentalListings.forEach(listing => {
    if (listing.status !== 'active') return;
    const evaluationKey = `${Number(state.simulation.year) || 1}-${Number(state.simulation.month) || 0}-${day}`;
    if (listing.lastEvaluationDate === evaluationKey) return;
    listing.lastEvaluationDate = evaluationKey;
    const property = (state.assets.properties || []).find(item => item.id === listing.propertyInstanceId);
    if (!property) {
      listing.status = 'closed';
      return;
    }
    const listedDate = listing.listedDate || {};
    listing.elapsedMonths = Math.max(0, ((Number(state.simulation.year) - (Number(listedDate.year) || 1)) * 12)
      + Number(state.simulation.month) - (Number(listedDate.month) || 0));
    if (Math.random() >= getCorredoraSaleProbability(listing.askingRent, listing.marketRent)) return;
    listing.status = 'rented';
    listing.tenantStartDate = { year: Number(state.simulation.year) || 1, month: Number(state.simulation.month) || 0, day };
    listing.nextRentMonthIndex = getCorredoraMonthIndex(state.simulation.year, state.simulation.month) + 1;
    listing.monthsPaid = 0;
    listing.netIncomeTotal = 0;
    listing.commissionTotal = 0;
    newTenants.push(listing.propertyName);
  });
  if (newTenants.length && typeof alertUpcomingBankFeature === 'function') {
    alertUpcomingBankFeature(newTenants.length === 1 ? '¡Propiedad arrendada!' : '¡Propiedades arrendadas!', newTenants.map(name => `${name} encontró arrendatario.`).join('<br/>'));
  }
  if (newTenants.length && state.interface.activeHudTab === 'corredora') renderCorredoraRentalManagement();
}

function processMonthlyCorredoraRentals() {
  if (!Array.isArray(state.assets.propertyRentalListings)) return;
  const monthIndex = getCorredoraMonthIndex(state.simulation.year, state.simulation.month);
  state.assets.propertyRentalListings.forEach(listing => {
    if (listing.status !== 'rented' || monthIndex < Number(listing.nextRentMonthIndex)) return;
    const grossRent = Math.max(0, Math.round(Number(listing.askingRent) || 0));
    const commission = Math.round(grossRent * 0.05);
    const netRent = grossRent - commission;
    const account = (state.finances.bankAccounts || []).find(item => item.id === listing.payoutAccountId && item.type !== 'credit');
    const depositDetail = `Arriendo mensual recibido: ${listing.propertyName}`;
    const commissionDetail = `Comisión corredora (5%): ${listing.propertyName}`;

    if (listing.payoutAccountId === 'cash' || !account) {
      withFinancialMovementDetail(depositDetail, () => { state.finances.cash = (Number(state.finances.cash) || 0) + grossRent; });
      withFinancialMovementDetail(commissionDetail, () => { state.finances.cash = Math.max(0, (Number(state.finances.cash) || 0) - commission); });
    } else {
      withFinancialMovementDetail(depositDetail, () => creditBankAccount(account.id, grossRent));
      withFinancialMovementDetail(commissionDetail, () => debitBankAccountWithCreditLine(account.id, commission));
    }
    listing.monthsPaid = (Number(listing.monthsPaid) || 0) + 1;
    listing.netIncomeTotal = (Number(listing.netIncomeTotal) || 0) + netRent;
    listing.commissionTotal = (Number(listing.commissionTotal) || 0) + commission;
    if (!Array.isArray(listing.rentPaymentHistory)) listing.rentPaymentHistory = [];
    listing.rentPaymentHistory.push({
      year: Number(state.simulation.year) || 1,
      month: Number(state.simulation.month) || 0,
      day: Number(state.simulation.day) || 1,
      amount: netRent
    });
    listing.nextRentMonthIndex = monthIndex + 1;
  });
  if (state.interface.activeHudTab === 'corredora') renderCorredoraRentalManagement();
  if (typeof updateHUD === 'function') updateHUD();
}

function cancelCorredoraRentalListing(listingId) {
  const listing = (state.assets.propertyRentalListings || []).find(item => item.id === listingId && item.status === 'active');
  if (!listing) return;
  listing.status = 'withdrawn';
  listing.withdrawnDate = { year: Number(state.simulation.year) || 1, month: Number(state.simulation.month) || 0, day: Number(state.simulation.day) || 1 };
  renderCorredoraRentalManagement();
}

function closeCorredoraRentalContract(listingId) {
  const listing = (state.assets.propertyRentalListings || []).find(item => item.id === listingId && item.status === 'rented');
  if (!listing || !window.confirm(`¿Terminar el arriendo de ${listing.propertyName}?`)) return;
  listing.status = 'closed';
  listing.closedDate = { year: Number(state.simulation.year) || 1, month: Number(state.simulation.month) || 0, day: Number(state.simulation.day) || 1 };
  renderCorredoraRentalManagement();
}

function openCorredoraTransactionModal(propertyId, transactionType, returnMode = 'venta') {
  const property = corredoraHousingCatalog.find(item => item.id === propertyId);
  const modalRoot = document.getElementById('banco-modal-root');
  if (!property || !modalRoot || !['compra', 'arriendo'].includes(transactionType)) return;

  const isPurchase = transactionType === 'compra';
  const today = {
    year: Number(state.simulation.year) || 1,
    month: Number(state.simulation.month) || 0,
    day: Number(state.simulation.day) || 1
  };
  const monthLength = getCorredoraMonthLength(today.year, today.month);
  const initialProratedRent = isPurchase
    ? 0
    : Math.round(property.monthlyRent * (monthLength - today.day + 1) / monthLength);
  const amount = isPurchase ? property.value : property.monthlyRent + initialProratedRent;
  const fundingSources = getCorredoraFundingSources();
  const accounts = (state.finances.bankAccounts || []).filter(account => account.type !== 'credit');
  const defaultSource = fundingSources.find(source => {
    if (source.id === 'cash') return (Number(state.finances.cash) || 0) >= amount;
    const account = accounts.find(item => item.id === source.id);
    return (Number(account?.balance) || 0) >= amount;
  }) || fundingSources[0];
  const title = isPurchase ? 'Comprar propiedad' : 'Arrendar propiedad';

  modalRoot.innerHTML = `
    <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
      <div class="job-modal-card" style="max-width:420px;border-color:${isPurchase ? '#0369a1' : '#047857'};">
        <div class="job-modal-header" style="background:${isPurchase ? '#0369a1' : '#047857'};color:#fff;padding:12px 14px;">
          <div class="job-modal-icon-badge" style="background:rgba(255,255,255,.18);">${isPurchase ? '🏷️' : '🔑'}</div>
          <div><div class="job-modal-title" style="color:#fff;">${title}</div><div class="job-modal-subtitle" style="color:#e0f2fe;">${property.name}</div></div>
        </div>
        <div class="job-modal-body" style="padding:13px 15px;">
          <div style="margin-bottom:10px;font-size:.68rem;color:#334155;">${isPurchase ? `Precio: <strong>${property.priceUF.toLocaleString('es-CL')} UF ($${property.value.toLocaleString('es-CL')} aprox.)</strong>` : `Mes de garantía: <strong>$${property.monthlyRent.toLocaleString('es-CL')}</strong><br/>Arriendo proporcional hasta fin de mes: <strong>$${initialProratedRent.toLocaleString('es-CL')}</strong><br/>Total inicial: <strong>$${amount.toLocaleString('es-CL')}</strong>`}</div>
          <label for="corredora-funding-source" style="display:block;font-size:.64rem;font-weight:700;color:#334155;margin-bottom:4px;">Pagar desde</label>
          <select id="corredora-funding-source" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;">
            ${fundingSources.map(source => `<option value="${source.id}" ${source.id === defaultSource.id ? 'selected' : ''}>${source.label}</option>`).join('')}
          </select>
          <div id="corredora-transaction-error" style="display:none;margin-top:8px;padding:7px 9px;border:1px solid #fecaca;border-radius:6px;background:#fef2f2;color:#b91c1c;font-size:.60rem;font-weight:700;"></div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;">
            <button type="button" onclick="closeBancoModal()" style="flex:1;min-width:90px;padding:8px;border:1px solid #cbd5e1;border-radius:6px;background:#f8fafc;font-weight:700;">Cancelar</button>
            <button type="button" onclick="confirmCorredoraTransaction('${property.id}','${transactionType}','${returnMode}')" style="flex:1.3;min-width:130px;padding:8px;border:0;border-radius:6px;background:#0369a1;color:#fff;font-weight:800;">${isPurchase ? 'Comprar al contado' : 'Confirmar arriendo'}</button>
            ${isPurchase ? `<button type="button" onclick="openCorredoraMortgage('${property.id}')" style="flex:1 0 100%;padding:8px;border:1px solid #0369a1;border-radius:6px;background:#fff;color:#0369a1;font-weight:800;">Pedir crédito hipotecario</button>` : ''}
          </div>
        </div>
      </div>
    </div>`;
}

function confirmCorredoraTransaction(propertyId, transactionType, returnMode = 'venta') {
  const property = corredoraHousingCatalog.find(item => item.id === propertyId);
  const sourceId = document.getElementById('corredora-funding-source')?.value || 'cash';
  const errorEl = document.getElementById('corredora-transaction-error');
  if (!property || !['compra', 'arriendo'].includes(transactionType)) return;

  const date = {
    year: Number(state.simulation.year) || 1,
    month: Number(state.simulation.month) || 0,
    day: Number(state.simulation.day) || 1
  };
  const initialProratedRent = transactionType === 'arriendo'
    ? Math.round(property.monthlyRent * (getCorredoraMonthLength(date.year, date.month) - date.day + 1) / getCorredoraMonthLength(date.year, date.month))
    : 0;
  const amount = transactionType === 'compra' ? property.value : property.monthlyRent + initialProratedRent;
  const account = sourceId === 'cash'
    ? null
    : (state.finances.bankAccounts || []).find(item => item.id === sourceId && item.type !== 'credit');
  const available = sourceId === 'cash'
    ? Number(state.finances.cash) || 0
    : account ? getBankAccountSpendableBalance(account.id) : 0;
  if (available < amount || (sourceId !== 'cash' && !account)) {
    if (errorEl) {
      errorEl.style.display = 'block';
      errorEl.textContent = `Saldo insuficiente. Se requieren $${amount.toLocaleString('es-CL')} en la fuente seleccionada.`;
    }
    return;
  }

  const movementDetail = transactionType === 'compra'
    ? `Compra de propiedad: ${property.name}`
    : `Pago de garantía y arriendo inicial: ${property.name}`;
  withFinancialMovementDetail(movementDetail, () => {
    if (sourceId === 'cash') state.finances.cash = available - amount;
    else debitBankAccountWithCreditLine(account.id, amount);
  });

  if (transactionType === 'compra') {
    if (!Array.isArray(state.assets.properties)) state.assets.properties = [];
    state.assets.properties.push({
      id: `corredora_${property.id}_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      catalogId: property.id,
      name: property.name,
      sub: property.preferenceName,
      icon: property.icon,
      value: property.value,
      priceUF: property.priceUF,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      landArea: property.landArea || null,
      purchaseDate: date
    });
  } else {
    if (!Array.isArray(state.assets.rentedProperties)) state.assets.rentedProperties = [];
    state.assets.rentedProperties.push({
      id: `arriendo_${property.id}_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      catalogId: property.id,
      name: property.name,
      monthlyRent: property.monthlyRent,
      securityDeposit: property.monthlyRent,
      paymentSourceId: sourceId,
      startDate: date,
      startMonthIndex: getCorredoraMonthIndex(date.year, date.month),
      lastRentChargedMonthIndex: getCorredoraMonthIndex(date.year, date.month),
      initialRentPrepaid: initialProratedRent,
      unpaidRent: 0,
      active: true
    });
  }

  closeBancoModal();
  renderCorredoraStage(returnMode);
  if (typeof updateHUD === 'function') updateHUD();
}

function openCorredoraMortgage(propertyId) {
  closeBancoModal();
  selectHudTab('banco');
  renderBancoStage('credito_hipotecario', propertyId);
}

function getCorredoraDepositRefundPercent(wellbeingPercent) {
  const wellbeing = Math.max(0, Math.min(100, Number(wellbeingPercent) || 0));
  const points = [[0, 0], [10, 40], [40, 80], [49, 98], [50, 100]];
  if (wellbeing >= 50) return 100;
  for (let index = 1; index < points.length; index += 1) {
    const [upperWellbeing, upperRefund] = points[index];
    const [lowerWellbeing, lowerRefund] = points[index - 1];
    if (wellbeing <= upperWellbeing) {
      return lowerRefund + ((wellbeing - lowerWellbeing) / (upperWellbeing - lowerWellbeing)) * (upperRefund - lowerRefund);
    }
  }
  return 100;
}

function chargeCorredoraSource(sourceId, amount, detail = 'Pago de arriendo') {
  const charge = Math.max(0, Math.round(Number(amount) || 0));
  if (sourceId === 'cash') {
    const available = Number(state.finances.cash) || 0;
    const paid = Math.min(available, charge);
    withFinancialMovementDetail(detail, () => { state.finances.cash = available - paid; });
    return paid;
  }
  const account = (state.finances.bankAccounts || []).find(item => item.id === sourceId && item.type !== 'credit');
  if (!account) return 0;
  const available = Number(account.balance) || 0;
  const paid = Math.min(available, charge);
  withFinancialMovementDetail(detail, () => { account.balance = available - paid; });
  return paid;
}

function creditCorredoraSource(sourceId, amount, detail = 'Abono de arriendo') {
  const credit = Math.max(0, Math.round(Number(amount) || 0));
  if (sourceId === 'cash') {
    withFinancialMovementDetail(detail, () => { state.finances.cash = (Number(state.finances.cash) || 0) + credit; });
    return;
  }
  const account = (state.finances.bankAccounts || []).find(item => item.id === sourceId && item.type !== 'credit');
  if (account) withFinancialMovementDetail(detail, () => { account.balance = (Number(account.balance) || 0) + credit; });
  else withFinancialMovementDetail(detail, () => { state.finances.cash = (Number(state.finances.cash) || 0) + credit; });
}

function processMonthlyCorredoraPayments() {
  if (!Array.isArray(state.assets.rentedProperties)) state.assets.rentedProperties = [];
  const previousMonthIndex = getCorredoraMonthIndex(state.simulation.year, state.simulation.month) - 1;
  if (previousMonthIndex < 0) return;
  const year = Math.floor(previousMonthIndex / 12) + 1;
  const month = previousMonthIndex % 12;

  state.assets.rentedProperties.forEach(rental => {
    if (!rental.active || previousMonthIndex <= Number(rental.lastRentChargedMonthIndex ?? rental.startMonthIndex ?? -1)) return;
    const due = getCorredoraProratedRent(rental, year, month, getCorredoraMonthLength(year, month))
      + (Number(rental.unpaidRent) || 0);
    const paid = chargeCorredoraSource(rental.paymentSourceId, due, `Pago de arriendo: ${rental.name}`);
    rental.unpaidRent = Math.max(0, due - paid);
    rental.lastRentChargedMonthIndex = previousMonthIndex;
  });
  if (state.interface.activeHudTab === 'corredora') renderCorredoraMain();
}

function endCorredoraRental(rentalId, returnMode = 'main') {
  const rental = (state.assets.rentedProperties || []).find(item => item.id === rentalId && item.active);
  if (!rental || !window.confirm(`¿Terminar el arriendo de ${rental.name}?`)) return;
  const endDate = {
    year: Number(state.simulation.year) || 1,
    month: Number(state.simulation.month) || 0,
    day: Number(state.simulation.day) || 1
  };
  const endMonthIndex = getCorredoraMonthIndex(endDate.year, endDate.month);
  const endMonthLength = getCorredoraMonthLength(endDate.year, endDate.month);
  let finalRent = 0;
  let prepaidAdjustment = 0;
  if (endMonthIndex === Number(rental.startMonthIndex)) {
    const occupiedRent = getCorredoraProratedRent(rental, endDate.year, endDate.month, endDate.day);
    prepaidAdjustment = Math.max(0, (Number(rental.initialRentPrepaid) || 0) - occupiedRent);
  } else if (endMonthIndex > Number(rental.lastRentChargedMonthIndex ?? rental.startMonthIndex)) {
    finalRent = getCorredoraProratedRent(rental, endDate.year, endDate.month, endDate.day);
  }

  const pendingRent = Number(rental.unpaidRent) || 0;
  const finalRentPaid = chargeCorredoraSource(rental.paymentSourceId, finalRent + pendingRent, `Arriendo proporcional de salida: ${rental.name}`);
  const remainingRentDue = Math.max(0, finalRent + pendingRent - finalRentPaid);
  const wellbeing = Math.max(0, Math.min(100, Number(state.wellbeing.mentalPeace) || 0));
  const refundPercent = getCorredoraDepositRefundPercent(wellbeing);
  const depositRefund = Math.round((Number(rental.securityDeposit) || 0) * refundPercent / 100);
  creditCorredoraSource(rental.paymentSourceId, depositRefund, `Devolución de mes de garantía: ${rental.name}`);
  creditCorredoraSource(rental.paymentSourceId, prepaidAdjustment, `Devolución de arriendo prepagado: ${rental.name}`);

  rental.active = false;
  rental.endDate = endDate;
  rental.depositRefund = depositRefund;
  rental.depositRefundPercent = refundPercent;
  rental.finalRentDue = remainingRentDue;
  rental.unpaidRent = remainingRentDue;
  if (returnMode === 'main') renderCorredoraMain();
  else renderCorredoraStage(returnMode);
  if (typeof updateHUD === 'function') updateHUD();
  if (typeof alertUpcomingBankFeature === 'function') {
    const depositDeduction = Math.max(0, (Number(rental.securityDeposit) || 0) - depositRefund);
    const refundMessage = `Garantía devuelta: $${depositRefund.toLocaleString('es-CL')}.`;
    const damageMessage = depositDeduction > 0
      ? ` Descontado por daños en la propiedad: $${depositDeduction.toLocaleString('es-CL')}.`
      : '';
    alertUpcomingBankFeature('Arriendo terminado', `${refundMessage}${damageMessage}`);
  }
}