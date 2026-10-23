
import { useEffect, useRef } from "react";

export default function Constellation({ theme: themeProp }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame;
    let width = 0;
    let height = 0;
    let particles = [];

    const mouse = {
      x: null,
      y: null,
      radius: 120,
    };

    const getParticleColor = () => {
    const currentTheme =
    themeProp ??
    (document.querySelector(".app-shell")?.classList.contains("theme-dark")
      ? "dark"
      : "light");

    return currentTheme === "dark"
    ? "245, 245, 240"
    : "32, 32, 30";
};

    const createParticles = () => {
      const area = width * height;
      const count = Math.min(
        110,
        Math.max(30, Math.floor(area / 11000))
      );

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 0.7,
      }));
    };

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
    };

    const onMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const color = getParticleColor();
      const connectionDistance = 115;

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
        }

        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));

        if (mouse.x !== null && mouse.y !== null) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius && distance > 0) {
            particle.x += (dx / distance) * 0.35;
            particle.y += (dy / distance) * 0.35;
          }
        }

        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(${color}, 0.55)`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.24;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="constellation-layer" ref={containerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="constellation-canvas" />
    </div>
  );
}
