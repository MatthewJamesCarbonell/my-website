"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
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
  {
    "label": "About",
    "href": "#about"
  },
  {
    "label": "Experience",
    "href": "#experience"
  },
  {
    "label": "Projects",
    "href": "#projects"
  },
  {
    "label": "Service",
    "href": "#service"
  },
  {
    "label": "Education",
    "href": "#education"
  },
  {
    "label": "Beyond Work",
    "href": "#beyond-work"
  },
  {
    "label": "Contact",
    "href": "#contact"
  }
];

const differentiators = [
  {
    "title": "Investigation",
    "description": "Evidence review, investigative interviewing, and documented findings in regulated environments.",
    "metric": "Regulatory casework"
  },
  {
    "title": "Mediation and Advocacy",
    "description": "Clear communication and careful judgment in court, healthcare, and child-advocacy settings.",
    "metric": "Certified County Mediator"
  },
  {
    "title": "Web Development",
    "description": "Independent web projects with clear writing, responsive layouts, and direct contact paths.",
    "metric": "Personal and business websites"
  }
];

const capabilities = [
  {
    icon: Shield,
    title: "Crisis Management",
    body: "Calm communication and plain-language explanations in sensitive healthcare, court, and investigative settings.",
  },
  {
    icon: Sparkles,
    title: "Principled Negotiation",
    body: "Structured dialogue that helps participants clarify concerns, evaluate proposals, and consider resolution options.",
  },
  {
    icon: Rocket,
    title: "Stakeholder Engagement",
    body: "Coordination across medical teams, attorneys, court personnel, service providers, and families.",
  },
];

const experience = [
  {
    "role": "Medical Malpractice Investigator",
    "org": "Florida Department of Health · Division of Medical Quality Assurance",
    "dates": "March 2026–Present",
    "bullets": [
      "Review complaints and supporting records, organize evidence, and prepare documented findings for regulatory investigations.",
      "Coordinate evidence review, confidential documentation, and follow-up across concurrent cases, including periods with four to five active investigations.",
      "Helped a woman accept police assistance in response to suspected human trafficking by explaining safety priorities and the potential to prevent harm to others."
    ]
  },
  {
    "role": "Donor Family Advocate",
    "org": "Life Alliance Organ Recovery Agency · Miami, Florida",
    "dates": "October 2024–July 2025",
    "bullets": [
      "Guided families through sensitive conversations about organ donation, explaining authorization, timing, and procedures in accessible language.",
      "Completed structured donor-risk interviews and clarified medical and social histories used in transplant evaluation.",
      "Coordinated with intensive care staff, administrators, and transplant teams to meet time-sensitive requirements.",
      "Maintained confidential donor records documenting family interactions and authorization steps."
    ]
  },
  {
    "role": "Central Case Manager and County Mediator",
    "org": "Broward County Clerk of Court · Fort Lauderdale, Florida",
    "dates": "December 2023–July 2024",
    "bullets": [
      "Mediated disputes involving attorneys, law enforcement, and community members while maintaining neutrality.",
      "Helped participants clarify underlying concerns, evaluate proposals, and consider workable resolution options.",
      "Managed referrals, scheduling, case documentation, outcome tracking, and follow-up instructions."
    ]
  },
  {
    "role": "Client Expert and Team Lead",
    "org": "Del-Tex Elite Marketing · Davie, Florida",
    "dates": "May–December 2023",
    "bullets": [
      "Assessed client needs, presented tailored solutions, and maintained outreach and sales activity in CRM systems.",
      "Reviewed performance data and coached team members on communication, follow-through, and progress toward targets."
    ]
  },
  {
    "role": "Criminal Defense Law Clerk",
    "org": "Law Offices of Barry M. Wax · Miami, Florida",
    "dates": "June–December 2022",
    "bullets": [
      "Researched statutes, case law, procedural rules, and constitutional issues to support attorney case preparation.",
      "Drafted legal memoranda, motions, and other case documents.",
      "Organized discovery, exhibits, and confidential files for attorney review."
    ]
  }
];

