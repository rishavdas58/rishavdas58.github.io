"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// SVGs for Icons to prevent Turbopack build import issues
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-zinc-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-zinc-500"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-zinc-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-zinc-500"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-violet-500"><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/></svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-fuchsia-500"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
);

const GradIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-500"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 18.8V15.2l6 2.7 6-2.7v3.6"/></svg>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sky-500"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-rose-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);

export default function Home() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Resume details from expanded 7-page PDF
  const profile = {
    name: "Rishav Das",
    titles: ["Founder & President, Youth Activism Nepal", "Biotechnologist", "Certified Mentor", "TEDx Speaker", "Policy & Social Impact Leader"],
    location: "Kathmandu, Nepal (Open to Remote)",
    email: "rishavdas58@gmail.com",
    phone: "+977 9804767755",
    linkedin: "linkedin.com/in/rishav-das-948130179",
    linkedinUrl: "https://linkedin.com/in/rishav-das-948130179",
    summary:
      "TEDx Speaker, youth leader, and biotechnologist working at the intersection of leadership development, individual rights, environmental sustainability, and community impact. Founded Youth Activism Nepal (YAN), a 100% youth-led organization with strong women representation, leading initiatives focused on civic engagement, environmental action, and youth empowerment. Leadership journey began in 2017 with Project Smile and expanded through global networks including Students For Liberty, Atlas Network programs, Global Changemakers, and the US Embassy Youth Council Nepal."
  };

  const competencies = [
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
    "Data-Driven Decision Making"
  ];

  const techSkills = [
    "Biotechnology Research",
    "Molecular Biology Protocols",
    "Coaching & Mentoring",
    "Computer Network Operations",
    "Network Security",
    "Policy Advocacy",
    "Public Speaking & Moderating"
  ];

  const publications = [
    {
      title: "A Pilot Study on the Prevalence and Characterization of Multidrug-Resistant Gram-Negative Bacteria in Chicken and Pork Meat Around Kathmandu District, Nepal",
      journal: "Wiley Online Library / Bioliberty Accelerator Project",
      year: "2024",
      type: "Primary Peer-Reviewed Research",
      link: "https://onlinelibrary.wiley.com"
    },
    {
      title: "MORINGA OLEIFERA: REVIEW ON HERBAL HEALING PROPERTIES AND NUTRITIONAL VALUES",
      journal: "Herbal Healing Review",
      year: "2023",
      type: "Biomedical Literature Review",
      link: "#"
    }
  ];

  const honors = [
    { name: "Best Strategy Award", context: "Everest International Model United Nations" },
    { name: "Global Changemakers Grantee", context: "Connecting Dreams Foundation" },
    { name: "Climate Smart Entrepreneurship", context: "Youth-led Climate action programs" },
    { name: "Darnel Award 2018", context: "Volunteer work with marginalized/Dalit communities" }
  ];

  const mainExperiences = [
    {
      role: "Founder & President",
      company: "Youth Activism Nepal (YAN)",
      period: "Feb 2023 – Present (3 years 6 months)",
      bullets: [
        "YAN is a collective of Nepal's young leaders and change-makers mobilizing community-based projects in Nepal.",
        "Thematic Areas: Children, women and elderly welfare; Quality education; Good health & Wellbeing; SDG and environmental sustainability; Civic engagement; Disaster Management and Risk Control.",
        "Managed full project lifecycle for concurrent flagship programs including scope definition, budget management, and partner relations."
      ]
    },
    {
      role: "Senior Local Coordinator / Regional Coordinator",
      company: "Students For Liberty",
      period: "June 2020 – May 2026 (6 years)",
      bullets: [
        "Responsible for South Asia Students For Liberty leadership development, hosting Top Leaders Retreats, and coordinating cross-border policy campaigns.",
        "Coordinated cohort opportunities, training sessions, and mentorship for young policy leaders across South Asia."
      ]
    },
    {
      role: "Program Coordinator",
      company: "The Atlas Society International - John Galt School",
      period: "2024 – 2025 (1 year)",
      bullets: [
        "Moderated and organized the John Galt School in Nepal, teaching Objectivism philosophy, classical liberalism, individual rights, and leadership."
      ]
    },
    {
      role: "Project Lead",
      company: "US Embassy Youth Council Nepal",
      period: "2019 – 2021 (2 years)",
      bullets: [
        "Led Project Swasti, coordinating women's empowerment, gender equity, and Mithila cultural heritage preservation programs.",
        "Collaborated with U.S. Embassy program officers and community organizers to host public exhibitions and mural campaigns."
      ]
    }
  ];

  const volunteerRoles = [
    { role: "Mentor", org: "Global Mentorship Initiative", duration: "Mar 2026 - Present", desc: "Mentoring university graduates on SMART goals, LinkedIn optimization, interview skills, SWOT analysis, and career search." },
    { role: "Election Observer", org: "Asian Network for Free Elections (Anfrel)", duration: "Feb 2026 - Mar 2026", desc: "Observed election campaigns, CDO, and candidate interviews across Dhanusha, Siraha, and Saptari districts." },
    { role: "Selected Global Leader", org: "Global Accelerator Program (GAP)", duration: "July 2025 - Dec 2025", desc: "Selected as one of the top 50 global leaders for project management, fundraising, and communication strategy mentorship." },
    { role: "Student Fellow", org: "Prometheus Fellowship", duration: "May 2022 - Dec 2024", desc: "Participated in an intensive leadership fellowship studying philosophy (Objectivism) and personal development." },
    { role: "County Ambassador", org: "Peace First", duration: "Jan 2022 - Nov 2023", desc: "Supported young change-makers designing peace and social justice campaigns." },
    { role: "MUN Trainer", org: "Youth Thinkers' Society", duration: "June 2019 - 2026", desc: "Trained high school and university students on international relations and debate protocols." },
    { role: "Volunteer", org: "United Nations Volunteers (V4Action)", duration: "Aug 2020 - Mar 2021", desc: "Conducted UN75 community surveys and enumerator duties in Nepal." },
    { role: "Volunteer", org: "AIDS Healthcare Foundation Nepal", duration: "July 2018 - Aug 2018", desc: "Supported free HIV testing and advocacy campaigns in Bardiya, Kanchanpur, and Surkhet." }
  ];

  const certifications = [
    { name: "Agile Project Management", provider: "Google / Coursera", date: "Mar 2026", id: "YZMAAQTYNXOH" },
    { name: "Foundations of Project Management", provider: "Google / Coursera", date: "Feb 2026", id: "S6RJCB6M737Q" },
    { name: "Leadership and Influencing Skills", provider: "Google / Coursera", date: "Mar 2026", id: "JP6D3UNBSGRX" },
    { name: "Support Individual Growth and Development", provider: "Google / Coursera", date: "Mar 2026", id: "SG95H4117637" },
    { name: "Create a High-Performing Team", provider: "Google / Coursera", date: "Feb 2026", id: "O5R31LLLFWOW" },
    { name: "Grow as a Manager", provider: "Google / Coursera", date: "Feb 2026", id: "HYAEMC2DRO8D" },
    { name: "Always Remember the Stakeholder", provider: "Google / Coursera", date: "Feb 2026", id: "8ZSL29WVE3CO" }
  ];

  return (
    <main className="relative min-h-screen w-full text-zinc-800 overflow-hidden py-24 px-6 md:px-12 lg:px-16">
      {/* Aceternity UI Dot Background Pattern */}
      <div className="absolute inset-0 w-full h-full bg-dot-pattern bg-mask-radial opacity-45 pointer-events-none z-0" />

      {/* Light background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-slow" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-36">
        
        {/* HERO SECTION */}
        <section className="flex flex-col space-y-10 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold bg-white border border-zinc-200/80 text-zinc-600 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-slow" />
              TEDx Speaker & Biotechnologist
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 leading-none">
              {profile.name}
            </h1>
            
            <div className="flex flex-wrap gap-x-2 gap-y-1.5 text-xs md:text-sm text-zinc-500 font-semibold leading-relaxed">
              {profile.titles.map((title, i) => (
                <span key={title} className="flex items-center">
                  {title}
                  {i < profile.titles.length - 1 && <span className="ml-2 text-zinc-300">•</span>}
                </span>
              ))}
            </div>

            {/* Contact Badges Grid with increased gaps */}
            <div className="flex flex-wrap gap-3 pt-2 text-xs">
              <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/70 border border-zinc-200/80 text-zinc-700 shadow-sm">
                <MapPinIcon />
                {profile.location}
              </span>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/70 border border-zinc-200/80 text-zinc-700 hover:border-zinc-300 hover:text-zinc-950 shadow-sm transition-colors">
                <MailIcon />
                {profile.email}
              </a>
              <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/70 border border-zinc-200/80 text-zinc-700 shadow-sm">
                <PhoneIcon />
                {profile.phone}
              </span>
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/70 border border-zinc-200/80 text-zinc-700 hover:border-zinc-300 hover:text-zinc-950 shadow-sm transition-colors">
                <LinkedinIcon />
                {profile.linkedin}
              </a>
            </div>
          </motion.div>

          {/* De-congested Professional Summary Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-panel p-8 md:p-10 rounded-2xl"
          >
            <h2 className="text-xl font-bold text-zinc-800 mb-4">Professional Summary</h2>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-normal">
              {profile.summary}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-sm font-bold text-white shadow-md shadow-violet-500/10 hover:shadow-violet-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              Explore Key Projects
              <ArrowRightIcon />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-zinc-200 text-sm font-bold text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-950 shadow-sm transition-all"
            >
              Get in Touch
            </a>
          </motion.div>
        </section>

        {/* PUBLICATIONS & RESEARCH SECTION */}
        <section className="space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-zinc-900 flex items-center gap-2">
              <BookOpenIcon />
              Publications & Research
            </h2>
            <p className="text-sm text-zinc-500">Academic papers co-authored in biotechnology and biosciences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publications.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/75 border border-zinc-200/60 hover:border-zinc-300/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-violet-600 bg-violet-50 px-2.5 py-1 rounded border border-violet-100 w-fit block">
                    {pub.type}
                  </span>
                  <h3 className="text-sm md:text-base font-extrabold text-zinc-900 leading-snug">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-zinc-500 font-normal">
                    {pub.journal}
                  </p>
                </div>
                <div className="flex justify-between items-center text-[11px] text-zinc-400 pt-4 border-t border-zinc-100 mt-6">
                  <span>Year: {pub.year}</span>
                  {pub.link !== "#" && (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-500 font-semibold flex items-center gap-1 transition-colors">
                      View Publication
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CORE COMPETENCIES & TECHNICAL SKILLS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Competencies */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-zinc-900">Management Competencies</h2>
              <p className="text-xs text-zinc-500">Frameworks and operations paradigms I direct</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {competencies.map((skill, index) => (
                <div
                  key={skill}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="relative p-3.5 rounded-xl bg-white/75 border border-zinc-200/60 shadow-sm hover:border-zinc-300 hover:shadow-md transition-all duration-300"
                >
                  {hoveredSkill === index && (
                    <motion.div
                      layoutId="skillGlow"
                      className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 rounded-xl pointer-events-none"
                    />
                  )}
                  <span className="relative z-10 text-xs text-zinc-700 font-semibold">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-zinc-900">Specialized Skills</h2>
              <p className="text-xs text-zinc-500">Scientific and operational parameters</p>
            </div>
            <div className="flex flex-col gap-3">
              {techSkills.map((skill) => (
                <div key={skill} className="p-3.5 rounded-xl bg-white/50 border border-zinc-200/80 shadow-sm flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                  <span className="text-xs text-zinc-700 font-semibold">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAIN EXPERIENCES TIMELINE */}
        <section className="space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-zinc-900 flex items-center gap-2">
              <BriefcaseIcon />
              Key Leadership Positions
            </h2>
            <p className="text-sm text-zinc-500">Major executive and management tracks</p>
          </div>

          <div className="relative border-l-2 border-zinc-200/80 pl-8 ml-3 space-y-16">
            {mainExperiences.map((exp, index) => (
              <motion.div
                key={exp.company + exp.role}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative space-y-3"
              >
                {/* Timeline circle node */}
                <div className="absolute -left-[40px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-violet-500 z-20 shadow-sm" />

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    <h3 className="text-base md:text-lg font-extrabold text-zinc-900">{exp.role}</h3>
                    <div className="text-xs md:text-sm text-violet-600 font-bold">{exp.company}</div>
                  </div>
                  <span className="text-xs text-zinc-500 font-bold whitespace-nowrap bg-zinc-100 border border-zinc-200 px-2 py-1 rounded">
                    {exp.period}
                  </span>
                </div>

                <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-zinc-600 leading-relaxed font-normal pl-1">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="marker:text-zinc-300">
                      <span className="pl-1.5">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EXPANDABLE VOLUNTEER ACCORDION */}
        <section className="space-y-6">
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full flex items-center justify-between p-6 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50 shadow-sm hover:shadow transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <HeartIcon />
              <div>
                <h3 className="text-sm md:text-base font-bold text-zinc-800 group-hover:text-zinc-950 transition-colors">
                  Additional Leadership & Volunteer Tracks
                </h3>
                <p className="text-[11px] text-zinc-500">Mentorship, Election Observing, and MUN networks ({volunteerRoles.length} roles)</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isAccordionOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-zinc-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m6 9 6 6 6-6"/></svg>
            </motion.div>
          </button>

          <AnimatePresence>
            {isAccordionOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden bg-zinc-100/30 rounded-2xl border border-zinc-200/50 p-6 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {volunteerRoles.map((role) => (
                    <div key={role.org + role.role} className="p-5 rounded-xl bg-white border border-zinc-200/80 shadow-sm space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs md:text-sm font-bold text-zinc-800">{role.role}</h4>
                        <span className="text-[10px] text-zinc-500 font-semibold whitespace-nowrap bg-zinc-50 px-2 py-0.5 rounded border border-zinc-100">{role.duration}</span>
                      </div>
                      <div className="text-[11px] text-violet-600 font-semibold">{role.org}</div>
                      <p className="text-xs text-zinc-600 font-normal leading-relaxed pt-2">{role.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* HONORS & AWARDS SECTION */}
        <section className="space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-zinc-900 flex items-center gap-2">
              <AwardIcon />
              Honors & Awards
            </h2>
            <p className="text-sm text-zinc-500">Recognition for strategy, climate action, and community development</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {honors.map((honor) => (
              <div key={honor.name} className="p-5 rounded-2xl bg-white/75 border border-zinc-200/80 hover:border-zinc-300 shadow-sm hover:shadow-md transition-all space-y-2">
                <div className="text-violet-600 font-bold text-xs uppercase tracking-wider">★ Awarded</div>
                <h3 className="text-xs md:text-sm font-extrabold text-zinc-900 leading-snug">{honor.name}</h3>
                <p className="text-[11px] text-zinc-500 leading-snug font-normal">{honor.context}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6">
          
          {/* Education */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-zinc-900 flex items-center gap-2">
                <GradIcon />
                Education
              </h2>
              <p className="text-sm text-zinc-500">Academic background</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/75 border border-zinc-200/80 shadow-sm space-y-6">
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-zinc-900">
                  B.Tech in Biotechnology
                </h3>
                <p className="text-xs text-emerald-600 font-semibold">Himalayan WhiteHouse International College, Nepal</p>
                <p className="text-xs text-zinc-400 mt-1">Aug 2018 - Aug 2023</p>
              </div>
              <div className="pt-5 border-t border-zinc-100">
                <h3 className="text-sm font-extrabold text-zinc-900">
                  Associate of Science (AS, Biology)
                </h3>
                <p className="text-xs text-emerald-600 font-semibold">Capital College and Research Center, Nepal</p>
                <p className="text-xs text-zinc-400 mt-1">Class of 2016</p>
              </div>
            </div>
          </div>

          {/* Certifications & Languages */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-zinc-900 flex items-center gap-2">
                  <AwardIcon />
                  Selected Certifications
                </h2>
                <p className="text-sm text-zinc-500">Google Agile & Specialized tracks</p>
              </div>

              <div className="space-y-2 max-h-[170px] overflow-y-auto pr-2 scrollbar-thin">
                {certifications.map((cert) => (
                  <div key={cert.id} className="p-3 rounded-xl bg-white/75 border border-zinc-200/80 shadow-sm flex justify-between items-center gap-2.5">
                    <span className="text-xs font-bold text-zinc-800 truncate">{cert.name}</span>
                    <span className="text-[10px] text-zinc-400 whitespace-nowrap font-medium">{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-zinc-500">Languages</p>
              <div className="flex flex-wrap gap-2">
                {["English (Professional)", "Nepali (Native)", "Hindi (Native)", "Maithili (Native)"].map((lang) => (
                  <span key={lang} className="text-xs bg-white border border-zinc-200/80 text-zinc-700 px-3.5 py-1.5 rounded-full shadow-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* FOOTER CALL-TO-ACTION */}
        <section className="text-center pt-10 pb-6 border-t border-zinc-200 flex flex-col items-center space-y-3">
          <p className="text-sm text-zinc-400">Designed with Next.js, Tailwind v4, & Framer Motion</p>
          <p className="text-xs text-zinc-500">© 2026 Rishav Das. All Rights Reserved.</p>
        </section>
        
      </div>
    </main>
  );
}
