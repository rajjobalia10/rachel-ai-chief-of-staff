import { useRef, useState } from "react";

export function InviteForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const requestId = useRef(null);
  const submitting = useRef(false);

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setStatus("sending");
    setError("");
    requestId.current ??= crypto.randomUUID();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, requestId: requestId.current }),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error("request_failed");
      setStatus("sent");
    } catch {
      setError("Your request could not be sent. Please try again, or email raj@rivesa.ai.");
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  if (status === "sent") return (
    <div className="invite-success" role="status">
      <h2>Request received.</h2>
      <p>Thank you for your interest in Rachel. We’ll contact you by email about your invitation.</p>
      <a href="/pricing">Explore the plans</a>
    </div>
  );

  return (
    <form className="invite-form" onSubmit={submit} aria-label="Request an invitation">
      <label htmlFor="invite-name">Name</label>
      <input id="invite-name" name="name" autoComplete="name" required maxLength={100} placeholder="Your name" />
      <label htmlFor="invite-email">Email</label>
      <input id="invite-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" />
      <label htmlFor="invite-message">What would you like Rachel to help with? <span>(optional)</span></label>
      <textarea id="invite-message" name="message" rows={3} maxLength={2000} placeholder="A little about what you have in mind" />
      <div className="invite-honeypot" aria-hidden="true">
        <label htmlFor="invite-website">Website</label>
        <input id="invite-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="invite-note">We’ll use these details to respond to your request. Requesting an invite does not start a subscription.</p>
      {error && <p className="invite-error" role="alert">{error}</p>}
      <button className="invite-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request an invite"}</button>
    </form>
  );
}
