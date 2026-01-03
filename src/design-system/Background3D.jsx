import React, { useRef, useEffect } from "react";

function Background3D() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  // const mouseRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const particleCount = 350;
    particlesRef.current = Array.from({ length: particleCount }, () => {
      const sizeRand = Math.random();
      let size;
      if (sizeRand < 0.6) {
        size = 3 + Math.random() * 2; // Small
      } else if (sizeRand < 0.9) {
        size = 5 + Math.random() * 3; // Medium
      } else {
        size = 8 + Math.random() * 6; // Large focal
      }

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        size,
        color:
          Math.random() < 0.7
            ? { r: 253, g: 216, b: 53 } // Yellow #FDD835
            : {
                r: 60 + Math.random() * 80,
                g: 60 + Math.random() * 80,
                b: 60 + Math.random() * 80,
              }, // Grey
      };
    });

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseOut = (e) => {
      if (
        e.clientX <= 0 ||
        e.clientY <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        mouseRef.current.active = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    const resetParticle = (particle) => {
      particle.x = Math.random() * canvas.width;
      particle.y = Math.random() * canvas.height;
      particle.vx = (Math.random() - 0.5) * 0.12;
      particle.vy = (Math.random() - 0.5) * 0.12;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position with drift
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Subtle mouse influence (1-2% shift)
        // const dx = mouseRef.current.x - particle.x;
        // const dy = mouseRef.current.y - particle.y;
        // particle.x += dx * 0.001;
        // particle.y += dy * 0.001;
        // if (mouseRef.current.active) {
        //   const dx = mouseRef.current.x - particle.x;
        //   const dy = mouseRef.current.y - particle.y;
        //   const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        //   const maxRange = 350; // px
        //   if (distance < maxRange) {
        //     const force = (1 - distance / maxRange) * 0.8;
        //     particle.x += (dx / distance) * force;
        //     particle.y += (dy / distance) * force;
        //   }
        // } else {
        //   // Scatter outward when mouse is not present
        //   const cx = canvas.width / 2;
        //   const cy = canvas.height / 2;
        //   const dx = particle.x - cx;
        //   const dy = particle.y - cy;
        //   const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        //   const scatterForce = 0.18;
        //   particle.x += (dx / distance) * scatterForce;
        //   particle.y += (dy / distance) * scatterForce;
        // }

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;

          const maxRange = 350;

          if (distance < maxRange) {
            // 🔹 Attraction zone
            const force = (1 - distance / maxRange) * 0.8;
            particle.x += (dx / distance) * force;
            particle.y += (dy / distance) * force;
          } else {
            // 🔹 Still scatter if too far
            const sdx = particle.x - cx;
            const sdy = particle.y - cy;
            const sdist = Math.sqrt(sdx * sdx + sdy * sdy) || 1;

            const scatterForce = 0.18;
            particle.x += (sdx / sdist) * scatterForce;
            particle.y += (sdy / sdist) * scatterForce;
          }
        } else {
          // 🔹 Normal scatter when mouse is absent
          const dx = particle.x - cx;
          const dy = particle.y - cy;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;

          const scatterForce = 0.18;
          particle.x += (dx / distance) * scatterForce;
          particle.y += (dy / distance) * scatterForce;
        }

        const buffer = 80;

        if (
          particle.x < -buffer ||
          particle.x > canvas.width + buffer ||
          particle.y < -buffer ||
          particle.y > canvas.height + buffer
        ) {
          resetParticle(particle);
        }

        // Draw particle with radial gradient
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );

        const alpha = 0.45;
        gradient.addColorStop(
          0,
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha})`
        );
        gradient.addColorStop(
          0.5,
          `rgba(${particle.color.r}, ${particle.color.g}, ${
            particle.color.b
          }, ${alpha * 0.5})`
        );
        gradient.addColorStop(
          1,
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        background: "#fafafa",
        pointerEvents: "none",
      }}
    />
  );
}

export default Background3D;
