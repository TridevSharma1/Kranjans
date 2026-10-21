import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches all main public routes", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes("/about").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/programs").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/impact").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/events").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/gallery").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/volunteer").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/donate").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/contact").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/verify-id").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/verify-certificate").at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
