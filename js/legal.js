"use strict";


(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing on legal page.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initLegalPage);

    function initLegalPage() {
        markActiveLegalLink();
        syncLegalContactValues();
        addLegalSectionAnchors();
        verifyLegalPageRules();
    }


    function markActiveLegalLink() {
        const page = getCurrentPage();

        document.querySelectorAll(".legal-nav a").forEach((link) => {
            const href = link.getAttribute("href");

            if (!href) return;

            const isActive = href === page;

            link.classList.toggle("is-active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf("/") + 1);

        return filename || "index.html";
    }


    function syncLegalContactValues() {
        setText("[data-company-name]", config.companyName);
        setText("[data-company-id]", config.companyId);
        setText("[data-address-text]", config.address.full);
        setText("[data-phone-text]", config.phoneLabel);
        setText("[data-email-text]", config.email);
        setText("[data-legal-notice]", config.legalNotice);
        setText("[data-disclaimer]", config.disclaimer);

        setHref("[data-phone-link]", config.phoneHref);
        setHref("[data-email-link]", config.emailHref);
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


    function addLegalSectionAnchors() {
        const headings = document.querySelectorAll(".legal-document__body h3");

        headings.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = `legal-section-${index + 1}`;
            }

            heading.setAttribute("tabindex", "-1");
        });

        document.querySelectorAll(".legal-document a[href^='#']").forEach((link) => {
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

                target.focus({
                    preventScroll: true
                });
            });
        });
    }

    function prefersReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }


    function verifyLegalPageRules() {
        const form = document.querySelector("form");

        if (form) {
            console.warn("GARVOX QA: legal pages should not include forms. Form found:", form);
        }

        const forbiddenMapSelectors = [
            "[data-map]",
            ".map",
            ".map-section",
            ".contact-map",
            ".location-map",
            "iframe[src*='google.com/maps']",
            "iframe[src*='maps.google']"
        ];

        forbiddenMapSelectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((element) => {
                element.remove();
                console.warn("GARVOX QA: map element removed because maps are not allowed.");
            });
        });

        const bodyText = document.body ? document.body.textContent.toLowerCase() : "";

        const forbiddenClaims = [
            "we install garage doors",
            "we repair garage doors",
            "our technicians",
            "our garage door team",
            "we handle repairs",
            "we fix your door",
            "guaranteed emergency service"
        ];

        forbiddenClaims.forEach((claim) => {
            if (bodyText.includes(claim)) {
                console.warn("GARVOX QA: forbidden direct-service wording found:", claim);
            }
        });
    }
})();
