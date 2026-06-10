/* global React */
// Shared primitives for the portfolio UI kit.
// All styles drawn from ../../colors_and_type.css tokens.

const { useState, useEffect } = React;

function Eyebrow({ children, accent = false }) {
  return (
    <div
      className={accent ? "mj-eyebrow" : "mj-label"}
      style={{ marginBottom: 8 }}
    >
      {children}
    </div>
  );
}

function Tag({ children, current = false }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-sans)",
        fontSize: 12,
        padding: "3px 10px",
        borderRadius: 999,
        background: current ? "var(--accent-soft)" : "var(--bg-subtle)",
        color: current ? "#0058b0" : "var(--fg-secondary)",
        border: `1px solid ${current ? "var(--accent-line)" : "var(--border-subtle)"}`,
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  );
}

function MetaRow({ items }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: 13,
        color: "var(--fg-tertiary)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0 8px",
      }}
    >
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span aria-hidden="true">·</span>}
          <span>{it}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

function MjLink({ href, children, onClick, external = false, visited = false }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="mj-link"
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={visited ? { color: "var(--link-visited)" } : undefined}
    >
      {children}
      {external && (
        <span style={{ marginLeft: 2, opacity: 0.7 }} aria-hidden="true">↗</span>
      )}
    </a>
  );
}

function Button({ variant = "primary", children, onClick, href, ...rest }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
    padding: "11px 18px",
    borderRadius: 4,
    border: "1px solid transparent",
    cursor: "pointer",
    transition: "all 180ms cubic-bezier(.2,.7,.2,1)",
    textDecoration: "none",
  };
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--fg-on-accent)",
    },
    secondary: {
      background: "transparent",
      color: "var(--fg-primary)",
      borderColor: "var(--fg-primary)",
    },
    ghost: {
      background: "transparent",
      color: "var(--fg-primary)",
    },
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      style={{ ...base, ...variants[variant] }}
      onMouseEnter={(e) => {
        if (variant === "primary") e.currentTarget.style.background = "var(--accent-hover)";
        if (variant === "secondary") {
          e.currentTarget.style.background = "var(--fg-primary)";
          e.currentTarget.style.color = "var(--bg-canvas)";
        }
        if (variant === "ghost") e.currentTarget.style.background = "var(--bg-subtle)";
      }}
      onMouseLeave={(e) => {
        const v = variants[variant];
        e.currentTarget.style.background = v.background;
        e.currentTarget.style.color = v.color;
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        marginTop: 96,
        padding: "32px 0 56px",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: "-0.01em",
              color: "var(--fg-primary)",
              marginBottom: 6,
            }}
          >
            Miguel Jesus
          </div>
          <div className="mj-caption">Product designer · Lisbon</div>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <MjLink href="mailto:hello@example.com">Email</MjLink>
          <MjLink href="#" external>GitHub</MjLink>
          <MjLink href="#" external>Read.cv</MjLink>
          <MjLink href="#" external>LinkedIn</MjLink>
        </div>
      </div>
      <div
        style={{
          maxWidth: 960,
          margin: "32px auto 0",
          padding: "0 32px",
          fontFamily: "var(--font-sans)",
          fontSize: 12,
          color: "var(--fg-muted)",
        }}
      >
        © 2026 Miguel Jesus. Set in Aleo and Geist.
      </div>
    </footer>
  );
}

// Lightweight hash router — supports #/, #/work/<slug>, #/about
function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash || "#/");
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = (h) => {
    window.location.hash = h;
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  return [route, navigate];
}

Object.assign(window, {
  Eyebrow, Tag, MetaRow, MjLink, Button, Footer, useHashRoute,
});
