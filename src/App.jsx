import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const CONFIG = {
  name: "Pothamsetty Pradeep Kumar",
  initials: "PSPK",
  title: "AI & Machine Learning Engineer",
  subtitle: "Exploring Data & Building Intelligent Systems",
  tagline: "B.Tech CSE · ML Enthusiast · Data Analysis · AI Pioneer",
  email: "23cse250.pothansettipradeepkumar@giet.edu",
  phone: "+91-9553118782",
  location: "Gunupur, Andhra Pradesh, India",
  college: "Gandhi Institute of Engineering and Technology",
  duration: "2023 – 2027",
  about: [
    "I'm a passionate B.Tech Computer Science student at Gandhi Institute of Engineering and Technology, driven by curiosity for Machine Learning, Data Analysis, and Artificial Intelligence.",
    "As Graphic Designer for the Data Science Club, I blend creativity with technical expertise to create impactful designs and advance data science initiatives.",
  ],
  stats: [
    { label: "Projects", value: 4 },
    { label: "Internships", value: 3 },
    { label: "Skills", value: 10 },
    { label: "Achievements", value: 5 },
  ],
  skills: [
    { name: "Python", level: 90 },
    { name: "Machine Learning", level: 85 },
    { name: "Data Analysis", level: 88 },
    { name: "C / C++", level: 80 },
    { name: "Web Development", level: 92 },
    { name: "Excel & Spreadsheets", level: 75 },
  ],
  experience: [
    {
      company: "CTTC",
      role: "Face Recognition Internship",
      points: [
        "Developed Face Recognition system using ML and OpenCV",
        "Implemented face detection and feature extraction algorithms",
        "Built real-time recognition system with model training",
      ],
    },
    {
      company: "YHills",
      role: "Cloud Computing Internship",
      points: [
        "Worked on cloud infrastructure and virtual machines",
        "Gained experience in cloud storage and resource optimization",
        "Explored cloud security basics and platform architecture",
      ],
    },
    {
      company: "Remark Skill Education",
      role: "Machine Learning Internship",
      points: [
        "Machine Learning using Python – comprehensive training program",
        "Hands-on experience with ML algorithms and frameworks",
        "Worked on multiple ML projects and case studies",
      ],
    },
  ],
  projects: [
    {
      title: "House Price Prediction",
      desc: "ML regression model to estimate residential property prices using advanced algorithms and feature engineering.",
      tags: ["React.js", "FastAPI", "Scikit-Learn"],
      points: ["Data preprocessing & feature engineering", "Regression model development", "Hyperparameter tuning", "Visualization with Matplotlib"],
      icon: "📈",
    },
    {
      title: "Job Match Analyzer",
      desc: "AI system analyzing resumes and job descriptions to match candidates with roles using NLP and ML.",
      tags: ["React.js", "NLP", "PyTorch"],
      points: ["Resume parsing & skill extraction", "NLP-based job description analysis", "Compatibility scoring algorithm", "ML model optimization"],
      icon: "🎯",
    },
    {
      title: "Sales Prediction ML",
      desc: "Advanced regression model for predicting store sales using feature engineering and multiple algorithms.",
      tags: ["Python", "Scikit-Learn", "Pandas"],
      points: ["Data preprocessing & cleaning", "Feature engineering techniques", "Regression model comparison", "Model evaluation & metrics"],
      icon: "📊",
    },
    {
      title: "Iris Classification",
      desc: "Supervised learning classification model for Iris flower dataset with high accuracy and comparative analysis.",
      tags: ["Python", "Scikit-Learn", "Matplotlib"],
      points: ["Supervised classification", "Data visualization & analysis", "Algorithm comparison", "Accuracy optimization"],
      icon: "🌸",
    },
  ],
  achievements: [
    { title: "Graphic Designer", desc: "Data Science Club – Lead visual designer creating impactful content", icon: "🎨" },
    { title: "3rd Prize Winner", desc: "Data Quest Technical Competition – Excellence in data analysis", icon: "🏆" },
    { title: "Workshop Designer", desc: "Designed MySQL workshop posters and coordinated technical events", icon: "📋" },
    { title: "Tech Participant", desc: "Active participation in inter-college data science competitions", icon: "🏅" },
    { title: "Continuous Learner", desc: "Completed multiple certifications in ML, AI, and Data Science", icon: "📚" },
  ],
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Email", href: "mailto:23cse250.pothansettipradeepkumar@giet.edu" },
  ],
};

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useIntersection(ref, options = {}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function useCountUp(target, trigger, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return count;
}

// ─── MICRO COMPONENTS ────────────────────────────────────────────────────────

const GoldLine = ({ className = "" }) => (
  <div className={`h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent ${className}`} />
);

const Tag = ({ children }) => (
  <span style={{ background: "rgba(212,175,55,0.12)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.3)" }}
    className="text-xs font-semibold px-3 py-1 rounded-full">
    {children}
  </span>
);

const SectionTitle = ({ pre, main, gold }) => (
  <div className="text-center mb-16">
    {pre && <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "#D4AF37", fontFamily: "'Space Mono', monospace" }}>{pre}</p>}
    <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }}>
      {main} <span style={{ color: "#D4AF37" }}>{gold}</span>
    </h2>
    <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
  </div>
);

const Reveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

// ─── PARTICLES ───────────────────────────────────────────────────────────────

function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

const navLinks = ["About", "Skills", "Experience", "Projects", "Achievements", "Contact"];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const scroll = (id) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ background: scrolled ? "rgba(8,8,8,0.97)" : "rgba(8,8,8,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scroll("hero")} className="font-bold text-2xl" style={{ color: "#D4AF37", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.05em" }}>
            PSPK
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <button key={l} onClick={() => scroll(l)}
                className="text-sm font-medium relative group transition-colors duration-300"
                style={{ color: "#ccc", fontFamily: "'Space Mono', monospace" }}>
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: "#D4AF37" }} />
              </button>
            ))}
          </div>
          <button className="md:hidden p-2" onClick={() => setOpen(o => !o)}>
            <div className="space-y-1.5">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-6 h-0.5 transition-all duration-300" style={{ background: "#D4AF37", transform: open && i === 0 ? "rotate(45deg) translate(4px,4px)" : open && i === 1 ? "scaleX(0)" : open && i === 2 ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
              ))}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className="fixed inset-0 z-40 md:hidden transition-all duration-400"
        style={{ background: "rgba(8,8,8,0.99)", transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {navLinks.map(l => (
            <button key={l} onClick={() => scroll(l)} className="text-3xl font-bold" style={{ color: "#D4AF37", fontFamily: "'Cormorant Garamond', serif" }}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const fadeStyle = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden w-full">
      {/* Grid bg */}
      <div className="absolute inset-0 w-full" style={{
        backgroundImage: "linear-gradient(rgba(212,175,55,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.025) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none max-w-full" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none max-w-full" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)" }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">
        <div style={fadeStyle(0)}>
          <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#D4AF37", fontFamily: "'Space Mono', monospace" }}>
            {CONFIG.title}
          </p>
        </div>

        {/* Avatar */}
        <div style={fadeStyle(100)} className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-36 h-36 rounded-full overflow-hidden" style={{ border: "2px solid rgba(212,175,55,0.6)", boxShadow: "0 0 40px rgba(212,175,55,0.2), 0 0 80px rgba(212,175,55,0.08)" }}>
              <img src="/portfolio.png" alt="Pothamsetty Pradeep Kumar" className="w-full h-full object-cover" />
            </div>
            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-full" style={{
              border: "1px dashed rgba(212,175,55,0.3)",
              animation: "spin 20s linear infinite",
            }} />
          </div>
        </div>

        <div style={fadeStyle(200)}>
          <h1 className="text-5xl md:text-7xl font-bold leading-none mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.02em" }}>
            Pothamsetty<br />
            <span style={{ color: "#D4AF37" }}>Pradeep Kumar</span>
          </h1>
        </div>

        <div style={fadeStyle(350)}>
          <p className="text-lg md:text-xl text-gray-400 mb-3" style={{ fontFamily: "'Space Mono', monospace" }}>{CONFIG.subtitle}</p>
          <p className="text-sm text-gray-500 mb-10">{CONFIG.tagline}</p>
        </div>

        <div style={fadeStyle(500)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="btn-primary px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #D4AF37, #B8962E)", color: "#0B0B0B", fontFamily: "'Space Mono', monospace" }}>
            View Projects
          </button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300"
            style={{ border: "1px solid rgba(212,175,55,0.5)", color: "#D4AF37", background: "transparent", fontFamily: "'Space Mono', monospace" }}>
            Contact Me
          </button>
          <button className="px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300"
            style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#aaa", background: "transparent", fontFamily: "'Space Mono', monospace" }}>
            ↓ Resume
          </button>
        </div>

        <div style={fadeStyle(650)} className="flex items-center justify-center gap-6">
          {CONFIG.socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase transition-colors duration-300 hover:text-yellow-400"
              style={{ color: "#666", fontFamily: "'Space Mono', monospace" }}>
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12" style={{ background: "linear-gradient(180deg, transparent, rgba(212,175,55,0.6))", animation: "pulse 2s ease-in-out infinite" }} />
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function StatCard({ label, value }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  const count = useCountUp(value, visible);
  return (
    <div ref={ref} className="rounded-2xl p-6 text-center" style={{ background: "rgba(20,20,20,0.7)", border: "1px solid rgba(212,175,55,0.15)", backdropFilter: "blur(10px)" }}>
      <div className="text-4xl font-bold mb-1" style={{ color: "#D4AF37", fontFamily: "'Cormorant Garamond', serif" }}>{count}+</div>
      <div className="text-sm text-gray-500" style={{ fontFamily: "'Space Mono', monospace" }}>{label}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal><SectionTitle pre="Who I Am" main="About" gold="Me" /></Reveal>
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <Reveal className="lg:col-span-3" delay={100}>
            <div className="rounded-2xl p-8 md:p-10" style={{ background: "rgba(16,16,16,0.8)", border: "1px solid rgba(212,175,55,0.15)", backdropFilter: "blur(20px)" }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: "#D4AF37", fontFamily: "'Cormorant Garamond', serif" }}>
                B.Tech CSE · {CONFIG.college}
              </h3>
              {CONFIG.about.map((p, i) => (
                <p key={i} className="text-gray-400 leading-relaxed mb-4 text-sm">{p}</p>
              ))}
              <div className="flex flex-wrap gap-2 mt-6">
                {["Machine Learning", "Data Analysis", "AI", "Python", "OpenCV"].map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-2" delay={200}>
            <div className="grid grid-cols-2 gap-4">
              {CONFIG.stats.map(s => <StatCard key={s.label} {...s} />)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

function SkillBar({ name, level, index }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <Reveal delay={index * 80}>
      <div ref={ref} className="rounded-xl p-5" style={{ background: "rgba(16,16,16,0.8)", border: "1px solid rgba(212,175,55,0.12)" }}>
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium text-sm" style={{ fontFamily: "'Space Mono', monospace", color: "#ddd" }}>{name}</span>
          <span className="text-sm font-bold" style={{ color: "#D4AF37" }}>{level}%</span>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{
            width: visible ? `${level}%` : "0%",
            background: "linear-gradient(90deg, #B8962E, #D4AF37, #E8C547)",
            transitionDelay: `${index * 80}ms`,
          }} />
        </div>
      </div>
    </Reveal>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6" style={{ background: "rgba(10,10,10,0.5)" }}>
      <div className="max-w-5xl mx-auto">
        <Reveal><SectionTitle pre="Capabilities" main="Technical" gold="Skills" /></Reveal>
        <div className="grid md:grid-cols-2 gap-4">
          {CONFIG.skills.map((s, i) => <SkillBar key={s.name} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal><SectionTitle pre="Work History" main="Internship" gold="Experience" /></Reveal>
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, #D4AF37, transparent)" }} />
          <div className="space-y-8">
            {CONFIG.experience.map((exp, i) => (
              <Reveal key={exp.company} delay={i * 120}>
                <div className="pl-12 relative">
                  <div className="absolute left-0 top-6 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#0B0B0B", border: "2px solid #D4AF37" }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: "#D4AF37" }} />
                  </div>
                  <div className="rounded-2xl p-7" style={{ background: "rgba(16,16,16,0.8)", border: "1px solid rgba(212,175,55,0.15)", backdropFilter: "blur(10px)" }}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5">
                      <h3 className="text-xl font-bold" style={{ color: "#D4AF37", fontFamily: "'Cormorant Garamond', serif" }}>{exp.company}</h3>
                      <span className="text-xs text-gray-500 mt-1 sm:mt-0" style={{ fontFamily: "'Space Mono', monospace" }}>{exp.role}</span>
                    </div>
                    <ul className="space-y-2">
                      {exp.points.map((p, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-gray-400">
                          <span style={{ color: "#D4AF37" }} className="mt-0.5 flex-shrink-0">◆</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={index * 100}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        className="rounded-2xl overflow-hidden h-full transition-all duration-400"
        style={{
          background: "rgba(14,14,14,0.9)",
          border: `1px solid ${hovered ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.12)"}`,
          backdropFilter: "blur(20px)",
          transform: hovered ? "translateY(-8px)" : "none",
          boxShadow: hovered ? "0 20px 60px rgba(212,175,55,0.12)" : "none",
        }}>
        <div className="p-7">
          <div className="flex items-center gap-4 mb-5">
            <div className="text-3xl">{project.icon}</div>
            <h3 className="text-lg font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#eee" }}>{project.title}</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map(t => <Tag key={t}>{t}</Tag>)}
          </div>
          <ul className="space-y-1.5 mb-6">
            {project.points.map((p, i) => (
              <li key={i} className="text-xs text-gray-500 flex items-center gap-2">
                <span style={{ color: "#D4AF37" }}>✦</span>{p}
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <button className="flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #D4AF37, #B8962E)", color: "#0B0B0B", fontFamily: "'Space Mono', monospace" }}>
              Live Demo
            </button>
            <button className="flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-300"
              style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37", background: "transparent", fontFamily: "'Space Mono', monospace" }}>
              GitHub
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6" style={{ background: "rgba(10,10,10,0.5)" }}>
      <div className="max-w-6xl mx-auto">
        <Reveal><SectionTitle pre="Portfolio" main="Featured" gold="Projects" /></Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {CONFIG.projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── ACHIEVEMENTS ────────────────────────────────────────────────────────────

function Achievements() {
  return (
    <section id="achievements" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal><SectionTitle pre="Recognition" main="Achievements" gold="& Awards" /></Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONFIG.achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <div className="rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 group"
                style={{ background: "rgba(16,16,16,0.8)", border: "1px solid rgba(212,175,55,0.12)", backdropFilter: "blur(10px)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)"; e.currentTarget.style.background = "rgba(20,20,20,0.9)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)"; e.currentTarget.style.background = "rgba(16,16,16,0.8)"; }}>
                <div className="text-2xl flex-shrink-0 mt-0.5">{a.icon}</div>
                <div>
                  <h3 className="font-bold mb-1.5" style={{ color: "#D4AF37", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>{a.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{a.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); }, 3000);
  };

  const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "12px", padding: "14px 18px", color: "#fff", width: "100%", fontFamily: "'Space Mono', monospace", fontSize: "13px", outline: "none", transition: "border-color 0.3s" };

  return (
    <section id="contact" className="relative py-28 px-6" style={{ background: "rgba(10,10,10,0.5)" }}>
      <div className="max-w-4xl mx-auto">
        <Reveal><SectionTitle pre="Say Hello" main="Get In" gold="Touch" /></Reveal>
        <Reveal delay={100}>
          <p className="text-center text-gray-500 text-sm mb-14 -mt-8 max-w-xl mx-auto">
            Have a project, collaboration, or opportunity? I'm always open to new ideas.
          </p>
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <Reveal delay={100}>
            <div className="rounded-2xl p-8" style={{ background: "rgba(14,14,14,0.9)", border: "1px solid rgba(212,175,55,0.15)" }}>
              {sent ? (
                <div className="flex flex-col items-center justify-center h-48 gap-4">
                  <div className="text-4xl">✅</div>
                  <p className="font-semibold" style={{ color: "#D4AF37", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>Message Sent!</p>
                  <p className="text-gray-500 text-sm">I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs mb-2 tracking-widest uppercase" style={{ color: "#D4AF37", fontFamily: "'Space Mono', monospace" }}>Name</label>
                    <input type="text" placeholder="Your name" required value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#D4AF37"}
                      onBlur={e => e.target.style.borderColor = "rgba(212,175,55,0.2)"} />
                  </div>
                  <div>
                    <label className="block text-xs mb-2 tracking-widest uppercase" style={{ color: "#D4AF37", fontFamily: "'Space Mono', monospace" }}>Email</label>
                    <input type="email" placeholder="your@email.com" required value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#D4AF37"}
                      onBlur={e => e.target.style.borderColor = "rgba(212,175,55,0.2)"} />
                  </div>
                  <div>
                    <label className="block text-xs mb-2 tracking-widest uppercase" style={{ color: "#D4AF37", fontFamily: "'Space Mono', monospace" }}>Message</label>
                    <textarea placeholder="Your message..." required rows={5} value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={e => e.target.style.borderColor = "#D4AF37"}
                      onBlur={e => e.target.style.borderColor = "rgba(212,175,55,0.2)"} />
                  </div>
                  <button type="submit" className="w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #D4AF37, #B8962E)", color: "#0B0B0B", fontFamily: "'Space Mono', monospace" }}>
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={200}>
            <div className="space-y-5">
              {[
                { icon: "✉", label: "Email", value: CONFIG.email },
                { icon: "📞", label: "Phone", value: CONFIG.phone },
                { icon: "📍", label: "Location", value: CONFIG.location },
              ].map(item => (
                <div key={item.label} className="rounded-xl p-5 flex items-center gap-5"
                  style={{ background: "rgba(14,14,14,0.9)", border: "1px solid rgba(212,175,55,0.12)" }}>
                  <div className="text-xl w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(212,175,55,0.1)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "#D4AF37", fontFamily: "'Space Mono', monospace" }}>{item.label}</p>
                    <p className="text-sm text-gray-400">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                {CONFIG.socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl text-center text-xs font-semibold tracking-widest uppercase transition-all duration-300"
                    style={{ border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37", fontFamily: "'Space Mono', monospace" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,175,55,0.12)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative py-10 px-6 text-center" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
      <p className="font-bold text-lg mb-1" style={{ color: "#D4AF37", fontFamily: "'Cormorant Garamond', serif" }}>{CONFIG.name}</p>
      <p className="text-gray-600 text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>© 2026 · Passionate about Data Analysis & Machine Learning</p>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>

      <div className="min-h-screen bg-black relative overflow-x-hidden">
        <Particles />
        <Nav />
        <main className="relative z-10">
          <Hero />
          <GoldLine />
          <About />
          <GoldLine />
          <Skills />
          <GoldLine />
          <Experience />
          <GoldLine />
          <Projects />
          <GoldLine />
          <Achievements />
          <GoldLine />
          <Contact />
          <GoldLine />
        </main>
        <Footer />
      </div>
    </>
  );
}
