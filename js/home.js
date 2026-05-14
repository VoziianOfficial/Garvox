"use strict";

/* ==========================================================
   GARVOX — Home Page Script
   Handles:
   - calm hero slideshow
   - hero pagination
   - prefers-reduced-motion safety
   ========================================================== */

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing on home page.");
        return;
    }

    document.addEventListener("DOMContentLoaded", initHomePage);

    function initHomePage() {
        initHomeHeroSlideshow();
        enhanceHomeHeroFromConfig();
    }

    /* ========================================================
       HERO CONTENT FROM CONFIG
       ======================================================== */

    function enhanceHomeHeroFromConfig() {
        const hero = config.home && config.home.hero;
        if (!hero) return;

        const slidesMount = document.querySelector("[data-home-hero-slides]");
        const paginationMount = document.querySelector("[data-home-hero-pagination]");

        if (slidesMount && Array.isArray(config.assets.hero.homeSlides)) {
            slidesMount.innerHTML = config.assets.hero.homeSlides
                .map((src, index) => {
                    return `
            <div class="home-hero__slide${index === 0 ? " is-active" : ""}">
              <img src="${escapeAttr(src)}" alt="">
            </div>
          `;
                })
                .join("");
        }

        if (paginationMount && Array.isArray(config.assets.hero.homeSlides)) {
            paginationMount.innerHTML = config.assets.hero.homeSlides
                .map((_, index) => {
                    return `
            <button class="${index === 0 ? "is-active" : ""}" type="button" aria-label="Show slide ${index + 1}"></button>
          `;
                })
                .join("");
        }
    }

    /* ========================================================
       HERO SLIDESHOW
       ======================================================== */

    function initHomeHeroSlideshow() {
        const hero = document.querySelector("[data-home-hero]");
        if (!hero) return;

        const slides = Array.from(hero.querySelectorAll(".home-hero__slide"));
        const pagination = Array.from(hero.querySelectorAll("[data-home-hero-pagination] button"));

        if (!slides.length || !pagination.length) return;

        let activeIndex = 0;
        let timer = null;
        const delay = 5200;

        function showSlide(index) {
            activeIndex = normalizeIndex(index, slides.length);

            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle("is-active", slideIndex === activeIndex);
            });

            pagination.forEach((button, buttonIndex) => {
                const isActive = buttonIndex === activeIndex;
                button.classList.toggle("is-active", isActive);
                button.setAttribute("aria-current", isActive ? "true" : "false");
            });
        }

        function nextSlide() {
            showSlide(activeIndex + 1);
        }

        function start() {
            if (prefersReducedMotion()) return;

            stop();

            timer = window.setInterval(() => {
                nextSlide();
            }, delay);
        }

        function stop() {
            if (timer) {
                window.clearInterval(timer);
                timer = null;
            }
        }

        pagination.forEach((button, index) => {
            button.addEventListener("click", () => {
                showSlide(index);
                start();
            });
        });

        hero.addEventListener("mouseenter", stop);
        hero.addEventListener("mouseleave", start);

        hero.addEventListener("focusin", stop);
        hero.addEventListener("focusout", start);

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                stop();
            } else {
                start();
            }
        });

        showSlide(0);
        start();
    }

    /* ========================================================
       HELPERS
       ======================================================== */

    function normalizeIndex(index, length) {
        if (index < 0) return length - 1;
        if (index >= length) return 0;
        return index;
    }

    function prefersReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function escapeAttr(value) {
        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`/g, "&#096;");
    }
})();