
import { useEffect, useRef } from "react";

export default function Constellation({
  theme: themeProp,
  interactiveGlow = false,
}) {
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

    const mouse = { x: null, y: null, radius: 180 };

    const isDark = () => {
      if (themeProp) return themeProp === "dark";

      return document
        .querySelector(".app-shell")
        ?.classList.contains("theme-dark") ?? false;
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

    // Listen on window so overlaying text does not block tracking.
    const onMouseMove = (event) => {
      if (!interactiveGlow || !isDark()) {
        mouse.x = null;
        mouse.y = null;
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        mouse.x = null;
        mouse.y = null;
        return;
      }

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const influenceAt = (x, y) => {
      if (
        !interactiveGlow ||
        !isDark() ||
        mouse.x === null ||
        mouse.y === null
      ) {
        return 0;
      }

      const distance = Math.hypot(
        x - mouse.x,
        y - mouse.y
      );

      if (distance >= mouse.radius) return 0;

      const falloff = 1 - distance / mouse.radius;
      return falloff * falloff;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const dark = isDark();
      const baseColor = dark
        ? "245, 245, 240"
        : "32, 32, 30";

      const connectionDistance = 115;

      // Move particles.
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      });

      // Draw connections.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(
            a.x - b.x,
            a.y - b.y
          );

          if (distance >= connectionDistance) continue;

          const baseOpacity =
            (1 - distance / connectionDistance) * 0.3;

          const influence = Math.max(
            influenceAt(a.x, a.y),
            influenceAt(b.x, b.y),
            influenceAt((a.x + b.x) / 2, (a.y + b.y) / 2) * 0.8
          );

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);

          if (dark && influence > 0) {
            // Strong, visible lime replaces white locally.
            ctx.strokeStyle = `rgba(214, 243, 106, ${
              Math.min(1, 0.25 + influence * 0.95)
            })`;
            ctx.lineWidth = 0.8 + influence * 1.1;
            ctx.shadowColor = "#d6f36a";
            ctx.shadowBlur = influence * 12;
          } else {
            ctx.strokeStyle = `rgba(${baseColor}, ${baseOpacity})`;
            ctx.lineWidth = 0.7;
            ctx.shadowBlur = 0;
          }

          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // Draw stars, with a brighter local glow.
      particles.forEach((p) => {
        const influence = influenceAt(p.x, p.y);

        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          p.radius + influence * 1.2,
          0,
          Math.PI * 2
        );

        if (dark && influence > 0) {
          ctx.fillStyle = `rgba(214, 243, 106, ${
            0.7 + influence * 0.3
          })`;
          ctx.shadowColor = "#d6f36a";
          ctx.shadowBlur = 8 + influence * 18;
        } else {
          ctx.fillStyle = `rgba(${baseColor}, 0.75)`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("blur", onMouseLeave);

    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("blur", onMouseLeave);
    };
  }, [themeProp, interactiveGlow]);

  return (
    <div
      className="constellation-layer"
      ref={containerRef}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="constellation-canvas"
      />
    </div>
  );
}
