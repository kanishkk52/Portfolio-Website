
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer page-shell">
      <Link to="/" className="wordmark">
        KK's Canvas<span>®</span>
      </Link>

      <p>Independent design. Different perspectives.</p>

      <div className="footer-links">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
        >
          Instagram ↗
        </a>

        <a
          href="https://www.behance.net/"
          target="_blank"
          rel="noreferrer"
        >
          Behance ↗
        </a>

        <Link to="/contact">Contact ↗</Link>

        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
