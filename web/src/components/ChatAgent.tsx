"use client";

import { FormEvent, useState } from "react";

type MessageRole = "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  suggestions?: string[];
}

interface KnowledgeEntry {
  id: string;
  keywords: string[];
  response: string;
}

const CONTACT = {
  phone: "03230093163",
  whatsapp: "03281451038",
  whatsappIntl: "923281451038",
  email: "ahmadoptical.pk@gmail.com",
};

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: "services",
    keywords: [
      "service",
      "offer",
      "what can you do",
      "help",
      "support",
      "consultation",
    ],
    response:
      "Ahmed Optical provides frame styling consultations, prescription lenses (single vision, bifocal, progressive, blue-light, and computer lenses), eye health screening with partner optometrists, and on-the-spot adjustments or repairs.",
  },
  {
    id: "frames",
    keywords: ["frame", "brand", "collection", "style", "rim", "material"],
    response:
      "Our frame wall covers designer and value lines including Ray-Ban, Prada, Emporio Armani, Ralph Lauren, Oakley, and light-weight titanium plus flex-hinge everyday frames. We curate by face shape and lifestyle so you always leave confident.",
  },
  {
    id: "lenses",
    keywords: [
      "lens",
      "glasses",
      "coating",
      "progressive",
      "bifocal",
      "blue",
      "transition",
      "antiglare",
    ],
    response:
      "We fit lenses from leading labs with anti-glare, UV, photochromic/Transitions, blue-shield for device use, and premium progressive designs. Express single-vision orders are ready in 45 minutes and complex prescriptions in 3-5 business days.",
  },
  {
    id: "sunglasses",
    keywords: ["sun", "sunglass", "uv", "polarized", "outdoor"],
    response:
      "Our sunglass bar features polarized protection, prescription-ready shades, and fashion-first drop releases. Ask about the Aidant Pick of the Week for bundled discounts.",
  },
  {
    id: "pricing",
    keywords: [
      "price",
      "cost",
      "budget",
      "afford",
      "installment",
      "payment",
    ],
    response:
      "Frames start at PKR 4,500 with premium designer lines from PKR 18,000. Single-vision lenses begin at PKR 3,000 and progressives at PKR 15,500. Bundle a frame + lenses to unlock seasonal savings, and pay via cash, card, or bank transfer.",
  },
  {
    id: "location",
    keywords: ["where", "location", "address", "find", "map", "near"],
    response:
      "Visit Ahmed Optical inside Gulberg Galleria, Main Boulevard Gulberg, Lahore. We are on the mezzanine level—look for the silver Aidant logo. There is valet parking and elevator access.",
  },
  {
    id: "hours",
    keywords: [
      "hour",
      "open",
      "close",
      "timing",
      "when",
      "time",
      "today",
      "weekend",
    ],
    response:
      "We are open daily from 10:00 AM to 9:00 PM, and until 11:00 PM on Fridays and Saturdays. Book fittings before 8:00 PM to guarantee same-day adjustments.",
  },
  {
    id: "appointment",
    keywords: ["appointment", "book", "schedule", "slot", "reserve"],
    response:
      "To book a styling or refraction session, share your preferred day and time. Aidant can pencil you in instantly and send a confirmation via WhatsApp or email.",
  },
  {
    id: "aftercare",
    keywords: ["warranty", "after", "care", "repair", "guarantee", "adjust"],
    response:
      "Every purchase includes 12 months of complimentary adjustments, nose-pad swaps, and screw tightening. Lens warranties cover manufacturing defects for 6 months.",
  },
  {
    id: "insurance",
    keywords: ["insurance", "reimburse", "claim", "panel"],
    response:
      "Need an insurance claim? We prepare stamped invoices, lensometry reports, and frame SKU sheets so you can submit to your provider without hassle.",
  },
  {
    id: "delivery",
    keywords: ["deliver", "courier", "ship", "home", "pickup"],
    response:
      "We offer complimentary delivery within Lahore and insured courier shipping nationwide. International shipping is available on request with DHL partners.",
  },
  {
    id: "children",
    keywords: ["kid", "child", "children", "junior", "teen"],
    response:
      "Ahmed Optical stocks playful junior frames with flexible hinges, impact-resistant polycarbonate lenses, and adjustable sports straps for active kids.",
  },
  {
    id: "eye exam",
    keywords: ["eye exam", "test", "checkup", "optometrist", "refraction"],
    response:
      "Our in-house optometrist partners provide computerized vision testing, refraction, and eye pressure screening. Walk-ins are welcome, and full exams take 20 minutes.",
  },
];

