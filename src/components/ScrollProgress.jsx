
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollProgress() {
  const location = useLocation();

  useEffect(() => {
    let animationFrame;

    const updateProgress = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;

        const progress =
          scrollableHeight > 0
            ? Math.min(
                1,
                Math.max(0, window.scrollY / scrollableHeight)
              )
            : 0;

        document
          .querySelector(".nav-shell")
          ?.style.setProperty("--page-progress", progress);
      });
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [location.pathname]);

  return null;
}
