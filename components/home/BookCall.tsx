"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CONTACT } from "@/lib/home-content";

type Status = "idle" | "sending" | "done" | "error";

const BookCallContext = createContext<{ open: () => void }>({ open: () => {} });

export function useBookCall() {
  return useContext(BookCallContext);
}

/** Opens the booking modal. Used in the nav, hero and closing CTA. */
export function BookCallButton({
  children = "Book a call",
  className = "rk-btn",
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { open } = useBookCall();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}

export function BookCallProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const returnFocusTo = useRef<Element | null>(null);

  const open = useCallback(() => {
    returnFocusTo.current = document.activeElement;
    setStatus("idle");
    setErrors({});
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (returnFocusTo.current instanceof HTMLElement) {
      returnFocusTo.current.focus();
    }
  }, []);

  // Escape to close, and keep focus inside the dialog while it is open.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nameRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    const nextErrors: { name?: string; email?: string } = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      nextErrors.email = "Please enter a valid work email.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");

    // The existing route expects firstName/lastName/message. We ask for a single
    // name field — shorter form, better completion — and split it here.
    const [firstName, ...rest] = name.split(" ");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(" ") || "—",
          email,
          message: message || "Requested a call from the homepage.",
        }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <BookCallContext.Provider value={{ open }}>
      {children}

      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] grid place-items-center p-5"
          style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-call-title"
            className="rk w-full max-w-[460px] overflow-y-auto rounded-[20px] p-8"
            style={{ maxHeight: "90vh" }}
          >
            {status === "done" ? (
              <div>
                <div className="py-4 text-center">
                  <div className="text-[34px] leading-none">✓</div>
                  <h2 id="book-call-title" className="rk-item mt-3">
                    Thanks — we&apos;ve got it.
                  </h2>
                  <p className="rk-cap mt-2">
                    We&apos;ll reply within one business day, from an engineer.
                  </p>
                </div>
                <button type="button" className="rk-btn rk-btn-line mt-5 w-full" onClick={close}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 id="book-call-title" className="rk-item">
                      Book a call
                    </h2>
                    <p className="rk-cap mt-2">
                      Thirty minutes with an engineer. We reply within one business day.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="cursor-pointer border-0 bg-transparent p-1 text-[22px] leading-none"
                    style={{ color: "var(--rk-ter)" }}
                  >
                    &times;
                  </button>
                </div>

                <form onSubmit={onSubmit} noValidate>
                  <Field
                    id="bc-name"
                    name="name"
                    label="Name"
                    autoComplete="name"
                    error={errors.name}
                    inputRef={nameRef}
                  />
                  <Field
                    id="bc-email"
                    name="email"
                    label="Work email"
                    type="email"
                    autoComplete="email"
                    error={errors.email}
                  />
                  <div className="mt-[18px] flex flex-col gap-[7px]">
                    <label htmlFor="bc-message" className="text-[13px]" style={{ color: "var(--rk-sec)" }}>
                      What do you need?{" "}
                      <span style={{ color: "var(--rk-ter)" }}>Optional</span>
                    </label>
                    <textarea
                      id="bc-message"
                      name="message"
                      rows={3}
                      className="w-full rounded-xl border border-transparent p-3 text-[16px]"
                      style={{ background: "var(--rk-alt)", color: "var(--rk-ink)", minHeight: 78 }}
                    />
                  </div>

                  {status === "error" ? (
                    <p className="mt-3 text-[14px]" style={{ color: "#B3261E" }}>
                      That didn&apos;t send. Email us at{" "}
                      <a href={`mailto:${CONTACT.email}`} className="underline">
                        {CONTACT.email}
                      </a>{" "}
                      and we&apos;ll pick it up.
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    className="rk-btn mt-6 w-full"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending…" : "Send"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      ) : null}
    </BookCallContext.Provider>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  error,
  inputRef,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <div className="mt-[18px] flex flex-col gap-[7px]">
      <label htmlFor={id} className="text-[13px]" style={{ color: "var(--rk-sec)" }}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        ref={inputRef}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-xl p-3 text-[16px]"
        style={{
          background: "var(--rk-alt)",
          color: "var(--rk-ink)",
          border: `1px solid ${error ? "#B3261E" : "transparent"}`,
        }}
      />
      {error ? (
        <span id={`${id}-error`} className="text-[12px]" style={{ color: "#B3261E" }}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
