"use client";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
    };
  }, []);

  const scheduleIdleReset = () => {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = setTimeout(() => {
      setStatus("idle");
      resetTimeoutRef.current = null;
    }, 2000);
  };

  const handleFormInteraction = () => {
    if (status === "success" || status === "error") {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
      setStatus("idle");
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // JS path
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    setStatus("loading");

    const formElement = e.currentTarget;
    const form = new FormData(formElement);
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
      const isJson = res.headers.get("content-type")?.includes("application/json");
      const json = isJson ? await res.json() : null;

      if (!res.ok || json?.ok === false) {
        const message = json?.error || `Request failed (${res.status})`;
        throw new Error(message);
      }
      setStatus("success");
      scheduleIdleReset();
      formElement.reset();
    } catch (error) {
      console.error("[ContactForm] submit failed", error);
      setStatus("error");
      scheduleIdleReset();
    }
  }

  const buttonText =
    status === "loading"
      ? "Sending…"
      : status === "success"
        ? "Sent! 🎉"
        : status === "error"
          ? "Try again"
          : "Send";

  const buttonVariant = status === "success" ? "success" : status === "error" ? "destructive" : "default";
  const buttonDisabled = status === "loading" || status === "success";

  return (
    <form
      onSubmit={onSubmit}
      onInput={handleFormInteraction}
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

      <Button
        type="submit"
        variant={buttonVariant}
        disabled={buttonDisabled}
      >
        {buttonText}
      </Button>
    </form>
  );
}
