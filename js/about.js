"use strict";


(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing on about page.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initAboutPage);

    function initAboutPage() {
        enhanceServiceMarquee();
        renderDynamicMarqueeIfNeeded();
    }


    function renderDynamicMarqueeIfNeeded() {
        const mount = document.querySelector("[data-service-marquee]");
        const marquee = config.aboutPage && config.aboutPage.marquee;

        if (!mount || !marquee || !Array.isArray(marquee.items)) return;

        const repeatedItems = [...marquee.items, ...marquee.items];

        mount.innerHTML = `
      <div class="service-marquee" aria-label="${escapeAttr(marquee.label)}">
        <div class="service-marquee__track">
          ${repeatedItems.map((item) => {
            return `
              <a href="${escapeAttr(item.href)}">
                ${escapeHtml(item.label)}
              </a>
              <span aria-hidden="true"></span>
            `;
        }).join("")}
        </div>
      </div>
    `;

        enhanceServiceMarquee();
    }


    function enhanceServiceMarquee() {
        const marquees = document.querySelectorAll(".service-marquee");

        marquees.forEach((marquee) => {
            const track = marquee.querySelector(".service-marquee__track");
            if (!track) return;

            marquee.addEventListener("mouseenter", () => {
                marquee.classList.add("is-paused");
            });

            marquee.addEventListener("mouseleave", () => {
                marquee.classList.remove("is-paused");
            });

            marquee.addEventListener("focusin", () => {
                marquee.classList.add("is-paused");
            });

            marquee.addEventListener("focusout", () => {
                marquee.classList.remove("is-paused");
            });

            const links = Array.from(track.querySelectorAll("a"));

            links.forEach((link, index) => {
                const text = link.textContent.trim();

                if (!link.getAttribute("aria-label")) {
                    link.setAttribute("aria-label", `Open ${text} service page`);
                }

                if (index >= links.length / 2) {
                    link.setAttribute("aria-hidden", "true");
                    link.setAttribute("tabindex", "-1");
                }
            });
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