const SMALL_TALK: KnowledgeEntry[] = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "salam", "assalam", "good morning"],
    response:
      "Hi! I’m Aidant, the Ahmed Optical assistant. How can I brighten your view today?",
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "shukriya", "appreciate"],
    response:
      "Always a pleasure. Let me know if there’s anything else I can arrange for you.",
  },
  {
    id: "name",
    keywords: ["name", "who are you", "who am i chatting"],
    response:
      "I’m Aidant, your AI concierge for Ahmed Optical. I keep track of styles, services, and custom orders for you.",
  },
];

const DEFAULT_SUGGESTIONS = [
  "What services do you offer?",
  "Do you have blue-light lenses?",
  "How quickly can I get new glasses?",
];

const CONTACT_SUGGESTIONS = [
  "Book an appointment",
  "Share designer frame options",
  "Explain your lens warranties",
];

const generateId = () => crypto.randomUUID();

const normalize = (value: string) => value.toLowerCase();

const findMatch = (message: string, collection: KnowledgeEntry[]) => {
  const normalized = normalize(message);
  return collection.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  );
};

const craftResponse = (message: string) => {
  const trimmed = message.trim();
  if (!trimmed) {
    return {
      content:
        "Could you let me know what you’d like help with? Frames, lenses, or maybe an appointment?",
      suggestions: DEFAULT_SUGGESTIONS,
      handoff: false,
      contact: false,
    } as const;
  }

  const smallTalkMatch = findMatch(trimmed, SMALL_TALK);
  if (smallTalkMatch) {
    return {
      content: smallTalkMatch.response,
      suggestions: DEFAULT_SUGGESTIONS,
      handoff: false,
      contact: false,
    } as const;
  }

  const matches = KNOWLEDGE_BASE.filter((entry) =>
    entry.keywords.some((keyword) => normalize(trimmed).includes(keyword))
  );

  if (matches.length > 0) {
    const response = matches.map((entry) => entry.response).join(" \n\n");
    return {
      content: `${response} \n\nIf you’d like to connect with Ahmed directly, tap one of the contact buttons below.`,
      suggestions: CONTACT_SUGGESTIONS,
      handoff: true,
      contact: true,
    } as const;
  }

  return {
    content:
      "I can help with frame styling, lens options, booking exams, deliveries, and aftercare. Tell me what you need, or use the contact buttons to reach Ahmed right away.",
    suggestions: DEFAULT_SUGGESTIONS,
    handoff: true,
    contact: true,
  } as const;
};

export function ChatAgent() {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: generateId(),
      role: "assistant" as MessageRole,
      content:
        "Welcome to Ahmed Optical. I’m Aidant, your AI eyewear concierge. Ask me about frames, lenses, fittings, or anything you need.",
      suggestions: DEFAULT_SUGGESTIONS,
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const scrollToBottom = () => {
    const container = document.getElementById("aidant-chat-scroll");
    if (container) {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  };

  const pushMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
    scrollToBottom();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  const sendMessage = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || isProcessing) return;

    setInput("");
    pushMessage({ id: generateId(), role: "user", content: trimmed });
    setIsProcessing(true);

    const responsePayload = craftResponse(trimmed);

    setTimeout(() => {
      pushMessage({
        id: generateId(),
        role: "assistant",
        content: responsePayload.content,
        suggestions: responsePayload.suggestions,
      });
      setIsProcessing(false);
    }, 400);
  };

  return (
    <div className="chat-shell">
      <div className="chat-header">
        <div className="chat-avatar" aria-hidden>
          <span>AO</span>
        </div>
        <div>
          <p className="chat-title">Aidant • Ahmed Optical AI</p>
          <p className="chat-subtitle">
            Always-on help for frames, lenses, fittings &amp; care
          </p>
        </div>
      </div>

      <div className="chat-body" id="aidant-chat-scroll" role="log" aria-live="polite">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-bubble ${message.role === "assistant" ? "assistant" : "user"}`}
          >
            {message.content.split("\n").map((chunk, index) => (
              <p key={`${message.id}-${index}`}>{chunk}</p>
            ))}
            {message.role === "assistant" && message.suggestions && (
              <div className="suggestions">
                {message.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="suggestion-btn"
                    onClick={() => sendMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <form className="chat-input-row" onSubmit={handleSubmit}>
        <input
          className="chat-input"
          placeholder="Ask Aidant anything about Ahmed Optical..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={isProcessing}
        />
        <button className="chat-send" type="submit" disabled={isProcessing || !input.trim()}>
          {isProcessing ? "..." : "Send"}
        </button>
      </form>

      <div className="contact-actions">
        <a className="contact-btn primary" href={`tel:${CONTACT.phone}`}>
          Call {CONTACT.phone}
        </a>
        <a
          className="contact-btn secondary"
          href={`https://wa.me/${CONTACT.whatsappIntl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp {CONTACT.whatsapp}
        </a>
        <a className="contact-btn tertiary" href={`mailto:${CONTACT.email}`}>
          Email {CONTACT.email}
        </a>
      </div>
    </div>
  );
}
