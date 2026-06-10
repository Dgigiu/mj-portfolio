/* global React, Eyebrow, MetaRow, MjLink, Button, WORK */

const CASE_BODY = {
  "linear-issue-view": [
    { kind: "para", text: "Linear's issue view had been worked on by three teams over three years. By the time I joined, it had grown to support sub-issues, projects, parent-child relations, cycles, statuses, labels, and a half-dozen layout modes — most of them added one at a time, in response to a single customer's specific shape." },
    { kind: "para", text: "The brief was simple to write down and hard to do: keep all of it, surface less of it. The view needed to feel like one thing again." },
    { kind: "h", text: "What we were actually fixing" },
    { kind: "para", text: "Most of the friction wasn't visual. It was that the view answered too many questions at once. We did an audit — every element on screen, what it does, who needs it, how often. Forty percent of the screen was for fewer than ten percent of sessions." },
    { kind: "figure", caption: "Audit pass — every cell on the issue view annotated by usage frequency. Cool tones are below 10%.", kind2: "ink" },
    { kind: "para", text: "From there the work split into three tracks: condense the persistent chrome, defer the rare controls to a secondary surface, and make the remaining hierarchy readable at a glance." },
    { kind: "h", text: "What I'd do differently" },
    { kind: "para", text: "I would have shipped the keyboard model first. We spent four weeks on the visual condensation before realising the people who lived in this view all day were not looking at it — they were typing through it. The visual work was correct but it was the wrong order." },
  ],
  "stripe-atlas-onboarding": [
    { kind: "para", text: "Stripe Atlas helps founders incorporate a U.S. company from anywhere. By the time someone reaches it, they've usually already paid — and then they hit a 47-field intake form." },
    { kind: "para", text: "The completion rate at step one was high. By step four it had collapsed. People weren't abandoning because the questions were hard; they were abandoning because there was no signal that any progress was being saved." },
    { kind: "figure", caption: "Before: one long page, no checkpoints. After: nine logical sections, each one savable and resumable.", kind2: "paper" },
    { kind: "h", text: "Trust signals over progress bars" },
    { kind: "para", text: "We added explicit save states (\"Saved at 14:32\"), summary checkpoints every three steps, and a clear \"come back later\" path that emailed a resume link. Completion rose without changing a single field." },
  ],
  "atlassian-workflows": [
    { kind: "para", text: "Jira's workflow builder was a power tool that assumed you were a power user. I spent two years rebuilding it for the teams who weren't." },
    { kind: "figure", caption: "Workflow editor — a 2D canvas became a vertical list with conditional branches.", kind2: "blue" },
    { kind: "para", text: "The breakthrough was treating workflows as recipes, not diagrams. Most teams want \"when X, then Y\" — the canvas was the wrong abstraction." },
  ],
};