const service = [
  {
    "role": "Volunteer Guardian ad Litem",
    "org": "Florida Guardian ad Litem Program · Miami-Dade County",
    "dates": "2020–2024",
    "bullets": [
      "Evaluated multiple prospective foster homes and helped secure a supportive placement for a child who had survived severe abuse, prioritizing the child’s individual care needs.",
      "Conducted home visits, caregiver assessments, interviews, and records reviews to inform recommendations in dependency proceedings.",
      "Prepared court reports and coordinated community resources for children and caregivers."
    ]
  },
  {
    "role": "Volunteer Patient Advocate and Practice Administrator",
    "org": "Garnet & Carbonell DPM, LLC · Coral Gables, Florida",
    "dates": "2024–2026",
    "bullets": [
      "Supported patient intake, scheduling, administrative communication, records management, and follow-up in an outpatient medical practice."
    ]
  },
  {
    "role": "Volunteer Family Mediation Firm Clerk",
    "org": "Gables Mediation",
    "dates": "2014–2018",
    "bullets": [
      "Organized sensitive family-law files, prepared draft agreements for mediator review, and coordinated mediation scheduling."
    ]
  }
];

const projects = [
  {
    "name": "Day One Web Studio",
    "kind": "Independent web project",
    "summary": "Developed a website presenting a focused website-building service, with project examples, service information, frequently asked questions, and contact and intake paths.",
    "detail": "The project includes responsive layouts, interactive components, and a reusable starter-site template.",
    "links": []
  },
  {
    "name": "Personal Portfolio",
    "kind": "Next.js · React · TypeScript",
    "summary": "Developed this professional website using Next.js, React, and TypeScript, bringing career experience, education, recommendations, and contact options into one place.",
    "detail": "",
    "links": []
  },
  {
    "name": "Business Website Demonstrations",
    "kind": "Website concepts",
    "summary": "Created distinct website concepts for a mobile notary service and a home-cleaning business. Each demonstrates service presentation, visual identity, and clear paths to call, email, or request information.",
    "detail": "",
    "links": [
      {
        "label": "Mobile notary example",
        "href": "https://mjmobilenotary.pages.dev"
      },
      {
        "label": "Cleaning business example",
        "href": "https://fresh-start-cleaning-co.pages.dev"
      }
    ]
  }
];

const aboutPhotos = [
  {
    src: "/Main image.jpg",
    alt: "Matthew Carbonell headshot in tailored suit",
    position: "center",
  },
  {
    src: "/image-1.jpeg",
    alt: "Matthew Carbonell professional portrait",
    position: "center",
  },
  {
    src: "/image-2.jpeg",
    alt: "Matthew Carbonell speaking at a Toastmasters event",
    position: "center",
  },
  {
    src: "/image-3.jpeg",
    alt: "Matthew Carbonell collaborating with a legal team",
    position: "center top",
  },
  {
    src: "/image-4.jpeg",
    alt: "Matthew Carbonell presenting during a strategy session",
    position: "center",
  },
  {
    src: "/image-5.jpg",
    alt: "Matthew Carbonell in professional setting",
    position: "center",
  },
];

const education = [
  {
    "program": "Bachelor of Arts in Political Science",
    "institution": "Florida International University",
    "dates": "2021",
    "notes": []
  },
  {
    "program": "Juris Doctor Coursework",
    "institution": "Nova Southeastern University, Shepard Broad College of Law",
    "dates": "",
    "notes": [
      "Coursework toward the J.D.; degree not conferred."
    ]
  },
  {
    "program": "Certified County Mediator",
    "institution": "Supreme Court of Florida",
    "dates": "",
    "notes": []
  }
];

