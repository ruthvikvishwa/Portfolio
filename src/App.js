import React, { useEffect, useRef } from "react";
import "./index.css";

/* --- Fade-in on scroll hook --- */
function useFadeIn() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* --- FadeIn wrapper --- */
function FadeIn({ children, className = "" }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}

/* --- Scroll progress bar --- */
function ScrollProgress() {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? (doc.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

/* --- Decorative rotating mandala (SVG) --- */
function Mandala({ petals = 12 }) {
  const buildPetals = (n, cy, rx, ry, offset) =>
    Array.from({ length: n }, (_, i) => {
      const a = offset + (i * 360) / n;
      return (
        <ellipse
          key={i}
          cx="100"
          cy={cy}
          rx={rx}
          ry={ry}
          transform={`rotate(${a} 100 100)`}
        />
      );
    });

  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.5">
        <circle cx="100" cy="100" r="98" />
        <circle cx="100" cy="100" r="76" />
        {buildPetals(petals, 46, 11, 24, 0)}
        <circle cx="100" cy="100" r="52" />
        {buildPetals(petals, 60, 7, 15, 15)}
        <circle cx="100" cy="100" r="30" />
        <circle cx="100" cy="100" r="12" />
      </g>
    </svg>
  );
}

/* --- Typewriter text --- */
function useTypewriter(phrases, { typeSpeed = 70, deleteSpeed = 38, pause = 1900 } = {}) {
  const [text, setText] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    } else {
      timeout = setTimeout(() => {
        setText(current.substring(0, text.length + (deleting ? -1 : 1)));
      }, deleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, pause]);

  return text;
}

