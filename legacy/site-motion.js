/**
 * Shared motion for Head & Co. interior pages.
 * Reveals, image wipes, masked headline splits, the menu overlay, gliding
 * anchors, and the "open now" clock. Home has its own richer copy of this
 * because it also drives the hero and the ritual sequence.
 */

const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

export function initMotion(options = {}) {
  const cleanups = [];
  const add = (fn) => cleanups.push(fn);
  const q = (sel) => Array.from(document.querySelectorAll(sel));

  // The OS preference wins unless a caller names a mode explicitly.
  let motion = options.motion || "auto";
  if (motion === "auto") {
    motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "off" : "full";
  }
  const animate = motion !== "off";

  setOpenState();
  setupBookLabel(add);
  const lenis = animate ? setupSmoothScroll(add, motion) : null;
  setupMenu(q, add, lenis);
  if (animate) {
    setupSplit(q, add);
    setupClips(q, add);
    setupReveals(q, add, motion);
  }
  setupAnchors(add, animate, lenis);

  return () => cleanups.forEach((fn) => fn());
}

/**
 * Lenis eases the wheel toward the browser's own scroll position rather than
 * replacing it, so the scrollbar, keyboard, Find-in-page and assistive tools all
 * still drive the page. Touch is left entirely native — syncTouch fights the
 * platform's momentum and feels worse than doing nothing.
 *
 * Never runs under reduced motion: the caller only reaches this when animation
 * is on, so a reader who asked for less gets the plain browser scroll.
 */
function setupSmoothScroll(add, motion) {
  if (typeof window.Lenis !== "function") return null;

  const lenis = new window.Lenis({
    // 0.12 settles in ~200ms. The floaty 0.095 this replaced overshot every stop.
    lerp: motion === "restrained" ? 0.2 : 0.12,
    smoothWheel: true,
    syncTouch: false,
  });

  let raf = requestAnimationFrame(function frame(time) {
    lenis.raf(time);
    raf = requestAnimationFrame(frame);
  });

  add(() => {
    cancelAnimationFrame(raf);
    lenis.destroy();
  });

  return lenis;
}

/** Jeddah is UTC+3; open 14:00–23:00 every day. */
function setOpenState() {
  const h = (new Date().getUTCHours() + 3) % 24;
  const open = h >= 14 && h < 23;
  document.querySelectorAll("[data-hc-open-badge]").forEach((el) => {
    el.textContent = open ? "Open now" : "Opens at 2:00 PM";
  });
  document.querySelectorAll("[data-hc-open-now]").forEach((el) => {
    el.textContent = open ? " · open now" : "";
  });
}

/** Matches Home: the button says where it goes until the header runs short of room. */
function setupBookLabel(add) {
  const label = document.querySelector("[data-hc-booklabel]");
  if (!label) return;
  const mq = window.matchMedia("(max-width: 860px)");
  const apply = () => {
    label.textContent = mq.matches ? "Book" : "Book on Fresha";
  };
  apply();
  mq.addEventListener("change", apply);
  add(() => mq.removeEventListener("change", apply));
}

/**
 * Below 860px the inline nav is hidden by CSS and this overlay takes over.
 * It is a real modal: focus moves in, stays in while it is open, and returns
 * to the button that opened it.
 */
function setupMenu(q, add, lenis) {
  const overlay = document.querySelector("[data-hc-overlay]");
  const openBtn = document.querySelector("[data-hc-menu-open]");
  const closeBtn = document.querySelector("[data-hc-menu-close]");
  if (!overlay || !openBtn) return;

  const focusable = () =>
    Array.from(overlay.querySelectorAll("a[href], button")).filter(
      (el) => el.offsetParent !== null,
    );

  const onKeydown = (e) => {
    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key !== "Tab") return;
    const items = focusable();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const open = () => {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
    // Lenis keeps easing the page behind the overlay unless it is told to stop.
    if (lenis) lenis.stop();
    openBtn.setAttribute("aria-expanded", "true");
    document.addEventListener("keydown", onKeydown);
    const items = focusable();
    if (items.length) items[0].focus();
  };

  const close = () => {
    overlay.style.display = "none";
    document.body.style.overflow = "";
    if (lenis) lenis.start();
    openBtn.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", onKeydown);
    // A resize past the breakpoint hides the button that opened this, and a
    // display:none element cannot take focus — that would strand focus on <body>.
    if (openBtn.offsetParent !== null) openBtn.focus();
    else {
      const fallback = document.querySelector("header a[href]");
      if (fallback) fallback.focus();
    }
  };

  openBtn.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);
  q("[data-hc-menu-link]").forEach((a) => a.addEventListener("click", close));

  // A resize past the breakpoint would otherwise strand the overlay open.
  const mq = window.matchMedia("(max-width: 860px)");
  const onChange = () => {
    if (!mq.matches && overlay.style.display === "flex") close();
  };
  mq.addEventListener("change", onChange);

  add(() => {
    document.removeEventListener("keydown", onKeydown);
    mq.removeEventListener("change", onChange);
    document.body.style.overflow = "";
  });
}

