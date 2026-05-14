"use strict";

/* ==========================================================
   GARVOX — Contact Page Script
   Handles:
   - contact page enhancements
   - service select helper text
   - no-map safety check
   - compact form focus states
   ========================================================== */

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing on contact page.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initContactPage);

    function initContactPage() {
        enhanceContactForm();
        preventMapSections();
        syncContactLinks();
    }

    /* ========================================================
       CONTACT FORM ENHANCEMENTS
       ======================================================== */

    function enhanceContactForm() {
        const formMount = document.querySelector("[data-form='contact']");
        if (!formMount) return;

        const observer = new MutationObserver(() => {
            const form = formMount.querySelector("form");
            if (!form) return;

            addServiceSelectHelper(form);
            addInputFocusClasses(form);

            observer.disconnect();
        });

        observer.observe(formMount, {
            childList: true,
            subtree: true
        });
    }

    function addServiceSelectHelper(form) {
        const select = form.querySelector("select[name='service']");
        if (!select) return;

        const field = select.closest(".form-field");
        if (!field || field.querySelector(".form-helper")) return;

        const helper = document.createElement("p");
        helper.className = "form-helper";
        helper.textContent =
            "Choose one of the 4 GARVOX service categories. No extra services are added.";

        field.appendChild(helper);

        select.addEventListener("change", () => {
            field.classList.toggle("has-value", Boolean(select.value));
        });
    }

    function addInputFocusClasses(form) {
        const fields = form.querySelectorAll(".form-field");

        fields.forEach((field) => {
            const control = field.querySelector("input, select, textarea");
            if (!control) return;

            control.addEventListener("focus", () => {
                field.classList.add("is-focused");
            });

            control.addEventListener("blur", () => {
                field.classList.remove("is-focused");
                field.classList.toggle("has-value", Boolean(control.value.trim()));
            });

            control.addEventListener("input", () => {
                field.classList.toggle("has-value", Boolean(control.value.trim()));
            });
        });
    }

    /* ========================================================
       NO MAP SAFETY
       ======================================================== */

    function preventMapSections() {
        const forbiddenSelectors = [
            "[data-map]",
            ".map",
            ".map-section",
            ".contact-map",
            ".location-map",
            "iframe[src*='google.com/maps']",
            "iframe[src*='maps.google']"
        ];

        forbiddenSelectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((element) => {
                element.remove();
                console.warn("GARVOX contact page: map element removed because maps are not allowed.");
            });
        });
    }

    /* ========================================================
       CONTACT LINKS
       ======================================================== */

    function syncContactLinks() {
        document.querySelectorAll("[data-phone-link]").forEach((link) => {
            link.setAttribute("href", config.phoneHref);
        });

        document.querySelectorAll("[data-email-link]").forEach((link) => {
            link.setAttribute("href", config.emailHref);
        });

        document.querySelectorAll("[data-phone-text]").forEach((node) => {
            node.textContent = config.phoneLabel;
        });

        document.querySelectorAll("[data-email-text]").forEach((node) => {
            node.textContent = config.email;
        });
    }
})();