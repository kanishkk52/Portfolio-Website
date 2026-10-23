
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";

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
      {/* Splash appears on each full page load, not route changes */}
      <SplashScreen theme={theme} />

      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          }
        />

        <Route
          path="/work"
          element={
            <Work
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          }
        />

        <Route
          path="/work/:projectId"
          element={
            <ProjectDetail
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