const highlights = [
  {
    heading: "Leadership",
    blurb: "Recruitment, outreach, team coaching, and community programming through professional and volunteer roles.",
    icon: Crown,
  },
  {
    heading: "Research & Analysis",
    blurb: "Legal research, evidence review, and organized reports for attorney, court, and regulatory review.",
    icon: Microscope,
  },
  {
    heading: "Web Projects",
    blurb: "Personal and small-business website concepts with responsive layouts and clear contact paths.",
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
    "title": "Recruitment Leadership",
    "org": "Toastmasters International, Miracle Mile",
    "dates": "2022–2023",
    "summary": "Led recruitment messaging, outreach, and events, contributing to approximately 20 percent membership growth."
  },
  {
    "title": "Founding Member and Director of Outreach",
    "org": "Delta Upsilon, FIU",
    "dates": "2018–2021",
    "summary": "Helped establish chapter operations, recruitment activities, campus partnerships, and philanthropy programming."
  }
];

const skills = [
  {
    "category": "Investigation and Research",
    "bullets": [
      "Investigative interviewing",
      "Evidence review",
      "Legal research and writing"
    ]
  },
  {
    "category": "Mediation and Communication",
    "bullets": [
      "Mediation",
      "Conflict de-escalation",
      "Plain-language communication"
    ]
  },
  {
    "category": "Case Coordination",
    "bullets": [
      "Case coordination and follow-up",
      "Confidential records management",
      "Cross-functional communication"
    ]
  },
  {
    "category": "Web Development",
    "bullets": [
      "Responsive website development",
      "Service and portfolio presentation",
      "Contact and intake paths"
    ]
  }
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/matthew-carbonell-a73b1b230",
    value: "linkedin.com/in/matthew-carbonell-a73b1b230",
    icon: Linkedin,
    glow: "rgba(10, 102, 194, 0.55)",
    iconClass: "bg-[#0A66C2] text-white",
    hoverTextClass: "group-hover:text-[#0A66C2]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/matthewjamescarbonell?igsh=MXEzYjQ4bTV2NndrYg%3D%3D&utm_source=qr",
    value: "@matthewjamescarbonell",
    icon: Instagram,
    glow: "rgba(221, 42, 123, 0.52)",
    iconClass: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white",
    hoverTextClass: "group-hover:text-[#DD2A7B]",
  },
  {
    label: "Indeed",
    href: "https://profile.indeed.com/p/matthewc-chbvs4s",
    value: "indeed.com/p/matthewc-chbvs4s",
    icon: BriefcaseBusiness,
    glow: "rgba(0, 58, 155, 0.5)",
    iconClass: "bg-[#003A9B] text-white",
    hoverTextClass: "group-hover:text-[#003A9B]",
  },
  {
    label: "Email",
    href: "mailto:matthewjamescarbonell@gmail.com",
    value: "matthewjamescarbonell@gmail.com",
    icon: Mail,
    glow: "rgba(16, 185, 129, 0.5)",
    iconClass: "bg-emerald-500 text-white",
    hoverTextClass: "group-hover:text-emerald-600",
  },
  {
    label: "Phone",
  href: "tel:13057642999",
  value: "305-764-2999",
    icon: Phone,
    glow: "rgba(245, 158, 11, 0.52)",
    iconClass: "bg-amber-500 text-white",
    hoverTextClass: "group-hover:text-amber-600",
  },
  {
    label: "Office Hours",
    href: "#contact",
    value: "7 AM - 8 PM, Monday - Friday",
    icon: Clock,
    isHours: true,
    glow: "rgba(56, 189, 248, 0.42)",
    iconClass: "bg-blue-500 text-white dark:bg-blue-400",
    hoverTextClass: "",
  },
];

const interactiveCardClass =
  "group card-pulse h-full rounded-3xl border border-slate-200/80 bg-slate-50/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-900/70";

type SectionCtaProps = {
  align?: "center" | "start";
  className?: string;
  pulseSchedule?: boolean;
  buttonTone?: "default" | "slate";
};

