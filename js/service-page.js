"use strict";


(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing on service page.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initServicePage);

    function initServicePage() {
        syncCurrentServiceData();
        initDoorTabs();
        initSoundSelector();
        renderOptionalServiceData();
        verifyServicePageRules();
    }


    function getCurrentServiceId() {
        return document.body.getAttribute("data-service-id") || "";
    }

    function getCurrentService() {
        const id = getCurrentServiceId();

        if (!id) return null;

        return config.services.find((service) => service.id === id) || null;
    }

    function syncCurrentServiceData() {
        const service = getCurrentService();

        if (!service) {
            console.warn("No matching service found for this page.");
            return;
        }

        setText("[data-current-service-title]", service.title);
        setText("[data-current-service-short-title]", service.shortTitle);
        setText("[data-current-service-summary]", service.summary);
        setText("[data-current-service-intro]", service.pageIntro);

        document.querySelectorAll("[data-current-service-link]").forEach((link) => {
            link.setAttribute("href", service.href);
        });

        document.querySelectorAll("[data-current-service-image]").forEach((image) => {
            image.setAttribute("src", service.image);
            image.setAttribute("alt", service.title);
        });
    }


    function initDoorTabs() {
        document.querySelectorAll("[data-door-tabs]").forEach((tabsRoot) => {
            const nav = tabsRoot.querySelector(".door-tabs__nav");
            const panels = Array.from(tabsRoot.querySelectorAll("[data-door-tabs-panel]"));
            const panel = panels[0] || null;
            const buttons = Array.from(tabsRoot.querySelectorAll("[data-tab-target]"));

            if (!nav || !panel || !buttons.length) return;

            if (panels.length > 1) {
                bindStaticDoorTabButtons(buttons, panels);
                return;
            }

            if (!Array.isArray(config.doorTabs) || !config.doorTabs.length) return;

            renderDoorTabPanel(panel, config.doorTabs[0]);
            bindDoorTabButtons(tabsRoot, panel);
        });
    }

    function bindDoorTabButtons(tabsRoot, panel) {
        const buttons = Array.from(tabsRoot.querySelectorAll("[data-tab-target]"));

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const targetId = button.getAttribute("data-tab-target");
                const tabData = config.doorTabs.find((tab) => tab.id === targetId);

                if (!tabData) return;

                activateDoorTab(buttons, button);
                renderDoorTabPanel(panel, tabData);
            });

            button.addEventListener("keydown", (event) => {
                if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;

                event.preventDefault();

                const currentIndex = buttons.indexOf(button);
                let nextIndex = currentIndex;

                if (event.key === "ArrowRight") {
                    nextIndex = currentIndex + 1 >= buttons.length ? 0 : currentIndex + 1;
                }

                if (event.key === "ArrowLeft") {
                    nextIndex = currentIndex - 1 < 0 ? buttons.length - 1 : currentIndex - 1;
                }

                if (event.key === "Home") {
                    nextIndex = 0;
                }

                if (event.key === "End") {
                    nextIndex = buttons.length - 1;
                }

                buttons[nextIndex].focus();
                buttons[nextIndex].click();
            });
        });
    }

    function bindStaticDoorTabButtons(buttons, panels) {
        const getPanelId = (button) => {
            return button.getAttribute("aria-controls") || `tab-panel-${button.getAttribute("data-tab-target") || ""}`;
        };

        const showPanel = (panelId) => {
            const fallbackId = panels[0] ? panels[0].id : "";
            const activeId = panels.some((panel) => panel.id === panelId) ? panelId : fallbackId;

            panels.forEach((panel) => {
                panel.hidden = panel.id !== activeId;
            });
        };

        const initialActive =
            buttons.find((button) => button.getAttribute("aria-selected") === "true") ||
            buttons.find((button) => button.classList.contains("is-active")) ||
            buttons[0];

        if (initialActive) {
            activateDoorTab(buttons, initialActive);
            showPanel(getPanelId(initialActive));
        }

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                activateDoorTab(buttons, button);
                showPanel(getPanelId(button));
            });

            button.addEventListener("keydown", (event) => {
                if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;

                event.preventDefault();

                const currentIndex = buttons.indexOf(button);
                let nextIndex = currentIndex;

                if (event.key === "ArrowRight") {
                    nextIndex = currentIndex + 1 >= buttons.length ? 0 : currentIndex + 1;
                }

                if (event.key === "ArrowLeft") {
                    nextIndex = currentIndex - 1 < 0 ? buttons.length - 1 : currentIndex - 1;
                }

                if (event.key === "Home") {
                    nextIndex = 0;
                }

                if (event.key === "End") {
                    nextIndex = buttons.length - 1;
                }

                buttons[nextIndex].focus();
                buttons[nextIndex].click();
            });
        });
    }

    function activateDoorTab(buttons, activeButton) {
        buttons.forEach((button) => {
            const isActive = button === activeButton;

            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-selected", String(isActive));
            button.setAttribute("tabindex", isActive ? "0" : "-1");
        });
    }

    function renderDoorTabPanel(panel, tabData) {
        const panelId = `tab-panel-${tabData.id}`;
        const tabId = `tab-${tabData.id}`;

        panel.id = panelId;
        panel.setAttribute("aria-labelledby", tabId);

        panel.innerHTML = `
      <div class="door-tabs__media red-scan-card">
        <img src="${escapeAttr(tabData.image)}" alt="${escapeAttr(tabData.title)}">
        <span class="red-scan-card__line" aria-hidden="true"></span>
      </div>

      <div class="door-tabs__content">
        <span class="eyebrow">${escapeHtml(tabData.label)}</span>

        <h3>${escapeHtml(tabData.title)}</h3>

        <p>${escapeHtml(tabData.text)}</p>

        <h4>What to compare</h4>

        <ul>
          ${tabData.compare.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>
    `;
    }


    function initSoundSelector() {
        document.querySelectorAll("[data-sound-selector]").forEach((selectorRoot) => {
            const panel = selectorRoot.querySelector("[data-sound-panel]");
            const buttons = Array.from(selectorRoot.querySelectorAll("[data-sound-target]"));

            if (!panel || !buttons.length || !config.soundSelector) return;

            renderSoundPanel(panel, config.soundSelector.options[0]);
            bindSoundButtons(buttons, panel);
        });
    }

    function bindSoundButtons(buttons, panel) {
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const targetId = button.getAttribute("data-sound-target");
                const option = config.soundSelector.options.find((item) => item.id === targetId);

                if (!option) return;

                activateSoundButton(buttons, button);
                renderSoundPanel(panel, option);
            });

            button.addEventListener("keydown", (event) => {
                if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;

                event.preventDefault();

                const currentIndex = buttons.indexOf(button);
                let nextIndex = currentIndex;

                if (event.key === "ArrowRight") {
                    nextIndex = currentIndex + 1 >= buttons.length ? 0 : currentIndex + 1;
                }

                if (event.key === "ArrowLeft") {
                    nextIndex = currentIndex - 1 < 0 ? buttons.length - 1 : currentIndex - 1;
                }

                if (event.key === "Home") {
                    nextIndex = 0;
                }

                if (event.key === "End") {
                    nextIndex = buttons.length - 1;
                }

                buttons[nextIndex].focus();
                buttons[nextIndex].click();
            });
        });
    }

    function activateSoundButton(buttons, activeButton) {
        buttons.forEach((button) => {
            const isActive = button === activeButton;

            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-selected", String(isActive));
            button.setAttribute("tabindex", isActive ? "0" : "-1");
        });
    }

    function renderSoundPanel(panel, option) {
        const panelId = `sound-panel-${option.id}`;
        const tabId = `sound-tab-${option.id}`;

        panel.id = panelId;
        panel.setAttribute("aria-labelledby", tabId);

        panel.innerHTML = `
      <span class="sound-selector__meter" aria-hidden="true">
        <i></i>
      </span>

      <h3>${escapeHtml(option.title)}</h3>

      <p>${escapeHtml(option.text)}</p>

      <ul>
        ${option.compare.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    `;
    }


    function renderOptionalServiceData() {
        const service = getCurrentService();

        if (!service) return;

        renderEvaluationPoints(service);
        renderServiceQuestions(service);
    }

    function renderEvaluationPoints(service) {
        document.querySelectorAll("[data-service-evaluation-points]").forEach((mount) => {
            if (!Array.isArray(service.evaluationPoints)) return;

            mount.innerHTML = service.evaluationPoints
                .map((point, index) => {
                    return `
            <article class="editorial-item">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <h3>${escapeHtml(point)}</h3>
              <p>Compare this detail directly with providers before choosing.</p>
            </article>
          `;
                })
                .join("");
        });
    }

    function renderServiceQuestions(service) {
        document.querySelectorAll("[data-service-questions]").forEach((mount) => {
            if (!Array.isArray(service.questions)) return;

            mount.innerHTML = service.questions
                .map((question, index) => {
                    return `
            <article class="question-card">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <h3>${escapeHtml(question)}</h3>
              <p>
                Ask this directly when comparing independent provider options for ${escapeHtml(service.shortTitle.toLowerCase())}.
              </p>
            </article>
          `;
                })
                .join("");
        });
    }


    function verifyServicePageRules() {
        const serviceId = getCurrentServiceId();

        if (!serviceId) {
            console.warn("Service page is missing data-service-id.");
        }

        const form = document.querySelector("form");

        if (form) {
            console.warn("GARVOX QA: service pages should not include contact forms. Form found:", form);
        }

        const mapSelectors = [
            "[data-map]",
            ".map",
            ".map-section",
            ".contact-map",
            ".location-map",
            "iframe[src*='google.com/maps']",
            "iframe[src*='maps.google']"
        ];

        mapSelectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((element) => {
                element.remove();
                console.warn("GARVOX QA: map element removed because maps are not allowed.");
            });
        });

        const serviceLinks = document.querySelectorAll(".site-footer a[href*='garage-door-'], .services-dropdown__card, .mobile-service-link");
        const knownServices = new Set(config.services.map((service) => service.href));

        serviceLinks.forEach((link) => {
            const href = link.getAttribute("href");

            if (href && href.includes("garage-door-") && !knownServices.has(href)) {
                console.warn("GARVOX QA: possible extra service link found:", href);
            }
        });
    }


    function setText(selector, value) {
        if (!value) return;

        document.querySelectorAll(selector).forEach((node) => {
            node.textContent = value;
        });
    }

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
