"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Project } from "@/lib/projects";

/* ─────────────────────────── DESIGN TOKENS ─────────────────────────── */
const DARK = {
  bg: "#0d0d0d",
  surface: "#141414",
  surfaceHover: "#1a1a1a",
  border: "#222",
  borderLight: "#1a1a1a",
  text: "#f0ece4",
  muted: "#888",
  faint: "#555",
  accent: "#c8a96e",
  accentDim: "rgba(200,169,110,0.12)",
  accentBorder: "rgba(200,169,110,0.25)",
};

const LIGHT = {
  bg: "#ffffff",
  surface: "#f0fdf4",
  surfaceHover: "#dcfce7",
  border: "#d1fae5",
  borderLight: "#e7f5ec",
  text: "#0f1f14",
  muted: "#4b7a5e",
  faint: "#86b89a",
  accent: "#16a34a",
  accentDim: "rgba(22,163,74,0.10)",
  accentBorder: "rgba(22,163,74,0.30)",
};

/* ─────────────────────────── SVG ICONS ─────────────────────────── */
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 11.7 19.79 19.79 0 0 1 1.06 3.1 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);
const IconExternal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
    <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);
const IconStar = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill={color} stroke="none" style={{ width: 12, height: 12 }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconSun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);
const IconMoon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/* ─────────────────────────── DATA ─────────────────────────── */
const TAGS = [
  "Founder · Youth Activism Nepal",
  "TEDx Speaker",
  "Biotechnologist",
  "Certified Mentor",
  "Policy & Social Impact",
];

const STATS = [
  { num: "10,000+", label: "Beneficiaries" },
  { num: "15", label: "Districts" },
  { num: "7+", label: "Years Active" },
  { num: "130+", label: "5-Star Reviews" },
];

