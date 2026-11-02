
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import CreativeTerminal from "./components/CreativeTerminal";
import CustomCursor from "./components/CustomCursor";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import "./styles/page-skeleton.css";

import { lazy, Suspense } from "react";

const Work = lazy(() => import("./pages/Work"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// Skeleton loading screen
function PageSkeleton({ theme }) {
  const location = useLocation();

  const isProjectDetail = /^\/work\/[^/]+/.test(location.pathname);
  const isDark = theme === "dark";

  return (
    <main
      className={`page-skeleton ${
        isDark ? "skeleton-dark" : "skeleton-light"
      }`}
      aria-label="Loading page"
      aria-busy="true"
    >
      <div className="skeleton-navbar">
        <div className="skeleton-block skeleton-logo" />

        <div className="skeleton-nav-links">
          <div className="skeleton-block skeleton-nav-link" />
          <div className="skeleton-block skeleton-nav-link" />
          <div className="skeleton-block skeleton-nav-link" />
          <div className="skeleton-block skeleton-nav-link" />
        </div>

        <div className="skeleton-block skeleton-theme-toggle" />
      </div>

      <div className="skeleton-content">
        {isProjectDetail && (
          <div className="skeleton-block skeleton-back-link" />
        )}

        <div className="skeleton-heading">
          <div className="skeleton-block skeleton-eyebrow" />
          <div className="skeleton-block skeleton-title" />
          <div className="skeleton-block skeleton-description" />
        </div>

        {isProjectDetail ? (
          <>
            <div className="skeleton-block skeleton-project-hero" />

            <div className="skeleton-project-info">
              <div className="skeleton-block skeleton-info-line" />
              <div className="skeleton-block skeleton-info-line short" />
              <div className="skeleton-block skeleton-info-line" />
            </div>

            <div className="skeleton-gallery">
              <div className="skeleton-block skeleton-gallery-large" />
              <div className="skeleton-block skeleton-gallery-small" />
              <div className="skeleton-block skeleton-gallery-small" />
            </div>
          </>
        ) : (
          <>
            <div className="skeleton-filter-row">
              <div className="skeleton-block skeleton-filter" />
              <div className="skeleton-block skeleton-filter" />
              <div className="skeleton-block skeleton-filter" />
              <div className="skeleton-block skeleton-filter" />
            </div>

            <div className="skeleton-project-grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="skeleton-project-card" key={index}>
                  <div className="skeleton-block skeleton-card-image" />
                  <div className="skeleton-block skeleton-card-title" />
                  <div className="skeleton-block skeleton-card-description" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// Handles global Easter eggs and application routes
function PortfolioExperience({ theme, onToggleTheme }) {
  
  const navigate = useNavigate();
  const location = useLocation();

  const [photographerMode, setPhotographerMode] = useState(false);
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);
  // Hide navigation while Photographer Mode is active
useEffect(() => {
  document.body.classList.toggle(
    "photographer-mode-active",
    photographerMode
  );

  return () => {
    document.body.classList.remove("photographer-mode-active");
  };
}, [photographerMode]);

  // KONAMI CODE + PHOTOGRAPHER MODE
  useEffect(() => {
    let sequenceIndex = 0;

    const isTyping = (target) => {
      return (
        target instanceof HTMLElement &&
        (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        )
      );
    };
    

    const handleGlobalKeyDown = (event) => {
      if (isTyping(event.target)) return;

      // Do not interfere with the creative terminal
      if (document.querySelector(".creative-terminal-overlay")) {
        return;
      }
      // THEME TOGGLE — Press T
      if (
        event.key.toLowerCase() === "t" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        event.preventDefault();
        onToggleTheme();
        return;
      }
      


      // KONAMI CODE
      const pressedKey =
        event.key.length === 1
          ? event.key.toLowerCase()
          : event.key;

      const expectedKey = KONAMI_CODE[sequenceIndex];

      if (pressedKey === expectedKey) {
        sequenceIndex += 1;
      } else {
        sequenceIndex =
          pressedKey === KONAMI_CODE[0] ? 1 : 0;
      }

      if (sequenceIndex === KONAMI_CODE.length) {
        sequenceIndex = 0;

        setKonamiUnlocked(true);

        try {
          localStorage.setItem("kk-konami-unlocked", "true");
        } catch {
          // Unlock still works if storage is unavailable.
        }

        window.setTimeout(() => {
          setKonamiUnlocked(false);
        }, 4500);
      }

      // PHOTOGRAPHER MODE
      if (event.key.toLowerCase() === "p") {
  event.preventDefault();

  if (!photographerMode) {
    setPhotographerMode(true);

    if (location.pathname !== "/about") {
      navigate("/about");
    }
  } else {
    setPhotographerMode(false);
  }
}

      // ESCAPE PHOTOGRAPHER MODE
      if (event.key === "Escape" && photographerMode) {
        setPhotographerMode(false);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [photographerMode, location.pathname, navigate, onToggleTheme]);

  // Scroll to the photography archive after navigation
  useEffect(() => {
    if (!photographerMode || location.pathname !== "/about") return;

    const frame = requestAnimationFrame(() => {
      document
        .getElementById("photo-archive")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });

    return () => cancelAnimationFrame(frame);
  }, [photographerMode, location.pathname]);

  return (
    <>
      <SplashScreen theme={theme} />
      <CustomCursor />
      <ScrollToTop />
      <ScrollProgress />

      <CreativeTerminal
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      {/* KONAMI UNLOCK NOTIFICATION */}
      {konamiUnlocked && (
        <div
          className="konami-unlock-toast"
          role="status"
          aria-live="polite"
        >
          <div className="konami-unlock-icon">✳</div>

          <div>
            <span>SECRET LEVEL UNLOCKED</span>
            <strong>You found the hidden side of KK®.</strong>
          </div>

          <span className="konami-unlock-code">↑ ↑ ↓ ↓</span>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              theme={theme}
              onToggleTheme={onToggleTheme}
            />
          }
        />

        <Route
          path="/about"
          element={
            <About
              theme={theme}
              onToggleTheme={onToggleTheme}
              photographerMode={photographerMode}
              onExitPhotographerMode={() =>
                setPhotographerMode(false)
              }
            />
          }
        />

        <Route
          path="/work"
          element={
            <Suspense fallback={<PageSkeleton theme={theme} />}>
              <Work
                theme={theme}
                onToggleTheme={onToggleTheme}
              />
            </Suspense>
          }
        />

        <Route
          path="/work/:projectId"
          element={
            <Suspense fallback={<PageSkeleton theme={theme} />}>
              <ProjectDetail
                theme={theme}
                onToggleTheme={onToggleTheme}
              />
            </Suspense>
          }
        />

        <Route
          path="/contact"
          element={
            <Contact
              theme={theme}
              onToggleTheme={onToggleTheme}
            />
          }
        />
      </Routes>
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") || "light";
    } catch {
      return "light";
    }
  });

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme =
        currentTheme === "light" ? "dark" : "light";

      try {
        localStorage.setItem("portfolio-theme", nextTheme);
      } catch {
        // Theme switching still works if storage is unavailable.
      }

      return nextTheme;
    });
  };

  return (
    <BrowserRouter>
      <PortfolioExperience
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </BrowserRouter>
  );
}

export default App;
