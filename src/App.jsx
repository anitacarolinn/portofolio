import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Agentation } from "agentation";
import { translations } from "./i18n.js";

/* ---- Scroll reveal hook ---- */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function Reveal({ children, className = "", stagger = false }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={"reveal " + (stagger ? "reveal-stagger " : "") + className}>
      {children}
    </div>
  );
}

/* ---- Card tilt hook ---- */
function useTilt() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);
  return ref;
}

export default function App() {
  const [lang, setLang] = useState(() => {
    const browserLang = navigator.language || navigator.userLanguage || "en";
    return browserLang.startsWith("zh") ? "zh" : "en";
  });
  const t = useMemo(() => translations[lang], [lang]);
  const toggleLang = () => setLang((l) => (l === "en" ? "zh" : "en"));

  return (
    <div className="min-h-screen w-full bg-cream text-ink antialiased font-sans">
      <Header t={t} />
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <SubBar t={t} />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <HeroSection t={t} />
        </div>
        <AboutSection t={t} />
        <ResearchSection t={t} />
        <CoreSkillsSection t={t} />
        <WorkSection t={t} />
        <ContactSection t={t} />
        <Footer t={t} />
      </div>
      <LanguageToggle lang={lang} toggleLang={toggleLang} />
      {import.meta.env.DEV && <Agentation />}
    </div>
  );
}

/* --------------------------------- HEADER --------------------------------- */
const NAV_SECTIONS = [
  { key: "about", id: "section-about" },
  { key: "skill", id: "section-skill" },
  { key: "work", id: "section-work" },
  { key: "contact", id: "section-contact" },
];

function Header({ t }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
      // Determine active section based on scroll position
      const offset = 120;
      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveSection(NAV_SECTIONS[i].key);
          return;
        }
      }
      setActiveSection("about");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-cream/80 border-b border-ink/5">
      <div className="mx-auto max-w-[1440px] flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-center w-full py-3 px-4 md:px-16">
        {/* Left: name + role (appears on scroll) */}
        <div
          className={
            "hidden md:flex items-center gap-3 transition-all duration-300 " +
            (scrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none")
          }
        >
          <img src="/favicon.png" alt="" className="size-7 rounded-full object-cover" />
          <span className="font-serif text-ink text-[15px] tracking-[-0.01em]">
            {t.header.name}
          </span>
          <span className="w-4 h-px bg-taupe" />
          <span className="font-mono text-[10px] tracking-[0.08em] text-taupe">
            {t.header.role}
          </span>
        </div>

        {/* Center: nav pills — always centered via grid */}
        <nav className="flex items-center rounded-full gap-1 bg-white/60 border border-border p-1.5 justify-self-center">
          {NAV_SECTIONS.map((s) => (
            <NavItem
              key={s.key}
              active={activeSection === s.key}
              onClick={() => scrollTo(s.id)}
            >
              {t.nav[s.key]}
            </NavItem>
          ))}
        </nav>

        {/* Right: status (appears on scroll) */}
        <div
          className={
            "hidden md:flex items-center gap-2 justify-self-end transition-all duration-300 " +
            (scrolled ? "opacity-100" : "opacity-0")
          }
        >
          <div className="size-2 rounded-full bg-sage" />
          <span className="font-mono text-[10px] tracking-[0.08em] text-sage-deep">
            Available
          </span>
        </div>
      </div>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress h-[2px] bg-sage/60"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </header>
  );
}

/* --------------------------- LANGUAGE TOGGLE FAB -------------------------- */
function LanguageToggle({ lang, toggleLang }) {
  return (
    <button
      onClick={toggleLang}
      aria-label="Toggle language"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Outer: spinning light ring */}
      <div className="relative size-14 rounded-full hover:scale-110 active:scale-95 transition-transform">
        {/* Spinning gradient border */}
        <div
          className="absolute inset-0 rounded-full lang-toggle-glow"
          style={{
            background: "conic-gradient(from 0deg, #6B7D5A, #d4c9a8, #2B2824, #6B7D5A)",
          }}
        />
        {/* Inner circle */}
        <div className="absolute inset-[2px] rounded-full bg-ink flex items-center justify-center shadow-[0_8px_24px_rgba(43,40,36,0.3)]">
          {/* Language labels */}
          <div className="relative flex items-center gap-0">
            <span
              className={
                "text-[14px] leading-none transition-all duration-300 " +
                (lang === "zh"
                  ? "text-[#d4c9a8] font-bold scale-110"
                  : "text-cream/30 scale-90")
              }
              style={{ fontFamily: "var(--font-serif-cn)" }}
            >
              中
            </span>
            <span className="text-cream/20 text-[10px] mx-0.5">/</span>
            <span
              className={
                "font-mono text-[10px] leading-none font-semibold transition-all duration-300 " +
                (lang === "en"
                  ? "text-[#d4c9a8] scale-110"
                  : "text-cream/30 scale-90")
              }
            >
              EN
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function NavItem({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full py-2 px-4.5 transition-all duration-200 " +
        (active
          ? "bg-white shadow-[0_1px_2px_rgba(43,40,36,0.08)]"
          : "hover:bg-white/40")
      }
    >
      <span
        className={
          "font-sans font-medium text-[13px] leading-4 " +
          (active ? "text-ink" : "text-muted")
        }
      >
        {children}
      </span>
    </button>
  );
}

/* --------------------------------- SUBBAR --------------------------------- */
function SubBar({ t }) {
  return (
    <div className="flex w-full items-center pt-6 pb-4 border-t border-ink/10 px-6 md:px-16 gap-6 flex-wrap">
      <span className="tracking-[0.18em] uppercase text-taupe font-mono text-[10px]">
        {t.subbar.portfolio}
      </span>
      <span className="w-6 h-px bg-taupe shrink-0" />
      <span className="tracking-[0.18em] uppercase text-taupe font-mono text-[10px]">
        {t.subbar.route}
      </span>
    </div>
  );
}

