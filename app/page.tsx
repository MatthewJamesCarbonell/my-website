"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/ui/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Sparkles,
  Rocket,
  Linkedin,
  Instagram,
  BriefcaseBusiness,
  Mail,
  Phone,
  Clock,
  Crown,
  Microscope,
  Palette,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Strengths", href: "#features" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Connect", href: "#connect" },
  { label: "Leadership", href: "#leadership" },
  { label: "Highlights", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const differentiators = [
  {
    title: "Crisis & High-Stakes Communication",
    description:
      "Guides families, stakeholders, and executive teams through difficult conversations with calm precision and measurable outcomes.",
    metric: "70+ county mediations.",
  },
  {
    title: "Strategic Negotiation",
    description:
      "Translates legal, civic, and business priorities into practical roadmaps that keep momentum moving toward agreements.",
    metric: "0 impasses.",
  },
  {
    title: "Human-Centered Advocacy",
    description:
      "Balances policy savvy with empathy - from donor advocacy to child welfare cases - to ensure every decision protects people first.",
    metric: "7+ years in advocacy",
  },
];

const capabilities = [
  {
    icon: Shield,
    title: "Crisis Management",
    body: "High-stakes interventions delivered with calm, respectful authority when every second matters.",
  },
  {
    icon: Sparkles,
    title: "Principled Negotiation",
    body: "Fisher and Ury inspired methods that separate people from problems and drive durable agreements.",
  },
  {
    icon: Rocket,
    title: "Stakeholder Engagement",
    body: "Executive and diplomatic coordination that keeps cross-functional teams aligned and informed.",
  },
];

const experience = [
  {
    role: "Donor Family Advocate",
    org: "Life Alliance Organ Recovery Agency",
    dates: "Oct 2024 - Jul 2025",
    summary:
      "Directed life-saving conversations between donor families and medical teams, safeguarding clarity and compassion in urgent moments.",
  },
  {
    role: "Central Case Manager & County Mediator",
    org: "Broward County Clerk of Court",
    dates: "Dec 2023 - Jul 2024",
    summary:
      "Mediated high-stakes disputes between legal partners and constituents, aligning stakeholder goals without compromising equity or justice.",
  },
  {
    role: "Criminal Defense Firm Law Clerk",
    org: "Law Offices of Barry M. Wax",
    dates: "Jun 2022 - Dec 2022",
    summary:
      "Drafted trial-ready motions, organized complex case files, and supported attorneys with precedent research in expedited environments.",
  },
  {
    role: "Guardian ad Litem Volunteer",
    org: "Florida Guardian ad Litem Program",
    dates: "Nov 2020 - Oct 2024",
    summary:
      "Investigated sensitive child welfare cases, presenting court-ready findings and marshaling resources for the most vulnerable clients.",
  },
];

const aboutPhotos = [
  {
    src: "/main-image.jpeg",
    alt: "Matthew Carbonell headshot in tailored suit",
    position: "center",
  },
  {
    src: "/image-2.jpeg",
    alt: "Matthew Carbonell speaking at a Toastmasters event",
    position: "center",
  },
  {
    src: "/image-4.jpeg",
    alt: "Matthew Carbonell presenting during a strategy session",
    position: "center",
  },
  {
    src: "/image-3.jpeg",
    alt: "Matthew Carbonell collaborating with a legal team",
    position: "center top",
  },
];

const education = [
  {
    program: "Juris Doctor - J.D. Applicant",
    institution: "Nova Southeastern University Shepard Broad College of Law",
    dates: "Jun 2021 - Jan 2023",
    notes: ["Law School 2L curriculum", "Dean's List recognition", "Focus on mediation and constitutional law"],
  },
  {
    program: "Bachelor of Arts - Political Science",
    institution: "Florida International University",
    dates: "Jun 2016 - Apr 2021",
    notes: ["Dean's List (2x)", "International Relations and Public Policy concentrations", "Leadership in Delta Upsilon and Toastmasters"],
  },
  {
    program: "Dual Enrollment - School for Advanced Studies",
    institution: "Miami-Dade College",
    dates: "Aug 2014 - May 2015",
    notes: ["Accelerated curriculum", "Bridged high school honors with college-level research"],
  },
];

const highlights = [
  {
    heading: "Leadership",
    blurb: "Toastmasters outreach lead, guiding double-digit membership growth through storytelling and community-building.",
    icon: Crown,
  },
  {
    heading: "Research & Analysis",
    blurb: "Synthesizes legal, policy, and market data into crisp briefs for stakeholders across public and private sectors.",
    icon: Microscope,
  },
  {
    heading: "Creative Strategy",
    blurb: "Designs compelling narratives - from pitch decks to courtroom-ready arguments - that move audiences to action.",
    icon: Palette,
  },
];

const socialProof = [
  {
    quote:
      "I highly recommend Matthew as a mediator. He is extremely professional, non-biased, and a focused problem-solver.",
    name: "Peter Abraham",
    title: "Owner, Founder, and Senior Member, Biscayne Mediation, LLC",
  },
];

const leadershipRoles = [
  {
    title: "Toastmasters - Head of Recruitment",
    org: "Miracle Mile",
    dates: "2022 - 2023",
    summary: "Led storytelling-rich outreach that lifted membership by roughly twenty percent year over year.",
  },
  {
    title: "Guardian ad Litem - Volunteer",
    org: "Florida Guardian ad Litem Program",
    dates: "2020 - 2024",
    summary: "Investigated sensitive cases, authored filings, and protected children's interests in court.",
  },
  {
    title: "Delta Upsilon - Founding Father",
    org: "Florida International University",
    dates: "2018 - 2021",
    summary: "Launched a new chapter, forged philanthropy partnerships, and anchored campus outreach initiatives.",
  },
];

const skills = [
  {
    category: "Crisis and Mediation",
    bullets: [
      "Crisis intervention and de-escalation",
      "Principled negotiation frameworks",
      "Stakeholder alignment under pressure",
      "Guardian ad Litem advocacy",
    ],
  },
  {
    category: "Communication and Storytelling",
    bullets: [
      "Executive-ready brief writing",
      "Cross-cultural messaging",
      "Toastmasters leadership coaching",
      "High-empathy client interviewing",
    ],
  },
  {
    category: "Research and Analysis",
    bullets: [
      "Legal research and motion drafting",
      "Policy and regulatory analysis",
      "Data synthesis for decision makers",
      "Risk and compliance documentation",
    ],
  },
  {
    category: "Leadership and Operations",
    bullets: [
      "Program development and outreach",
      "Volunteer mobilization",
      "Change management playbooks",
      "Team coaching with KPI dashboards",
    ],
  },
  {
    category: "Digital Architecture",
    bullets: [
      "Coded and launched this website",
      "Iterative UX polish with real-time feedback",
      "Integrations for contact, email, and automation",
      "Design systems tuned for brand storytelling",
    ],
  },
  {
    category: "Sales and Team Development",
    bullets: [
      "Commanded CRM dashboards to track every touchpoint",
      "Converted cold leads into warm handshakes with clarity and confidence",
      "Tailored client solutions and negotiated bespoke deals",
      "Coached teams with KPI-driven playbooks to ignite momentum",
    ],
  },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/matthew-carbonell-a73b1b230",
    value: "linkedin.com/in/matthew-carbonell-a73b1b230",
    icon: Linkedin,
    cardClass:
      "bg-gradient-to-br from-sky-50/80 via-white to-white dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900",
    iconClass: "bg-[#0A66C2] text-white",
    hoverTextClass: "group-hover:text-[#0A66C2]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/matthewjamescarbonell?igsh=MXEzYjQ4bTV2NndrYg%3D%3D&utm_source=qr",
    value: "@matthewjamescarbonell",
    icon: Instagram,
    cardClass:
      "bg-gradient-to-br from-rose-50/80 via-white to-white dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900",
    iconClass: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white",
    hoverTextClass: "group-hover:text-[#DD2A7B]",
  },
  {
    label: "Indeed",
    href: "https://profile.indeed.com/p/matthewc-chbvs4s",
    value: "indeed.com/p/matthewc-chbvs4s",
    icon: BriefcaseBusiness,
    cardClass:
      "bg-gradient-to-br from-indigo-50/80 via-white to-white dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900",
    iconClass: "bg-[#003A9B] text-white",
    hoverTextClass: "group-hover:text-[#003A9B]",
  },
  {
    label: "Email",
    href: "mailto:matthewjamescarbonell@gmail.com",
    value: "matthewjamescarbonell@gmail.com",
    icon: Mail,
    cardClass:
      "bg-gradient-to-br from-emerald-50/80 via-white to-white dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900",
    iconClass: "bg-emerald-500 text-white",
    hoverTextClass: "group-hover:text-emerald-600",
  },
  {
    label: "Phone",
    href: "tel:13057643999",
    value: "305-764-3999",
    icon: Phone,
    cardClass:
      "bg-gradient-to-br from-amber-50/80 via-white to-white dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900",
    iconClass: "bg-amber-500 text-white",
    hoverTextClass: "group-hover:text-amber-600",
  },
  {
    label: "Office Hours",
    href: "#contact",
    value: "7 AM - 8 PM, Monday - Friday",
    icon: Clock,
    isHours: true,
    cardClass:
      "bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900",
    iconClass: "bg-blue-500 text-white dark:bg-blue-400",
    hoverTextClass: "",
  },
];