/* --- Navigation --- */
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Passions", href: "#passions" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Resume", href: "#resume" },
  ];

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#hero" className="nav-logo">
          ruthvik<span>.</span>
        </a>
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* --- Hero --- */
function Hero() {
  const heroRef = useRef(null);
  const spotlightRef = useRef(null);
  const typed = useTypewriter([
    "Senior Data Engineer",
    "Building data with calm precision",
    "Coffee geek · F1 fan · Animal lover",
  ]);

  useEffect(() => {
    const hero = heroRef.current;
    const spot = spotlightRef.current;
    if (!hero || !spot) return;

    spot.style.transform = `translate(${hero.clientWidth / 2 - 310}px, ${
      hero.clientHeight / 2 - 310
    }px)`;

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left - 310;
      const y = e.clientY - rect.top - 310;
      spot.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-bg-pattern" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="mandala">
        <Mandala />
      </div>
      <div className="hero-spotlight" ref={spotlightRef} />
      <div className="container hero-content">
        <FadeIn>
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">
            Ruthvik<br />
            <em>Vishwanathwar</em>
          </h1>
          <p className="hero-tagline">
            {typed}
            <span className="type-cursor">|</span>
          </p>
          <a href="#about" className="hero-cta">
            Discover More
            <span>↓</span>
          </a>
        </FadeIn>
      </div>
      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

/* --- About --- */
function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <FadeIn>
          <span className="section-label">About</span>
          <h2 className="section-title">
            Know who <em>I am</em>
          </h2>
        </FadeIn>

        <div className="about-grid">
          <div className="about-text">
            <FadeIn className="fade-in-delay-1">
              <p>
                I'm <strong>Ruthvik Vishwanathwar</strong> from{" "}
                <strong>Frisco, Texas</strong>. I currently work as a{" "}
                <strong>Senior Data Engineer</strong> at{" "}
                <strong>Sentara Health</strong>, where I focus on building and
                modernizing data pipelines on Azure Databricks.
              </p>
              <p>
                With <strong>11 years of experience</strong>, I've designed and
                delivered data solutions across the Azure and Databricks ecosystem,
                with deep domain expertise in healthcare and financial services.
              </p>
              <p>
                I'm a <strong>Databricks Certified Data Engineer Associate</strong>,
                and I'm typically brought in to modernize pipelines that have outgrown
                their original design, resolve chronic data quality issues, and
                re-architect systems for scale and reliability.
              </p>
            </FadeIn>

            <FadeIn className="fade-in-delay-2">
              <div className="about-highlight">
                <p>"Strive to build things that make a difference."</p>
              </div>
            </FadeIn>
          </div>

          <div className="about-stats">
            <FadeIn className="fade-in-delay-1">
              <div className="stat-card">
                <div className="stat-number">11+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </FadeIn>
            <FadeIn className="fade-in-delay-2">
              <div className="stat-card">
                <div className="stat-number">2</div>
                <div className="stat-label">Industries</div>
              </div>
            </FadeIn>
            <FadeIn className="fade-in-delay-3">
              <div className="stat-card">
                <div className="stat-number">∞</div>
                <div className="stat-label">Cups of Coffee</div>
              </div>
            </FadeIn>
            <FadeIn className="fade-in-delay-4">
              <div className="stat-card">
                <div className="stat-number">1</div>
                <div className="stat-label">Certification</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Passions --- */
function Passions() {
  const passions = [
    {
      icon: "🐾",
      title: "Animals",
      desc: "Every creature has a story. I find peace in their presence — from the quiet dignity of a horse to the playful spirit of a dog. Nature's wisdom, unfiltered.",
    },
    {
      icon: "🏎️",
      title: "Formula 1 & Cars",
      desc: "There's poetry in precision engineering. From the roar of an F1 engine to the timeless design of a classic car — I appreciate the art of motion and the craft behind it.",
    },
    {
      icon: "☕",
      title: "Coffee",
      desc: "The ritual matters. From bean to cup, every detail tells a story. A well-crafted coffee is a moment of stillness — a small meditation to start every day.",
    },
    {
      icon: "🎱",
      title: "Billiards",
      desc: "A quiet game of geometry and focus. Billiards teaches patience — every shot, a small act of intention and calm precision.",
    },
    {
      icon: "🌍",
      title: "Traveling",
      desc: "The world is a conversation waiting to happen. Exploring new places keeps my perspective wide and my curiosity restless.",
    },
  ];

  return (
    <section className="passions" id="passions">
      <div className="container">
        <FadeIn>
          <span className="section-label">Beyond Code</span>
          <h2 className="section-title">
            What moves <em>my soul</em>
          </h2>
          <p className="section-subtitle">
            The things I love outside the terminal — they keep me grounded, curious, and alive.
          </p>
        </FadeIn>

        <div className="passions-grid">
          {passions.map((p, i) => (
            <FadeIn key={p.title} className={`fade-in-delay-${i + 1}`}>
              <div className="passion-card">
                <span className="passion-icon">{p.icon}</span>
                <h3 className="passion-title">{p.title}</h3>
                <p className="passion-desc">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Skills --- */
function Skills() {
  const skills = [
    { icon: "🐍", name: "Python", category: "Language" },
    { icon: "🗃️", name: "SQL", category: "Query" },
    { icon: "⚡", name: "PySpark", category: "Processing" },
    { icon: "🔥", name: "Spark SQL", category: "Processing" },
    { icon: "🏗️", name: "Databricks", category: "Platform" },
    { icon: "☁️", name: "Azure", category: "Cloud" },
    { icon: "📦", name: "AWS", category: "Cloud" },
    { icon: "🔄", name: "Kafka", category: "Streaming" },
    { icon: "📊", name: "Power BI", category: "Analytics" },
    { icon: "🏭", name: "ADF", category: "Orchestration" },
    { icon: "🔧", name: "dbt", category: "Transformation" },
    { icon: "🐙", name: "Git", category: "Version Control" },
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <FadeIn>
          <span className="section-label">Expertise</span>
          <h2 className="section-title">
            Tools of the <em>trade</em>
          </h2>
          <p className="section-subtitle">
            A curated set of technologies I work with daily to build robust, scalable data systems.
          </p>
        </FadeIn>

        <div className="skills-grid">
          {skills.map((s, i) => (
            <FadeIn key={s.name} className={`fade-in-delay-${Math.min(i % 4 + 1, 4)}`}>
              <div className="skill-item">
                <span className="skill-icon">{s.icon}</span>
                <div className="skill-name">{s.name}</div>
                <div className="skill-category">{s.category}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Projects --- */
function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <FadeIn>
          <span className="section-label">Work</span>
          <h2 className="section-title">
            What I'm <em>building</em>
          </h2>
        </FadeIn>

        <div className="projects-content">
          <FadeIn>
            <div className="projects-message">
              <h3>Big things are being built.</h3>
              <p>
                Pipelines are running. Lakehouses are being architected.
                Real-time streams are flowing into Delta Lake as you read this.
                <br />
                Projects will live here soon — come back and see what gets shipped.
              </p>
              <div className="projects-tech">
                {["Azure Databricks", "Delta Lake", "PySpark", "ADF", "dbt", "Event Hubs", "SSIS", "SQL", "Power BI"].map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* --- Resume --- */
function Resume() {
  const experience = [
    {
      role: "Senior Data Engineer",
      company: "Sentara Health",
      date: "Current",
      desc: "Building and modernizing data pipelines on Azure Databricks. Leading lakehouse architecture, real-time streaming pipelines, and metadata-driven frameworks.",
    },
    {
      role: "Data Engineer",
      company: "Various Organizations",
      date: "11+ Years",
      desc: "Designed and delivered data solutions across Azure and Databricks ecosystem, with deep domain expertise in healthcare and financial services.",
    },
  ];

  const education = [
    {
      role: "Master of Science in Computer Science",
      company: "New York Institute of Technology, Manhattan",
      date: "",
      desc: "",
    },
  ];

  return (
    <section className="resume" id="resume">
      <div className="container">
        <FadeIn>
          <span className="section-label">Resume</span>
          <h2 className="section-title">
            My <em>journey</em>
          </h2>
        </FadeIn>

        <div className="resume-grid">
          <div className="resume-column">
            <FadeIn>
              <h3>
                <span>💼</span> Experience
              </h3>
              {experience.map((exp) => (
                <div key={exp.company} className="resume-item">
                  <div className="resume-role">{exp.role}</div>
                  <div className="resume-company">{exp.company}</div>
                  {exp.date && <div className="resume-date">{exp.date}</div>}
                  <p className="resume-desc">{exp.desc}</p>
                </div>
              ))}
            </FadeIn>
          </div>

          <div className="resume-column">
            <FadeIn className="fade-in-delay-2">
              <h3>
                <span>🎓</span> Education
              </h3>
              {education.map((edu) => (
                <div key={edu.company} className="resume-item">
                  <div className="resume-role">{edu.role}</div>
                  <div className="resume-company">{edu.company}</div>
                </div>
              ))}

              <a
                href="/Resume_Ruthvik_Vishwanathwar.pdf"
                target="_blank"
                rel="noreferrer"
                className="resume-download"
              >
                <span>↓</span> Download Full Resume
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Contact --- */
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <FadeIn>
          <span className="section-label">Connect</span>
          <h2 className="section-title">
            Let's build something <em>together</em>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            I'm always open to interesting conversations, collaborations, and new opportunities.
          </p>
        </FadeIn>

        <FadeIn className="fade-in-delay-2">
          <div className="contact-links">
            <a href="mailto:ruthvikvishwa@gmail.com" className="contact-link">
              ✉️ Email
            </a>
            <a
              href="https://github.com/ruthvikvishwa"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              🐙 GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ruthvik-vishwa/"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              💼 LinkedIn
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* --- Footer --- */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          Crafted with <span className="footer-heart">♥</span> by Ruthvik Vishwanathwar ·{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

/* ============================================
   App
   ============================================ */
function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <Passions />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
