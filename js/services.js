"use strict";

/* ==========================================================
   GARVOX — Services Page Script
   Handles:
   - Services page dynamic enhancements
   - Material panels from config when mount exists
   - Style gallery from config when mount exists
   - Provider matrix from config when mount exists
   ========================================================== */

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing on services page.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initServicesPage);

    function initServicesPage() {
        renderDynamicStyleGallery();
        renderDynamicMaterialPanels();
        renderProviderMatrix();
    }

    /* ========================================================
       STYLE GALLERY
       Optional dynamic renderer.
       If HTML already contains static cards, this will not force-replace
       unless the mount has data-render-style-gallery.
       ======================================================== */

    function renderDynamicStyleGallery() {
        const mount = document.querySelector("[data-render-style-gallery]");
        const items = config.servicesPage && config.servicesPage.styleGallery;

        if (!mount || !Array.isArray(items)) return;

        mount.innerHTML = items
            .map((item) => {
                return `
          <article class="style-card red-scan-card">
            <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.title)} garage door">
            <span class="red-scan-card__line" aria-hidden="true"></span>
            <span class="style-card__overlay" aria-hidden="true"></span>

            <div class="style-card__content">
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>
            </div>
          </article>
        `;
            })
            .join("");
    }

    /* ========================================================
       MATERIAL PANELS
       Optional dynamic renderer.
       If HTML already contains static panels, this will not force-replace
       unless the mount has data-render-material-panels.
       ======================================================== */

    function renderDynamicMaterialPanels() {
        const mount = document.querySelector("[data-render-material-panels]");
        const materials = config.materials;

        if (!mount || !Array.isArray(materials)) return;

        mount.innerHTML = materials
            .map((item, index) => {
                return `
          <article class="material-panel red-scan-card">
            <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.title)} garage door texture">
            <span class="red-scan-card__line" aria-hidden="true"></span>

            <div class="material-panel__content">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>

              <ul>
                ${item.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
              </ul>
            </div>
          </article>
        `;
            })
            .join("");
    }

    /* ========================================================
       PROVIDER MATRIX
       Optional dynamic renderer.
       Use this with:
       <div data-provider-matrix></div>
       ======================================================== */

    function renderProviderMatrix() {
        const mount = document.querySelector("[data-provider-matrix]");
        const matrix = config.servicesPage && config.servicesPage.providerMatrix;

        if (!mount || !matrix) return;

        mount.innerHTML = `
      <div class="provider-matrix" role="table" aria-label="${escapeAttr(matrix.title)}">
        <div class="provider-matrix__row provider-matrix__row--head" role="row">
          ${matrix.columns.map((column) => {
            return `<div role="columnheader">${escapeHtml(column)}</div>`;
        }).join("")}
        </div>

        ${matrix.rows.map((row) => {
            return `
            <div class="provider-matrix__row" role="row">
              <div role="cell">${escapeHtml(row.project)}</div>
              <div role="cell">${escapeHtml(row.ask)}</div>
              <div role="cell">${escapeHtml(row.compare)}</div>
            </div>
          `;
        }).join("")}
      </div>
    `;
    }

    /* ========================================================
       HELPERS
       ======================================================== */

    function escapeHtml(value) {
        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function escapeAttr(value) {
        return escapeHtml(value).replace(/`/g, "&#096;");
    }
})();