function setupSplit(q, add) {
  q("[data-hc-split]").forEach((el) => {
    if (el.dataset.hcSplitDone) return;
    const words = (el.textContent || "").trim().split(/\s+/);
    el.textContent = "";
    el.dataset.hcSplitDone = "1";
    words.forEach((word, i) => {
      const mask = document.createElement("span");
      mask.style.display = "inline-block";
      mask.style.overflow = "hidden";
      mask.style.verticalAlign = "top";
      mask.style.paddingBottom = "0.06em";
      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.style.transform = "translateY(105%)";
      inner.style.transition = "transform 1000ms " + EASE + " " + (100 + i * 65) + "ms";
      inner.textContent = word;
      mask.appendChild(inner);
      el.appendChild(mask);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          Array.from(el.children).forEach((mask) => {
            const inner = mask.firstChild;
            if (inner && inner.style) inner.style.transform = "translateY(0)";
          });
          io.disconnect();
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    add(() => io.disconnect());
    el.removeAttribute("data-reveal");
  });
}

function setupClips(q, add) {
  const targets = q("[data-hc-clip]");
  targets.forEach((el) => {
    el.style.clipPath = "inset(0 0 100% 0)";
    el.style.transition = "clip-path 1400ms " + EASE;
    el.style.willChange = "clip-path";
    const child = el.firstElementChild;
    if (child) {
      child.style.transform = "scale(1.08)";
      child.style.transition = "transform 1800ms " + EASE;
    }
    el.removeAttribute("data-reveal");
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.clipPath = "inset(0 0 0% 0)";
        const child = el.firstElementChild;
        if (child) child.style.transform = "scale(1)";
        io.unobserve(el);
        setTimeout(() => {
          el.style.willChange = "auto";
          el.style.clipPath = "";
          if (child) child.style.transform = "";
        }, 2000);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  targets.forEach((el) => io.observe(el));
  add(() => io.disconnect());
}

function setupReveals(q, add, motion) {
  const nodes = q("[data-reveal]");
  const dist = motion === "restrained" ? "14px" : "26px";
  const dur = motion === "restrained" ? 700 : 1000;
  nodes.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(" + dist + ")";
    el.style.transition =
      "opacity " + dur + "ms " + EASE + ", transform " + dur + "ms " + EASE;
    el.style.transitionDelay = (el.getAttribute("data-reveal-delay") || 0) + "ms";
    el.style.willChange = "opacity, transform";
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.opacity = "1";
        el.style.transform = "none";
        io.unobserve(el);
        setTimeout(() => {
          el.style.willChange = "auto";
        }, 1400);
      });
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.04 },
  );
  nodes.forEach((el) => io.observe(el));
  add(() => io.disconnect());
}

/** Anchor jumps clear the 76px sticky header, routed through Lenis when it is running. */
function setupAnchors(add, animate, lenis) {
  const onClick = (e) => {
    const link = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!link) return;
    const id = link.getAttribute("href").slice(1);
    const node = id ? document.getElementById(id) : document.body;
    if (!node) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(node, { offset: -92 });
      return;
    }
    const y = node.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top: Math.max(0, y), behavior: animate ? "smooth" : "auto" });
  };
  document.addEventListener("click", onClick);
  add(() => document.removeEventListener("click", onClick));
}
