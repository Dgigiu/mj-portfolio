/* global React, Eyebrow, MjLink, Button */

function About() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "80px 32px 64px" }}>
      <Eyebrow>About</Eyebrow>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "180px 1fr",
          gap: 40,
          alignItems: "flex-start",
          marginBottom: 48,
        }}
      >
        <div
          style={{
            width: 180,
            height: 220,
            borderRadius: 8,
            overflow: "hidden",
            position: "relative",
            background: "linear-gradient(135deg, #0e0e0e 0%, #1a6bff 80%)",
          }}
        >
          <img
            src="../../assets/miguel-portrait.png"
            alt="Miguel"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              height: "100%",
              transform: "translateX(-50%)",
              objectFit: "cover",
              filter: "grayscale(1) contrast(1.05)",
              mixBlendMode: "luminosity",
            }}
          />
        </div>
        <div>
          <h1 className="mj-display-md" style={{ margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Miguel Jesus
          </h1>
          <p className="mj-prose" style={{ margin: "0 0 16px" }}>
            Product designer based in Lisbon. I work on B2B tools — the kind of software
            people use eight hours a day and develop opinions about.
          </p>
          <p className="mj-prose" style={{ margin: 0, color: "var(--fg-secondary)" }}>
            Currently at Linear, on the issue view. Previously at Stripe (Atlas) and Atlassian
            (Jira). I write occasionally about the craft — mostly about how to make small,
            obvious things that don't feel small or obvious by the time you've done them.
          </p>
        </div>
      </div>

      <section style={{ marginBottom: 48 }}>
        <h2 className="mj-h3" style={{ marginTop: 0, marginBottom: 16 }}>Selected experience</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            ["Linear",      "Lead designer, issue view", "2022 — present"],
            ["Stripe",      "Senior designer, Atlas",    "2020 — 2022"],
            ["Atlassian",   "Product designer, Jira",    "2018 — 2020"],
            ["Independent", "Various clients",           "2016 — 2018"],
          ].map(([co, role, when]) => (
            <div
              key={co}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr auto",
                gap: 16,
                paddingBottom: 12,
                borderBottom: "1px solid var(--border-subtle)",
                alignItems: "baseline",
              }}
            >
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 14 }}>{co}</span>
              <span className="mj-body-sm" style={{ color: "var(--fg-secondary)" }}>{role}</span>
              <span className="mj-caption">{when}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mj-h3" style={{ marginTop: 0, marginBottom: 16 }}>Get in touch</h2>
        <p className="mj-prose" style={{ margin: "0 0 20px", color: "var(--fg-secondary)" }}>
          Best way to reach me is email. I read everything; I respond to most things within a week.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Button variant="primary" href="mailto:hello@example.com">hello@example.com</Button>
          <Button variant="secondary" href="#">Read.cv profile</Button>
        </div>
      </section>
    </main>
  );
}

window.About = About;
