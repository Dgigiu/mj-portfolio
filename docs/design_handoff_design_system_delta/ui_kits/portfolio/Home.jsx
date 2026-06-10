/* global React, Eyebrow, MetaRow, MjLink */

// Placeholder case-study data. Real entries come from Miguel.
const WORK = [
  {
    slug: "linear-issue-view",
    year: "2022–2024",
    company: "Linear",
    title: "A patient migration to one issue view",
    summary: "Three years of opinions about how a list should feel, consolidated into a single view that didn't make anyone feel patronised.",
    role: "Lead designer",
    tags: ["Product design", "B2B"],
    cover: "ink",
  },
  {
    slug: "stripe-atlas-onboarding",
    year: "2020–2022",
    company: "Stripe",
    title: "Onboarding without a wall of forms",
    summary: "Atlas was asking founders for 47 fields in a row. The work was breaking that into something you could trust to come back to.",
    role: "Senior designer",
    tags: ["Product design", "Onboarding"],
    cover: "paper",
  },
  {
    slug: "atlassian-workflows",
    year: "2018–2020",
    company: "Atlassian",
    title: "Workflows that don't fight you",
    summary: "A redesign of Jira's automation builder for teams who don't have a power user on staff.",
    role: "Product designer",
    tags: ["Tooling", "Enterprise"],
    cover: "blue",
  },
];

/* ──────────────────────────────────────────────────────────────
   Hero — the system's one permitted dramatic moment.
   Full-bleed accent blue, duotone portrait, big serif statement.
   ────────────────────────────────────────────────────────────── */
function Hero({ onScrollDown }) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "min(720px, 88vh)",
        background: "var(--accent)",
        color: "#fff",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Portrait, anchored right, duotone via luminosity blend */}
      <img
        src="../../assets/miguel-portrait.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          height: "100%",
          width: "min(62%, 980px)",
          objectFit: "cover",
          objectPosition: "center right",
          mixBlendMode: "luminosity",
          filter: "contrast(1.05)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Deep navy vignette top-left for text legibility */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 90% at 0% 0%, rgba(8,14,32,0.85) 0%, rgba(8,14,32,0.55) 28%, rgba(8,14,32,0) 60%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Bottom hairline (continues the page's quiet vocabulary) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
          background: "rgba(255,255,255,0.18)",
          zIndex: 3,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 4,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "120px 32px 96px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 640px) 1fr",
          gap: 48,
          minHeight: "min(720px, 88vh)",
          alignItems: "center",
        }}
      >
        <div>
          <div
            className="mj-eyebrow"
            style={{
              color: "rgba(255,255,255,0.78)",
              marginBottom: 24,
            }}
          >
            Portfolio · 2026
          </div>

          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(48px, 7.2vw, 96px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              margin: "0 0 28px",
              color: "#fff",
              textWrap: "balance",
            }}
          >
            Hi, I'm Miguel.
          </h1>

          <p
            className="mj-prose"
            style={{
              margin: "0 0 36px",
              maxWidth: 520,
              color: "rgba(255,255,255,0.92)",
              fontSize: "var(--text-lg)",
              lineHeight: 1.55,
            }}
          >
            Product designer. Twenty years of making B2B tools that feel native and trustworthy. Most
            recently at Linear, before that at Stripe and Atlassian.
          </p>

          {/* Quiet keylines under the prose — a meta strip */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "6px 12px",
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              letterSpacing: "0.01em",
              color: "rgba(255,255,255,0.78)",
            }}
          >
            <span>Lisbon</span>
            <span aria-hidden="true">·</span>
            <span>Available for senior IC and lead roles</span>
            <span aria-hidden="true">·</span>
            <a
              href="mailto:hello@example.com"
              style={{
                color: "#fff",
                textDecoration: "underline",
                textDecorationColor: "rgba(255,255,255,0.55)",
                textUnderlineOffset: 3,
              }}
            >
              hello@example.com
            </a>
          </div>
        </div>

        {/* right column intentionally empty — portrait sits in the absolute layer */}
        <div aria-hidden="true" />
      </div>

      {/* Scroll affordance */}
      <button
        type="button"
        onClick={onScrollDown}
        aria-label="Scroll to work"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 28,
          transform: "translateX(-50%)",
          zIndex: 5,
          background: "transparent",
          border: 0,
          padding: 8,
          cursor: "pointer",
          color: "rgba(255,255,255,0.85)",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-sans)",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <span>Selected work</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   Work index — quietly restrained, lets the hero shout.
   ────────────────────────────────────────────────────────────── */