const interactiveCardClass =
  "group card-pulse h-full rounded-3xl border border-slate-200/80 bg-slate-50/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-900/70";

const gradientCardBase =
  "group flex min-h-[220px] flex-col justify-center rounded-3xl border-transparent text-white shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl";

type SectionCtaProps = {
  align?: "center" | "start";
  className?: string;
  pulseSchedule?: boolean;
};

function SectionCta({ align = "center", className, pulseSchedule = false }: SectionCtaProps) {
  const base = align === "start" ? "justify-center md:justify-start" : "justify-center";
  const combined = ["flex flex-wrap gap-3", base, className].filter(Boolean).join(" ");
  const conversationClasses = ["btn-conversation", pulseSchedule ? "animate-[pulse_1.6s_ease-in-out_1]" : ""].filter(Boolean).join(" ");

  return (
    <div className={combined}>
      <Button size="lg" className="btn-resume" asChild>
        <Link href="/Matthew-Carbonell-Resume.pdf" target="_blank" rel="noopener">
          View Resume
        </Link>
      </Button>
      <Button size="lg" variant="outline" className={conversationClasses} asChild>
        <Link href="#contact">Schedule a conversation</Link>
      </Button>
    </div>
  );
}

export default function LandingPage() {
  const [ctaGlow, setCtaGlow] = useState(true);
  const [photoOrder, setPhotoOrder] = useState(() => aboutPhotos.map((_, index) => index));
  const photoContainerRef = useRef<HTMLDivElement | null>(null);
  const photoPulseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setCtaGlow(false), 1600);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    return () => {
      if (photoPulseTimeoutRef.current) {
        clearTimeout(photoPulseTimeoutRef.current);
        photoPulseTimeoutRef.current = null;
      }
    };
  }, []);

  const rotatePhotos = () => {
    setPhotoOrder((prev) => {
      if (prev.length <= 1) return prev;
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    const container = photoContainerRef.current;
    if (container) {
      if (photoPulseTimeoutRef.current) {
        clearTimeout(photoPulseTimeoutRef.current);
        photoPulseTimeoutRef.current = null;
      }
      container.classList.remove("photo-pulse-active");
      void container.offsetWidth;
      container.classList.add("photo-pulse-active");
      photoPulseTimeoutRef.current = setTimeout(() => {
        container.classList.remove("photo-pulse-active");
        photoPulseTimeoutRef.current = null;
      }, 380);
    }
  };

  const handlePhotoKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      rotatePhotos();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/90 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/85">
        <div className="bg-slate-900/95 text-xs font-medium tracking-wide text-white sm:text-sm">
          <p className="mx-auto max-w-6xl px-4 py-2 text-center">
            For the full interactive experience, view this site on a laptop or desktop.
          </p>
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="#hero" className="text-lg font-semibold">
            Matthew Carbonell
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block pl-4">
            <Button size="sm" variant="outline" className="btn-conversation" asChild>
              <Link href="#contact">Let&apos;s Connect</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section id="hero" className="relative overflow-hidden">
          <div className="mx-auto max-w-5xl px-4 py-20 md:py-28">
            <div className="space-y-10">
              <div className="space-y-6">
                <p className="inline-flex flex-wrap items-center gap-2 text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-300">
                  Crisis Negotiator | Strategic Advocate | Trusted County Mediator
                </p>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Transforming crisis into consensus.
                </h1>
                <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                  I guide organizations through high-stakes moments with clarity, decisive negotiation, and human-centered outcomes that endure.
                </p>
                <SectionCta align="start" className="mt-4" />
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                {differentiators.map((item) => (
                  <Card
                    key={item.title}
                    className={`${interactiveCardClass} border-white/70 bg-white/95 backdrop-blur dark:border-slate-800/60`}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                      <p>{item.description}</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{item.metric}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="card-pulse core-strengths-card rounded-3xl border-transparent bg-gradient-to-br from-slate-800 via-slate-900 to-black text-white shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Core Strengths</CardTitle>
                  <CardDescription className="text-slate-300">
                    High-trust relationships, decisive communication, and strategy under pressure.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-200">
                  <ul className="space-y-2">
                    <li>- Crisis navigation for healthcare, legal, and community stakeholders</li>
                    <li>- Negotiation frameworks grounded in empathy and measurable outcomes</li>
                    <li>- Cross-functional collaboration between legal, medical, and civic partners</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-slate-200/60 bg-white/75 py-20 text-slate-900 backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-100">
          <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 md:flex-row md:items-center">
            <div
              className="group mx-auto w-full max-w-xs"
              role="button"
              tabIndex={0}
              onClick={rotatePhotos}
              onKeyDown={handlePhotoKey}
              aria-label="Cycle through photos"
            >
              <div
                ref={photoContainerRef}
                className="photo-stack relative aspect-[3/4] cursor-pointer select-none rounded-[1.75rem]"
              >
                {photoOrder.map((photoIndex, position) => {
                  const photo = aboutPhotos[photoIndex];
                  const depth = aboutPhotos.length - position;
                  const rotation = position === 0 ? 0 : position === 1 ? -4 : 4;
                  const translate = position * 14;
                  const topCardClasses =
                    position === 0
                      ? "group-hover:-translate-y-1 group-hover:scale-[1.01] group-hover:rotate-1"
                      : "";
                  return (
                    <Image
                      key={photo.src}
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 16rem, 18rem"
                      className={`absolute inset-0 rounded-[1.75rem] border border-white/80 object-cover shadow-2xl transition-transform duration-500 ease-out dark:border-slate-700/70 ${topCardClasses}`}
                      style={{
                        zIndex: depth,
                        transform: `translateY(${translate}px) rotate(${rotation}deg)`,
                        objectPosition: photo.position || "center",
                      }}
                      priority={position === 0}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mx-auto max-w-xl text-center md:text-left">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl dark:text-white">About Me</h2>
              <p className="mt-6 text-base leading-relaxed text-slate-700 md:text-lg dark:text-slate-300">
                I&apos;m Matthew James Carbonell, a strategist who lives at the intersection of advocacy, communication,
                and crisis leadership. From donor family support in critical care to courtroom mediation and executive
                coordination, I translate high-stakes moments into action plans that keep teams aligned and missions moving.
              </p>
              <p className="mt-6 text-base leading-relaxed text-slate-700 md:text-lg dark:text-slate-300">
                I thrive where enterprise meets empathy&mdash;turning conflict into resolution, reinforcing systems that
                endure, and building relationships that matter across healthcare, legal, and civic arenas.
              </p>
              <div className="mt-10">
                <p className="text-xl font-semibold italic text-slate-900 md:text-2xl dark:text-white">
                  At my core, I help things run smoother.
                </p>
                <SectionCta align="start" className="mt-6" pulseSchedule={ctaGlow} />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-slate-200/60 bg-white py-20 dark:border-slate-800/70 dark:bg-slate-950">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Where I create the most impact</h2>
              <p className="text-slate-600 dark:text-slate-300">
                Blending legal training, communication, and design thinking to move missions forward.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {capabilities.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    className={`${interactiveCardClass} border-slate-200/80 bg-white/75 text-slate-900 shadow-lg backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/70 dark:text-slate-100`}
                  >
                    <CardHeader className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
                      <span className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-900 shadow-md transition-colors group-hover:bg-blue-500 group-hover:text-white dark:bg-white/15 dark:text-white">
                        <Icon className="size-5" />
                      </span>
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-200/95 dark:text-slate-200">{item.body}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.heading}
                    className={`${interactiveCardClass} border-slate-200/80 bg-white/75 text-slate-900 shadow-lg backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/70 dark:text-slate-100`}
                  >
                    <CardHeader className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
                      <span className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-900 shadow-md transition-colors group-hover:bg-blue-500 group-hover:text-white dark:bg-white/15 dark:text-white">
                        <Icon className="size-5" />
                      </span>
                      <CardTitle>{item.heading}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-200/95 dark:text-slate-200">{item.blurb}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <SectionCta className="mt-12" />
          </div>
        </section>

        <section id="experience" className="border-t border-slate-200/60 py-20 dark:border-slate-800/70">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Selected experience</h2>
              <p className="text-slate-600 dark:text-slate-300">
                A sample of roles that shaped my approach to advocacy, strategy, and mediation.
              </p>
            </div>
            <div className="space-y-6 border-l border-slate-200 pl-6 dark:border-slate-800 md:pl-10">
              {experience.map((item) => (
                <div key={item.role} className="group relative pl-6">
                  <span className="absolute left-[-13px] top-2 inline-flex size-3 rounded-full border-2 border-white bg-slate-900 dark:border-slate-900 dark:bg-white" aria-hidden />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.role}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.org} - {item.dates}</p>
                  <p className="mt-2 text-sm text-slate-600 transition-all duration-200 dark:text-slate-300 md:opacity-0 md:-translate-y-1 md:group-hover:translate-y-0 md:group-hover:opacity-100">{item.summary}</p>
                </div>
              ))}
            </div>
            <SectionCta className="mt-12" align="start" />
          </div>
        </section>

        <section id="education" className="border-t border-slate-200/60 bg-gradient-to-br from-white via-white to-slate-100 py-20 dark:border-slate-800/70 dark:bg-slate-950">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Education</h2>
              <p className="text-slate-600 dark:text-slate-300">
                Academic foundations that fuel a balanced lens on law, policy, and human-centered advocacy.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {education.map((item) => (
                <Card
                  key={item.program}
                  className={`${interactiveCardClass} border-slate-200/80 bg-white/75 text-slate-900 shadow-lg backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/70 dark:text-slate-100`}
                >
                  <CardHeader className="space-y-1">
                    <CardTitle>{item.program}</CardTitle>
                    <CardDescription>
                      {item.institution}
                      <br />
                      {item.dates}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {item.notes.map((note) => (
                        <li key={note}>- {note}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <SectionCta className="mt-12" />
          </div>
        </section>

        <section id="skills" className="border-t border-slate-200/60 bg-slate-50 py-20 dark:border-slate-800/70 dark:bg-slate-950">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Skills</h2>
              <p className="text-slate-600 dark:text-slate-300">
                A snapshot of the capabilities I bring into negotiations, strategic planning sessions, and community work.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {skills.map((group) => (
                <Card
                  key={group.category}
                  className={`${interactiveCardClass} border-slate-200/80 bg-white/70 text-slate-900 shadow-lg backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/70 dark:text-slate-100`}
                >
                  <CardHeader>
                    <CardTitle>{group.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {group.bullets.map((bullet) => (
                        <li key={bullet}>- {bullet}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <SectionCta className="mt-12" />
          </div>
        </section>

        <section
          id="connect"
          className="border-t border-slate-200/60 bg-gradient-to-br from-white via-emerald-50/50 to-slate-50 py-20 dark:border-slate-800/70 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Connect with me</h2>
              <p className="text-slate-600 dark:text-slate-300">
                Find the channel that fits best. I stay active across professional platforms, so reach out wherever is easiest for you.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {socials.map((social) => {
                const Icon = social.icon;
                const isExternal = social.href.startsWith("http");

                const defaultBase = social.isHours
                  ? "group card-pulse relative flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-slate-100/90 p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-800/70"
                  : "group card-pulse relative flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-white/95 p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-900/70";

                const baseClasses = `${defaultBase} ${social.cardClass || ""}`.trim();

                const iconClass =
                  social.iconClass ||
                  (social.isHours
                    ? "bg-blue-500 text-white dark:bg-blue-400"
                    : "bg-slate-900 text-white group-hover:bg-blue-500 dark:bg-white/10 dark:text-white");

                const hoverTextClass = social.hoverTextClass !== undefined ? social.hoverTextClass : "group-hover:text-blue-600";

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener" : undefined}
                    className={baseClasses}
                    aria-label={social.label}
                  >
                    <span className={`flex size-12 items-center justify-center rounded-xl shadow-md transition-colors ${iconClass}`}>
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className={`text-sm font-semibold text-slate-900 transition-colors dark:text-white ${hoverTextClass}`}>{social.label}</p>
                      <p className="text-sm text-slate-600 transition-all duration-200 dark:text-slate-300 md:-translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                        {social.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
            <SectionCta className="mt-12" />
          </div>
        </section>

        <section
          id="leadership"
          className="border-t border-slate-200/60 bg-gradient-to-br from-white via-slate-50 to-white py-20 dark:border-slate-800/70 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
        >
          <div className="mx-auto max-w-7xl px-4 md:py-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Leadership & Service</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                Roles that sharpened my outreach, storytelling, and community-first muscle.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {leadershipRoles.map((item) => (
                <Card key={item.title} className={interactiveCardClass}>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>
                      {item.org} ({item.dates})
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{item.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <SectionCta className="mt-12" />
          </div>
        </section>

        <section
          id="gallery"
          className="border-y border-slate-200/60 bg-gradient-to-br from-white via-amber-50/70 to-rose-50/70 py-20 text-slate-900 dark:border-slate-800/70 dark:bg-gradient-to-br dark:from-slate-950 dark:via-rose-950/60 dark:to-amber-950/60 dark:text-slate-100"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Spotlight moments</h2>
              <p className="text-slate-600 dark:text-slate-200">
                Highlights and artifacts that show how I work and partner with teams.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className={`${gradientCardBase} bg-gradient-to-br from-rose-500/85 to-amber-500/80`}
              >
                <CardHeader className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <CardTitle className="text-2xl font-semibold text-white">Winning hearts & minds</CardTitle>
                  <CardDescription className="max-w-xs text-base text-rose-50/95">
                    Toastmasters recruitment campaigns that doubled club membership through storytelling and community rituals.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className={`${gradientCardBase} bg-gradient-to-br from-blue-600/85 to-indigo-700/80`}>
                <CardHeader className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <CardTitle className="text-2xl font-semibold text-white">Briefs that inspire action</CardTitle>
                  <CardDescription className="max-w-xs text-base text-blue-50/95">
                    Strategic decks and legal briefs that distill research into clear paths forward for executives and mediators alike.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className={`${gradientCardBase} bg-gradient-to-br from-emerald-500/85 to-teal-600/80`}>
                <CardHeader className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <CardTitle className="text-2xl font-semibold text-white">Community impact</CardTitle>
                  <CardDescription className="max-w-xs text-base text-emerald-50/95">
                    Guardian ad Litem service, coordinating multidisciplinary teams to protect children and families in crisis.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            <SectionCta className="mt-12" />
          </div>
        </section>

        <section id="testimonials" className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Voices from collaborators</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {socialProof.map((item) => (
                <Card key={item.name} className={`${interactiveCardClass} bg-white/95 dark:bg-slate-900/70`}>
                  <CardContent className="flex h-full flex-col gap-6 p-6">
                    <p className="text-sm text-slate-600 dark:text-slate-300">&ldquo;{item.quote}&rdquo;</p>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.name}</p>
                      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <SectionCta className="mt-12" />
          </div>
        </section>

        <section id="contact" className="border-t border-slate-200/60 bg-white py-20 dark:border-slate-800/70 dark:bg-slate-950">
          <div className="mx-auto max-w-6xl px-4">
            <div
              id="contact-card"
              className="contact-card relative z-[1] mx-auto grid max-w-3xl gap-6 rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-xl backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl md:grid-cols-3 md:p-10 dark:border-slate-700/70 dark:bg-slate-900/85"
            >
              <div className="space-y-3 md:col-span-1">
                <h3 className="text-xl font-semibold">Let&apos;s talk</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Have questions? Send a message and I&apos;ll get back to you soon.
                </p>
                <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  <p><span className="font-semibold">Email:</span> matthewjamescarbonell@gmail.com</p>
                  <p><span className="font-semibold">Phone:</span> 305-766-3999</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/60 bg-white py-8 dark:border-slate-800/70 dark:bg-slate-950">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Matthew Carbonell
        </div>
      </footer>
    </div>
  );
}