function Figure({ caption, coverKind }) {
  let preview;
  if (coverKind === "blue") {
    preview = (
      <div style={{
        width: "100%", aspectRatio: "16/9",
        background: "linear-gradient(135deg,#0e0e0e 0%,#1a6bff 70%,#82a8ff 100%)",
        borderRadius: 8,
      }} />
    );
  } else if (coverKind === "paper") {
    preview = (
      <div style={{
        width: "100%", aspectRatio: "16/9",
        background: "var(--bg-subtle)", borderRadius: 8,
        border: "1px solid var(--border-subtle)",
      }} />
    );
  } else {
    preview = (
      <div style={{
        width: "100%", aspectRatio: "16/9",
        background: "var(--ink-900)", borderRadius: 8,
      }} />
    );
  }
  return (
    <figure style={{ margin: "40px 0" }}>
      {preview}
      <figcaption
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 14,
          fontStyle: "italic",
          color: "var(--fg-tertiary)",
          marginTop: 12,
          maxWidth: 560,
          lineHeight: 1.6,
        }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

function CaseStudy({ slug, navigate }) {
  const entry = WORK.find((w) => w.slug === slug);
  if (!entry) {
    return (
      <main style={{ maxWidth: 640, margin: "0 auto", padding: "96px 32px" }}>
        <Eyebrow>404</Eyebrow>
        <h1 className="mj-h1" style={{ marginTop: 0 }}>Not found</h1>
        <p className="mj-prose" style={{ color: "var(--fg-secondary)" }}>
          That case study doesn't exist. <MjLink href="#/" onClick={(e) => { e.preventDefault(); navigate("#/"); }}>Back to work</MjLink>.
        </p>
      </main>
    );
  }

  const body = CASE_BODY[slug] || [];
  const idx = WORK.findIndex((w) => w.slug === slug);
  const prev = WORK[idx - 1];
  const next = WORK[idx + 1];

  return (
    <main>
      {/* Header */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "80px 32px 32px" }}>
        <a
          href="#/"
          onClick={(e) => { e.preventDefault(); navigate("#/"); }}
          style={{
            fontFamily: "var(--font-sans)", fontSize: 13,
            color: "var(--fg-tertiary)", textDecoration: "none",
            marginBottom: 32, display: "inline-block",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg-primary)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-tertiary)"}
        >
          ← All work
        </a>
        <Eyebrow accent>{`Case study · ${entry.year}`}</Eyebrow>
        <h1
          className="mj-display-md"
          style={{ margin: "0 0 20px", letterSpacing: "-0.022em", textWrap: "balance" }}
        >
          {entry.title}
        </h1>
        <p className="mj-prose" style={{ margin: 0, color: "var(--fg-secondary)" }}>
          {entry.summary}
        </p>
        <div style={{ marginTop: 24 }}>
          <MetaRow items={[entry.company, entry.role, ...entry.tags]} />
        </div>
      </section>

      {/* Body */}
      <article
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "32px 32px 96px",
        }}
      >
        {body.map((b, i) => {
          if (b.kind === "h") {
            return (
              <h2
                key={i}
                className="mj-h2"
                style={{ marginTop: 56, marginBottom: 16, letterSpacing: "-0.012em" }}
              >
                {b.text}
              </h2>
            );
          }
          if (b.kind === "figure") {
            return (
              <div key={i} style={{ marginLeft: -40, marginRight: -40 }}>
                <Figure caption={b.caption} coverKind={b.kind2} />
              </div>
            );
          }
          return (
            <p
              key={i}
              className="mj-prose"
              style={{ margin: "0 0 24px", textWrap: "pretty" }}
            >
              {b.text}
            </p>
          );
        })}
      </article>

      {/* Prev / next */}
      <section
        style={{
          maxWidth: 960, margin: "0 auto",
          padding: "0 32px 40px",
          borderTop: "1px solid var(--border-subtle)",
          paddingTop: 32,
          display: "flex",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        {prev ? (
          <a
            href={`#/work/${prev.slug}`}
            onClick={(e) => { e.preventDefault(); navigate(`#/work/${prev.slug}`); }}
            style={{ textDecoration: "none", color: "inherit", maxWidth: 320 }}
          >
            <div className="mj-label" style={{ marginBottom: 6 }}>← Previous</div>
            <div className="mj-h4" style={{ color: "var(--fg-primary)" }}>{prev.title}</div>
          </a>
        ) : <div />}
        {next ? (
          <a
            href={`#/work/${next.slug}`}
            onClick={(e) => { e.preventDefault(); navigate(`#/work/${next.slug}`); }}
            style={{ textDecoration: "none", color: "inherit", textAlign: "right", maxWidth: 320 }}
          >
            <div className="mj-label" style={{ marginBottom: 6 }}>Next →</div>
            <div className="mj-h4" style={{ color: "var(--fg-primary)" }}>{next.title}</div>
          </a>
        ) : <div />}
      </section>
    </main>
  );
}

window.CaseStudy = CaseStudy;
