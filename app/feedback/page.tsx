"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  function buildWhatsAppUrl() {
    const text = [
      "Hi Treutis, I have some feedback:",
      "",
      message,
      "",
      `Name: ${name}`,
      `Contact: ${contact}`,
    ].join("\n");
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  }

  return (
    <main className="mx-auto max-w-[600px] px-[5vw] py-[6vw]">
      <h1 className="font-display mb-4 text-4xl uppercase">Feedback</h1>
      <p className="mb-8 text-sm leading-relaxed text-muted">
        Got a question, an issue with an order, or a suggestion? Send it
        straight to us on WhatsApp.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.open(buildWhatsAppUrl(), "_blank");
        }}
        className="flex flex-col gap-4"
      >
        <input
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-red"
        />
        <input
          required
          placeholder="Phone or email"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-red"
        />
        <textarea
          required
          placeholder="Your message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-red"
        />
        <button
          type="submit"
          className="bg-red px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider hover:bg-fg hover:text-bg"
        >
          Send on WhatsApp
        </button>
      </form>
    </main>
  );
}
