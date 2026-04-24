"use client";

import { useState, useRef, useEffect } from "react";

const SCHEDULE_LINK = "https://calendly.com/YOUR-LINK";
const MEMBER_LINK   = "https://www.lafarmbureau.org/join";

const AGENT = {
  name:  "Garrett Gardner",
  phone: "(225) 766-6565",
  email: "ggardner@sfbcic.com",
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

function renderContent(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBookCta, setShowBookCta] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (messages.length >= 8) setShowBookCta(true);
  }, [messages.length]);

  async function streamResponse(msgs: Message[]) {
    setIsLoading(true);
    let assistantText = "";

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: msgs }),
      });

      if (!res.ok) throw new Error("API error");
      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantText };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: `I ran into a connection issue. Please call Garrett at **${AGENT.phone}** or email **${AGENT.email}** — he'd love to help.`,
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  function startChat() {
    const opening = `Hey, glad you stopped by! I'm ${AGENT.name}'s Farm Bureau benefits assistant.\n\nI'll ask you a couple of quick questions and put together a personalized snapshot of the benefits that actually matter for your situation.\n\n**What's your first name, and which Louisiana parish are you in?**`;
    setMessages([{ role: "assistant", content: opening }]);
    setStarted(true);
  }

  async function sendMessage() {
    if (isLoading || !input.trim()) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    await streamResponse(updatedMessages);
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function autoResize(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }

  const showTyping =
    isLoading &&
    messages.length > 0 &&
    messages[messages.length - 1]?.role === "assistant" &&
    messages[messages.length - 1]?.content === "";

  return (
    <>
      <header>
        <div className="header-brand">
          <div className="header-logo">FB</div>
          <div className="header-text">
            <h1>Louisiana Farm Bureau Benefits</h1>
            <p>Personalized consultation with {AGENT.name}</p>
          </div>
        </div>
        <div className="header-contact">
          <a href={`tel:${AGENT.phone.replace(/\D/g, "")}`}>{AGENT.phone}</a>
          <a href={`mailto:${AGENT.email}`}>{AGENT.email}</a>
        </div>
      </header>

      {!started && (
        <section id="landing">
          <div className="bg-pattern" />
          <div className="landing-badge">🌾 Louisiana Farm Bureau Member Benefits</div>
          <h2 className="landing-headline">
            Louisiana Made.
            <span>Louisiana Protected.</span>
          </h2>
          <p className="landing-sub">
            Answer a few quick questions and find out exactly which Farm Bureau benefits were built
            for your life — farmer, landowner, or everyday Louisiana resident.
          </p>
          <div className="benefit-pills">
            <div className="pill"><span className="pill-icon">🚜</span> Up to $2,750 off Cat Equipment</div>
            <div className="pill"><span className="pill-icon">💊</span> Free Rx Discount Cards</div>
            <div className="pill"><span className="pill-icon">🏨</span> Up to 35% off Travel</div>
            <div className="pill"><span className="pill-icon">🌿</span> Support Louisiana Farmers</div>
            <div className="pill"><span className="pill-icon">🛡️</span> Free Portfolio Review</div>
            <div className="pill"><span className="pill-icon">🎟️</span> Tickets at Work Discounts</div>
          </div>
          <button className="cta-btn" onClick={startChat}>
            Find My Benefits — Free
          </button>
          <p className="trust-line">
            No pressure. No sales pitch. Just a neighborly conversation. · Serving all 64 Louisiana parishes.
          </p>
        </section>
      )}

      {started && (
        <section id="chat-screen">
          <div className="chat-header-bar">
            <div className="chat-avatar">FB</div>
            <div className="chat-header-info">
              <h3>Farm Bureau Benefits Assistant</h3>
              <p>Working alongside {AGENT.name} · Licensed LA Insurance Agent</p>
            </div>
            <div className="online-dot" />
          </div>

          <div id="messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.role === "user" ? "user" : "bot"}`}>
                <div className="msg-avatar">{msg.role === "user" ? "👤" : "FB"}</div>
                <div
                  className="msg-bubble"
                  dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
                />
              </div>
            ))}
            {showTyping && (
              <div className="msg bot">
                <div className="msg-avatar">FB</div>
                <div className="typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <textarea
              ref={textareaRef}
              id="user-input"
              placeholder="Type your response..."
              rows={1}
              value={input}
              disabled={isLoading}
              onChange={(e) => { setInput(e.target.value); autoResize(e.target); }}
              onKeyDown={handleKey}
            />
            <button
              id="send-btn"
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
          <p className="input-hint">Press Enter to send · Shift+Enter for new line</p>

          <div className="member-cta-wrap">
            <a href={MEMBER_LINK} target="_blank" rel="noopener noreferrer" className="member-btn">
              🌾 Become a Member
            </a>
          </div>

          {showBookCta && (
            <div className="book-cta">
              <h4>Ready to button up your portfolio?</h4>
              <p>
                Garrett offers free 15-minute portfolio reviews for all Farm Bureau members
                and prospects — no obligation, no pressure.
              </p>
              <div className="book-cta-btns">
                <a href={`tel:${AGENT.phone.replace(/\D/g, "")}`} className="book-btn primary">
                  📞 Call Garrett Now
                </a>
                <a href={`mailto:${AGENT.email}`} className="book-btn secondary">
                  ✉️ Send an Email
                </a>
              </div>
            </div>
          )}
        </section>
      )}

      <footer>
        <p>
          <strong style={{ color: "var(--white)" }}>{AGENT.name}</strong>
          &nbsp;·&nbsp;Louisiana Farm Bureau Insurance Agent&nbsp;·&nbsp;
          <a href={`tel:${AGENT.phone.replace(/\D/g, "")}`}>{AGENT.phone}</a>
          &nbsp;·&nbsp;
          <a href={`mailto:${AGENT.email}`}>{AGENT.email}</a>
        </p>
        <p style={{ marginTop: "5px", fontSize: "11px", color: "#6B9E80" }}>
          Serving Louisiana families and farmers across all 64 parishes.
        </p>
      </footer>
    </>
  );
}
