import type { EventContext } from "@cloudflare/workers-types";

// Cloudflare Response tipini açıkça sabitle (DOM Response ile karışmasın)
type CFResponse = import("@cloudflare/workers-types").Response;

type Fetcher = {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<CFResponse>;
};

type Env = {
  ASSETS: Fetcher;
};

export async function onRequest(
  context: EventContext<Env, string, unknown>
): Promise<CFResponse> {
  const { request, env } = context;

  const url = new URL(request.url);
  const pathname = url.pathname;

  const STATIC_EXTENSIONS = [
    ".css",
    ".js",
    ".png",
    ".jpg",
    ".jpeg",
    ".svg",
    ".webp",
    ".ico",
    ".json",
    ".txt",
    ".xml",
  ] as const;

  const isStatic =
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname.startsWith("/assets/") ||
    STATIC_EXTENSIONS.some((ext) => pathname.endsWith(ext));

  const res = await env.ASSETS.fetch(request);

  if (isStatic || res.status !== 404) return res;

  return env.ASSETS.fetch(new URL("/index.html", url));
}
