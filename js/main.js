"use strict";


(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing. Make sure /js/config.js loads before /js/main.js.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initSite);

  function initSite() {
    ensureSharedMounts();

    applyPageMeta();
    renderHeader();
    moveMobileMenuToBody();
    renderFooter();

    injectDynamicContent();
    renderQuickNavs();
    renderServiceCards();
    renderFaqBlocks();
    renderFaqSchema();
    renderPolicyBanner();
    renderRedLineCtas();
    renderUrgencyStrips();

    replaceHardcodedCompanyData();
    replaceLegacySiteData();

    initHeaderDropdown();
    initMobileMenu();
    initFaqAccordions();
    initForms();
    initInteractiveCards();
    initAnchorLinks();

    preventEmptyLinks();
    preventHorizontalScrollIssues();

    document.documentElement.classList.add("site-ready");
  }


    function ensureSharedMounts() {
        if (!document.querySelector("[data-site-header]")) {
            const headerMount = document.createElement("div");
            headerMount.setAttribute("data-site-header", "");
            document.body.insertBefore(headerMount, document.body.firstChild);
        }

        if (!document.querySelector("[data-site-footer]")) {
            const footerMount = document.createElement("div");
            footerMount.setAttribute("data-site-footer", "");
            document.body.appendChild(footerMount);
        }

        if (!document.querySelector("[data-policy-banner]")) {
            const policyMount = document.createElement("div");
            policyMount.setAttribute("data-policy-banner", "");
            document.body.appendChild(policyMount);
        }
    }


    function applyPageMeta() {
        const page = getCurrentPage();
        const meta = config.pageMeta && config.pageMeta[page];

        if (!meta) {
            console.warn("No pageMeta found for:", page);
            return;
        }

        if (meta.title) {
            document.title = meta.title;
        }

        if (meta.description) {
            let description = document.querySelector('meta[name="description"]');

            if (!description) {
                description = document.createElement("meta");
                description.setAttribute("name", "description");
                document.head.appendChild(description);
            }

            description.setAttribute("content", meta.description);
        }
    }

    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf("/") + 1);
        return filename || "index.html";
    }


    function renderHeader() {
        const mount = document.querySelector("[data-site-header]");
        if (!mount) return;

        const navHtml = config.navigation
            .map((item) => {
                if (item.hasDropdown) {
                    return `
            <div class="site-nav__item site-nav__item--dropdown" data-services-dropdown>
              <a class="site-nav__link" href="${escapeAttr(item.href)}" data-dropdown-trigger aria-haspopup="true" aria-expanded="false">
                ${escapeHtml(item.label)}
                <span class="site-nav__chevron" aria-hidden="true">${iconSvg("chevron-down")}</span>
              </a>

              <div class="services-dropdown" data-dropdown-panel role="menu">
  <div class="services-dropdown__inner services-dropdown__inner--simple">
    <div class="services-dropdown__list">
      ${config.services.map(renderDropdownService).join("")}
    </div>
  </div>
</div>
            </div>
          `;
                }

                return `
          <a class="site-nav__link" href="${escapeAttr(item.href)}">
            ${escapeHtml(item.label)}
          </a>
        `;
            })
            .join("");

        mount.innerHTML = `
      <header class="site-header" data-header>
        <a class="skip-link" href="#main">Skip to content</a>

        <div class="site-header__bar">
          <div class="container-wide site-header__inner">
            <a class="brand-logo" href="index.html" aria-label="${escapeAttr(config.brand.logoLabel)}">
              <span class="brand-logo__mark" aria-hidden="true">
                <img src="${escapeAttr(config.assets.logoBearing)}" alt="">
              </span>
              <span class="brand-logo__text">${escapeHtml(config.brand.logoText)}</span>
            </a>

            <nav class="site-nav" aria-label="Primary navigation">
              ${navHtml}
            </nav>

            <div class="site-header__actions">
              <a class="header-phone header-phone--mobile" href="${escapeAttr(config.phoneHref)}" data-phone-link>
                <span aria-hidden="true">${iconSvg("phone")}</span>
                <span data-phone-text>${escapeHtml(config.phoneLabel)}</span>
              </a>

              <a class="btn btn--ghost site-header__email" href="${escapeAttr(config.emailHref)}" data-email-link>
                <span aria-hidden="true">${iconSvg("mail")}</span>
                <span>${escapeHtml(config.emailLabel)}</span>
              </a>

              <a class="btn btn--accent site-header__call" href="${escapeAttr(config.phoneHref)}" data-phone-link>
                <span aria-hidden="true">${iconSvg("phone")}</span>
                <span data-phone-text>${escapeHtml(config.phoneLabel)}</span>
              </a>

              <button class="menu-toggle" type="button" aria-label="Open menu" aria-controls="mobileMenu" aria-expanded="false" data-menu-open>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>

        ${renderMobileMenu()}
      </header>
    `;

        markActiveNavLinks();
    }

  function moveMobileMenuToBody() {
    const menu = document.querySelector("[data-mobile-menu]");

    if (!menu) return;

    document.body.appendChild(menu);
  }

  function renderDropdownService(service) {
    return `
      <a class="services-dropdown__link" href="${escapeAttr(service.href)}" role="menuitem">
        <span class="services-dropdown__link-icon" aria-hidden="true">
          ${iconSvg(service.icon)}
        </span>

        <span class="services-dropdown__link-text">
          ${escapeHtml(service.title)}
        </span>

        <span class="services-dropdown__link-arrow" aria-hidden="true">
          ${iconSvg("arrow-right")}
        </span>
      </a>
    `;
  }

    function renderMobileMenu() {
        const mainLinks = config.navigation
            .map((item) => {
                return `
          <a class="mobile-menu__link" href="${escapeAttr(item.href)}">
            <span>${escapeHtml(item.label)}</span>
            <span aria-hidden="true">${iconSvg("arrow-right")}</span>
          </a>
        `;
            })
            .join("");

        const serviceLinks = config.services
            .map((service) => {
                return `
          <a class="mobile-service-link" href="${escapeAttr(service.href)}">
            <span class="mobile-service-link__icon" aria-hidden="true">${iconSvg(service.icon)}</span>
            <span>
              <strong>${escapeHtml(service.title)}</strong>
              <em>${escapeHtml(service.cardText)}</em>
            </span>
          </a>
        `;
            })
            .join("");

        return `
      <aside class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation" hidden inert data-mobile-menu>
        <div class="mobile-menu__panel">
          <div class="mobile-menu__top">
            <a class="brand-logo" href="index.html" aria-label="${escapeAttr(config.brand.logoLabel)}">
              <span class="brand-logo__mark" aria-hidden="true">
                <img src="${escapeAttr(config.assets.logoBearing)}" alt="">
              </span>
              <span class="brand-logo__text">${escapeHtml(config.brand.logoText)}</span>
            </a>

            <button class="mobile-menu__close" type="button" aria-label="Close menu" data-menu-close>
              ${iconSvg("x")}
            </button>
          </div>

          <div class="mobile-menu__body">
            <nav class="mobile-menu__nav" aria-label="Mobile primary navigation">
              ${mainLinks}
            </nav>

            <div class="mobile-menu__services">
              <p class="mobile-menu__label">Garage door categories</p>
              ${serviceLinks}
            </div>
          </div>

          <div class="mobile-menu__footer">
            <a class="btn btn--accent btn--full" href="${escapeAttr(config.phoneHref)}" data-phone-link>
              <span aria-hidden="true">${iconSvg("phone")}</span>
              <span data-phone-text>${escapeHtml(config.phoneLabel)}</span>
            </a>

            <a class="btn btn--ghost btn--full" href="${escapeAttr(config.emailHref)}" data-email-link>
              <span aria-hidden="true">${iconSvg("mail")}</span>
              <span>${escapeHtml(config.emailLabel)}</span>
            </a>

            <a class="btn btn--dark btn--full" href="contact.html">
              Start a Request
            </a>
          </div>
        </div>
      </aside>
    `;
    }

    function markActiveNavLinks() {
        const page = getCurrentPage();

        document.querySelectorAll(".site-nav__link, .mobile-menu__link, .mobile-service-link").forEach((link) => {
            const href = link.getAttribute("href");
            if (!href) return;

            if (href === page || (page === "" && href === "index.html")) {
                link.classList.add("is-active");
                link.setAttribute("aria-current", "page");
            }
        });
    }


    function renderFooter() {
        const mount = document.querySelector("[data-site-footer]");
        if (!mount) return;

        const navLinks = config.navigation
            .map((item) => {
                return `<li><a href="${escapeAttr(item.href)}">${escapeHtml(item.label)}</a></li>`;
            })
            .join("");

        const serviceLinks = config.services
            .map((service) => {
                return `<li><a href="${escapeAttr(service.href)}">${escapeHtml(service.title)}</a></li>`;
            })
            .join("");

        const legalLinks = config.legalLinks
            .map((link) => {
                return `<li><a href="${escapeAttr(link.href)}">${escapeHtml(link.label)}</a></li>`;
            })
            .join("");

        mount.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer__line" aria-hidden="true"></div>

        <div class="container-wide site-footer__inner">
          <div class="site-footer__brand">
            <a class="brand-logo brand-logo--footer" href="index.html" aria-label="${escapeAttr(config.brand.logoLabel)}">
              <span class="brand-logo__mark" aria-hidden="true">
                <img src="${escapeAttr(config.assets.logoBearing)}" alt="">
              </span>
              <span class="brand-logo__text">${escapeHtml(config.brand.logoText)}</span>
            </a>

            <p data-footer-text>${escapeHtml(config.footerText)}</p>

            <div class="site-footer__contact">
              <a href="${escapeAttr(config.phoneHref)}" data-phone-link>
                <span aria-hidden="true">${iconSvg("phone")}</span>
                <span data-phone-text>${escapeHtml(config.phone)}</span>
              </a>

              <a href="${escapeAttr(config.emailHref)}" data-email-link>
                <span aria-hidden="true">${iconSvg("mail")}</span>
                <span data-email-text>${escapeHtml(config.email)}</span>
              </a>
            </div>
          </div>

          <div class="site-footer__columns">
            <div class="site-footer__column">
              <h2>Navigation</h2>
              <ul>${navLinks}</ul>
            </div>

            <div class="site-footer__column">
              <h2>Services</h2>
              <ul>${serviceLinks}</ul>
            </div>

            <div class="site-footer__column">
              <h2>Legal</h2>
              <ul>${legalLinks}</ul>
            </div>

            <div class="site-footer__column">
              <h2>Company</h2>
              <ul>
                <li><span data-company-id>${escapeHtml(config.companyId)}</span></li>
                <li><span data-address-text>${escapeHtml(config.address.full)}</span></li>
                <li><span data-service-area>${escapeHtml(config.serviceArea)}</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="container-wide site-footer__bottom">
          <p class="site-footer__disclaimer" data-disclaimer>${escapeHtml(config.disclaimer)}</p>
          <p class="site-footer__legal-note" data-legal-notice>${escapeHtml(config.legalNotice)}</p>
        </div>
      </footer>
    `;
    }


    function injectDynamicContent() {
        setText("[data-company-name]", config.companyName);
        setText("[data-company-id]", config.companyId);
        setText("[data-phone-text]", config.phoneLabel);
        setText("[data-phone-number]", config.phone);
        setText("[data-email-text]", config.email);
        setText("[data-address-text]", config.address.full);
        setText("[data-footer-text]", config.footerText);
        setText("[data-service-area]", config.serviceArea);
        setText("[data-disclaimer]", config.disclaimer);
        setText("[data-legal-notice]", config.legalNotice);

        setHref("[data-phone-link]", config.phoneHref);
        setHref("[data-email-link]", config.emailHref);

        replaceTemplateTokens(document.body);
    }

    function setText(selector, value) {
        if (!value) return;

        document.querySelectorAll(selector).forEach((node) => {
            node.textContent = value;
        });
    }

    function setHref(selector, value) {
        if (!value) return;

        document.querySelectorAll(selector).forEach((node) => {
            node.setAttribute("href", value);
        });
    }

    function replaceTemplateTokens(root) {
        if (!root) return;

        const replacements = {
            "{{companyName}}": config.companyName,
            "{{companyId}}": config.companyId,
            "{{phone}}": config.phone,
            "{{phoneLabel}}": config.phoneLabel,
            "{{email}}": config.email,
            "{{address}}": config.address.full,
            "{{serviceArea}}": config.serviceArea,
            "{{disclaimer}}": config.disclaimer,
            "{{legalNotice}}": config.legalNotice
        };

        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                const parent = node.parentElement;
                if (!parent) return NodeFilter.FILTER_REJECT;

                const tag = parent.tagName.toLowerCase();
                if (tag === "script" || tag === "style" || tag === "noscript") {
                    return NodeFilter.FILTER_REJECT;
                }

                return Object.keys(replacements).some((token) => node.nodeValue.includes(token))
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            }
        });

        const nodes = [];

        while (walker.nextNode()) {
            nodes.push(walker.currentNode);
        }

        nodes.forEach((node) => {
            let text = node.nodeValue;

            Object.entries(replacements).forEach(([token, value]) => {
                text = text.split(token).join(value);
            });

            node.nodeValue = text;
        });
    }


    function renderQuickNavs() {
        document.querySelectorAll("[data-quick-nav]").forEach((mount) => {
            const label = mount.getAttribute("data-quick-nav-label") || "Quick navigation";

            mount.innerHTML = `
        <nav class="quick-nav" aria-label="${escapeAttr(label)}">
          ${config.quickNav.map((item) => {
                return `
              <a class="quick-nav__chip" href="${escapeAttr(item.href)}">
                ${escapeHtml(item.label)}
              </a>
            `;
            }).join("")}
        </nav>
      `;
        });
    }


    function renderServiceCards() {
        document.querySelectorAll("[data-service-cards]").forEach((mount) => {
            const mode = mount.getAttribute("data-service-cards") || "default";

            mount.innerHTML = config.services
                .map((service) => renderServiceCard(service, mode))
                .join("");
        });
    }

    function renderServiceCard(service, mode) {
        const modifier = mode === "compact" ? " service-card--compact" : "";

        return `
      <article class="service-card${modifier} red-scan-card">
        <a class="service-card__link" href="${escapeAttr(service.href)}" aria-label="Explore ${escapeAttr(service.title)}">
          <img class="service-card__image" src="${escapeAttr(service.image)}" alt="${escapeAttr(service.title)}">
          <span class="red-scan-card__line" aria-hidden="true"></span>

          <span class="service-card__overlay" aria-hidden="true"></span>

          <span class="service-card__icon" aria-hidden="true">
            ${iconSvg(service.icon)}
          </span>

          <span class="service-card__content">
            <span class="service-card__kicker">${escapeHtml(service.pageKicker)}</span>
            <strong>${escapeHtml(service.title)}</strong>
            <span class="service-card__hover-text">${escapeHtml(service.cardText)}</span>
            <span class="service-card__cta">
              Compare options
              <span aria-hidden="true">${iconSvg("arrow-right")}</span>
            </span>
          </span>
        </a>
      </article>
    `;
    }


    function renderRedLineCtas() {
        document.querySelectorAll("[data-red-line-cta]").forEach((mount) => {
            const ctaKey = mount.getAttribute("data-red-line-cta") || "default";
            const cta = config.cta[ctaKey] || config.cta.default;

            mount.innerHTML = `
        <section class="red-line-cta" aria-labelledby="redLineCtaTitle">
          <img class="red-line-cta__image" src="${escapeAttr(cta.image || config.cta.default.image)}" alt="">
          <div class="red-line-cta__overlay" aria-hidden="true"></div>
          <div class="red-line-cta__accent" aria-hidden="true"></div>

          <div class="container red-line-cta__inner">
            <span class="eyebrow">${escapeHtml(cta.eyebrow || "Compare providers")}</span>
            <h2 id="redLineCtaTitle">${escapeHtml(cta.title)}</h2>
            <p>${escapeHtml(cta.text)}</p>

            <div class="button-row">
              <a class="btn btn--accent" href="${escapeAttr(cta.primary.href)}">
                ${escapeHtml(cta.primary.label)}
              </a>
              <a class="btn btn--ghost" href="${escapeAttr(cta.secondary.href)}">
                ${escapeHtml(cta.secondary.label)}
              </a>
            </div>
          </div>
        </section>
      `;
        });
    }


    function renderUrgencyStrips() {
        document.querySelectorAll("[data-urgency-strip]").forEach((mount) => {
            const urgency = config.cta.urgency;

            mount.innerHTML = `
        <section class="urgency-strip" aria-labelledby="urgencyStripTitle">
          <div class="urgency-strip__content">
            <span class="eyebrow">Request timing varies</span>
            <h2 id="urgencyStripTitle">${escapeHtml(urgency.title)}</h2>
            <p>${escapeHtml(urgency.text)}</p>
          </div>

          <div class="urgency-strip__meta">
            ${urgency.indicators.map((item) => {
                return `
                <span>
                  <i aria-hidden="true"></i>
                  ${escapeHtml(item)}
                </span>
              `;
            }).join("")}
          </div>

          <a class="btn btn--accent" href="${escapeAttr(urgency.button.href)}">
            ${escapeHtml(urgency.button.label)}
          </a>
        </section>
      `;
        });
    }


    function renderFaqBlocks() {
        document.querySelectorAll("[data-faq-list]").forEach((mount) => {
            const key = mount.getAttribute("data-faq-list") || "global";
            const faqs = getFaqsByKey(key);

            if (!faqs.length) return;

            mount.innerHTML = faqs
                .map((faq, index) => {
                    const id = `faq-${key}-${index}`;

                    return `
            <article class="faq-item">
              <h3 class="faq-item__heading">
                <button class="faq-button" type="button" aria-expanded="false" aria-controls="${escapeAttr(id)}">
                  <span class="faq-button__number">${String(index + 1).padStart(2, "0")}</span>
                  <span class="faq-button__text">${escapeHtml(faq.question)}</span>
                  <span class="faq-button__icon" aria-hidden="true">${iconSvg("plus")}</span>
                </button>
              </h3>

              <div class="faq-panel" id="${escapeAttr(id)}" hidden>
                <div class="faq-panel__inner">
                  <p>${escapeHtml(faq.answer)}</p>
                </div>
              </div>
            </article>
          `;
                })
                .join("");
        });
    }

    function renderFaqSchema() {
        document.querySelectorAll("[data-faq-schema]").forEach((mount) => {
            const key = mount.getAttribute("data-faq-schema") || mount.getAttribute("data-faq-list") || "global";
            const faqs = getFaqsByKey(key);

            if (!faqs.length) return;

            const schema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map((faq) => {
                    return {
                        "@type": "Question",
                        "name": faq.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.answer
                        }
                    };
                })
            };

            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.textContent = JSON.stringify(schema);
            mount.innerHTML = "";
            mount.appendChild(script);
        });
    }

    function getFaqsByKey(key) {
        if (config.faqs[key]) {
            return config.faqs[key];
        }

        if (key && key.startsWith("service-")) {
            const id = key.replace("service-", "");
            const service = config.services.find((item) => item.id === id);

            if (service) {
                return [
                    {
                        question: `How do I compare providers for ${service.title.toLowerCase()}?`,
                        answer:
                            "Review service area, quote scope, license and insurance details, warranty terms, material or hardware compatibility, timing, and provider availability directly before hiring."
                    },
                    {
                        question: "Does GARVOX perform this service directly?",
                        answer:
                            "No. GARVOX does not perform garage door services directly. It helps homeowners compare independent provider options."
                    },
                    {
                        question: "What should I verify before choosing a provider?",
                        answer:
                            "Verify license, insurance, pricing, warranty, availability, project scope, and any service-specific details directly with the provider."
                    }
                ];
            }
        }

        return config.faqs.global || [];
    }

    function initFaqAccordions() {
        document.querySelectorAll(".faq-button").forEach((button) => {
            button.addEventListener("click", () => {
                const panelId = button.getAttribute("aria-controls");
                const panel = panelId ? document.getElementById(panelId) : null;

                if (!panel) return;

                const isOpen = button.getAttribute("aria-expanded") === "true";

                button.setAttribute("aria-expanded", String(!isOpen));
                panel.hidden = isOpen;

                const icon = button.querySelector(".faq-button__icon");
                if (icon) {
                    icon.innerHTML = !isOpen ? iconSvg("minus") : iconSvg("plus");
                }
            });
        });
    }


    function renderPolicyBanner() {
        const mount = document.querySelector("[data-policy-banner]");
        const banner = config.policyBanner;

        if (!mount || !banner) return;

        const savedChoice = window.localStorage.getItem(banner.storageKey);

        if (savedChoice) {
            mount.innerHTML = "";
            mount.hidden = true;
            return;
        }

        mount.hidden = false;
        mount.innerHTML = `
      <section class="policy-banner" role="dialog" aria-live="polite" aria-label="Policy confirmation">
        <div class="policy-banner__content">
          <strong>${escapeHtml(banner.title)}</strong>
          <p>${escapeHtml(banner.text)}</p>

          <nav class="policy-banner__links" aria-label="Policy links">
            ${banner.links.map((link) => {
            return `<a href="${escapeAttr(link.href)}">${escapeHtml(link.label)}</a>`;
        }).join("")}
          </nav>
        </div>

        <div class="policy-banner__actions">
          <button class="btn btn--ghost btn--small" type="button" data-policy-choice="declined">
            ${escapeHtml(banner.declineLabel)}
          </button>

          <button class="btn btn--accent btn--small" type="button" data-policy-choice="accepted">
            ${escapeHtml(banner.acceptLabel)}
          </button>
        </div>
      </section>
    `;

        mount.querySelectorAll("[data-policy-choice]").forEach((button) => {
            button.addEventListener("click", () => {
                const choice = button.getAttribute("data-policy-choice");
                window.localStorage.setItem(banner.storageKey, choice || "selected");
                mount.innerHTML = "";
                mount.hidden = true;
            });
        });
    }


    function initHeaderDropdown() {
        const dropdown = document.querySelector("[data-services-dropdown]");
        if (!dropdown) return;

        const trigger = dropdown.querySelector("[data-dropdown-trigger]");
        const panel = dropdown.querySelector("[data-dropdown-panel]");
        let closeTimer = null;

        if (!trigger || !panel) return;

        const openDropdown = () => {
            window.clearTimeout(closeTimer);
            dropdown.classList.add("is-open");
            trigger.setAttribute("aria-expanded", "true");
        };

        const closeDropdown = () => {
            closeTimer = window.setTimeout(() => {
                dropdown.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
            }, 280);
        };

        dropdown.addEventListener("mouseenter", openDropdown);
        dropdown.addEventListener("mouseleave", closeDropdown);

        trigger.addEventListener("focus", openDropdown);

        dropdown.addEventListener("focusout", (event) => {
            if (!dropdown.contains(event.relatedTarget)) {
                closeDropdown();
            }
        });

        trigger.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                dropdown.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
                trigger.focus();
            }

            if (event.key === "ArrowDown") {
                event.preventDefault();
                openDropdown();
                const firstLink = panel.querySelector("a");
                if (firstLink) firstLink.focus();
            }
        });
    }


    function initMobileMenu() {
        const menu = document.querySelector("[data-mobile-menu]");
        const openButton = document.querySelector("[data-menu-open]");
        const closeButton = document.querySelector("[data-menu-close]");

        if (!menu || !openButton || !closeButton) return;

        const focusableSelector = [
            "a[href]",
            "button:not([disabled])",
            "textarea:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            "[tabindex]:not([tabindex='-1'])"
        ].join(",");

        let previousFocus = null;

        const openMenu = () => {
            previousFocus = document.activeElement;

            menu.hidden = false;
            menu.inert = false;
            document.body.classList.add("menu-open");
            openButton.setAttribute("aria-expanded", "true");

            window.requestAnimationFrame(() => {
                menu.classList.add("is-open");
                closeButton.focus();
            });
        };

        const closeMenu = () => {
            menu.classList.remove("is-open");
            document.body.classList.remove("menu-open");
            openButton.setAttribute("aria-expanded", "false");

            window.setTimeout(() => {
                menu.inert = true;
                menu.hidden = true;

                if (previousFocus && typeof previousFocus.focus === "function") {
                    previousFocus.focus();
                } else {
                    openButton.focus();
                }
            }, 220);
        };

        openButton.addEventListener("click", openMenu);
        closeButton.addEventListener("click", closeMenu);

        menu.addEventListener("click", (event) => {
            if (event.target === menu) {
                closeMenu();
            }
        });

        menu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        menu.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
                return;
            }

            if (event.key !== "Tab") return;

            const focusable = Array.from(menu.querySelectorAll(focusableSelector)).filter((node) => {
                return !node.hasAttribute("disabled") && node.offsetParent !== null;
            });

            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
    }


    function initForms() {
        document.querySelectorAll("[data-form]").forEach((mount) => {
            const key = mount.getAttribute("data-form") || "contact";
            const formConfig = config.forms[key];

            if (!formConfig) return;

            mount.innerHTML = renderForm(formConfig);

            const form = mount.querySelector("form");
            const message = mount.querySelector("[data-form-message]");

            if (!form || !message) return;

            form.addEventListener("submit", (event) => {
                event.preventDefault();

                const result = validateForm(form);

                if (!result.valid) {
                    message.hidden = false;
                    message.className = "form-message form-message--error";
                    message.textContent = formConfig.errorMessage;
                    result.firstInvalid.focus();
                    return;
                }

                form.reset();

                message.hidden = false;
                message.className = "form-message form-message--success";
                message.innerHTML = `
          <strong>${escapeHtml(formConfig.successTitle)}</strong>
          <span>${escapeHtml(formConfig.successMessage)}</span>
        `;
            });
        });
    }

    function renderForm(formConfig) {
        const fields = formConfig.fields
            .map((field) => {
                const id = `${formConfig.id}-${field.name}`;
                const required = field.required ? " required" : "";
                const requiredLabel = field.required ? ' <span aria-hidden="true">*</span>' : "";

                if (field.type === "textarea") {
                    return `
            <div class="form-field">
              <label for="${escapeAttr(id)}">${escapeHtml(field.label)}${requiredLabel}</label>
              <textarea id="${escapeAttr(id)}" name="${escapeAttr(field.name)}" placeholder="${escapeAttr(field.placeholder || "")}"${required}></textarea>
            </div>
          `;
                }

                if (field.type === "select") {
                    return `
            <div class="form-field form-field--select">
              <label for="${escapeAttr(id)}">${escapeHtml(field.label)}${requiredLabel}</label>
              <span class="select-wrap">
                <select id="${escapeAttr(id)}" name="${escapeAttr(field.name)}"${required}>
                  <option value="">Select a service</option>
                  ${(field.options || []).map((option) => {
                        return `<option value="${escapeAttr(option)}">${escapeHtml(option)}</option>`;
                    }).join("")}
                </select>
                <span class="select-wrap__icon" aria-hidden="true">${iconSvg("chevron-down")}</span>
              </span>
            </div>
          `;
                }

                return `
          <div class="form-field">
            <label for="${escapeAttr(id)}">${escapeHtml(field.label)}${requiredLabel}</label>
            <input id="${escapeAttr(id)}" name="${escapeAttr(field.name)}" type="${escapeAttr(field.type)}" placeholder="${escapeAttr(field.placeholder || "")}"${required}>
          </div>
        `;
            })
            .join("");

        return `
      <div class="contact-form-card">
        <div class="contact-form-card__head">
          <span class="eyebrow">Provider comparison request</span>
          <h2>${escapeHtml(formConfig.title)}</h2>
          <p>${escapeHtml(formConfig.text)}</p>
        </div>

        <form class="contact-form" novalidate>
          ${fields}

          <button class="btn btn--accent btn--full" type="submit">
            ${escapeHtml(formConfig.submitLabel)}
          </button>

          <div class="form-message" hidden data-form-message></div>
        </form>
      </div>
    `;
    }

    function validateForm(form) {
        const fields = Array.from(form.querySelectorAll("input, select, textarea"));
        let firstInvalid = null;

        fields.forEach((field) => {
            const isRequired = field.hasAttribute("required");
            const value = field.value.trim();
            let valid = true;

            if (isRequired && !value) {
                valid = false;
            }

            if (field.type === "email" && value && !isValidEmail(value)) {
                valid = false;
            }

            field.classList.toggle("is-invalid", !valid);
            field.setAttribute("aria-invalid", String(!valid));

            if (!valid && !firstInvalid) {
                firstInvalid = field;
            }
        });

        return {
            valid: !firstInvalid,
            firstInvalid
        };
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }


    function initInteractiveCards() {
        document.querySelectorAll(".red-scan-card").forEach((card) => {
            card.addEventListener("pointerenter", () => {
                card.classList.add("is-hovered");
            });

            card.addEventListener("pointerleave", () => {
                card.classList.remove("is-hovered");
            });
        });
    }

    function initAnchorLinks() {
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href");

                if (!href || href === "#") return;

                const target = document.querySelector(href);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: prefersReducedMotion() ? "auto" : "smooth",
                    block: "start"
                });

                if (!target.hasAttribute("tabindex")) {
                    target.setAttribute("tabindex", "-1");
                }

                target.focus({
                    preventScroll: true
                });
            });
        });
    }

    function prefersReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }


    function preventEmptyLinks() {
        document.querySelectorAll("a").forEach((link) => {
            const href = link.getAttribute("href");

            if (!href || href.trim() === "" || href.trim() === "#") {
                link.setAttribute("href", "contact.html");
                link.setAttribute("data-empty-link-fixed", "true");
            }
        });
    }

    function preventHorizontalScrollIssues() {
        document.documentElement.classList.add("overflow-guard");

        window.addEventListener("resize", debounce(() => {
            document.documentElement.classList.add("overflow-guard");
        }, 150));
    }
  
  function replaceHardcodedCompanyData() {
    const textReplacements = [
      ["GARVOX Provider Matching LLC", config.companyId],
      ["GARVOX", config.companyName],
      ["Call (888) 432-1098", config.phoneLabel],
      ["(888) 432-1098", config.phone],
      ["contact@garvox.com", config.email],
      ["1209 Orange Street, Wilmington, DE 19801, USA", config.address.full]
    ];

    replaceTextNodes(document.body, textReplacements);

    document.querySelectorAll('a[href="tel:+18884321098"]').forEach((link) => {
      link.setAttribute("href", config.phoneHref);
    });

    document.querySelectorAll('a[href="mailto:contact@garvox.com"]').forEach((link) => {
      link.setAttribute("href", config.emailHref);
    });

    document.querySelectorAll("[data-company-name]").forEach((node) => {
      node.textContent = config.companyName;
    });

    document.querySelectorAll("[data-company-id]").forEach((node) => {
      node.textContent = config.companyId;
    });

    document.querySelectorAll("[data-phone-text]").forEach((node) => {
      node.textContent = config.phoneLabel;
    });

    document.querySelectorAll("[data-phone-number]").forEach((node) => {
      node.textContent = config.phone;
    });

    document.querySelectorAll("[data-email-text]").forEach((node) => {
      node.textContent = config.email;
    });

    document.querySelectorAll("[data-address-text]").forEach((node) => {
      node.textContent = config.address.full;
    });

    document.querySelectorAll("[data-phone-link]").forEach((node) => {
      node.setAttribute("href", config.phoneHref);
    });

    document.querySelectorAll("[data-email-link]").forEach((node) => {
      node.setAttribute("href", config.emailHref);
    });
  }


    function replaceLegacySiteData() {
        if (!config.legacyReplace) return;

        const replacements = [];

        (config.legacyReplace.brandNames || []).forEach((value) => {
            replacements.push([value, config.companyName]);
        });

        (config.legacyReplace.phones || []).forEach((value) => {
            replacements.push([value, config.phone]);
        });

        (config.legacyReplace.emails || []).forEach((value) => {
            replacements.push([value, config.email]);
        });

        (config.legacyReplace.addresses || []).forEach((value) => {
            replacements.push([value, config.address.full]);
        });

        if (!replacements.length) return;

        replaceTextNodes(document.body, replacements);
        replaceAttributes(document.body, replacements);
    }

    function replaceTextNodes(root, replacements) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                const parent = node.parentElement;
                if (!parent) return NodeFilter.FILTER_REJECT;

                const tag = parent.tagName.toLowerCase();
                if (tag === "script" || tag === "style" || tag === "noscript") {
                    return NodeFilter.FILTER_REJECT;
                }

                return replacements.some(([from]) => node.nodeValue.includes(from))
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            }
        });

        const nodes = [];

        while (walker.nextNode()) {
            nodes.push(walker.currentNode);
        }

        nodes.forEach((node) => {
            let text = node.nodeValue;

            replacements.forEach(([from, to]) => {
                text = text.split(from).join(to);
            });

            node.nodeValue = text;
        });
    }

    function replaceAttributes(root, replacements) {
        const elements = root.querySelectorAll("*");

        elements.forEach((element) => {
            Array.from(element.attributes).forEach((attribute) => {
                if (!attribute.value) return;

                let value = attribute.value;
                let changed = false;

                replacements.forEach(([from, to]) => {
                    if (value.includes(from)) {
                        value = value.split(from).join(to);
                        changed = true;
                    }
                });

                if (changed) {
                    element.setAttribute(attribute.name, value);
                }
            });
        });
    }


    function iconSvg(name) {
        const icons = {
            "phone": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 19 19.5 19.5 0 0 1 5 12.81 19.8 19.8 0 0 1 2.11 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.89.66 2.78a2 2 0 0 1-.45 2.11L8.1 9.82a16 16 0 0 0 6.08 6.08l1.21-1.21a2 2 0 0 1 2.11-.45c.89.31 1.82.53 2.78.66A2 2 0 0 1 22 16.92Z"/>
        </svg>
      `,
            "mail": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
          <path d="m22 7-10 6L2 7"/>
        </svg>
      `,
            "chevron-down": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      `,
            "arrow-right": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M5 12h14"/>
          <path d="m13 6 6 6-6 6"/>
        </svg>
      `,
            "x": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg>
      `,
            "plus": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 5v14"/>
          <path d="M5 12h14"/>
        </svg>
      `,
            "minus": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M5 12h14"/>
        </svg>
      `,
            "door-open": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 21V4a1 1 0 0 1 1-1h10v18"/>
          <path d="M15 3 20 5v16"/>
          <path d="M10 12h.01"/>
          <path d="M3 21h18"/>
        </svg>
      `,
            "replace": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 7h12"/>
          <path d="m11 3 4 4-4 4"/>
          <path d="M21 17H9"/>
          <path d="m13 21-4-4 4-4"/>
        </svg>
      `,
            "wrench": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4l-3.1 3.1-3-3 3.1-3.1Z"/>
        </svg>
      `,
            "radio-tower": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4.9 16.1a10 10 0 0 1 0-8.2"/>
          <path d="M7.8 13.2a5 5 0 0 1 0-2.4"/>
          <path d="M19.1 16.1a10 10 0 0 0 0-8.2"/>
          <path d="M16.2 13.2a5 5 0 0 0 0-2.4"/>
          <path d="M12 12h.01"/>
          <path d="M12 12 9 22"/>
          <path d="m12 12 3 10"/>
        </svg>
      `,
            "rotate-cw": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M21 12a9 9 0 1 1-3-6.7"/>
          <path d="M21 3v7h-7"/>
        </svg>
      `,
            "rail-symbol": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M5 4v16"/>
          <path d="M19 4v16"/>
          <path d="M5 7h14"/>
          <path d="M5 12h14"/>
          <path d="M5 17h14"/>
        </svg>
      `,
            "scan-line": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
          <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
          <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
          <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
          <path d="M7 12h10"/>
        </svg>
      `,
            "shield-check": `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      `
        };

        return icons[name] || icons["arrow-right"];
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

    function debounce(callback, delay) {
        let timer = null;

        return function (...args) {
            window.clearTimeout(timer);
            timer = window.setTimeout(() => {
                callback.apply(this, args);
            }, delay);
        };
    }
})();
