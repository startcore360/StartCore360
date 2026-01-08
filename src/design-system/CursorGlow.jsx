import { useEffect, useRef } from "react";

function CursorGlow() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const move = (e) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      pointer.current.active = true;
    };
    const leave = () => (pointer.current.active = false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseout", leave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (pointer.current.active) {
        const g = ctx.createRadialGradient(
          pointer.current.x,
          pointer.current.y,
          0,
          pointer.current.x,
          pointer.current.y,
          120
        );
        g.addColorStop(0, "rgba(255,200,80,0.25)");
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
      window.removeEventListener("mouseout", leave);
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
