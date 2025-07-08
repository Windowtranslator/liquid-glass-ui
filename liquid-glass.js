/**
 * Liquid Glass UI
 * @version 1.2.0
 * @description A JavaScript library for creating UI with glass morphism, parallax, and other modern effects.
 * @author (Your Name)
 */

(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------
   *  Dynamic CSS Injection
   *  - Automatically loads the liquid-glass.css file.
   * ----------------------------------------------------------------
   */
  try {
    const scripts = document.getElementsByTagName('script');
    let jsPath = '';
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.includes('liquid-glass.js')) {
        jsPath = scripts[i].src;
        break;
      }
    }
    if (jsPath) {
      const cssPath = jsPath.replace('.js', '.css');
      const links = document.getElementsByTagName('link');
      let isCssLoaded = false;
      for (let i = 0; i < links.length; i++) {
        if (links[i].href && links[i].href === cssPath) {
          isCssLoaded = true;
          break;
        }
      }
      if (!isCssLoaded) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = cssPath;
        document.head.appendChild(link);
      }
    } else {
      console.warn('Liquid Glass UI: Could not determine the script path to load CSS.');
    }
  } catch (error) {
    console.error('Liquid Glass UI: Failed to load CSS dynamically.', error);
  }

  /**
   * ----------------------------------------------------------------
   *  SECTION A: INTEGRATED LIBRARIES
   *  - Carousel3D Class Definition
   * ----------------------------------------------------------------
   */
  class Carousel3D {
    constructor(selector, options = {}) {
      const container = document.querySelector(selector);
      if (!container) {
        console.error(`Carousel container with selector "${selector}" not found.`);
        return;
      }
      this.container = container;
      this.carousel = container.querySelector('.carousel');
      this.cells = Array.from(this.carousel.children);
      this.prevBtn = container.parentElement.querySelector('[data-carousel-prev]');
      this.nextBtn = container.parentElement.querySelector('[data-carousel-next]');

      const defaults = { tiltAngle: 90, distanceZ: -300, transitionDuration: 0.8 };
      this.options = Object.assign({}, defaults, options);

      this.cardHeight = this.cells.length > 0 ? this.cells[0].offsetHeight : 0;
      this.options.distanceY = this.cardHeight / 2;

      this.cellCount = this.cells.length;
      this.selectedIndex = 0;
      this.init();
    }
    init() {
      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
      this.cells.forEach(cell => {
        cell.style.transition = `transform ${this.options.transitionDuration}s ease, opacity ${this.options.transitionDuration}s ease`;
      });
      this.rotate();
    }
    rotate() {
      const { tiltAngle, distanceY, distanceZ } = this.options;
      this.cells.forEach((cell, i) => {
        let cellIndex = this.selectedIndex % this.cellCount;
        if (cellIndex < 0) cellIndex += this.cellCount;
        const relativeIndex = i - cellIndex;
        let newTransform = '';
        let newOpacity = 0;
        let newZIndex = 0;

        if (relativeIndex === 0) {
          newTransform = `translateX(-50%) rotateX(0deg)`;
          newOpacity = 1;
          newZIndex = this.cellCount;
        } else if (relativeIndex === 1 || relativeIndex === -(this.cellCount - 1)) {
          newTransform = `translateX(-50%) translateY(${distanceY}px) translateZ(${distanceZ}px) rotateX(-${tiltAngle}deg)`;
          newOpacity = 0;
          newZIndex = this.cellCount - 1;
        } else if (relativeIndex === -1 || relativeIndex === this.cellCount - 1) {
          newTransform = `translateX(-50%) translateY(-${distanceY}px) translateZ(${distanceZ}px) rotateX(${tiltAngle}deg)`;
          newOpacity = 0;
          newZIndex = this.cellCount - 1;
        } else {
          const y = relativeIndex > 0 ? distanceY * 2 : -distanceY * 2;
          const z = distanceZ - 100;
          const angle = relativeIndex > 0 ? -tiltAngle : tiltAngle;
          newTransform = `translateX(-50%) translateY(${y}px) translateZ(${z}px) rotateX(${angle}deg)`;
          newOpacity = 0;
        }
        cell.style.transform = newTransform;
        cell.style.opacity = newOpacity;
        cell.style.zIndex = newZIndex;
      });
    }
    next() { this.selectedIndex++; this.rotate(); }
    prev() { this.selectedIndex--; this.rotate(); }
  }


  /**
   * ----------------------------------------------------------------
   *  SECTION B: MAIN LOGIC
   * ----------------------------------------------------------------
   */
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Liquid Glass UI v1.2.0 Initializing...");

    // ... 既存の CORE FEATURES, UI COMPONENTS, ADVANCED INTERACTIONS のコード ...
    // (以下、変更なし)

    // SECTION 1: CORE FEATURES
    const darkModeMatcher = window.matchMedia("(prefers-color-scheme: dark)");
    function applyDarkMode(isDark) { document.body.classList.toggle("dark-mode", isDark); }
    applyDarkMode(darkModeMatcher.matches);
    darkModeMatcher.addEventListener("change", e => applyDarkMode(e.matches));

    const parallaxElements = document.querySelectorAll(".lg-parallax");
    const dynamicLightElements = document.querySelectorAll(".lg-dynamic-light");
    document.addEventListener("mousemove", (e) => {
      const xRatio = e.clientX / window.innerWidth, yRatio = e.clientY / window.innerHeight;
      const xOffset = (xRatio - 0.5) * 20, yOffset = (yRatio - 0.5) * -20;
      parallaxElements.forEach(el => el.style.transform = `perspective(1000px) rotateX(${yOffset}deg) rotateY(${xOffset}deg)`);
      dynamicLightElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    });

    document.querySelectorAll(".lg-char-animate").forEach(textEl => {
      const text = textEl.textContent;
      textEl.innerHTML = "";
      text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.animationDelay = `${index * 0.05}s`;
        textEl.appendChild(span);
      });
    });

    // SECTION 2: UI COMPONENTS
    function initModal() {
      const openModalBtn = document.getElementById('open-modal-btn');
      const modal = document.getElementById('my-modal');
      if (!openModalBtn || !modal) return;
      const closeModalBtn = modal.querySelector('.lg-modal-close-btn');
      if (!closeModalBtn) return;
      const openModal = () => { modal.classList.add('is-open'); document.body.style.overflow = 'hidden'; };
      const closeModal = () => { modal.classList.remove('is-open'); document.body.style.overflow = ''; };
      openModalBtn.addEventListener('click', openModal);
      closeModalBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', e => (e.target === modal) && closeModal());
      document.addEventListener('keydown', e => (e.key === 'Escape' && modal.classList.contains('is-open')) && closeModal());
    }
    initModal();

    function initCarousel() {
      if (typeof Carousel3D === 'function' && document.getElementById('glass-carousel')) {
        setTimeout(() => {
          try {
            new Carousel3D('#glass-carousel', { tiltAngle: 85, distanceZ: -280, transitionDuration: 0.8 });
            console.log("Component Initialized: 3D Glass Carousel");
          } catch (error) {
            console.error("Failed to initialize 3D Glass Carousel:", error);
          }
        }, 100);
      }
    }
    initCarousel();

    // SECTION 3: ADVANCED INTERACTIONS
    function initAdaptiveBackground() {
      const glassPanels = document.querySelectorAll('.lg-glass');
      const lightSections = document.querySelectorAll('.lg-light-section');
      if (glassPanels.length === 0 || lightSections.length === 0) return;
      const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
      const observerCallback = (entries) => {
        entries.forEach(entry => { entry.target.isIntersecting = entry.isIntersecting; });
        checkAllPanels();
      };
      const lightSectionObserver = new IntersectionObserver(observerCallback, observerOptions);
      const glassPanelObserver = new IntersectionObserver(observerCallback, observerOptions);
      lightSections.forEach(section => lightSectionObserver.observe(section));
      glassPanels.forEach(panel => glassPanelObserver.observe(panel));

      function checkAllPanels() {
        glassPanels.forEach(panel => {
          if (!panel.isIntersecting) return;
          let isOnLightBg = false;
          lightSections.forEach(section => {
            if (section.isIntersecting) {
              const panelRect = panel.getBoundingClientRect();
              const sectionRect = section.getBoundingClientRect();
              const overlap = !(panelRect.right < sectionRect.left || panelRect.left > sectionRect.right || panelRect.bottom < sectionRect.top || panelRect.top > sectionRect.bottom);
              if (overlap) isOnLightBg = true;
            }
          });
          panel.classList.toggle('is-on-light-bg', isOnLightBg);
        });
      }
      setTimeout(checkAllPanels, 100);
    }
    initAdaptiveBackground();

    console.log("Liquid Glass UI is Ready.");
  });

})();