/* global React, MjLink */

function Nav({ route, navigate }) {
  const links = [
    { label: "Work", to: "#/" },
    { label: "Writing", to: "#/writing" },
    { label: "About", to: "#/about" },
    { label: "Contact", to: "mailto:hello@example.com", external: true },
  ];

  const isActive = (to) => {
    if (to === "#/") return route === "#/" || route.startsWith("#/work");
    return route.startsWith(to);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "rgba(255, 253, 247, 0.85)",
        backdropFilter: "saturate(140%) blur(8px)",
        WebkitBackdropFilter: "saturate(140%) blur(8px)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "18px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            navigate("#/");
          }}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: "-0.012em",
            color: "var(--fg-primary)",
            textDecoration: "none",
            lineHeight: 1,
          }}
        >
          Miguel Jesus
        </a>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {links.map((l) => {
            const active = !l.external && isActive(l.to);
            return (
              <a
                key={l.label}
                href={l.to}
                onClick={(e) => {
                  if (!l.external) {
                    e.preventDefault();
                    navigate(l.to);
                  }
                }}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: active ? 500 : 400,
                  color: active ? "var(--accent)" : "var(--fg-secondary)",
                  textDecoration: "none",
                  transition: "color 180ms cubic-bezier(.2,.7,.2,1)",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = "var(--fg-primary)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = "var(--fg-secondary)";
                }}
              >
                {l.label}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

window.Nav = Nav;
