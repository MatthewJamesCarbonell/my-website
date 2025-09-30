"use client";

import ContactForm from "@/components/ui/ContactForm";
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
      {/* Contact (only section on page) */}
      <section className="relative isolate z-[200] border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div
            id="contact-card"
            className="relative z-[300] mx-auto grid max-w-3xl gap-6 rounded-3xl border bg-white p-6 shadow md:grid-cols-3 md:p-10"
          >
            <div className="md:col-span-1">
              <h3 className="text-xl font-semibold">Let’s talk</h3>
              <p className="mt-2 text-sm text-slate-600">
                Have questions? Send a message and I’ll get back to you soon.
              </p>
            </div>
            <div className="relative z-[300] md:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
<footer className="border-t bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row">
        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()}
        </div>
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