/* ---------------------------------- HERO ---------------------------------- */
function HeroSection({ t }) {
  return (
    <section className="flex w-full items-start py-10 px-6 md:px-16 gap-10 lg:gap-12 xl:gap-16 flex-col lg:flex-row overflow-hidden">
      {/* Mobile: card carousel first — scaled down */}
      <div className="flex flex-col w-full lg:hidden gap-4 max-w-[340px] mx-auto">
        <FeatureCarousel t={t} />
      </div>
      {/* Left: big type — Chinese name primary, English name secondary */}
      <div className="flex flex-col lg:shrink-0 lg:w-[54%] w-full">
        <div
          className="text-[clamp(64px,9vw,130px)] tracking-[0.02em] leading-[0.92] text-ink font-normal font-serif-cn"
          style={{ fontFamily: "var(--font-serif-cn)" }}
        >
          {t.hero.first}
        </div>
        <div className="flex items-end mt-1 gap-4">
          <div className="text-[clamp(32px,4.5vw,72px)] tracking-[-0.03em] leading-[0.9] text-ink font-serif font-light italic">
            {t.hero.last}
          </div>
          <div className="text-[clamp(20px,3vw,40px)] pb-2 text-sage font-serif font-light">
            *
          </div>
        </div>

        <div className="flex flex-col mt-12 max-w-[580px] gap-6">
          <div className="w-[60px] h-px bg-ink" />
          <p className="text-[17px] md:text-[22px] leading-[1.5] text-ink font-serif italic">
            {t.hero.tagline}
          </p>
          <div className="flex mt-2 gap-2.5 md:gap-3.5">
            <button
              onClick={() => document.getElementById("section-work")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center rounded-full py-2.5 px-4 md:py-3.5 md:px-6 gap-2 bg-ink hover:bg-ink-soft transition"
            >
              <span className="text-cream font-sans font-semibold text-[12px] md:text-[13px]">
                {t.hero.primary}
              </span>
              <span className="text-cream font-sans text-[12px] md:text-[13px]">→</span>
            </button>
            <button className="flex items-center rounded-full py-2.5 px-4 md:py-3.5 md:px-6 bg-white border border-border hover:border-ink/30 transition">
              <span className="text-ink font-sans font-semibold text-[12px] md:text-[13px]">
                {t.hero.secondary}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right: feature card carousel (desktop only — mobile is above) */}
      <div className="hidden lg:flex flex-col lg:flex-1 lg:min-w-0 gap-4">
        <FeatureCarousel t={t} />
      </div>
    </section>
  );
}

