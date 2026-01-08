import { useRef, useEffect } from "react";

function Background3D() {
  const visibleRef = useRef(true);

  const canvasRef = useRef(null);
  const layersRef = useRef([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    active: false,
    strength: 0,
  });
  const idleRef = useRef({ time: 0, burst: false });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    /* ---------- REDUCED MOTION (ACCESSIBILITY + PERF) ---------- */
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let unit = 0;
    let cx = 0;
    let cy = 0;

    let observer;

    /* ---------- RESIZE ---------- */
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      unit = Math.min(width, height);
      cx = width / 2;
      cy = height / 2;

      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      buildLayers();
    };

    /* ---------- BUILD ---------- */
    const buildLayers = () => {
      const isMobile = unit < 600;
      const LAYERS = isMobile ? 2 : 3;
      const BASE_NODES = isMobile ? 55 : 150;

      layersRef.current = Array.from({ length: LAYERS }, (_, i) => {
        const depth = (i + 1) / LAYERS;
        const count = Math.floor(BASE_NODES / depth);

        return {
          depth,
          nodes: Array.from({ length: count }, () => {
            const x = Math.random() * width;
            const y = Math.random() * height;
            return {
              x,
              y,
              hx: x,
              hy: y,
              vx: (Math.random() - 0.5) * unit * 0.00018 * depth,
              vy: (Math.random() - 0.5) * unit * 0.00018 * depth,
              ox: 0,
              oy: 0,
              disconnect: 0,
              r: unit * 0.003 * depth,
            };
          }),
        };
      });
    };

    resize();
    window.addEventListener("resize", resize);

    /* ---------- VISIBILITY OBSERVER ---------- */
    observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    /* ---------- INPUT ---------- */
    const activate = (x, y) => {
      pointerRef.current.x = x;
      pointerRef.current.y = y;
      pointerRef.current.active = true;
    };
    const deactivate = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener("mousemove", (e) => activate(e.clientX, e.clientY));
    window.addEventListener("mouseout", deactivate);
    window.addEventListener("touchstart", (e) =>
      activate(e.touches[0].clientX, e.touches[0].clientY)
    );
    window.addEventListener("touchmove", (e) =>
      activate(e.touches[0].clientX, e.touches[0].clientY)
    );
    window.addEventListener("touchend", deactivate);

    /* ---------- ANIMATION ---------- */
    let lastTime = 0;

    const animate = () => {
      if (!visibleRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const now = performance.now();
      if (now - lastTime < 33) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const LINK_DIST = unit * 0.22;
      const INTERACT_RADIUS = unit * 0.25;

      const HOME_GRAVITY = 0.00035;

      const BALANCE_FORCE = 0.00035;
      const CENTER_DAMPING = 0.00015;

      pointerRef.current.strength +=
        ((pointerRef.current.active ? 1 : 0) - pointerRef.current.strength) *
        0.08;

      if (!pointerRef.current.active) idleRef.current.time++;
      else idleRef.current.time = 0;

      const isIdleLong = idleRef.current.time > 1200;

      layersRef.current.forEach(({ nodes, depth }) => {
        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;

          n.ox += (n.hx - n.x) * HOME_GRAVITY * depth;
          n.oy += (n.hy - n.y) * HOME_GRAVITY * depth;

          const normX = (n.x - cx) / (width * 0.5);
          n.ox -= normX * BALANCE_FORCE * unit * depth;

          if (!pointerRef.current.active) {
            const dx = n.x - cx;
            const dy = n.y - cy;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < unit * 0.45) {
              const repel = (1 - dist / (unit * 0.45)) * CENTER_DAMPING * unit;
              n.ox += (dx / dist) * repel;
              n.oy += (dy / dist) * repel;
            }
          }

          if (
            isIdleLong &&
            pointerRef.current.active &&
            !idleRef.current.burst
          ) {
            const dx = n.x - cx;
            const dy = n.y - cy;
            const dist = Math.hypot(dx, dy) || 1;
            const burst = depth * unit * 0.0022;
            n.ox += (dx / dist) * burst;
            n.oy += (dy / dist) * burst;
            idleRef.current.burst = true;
          }

          let target = 0;
          if (pointerRef.current.active) {
            const d = Math.hypot(
              n.x - pointerRef.current.x,
              n.y - pointerRef.current.y
            );
            if (d < INTERACT_RADIUS) target = 1;
          }
          n.disconnect += (target - n.disconnect) * 0.15;

          if (n.disconnect > 0.01 && pointerRef.current.active) {
            const dx = n.x - pointerRef.current.x;
            const dy = n.y - pointerRef.current.y;
            const d = Math.hypot(dx, dy) || 1;
            const swirl = n.disconnect * depth * 1.2;
            n.ox += (-dy / d) * swirl;
            n.oy += (dx / d) * swirl;
          }

          n.x += n.ox * 0.08;
          n.y += n.oy * 0.08;
          n.ox *= 0.9;
          n.oy *= 0.9;

          if (n.x < 0) n.x += width;
          if (n.x > width) n.x -= width;
          if (n.y < 0) n.y += height;
          if (n.y > height) n.y -= height;
        });

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d > LINK_DIST) continue;

            const alpha =
              Math.pow(1 - d / LINK_DIST, 1.4) *
              (1 - Math.max(a.disconnect, b.disconnect)) *
              0.45 *
              depth;

            ctx.strokeStyle = `rgba(235,195,95,${alpha})`;
            ctx.lineWidth = depth;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        nodes.forEach((n) => {
          ctx.fillStyle = `rgba(130,130,130,${1 - n.disconnect * 0.6})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      if (!pointerRef.current.active) idleRef.current.burst = false;

      if (pointerRef.current.strength > 0.01) {
        const glowRadius = unit * 0.12 * pointerRef.current.strength;
        const g = ctx.createRadialGradient(
          pointerRef.current.x,
          pointerRef.current.y,
          0,
          pointerRef.current.x,
          pointerRef.current.y,
          glowRadius
        );
        g.addColorStop(0, "rgba(255,200,80,0.28)");
        g.addColorStop(0.45, "rgba(255,200,80,0.14)");
        g.addColorStop(1, "rgba(255,200,80,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(
          pointerRef.current.x,
          pointerRef.current.y,
          glowRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer && observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-slate-900/5 blur-2xl rounded-full" />
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
        }}
      />
    </>
  );
}

export default Background3D;
