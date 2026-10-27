
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ theme, onToggleTheme }) {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");

  const isWorkPage =
    location.pathname === "/work" ||
    location.pathname.startsWith("/work/");

  useEffect(() => {
    if (isWorkPage) {
      setActiveSection("work");
      return;
    }

    let animationFrame;

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.4;

      const contact = document.getElementById("contact");
      const about = document.getElementById("about");
      const selectedWork = document.getElementById("selected-work");

      const contactTop = contact?.getBoundingClientRect().top;
      const aboutTop = about?.getBoundingClientRect().top;
      const workTop = selectedWork?.getBoundingClientRect().top;

      if (contactTop != null && contactTop <= activationLine) {
        setActiveSection("contact");
      } else if (aboutTop != null && aboutTop <= activationLine) {
        setActiveSection("about");
      } else if (workTop != null && workTop <= activationLine) {
        setActiveSection("work");
      } else {
        setActiveSection("home");
      }
    };

    animationFrame = requestAnimationFrame(updateActiveSection);

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [isWorkPage, location.pathname]);

  const navClass = (section) =>
    activeSection === section ? "nav-active" : "";

  const scrollToSection = (event, sectionId) => {
    // Allow normal React Router navigation from other pages.
    if (location.pathname !== "/") return;

    event.preventDefault();

    const section = document.getElementById(sectionId);

    if (!section) {
      console.warn(`Section with id "${sectionId}" was not found.`);
      return;
    }

    window.history.replaceState(null, "", `/#${sectionId}`);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveSection(sectionId);
  };

  const handleHomeClick = (event) => {
    // If already on the homepage, scroll to the top.
    if (location.pathname === "/") {
      event.preventDefault();

      window.history.replaceState(null, "", "/");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setActiveSection("home");
    }
    // Otherwise, React Router navigates to "/" normally.
  };

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        {/* Brand */}
        <Link
          className="wordmark"
          to="/"
          onClick={handleHomeClick}
        >
          KK's Canvas<span>®</span>
        </Link>

        {/* Descriptor */}
        <span className="nav-note">
          Independent Graphic Designer
        </span>

        {/* Navigation links */}
        <div className="nav-links">
          <Link
            to="/"
            className={navClass("home")}
            onClick={handleHomeClick}
          >
            Home
          </Link>

          <Link
            to="/work"
            className={navClass("work")}
          >
            Work
          </Link>

          <Link
            to="/#about"
            className={navClass("about")}
            onClick={(event) => scrollToSection(event, "about")}
          >
            About
          </Link>

          <Link
            to="/#contact"
            className={navClass("contact")}
            onClick={(event) => scrollToSection(event, "contact")}
          >
            Contact
          </Link>

          {/* Availability CTA */}
          <Link
            to="/#contact"
            className="availability"
            onClick={(event) => scrollToSection(event, "contact")}
          >
            <span className="availability-dot" />
            Available for projects
          </Link>

          {/* Theme toggle */}
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
