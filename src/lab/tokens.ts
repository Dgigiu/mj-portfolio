// Reads tokens.css as text so the lab always documents the live file:
// groups come from the "── Group ──" section comments, notes from the
// trailing comment on each declaration.
import raw from "../styles/tokens.css?raw";

export interface Token {
  name: string;
  value: string;
  note?: string;
  dark?: string;
}

export interface TokenGroup {
  title: string;
  tokens: Token[];
}

const blockAfter = (marker: string) => {
  const start = raw.indexOf("{", raw.indexOf(marker)) + 1;
  return raw.slice(start, raw.indexOf("}", start));
};

const declaration = /^\s*(--[\w-]+):\s*([^;]+);\s*(?:\/\*\s*(.*?)\s*\*\/)?/;
const heading = /\/\*\s*──\s*(.+?)\s*[─(]/;

const parseDark = () => {
  const values = new Map<string, string>();
  for (const line of blockAfter('.theme-dark').split("\n")) {
    const m = line.match(declaration);
    if (m) values.set(m[1], m[2].trim());
  }
  return values;
};

export const parseTokens = (): TokenGroup[] => {
  const dark = parseDark();
  const groups: TokenGroup[] = [];
  let current: TokenGroup | undefined;

  for (const line of blockAfter(":root {").split("\n")) {
    const h = line.match(heading);
    if (h) {
      current = { title: h[1].trim(), tokens: [] };
      groups.push(current);
      continue;
    }
    const m = line.match(declaration);
    if (!m || !current) continue;
    current.tokens.push({
      name: m[1],
      value: m[2].trim(),
      note: m[3] || undefined,
      dark: dark.get(m[1]),
    });
  }
  return groups;
};

export const tokenCount = () => parseTokens().reduce((n, g) => n + g.tokens.length, 0);
