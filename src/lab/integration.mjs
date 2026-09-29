// Design lab: a Storybook-style workbench for the design system, served
// only by `astro dev`. Routes are injected here instead of living in
// src/pages so they never reach the production build or the sitemap.

const routes = [
  ["/lab", "index.astro"],
  ["/lab/tokens", "tokens.astro"],
  ["/lab/type", "type.astro"],
  ["/lab/components", "components.astro"],
  ["/lab/playground", "playground.astro"],
  ["/lab/viewports", "viewports.astro"],
];

export default function lab() {
  return {
    name: "mj-lab",
    hooks: {
      "astro:config:setup": ({ command, injectRoute }) => {
        if (command !== "dev") return;
        for (const [pattern, file] of routes) {
          injectRoute({ pattern, entrypoint: `./src/lab/pages/${file}` });
        }
      },
    },
  };
}