function FeatureCarousel({ t }) {
  const features = t.features;
  const [active, setActive] = useState(0);
  const total = features.length;

  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = useCallback(
    () => setActive((i) => (i - 1 + total) % total),
    [total]
  );

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  // Position each card: 0 = active center, -1 = left behind, +1 = right behind
  const getPosition = (index) => {
    const diff = ((index - active + total) % total);
    if (diff === 0) return "center";
    if (diff === 1 || (diff === total - 1 && total === 2)) return "right";
    if (diff === total - 1) return "left";
    return "hidden";
  };

  const positionStyles = {
    center: "z-30 scale-100 rotate-0 opacity-100 translate-x-0",
    left: "z-10 scale-[0.85] -rotate-6 opacity-70 -translate-x-[6%] md:-translate-x-[10%]",
    right: "z-10 scale-[0.85] rotate-6 opacity-70 translate-x-[6%] md:translate-x-[10%]",
    hidden: "z-0 scale-[0.8] opacity-0 translate-x-0",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stacked card deck */}
      <div className="relative" style={{ minHeight: "clamp(280px, 32vw, 440px)" }}>
        {features.map((f, i) => {
          const pos = getPosition(i);
          return (
            <div
              key={i}
              onClick={() => pos !== "center" && setActive(i)}
              className={
                "absolute inset-0 flex flex-col rounded-[18px] gap-3 md:gap-[18px] bg-white shadow-[0_4px_28px_rgba(43,40,36,0.07)] p-4 md:p-6 transition-all duration-700 ease-out origin-bottom " +
                positionStyles[pos] +
                (pos !== "center" ? " cursor-pointer" : "")
              }
            >
              <div className="flex items-center justify-between">
                <span className="tracking-[0.14em] text-taupe font-mono text-[10px]">
                  {f.label}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-sage" />
                  <span className="tracking-[0.08em] text-sage font-mono text-[10px]">
                    {f.status}
                  </span>
                </div>
              </div>

              <div
                className="flex flex-col justify-between rounded-xl p-4 md:p-6"
                style={{
                  backgroundImage:
                    f.gradient ||
                    "linear-gradient(135deg, #EEE8DA 0%, #DDD3BC 50%, #BFB59B 100%)",
                  minHeight: "clamp(120px, 20vw, 200px)",
                }}
              >
                <div className="flex justify-between">
                  <span className={"tracking-widest font-mono text-[10px] " + (f.gradient ? "text-cream/50" : "text-ink/50")}>
                    {f.caption}
                  </span>
                  <span className={"tracking-widest font-mono text-[10px] " + (f.gradient ? "text-cream/50" : "text-ink/50")}>
                    {f.year}
                  </span>
                </div>
                <div className={"text-[22px] md:text-[30px] leading-[1.05] tracking-[-0.01em] font-serif italic whitespace-pre-line " + (f.gradient ? "text-cream" : "text-ink")}>
                  {f.title}
                </div>
              </div>

              <div className="hidden md:flex flex-col gap-2">
                <div className="text-ink font-serif font-medium text-xl">
                  {f.heading}
                </div>
                <p className="text-[13px] leading-[1.6] text-muted font-sans">
                  {f.body}
                </p>
              </div>

              <div className="hidden md:flex flex-wrap gap-1.5">
                {f.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md py-[5px] px-[11px] bg-cream text-ink-soft font-mono text-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mobile: heading + tags, no body */}
              <div className="md:hidden flex flex-col gap-2">
                <div className="text-ink font-serif font-medium text-[15px]">
                  {f.heading}
                </div>
                <div className="flex flex-wrap gap-1">
                  {f.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md py-1 px-2 bg-cream text-ink-soft font-mono text-[9px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots — centered */}
      <div className="flex justify-center gap-2 px-1">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={
              "rounded-full transition-all duration-300 " +
              (i === active
                ? "w-6 h-2 bg-ink"
                : "w-2 h-2 bg-ink/20 hover:bg-ink/40")
            }
          />
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- STATS ---------------------------------- */
function StatsSection({ t }) {
  return (
    <section className="flex flex-col w-full mt-10 border-t border-ink/10">
      {/* Section heading */}
      <div className="flex justify-between items-baseline gap-4 flex-wrap pt-12 pb-4 px-6 md:px-16">
        <h2 className="tracking-[-0.02em] text-ink font-serif text-3xl md:text-5xl leading-[1.2]">
          {t.statsHeading.title}
        </h2>
        <span className="tracking-[0.14em] uppercase text-taupe font-mono text-[10px]">
          {t.statsHeading.eyebrow}
        </span>
      </div>
      {/* Top row: 4 stat tiles with labels */}
      <div className="flex w-full items-center justify-center py-8 px-6 md:px-16">
        <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
          {t.stats.map((s, i) => (
            <div key={i} className="flex items-center gap-10 md:gap-16">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={
                    "text-[44px] leading-none tracking-[-0.02em] font-serif " +
                    (s.accent ? "text-sage italic" : "text-ink")
                  }
                >
                  {s.value}
                </div>
                <span className="tracking-[0.14em] uppercase text-taupe font-mono text-[10px]">
                  {s.label}
                </span>
              </div>
              {i < t.stats.length - 1 && (
                <div className="w-px h-[56px] bg-border hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail grid: Competitions + Languages breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 px-6 md:px-16 pb-12 pt-10 border-t border-ink/10">
        <CompetitionsList data={t.details.competitions} />
        <LanguagesList data={t.details.languages} />
      </div>
    </section>
  );
}

/* SVG icons for competition tiers */
function TrophyIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
      <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
      <path d="M6 3h12v6a6 6 0 0 1-12 0V3Z" />
      <path d="M9 21h6" />
      <path d="M12 15v6" />
    </svg>
  );
}

function MedalIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.204 0l-3.58 2.687a.5.5 0 0 1-.81-.47l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
      <path d="M12 5v6" />
      <path d="M9 8h6" />
    </svg>
  );
}

function AwardIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.204 0l-3.58 2.687a.5.5 0 0 1-.81-.47l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
    </svg>
  );
}

const TIER_STYLES = {
  gold: { Icon: TrophyIcon, bg: "bg-[#f9f3e3]", border: "border-[#d4c08a]", text: "text-[#8a6d2b]", iconColor: "text-[#b8922e]" },
  bronze: { Icon: MedalIcon, bg: "bg-[#faf5f0]", border: "border-[#c9b8a0]", text: "text-[#8a7050]", iconColor: "text-[#a0845a]" },
  merit: { Icon: AwardIcon, bg: "bg-sage/10", border: "border-sage/25", text: "text-sage-deep", iconColor: "text-sage" },
};

/* Proof popup modal */
function ProofModal({ proof, title, tier, onClose }) {
  const isPdf = proof.endsWith(".pdf");
  const isCert = proof.includes("cert");
  const description = isPdf
    ? `Certificate of "${title}"`
    : isCert
    ? `Certificate of "${title}"`
    : `Photo of "${title}"`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-md p-3 md:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[14px] md:rounded-[18px] shadow-[0_24px_64px_rgba(43,40,36,0.25)] max-w-[720px] w-full max-h-[85vh] md:max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-ink/10">
          <div className="flex flex-col gap-1">
            <span className="font-serif text-ink text-lg tracking-[-0.01em]">
              {title}
            </span>
            <span className="font-mono text-[10px] tracking-[0.08em] text-taupe uppercase">
              {description}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-9 rounded-full bg-cream hover:bg-ink/10 transition"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-4 text-ink">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        {/* Content */}
        <div className="p-5 overflow-auto flex-1 flex items-center justify-center bg-cream">
          {isPdf ? (
            <iframe
              src={proof}
              title={description}
              className="w-full min-h-[500px] rounded-lg border border-ink/10"
            />
          ) : (
            <img
              src={proof}
              alt={description}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function CertsList({ certs, title }) {
  const [viewCert, setViewCert] = useState(null);
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-serif text-ink text-lg tracking-[-0.01em]">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {certs.map((c, i) => (
          <button
            key={i}
            onClick={() => setViewCert(c)}
            className="flex items-center gap-2 rounded-full border border-border-soft bg-cream hover:border-ink/30 transition py-2 px-4 group"
          >
            <span className="text-ink font-sans font-medium text-[12px]">
              {c.name}
            </span>
            <span className="text-taupe font-mono text-[10px]">{c.year}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3 text-taupe group-hover:text-ink transition">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </button>
        ))}
      </div>
      {viewCert && createPortal(
        <ProofModal
          proof={viewCert.href}
          title={viewCert.name}
          tier="merit"
          onClose={() => setViewCert(null)}
        />,
        document.body
      )}
    </div>
  );
}

function CompetitionsList({ data }) {
  const [viewProof, setViewProof] = useState(null);

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-serif text-ink tracking-[-0.01em] text-[28px] leading-[1.1]">
        {data.title}
      </h3>
      <ul className="flex flex-col">
        {data.items.map((c, i) => {
          const tier = TIER_STYLES[c.tier] || TIER_STYLES.merit;
          const TierIcon = tier.Icon;
          return (
            <li
              key={i}
              className="flex items-start gap-4 border-t border-ink/10 py-4 last:border-b-0"
            >
              {/* Tier icon */}
              <div
                className={
                  "flex items-center justify-center size-9 rounded-lg shrink-0 mt-0.5 " +
                  tier.bg + " border " + tier.border
                }
              >
                <TierIcon className={"size-[18px] " + tier.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={"font-serif italic text-[15px] leading-tight " + tier.text}>
                    {c.rank}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.08em] text-taupe">
                    {c.year}
                  </span>
                </div>
                <div className="font-sans text-[13px] leading-[1.5] text-ink-soft">
                  {c.title}
                </div>
              </div>
              {/* Proof button */}
              {c.proof && (
                <button
                  onClick={() => setViewProof(c)}
                  className="shrink-0 flex items-center gap-1.5 rounded-full py-1.5 px-3 border border-border-soft bg-white hover:border-ink/30 hover:bg-cream transition mt-1"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3 text-taupe">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                  <span className="font-mono text-[10px] text-taupe">View</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {/* Modal */}
      {viewProof && createPortal(
        <ProofModal
          proof={viewProof.proof}
          title={viewProof.title}
          tier={viewProof.tier}
          onClose={() => setViewProof(null)}
        />,
        document.body
      )}
    </div>
  );
}

function LanguagesList({ data }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-serif text-ink tracking-[-0.01em] text-[28px] leading-[1.1]">
        {data.title}
      </h3>
      <ul className="flex flex-col">
        {data.items.map((l, i) => (
          <li
            key={i}
            className="flex items-center justify-between gap-4 border-t border-ink/10 py-4"
          >
            <div className="flex items-baseline gap-3 min-w-0">
              <span className="font-serif text-ink text-xl leading-tight">
                {l.name}
              </span>
              <span className="font-serif italic text-taupe text-sm leading-tight">
                {l.native}
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-sage-deep shrink-0">
              {l.level}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------ CORE SKILLS ------------------------------- */
function CoreSkillsSection({ t }) {
  return (
    <section id="section-skill" className="flex flex-col w-full pt-10 pb-8 gap-8 px-6 md:px-16 scroll-mt-16">
      <div className="flex justify-between items-baseline gap-4 flex-wrap">
        <h2 className="tracking-[-0.02em] text-ink font-serif text-3xl md:text-5xl leading-[1.2]">
          {t.core.title}
        </h2>
        <span className="tracking-[0.08em] text-taupe font-mono text-[11px]">
          <span className="hidden lg:inline">{t.core.hint}</span>
          <span className="lg:hidden">{t.core.hintMobile}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger skill-grid">
        {t.core.cards.map((card, i) => (
          <Reveal key={i}>
            <FlipCard card={card} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FlipCard({ card, index }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={
        "group [perspective:1200px] min-h-[320px] cursor-pointer " +
        (!flipped ? "flip-hint" : "")
      }
      style={{ "--peek-delay": `${[0, 2.7, 1.3, 4.1][index] || 0}s`, "--shake-duration": `${[4.5, 5.8, 5.1, 6.3][index] || 5}s` }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className={
          "relative w-full h-full min-h-[320px] transition-transform duration-700 ease-out [transform-style:preserve-3d] " +
          (flipped ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateY(180deg)]")
        }
      >
        {/* Front face */}
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] flex flex-col rounded-[18px] gap-[18px] bg-white border border-border-soft p-7">
          <div className="flex items-center justify-between">
            <span className="tracking-[0.14em] text-taupe font-mono text-[10px]">
              {card.index}
            </span>
            <div className="flex items-center justify-center rounded-full size-9 bg-cream">
              <span className="font-serif italic text-base text-ink">
                {card.mark}
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-end gap-3">
            <div className="text-[26px] tracking-[-0.01em] leading-[1.1] font-serif text-ink whitespace-pre-line">
              {card.front}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-sage-deep">
              {card.subtitle}
            </div>
            <span className="lg:hidden font-mono text-[8px] text-taupe/50 mt-1">tap to flip ↻</span>
          </div>
        </div>

        {/* Back face */}
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col rounded-[18px] gap-4 bg-ink p-7">
          <div className="flex items-center justify-between">
            <span className="tracking-[0.14em] text-bone font-mono text-[10px]">
              {card.index}
            </span>
            <div className="flex items-center justify-center rounded-full size-9 bg-sage">
              <span className="font-serif italic text-base text-cream">
                {card.mark}
              </span>
            </div>
          </div>
          <p className="text-[14px] leading-[1.65] text-bone font-sans flex-1 flex items-center">
            {card.body}
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- WORK ----------------------------------- */
function WorkSection({ t }) {
  const { hero, cards, studio } = t.work;
  return (
    <>
      <section id="section-work" className="flex flex-col w-full pt-20 pb-10 gap-8 px-6 md:px-16 scroll-mt-16">
        <div className="flex justify-between items-baseline gap-4 flex-wrap">
          <h2 className="tracking-[-0.02em] text-ink font-serif text-3xl md:text-5xl leading-[1.2]">
            {t.work.title}
          </h2>
          <span className="tracking-[0.14em] uppercase text-taupe font-mono text-[10px]">
            {t.work.eyebrow}
          </span>
        </div>
      </section>

      {/* Hero card — full width */}
      <Reveal className="w-full pb-6 px-6 md:px-16">
        <WorkHeroCard item={hero} />
      </Reveal>

      {/* Two side-by-side cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full pb-6 gap-6 px-6 md:px-16 reveal-stagger">
        {cards.map((item, i) => (
          <Reveal key={i}>
            <WorkCard item={item} projectLinks={item.green ? t.work.tzuchiProjects : null} />
          </Reveal>
        ))}
      </div>

      {/* Studio strip */}
      <Reveal className="w-full pb-10 px-6 md:px-16">
        <StudioStrip studio={studio} />
      </Reveal>
    </>
  );
}

function WorkHeroCard({ item }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const galleryImages = [
    "/work/resqband/cover.jpg",
    "/work/resqband/brochure.png",
    "/work/resqband/architecture.jpg",
    "/work/resqband/hardware.jpg",
    "/work/resqband/algorithm.jpg",
  ];

  return (
    <>
      <div
        className="flex flex-col lg:flex-row w-full justify-between rounded-[18px] overflow-hidden p-9 lg:p-10 gap-8 min-h-[320px]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #EEE8DA 0%, #D8CDB3 60%, #BFB59B 100%)",
        }}
      >
        <div className="flex flex-col justify-between flex-1 gap-6">
          <div className="flex items-start gap-6">
            <span className="tracking-[0.14em] font-mono text-[10px] text-ink/55">
              {item.caption}
            </span>
            <div className="flex items-center rounded-full py-[5px] px-3 gap-1.5 bg-ink/85">
              <div className="size-1.5 rounded-full bg-sage" />
              <span className="tracking-[0.08em] font-mono text-[9px] text-cream">
                {item.badge}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-[clamp(36px,5vw,56px)] leading-[0.95] tracking-[-0.02em] font-serif text-ink italic whitespace-pre-line">
              {item.title}
            </div>
            <p className="text-ink-soft font-sans text-[14px] leading-[1.5] max-w-[480px]">
              {item.subtitle}
            </p>
          </div>
          <span className="text-ink/40 font-mono text-[11px]">{item.stack}</span>
        </div>
        {item.image && (
          <div
            className="flex flex-col items-center justify-center w-full lg:w-[440px] shrink-0 cursor-pointer group gap-3"
            onClick={() => setGalleryOpen(true)}
          >
            <div className="relative w-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-contain rounded-[12px] shadow-[0_8px_32px_rgba(43,40,36,0.1)] group-hover:shadow-[0_12px_40px_rgba(43,40,36,0.18)] group-hover:scale-[1.02] transition duration-300"
              />
            </div>
            {/* Always-visible gallery button */}
            <button className="flex items-center gap-2 bg-white/80 hover:bg-white rounded-full py-2 px-4 shadow-sm hover:shadow-md transition">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-ink">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span className="font-mono text-[10px] text-ink/70">View {galleryImages.length} photos</span>
            </button>
          </div>
        )}
      </div>

      {galleryOpen && createPortal(
        <ProjectGallery
          images={galleryImages}
          title={item.title.replace("\n", " ")}
          onClose={() => setGalleryOpen(false)}
        />,
        document.body
      )}
    </>
  );
}

function ProjectGallery({ images, title, onClose }) {
  const [active, setActive] = useState(0);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-md p-3 md:p-6"
      onClick={onClose}
    >
      {/* Left arrow — outside container */}
      <button
        onClick={(e) => { e.stopPropagation(); setActive((active - 1 + images.length) % images.length); }}
        className="hidden md:flex shrink-0 items-center justify-center size-12 rounded-full bg-white/90 shadow-lg hover:bg-white hover:scale-110 transition mr-4"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-ink">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <div
        className="relative bg-white rounded-[14px] md:rounded-[18px] shadow-[0_24px_64px_rgba(43,40,36,0.25)] max-w-[900px] w-full max-h-[85vh] md:max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-ink/10">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-ink text-base md:text-lg tracking-[-0.01em]">{title}</span>
            <span className="font-mono text-[10px] tracking-[0.08em] text-taupe">
              {active + 1} / {images.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-9 rounded-full bg-cream hover:bg-ink/10 transition"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-4 text-ink">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        {/* Main image */}
        <div className="flex-1 overflow-auto bg-cream p-3 md:p-5 flex items-center justify-center min-h-[200px] md:min-h-[400px] relative">
          <img
            src={images[active]}
            alt={`${title} — ${active + 1}`}
            className="max-w-full max-h-[50vh] md:max-h-[60vh] object-contain rounded-lg"
          />
          {/* Mobile nav arrows */}
          <div className="md:hidden absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button
              onClick={(e) => { e.stopPropagation(); setActive((active - 1 + images.length) % images.length); }}
              className="pointer-events-auto flex items-center justify-center size-9 rounded-full bg-white/80 shadow-md"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-ink"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActive((active + 1) % images.length); }}
              className="pointer-events-auto flex items-center justify-center size-9 rounded-full bg-white/80 shadow-md"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-ink"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        {/* Thumbnail strip */}
        <div className="flex gap-2 p-4 border-t border-ink/10 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={
                "shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition " +
                (i === active ? "border-ink" : "border-transparent opacity-50 hover:opacity-80")
              }
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Right arrow — outside container */}
      <button
        onClick={(e) => { e.stopPropagation(); setActive((active + 1) % images.length); }}
        className="hidden md:flex shrink-0 items-center justify-center size-12 rounded-full bg-white/90 shadow-lg hover:bg-white hover:scale-110 transition ml-4"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-ink">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

function WorkCard({ item, projectLinks }) {
  const isDark = item.dark || item.green;
  const bg = item.green ? "bg-[#3A4A2E]" : item.dark ? "bg-ink" : "";
  const images = item.images || [];
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setImgIdx((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div
      className={
        "flex flex-col w-full aspect-auto min-h-[400px] lg:aspect-[3/3] justify-between rounded-[18px] overflow-hidden p-5 md:p-8 " +
        (isDark ? bg : "")
      }
      style={
        isDark
          ? undefined
          : { backgroundImage: "linear-gradient(135deg, #EEE8DA 0%, #D8CDB3 60%, #BFB59B 100%)" }
      }
    >
      {/* Top: caption + badge */}
      <div className="flex justify-between items-start">
        <span className={"tracking-[0.14em] font-mono text-[10px] " + (isDark ? "text-cream/50" : "text-ink/55")}>
          {item.caption}
        </span>
        <div
          className={
            "flex items-center rounded-full py-[5px] px-3 gap-1.5 " +
            (item.badgeLive
              ? "bg-sage/25 border border-sage"
              : isDark
              ? "bg-cream/10 border border-cream/20"
              : "bg-ink/85")
          }
        >
          {item.badgeLive && <div className="size-1.5 rounded-full bg-sage" />}
          <span
            className={
              "tracking-[0.08em] font-mono text-[9px] " +
              (item.badgeLive ? "text-sage" : isDark ? "text-cream/60" : "text-cream")
            }
          >
            {item.badge}
          </span>
        </div>
      </div>

      {/* Middle: screenshot preview OR project grid */}
      {images.length > 0 ? (
        <div className="relative w-full flex-1 overflow-hidden">
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={
                "absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 " +
                (i === imgIdx ? "opacity-100" : "opacity-0")
              }
            />
          ))}
        </div>
      ) : projectLinks ? (
        /* Tzu Chi Digital: staggered project links */
        <div className="flex flex-col flex-1 justify-center gap-2 my-2">
          {projectLinks.map((p, i) =>
            p.href ? (
              <a
                key={i}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-[10px] py-3 px-4 bg-cream/6 border border-cream/8 hover:border-cream/20 hover:bg-cream/12 transition group"
                style={{ marginLeft: `${(i % 3) * 12}px` }}
              >
                <span className="font-serif italic text-cream/20 text-[18px] leading-none shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-sans text-[13px] text-cream/65 group-hover:text-cream/90 transition">{p.name}</span>
                  <span className="font-mono text-[9px] text-cream/30 group-hover:text-cream/45 transition truncate">{p.desc}</span>
                </div>
                <span className="ml-auto shrink-0 text-cream/25 text-[11px] group-hover:text-cream/50 transition">↗</span>
              </a>
            ) : (
              <div
                key={i}
                className="flex items-center gap-3 rounded-[10px] py-3 px-4 bg-cream/3 border border-cream/5"
                style={{ marginLeft: `${(i % 3) * 12}px` }}
              >
                <span className="font-serif italic text-cream/12 text-[18px] leading-none shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-sans text-[13px] text-cream/30">{p.name}</span>
                  <span className="font-mono text-[9px] text-cream/18 truncate">{p.desc}</span>
                </div>
                <span className="ml-auto shrink-0 font-mono text-[8px] text-cream/18 italic">internal</span>
              </div>
            )
          )}
        </div>
      ) : null}

      {/* Bottom: title + subtitle + stack */}
      <div className="flex flex-col gap-2">
        <div
          className={
            "text-[clamp(28px,3.5vw,44px)] leading-[0.95] tracking-[-0.02em] font-serif italic whitespace-pre-line " +
            (isDark ? "text-cream" : "text-ink")
          }
        >
          {item.title}
        </div>
        <p className={"text-[13px] leading-[1.5] font-sans " + (isDark ? "text-cream/60" : "text-ink-soft")}>
          {item.subtitle}
        </p>
      </div>

      <div className="flex justify-between items-center gap-4 flex-wrap">
        <span className={"font-mono text-[11px] " + (isDark ? "text-cream/30" : "text-ink/40")}>
          {item.stack}
        </span>
        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={"font-sans font-medium text-[12px] transition " + (isDark ? "text-cream hover:text-cream/80" : "text-ink hover:text-sage-deep")}
          >
            {item.linkLabel}
          </a>
        )}
      </div>
    </div>
  );
}

function StudioStrip({ studio }) {
  const [viewImage, setViewImage] = useState(null);
  return (
    <>
      <div className="flex flex-col rounded-[18px] overflow-hidden p-8 md:p-10 gap-6" style={{ background: "linear-gradient(135deg, #D8CDB3 0%, #C4B89A 50%, #B0A685 100%)" }}>
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="tracking-[0.14em] uppercase text-ink/40 font-mono text-[10px]">
                {studio.label}
              </span>
              <span className="tracking-[0.14em] uppercase text-ink/40 font-mono text-[10px]">
                {studio.labelLocal}
              </span>
              <span className="text-ink/30 font-mono text-[10px]">·</span>
              <span className="tracking-[0.14em] uppercase text-ink/40 font-mono text-[10px]">
                {studio.count}
              </span>
            </div>
            <h3 className="font-serif text-ink text-[32px] md:text-[36px] tracking-[-0.02em] leading-[1.05]">
              {studio.title}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {studio.projects.map((p, i) => (
            <div
              key={i}
              onClick={() => p.image && setViewImage(p)}
              className={
                "flex rounded-[12px] bg-white/50 border border-ink/10 hover:border-ink/20 hover:bg-white/70 transition overflow-hidden shadow-sm " +
                (p.image ? "cursor-pointer group " : "") +
                "flex-row sm:flex-col"
              }
            >
              {p.image ? (
                <div className="w-24 sm:w-full aspect-square sm:aspect-[16/10] overflow-hidden shrink-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                </div>
              ) : null}
              <div className={"flex items-center px-4 sm:justify-center " + (p.image ? "py-3 sm:py-4" : "py-6")}>
                <span className="text-ink/60 font-mono text-[11px]">
                  {p.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {viewImage && createPortal(
        <DesignGallery
          projects={studio.projects.filter((p) => p.image)}
          initial={studio.projects.filter((p) => p.image).findIndex((p) => p.name === viewImage.name)}
          onClose={() => setViewImage(null)}
        />,
        document.body
      )}
    </>
  );
}

function DesignGallery({ projects, initial, onClose }) {
  const [active, setActive] = useState(initial >= 0 ? initial : 0);
  const p = projects[active];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-md p-3 md:p-6"
      onClick={onClose}
    >
      {/* Left arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); setActive((active - 1 + projects.length) % projects.length); }}
        className="hidden md:flex shrink-0 items-center justify-center size-12 rounded-full bg-white/90 shadow-lg hover:bg-white hover:scale-110 transition mr-4"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-ink">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <div
        className="relative bg-white rounded-[14px] md:rounded-[18px] shadow-[0_24px_64px_rgba(43,40,36,0.25)] max-w-[1000px] w-full max-h-[85vh] md:max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-ink/10">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-ink text-base md:text-lg tracking-[-0.01em]">{p.name}</span>
            <span className="font-mono text-[10px] tracking-[0.08em] text-taupe">
              {active + 1} / {projects.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-9 rounded-full bg-cream hover:bg-ink/10 transition"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-4 text-ink">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-auto bg-cream p-3 md:p-5 flex items-center justify-center relative">
          <img
            src={p.image}
            alt={p.name}
            className="max-w-full max-h-[55vh] md:max-h-[75vh] object-contain rounded-lg"
          />
          {/* Mobile nav arrows */}
          <div className="md:hidden absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button
              onClick={(e) => { e.stopPropagation(); setActive((active - 1 + projects.length) % projects.length); }}
              className="pointer-events-auto flex items-center justify-center size-9 rounded-full bg-white/80 shadow-md"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-ink"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActive((active + 1) % projects.length); }}
              className="pointer-events-auto flex items-center justify-center size-9 rounded-full bg-white/80 shadow-md"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-ink"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        {/* Thumbnail strip */}
        <div className="flex gap-2 p-3 md:p-4 border-t border-ink/10 overflow-x-auto">
          {projects.map((proj, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={
                "shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition " +
                (i === active ? "border-ink" : "border-transparent opacity-50 hover:opacity-80")
              }
            >
              <img src={proj.image} alt={proj.name} className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      </div>

      {/* Right arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); setActive((active + 1) % projects.length); }}
        className="hidden md:flex shrink-0 items-center justify-center size-12 rounded-full bg-white/90 shadow-lg hover:bg-white hover:scale-110 transition ml-4"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-ink">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

/* -------------------------------- RESEARCH -------------------------------- */
function ResearchSection({ t }) {
  const r = t.research;
  return (
    <section id="section-research" className="flex flex-col w-full pt-20 pb-12 gap-10 px-6 md:px-16 border-t border-ink/10 mt-10 scroll-mt-16">
      <div className="flex justify-between items-baseline gap-4 flex-wrap">
        <h2 className="tracking-[-0.02em] text-ink font-serif text-3xl md:text-5xl leading-[1.2]">
          {r.title}
        </h2>
        <span className="tracking-[0.14em] uppercase text-taupe font-mono text-[10px]">
          {r.eyebrow}
        </span>
      </div>

      {r.subtitle && (
        <p className="max-w-[720px] text-[17px] leading-[1.6] text-ink-soft font-serif italic -mt-4">
          {r.subtitle}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch reveal-stagger" style={{ minWidth: 0 }}>
        {r.items.map((paper, i) => (
          <Reveal key={i}>
            <PaperCard paper={paper} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PaperCard({ paper }) {
  return (
    <article className="flex flex-col rounded-[18px] bg-white border border-border-soft overflow-hidden h-full min-w-0">
      {/* Cover image */}
      {paper.cover && (
        <div className="w-full bg-cream overflow-hidden">
          <img
            src={paper.cover}
            alt={paper.title}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {/* Top section: number + titles (flex-1 so shorter titles push content down to align) */}
      <div className={"flex flex-col gap-2 px-8 flex-1" + (paper.cover ? " pt-5" : " pt-8")}>
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-serif italic text-sage-deep text-[44px] leading-none">
            {paper.number}
          </span>
          <span className="tracking-[0.14em] uppercase text-taupe font-mono text-[10px]">
            {paper.year} · {paper.venue}
          </span>
        </div>
        <h3 className="font-serif text-ink tracking-[-0.01em] text-[clamp(18px,2.5vw,24px)] leading-[1.2] mt-2">
          {paper.title}
        </h3>
        <div className="font-serif italic text-muted text-[15px] leading-[1.4]">
          {paper.titleLocal}
        </div>
      </div>

      {/* Bottom section: always aligned across cards */}
      <div className="flex flex-col gap-5 px-8 pb-8 pt-4">
        {/* Authors + advisor */}
        <div className="flex flex-col gap-1 pt-4 border-t border-ink/10">
          <span className="text-ink-soft font-sans text-[13px]">
            {paper.authors}
          </span>
          <span className="tracking-[0.08em] uppercase text-taupe font-mono text-[10px]">
            {paper.advisor}
          </span>
        </div>

        {/* Abstract */}
        <p className="text-[13px] leading-[1.65] text-muted font-sans">
          {paper.abstract}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {paper.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md py-[5px] px-[11px] bg-cream text-ink-soft font-mono text-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </article>
  );
}

/* --------------------------------- ABOUT ---------------------------------- */
function AboutSection({ t }) {
  const a = t.about;
  const edu = t.education.items[0];
  const certs = t.education.certs;
  const comps = t.details.competitions;
  const langs = t.details.languages;
  return (
    <section id="section-about" className="flex flex-col w-full pt-16 pb-8 gap-10 px-6 md:px-16 border-t border-ink/10 mt-10 scroll-mt-16">
      <div className="flex justify-between items-baseline gap-4 flex-wrap">
        <h2 className="tracking-[-0.02em] text-ink font-serif text-[28px] md:text-[44px] leading-[1.15] max-w-[720px] whitespace-pre-line">
          {a.title}
        </h2>
        <span className="tracking-[0.14em] uppercase text-taupe font-mono text-[10px]">
          {a.eyebrow}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 md:gap-12 items-start justify-between">
        <PhotoFrame monogram={a.monogram} caption={a.caption} />
        <div className="flex flex-col gap-5 pt-2 lg:justify-self-end lg:max-w-[calc(100%-40px)]">
          {/* Short bio */}
          <p className="text-[16px] leading-[1.65] text-ink-soft font-sans">
            {a.paragraphs[0]}
          </p>

          {/* Education inline */}
          <div className="flex flex-col gap-3 p-5 rounded-[14px] bg-white border border-border-soft">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-serif text-ink text-xl tracking-[-0.01em]">
                {edu.school}
              </span>
              <span className="font-mono text-[10px] tracking-[0.08em] text-taupe shrink-0">
                {edu.year}
              </span>
            </div>
            <span className="font-serif italic text-ink-soft text-[14px] leading-[1.4]">
              {edu.degree}
            </span>
            {edu.highlights.length > 0 && (
              <ul className="flex flex-col gap-1.5 pt-2 border-t border-ink/10">
                {edu.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[12px] leading-[1.5] text-muted font-sans"
                  >
                    <span className="inline-block size-1.5 rounded-full bg-sage mt-[5px] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Certifications */}
          <CertsList certs={certs} title={t.education.certsTitle} />
        </div>
      </div>

      {/* Decorative divider */}
      <div className="flex items-center gap-4 pt-4">
        <div className="flex-1 h-px bg-gradient-to-r from-ink/15 to-transparent" />
        <div className="flex items-center gap-3">
          <div className="size-1 rounded-full bg-sage/40" />
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-taupe/60">Highlights</span>
          <div className="size-1 rounded-full bg-sage/40" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-ink/15 to-transparent" />
      </div>

      {/* Highlights: Competitions + Languages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pt-6">
        <CompetitionsList data={comps} />
        <LanguagesList data={langs} />
      </div>
    </section>
  );
}

function PhotoFrame({ monogram, caption }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="relative w-full max-w-[360px] mx-auto aspect-[4/5] rounded-[18px] overflow-hidden border border-border-soft">
      {!errored && (
        <img
          src="/photos/anita.jpg"
          alt="Anita Carolina"
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={() => setErrored(true)}
        />
      )}
      {errored && (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #EEE8DA 0%, #D8CDB3 60%, #BFB59B 100%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <div
              className="text-[180px] text-ink/55 leading-none"
              style={{ fontFamily: "var(--font-serif-cn)" }}
            >
              {monogram}
            </div>
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink/50">
              {caption}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------ LOOKING FOR ------------------------------- */
function LookingForSection({ t }) {
  const lf = t.lookingFor;
  return (
    <section className="flex flex-col w-full pt-10 pb-12 gap-6 px-6 md:px-16">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-full py-2 px-4 gap-2 bg-sage/15">
            <div className="size-2 rounded-full bg-sage animate-pulse" />
            <span className="tracking-[0.08em] text-sage-deep font-mono text-[11px]">
              {lf.statusDot}
            </span>
          </div>
          <h2 className="tracking-[-0.02em] text-ink font-serif text-[36px] leading-[1.1]">
            {lf.title}
          </h2>
        </div>
        <span className="tracking-[0.14em] uppercase text-taupe font-mono text-[10px]">
          {lf.eyebrow}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-2 rounded-[18px] border border-border-soft bg-white p-6 md:p-8">
        {lf.blocks.map((b, i) => (
          <div key={i} className="flex flex-col gap-2">
            <span className="tracking-[0.14em] uppercase text-taupe font-mono text-[10px]">
              {b.label}
            </span>
            <span className="text-ink font-serif text-[17px] leading-[1.3]">
              {b.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- EDUCATION ------------------------------- */
function EducationSection({ t }) {
  const e = t.education;
  return (
    <section className="flex flex-col w-full pt-20 pb-12 gap-8 px-6 md:px-16 border-t border-ink/10 mt-10">
      <div className="flex justify-between items-baseline gap-4 flex-wrap">
        <h2 className="tracking-[-0.02em] text-ink font-serif text-3xl md:text-5xl leading-[1.2]">
          {e.title}
        </h2>
        <span className="tracking-[0.14em] uppercase text-taupe font-mono text-[10px]">
          {e.eyebrow}
        </span>
      </div>

      {/* Main university card + smaller high school */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <EducationCard item={e.items[0]} primary />
        <EducationCard item={e.items[1]} />
      </div>

      {/* Certifications strip */}
      <div className="flex flex-col gap-4 mt-4 pt-8 border-t border-ink/10">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-ink text-2xl tracking-[-0.01em]">
            {e.certsTitle}
          </h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {e.certs.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-border-soft bg-white hover:border-ink/30 hover:bg-cream transition py-2.5 px-5 group"
            >
              <span className="text-ink font-sans font-medium text-[13px]">
                {c.name}
              </span>
              <span className="text-taupe font-mono text-[11px]">{c.year}</span>
              <span className="text-taupe group-hover:text-ink transition text-sm">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({ item, primary }) {
  return (
    <div
      className={
        "flex flex-col rounded-[18px] gap-5 p-8 " +
        (primary
          ? "bg-white border border-border-soft"
          : "bg-cream border border-border-soft/60")
      }
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="tracking-[0.14em] text-taupe font-mono text-[10px]">
          {item.year}
        </span>
        <span className="tracking-[0.08em] text-taupe font-mono text-[10px]">
          {item.location}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={
            "font-serif text-ink tracking-[-0.01em] leading-[1.15] " +
            (primary ? "text-[32px]" : "text-[24px]")
          }
        >
          {item.school}
        </div>
        <div className="font-serif italic text-ink-soft text-[15px] leading-[1.4]">
          {item.degree}
        </div>
      </div>
      {item.highlights.length > 0 && (
        <ul className="flex flex-col gap-2 mt-2 pt-4 border-t border-ink/10">
          {item.highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[13px] leading-[1.55] text-muted font-sans"
            >
              <span className="inline-block size-1.5 rounded-full bg-sage mt-[7px] shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* --------------------------------- CONTACT -------------------------------- */
function ContactSection({ t }) {
  const c = t.contact;
  const marqueeText = "LET'S TALK · LET'S BUILD · LET'S SHIP · ";
  const marquee = marqueeText.repeat(6);

  return (
    <section id="section-contact" className="flex flex-col w-full mt-10 px-6 md:px-16 overflow-hidden pt-10 scroll-mt-16">
      {/* Decorative separator */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent" />
        <div className="flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-sage/50" />
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-taupe">Get in touch</span>
          <div className="size-1.5 rounded-full bg-sage/50" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent" />
      </div>
      <div className="flex flex-col rounded-[24px] overflow-hidden">
        {/* Marquee ticker — gold bg, dark text, infinite scroll */}
        <div className="bg-[#d4c9a8] py-3 overflow-hidden">
          <div className="animate-marquee flex whitespace-nowrap">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-ink shrink-0">
              {marquee}
            </span>
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-ink shrink-0">
              {marquee}
            </span>
          </div>
        </div>

        {/* Main dark section */}
        <div className="bg-ink flex flex-col items-center py-16 px-6 gap-10">
        {/* Headline */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-serif text-[clamp(48px,8vw,72px)] text-cream tracking-[-0.03em] leading-[1] text-center">
            {c.title}
          </h2>
          <div className="w-[60px] h-[2px] bg-[#d4c9a8]" />
          <p className="font-serif italic text-[15px] text-[#7a7060] text-center">
            {c.subtitle}
          </p>
        </div>

        {/* Big email CTA pill */}
        <a
          href={c.channels[0].href}
          className="flex items-center gap-4 py-5 px-10 rounded-full bg-ink-soft/30 border border-[#d4c9a8]/20 hover:border-[#d4c9a8]/40 transition group"
        >
          <span className="font-serif text-[clamp(18px,3vw,26px)] text-[#d4c9a8]">
            {c.channels[0].value}
          </span>
          <div className="flex items-center justify-center size-10 rounded-full bg-[#d4c9a8] group-hover:scale-110 transition">
            <span className="text-ink text-base">→</span>
          </div>
        </a>

        {/* Secondary channels + resume */}
        <div className="flex flex-wrap justify-center gap-3">
          {c.channels.slice(1).map((ch, i) => (
            <a
              key={i}
              href={ch.href}
              target={ch.href.startsWith("http") ? "_blank" : undefined}
              rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 py-3 px-5 rounded-full border border-[#d4c9a8]/15 hover:border-[#d4c9a8]/30 transition"
            >
              <span className="font-sans text-[13px] text-[#d4c9a8]">
                {ch.label}
              </span>
              <span className="font-mono text-[11px] text-[#7a7060]">
                {ch.value}
              </span>
              <span className="text-[#7a7060] text-xs">↗</span>
            </a>
          ))}
          <a
            href={c.resumeHref}
            download
            className="flex items-center py-3 px-5 rounded-full bg-[#d4c9a8] hover:bg-[#c4bba6] transition"
          >
            <span className="font-sans text-[13px] text-ink font-semibold">
              {c.primaryLabel}
            </span>
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- FOOTER --------------------------------- */
function Footer({ t }) {
  return (
    <footer className="flex w-full items-start md:items-center justify-between mt-5 pt-6 pb-12 gap-4 md:gap-8 border-t border-ink/10 px-6 md:px-16 flex-wrap flex-col md:flex-row">
      <div className="flex items-start md:items-center gap-3 md:gap-8 flex-wrap flex-col md:flex-row">
        <span className="tracking-[0.18em] uppercase text-taupe font-mono text-[10px]">
          {t.footer.previously}
        </span>
        {t.footer.places.map((place, i) => (
          <div key={i} className="flex items-center gap-6 md:gap-8">
            <span className="text-ink-soft font-serif italic text-sm md:text-xl">
              {place}
            </span>
            {i < t.footer.places.length - 1 && (
              <div className="size-1 rounded-full bg-[#C4BBA6]" />
            )}
          </div>
        ))}
      </div>
      <span className="tracking-[0.14em] text-taupe font-mono text-[10px]">
        {t.footer.email}
      </span>
    </footer>
  );
}
