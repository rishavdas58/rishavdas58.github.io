"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

/* ─── tiny inline SVG icons ─── */
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 11.7 19.79 19.79 0 0 1 1.06 3.1 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);
const IconExternal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

/* ─── data ─── */
const TAGS = [
  { label: "Founder · Youth Activism Nepal", color: "#1a73e8" },
  { label: "TEDx Speaker", color: "#ea4335" },
  { label: "Biotechnologist", color: "#34a853" },
  { label: "Certified Mentor", color: "#fbbc04" },
  { label: "Policy & Social Impact", color: "#9c27b0" },
];

const EXPERIENCE = [
  {
    role: "Founder & President",
    org: "Youth Activism Nepal (YAN)",
    period: "Feb 2023 – Present",
    desc: "Founded and scaled a 100% youth-led nonprofit to 10,000+ beneficiaries across 15 districts, running flagship programs in environment, health, and civic engagement.",
  },
  {
    role: "Regional Coordinator",
    org: "Students For Liberty — South Asia",
    period: "Jun 2020 – May 2026",
    desc: "Led leadership development, Top Leaders Retreats, and cross-border policy advocacy programs across South Asia.",
  },
  {
    role: "Project Lead",
    org: "Bioliberty Global Accelerator",
    period: "2025 – 2026",
    desc: "Managed an international team to deliver an AMR behavior-change program reaching 600+ students. Published peer-reviewed research in Wiley (2024).",
  },
  {
    role: "Program Coordinator",
    org: "The Atlas Society — John Galt School Nepal",
    period: "2024 – 2025",
    desc: "Coordinated and moderated a cohort of 46 students with a 100% completion rate; lectured on leadership, philosophy, and civic responsibility.",
  },
  {
    role: "Project Lead",
    org: "US Embassy Youth Council Nepal",
    period: "2019 – 2021",
    desc: "Led Project Swasti — women's empowerment and Mithila cultural heritage initiative reaching 500+ community members, in partnership with U.S. Embassy program officers.",
  },
];

const PROJECTS = [
  {
    slug: "project-repurpose",
    category: "Environment",
    categoryColor: "#34a853",
    title: "Project Repurpose",
    summary: "Circular economy & waste management campaign scaled across 15 districts of Nepal.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80",
    date: "2024",
  },
  {
    slug: "project-smile",
    category: "Public Health",
    categoryColor: "#1a73e8",
    title: "Project Smile",
    summary: "Oral hygiene campaign running since 2017 — 1,500+ beneficiaries and counting.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
    date: "2017 – ongoing",
  },
  {
    slug: "project-swasti",
    category: "Women's Empowerment",
    categoryColor: "#9c27b0",
    title: "Project Swasti",
    summary: "Mithila cultural heritage preservation and women's empowerment with the U.S. Embassy Youth Council.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80",
    date: "2020",
  },
  {
    slug: "amr-awareness",
    category: "Research",
    categoryColor: "#ea4335",
    title: "AMR Awareness Initiative",
    summary: "Global behavior-change program on Antimicrobial Resistance — 600+ students, Wiley publication (2024).",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
    date: "2025",
  },
];

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

/* ─── fade-in helper ─── */
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── divider ─── */
const Divider = () => <hr style={{ borderColor: "#e8eaed", borderTopWidth: 1, margin: "0" }} />;

/* ─── section heading ─── */
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 13, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#5f6368" }} className="mb-6">
    {children}
  </h2>
);

