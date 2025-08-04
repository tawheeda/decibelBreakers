/**
 * Template Name: Dewi - v4.6.0
 * Template URL: https://bootstrapmade.com/dewi-free-multi-purpose-html-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    const result = all
      ? [...document.querySelectorAll(el)]
      : document.querySelector(el);
    if (!result || (Array.isArray(result) && result.length === 0)) {
      console.warn(`Selector '${el}' not found.`);
    }
    return result;
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const onscroll = (el, listener) => el.addEventListener("scroll", listener);

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

  const scrollto = (el) => {
    const header = select("#header");
    if (!header) return;
    let offset = header.offsetHeight;
    if (!header.classList.contains("header-scrolled")) {
      offset -= 20;
    }
    const elementPos = select(el)?.offsetTop;
    if (elementPos !== undefined) {
      window.scrollTo({
        top: elementPos - offset,
        behavior: "smooth",
      });
    }
  };

  const initHeaderScroll = () => {
    const selectHeader = select("#header");
    if (!selectHeader) return;

    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  };

  const initBackToTop = () => {
    const backtotop = select(".back-to-top");
    if (!backtotop) return;

    const toggle = () => {
      backtotop.classList.toggle("active", window.scrollY > 100);
    };
    window.addEventListener("load", toggle);
    onscroll(document, toggle);
  };

  const initMobileNav = () => {
    on("click", ".mobile-nav-toggle", function () {
      const navbar = select("#navbar");
      if (navbar) {
        navbar.classList.toggle("navbar-mobile");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
      }
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
      if (window.location.hash && select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    });
  };

  const initPreloader = () => {
    const preloader = select("#preloader");
    if (preloader) {
      window.addEventListener("load", () => {
        preloader.remove();
      });
    }
  };

  const initGlightbox = () => {
    if (typeof GLightbox !== "undefined") {
      GLightbox({ selector: ".glightbox" });
      GLightbox({ selector: ".portfolio-lightbox" });
    }
  };

  const initSwipers = () => {
    if (typeof Swiper !== "undefined") {
      new Swiper(".testimonials-slider", {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        slidesPerView: "auto",
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
      });

      new Swiper(".portfolio-details-slider", {
        speed: 400,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
      });
    }
  };

  const initIsotope = () => {
    window.addEventListener("load", () => {
      const container = select(".portfolio-container");
      if (container && typeof Isotope !== "undefined") {
        const iso = new Isotope(container, {
          itemSelector: ".portfolio-item",
        });
        const filters = select("#portfolio-flters li", true);
        on(
          "click",
          "#portfolio-flters li",
          function (e) {
            e.preventDefault();
            filters.forEach((el) => el.classList.remove("filter-active"));
            this.classList.add("filter-active");
            iso.arrange({ filter: this.getAttribute("data-filter") });
            iso.on("arrangeComplete", () => AOS.refresh());
          },
          true
        );
      }
    });
  };

  const initAOS = () => {
    window.addEventListener("load", () => {
      if (typeof AOS !== "undefined") {
        AOS.init({
          duration: 1000,
          easing: "ease-in-out",
          once: true,
          mirror: false,
        });
      }
    });
  };

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

  // Init all features
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
})();