function Cover({ kind }) {
  if (kind === "blue") {
    return (
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 10",
          background: "linear-gradient(135deg, #0e0e0e 0%, #1a6bff 70%, #82a8ff 100%)",
          borderRadius: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 75% 30%, rgba(255,255,255,0.18), transparent 55%)",
          }}
        />
      </div>
    );
  }
  if (kind === "paper") {
    return (
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 10",
          background: "var(--bg-subtle)",
          borderRadius: 8,
          border: "1px solid var(--border-subtle)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "20% 30% auto auto",
            width: "30%",
            height: "55%",
            background: "var(--paper-50)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "auto auto 18% 20%",
            width: "45%",
            height: "32%",
            background: "var(--paper-50)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 4,
          }}
        />
      </div>
    );
  }
  // ink
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 10",
        background: "var(--ink-900)",
        borderRadius: 8,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "15% 0 auto 8%",
          fontFamily: "var(--font-mono)",
          color: "var(--accent)",
          fontSize: 11,
          opacity: 0.85,
        }}
      >
        ENG-2419 · Search response time
      </div>
      <div
        style={{
          position: "absolute",
          inset: "30% 8% auto 8%",
          height: 1,
          background: "rgba(255,255,255,0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "40% 12% auto 8%",
          height: 1,
          background: "rgba(255,255,255,0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "50% 8% auto 8%",
          height: 1,
          background: "rgba(255,255,255,0.08)",
        }}
      />
    </div>
  );
}

function WorkRow({ entry, onOpen }) {
  return (
    <a
      href={`#/work/${entry.slug}`}
      onClick={(e) => {
        e.preventDefault();
        onOpen(entry.slug);
      }}
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: 28,
        padding: "32px 0",
        borderTop: "1px solid var(--border-subtle)",
        textDecoration: "none",
        color: "inherit",
        transition: "background 180ms cubic-bezier(.2,.7,.2,1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--bg-subtle)";
        e.currentTarget.style.paddingLeft = "16px";
        e.currentTarget.style.paddingRight = "16px";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.paddingLeft = "0";
        e.currentTarget.style.paddingRight = "0";
      }}
    >
      <Cover kind={entry.cover} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow>{`Case study · ${entry.year}`}</Eyebrow>
        <h3 className="mj-h2" style={{ margin: "0 0 10px", letterSpacing: "-0.015em" }}>
          {entry.title}
        </h3>
        <p
          className="mj-body"
          style={{ margin: "0 0 14px", color: "var(--fg-secondary)", maxWidth: 580 }}
        >
          {entry.summary}
        </p>
        <MetaRow items={[entry.company, entry.role, ...entry.tags]} />
      </div>
    </a>
  );
}

function Home({ navigate }) {
  const workRef = React.useRef(null);
  const scrollToWork = () => {
    if (workRef.current) {
      window.scrollTo({
        top: workRef.current.getBoundingClientRect().top + window.scrollY - 24,
        behavior: "smooth",
      });
    }
  };

  return (
    <main>
      <Hero onScrollDown={scrollToWork} />

      {/* Work index */}
      <section
        ref={workRef}
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "96px 32px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <h2 className="mj-h3" style={{ margin: 0 }}>Selected work</h2>
          <span className="mj-caption">{WORK.length} case studies</span>
        </div>
        <div>
          {WORK.map((w) => (
            <WorkRow key={w.slug} entry={w} onOpen={(slug) => navigate(`#/work/${slug}`)} />
          ))}
          <div style={{ borderTop: "1px solid var(--border-subtle)" }} />
        </div>
      </section>
    </main>
  );
}

window.Home = Home;
window.WORK = WORK;