/* ═══════════════════════════════════════════ */
export default function Home() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: "#202124" }}>

      {/* ── NAV BAR ── */}
      <nav style={{ borderBottom: "1px solid #e8eaed", background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#202124", letterSpacing: "-0.3px" }}>Rishav Das</span>
          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/projects" style={{ fontSize: 13, fontWeight: 500, color: "#1a73e8", padding: "8px 16px", borderRadius: 20, border: "1px solid #dadce0", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              Projects <IconArrow />
            </Link>
            <a href="mailto:rishavdas58@gmail.com" style={{ fontSize: 13, fontWeight: 500, color: "#5f6368", padding: "8px 16px", borderRadius: 20, border: "1px solid #dadce0", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              <IconMail /> Contact
            </a>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* ── HERO ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ padding: "64px 0 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 20 }}
        >
          {/* Avatar — real headshot */}
          <div style={{
            width: 108, height: 108, borderRadius: "50%",
            padding: 3,
            background: "linear-gradient(135deg, #1a73e8 0%, #34a853 50%, #fbbc04 100%)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            flexShrink: 0,
          }}>
            <img
              src="/headshot.jpg"
              alt="Rishav Das"
              style={{
                width: "100%", height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center top",
                border: "3px solid #ffffff",
                display: "block",
              }}
            />
          </div>

          {/* Name */}
          <div>
            <h1 style={{ fontSize: "clamp(40px, 7vw, 68px)", fontWeight: 800, color: "#202124", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 12 }}>
              Rishav Das
            </h1>
            <p style={{ fontSize: 16, color: "#5f6368", fontWeight: 400, lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}>
              Project Manager & Stakeholder Engagement Specialist · Founder, Youth Activism Nepal · Kathmandu, Nepal
            </p>
          </div>

          {/* Colored role tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 4 }}>
            {TAGS.map((t) => (
              <span key={t.label} style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.5px",
                color: t.color, background: t.color + "12",
                border: `1px solid ${t.color}30`,
                borderRadius: 20, padding: "4px 12px",
              }}>
                {t.label}
              </span>
            ))}
          </div>

          {/* Contact links */}
          <div style={{ display: "flex", gap: 16, marginTop: 4, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { icon: <IconMail />, label: "rishavdas58@gmail.com", href: "mailto:rishavdas58@gmail.com" },
              { icon: <IconPhone />, label: "+977 9804767755", href: "tel:+9779804767755" },
              { icon: <IconLinkedin />, label: "LinkedIn", href: "https://linkedin.com/in/rishav-das-948130179" },
            ].map((c) => (
              <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{ fontSize: 13, color: "#5f6368", textDecoration: "none", display: "flex", alignItems: "center", gap: 5, fontWeight: 500 }}>
                <span style={{ color: "#9aa0a6" }}>{c.icon}</span>
                {c.label}
              </a>
            ))}
          </div>

          {/* Summary */}
          <div style={{ maxWidth: 620, marginTop: 8, padding: "20px 24px", background: "#f8f9fa", borderRadius: 12, textAlign: "left" }}>
            <p style={{ fontSize: 15, color: "#3c4043", lineHeight: 1.75, fontWeight: 400 }}>
              TEDx Speaker and biotechnologist working at the intersection of leadership development, individual rights, environmental sustainability, and community impact. Founded Youth Activism Nepal — a 100% youth-led organization — serving 10,000+ beneficiaries across Nepal through programs in health, environment, and civic engagement.
            </p>
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            <Link href="/projects" style={{ fontSize: 14, fontWeight: 600, color: "#ffffff", background: "#1a73e8", padding: "10px 24px", borderRadius: 24, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              View Projects <IconArrow />
            </Link>
            <a href="mailto:rishavdas58@gmail.com" style={{ fontSize: 14, fontWeight: 600, color: "#1a73e8", background: "#ffffff", border: "1px solid #dadce0", padding: "10px 24px", borderRadius: 24, textDecoration: "none" }}>
              Get in Touch
            </a>
          </div>
        </motion.section>

        <Divider />

        {/* ── FEATURED PROJECTS (Google-style article cards) ── */}
        <section style={{ padding: "48px 0" }}>
          <FadeIn>
            <SectionHeading>Featured Projects</SectionHeading>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.08}>
                <Link href="/projects" style={{ textDecoration: "none", display: "block" }}>
                  <div style={{
                    border: "1px solid #e8eaed", borderRadius: 12, overflow: "hidden",
                    background: "#ffffff", cursor: "pointer",
                    transition: "box-shadow 0.2s, transform 0.2s",
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    }}
                  >
                    {/* Card image */}
                    <div style={{ height: 180, overflow: "hidden", background: "#f8f9fa" }}>
                      <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                    </div>
                    {/* Card body */}
                    <div style={{ padding: "16px 20px 20px" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: p.categoryColor }}>
                        {p.category}
                      </span>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: "#202124", marginTop: 6, marginBottom: 8, lineHeight: 1.3 }}>
                        {p.title}
                      </h3>
                      <p style={{ fontSize: 13, color: "#5f6368", lineHeight: 1.65, marginBottom: 14 }}>
                        {p.summary}
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: "#9aa0a6", fontWeight: 500 }}>{p.date}</span>
                        <span style={{ fontSize: 12, color: "#1a73e8", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                          Read more <IconArrow />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── EXPERIENCE TIMELINE ── */}
        <section style={{ padding: "48px 0" }}>
          <FadeIn>
            <SectionHeading>Experience</SectionHeading>
          </FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {EXPERIENCE.map((e, i) => (
              <FadeIn key={e.org} delay={i * 0.07}>
                <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 24, padding: "24px 0", borderBottom: i < EXPERIENCE.length - 1 ? "1px solid #f1f3f4" : "none" }}>
                  <div>
                    <p style={{ fontSize: 11, color: "#9aa0a6", fontWeight: 500, lineHeight: 1.5 }}>{e.period}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: "#1a73e8", marginBottom: 4 }}>
                      {e.org}
                    </p>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#202124", marginBottom: 8 }}>{e.role}</h3>
                    <p style={{ fontSize: 14, color: "#5f6368", lineHeight: 1.7 }}>{e.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── COMPETENCIES (2-col pill grid) ── */}
        <section style={{ padding: "48px 0" }}>
          <FadeIn>
            <SectionHeading>Core Competencies</SectionHeading>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                "Project Lifecycle Management", "Cross-functional Team Leadership",
                "Remote Team Coordination", "Budget Planning & Financial Oversight",
                "Risk Assessment & Mitigation", "Strategic Planning",
                "Stakeholder Management", "Monitoring & Evaluation (M&E)",
                "KPI Tracking & Reporting", "Process Improvement",
                "Workshop Facilitation", "Vendor & Partner Management",
                "Communication Strategy", "Change Management", "Data-Driven Decision Making",
                "Biotechnology Research", "Policy Advocacy", "Public Speaking",
              ].map((s) => (
                <span key={s} style={{ fontSize: 12, fontWeight: 500, color: "#3c4043", background: "#f1f3f4", border: "1px solid #e8eaed", borderRadius: 20, padding: "5px 14px" }}>
                  {s}
                </span>
              ))}
            </div>
          </FadeIn>
        </section>

        <Divider />

        {/* ── PUBLICATIONS ── */}
        <section style={{ padding: "48px 0" }}>
          <FadeIn>
            <SectionHeading>Publications & Research</SectionHeading>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              {
                type: "Primary Peer-Reviewed Research",
                color: "#ea4335",
                title: "A Pilot Study on the Prevalence and Characterization of Multidrug-Resistant Gram-Negative Bacteria in Chicken and Pork Meat Around Kathmandu District, Nepal",
                journal: "Wiley Online Library / Bioliberty Accelerator",
                year: "2024",
                link: "https://onlinelibrary.wiley.com",
              },
              {
                type: "Literature Review",
                color: "#1a73e8",
                title: "Moringa Oleifera: Review on Herbal Healing Properties and Nutritional Values",
                journal: "Herbal Healing Review",
                year: "2023",
                link: "#",
              },
            ].map((pub, i) => (
              <FadeIn key={pub.title} delay={i * 0.08}>
                <div style={{ display: "flex", gap: 20, padding: "20px", border: "1px solid #e8eaed", borderRadius: 12, background: "#ffffff", alignItems: "flex-start" }}>
                  <div style={{ minWidth: 4, alignSelf: "stretch", borderRadius: 4, background: pub.color }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: pub.color }}>
                      {pub.type}
                    </span>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#202124", marginTop: 6, marginBottom: 6, lineHeight: 1.4 }}>
                      {pub.title}
                    </h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#5f6368" }}>{pub.journal} · {pub.year}</span>
                      {pub.link !== "#" && (
                        <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#1a73e8", fontWeight: 600, display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
                          View <IconExternal />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── HONORS ── */}
        <section style={{ padding: "48px 0" }}>
          <FadeIn>
            <SectionHeading>Honors & Awards</SectionHeading>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {HONORS.map((h, i) => (
              <FadeIn key={h.name} delay={i * 0.06}>
                <div style={{ padding: "16px 18px", border: "1px solid #e8eaed", borderRadius: 12, background: "#ffffff" }}>
                  <span style={{ fontSize: 18, display: "block", marginBottom: 6 }}>★</span>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#202124", marginBottom: 4 }}>{h.name}</p>
                  <p style={{ fontSize: 12, color: "#9aa0a6", lineHeight: 1.5 }}>{h.where}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── EDUCATION & CERTS ── */}
        <section style={{ padding: "48px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {/* Education */}
          <FadeIn>
            <div>
              <SectionHeading>Education</SectionHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { degree: "B.Tech — Biotechnology", school: "Himalayan WhiteHouse International College", year: "2018 – 2023" },
                  { degree: "AS — Biology / Science", school: "Capital College and Research Center", year: "Class of 2016" },
                ].map((ed) => (
                  <div key={ed.degree} style={{ paddingBottom: 20, borderBottom: "1px solid #f1f3f4" }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#202124", marginBottom: 4 }}>{ed.degree}</p>
                    <p style={{ fontSize: 13, color: "#5f6368" }}>{ed.school}</p>
                    <p style={{ fontSize: 11, color: "#9aa0a6", marginTop: 2 }}>{ed.year}</p>
                  </div>
                ))}
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#5f6368", marginBottom: 8 }}>Languages</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["English (Professional)", "Nepali (Native)", "Hindi (Native)", "Maithili (Native)"].map((l) => (
                      <span key={l} style={{ fontSize: 11, fontWeight: 500, color: "#5f6368", background: "#f1f3f4", borderRadius: 20, padding: "3px 10px" }}>{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Certifications */}
          <FadeIn delay={0.1}>
            <div>
              <SectionHeading>Certifications · Google / Coursera</SectionHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {CERTIFICATIONS.map((c, i) => (
                  <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < CERTIFICATIONS.length - 1 ? "1px solid #f1f3f4" : "none", gap: 8 }}>
                    <p style={{ fontSize: 13, color: "#202124", fontWeight: 500, lineHeight: 1.4, flex: 1 }}>{c.name}</p>
                    <span style={{ fontSize: 11, color: "#9aa0a6", whiteSpace: "nowrap" }}>{c.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        <Divider />

        {/* ── VOLUNTEER ROLES (expandable) ── */}
        <section style={{ padding: "48px 0" }}>
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <SectionHeading>Additional Roles & Voluntarism</SectionHeading>
              <button
                onClick={() => setExpanded(!expanded)}
                style={{ fontSize: 12, fontWeight: 600, color: "#1a73e8", background: "none", border: "1px solid #dadce0", borderRadius: 20, padding: "6px 16px", cursor: "pointer" }}
              >
                {expanded ? "Show less ↑" : "Show all ↓"}
              </button>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {[
              { role: "Mentor", org: "Global Mentorship Initiative", dur: "Mar 2026 – Present" },
              { role: "Election Observer", org: "ANFREL", dur: "Feb – Mar 2026" },
              { role: "Selected Global Leader", org: "Global Accelerator Program", dur: "Jul – Dec 2025" },
              { role: "Student Fellow", org: "Prometheus Fellowship", dur: "2022 – 2024" },
              ...(expanded ? [
                { role: "County Ambassador", org: "Peace First", dur: "Jan 2022 – Nov 2023" },
                { role: "MUN Trainer", org: "Youth Thinkers' Society", dur: "2019 – 2026" },
                { role: "Volunteer", org: "UN Volunteers (V4Action)", dur: "Aug 2020 – Mar 2021" },
                { role: "Volunteer", org: "AIDS Healthcare Foundation Nepal", dur: "Jul – Aug 2018" },
              ] : []),
            ].map((v, i) => (
              <FadeIn key={v.org + v.role} delay={i * 0.04}>
                <div style={{ padding: "14px 16px", border: "1px solid #e8eaed", borderRadius: 10, background: "#ffffff" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", color: "#1a73e8", marginBottom: 4 }}>{v.org}</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#202124", marginBottom: 2 }}>{v.role}</p>
                  <p style={{ fontSize: 11, color: "#9aa0a6" }}>{v.dur}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #e8eaed", background: "#f8f9fa", padding: "24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "#9aa0a6" }}>© 2026 Rishav Das · Built with Next.js</p>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="mailto:rishavdas58@gmail.com" style={{ fontSize: 13, color: "#5f6368", textDecoration: "none" }}>Email</a>
            <a href="https://linkedin.com/in/rishav-das-948130179" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#5f6368", textDecoration: "none" }}>LinkedIn</a>
            <Link href="/projects" style={{ fontSize: 13, color: "#5f6368", textDecoration: "none" }}>Projects</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
