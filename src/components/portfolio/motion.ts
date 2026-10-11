export function initPortfolio(): (() => void) | undefined {
  const root = document.querySelector<HTMLElement>("[data-portfolio]");
  if (!root) return;

  const controller = new AbortController();
  const { signal } = controller;
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const orb = root.querySelector<HTMLElement>("[data-orb]");
  const canvas = orb?.querySelector("canvas");
  const context = canvas?.getContext("2d");
  let frame = 0;
  let inView = false;
  let width = 0;
  let height = 0;
  let rotation = 0;
  let lastTime = 0;
  let pointerX = 0;
  let pointerY = 0;
  let angleX = 0;
  let angleY = 0;
  let particles: { x: number; y: number; z: number; purple: boolean }[] = [];

  const stopped = () => preference.matches;

  function draw() {
    if (!context || !canvas || !width || !height) return;
    context.clearRect(0, 0, width, height);
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.335;
    const turn = rotation + angleX;
    const tilt = -0.22 + angleY;
    const cosine = Math.cos(turn);
    const sine = Math.sin(turn);
    const tiltCosine = Math.cos(tilt);
    const tiltSine = Math.sin(tilt);

    context.lineWidth = 0.7;
    context.strokeStyle = "rgba(114,165,211,.25)";
    context.beginPath();
    context.ellipse(
      centerX,
      centerY,
      radius * 1.2,
      radius * 0.36,
      -0.5,
      0,
      Math.PI * 2,
    );
    context.stroke();
    context.strokeStyle = "rgba(158,120,210,.22)";
    context.beginPath();
    context.ellipse(
      centerX,
      centerY,
      radius * 0.48,
      radius * 1.14,
      -0.4,
      0,
      Math.PI * 2,
    );
    context.stroke();

    for (const particle of particles) {
      const x = particle.x * cosine + particle.z * sine;
      const z = -particle.x * sine + particle.z * cosine;
      const y = particle.y * tiltCosine - z * tiltSine;
      const depth = particle.y * tiltSine + z * tiltCosine;
      const perspective = 2.8 / (2.8 - depth * 0.35);
      const alpha = 0.17 + ((depth + 1) / 2) * 0.7;
      context.fillStyle = particle.purple
        ? `rgba(158,120,210,${alpha})`
        : `rgba(114,165,211,${alpha})`;
      const size = (depth > 0.5 ? 1.6 : 1.05) * perspective;
      context.fillRect(
        centerX + x * radius * perspective,
        centerY + y * radius * perspective,
        size,
        size,
      );
    }
  }

  function tick(time: number) {
    frame = 0;
    if (stopped() || document.hidden || !inView) return;
    const elapsed = lastTime ? Math.min(time - lastTime, 50) : 0;
    lastTime = time;
    rotation += elapsed * 0.000075;
    angleX += (pointerX - angleX) * 0.035;
    angleY += (pointerY - angleY) * 0.035;
    draw();
    frame = requestAnimationFrame(tick);
  }

  function syncLoop() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    if (!stopped() && inView && !document.hidden && context) {
      frame = requestAnimationFrame(tick);
    } else {
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

  let resize: ResizeObserver | undefined;
  let visibility: IntersectionObserver | undefined;
  if (orb && canvas && context) {
    function sizeCanvas() {
      if (!orb || !canvas || !context) return;
      const bounds = orb.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(devicePixelRatio || 1, width < 500 ? 1.5 : 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = width < 500 ? 650 : 1350;
      particles = Array.from({ length: count }, (_, index) => {
        const y = 1 - (index / (count - 1)) * 2;
        const ring = Math.sqrt(1 - y * y);
        const theta = index * Math.PI * (3 - Math.sqrt(5));
        return {
          x: Math.cos(theta) * ring,
          y,
          z: Math.sin(theta) * ring,
          purple: index % 4 === 0,
        };
      });
      draw();
    }
    sizeCanvas();
    orb.classList.add("has-canvas");
    resize = new ResizeObserver(sizeCanvas);
    resize.observe(orb);
    visibility = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      syncLoop();
    });
    visibility.observe(orb);
    orb.addEventListener(
      "pointermove",
      event => {
        if (stopped() || event.pointerType !== "mouse") return;
        const bounds = orb.getBoundingClientRect();
        pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.5;
        pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.35;
      },
      { signal },
    );
    orb.addEventListener(
      "pointerleave",
      () => {
        pointerX = 0;
        pointerY = 0;
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
    resize?.disconnect();
    visibility?.disconnect();
    cancelAnimationFrame(frame);
  };
}