const EXPERIENCE = [
  {
    role: "Founder & President",
    org: "Youth Activism Nepal (YAN)",
    period: "Feb 2023 – Present",
    desc: "Founded and scaled a 100% youth-led nonprofit to 10,000+ beneficiaries across 15 districts, running flagship programs in environment, health, and civic engagement.",
  },
  {
    role: "Mentor",
    org: "Global Mentorship Initiative",
    period: "Mar 2026 – Present",
    desc: "Mentoring university graduates on SMART goals, LinkedIn optimization, job search, interviews, and SWOT analysis to prepare them for their careers.",
  },
  {
    role: "Senior Local Coordinator",
    org: "Students For Liberty",
    period: "Jun 2020 – May 2026",
    desc: "Led leadership development and managed student activities for Students For Liberty.",
  },
  {
    role: "Election Observer",
    org: "Asian Network for Free Elections (Anfrel)",
    period: "Feb 2026 – Mar 2026",
    desc: "Covered three districts of Madhesh province (Dhanusha, Siraha, Saptari) observing overall election campaigns, candidate interviews, and the Election Commission.",
  },
  {
    role: "Regional Coordinator",
    org: "South Asia Students For Liberty",
    period: "May 2024 – Jan 2026",
    desc: "Responsible for leadership development including hosting Top Leaders Retreat, SASFL meetings, and overall South Asia student engagement.",
  },
  {
    role: "Student Fellow",
    org: "Prometheus Fellowship",
    period: "May 2022 – Dec 2024",
    desc: "Studied Ayn Rand's philosophy, Objectivism, alongside other texts related to personal and professional development among the world's top 50 student leaders.",
  },
  {
    role: "Program Coordinator",
    org: "The Atlas Society — John Galt School",
    period: "2024 – 2025",
    desc: "Moderated and organized John Galt School, teaching about Objectivism Philosophy and classical liberalism.",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Environment: "#34a853",
  "Public Health": "#4a9eff",
  "Women's Empowerment": "#b06ce4",
  Research: "#e85d4a",
  Education: "#c8a96e",
  Leadership: "#ff8c42",
};

function getColor(tags: string[]): string {
  for (const tag of tags) {
    if (CATEGORY_COLORS[tag]) return CATEGORY_COLORS[tag];
  }
  return "#c8a96e";
}

const CERTIFICATIONS = [
  { name: "Agile Project Management", date: "Mar 2026", id: "YZMAAQTYNXOH" },
  { name: "Foundations of Project Management", date: "Feb 2026", id: "S6RJCB6M737Q" },
  { name: "Leadership and Influencing Skills", date: "Mar 2026", id: "JP6D3UNBSGRX" },
  { name: "Support Individual Growth and Development", date: "Mar 2026", id: "SG95H4117637" },
  { name: "Create a High-Performing Team", date: "Feb 2026", id: "O5R31LLLFWOW" },
  { name: "Grow as a Manager", date: "Feb 2026", id: "HYAEMC2DRO8D" },
  { name: "Always Remember the Stakeholder", date: "Feb 2026", id: "8ZSL29WVE3CO" },
];

const HONORS = [
  { name: "Best Strategy Award", where: "Everest International Model UN" },
  { name: "Global Changemakers Grantee", where: "Connecting Dreams Foundation" },
  { name: "Climate Smart Entrepreneurship", where: "Youth Climate Program" },
  { name: "Darnel Award 2018", where: "Volunteer excellence, Dalit communities" },
];

const FEATURED_STORIES = [
  {
    title: "From a Village in the Terai to a Youth Movement: The Story of Rishav",
    desc: "An inspiring feature covering the journey from the Terai to founding a massive youth movement.",
    tag: "Peace First",
    date: "Aug 24, 2026",
    link: "https://peacefirst.org/2026/08/24/from-a-village-in-the-terai-to-a-youth-movement-the-story-of-rishav/",
    color: "#34a853",
    image: "https://peacefirst.org/wp-content/uploads/2026/08/SnapInsta.to_620781870_18426591745114263_4228430192231898754_n.webp",
  },
  {
    title: "Community Impact & Youth Leadership Feature",
    desc: "A spotlight on youth leadership and community engagement.",
    tag: "Instagram",
    date: "Recent",
    link: "https://www.instagram.com/p/Dcb0tBJGryv/?utm_source=ig_web_copy_link&igsi=NTc4MTIwNjQ2YQ==",
    color: "#E1306C",
    image: "/RishavPeaceFirstalumni.jpg",
  },
  {
    title: "Social Impact Spotlight",
    desc: "Highlights of recent community activities and grassroots impact.",
    tag: "Instagram",
    date: "Recent",
    link: "https://www.instagram.com/p/DSkFjVvE7_w/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
    color: "#E1306C",
    image: "/GlobalchangeakerscollectiveFeatured.webp",
  },
];

/* ─────────────────────────── HELPERS ─────────────────────────── */
const FadeIn = ({
  children,
  delay = 0,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

type Theme = typeof DARK;

const SectionLabel = ({ children, C }: { children: React.ReactNode; C: Theme }) => (
  <p
    style={{
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: C.accent,
      marginBottom: 20,
    }}
  >
    {children}
  </p>
);

const SectionTitle = ({
  children,
  C,
  style = {},
}: {
  children: React.ReactNode;
  C: Theme;
  style?: React.CSSProperties;
}) => (
  <h2
    style={{
      fontSize: "clamp(28px, 5vw, 44px)",
      fontWeight: 800,
      color: C.text,
      letterSpacing: "-1px",
      lineHeight: 1.1,
      ...style,
    }}
  >
    {children}
  </h2>
);

/* ─────────────────────────── CARD HOVER WRAPPER ─────────────────────────── */
function HoverCard({
  children,
  C,
  style = {},
}: {
  children: React.ReactNode;
  C: Theme;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? C.surfaceHover : C.surface,
        border: `1px solid ${hovered ? C.accentBorder : C.border}`,
        borderRadius: 12,
        overflow: "hidden",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.3)" : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════ MAIN COMPONENT ════════════════════════════ */
export default function HomeContent({
  featuredProjects,
}: {
  featuredProjects: Project[];
}) {
  const [expanded, setExpanded] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  /* Derive active theme palette */
  const C = isDark ? DARK : LIGHT;

  /* Scroll listener for nav shadow */
  if (typeof window !== "undefined") {
    window.addEventListener(
      "scroll",
      () => setNavScrolled(window.scrollY > 20),
      { passive: true }
    );
  }

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        color: C.text,
        transition: "background 0.35s ease, color 0.35s ease",
      }}
    >

      {/* ══ NAVBAR ══ */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: navScrolled
            ? isDark ? "rgba(13,13,13,0.95)" : "rgba(250,250,248,0.95)"
            : C.bg,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${navScrolled ? C.border : "transparent"}`,
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 32px",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: C.text,
              letterSpacing: "-0.5px",
            }}
          >
            Rishav Das
          </span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle light/dark mode"
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                background: "transparent",
                color: C.muted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = C.accent;
                (e.currentTarget as HTMLButtonElement).style.borderColor = C.accentBorder;
                (e.currentTarget as HTMLButtonElement).style.background = C.accentDim;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = C.muted;
                (e.currentTarget as HTMLButtonElement).style.borderColor = C.border;
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {isDark ? <IconSun /> : <IconMoon />}
            </button>
            <Link
              href="/projects"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: C.muted,
                padding: "8px 18px",
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = C.text;
                (e.currentTarget as HTMLAnchorElement).style.borderColor = C.accent;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = C.muted;
                (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border;
              }}
            >
              Projects <IconArrow />
            </Link>
            <a
              href="mailto:rishavdas58@gmail.com"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#ffffff",
                background: C.accent,
                padding: "8px 20px",
                borderRadius: 8,
                border: `1px solid ${C.accent}`,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
              }
            >
              <IconMail /> Contact
            </a>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px 100px" }}>

        {/* ══ HERO ══ */}
        <section
          style={{
            padding: "100px 0 80px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: C.accentDim,
                border: `1px solid ${C.accentBorder}`,
                borderRadius: 20,
                padding: "5px 14px",
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: C.accent,
                  display: "block",
                  boxShadow: `0 0 0 3px ${C.accentDim}`,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: C.accent,
                }}
              >
                Available for Collaboration
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: "clamp(52px, 8vw, 96px)",
                fontWeight: 800,
                color: C.text,
                letterSpacing: "-3px",
                lineHeight: 1.0,
                marginBottom: 24,
              }}
            >
              Rishav
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  color: C.accent,
                  fontWeight: 800,
                }}
              >
                Das
              </em>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 18,
                color: C.muted,
                fontWeight: 400,
                lineHeight: 1.65,
                maxWidth: 480,
                marginBottom: 20,
              }}
            >
              Project Manager & Stakeholder Engagement Specialist. Founder, Youth Activism Nepal. TEDx Speaker. Kathmandu, Nepal.
            </p>

            {/* Role tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 36,
              }}
            >
              {TAGS.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.3px",
                    color: C.muted,
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 20,
                    padding: "5px 14px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/projects"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0d0d0d",
                  background: C.accent,
                  padding: "13px 28px",
                  borderRadius: 10,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  letterSpacing: "-0.2px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
                }
              >
                View Projects <IconArrow />
              </Link>
              <a
                href="mailto:rishavdas58@gmail.com"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.text,
                  background: "transparent",
                  border: `1px solid ${C.border}`,
                  padding: "13px 28px",
                  borderRadius: 10,
                  textDecoration: "none",
                  letterSpacing: "-0.2px",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor =
                    C.accent)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor =
                    C.border)
                }
              >
                Get in Touch
              </a>
            </div>

            {/* Contact row */}
            <div
              style={{
                display: "flex",
                gap: 24,
                marginTop: 32,
                flexWrap: "wrap",
              }}
            >
              {[
                {
                  icon: <IconMail />,
                  label: "rishavdas58@gmail.com",
                  href: "mailto:rishavdas58@gmail.com",
                },
                {
                  icon: <IconPhone />,
                  label: "+977 9804767755",
                  href: "tel:+9779804767755",
                },
                {
                  icon: <IconLinkedin />,
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/rishav-das-948130179",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 13,
                    color: C.faint,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      C.muted)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      C.faint)
                  }
                >
                  {c.icon} {c.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ flexShrink: 0 }}
          >
            <div
              style={{
                width: 260,
                height: 320,
                borderRadius: 20,
                overflow: "hidden",
                border: `1px solid ${C.border}`,
                boxShadow: `0 0 0 1px ${C.border}, 0 40px 80px rgba(0,0,0,0.6)`,
                position: "relative",
              }}
            >
              <img
                src="/RishavDai_NBG.png"
                alt="Rishav Das"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
              {/* Gold overlay gradient at bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 80,
                  background:
                    "linear-gradient(to top, rgba(13,13,13,0.85) 0%, transparent 100%)",
                }}
              />
            </div>
          </motion.div>
        </section>

        {/* ══ STATS STRIP ══ */}
        <FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderTop: `1px solid ${C.border}`,
              borderBottom: `1px solid ${C.border}`,
              marginBottom: 0,
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "28px 24px",
                  borderRight:
                    i < STATS.length - 1 ? `1px solid ${C.border}` : "none",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(28px, 4vw, 40px)",
                    fontWeight: 800,
                    color: C.accent,
                    letterSpacing: "-1px",
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  {s.num}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: C.muted,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ══ ABOUT SUMMARY ══ */}
        <section
          style={{
            padding: "80px 0",
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: 48,
            alignItems: "start",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <FadeIn>
            <SectionLabel C={C}>About</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p
              style={{
                fontSize: "clamp(18px, 2.5vw, 24px)",
                color: C.text,
                fontWeight: 400,
                lineHeight: 1.65,
                letterSpacing: "-0.3px",
              }}
            >
              TEDx Speaker and biotechnologist working at the intersection of{" "}
              <span style={{ color: C.accent, fontWeight: 600 }}>
                leadership development
              </span>
              , individual rights, environmental sustainability, and community
              impact. Founded Youth Activism Nepal — a 100% youth-led
              organization — serving{" "}
              <span style={{ color: C.accent, fontWeight: 600 }}>
                10,000+ beneficiaries
              </span>{" "}
              across Nepal through programs in health, environment, and civic
              engagement.
            </p>
          </FadeIn>
        </section>

        {/* ══ FEATURED PROJECTS ══ */}
        <section style={{ padding: "80px 0", borderBottom: `1px solid ${C.border}` }}>
          <FadeIn style={{ marginBottom: 48 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <SectionLabel C={C}>Work</SectionLabel>
                <SectionTitle C={C}>Featured Projects</SectionTitle>
              </div>
              <Link
                href="/projects"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.muted,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "color 0.2s",
                  paddingBottom: 4,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = C.accent)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = C.muted)
                }
              >
                All projects <IconArrow />
              </Link>
            </div>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {featuredProjects.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.08}>
                <Link href={`/projects/${p.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <HoverCard C={C}>
                    {/* Image */}
                    <div
                      style={{
                        height: 200,
                        overflow: "hidden",
                        background: getColor(p.tags) + "22",
                        position: "relative",
                      }}
                    >
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background: `linear-gradient(135deg, ${getColor(p.tags)}33, ${getColor(p.tags)}11)`,
                          }}
                        />
                      )}
                    </div>
                    {/* Body */}
                    <div style={{ padding: "18px 20px 22px" }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          color: getColor(p.tags),
                        }}
                      >
                        {p.tags[0] || "Project"}
                      </span>
                      <h3
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          color: C.text,
                          marginTop: 8,
                          marginBottom: 8,
                          lineHeight: 1.3,
                        }}
                      >
                        {p.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 13,
                          color: C.muted,
                          lineHeight: 1.65,
                          marginBottom: 16,
                        }}
                      >
                        {p.description}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            color: C.faint,
                            fontWeight: 500,
                          }}
                        >
                          {p.date}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            color: C.accent,
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          Read more <IconArrow />
                        </span>
                      </div>
                    </div>
                  </HoverCard>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ══ FEATURED STORIES ══ */}
        <section style={{ padding: "80px 0", borderBottom: `1px solid ${C.border}` }}>
          <FadeIn style={{ marginBottom: 48 }}>
            <SectionLabel C={C}>Press & Media</SectionLabel>
            <SectionTitle C={C}>Featured Stories</SectionTitle>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {FEATURED_STORIES.map((s, i) => (
              <FadeIn key={s.link} delay={i * 0.08}>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block", height: "100%" }}
                >
                  <HoverCard C={C} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        height: 200,
                        overflow: "hidden",
                        background: s.image ? C.surface : `${s.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {s.image ? (
                        <img
                          src={s.image}
                          alt={s.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            display: "block",
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <span style={{ fontSize: 48 }}>
                          {s.tag === "Instagram" ? "📸" : "📰"}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        padding: "18px 20px 22px",
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          color: s.color,
                        }}
                      >
                        {s.tag}
                      </span>
                      <h3
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          color: C.text,
                          marginTop: 8,
                          marginBottom: 8,
                          lineHeight: 1.3,
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 13,
                          color: C.muted,
                          lineHeight: 1.65,
                          marginBottom: 16,
                          flex: 1,
                        }}
                      >
                        {s.desc}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            color: C.faint,
                            fontWeight: 500,
                          }}
                        >
                          {s.date}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            color: C.accent,
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          Read <IconExternal />
                        </span>
                      </div>
                    </div>
                  </HoverCard>
                </a>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ══ EXPERIENCE TIMELINE ══ */}
        <section style={{ padding: "80px 0", borderBottom: `1px solid ${C.border}` }}>
          <FadeIn style={{ marginBottom: 48 }}>
            <SectionLabel C={C}>Career</SectionLabel>
            <SectionTitle C={C}>Experience</SectionTitle>
          </FadeIn>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: 140,
                top: 0,
                bottom: 0,
                width: 1,
                background: C.border,
              }}
            />

            {EXPERIENCE.map((e, i) => (
              <FadeIn key={e.org} delay={i * 0.07}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr",
                    gap: 40,
                    paddingBottom: i < EXPERIENCE.length - 1 ? 36 : 0,
                    marginBottom: i < EXPERIENCE.length - 1 ? 0 : 0,
                    position: "relative",
                  }}
                >
                  <div style={{ textAlign: "right", paddingRight: 20, paddingTop: 3 }}>
                    <p
                      style={{
                        fontSize: 11,
                        color: C.faint,
                        fontWeight: 500,
                        lineHeight: 1.6,
                      }}
                    >
                      {e.period}
                    </p>
                  </div>

                  {/* Gold dot on line */}
                  <div
                    style={{
                      position: "absolute",
                      left: 134,
                      top: 6,
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      background: C.accent,
                      border: `2px solid ${C.bg}`,
                      boxShadow: `0 0 0 3px ${C.accentBorder}`,
                    }}
                  />

                  <div style={{ paddingLeft: 28 }}>
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: C.accent,
                        marginBottom: 6,
                      }}
                    >
                      {e.org}
                    </p>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: C.text,
                        marginBottom: 10,
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {e.role}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: C.muted,
                        lineHeight: 1.75,
                      }}
                    >
                      {e.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ══ FEATURED TALK / VIDEO ══ */}
        <section style={{ padding: "80px 0", borderBottom: `1px solid ${C.border}` }}>
          <FadeIn style={{ marginBottom: 40 }}>
            <SectionLabel C={C}>Speaking</SectionLabel>
            <SectionTitle C={C}>Featured Talk</SectionTitle>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/I6HgISAu0ow?si=PjEo2_4fxOoJ-wSh"
                title="YouTube video player"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </FadeIn>
        </section>

        {/* ══ COMPETENCIES ══ */}
        <section style={{ padding: "80px 0", borderBottom: `1px solid ${C.border}` }}>
          <FadeIn style={{ marginBottom: 36 }}>
            <SectionLabel C={C}>Skills</SectionLabel>
            <SectionTitle C={C}>Core Competencies</SectionTitle>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                "Project Lifecycle Management",
                "Cross-functional Team Leadership",
                "Remote Team Coordination",
                "Budget Planning & Financial Oversight",
                "Risk Assessment & Mitigation",
                "Strategic Planning",
                "Stakeholder Management",
                "Monitoring & Evaluation (M&E)",
                "KPI Tracking & Reporting",
                "Process Improvement",
                "Workshop Facilitation",
                "Vendor & Partner Management",
                "Communication Strategy",
                "Change Management",
                "Data-Driven Decision Making",
                "Biotechnology Research",
                "Policy Advocacy",
                "Public Speaking",
              ].map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: C.muted,
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    padding: "7px 16px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.color = C.accent;
                    (e.currentTarget as HTMLSpanElement).style.borderColor = C.accentBorder;
                    (e.currentTarget as HTMLSpanElement).style.background = C.accentDim;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.color = C.muted;
                    (e.currentTarget as HTMLSpanElement).style.borderColor = C.border;
                    (e.currentTarget as HTMLSpanElement).style.background = C.surface;
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ══ PUBLICATIONS ══ */}
        <section style={{ padding: "80px 0", borderBottom: `1px solid ${C.border}` }}>
          <FadeIn style={{ marginBottom: 36 }}>
            <SectionLabel C={C}>Research</SectionLabel>
            <SectionTitle C={C}>Publications</SectionTitle>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                type: "Primary Peer-Reviewed Research",
                color: "#e85d4a",
                title:
                  "A Pilot Study on the Prevalence and Characterization of Multidrug-Resistant Gram-Negative Bacteria in Chicken and Pork Meat Around Kathmandu District, Nepal",
                journal: "Wiley Online Library / Bioliberty Accelerator",
                year: "2024",
                link: "https://onlinelibrary.wiley.com",
              },
              {
                type: "Literature Review",
                color: C.accent,
                title:
                  "Moringa Oleifera: Review on Herbal Healing Properties and Nutritional Values",
                journal: "Herbal Healing Review",
                year: "2023",
                link: "#",
              },
            ].map((pub, i) => (
              <FadeIn key={pub.title} delay={i * 0.08}>
                <HoverCard C={C}>
                  <div
                    style={{
                      display: "flex",
                      gap: 0,
                      padding: "24px 28px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        minWidth: 3,
                        alignSelf: "stretch",
                        borderRadius: 4,
                        background: pub.color,
                        marginRight: 24,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          color: pub.color,
                        }}
                      >
                        {pub.type}
                      </span>
                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: C.text,
                          marginTop: 8,
                          marginBottom: 10,
                          lineHeight: 1.5,
                          letterSpacing: "-0.2px",
                        }}
                      >
                        {pub.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 16,
                        }}
                      >
                        <span style={{ fontSize: 12, color: C.faint }}>
                          {pub.journal} · {pub.year}
                        </span>
                        {pub.link !== "#" && (
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: 12,
                              color: C.accent,
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              textDecoration: "none",
                              flexShrink: 0,
                            }}
                          >
                            View <IconExternal />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ══ HONORS ══ */}
        <section style={{ padding: "80px 0", borderBottom: `1px solid ${C.border}` }}>
          <FadeIn style={{ marginBottom: 36 }}>
            <SectionLabel C={C}>Recognition</SectionLabel>
            <SectionTitle C={C}>Honors & Awards</SectionTitle>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            {HONORS.map((h, i) => (
              <FadeIn key={h.name} delay={i * 0.06}>
                <HoverCard C={C} style={{ padding: "20px 22px" }}>
                  <div style={{ marginBottom: 10 }}>
                    <IconStar color={C.accent} />
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: C.text,
                      marginBottom: 6,
                      lineHeight: 1.3,
                    }}
                  >
                    {h.name}
                  </p>
                  <p style={{ fontSize: 12, color: C.faint, lineHeight: 1.5 }}>
                    {h.where}
                  </p>
                </HoverCard>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ══ EDUCATION & CERTIFICATIONS ══ */}
        <section
          style={{
            padding: "80px 0",
            borderBottom: `1px solid ${C.border}`,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
          }}
        >
          {/* Education */}
          <FadeIn>
            <div>
              <SectionLabel C={C}>Academic</SectionLabel>
              <SectionTitle C={C} style={{ fontSize: "clamp(22px, 3vw, 30px)", marginBottom: 32 }}>
                Education
              </SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  {
                    degree: "B.Tech — Biotechnology",
                    school: "Himalayan WhiteHouse International College",
                    year: "2018 – 2023",
                  },
                  {
                    degree: "AS — Biology / Science",
                    school: "Capital College and Research Center",
                    year: "Class of 2016",
                  },
                ].map((ed, i, arr) => (
                  <div
                    key={ed.degree}
                    style={{
                      padding: "20px 0",
                      borderBottom:
                        i < arr.length - 1 ? `1px solid ${C.borderLight}` : "none",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: C.text,
                        marginBottom: 5,
                      }}
                    >
                      {ed.degree}
                    </p>
                    <p style={{ fontSize: 13, color: C.muted }}>{ed.school}</p>
                    <p
                      style={{
                        fontSize: 11,
                        color: C.faint,
                        marginTop: 4,
                        fontWeight: 500,
                      }}
                    >
                      {ed.year}
                    </p>
                  </div>
                ))}
                <div style={{ paddingTop: 24 }}>
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: C.faint,
                      marginBottom: 12,
                    }}
                  >
                    Languages
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {[
                      "English (Professional)",
                      "Nepali (Native)",
                      "Hindi (Native)",
                      "Maithili (Native)",
                    ].map((l) => (
                      <span
                        key={l}
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: C.muted,
                          background: C.surface,
                          border: `1px solid ${C.border}`,
                          borderRadius: 20,
                          padding: "4px 12px",
                        }}
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Certifications */}
          <FadeIn delay={0.1}>
            <div>
              <SectionLabel C={C}>Credentials</SectionLabel>
              <SectionTitle C={C} style={{ fontSize: "clamp(22px, 3vw, 30px)", marginBottom: 32 }}>
                Certifications
              </SectionTitle>
              <p
                style={{
                  fontSize: 12,
                  color: C.faint,
                  marginBottom: 20,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}
              >
                Google / Coursera
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {CERTIFICATIONS.map((c, i) => (
                  <div
                    key={c.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom:
                        i < CERTIFICATIONS.length - 1
                          ? `1px solid ${C.borderLight}`
                          : "none",
                      gap: 12,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        color: C.text,
                        fontWeight: 500,
                        lineHeight: 1.4,
                        flex: 1,
                      }}
                    >
                      {c.name}
                    </p>
                    <span
                      style={{
                        fontSize: 11,
                        color: C.faint,
                        whiteSpace: "nowrap",
                        fontWeight: 500,
                      }}
                    >
                      {c.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ══ VOLUNTEER ROLES ══ */}
        <section style={{ padding: "80px 0" }}>
          <FadeIn>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 48,
              }}
            >
              <div>
                <SectionLabel C={C}>Service</SectionLabel>
                <SectionTitle C={C}>Additional Roles & Voluntarism</SectionTitle>
              </div>
              <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.muted,
                  background: "none",
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  padding: "8px 18px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = C.accent;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = C.accentBorder;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = C.muted;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = C.border;
                }}
              >
                {expanded ? "Show less ↑" : "Show all ↓"}
              </button>
            </div>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 12,
            }}
          >
            {[
              { role: "Central Secretariat", org: "International Youth Development MUN", dur: "Aug 2020 – Nov 2023" },
              { role: "County Ambassador", org: "Peace First", dur: "Jan 2022 – Nov 2023" },
              { role: "Member", org: "'We' For Change", dur: "Dec 2017 – Nov 2023" },
              { role: "Global Changemakers Fellowship", org: "Connecting Dreams Foundation", dur: "May 2022 – Mar 2023" },
              { role: "Youth Ambassador", org: "International Youth Society", dur: "Oct 2020 – Mar 2022" },
              { role: "Outreach Volunteer", org: "Global Changemakers", dur: "Aug 2020 – Mar 2022" },
              ...(expanded
                ? [
                    { role: "Council Member", org: "U.S. Embassy Youth Council Nepal", dur: "Oct 2019 – Dec 2021" },
                    { role: "Volunteer", org: "Me For Myself (M4M)", dur: "May 2021 – Aug 2021" },
                    { role: "Country Ambassador", org: "World Youth MUN", dur: "Aug 2020 – May 2021" },
                    { role: "V4Action", org: "United Nations Volunteers", dur: "Aug 2020 – Mar 2021" },
                    { role: "Directorate", org: "World Peace International MUN", dur: "Aug 2020 – Mar 2021" },
                    { role: "Enumerator", org: "UN75 Surveys", dur: "Sep 2020 – Nov 2020" },
                    { role: "Ambassador", org: "Global Goodwill Ambassadors (GGA)", dur: "Oct 2020 – Jan 2021" },
                    { role: "Vice President", org: "World Youth International MUN", dur: "Aug 2020 – Jan 2021" },
                    { role: "Project Lead", org: "US Embassy Youth Council", dur: "2019 – 2021" },
                    { role: "MUN Trainer", org: "Youth Thinkers' Society", dur: "2019 – 2026" },
                    { role: "Secretary General", org: "Young World Leaders For Humanity", dur: "Jul 2020 – Dec 2020" },
                    { role: "Deputy Campus Director", org: "Hult Prize Purbanchal University", dur: "Jul 2020 – Dec 2020" },
                    { role: "Deputy Program Coordinator", org: "LeoMun 2020", dur: "Jun 2020 – Aug 2020" },
                    { role: "Event Coordinator", org: "Hult Prize Purbanchal University", dur: "Oct 2019 – Dec 2019" },
                    { role: "Volunteer", org: "AIDS Healthcare Foundation Nepal", dur: "Jul 2018 – Aug 2018" },
                    { role: "Volunteer", org: "Shikshya Nepal", dur: "Feb 2016 – Mar 2018" },
                  ]
                : []),
            ].map((v, i) => (
              <FadeIn key={v.org + v.role} delay={i * 0.03}>
                <HoverCard C={C} style={{ padding: "16px 18px" }}>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: C.accent,
                      marginBottom: 6,
                    }}
                  >
                    {v.org}
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: C.text,
                      marginBottom: 4,
                    }}
                  >
                    {v.role}
                  </p>
                  <p style={{ fontSize: 11, color: C.faint }}>{v.dur}</p>
                </HoverCard>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>

      {/* ══ FOOTER ══ */}
      <footer
        style={{
          borderTop: `1px solid ${C.border}`,
          background: C.surface,
          padding: "40px 32px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: C.text,
                marginBottom: 4,
                letterSpacing: "-0.5px",
              }}
            >
              Rishav Das
            </p>
            <p style={{ fontSize: 12, color: C.faint }}>
              © 2026             </p>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: "Email", href: "mailto:rishavdas58@gmail.com" },
              { label: "LinkedIn", href: "https://linkedin.com/in/rishav-das-948130179" },
              { label: "Projects", href: "/projects", internal: true },
            ].map((l) =>
              l.internal ? (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{
                    fontSize: 13,
                    color: C.muted,
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = C.accent)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = C.muted)
                  }
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 13,
                    color: C.muted,
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = C.accent)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = C.muted)
                  }
                >
                  {l.label}
                </a>
              )
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
