"use client";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, Send, Sparkles } from "lucide-react";

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
        ? "Sent!"
        : status === "error"
          ? "Try again"
          : "Send message";

  const buttonVariant = status === "success" ? "success" : status === "error" ? "destructive" : "cta";
  const buttonDisabled = status === "loading" || status === "success";

  const buttonIcon =
    status === "loading"
      ? <Loader2 className="size-5 animate-spin" aria-hidden="true" />
      : status === "success"
        ? <Sparkles className="size-5 text-white drop-shadow" aria-hidden="true" />
        : status === "error"
          ? <AlertTriangle className="size-5" aria-hidden="true" />
          : <Send className="size-5 transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden="true" />;

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
        <Input
          name="name"
          placeholder="Your name"
          required
          className="border border-slate-200/80 bg-white/90 dark:border-[#2f3642] dark:bg-[#1a1f27]"
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border border-slate-200/80 bg-white/90 dark:border-[#2f3642] dark:bg-[#1a1f27]"
        />
      </div>

      <textarea
        name="message"
        placeholder="Message"
        className="h-28 w-full rounded-md border border-slate-200/80 bg-white/90 p-2 outline-none focus:ring-2 dark:border-[#2f3642] dark:bg-[#1a1f27]"
        required
      />

      <Button
        type="submit"
        variant={buttonVariant}
        size="cta"
        disabled={buttonDisabled}
        className="w-full md:w-auto"
      >
        <span className="flex items-center justify-center gap-2">
          {buttonIcon}
          <span aria-live="polite" aria-atomic="true">
            {buttonText}
          </span>
        </span>
      </Button>
    </form>
  );
}
