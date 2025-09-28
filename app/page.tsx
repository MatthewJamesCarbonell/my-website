"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Star, Rocket, Sparkles, Mail, Menu, X, Shield, ArrowRight } from "lucide-react";

// ---------- Quick Setup Notes ----------
// • This is a single-file, production-ready landing page.
// • Uses Tailwind for styling, shadcn/ui for components, lucide-react for icons, and framer-motion for subtle animations.
// • Replace the placeholder copy, links, and images with your own.
// • Optional: connect a form tool (Formspree, Basin) by setting form action URL below.
// • Deploy easily to Vercel/Netlify.

export default function LandingPage() {
  const [open, setOpen] = useState(false);

  const nav = [
    { label: "Features", href: "#features" },
    { label: "Showcase", href: "#showcase" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
<a href="#home" className="font-semibold tracking-tight text-slate-800">
  MJC
</a>
          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-slate-700 hover:text-slate-900">
                {n.label}
              </a>
            ))}
            <Button size="sm" className="rounded-2xl">Get Started</Button>
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="border-t bg-white md:hidden">
            <div className="mx-auto max-w-7xl px-4 py-3">
              <div className="grid gap-2">
                {nav.map((n) => (
                  <a key={n.href} href={n.href} className="rounded-lg px-2 py-2 text-sm font-medium hover:bg-slate-100">
                    {n.label}
                  </a>
                ))}
                <Button className="mt-2 w-full rounded-2xl">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-slate-200/70 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Matthew James Carbonell
            </h1>
            <p className="mt-2 text-base text-slate-500 md:text-lg">
              Advocate | Enterpriser | Organizer
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button className="rounded-2xl" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener">Download Résumé</a>
              </Button>
              <a href="#skills" className="text-sm font-semibold text-slate-700 hover:underline">See Core Skills</a>
              <a href="#experience" className="text-sm font-semibold text-slate-700 hover:underline">See Experience</a>
            </div>

          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="relative mx-auto aspect-video w-full max-w-xl overflow-hidden rounded-3xl border bg-white shadow">
              {/* Replace with your product screenshot or image */}
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <Rocket className="mx-auto mb-4 h-10 w-10" />
                  <p className="text-sm text-slate-500">Drop a screenshot or image here</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section id="about" className="mx-auto max-w-4xl px-4 py-20 md:py-28 text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">About Me</h2>

        <p className="mt-6 text-base text-slate-600 md:text-lg leading-relaxed">
          My name is Matthew James Carbonell. I’m a strategist with expertise in high-stakes advocacy
          and communication optimization: ensuring leadership-employee clarity, unity of mission, and
          momentum toward an enduring vision. From donor family advocacy in critical care to courtroom
          mediation and executive coordination, I leverage crisis management, principled negotiation,
          and stakeholder engagement to achieve decisive success.
        </p>

        <p className="mt-6 text-base text-slate-600 md:text-lg leading-relaxed">
          I thrive where enterprise meets empathy: turning conflict into resolution and vision into action,
          reinforcing systems that prevail and relationships that matter.
        </p>

        <p className="mt-8 text-base italic font-semibold md:text-lg leading-relaxed">
          At my core, I help things run smoother — for people, teams, and institutions.
        </p>
      </section>
      <section id="skills" className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Core Skills</h2>
            <p className="mt-3 text-slate-600">
              The pillars of my work — tested across law, mediation, and strategy.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <Shield className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-widest">Skill</span>
                </div>
                <CardTitle>Crisis Management</CardTitle>
                <CardDescription>
                  High-stakes interventions with calm authority — guiding families, courts, and teams through
                  critical decision-making moments.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-widest">Skill</span>
                </div>
                <CardTitle>Principled Negotiation</CardTitle>
                <CardDescription>
                  Fisher &amp; Ury’s method in action — separating people from problems and creating win-win
                  outcomes in tense disputes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <Rocket className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-widest">Skill</span>
                </div>
                <CardTitle>Stakeholder Engagement</CardTitle>
                <CardDescription>
                  Executive and diplomatic coordination across diverse groups — turning complexity into order
                  and alignment.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
      <section id="experience" className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Experience</h2>
            <p className="mt-3 text-slate-600">Selected roles & outcomes.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Donor Family Advocate — LAORA */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Donor Family Advocate</CardTitle>
                <CardDescription>Life Alliance Organ Recovery Agency — Miami, FL · Oct 2024–Jul 2025</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                <ul className="list-disc space-y-2 pl-4">
                  <li>Guided life-or-death conversations with families and clinical teams.</li>
                  <li>Interpreted labs/charts to protect organ viability and compliance.</li>
                  <li>Coordinated multi-disciplinary stakeholders under time pressure.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Central Case Manager & County Mediator — Broward */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Central Case Manager & County Mediator</CardTitle>
                <CardDescription>Broward County Clerk of Court — Fort Lauderdale, FL · Dec 2023–Jul 2024</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                <ul className="list-disc space-y-2 pl-4">
                  <li>De-escalated disputes among law enforcement, counsel, and offenders.</li>
                  <li>Applied principled negotiation to move cases toward settlement.</li>
                  <li>Owned scheduling, notifications, and precise documentation.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Client Expert & Team Lead — Dell-Tex */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Client Expert & Team Lead</CardTitle>
                <CardDescription>Dell-Tex Elite Marketing — Davie, FL · May 2023–Dec 2023</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                <ul className="list-disc space-y-2 pl-4">
                  <li>Managed pipeline and KPIs to convert activity into closes.</li>
                  <li>Coached teammates on objections, discovery, and follow-through.</li>
                  <li>Maintained CRM hygiene and reporting cadence.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Criminal Defense Law Clerk — Barry M. Wax */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Criminal Defense Law Clerk</CardTitle>
                <CardDescription>Law Offices of Barry M. Wax — Miami, FL · Jun 2022–Dec 2022</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                <ul className="list-disc space-y-2 pl-4">
                  <li>Researched statutes/caselaw and drafted motions & memoranda.</li>
                  <li>Organized discovery and protected evidentiary records.</li>
                  <li>Supported trial prep with timelines and exhibits.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Family Mediation Firm Clerk — Gables Mediation */}
            <Card className="rounded-2xl md:col-span-2">
              <CardHeader>
                <CardTitle>Family Mediation Firm Clerk</CardTitle>
                <CardDescription>Gables Mediation — Davie, FL · Feb 2014–Dec 2018</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                <ul className="list-disc space-y-2 pl-4">
                  <li>Drafted MSAs, alimony, and child-support plans with high discretion.</li>
                  <li>Coordinated clients, counsel, and calendars; ensured file accuracy.</li>
                  <li>Handled sensitive communications with empathy and clarity.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section id="leadership" className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl text-center">Leadership & Service</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Toastmasters — Head of Recruitment</CardTitle>
                <CardDescription>Miracle Mile Club · 2022–2023</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Led recruitment campaigns and outreach, driving ~20% membership growth.
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Guardian ad Litem — Volunteer</CardTitle>
                <CardDescription>Florida GAL Program · 2020–2024</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Investigated cases, authored filings, and advocated for children’s best interests in court.
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Delta Upsilon — Founding Father & Director of Outreach</CardTitle>
                <CardDescription>Florida International University · 2018–2021</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Built the chapter from the ground up; organized philanthropy and campus partnerships.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section id="education" className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl text-center">Education</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>B.A., Political Science</CardTitle>
                <CardDescription>Florida International University · Dean’s List ×2</CardDescription>
              </CardHeader>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Law Coursework (J.D. Curriculum)</CardTitle>
                <CardDescription>Nova Southeastern University · 2021–2023</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Completed courses in Contracts, Torts, Civil Procedure, Legal Writing, Constitutional Law,
                Criminal Law, Evidence, and Professional Responsibility.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Logos / Social Proof */}
      <section aria-label="Social proof" className="border-y bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">Trusted by teams at</p>
          <div className="grid grid-cols-2 items-center gap-6 opacity-70 md:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 rounded bg-slate-100" />
            ))}
          </div>
        </div>
      </section>

      {/* Showcase / Gallery */}
      <section id="showcase" className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Showcase</h2>
            <p className="mt-3 text-slate-600">Swap these with screenshots, portfolio work, or product shots.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden rounded-2xl border bg-slate-100" />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">People are talking</h2>
          <p className="mt-3 text-slate-600">Add quotes from customers, collaborators, or press.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-1 text-slate-500">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4" />
                  ))}
                </div>
                <CardTitle className="text-lg">“This starter saved us weeks.”</CardTitle>
                <CardDescription>— Happy Human, Founder at Example Co.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Replace with your own testimonials. Short and punchy works best.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">FAQ</h2>
          <p className="mt-3 text-slate-600">Quick answers to common questions.</p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I customize this?</AccordionTrigger>
              <AccordionContent>
                Edit text, replace images, and update links. Tailwind classes control layout & style. Components are in this file for simplicity.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I connect a contact form?</AccordionTrigger>
              <AccordionContent>
                Yes. Replace the form action below with a service URL (Formspree/Basin) or wire to your backend API.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I deploy?</AccordionTrigger>
              <AccordionContent>
                Push to GitHub and deploy to Vercel/Netlify. Both detect frameworks automatically.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="mx-auto grid max-w-3xl gap-6 rounded-3xl border bg-white p-6 shadow md:grid-cols-3 md:p-10">
            <div className="md:col-span-1">
              <h3 className="text-xl font-semibold">Let’s talk</h3>
              <p className="mt-2 text-sm text-slate-600">Have questions? Send a message and I’ll get back to you within 24 hours.</p>
            </div>
            <form
              className="md:col-span-2 grid gap-4"
              method="POST"
              action="#" // ← Replace with your form endpoint
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Input name="name" placeholder="Your name" required />
                <Input type="email" name="email" placeholder="you@example.com" required />
              </div>
              <Input name="message" placeholder="What can we help with?" />
              <Button type="submit" className="inline-flex items-center gap-2 rounded-2xl self-start">
                <Mail className="h-4 w-4" /> Send
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
