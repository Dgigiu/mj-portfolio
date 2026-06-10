/* global React, Eyebrow, MetaRow, MjLink */

// Placeholder case-study data. Real entries come from Miguel.
const WORK = [
  {
    slug: "linear-issue-view",
    year: "2022–2024",
    company: "Linear",
    title: "A patient migration to one issue view",
    summary: "Three years of opinions about how a list should feel — consolidated into a single view that didn't make anyone feel patronised.",
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

function Cover({ kind }) {
  if (kind === "blue") {
    return (
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 10",
          background: "linear-gradient(135deg, #0e0e0e 0%, #0088ff 70%, #74beff 100%)",
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
  return (
    <main>
      {/* Hero — restrained, typography only */}
      <section
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "96px 32px 64px",
        }}
      >
        <Eyebrow>Portfolio · 2026</Eyebrow>
        <h1
          className="mj-display-md"
          style={{
            margin: "0 0 20px",
            maxWidth: 720,
            textWrap: "balance",
          }}
        >
          I'm a product designer who's spent a decade making B2B tools feel native and trustworthy.
        </h1>
        <p
          className="mj-prose"
          style={{ margin: 0, maxWidth: 560, color: "var(--fg-secondary)" }}
        >
          Most recently at Linear, before that at Stripe and Atlassian. I write occasionally about the
          craft. Get in touch via <MjLink href="mailto:hello@example.com">email</MjLink>.
        </p>
      </section>

      {/* Work index */}
      <section
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 32px 80px",
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
