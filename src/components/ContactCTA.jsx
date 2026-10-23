
import { Link } from "react-router-dom";

export default function ContactCTA() {
  return (
    <section id="contact" className="contact-cta">
      <div className="home-work-cta">
        <div className="home-work-cta-copy">
          <span className="home-work-cta-kicker">
            LET'S MAKE SOMETHING
          </span>

          <h3>
            Let's make
            <br />
            something <span>distinct.</span>
          </h3>

          <p>
            Good ideas deserve thoughtful design. Let's build
            something worth remembering.
          </p>
        </div>

        <Link to="/#contact" className="home-work-cta-button">
          <span>LET'S CONNECT</span>
          <span className="home-work-cta-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>

        <span className="home-work-cta-index">
          KK® — 2026
        </span>
      </div>
    </section>
  );
}
