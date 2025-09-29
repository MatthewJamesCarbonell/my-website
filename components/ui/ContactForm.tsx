"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // JS path
    setStatus("loading");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
      company: String(form.get("company") || ""), // honeypot (optional)
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "send failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    } finally {
      setStatus("idle");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      method="post"              // ← native fallback
      action="/api/contact"     // ← native fallback
      className="space-y-3"
    >
      {/* optional honeypot */}
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-3 md:grid-cols-2">
        <Input name="name" placeholder="Your name" required />
        <Input name="email" type="email" placeholder="Email" required />
      </div>

      <textarea
        name="message"
        placeholder="Message"
        className="h-28 w-full rounded-md border border-slate-200 p-2 outline-none focus:ring-2"
        required
      />

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}