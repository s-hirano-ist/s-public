export function initPortfolio(): (() => void) | undefined {
  const root = document.querySelector<HTMLElement>("[data-portfolio]");
  if (!root) return;

  const controller = new AbortController();
  const { signal } = controller;
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const portrait = root.querySelector<HTMLElement>("[data-portrait]");
  let frame = 0;
  let inView = false;
  let pointerX = 0;
  let pointerY = 0;
  let angleX = 0;
  let angleY = 0;

  const stopped = () => preference.matches;

  function draw() {
    portrait?.style.setProperty("--portrait-yaw", `${angleX}deg`);
    portrait?.style.setProperty("--portrait-pitch", `${angleY}deg`);
  }

  function tick() {
    frame = 0;
    if (stopped() || document.hidden || !inView) return;
    angleX += (pointerX - angleX) * 0.08;
    angleY += (pointerY - angleY) * 0.08;
    draw();
    if (Math.abs(pointerX - angleX) + Math.abs(pointerY - angleY) > 0.01) {
      frame = requestAnimationFrame(tick);
    }
  }

  function syncLoop() {
    cancelAnimationFrame(frame);
    frame = 0;
    const active = !stopped() && inView && !document.hidden;
    portrait?.classList.toggle("is-active", active);
    if (active) {
      frame = requestAnimationFrame(tick);
    } else {
      pointerX = pointerY = angleX = angleY = 0;
      draw();
    }
  }

  function updateMotion() {
    root?.classList.toggle("motion-enabled", !stopped());
    root?.classList.toggle("motion-paused", stopped());
    document.dispatchEvent(
      new CustomEvent("portfolio:motion", { detail: { paused: stopped() } }),
    );
    syncLoop();
  }

  const reveal = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        reveal.unobserve(entry.target);
      }
    },
    { threshold: 0.08 },
  );
  for (const element of root.querySelectorAll("[data-reveal]"))
    reveal.observe(element);

  let visibility: IntersectionObserver | undefined;
  if (portrait) {
    visibility = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      syncLoop();
    });
    visibility.observe(portrait);
    portrait.addEventListener(
      "pointermove",
      event => {
        if (stopped() || event.pointerType !== "mouse") return;
        const bounds = portrait.getBoundingClientRect();
        pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
        pointerY = -((event.clientY - bounds.top) / bounds.height - 0.5) * 6;
        if (!frame) frame = requestAnimationFrame(tick);
      },
      { signal },
    );
    portrait.addEventListener(
      "pointerleave",
      () => {
        pointerX = 0;
        pointerY = 0;
        if (!frame) frame = requestAnimationFrame(tick);
      },
      { signal },
    );
  }

  preference.addEventListener("change", updateMotion, { signal });
  document.addEventListener("visibilitychange", syncLoop, { signal });

  const menu = root.querySelector<HTMLDetailsElement>(".p-mobile-nav");
  menu?.addEventListener(
    "click",
    event => {
      if ((event.target as Element).closest("a")) menu.open = false;
    },
    { signal },
  );
  root.addEventListener(
    "keydown",
    event => {
      if (event.key === "Escape" && menu?.open) {
        menu.open = false;
        menu.querySelector("summary")?.focus();
      }
    },
    { signal },
  );

  updateMotion();
  return () => {
    controller.abort();
    reveal.disconnect();
    visibility?.disconnect();
    cancelAnimationFrame(frame);
  };
}
