/**
 * Liquid Glass UI
 * @version 1.3.0
 * @description A self-contained JavaScript library for creating UI with glass morphism and modern effects. CSS is injected automatically.
 * @author (Your Name)
 */

(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------
   *  SECTION A: DYNAMIC STYLE INJECTION
   *  - All CSS rules are embedded here and injected into the <head>.
   * ----------------------------------------------------------------
   */
  const cssStyles = `
    /*
    * Liquid Glass UI - Embedded Styles
    * @version 1.3.0
    */

    /* === CORE & SETUP === */
    body.dark-mode { filter: brightness(0.8) contrast(1.1); }
    .lg-glass {
      backdrop-filter: blur(24px) saturate(160%);
      -webkit-backdrop-filter: blur(24px) saturate(160%);
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      padding: 2rem;
      color: #f0f0f0;
      transition: all 0.4s ease, color 0.4s ease, border-color 0.4s ease;
      position: relative;
      overflow: hidden;
      --mouse-x: 50%;
      --mouse-y: 50%;
    }
    .lg-glass h1, .lg-glass h2, .lg-glass h3 {
      font-family: 'Orbitron', sans-serif;
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
      transition: text-shadow 0.4s ease;
    }

    /* === MODIFIERS: EFFECTS === */
    .lg-glow:hover {
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.2), 0 0 40px rgba(0, 200, 255, 0.15), 0 0 60px rgba(0, 200, 255, 0.1);
      transform: scale(1.02);
    }
    .lg-float { animation: lg-float-anim 5s ease-in-out infinite; }
    @keyframes lg-float-anim { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    .lg-animated-border {
      border-width: 2px;
      border-style: solid;
      border-image-slice: 1;
      border-image-source: linear-gradient(var(--angle, 0deg), #00f0ff, #ff00c8, #ffdd00, #00f0ff);
      animation: lg-rotate-gradient-anim 8s linear infinite;
    }
    @keyframes lg-rotate-gradient-anim { to { --angle: 360deg; } }
    .lg-depth-1 { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
    .lg-depth-2 { box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2); }
    .lg-depth-3 { box-shadow: 0 10px 32px rgba(0, 0, 0, 0.3); }

    /* === DYNAMIC EFFECTS (JS-driven) === */
    .lg-dynamic-light::before {
      content: '';
      position: absolute;
      top: var(--mouse-y);
      left: var(--mouse-x);
      width: 300px;
      height: 300px;
      background: radial-gradient(circle closest-side, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%);
      transform: translate(-50%, -50%);
      pointer-events: none;
      transition: top 0.1s ease-out, left 0.1s ease-out;
      z-index: 0;
      mix-blend-mode: overlay;
    }

    /* === TEXT ANIMATIONS === */
    .lg-text-animate-fadein { animation: lg-fade-in-anim 1s ease-out forwards; }
    @keyframes lg-fade-in-anim { from { opacity: 0; } to { opacity: 1; } }
    .lg-text-animate-slidein-up { animation: lg-slide-in-up-anim 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; opacity: 0; }
    @keyframes lg-slide-in-up-anim { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .lg-char-animate span {
      display: inline-block;
      opacity: 0;
      transform: translateY(20px) scale(0.8);
      animation: lg-char-bounce-in-anim 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    @keyframes lg-char-bounce-in-anim { to { opacity: 1; transform: translateY(0) scale(1); } }

    /* === STATES: DARK MODE, FOCUS, ADAPTIVE === */
    body.dark-mode .lg-glass {
      background-color: rgba(20, 20, 35, 0.6);
      border-color: rgba(100, 100, 150, 0.25);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      color: #e0e0e0;
    }
    body.dark-mode .lg-dynamic-light::before { background: radial-gradient(circle closest-side, rgba(200, 220, 255, 0.15) 0%, rgba(100, 100, 200, 0) 100%); }
    .lg-button:focus-visible, .lg-interactive:focus-visible {
      outline: 2px solid rgba(0, 200, 255, 0.7);
      outline-offset: 3px;
      box-shadow: 0 0 15px rgba(0, 200, 255, 0.3), 0 0 30px rgba(0, 150, 255, 0.2);
      transform: scale(1.03);
    }
    .lg-glass.is-on-light-bg { color: #333; border-color: rgba(0, 0, 0, 0.1); }
    .lg-glass.is-on-light-bg h1, .lg-glass.is-on-light-bg h2, .lg-glass.is-on-light-bg h3 { text-shadow: none; }
    .lg-glass.is-on-light-bg .lg-icon { filter: none; }

    /* === UI COMPONENTS === */
    .lg-button { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); border-radius: 2rem; color: white; backdrop-filter: blur(12px); transition: all 0.3s ease; cursor: pointer; }
    .lg-button:hover { background: rgba(255,255,255,0.2); box-shadow: 0 0 20px rgba(255,255,255,0.15); }
    body.dark-mode .lg-button { background: rgba(50, 50, 70, 0.3); border-color: rgba(150, 150, 200, 0.4); color: #e0e0e0; }
    body.dark-mode .lg-button:hover { background: rgba(70, 70, 90, 0.4); box-shadow: 0 0 20px rgba(150, 150, 255, 0.3); }
    .lg-glass.is-on-light-bg .lg-button { color: #333; border-color: rgba(0, 0, 0, 0.2); background-color: rgba(0, 0, 0, 0.05); }
    .lg-glass.is-on-light-bg .lg-button:hover { background-color: rgba(0, 0, 0, 0.1); }
    .lg-icon { font-size: 1.2em; filter: drop-shadow(0 0 2px rgba(255,255,255,0.5)); }
    body.dark-mode .lg-icon { filter: drop-shadow(0 0 3px rgba(180, 180, 255, 0.7)); }

    .lg-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 1000; opacity: 0; visibility: hidden; transition: opacity 0.4s ease, visibility 0s 0.4s; }
    .lg-modal-overlay.is-open { opacity: 1; visibility: visible; transition: opacity 0.4s ease; }
    .lg-modal-content { position: relative; max-width: 500px; width: 90%; padding: 2.5rem; transform: scale(0.9) translateY(20px); transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); }
    .lg-modal-overlay.is-open .lg-modal-content { transform: scale(1) translateY(0); }
    .lg-modal-close-btn { position: absolute; top: 1rem; right: 1rem; width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.1); color: white; font-size: 20px; line-height: 30px; text-align: center; cursor: pointer; transition: all 0.3s ease; backdrop-filter: blur(5px); }
    .lg-modal-close-btn:hover { background: rgba(255, 255, 255, 0.2); transform: rotate(90deg); }

    .carousel-container { width: 100%; margin: 10vh 0; text-align: center; }
    .carousel-title { font-family: 'Orbitron', sans-serif; color: white; text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); margin-bottom: 2rem; }
    .wrapper { position: relative; width: 400px; height: 600px; margin: 0 auto 2rem auto; perspective: 2000px; }
    .carousel { width: 100%; height: 100%; position: absolute; transform-style: preserve-3d; }
    .carousel .cell { position: absolute; width: 380px; height: 580px; top: 10px; left: 50%; padding: 1.5rem; box-sizing: border-box; transform: translateX(-50%); display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .carousel .cell.lg-glass { box-shadow: none; }
    .carousel .cell img { width: 100%; max-height: 70%; object-fit: cover; border-radius: 12px; margin-top: 1rem; }
    .carousel .cell h3 { margin: 0; }
    .carousel .cell p { margin: 0.5rem 0 0 0; font-size: 0.9rem; font-family: 'Noto Sans JP', sans-serif; }
  `;

  (function injectStyles() {
    const styleId = 'liquid-glass-ui-styles';
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.type = 'text/css';
    style.textContent = cssStyles;
    document.head.appendChild(style);
  })();


  /**
   * ----------------------------------------------------------------
   *  SECTION B: INTEGRATED LIBRARIES
   *  - Carousel3D Class Definition
   * ----------------------------------------------------------------
   */
  class Carousel3D {
    constructor(selector, options = {}) {
      const container = document.querySelector(selector);
      if (!container) return;
      this.container = container; this.carousel = container.querySelector('.carousel'); this.cells = Array.from(this.carousel.children);
      this.prevBtn = container.parentElement.querySelector('[data-carousel-prev]'); this.nextBtn = container.parentElement.querySelector('[data-carousel-next]');
      const defaults = { tiltAngle: 90, distanceZ: -300, transitionDuration: 0.8 };
      this.options = Object.assign({}, defaults, options);
      this.cardHeight = this.cells.length > 0 ? this.cells[0].offsetHeight : 0;
      this.options.distanceY = this.cardHeight / 2;
      this.cellCount = this.cells.length; this.selectedIndex = 0; this.init();
    }
    init() {
      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
      this.cells.forEach(cell => cell.style.transition = `transform ${this.options.transitionDuration}s ease, opacity ${this.options.transitionDuration}s ease`);
      this.rotate();
    }
    rotate() {
      const { tiltAngle, distanceY, distanceZ } = this.options;
      this.cells.forEach((cell, i) => {
        let cellIndex = this.selectedIndex % this.cellCount;
        if (cellIndex < 0) cellIndex += this.cellCount;
        const relativeIndex = i - cellIndex;
        let newTransform = '', newOpacity = 0, newZIndex = 0;
        if (relativeIndex === 0) {
          newTransform = `translateX(-50%) rotateX(0deg)`; newOpacity = 1; newZIndex = this.cellCount;
        } else if (relativeIndex === 1 || relativeIndex === -(this.cellCount - 1)) {
          newTransform = `translateX(-50%) translateY(${distanceY}px) translateZ(${distanceZ}px) rotateX(-${tiltAngle}deg)`; newOpacity = 0; newZIndex = this.cellCount - 1;
        } else if (relativeIndex === -1 || relativeIndex === this.cellCount - 1) {
          newTransform = `translateX(-50%) translateY(-${distanceY}px) translateZ(${distanceZ}px) rotateX(${tiltAngle}deg)`; newOpacity = 0; newZIndex = this.cellCount - 1;
        } else {
          const y = relativeIndex > 0 ? distanceY * 2 : -distanceY * 2; const z = distanceZ - 100; const angle = relativeIndex > 0 ? -tiltAngle : tiltAngle;
          newTransform = `translateX(-50%) translateY(${y}px) translateZ(${z}px) rotateX(${angle}deg)`; newOpacity = 0;
        }
        cell.style.transform = newTransform; cell.style.opacity = newOpacity; cell.style.zIndex = newZIndex;
      });
    }
    next() { this.selectedIndex++; this.rotate(); }
    prev() { this.selectedIndex--; this.rotate(); }
  }


  /**
   * ----------------------------------------------------------------
   *  SECTION C: MAIN LOGIC
   * ----------------------------------------------------------------
   */
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Liquid Glass UI v1.3.0 Initializing...");

    // SECTION 1: CORE FEATURES
    const darkModeMatcher = window.matchMedia("(prefers-color-scheme: dark)");
    function applyDarkMode(isDark) { document.body.classList.toggle("dark-mode", isDark); }
    applyDarkMode(darkModeMatcher.matches);
    darkModeMatcher.addEventListener("change", e => applyDarkMode(e.matches));

    const parallaxElements = document.querySelectorAll(".lg-parallax");
    const dynamicLightElements = document.querySelectorAll(".lg-dynamic-light");
    document.addEventListener("mousemove", (e) => {
      const xRatio = e.clientX / window.innerWidth, yRatio = e.clientY / window.innerHeight, xOffset = (xRatio - 0.5) * 20, yOffset = (yRatio - 0.5) * -20;
      parallaxElements.forEach(el => el.style.transform = `perspective(1000px) rotateX(${yOffset}deg) rotateY(${xOffset}deg)`);
      dynamicLightElements.forEach(el => { const rect = el.getBoundingClientRect(); el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`); el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`); });
    });

    document.querySelectorAll(".lg-char-animate").forEach(textEl => {
      const text = textEl.textContent; textEl.innerHTML = ""; text.split("").forEach((char, index) => { const span = document.createElement("span"); span.textContent = char === " " ? "\u00A0" : char; span.style.animationDelay = `${index * 0.05}s`; textEl.appendChild(span); });
    });

    // SECTION 2: UI COMPONENTS
    function initModal() {
      const openModalBtn = document.getElementById('open-modal-btn'), modal = document.getElementById('my-modal');
      if (!openModalBtn || !modal) return; const closeModalBtn = modal.querySelector('.lg-modal-close-btn'); if (!closeModalBtn) return;
      const openModal = () => { modal.classList.add('is-open'); document.body.style.overflow = 'hidden'; }, closeModal = () => { modal.classList.remove('is-open'); document.body.style.overflow = ''; };
      openModalBtn.addEventListener('click', openModal); closeModalBtn.addEventListener('click', closeModal); modal.addEventListener('click', e => (e.target === modal) && closeModal()); document.addEventListener('keydown', e => (e.key === 'Escape' && modal.classList.contains('is-open')) && closeModal());
    }
    initModal();

    function initCarousel() {
      if (typeof Carousel3D === 'function' && document.getElementById('glass-carousel')) {
        setTimeout(() => {
          try { new Carousel3D('#glass-carousel', { tiltAngle: 85, distanceZ: -280, transitionDuration: 0.8 }); } catch (error) { console.error("Failed to initialize 3D Glass Carousel:", error); }
        }, 100);
      }
    }
    initCarousel();

    // SECTION 3: ADVANCED INTERACTIONS
    function initAdaptiveBackground() {
      const glassPanels = document.querySelectorAll('.lg-glass'), lightSections = document.querySelectorAll('.lg-light-section');
      if (glassPanels.length === 0 || lightSections.length === 0) return;
      const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
      const observerCallback = (entries) => { entries.forEach(entry => { entry.target.isIntersecting = entry.isIntersecting; }); checkAllPanels(); };
      const lightSectionObserver = new IntersectionObserver(observerCallback, observerOptions), glassPanelObserver = new IntersectionObserver(observerCallback, observerOptions);
      lightSections.forEach(section => lightSectionObserver.observe(section)); glassPanels.forEach(panel => glassPanelObserver.observe(panel));
      function checkAllPanels() {
        glassPanels.forEach(panel => {
          if (!panel.isIntersecting) return; let isOnLightBg = false;
          lightSections.forEach(section => {
            if (section.isIntersecting) {
              const panelRect = panel.getBoundingClientRect(), sectionRect = section.getBoundingClientRect();
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