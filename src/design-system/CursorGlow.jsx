import { useEffect, useRef } from "react";

function CursorGlow() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const pointer = useRef({
    x: 0,
    y: 0,
    active: false,
    intensity: 0, // smooth fade
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const activate = (x, y) => {
      pointer.current.x = x;
      pointer.current.y = y;
      pointer.current.active = true;
      pointer.current.intensity = 1;
    };

    const move = (e) => activate(e.clientX, e.clientY);

    const touchMove = (e) => {
      const t = e.touches[0];
      if (t) activate(t.clientX, t.clientY);
    };

    const deactivate = () => {
      pointer.current.active = false;
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("touchstart", touchMove, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: true });
    window.addEventListener("mouseout", deactivate);
    window.addEventListener("touchend", deactivate);
    window.addEventListener("touchcancel", deactivate);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // fade logic
      if (!pointer.current.active) {
        pointer.current.intensity *= 0.92;
      }

      if (pointer.current.intensity > 0.01) {
        const alpha = 0.25 * pointer.current.intensity;

        const g = ctx.createRadialGradient(
          pointer.current.x,
          pointer.current.y,
          0,
          pointer.current.x,
          pointer.current.y,
          120
        );

        g.addColorStop(0, `rgba(255,200,80,${alpha})`);
        g.addColorStop(1, "rgba(255,200,80,0)");

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(pointer.current.x, pointer.current.y, 120, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchstart", touchMove);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("mouseout", deactivate);
      window.removeEventListener("touchend", deactivate);
      window.removeEventListener("touchcancel", deactivate);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}

export default CursorGlow;
