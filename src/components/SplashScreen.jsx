
import { useEffect, useState } from "react";
import Constellation from "./Constellation";

export default function SplashScreen({ theme = "light" }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 2400;
    let frameId;
    let exitTimer;
    let removeTimer;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Smooth ease-out progress
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        exitTimer = window.setTimeout(() => {
          setExiting(true);

          // Keep the element mounted until its CSS transition ends
          removeTimer = window.setTimeout(() => {
            setVisible(false);
          }, 1000);
        }, 250);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`splash-screen splash-theme-${theme} ${
        exiting ? "splash-exit" : ""
      }`}
      role="status"
      aria-label="Loading KK's Canvas portfolio"
    >
      <Constellation theme={theme} />

      <div className="splash-grain" aria-hidden="true" />

      <div className="splash-topline">
        <span className="splash-brand">
          KK's Canvas<span className="splash-reg">®</span>
        </span>
        <span>INDEPENDENT DESIGNER</span>
      </div>

      <div className="splash-center">
        <div className="splash-monogram">
          Design<span>Portfolio</span>
        </div>

        <h1>
          Ideas into
          <br />
          <span>visual stories.</span>
        </h1>

        <div className="splash-caption">
          <span>DESIGN · IDENTITY · EXPRESSION</span>
          <span>INDIA / 2026</span>
        </div>
      </div>

      <div className="splash-bottom">
        <span className="splash-status">
          {progress < 100 ? "PREPARING THE CANVAS" : "READY TO EXPLORE"}
        </span>

        <span className="splash-percentage">
          {String(progress).padStart(3, "0")}%
        </span>

        <div className="splash-progress-track">
          <div
            className="splash-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
