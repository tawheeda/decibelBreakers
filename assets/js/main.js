/**
 * Template Name: Dewi - v4.6.0
 * Template URL: https://bootstrapmade.com/dewi-free-multi-purpose-html-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /* =========================
   * Helpers
   * ========================= */
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (!selectEl) return;
    if (all) selectEl.forEach((e) => e.addEventListener(type, listener));
    else selectEl.addEventListener(type, listener);
  };
  const onscroll = (el, listener) => el.addEventListener("scroll", listener);

  /* =========================
   * Navbar active on scroll
   * ========================= */
  const initNavbarLinks = () => {
    const navbarlinks = select("#navbar .scrollto", true);
    const navbarlinksActive = () => {
      const position = window.scrollY + 200;
      navbarlinks.forEach((link) => {
        if (!link.hash) return;
        const section = select(link.hash);
        if (!section) return;
        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    };
    window.addEventListener("load", navbarlinksActive);
    onscroll(document, navbarlinksActive);
  };

  /* =========================
   * Smooth scroll
   * ========================= */
  const scrollto = (el) => {
    const header = select("#header");
    if (!header) return;
    let offset = header.offsetHeight;
    if (!header.classList.contains("header-scrolled")) offset -= 20;
    const elementPos = select(el)?.offsetTop;
    if (elementPos !== undefined) {
      window.scrollTo({ top: elementPos - offset, behavior: "smooth" });
    }
  };

  /* =========================
   * Header on scroll
   * ========================= */
  const initHeaderScroll = () => {
    const selectHeader = select("#header");
    if (!selectHeader) return;
    const headerScrolled = () => {
      if (window.scrollY > 100) selectHeader.classList.add("header-scrolled");
      else selectHeader.classList.remove("header-scrolled");
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  };

  /* =========================
   * Back to top
   * ========================= */
  const initBackToTop = () => {
    const backtotop = select(".back-to-top");
    if (!backtotop) return;
    const toggle = () =>
      backtotop.classList.toggle("active", window.scrollY > 100);
    window.addEventListener("load", toggle);
    onscroll(document, toggle);
  };

  /* =========================
   * Mobile nav
   * ========================= */
  const initMobileNav = () => {
    on("click", ".mobile-nav-toggle", function () {
      const navbar = select("#navbar");
      if (!navbar) return;
      navbar.classList.toggle("navbar-mobile");
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });

    on(
      "click",
      ".navbar .dropdown > a",
      function (e) {
        const navbar = select("#navbar");
        if (navbar?.classList.contains("navbar-mobile")) {
          e.preventDefault();
          this.nextElementSibling?.classList.toggle("dropdown-active");
        }
      },
      true
    );
  };

  /* =========================
   * Scrollto links
   * ========================= */
  const initScrollTo = () => {
    on(
      "click",
      ".scrollto",
      function (e) {
        if (select(this.hash)) {
          e.preventDefault();
          const navbar = select("#navbar");
          if (navbar?.classList.contains("navbar-mobile")) {
            navbar.classList.remove("navbar-mobile");
            const toggle = select(".mobile-nav-toggle");
            toggle?.classList.toggle("bi-list");
            toggle?.classList.toggle("bi-x");
          }
          scrollto(this.hash);
        }
      },
      true
    );

    window.addEventListener("load", () => {
      if (window.location.hash && select(window.location.hash))
        scrollto(window.location.hash);
    });
  };

  /* =========================
   * Preloader
   * ========================= */
  const initPreloader = () => {
    const preloader = select("#preloader");
    if (preloader) {
      window.addEventListener("load", () => preloader.remove());
    }
  };

  /* =========================
   * Lightboxes
   * ========================= */
  const initGlightbox = () => {
    if (typeof GLightbox === "undefined") return;
    GLightbox({ selector: ".glightbox" });
    GLightbox({ selector: ".portfolio-lightbox" });
  };

  /* =========================
   * Swipers
   * ========================= */
  const initSwipers = () => {
    if (typeof Swiper === "undefined") return;
    new Swiper(".testimonials-slider", {
      speed: 600,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      slidesPerView: "auto",
      pagination: { el: ".swiper-pagination", type: "bullets", clickable: true }
    });

    new Swiper(".portfolio-details-slider", {
      speed: 400,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", type: "bullets", clickable: true }
    });
  };

  /* =========================
   * Isotope instance
   * ========================= */
  let iso = null;
  const initIsotope = () => {
    window.addEventListener("load", () => {
      const container = select(".portfolio-container");
      if (!container || typeof Isotope === "undefined") return;
      iso = new Isotope(container, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows"
      });
      if (typeof imagesLoaded !== "undefined") {
        imagesLoaded(container, () => iso.layout());
      }
    });
  };

  /* =========================
   * AOS
   * ========================= */
  const initAOS = () => {
    window.addEventListener("load", () => {
      if (typeof AOS !== "undefined") {
        AOS.init({ duration: 1000, easing: "ease-in-out", once: true, mirror: false });
      }
    });
  };

  /* =========================
   * Demo contact form (fake)
   * ========================= */
  const initFakeContactForm = () => {
    window.addEventListener("load", () => {
      const form = document.getElementById("fake-contact-form");
      if (!form) return;
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const loading = this.querySelector(".loading");
        const sent = this.querySelector(".sent-message");
        const error = this.querySelector(".error-message");
        if (loading) loading.style.display = "block";
        if (sent) sent.style.display = "none";
        if (error) error.style.display = "none";
        setTimeout(() => {
          if (loading) loading.style.display = "none";
          if (sent) sent.style.display = "block";
          this.reset();
        }, 1000);
      });
    });
  };

  /* ==========================================================
   * Portfolio FILTER BAR
   * ========================================================== */
  const initPortfolioFilters = () => {
    const filterBar = select("#portfolio .portfolio-filters");
    if (!filterBar) return;

    const scrollPortfolioIntoView = () => {
      const section = document.getElementById("portfolio");
      if (!section) return;
      const header = document.querySelector("#header");
      let offset = header ? header.offsetHeight : 0;
      if (header && !header.classList.contains("header-scrolled")) offset -= 20;
      const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    };

    const setActive = (btn) => {
      filterBar.querySelectorAll("button").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
    };

    // Accepts multiple tags per item
    const makeIsoFilter = (tag) => {
      if (tag === "*" || !tag) return "*";
      const wanted = tag.toLowerCase();
      return (itemElem) => {
        const tags = (itemElem.getAttribute("data-service") || "")
          .toLowerCase()
          .split(",")
          .map((s) => s.trim());
        return tags.includes(wanted);
      };
    };

    const applyFilter = (value) => {
      if (iso) {
        iso.arrange({ filter: makeIsoFilter(value) });
        iso.once("arrangeComplete", () => {
          if (typeof AOS !== "undefined") AOS.refresh();
          scrollPortfolioIntoView();
        });
      } else {
        // fallback
        const items = document.querySelectorAll("#portfolio .portfolio-item");
        const showAll = value === "*" || !value;
        items.forEach((card) => {
          const tags = (card.getAttribute("data-service") || "")
            .toLowerCase()
            .split(",")
            .map((s) => s.trim());
          const match = showAll ? true : tags.includes(value.toLowerCase());
          card.style.display = match ? "" : "none";
        });
        if (typeof AOS !== "undefined") AOS.refresh();
        scrollPortfolioIntoView();
      }
    };

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      const value = btn.getAttribute("data-filter");
      setActive(btn);
      applyFilter(value);
    });

    const setInitial = () => {
      const params = new URLSearchParams(location.search);
      const initial = params.get("filter");
      const targetBtn =
        initial && filterBar.querySelector(`button[data-filter="${initial}"]`);
      if (targetBtn) {
        setActive(targetBtn);
        applyFilter(initial);
      } else {
        const defaultBtn =
          filterBar.querySelector('button[data-filter="*"]') ||
          filterBar.querySelector("button");
        if (defaultBtn) setActive(defaultBtn);
        applyFilter("*");
      }
    };

    if (document.readyState === "complete") setInitial();
    else window.addEventListener("load", setInitial);
  };

  /* =========================
   * Init all features
   * ========================= */
  initNavbarLinks();
  initHeaderScroll();
  initBackToTop();
  initMobileNav();
  initScrollTo();
  initPreloader();
  initGlightbox();
  initSwipers();
  initIsotope();
  initAOS();
  initFakeContactForm();
  initPortfolioFilters();
})();
