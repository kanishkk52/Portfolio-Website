
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const services = [
  "Brand identity",
  "Logo design",
  "UI/UX design",
  "Packaging design",
  "Print design",
  "Editorial design",
  "Presentation design",
  "Event print designs",
  "Other",
];

const deliverables = [
  "Logo and visual identity",
  "Brand guidelines",
  "Website or app design",
  "Packaging and print",
  "Social media assets",
  "Presentations and documents",
  "Not sure yet",
];

export default function Contact({ theme, onToggleTheme }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDeliverables, setSelectedDeliverables] = useState([]);
  const [isCompanyProject, setIsCompanyProject] = useState(false);

  const toggleSelection = (value, setter) => {
    setter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const email = "YOUR_EMAIL@example.com";

    const message = [
      "NEW PROJECT INQUIRY",
      "",
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Project type: ${isCompanyProject ? "Company / Brand project" : "Personal project"}`,
      `Company / Brand: ${isCompanyProject ? data.get("company") : "Personal project"}`,
      `Website: ${data.get("website") || "Not provided"}`,
      "",
      `Services: ${selectedServices.join(", ") || "Not specified"}`,
      `Project stage: ${data.get("stage") || "Not specified"}`,
      `Deliverables: ${selectedDeliverables.join(", ") || "Not specified"}`,
      "",
      "PROJECT DESCRIPTION",
      data.get("projectDescription"),
      "",
      `Target audience: ${data.get("audience") || "Not provided"}`,
      `Budget: ${data.get("budget") || "Not specified"}`,
      `Timeline: ${data.get("timeline") || "Not specified"}`,
      `References: ${data.get("references") || "Not provided"}`,
      `Discovery source: ${data.get("discovery") || "Not specified"}`,
      "",
      "ADDITIONAL NOTES",
      data.get("additionalNotes") || "None",
    ].join("\n");

    const subject = `Project inquiry from ${data.get("name")}`;

    window.location.href =
      `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  return (
    <div className={`app-shell theme-${theme} contact-page-shell`}>
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="contact-page page-shell">
        <Link to="/work" className="contact-back-link">
          <ArrowLeft size={15} />
          Back to work
        </Link>

        <header className="contact-hero">
          <span className="section-kicker">
            LET'S START A CONVERSATION
          </span>

          <h1>
            Good work starts
            <br className="contact-heading-break" />
            with a <span>good brief.</span>
          </h1>

          <div className="contact-hero-bottom">
            <p>
              Have a project, an idea, or just a question?
              Tell me a little about it. The more I understand
              what you have in mind, the better I can help.
            </p>

            <span className="contact-hero-index">
              KK® / PROJECT INQUIRY
            </span>
          </div>
        </header>

        <div className="contact-form-layout">
          <aside className="contact-form-aside">
            <span className="section-kicker">A FEW DETAILS</span>

            <h2>
              Let's make something
              <span> distinct.</span>
            </h2>

            <p>
              Share what you're working on, what you need,
              and where you'd like to take it. You don't need
              to have every detail figured out yet.
            </p>

            <div className="contact-aside-note">
              <span className="contact-note-dot" />
              <span>
                Open to creative projects and collaborations.
              </span>
            </div>

            <div className="contact-aside-bottom">
              <span>01 — YOUR DETAILS</span>
              <span>02 — THE PROJECT</span>
              <span>03 — THE PLAN</span>
            </div>
          </aside>

          <form className="contact-form" onSubmit={handleSubmit}>
            <section className="contact-form-section">
              <div className="contact-section-heading">
                <span>01</span>
                <div>
                  <h3>First, the basics.</h3>
                  <p>Who am I speaking with?</p>
                </div>
              </div>

              <div className="contact-fields-grid">
                <label className="contact-field">
                  <span>Full name <b>*</b></span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="contact-field">
                  <span>Email address <b>*</b></span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </label>

                <div className="contact-field contact-company-field">
                  <label className="contact-company-toggle">
                    <input
                      type="checkbox"
                      checked={isCompanyProject}
                      onChange={(event) =>
                        setIsCompanyProject(event.target.checked)
                      }
                    />
                    <span>This is a project for a company or brand</span>
                  </label>

                  <p className="contact-company-note">
                    {isCompanyProject
                      ? "Please enter the company or brand name."
                      : "Leave this unchecked to submit your inquiry as a personal project rather than a company project."}
                  </p>

                  {isCompanyProject && (
                    <label className="contact-field">
                      <span>Company or brand name <b>*</b></span>
                      <input
                        type="text"
                        name="company"
                        placeholder="Company or brand name"
                        autoComplete="organization"
                        required
                      />
                    </label>
                  )}
                </div>

                <label className="contact-field">
                  <span>Website or social link</span>
                  <input
                    type="url"
                    name="website"
                    placeholder="https://"
                  />
                </label>
              </div>
            </section>

            <section className="contact-form-section">
              <div className="contact-section-heading">
                <span>02</span>
                <div>
                  <h3>What do you have in mind?</h3>
                  <p>Choose all services that apply.</p>
                </div>
              </div>

              <div className="contact-choice-grid">
                {services.map((service) => (
                  <label
                    key={service}
                    className={`contact-choice ${
                      selectedServices.includes(service) ? "selected" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() =>
                        toggleSelection(service, setSelectedServices)
                      }
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>

              <label className="contact-field contact-field-spaced">
                <span>Where are you in the process?</span>
                <select name="stage" defaultValue="">
                  <option value="">Select project stage</option>
                  <option>Just exploring an idea</option>
                  <option>Ready to start</option>
                  <option>Looking to redesign something</option>
                  <option>Already in progress</option>
                </select>
              </label>
            </section>

            <section className="contact-form-section">
              <div className="contact-section-heading">
                <span>03</span>
                <div>
                  <h3>Tell me about the project.</h3>
                  <p>A little context goes a long way.</p>
                </div>
              </div>

              <label className="contact-field">
                <span>What are we creating, and why? <b>*</b></span>
                <textarea
                  name="projectDescription"
                  placeholder="Tell me about your idea, the problem you're trying to solve, and what you'd like to achieve."
                  rows={5}
                  required
                />
              </label>

              <label className="contact-field contact-field-spaced">
                <span>Who is this project for?</span>
                <input
                  type="text"
                  name="audience"
                  placeholder="Your customers, audience, or community"
                />
              </label>

              <div className="contact-field contact-field-spaced">
                <span>What do you expect to need?</span>
                <p className="contact-field-help">
                  Select any deliverables you have in mind.
                </p>

                <div className="contact-deliverables">
                  {deliverables.map((deliverable) => (
                    <label className="contact-checkbox-row" key={deliverable}>
                      <input
                        type="checkbox"
                        checked={selectedDeliverables.includes(deliverable)}
                        onChange={() =>
                          toggleSelection(deliverable, setSelectedDeliverables)
                        }
                      />
                      <span>{deliverable}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            <section className="contact-form-section">
              <div className="contact-section-heading">
                <span>04</span>
                <div>
                  <h3>Let's talk about the plan.</h3>
                  <p>These details help set expectations.</p>
                </div>
              </div>

              <div className="contact-fields-grid">
                <label className="contact-field">
                  <span>Estimated budget</span>
                  <select name="budget" defaultValue="">
                    <option value="">Select a budget range</option>
                    <option>Still figuring it out</option>
                    <option>Under ₹5,000</option>
                    <option>₹5,000 – ₹15,000</option>
                    <option>₹15,000 – ₹30,000</option>
                    <option>₹30,000 – ₹60,000</option>
                    <option>₹60,000+</option>
                    <option>Let's discuss</option>
                  </select>
                </label>

                <label className="contact-field">
                  <span>Preferred timeline</span>
                  <select name="timeline" defaultValue="">
                    <option value="">Select a timeline</option>
                    <option>As soon as possible</option>
                    <option>Within 2–4 weeks</option>
                    <option>Within 1–2 months</option>
                    <option>Flexible</option>
                  </select>
                </label>

                <label className="contact-field contact-field-full">
                  <span>References or inspiration links</span>
                  <textarea
                    name="references"
                    placeholder="Links to references, moodboards, or examples you like."
                    rows={3}
                  />
                </label>

                <label className="contact-field contact-field-full">
                  <span>How did you find my work?</span>
                  <select name="discovery" defaultValue="">
                    <option value="">Select an option</option>
                    <option>Instagram</option>
                    <option>Behance</option>
                    <option>LinkedIn</option>
                    <option>Referral</option>
                    <option>Search engine</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="contact-field contact-field-full">
                  <span>Anything else I should know?</span>
                  <textarea
                    name="additionalNotes"
                    placeholder="Anything else you'd like to share."
                    rows={3}
                  />
                </label>
              </div>
            </section>

            <div className="contact-submit-area">
              <p>
                Your answers will be prepared as an email draft,
                so you can review them before sending.
              </p>

              <button type="submit" className="contact-submit-button">
                <span>LET'S TALK ABOUT IT</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </form>
        </div>

        <section className="contact-bottom-note">
          <span className="section-kicker">NO PERFECT BRIEF REQUIRED</span>
          <p>
            Just an idea, a question, or a starting point.
            We can figure out the rest together.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