function SectionCta({ align = "center", className, pulseSchedule = false, buttonTone = "default" }: SectionCtaProps) {
  const base = align === "start" ? "justify-center md:justify-start" : "justify-center";
  const combined = ["flex flex-wrap gap-3", base, className].filter(Boolean).join(" ");
  const resumeClasses = ["btn-resume", buttonTone === "slate" ? "btn-dark-slate" : ""].filter(Boolean).join(" ");
  const conversationClasses = [
    "btn-conversation",
    buttonTone === "slate" ? "btn-dark-slate" : "",
    pulseSchedule ? "animate-[pulse_1.6s_ease-in-out_1]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={combined}>
      <Button size="lg" className={resumeClasses} asChild>
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
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 dark:from-[#10141b] dark:via-[#10141b] dark:to-[#10141b] dark:text-neutral-100">
      <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/90 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="#hero" className="text-lg font-semibold">
            Matthew Carbonell
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-5 text-sm font-medium xl:flex">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="pl-4">
            <Button size="sm" variant="outline" className="btn-conversation" asChild>
              <Link href="#contact">Let&apos;s Connect</Link>
            </Button>
          </div>
        </div>
        <nav aria-label="Section navigation" className="flex gap-5 overflow-x-auto px-4 pb-3 text-sm text-slate-600 dark:text-slate-300 xl:hidden">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">{item.label}</Link>
          ))}
        </nav>
      </header>

      <main>
        <section
          id="hero"
          className="scroll-mt-32 relative overflow-hidden bg-gradient-to-b from-white/70 via-white/40 to-white/10 dark:from-[#10141b] dark:via-[#10141b] dark:to-[#10141b]"
        >
          <div className="mx-auto max-w-5xl px-4 py-20 md:py-28">
            <div className="space-y-10">
              <div className="space-y-6">
                <p className="inline-flex flex-wrap items-center gap-2 text-sm font-semibold tracking-wide text-slate-600 dark:text-[#8fa2c6]">
                  Regulatory Investigator · Certified County Mediator
                </p>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Matthew James “MJ” Carbonell
                </h1>
                <p className="max-w-2xl text-lg text-slate-600 dark:text-[#8fa2c6]">
                  Investigation, mediation, advocacy, and independent web development. Based in Tallahassee, Florida.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                {differentiators.map((item) => (
                  <Card
                    key={item.title}
                    className={`${interactiveCardClass} border-white/70 bg-white/95 backdrop-blur dark:border-[#2b323d] dark:bg-[#1a1f27]`}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-slate-600 dark:text-neutral-300">
                      <p>{item.description}</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{item.metric}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="card-pulse core-strengths-card rounded-3xl border-transparent bg-gradient-to-br from-[#0f172a] via-[#111c35] to-[#091020] text-white shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Core Strengths</CardTitle>
                  <CardDescription className="text-neutral-300">
                    Careful evidence review, clear communication, and practical follow-through.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-neutral-200">
                  <ul className="space-y-2">
                    <li>- Investigative interviewing and confidential records management</li>
                    <li>- Mediation and plain-language explanations of complex information</li>
                    <li>- Coordination across legal, medical, and community settings</li>
                  </ul>
                </CardContent>
              </Card>
              <SectionCta align="start" className="mt-8" pulseSchedule={ctaGlow} />
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-32 border-y border-slate-200/60 bg-white/75 py-20 text-slate-900 backdrop-blur-sm dark:border-[#272c35] dark:bg-[#151920] dark:text-slate-100">
          <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 md:flex-row md:items-center md:gap-12">
            <div
              className="group mx-auto w-full max-w-xs md:max-w-sm"
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
                  // Smaller translate offset on mobile to reduce stack height
                  const translate = position * 8; // Reduced from 14 to 8
                  const topCardClasses =
                    position === 0
                      ? "group-hover:-translate-y-1 group-hover:scale-[1.01] group-hover:rotate-1"
                      : "";
                  return (
                    <Image
                      key={photo.src}
                      src={photo.src}
                      alt={photo.alt}
                      onError={() => setPhotoOrder((order) => order.filter((index) => index !== photoIndex))}
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
              <p className="mt-6 text-base leading-relaxed text-slate-700 md:text-lg dark:text-[#c5ccd9]">
                My work spans regulatory investigations, court administration, legal research, and organ donation advocacy. Across those settings, I’ve gathered sensitive information, evaluated evidence, and helped people navigate decisions with significant personal consequences.
              </p>
              <p className="mt-6 text-base leading-relaxed text-slate-700 md:text-lg dark:text-[#c5ccd9]">
                I also develop websites through independent projects, combining clear writing, responsive layouts, and straightforward ways for visitors to make contact.
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

        <section id="features" className="scroll-mt-32 border-t border-slate-200/60 bg-white py-20 dark:border-[#272c35] dark:bg-[#10141b]">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Where I create the most impact</h2>
              <p className="text-slate-600 dark:text-[#9eaac0]">
                Experience across investigation, mediation, advocacy, and web development.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {capabilities.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    className={`${interactiveCardClass} border-slate-200/80 bg-white/75 text-slate-900 shadow-lg backdrop-blur-sm dark:border-[#2c333f] dark:bg-[#171c24] dark:text-slate-100`}
                  >
                    <CardHeader className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
                      <span className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-900 shadow-md transition-colors group-hover:bg-blue-500 group-hover:text-white dark:bg-white/15 dark:text-white">
                        <Icon className="size-5" />
                      </span>
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 dark:text-[#b8c1d3]">{item.body}</p>
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
                    className={`${interactiveCardClass} border-slate-200/80 bg-white/75 text-slate-900 shadow-lg backdrop-blur-sm dark:border-[#2c333f] dark:bg-[#171c24] dark:text-slate-100`}
                  >
                    <CardHeader className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
                      <span className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-900 shadow-md transition-colors group-hover:bg-blue-500 group-hover:text-white dark:bg-white/15 dark:text-white">
                        <Icon className="size-5" />
                      </span>
                      <CardTitle>{item.heading}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 dark:text-[#b8c1d3]">{item.blurb}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <SectionCta className="mt-12" buttonTone="slate" />
          </div>
        </section>

        <section id="experience" className="scroll-mt-32 border-t border-slate-200/60 bg-white py-20 dark:border-[#272c35] dark:bg-[#151920]">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Professional Experience</h2>
              <p className="text-slate-600 dark:text-[#c5ccd9]">
                Regulatory, healthcare, court, and client-facing work.
              </p>
            </div>
            <div className="space-y-10 border-l border-slate-200 pl-6 dark:border-[#2f3642] md:pl-10">
              {experience.map((item) => (
                <div key={item.role} className="group relative pl-6">
                  <span className="absolute left-[-13px] top-2 inline-flex size-3 rounded-full border-2 border-white bg-slate-900 dark:border-[#151920] dark:bg-white" aria-hidden />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-[#f3f5f9]">{item.role}</h3>
                  <p className="text-sm text-slate-500 dark:text-[#8b94a6]">{item.org} - {item.dates}</p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-[#c5ccd9]">
                    {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <SectionCta className="mt-12" align="start" />
          </div>
        </section>

        <section id="projects" className="scroll-mt-32 border-t border-slate-200/60 bg-white py-20 dark:border-[#272c35] dark:bg-[#10141b]">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Independent Web Projects</h2>
              <p className="text-slate-600 dark:text-[#9eaac0]">Personal projects, a website-building service, and business website demonstrations.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.name} className={`${interactiveCardClass} dark:border-[#2c333f] dark:bg-[#171c24]`}>
                  <CardHeader>
                    <CardDescription>{project.kind}</CardDescription>
                    <CardTitle>{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-[#b8c1d3]">
                    <p>{project.summary}</p>
                    {project.detail && <p>{project.detail}</p>}
                    {project.links.length > 0 && (
                      <ul className="space-y-3 pt-2">
                        {project.links.map((link) => (
                          <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-sm font-medium text-blue-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-blue-300">{link.label}<span className="sr-only"> (opens in a new tab)</span></a></li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="service" className="scroll-mt-32 border-t border-slate-200/60 bg-white py-20 dark:border-[#272c35] dark:bg-[#151920]">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Advocacy and Service</h2>
              <p className="text-slate-600 dark:text-[#c5ccd9]">Volunteer work in child advocacy, patient support, and family mediation.</p>
            </div>
            <div className="space-y-10 border-l border-slate-200 pl-6 dark:border-[#2f3642] md:pl-10">
              {service.map((item) => (
                <div key={item.role} className="relative pl-6">
                  <span className="absolute left-[-13px] top-2 inline-flex size-3 rounded-full border-2 border-white bg-slate-900 dark:border-[#151920] dark:bg-white" aria-hidden />
                  <h3 className="text-xl font-semibold">{item.role}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-[#8b94a6]">{item.org} · {item.dates}</p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-[#c5ccd9]">
                    {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="scroll-mt-32 border-t border-slate-200/60 bg-white py-20 dark:border-[#272c35] dark:bg-[#10141b]">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Education and Credentials</h2>
              <p className="text-slate-600 dark:text-[#9eaac0]">
                Education and professional certification.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {education.map((item) => (
                <Card
                  key={item.program}
                  className={`${interactiveCardClass} border-slate-200/80 bg-white/75 text-slate-900 shadow-lg backdrop-blur-sm dark:border-[#2c333f] dark:bg-[#171c24] dark:text-slate-100`}
                >
                  <CardHeader className="space-y-1">
                    <CardTitle>{item.program}</CardTitle>
                    <CardDescription>
                      {item.institution}
                      {item.dates && <><br />{item.dates}</>}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-[#b8c1d3]">
                      {item.notes.map((note) => (
                        <li key={note}>- {note}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <SectionCta className="mt-12" buttonTone="slate" />
          </div>
        </section>

        <section id="skills" className="scroll-mt-32 border-t border-slate-200/60 bg-slate-50 py-20 dark:border-[#272c35] dark:bg-[#151920]">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Skills</h2>
              <p className="text-slate-600 dark:text-[#c5ccd9]">
                Skills applied across professional, volunteer, and independent projects.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {skills.map((group) => (
                <Card
                  key={group.category}
                  className={`${interactiveCardClass} border-slate-200/80 bg-white/70 text-slate-900 shadow-lg backdrop-blur-sm dark:border-[#2f3642] dark:bg-[#1a1f27] dark:text-slate-100`}
                >
                  <CardHeader>
                    <CardTitle>{group.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-[#c5ccd9]">
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
          id="leadership"
          className="border-t border-slate-200/60 bg-slate-50 py-20 dark:border-[#272c35] dark:bg-[#151920]"
        >
          <div className="mx-auto max-w-7xl px-4 md:py-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Leadership</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                Recruitment, chapter development, and community outreach.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {leadershipRoles.map((item) => (
                <Card
                  key={item.title}
                  className={`${interactiveCardClass} dark:border-[#2f3642] dark:bg-[#1a1f27]`}
                >
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

        <section id="beyond-work" className="scroll-mt-32 border-t border-slate-200/60 bg-white py-16 dark:border-[#272c35] dark:bg-[#151920]">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Beyond Work</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-[#c5ccd9]">Outside work, I enjoy writing, playing video games, watching YouTube, and spending time with friends.</p>
            </div>
          </div>
        </section>

        <section
          id="connect"
          className="border-t border-slate-200/60 bg-white py-20 dark:border-[#272c35] dark:bg-[#10141b]"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Connect with me</h2>
              <p className="text-slate-600 dark:text-[#9eaac0]">
                Find the channel that fits best. I stay active across professional platforms, so reach out wherever is easiest for you.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {socials.map((social) => {
                const Icon = social.icon;
                const isExternal = social.href.startsWith("http");

                const baseClasses = [
                  "group social-card relative flex items-center gap-4 rounded-2xl border p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1",
                  social.isHours
                    ? "border-slate-200/80 bg-slate-100/90"
                    : "border-slate-200/70 bg-white/95",
                  "dark:border-[#2f3642] dark:bg-[#1a1f27]",
                ]
                  .filter(Boolean)
                  .join(" ");

                const glowStyle = social.glow
                  ? ({ "--card-glow": social.glow } as CSSProperties)
                  : undefined;

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
                    style={glowStyle}
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

        <section id="contact" className="scroll-mt-32 border-t border-slate-200/60 bg-slate-50 py-20 dark:border-[#272c35] dark:bg-[#151920]">
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
                  <p><span className="font-semibold">Phone:</span> 305-764-2999</p>
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
