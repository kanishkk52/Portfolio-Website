
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ theme, onToggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("home");

  const isWorkPage =
    location.pathname === "/work" ||
    location.pathname.startsWith("/work/");

  // Determine active navigation item
  useEffect(() => {
    const pathname = location.pathname;

    // Separate pages
    if (pathname === "/about") {
      setActiveSection("about");
      return;
    }

    if (pathname === "/contact") {
      setActiveSection("contact");
      return;
    }

    if (isWorkPage) {
      setActiveSection("work");
      return;
    }

    // Homepage
    if (pathname === "/") {
      setActiveSection("home");

      const updateActiveSection = () => {
        const activationLine = window.innerHeight * 0.4;
        const selectedWork = document.getElementById("selected-work");

        const workTop = selectedWork?.getBoundingClientRect().top;

        if (workTop != null && workTop <= activationLine) {
          setActiveSection("work");
        } else {
          setActiveSection("home");
        }
      };

      const frame = requestAnimationFrame(updateActiveSection);

      window.addEventListener("scroll", updateActiveSection, {
        passive: true,
      });

      window.addEventListener("resize", updateActiveSection);

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", updateActiveSection);
        window.removeEventListener("resize", updateActiveSection);
      };
    }
  }, [location.pathname, isWorkPage]);

  const navClass = (section) =>
    activeSection === section ? "nav-active" : "";

  // Home navigation
  const handleHomeClick = (event) => {
    if (location.pathname === "/") {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setActiveSection("home");
    }
  };

  // Navigate directly to Contact page
  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">

        {/* BRAND */}
        <Link
          className="wordmark"
          to="/"
          onClick={handleHomeClick}
        >
          KK's Canvas<span>®</span>
        </Link>

        {/* DESCRIPTOR */}
        <span className="nav-note">
          Independent Graphic Designer
        </span>

        {/* NAVIGATION LINKS */}
        <div className="nav-links">

          {/* HOME */}
          <Link
            to="/"
            className={navClass("home")}
            onClick={handleHomeClick}
          >
            Home
          </Link>

          {/* WORK */}
          <Link
            to="/work"
            className={navClass("work")}
          >
            Work
          </Link>

          {/* ABOUT */}
          <Link
            to="/about"
            className={navClass("about")}
          >
            About
          </Link>

          {/* CONTACT */}
          <Link
            to="/contact"
            className={navClass("contact")}
            onClick={handleContactClick}
          >
            Contact
          </Link>

          {/* AVAILABILITY CTA */}
          <Link
            to="/contact"
            className="availability"
          >
            <span className="availability-dot" />
            Available for projects
          </Link>

          {/* THEME TOGGLE */}
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } theme`}
            title={`Switch to ${
              theme === "light" ? "dark" : "light"
            } theme`}
          >
            <span aria-hidden="true">
              {theme === "light" ? "☾" : "☀"}
            </span>

            <span className="theme-toggle-label">
              {theme === "light" ? "Dark" : "Light"}
            </span>
          </button>

        </div>
      </nav>
    </header>
  );
}
