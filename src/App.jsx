
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";

import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";

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
      <SplashScreen theme={theme} />

      <ScrollToTop />

      {/* Fixed scroll indicator across all routes */}
      <ScrollProgress />

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
          path="/about"
          element={
            <About
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

        <Route
          path="/contact"
          element={
            <Contact
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
