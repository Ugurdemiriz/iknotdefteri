export async function onRequest(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Statik dosyalar (sitemap, robots, assets vs.) normal servis edilsin
  // (extensions listesi genişletilebilir)
  const isStatic =
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname.startsWith("/assets/") ||
    pathname.includes(".");

  if (isStatic) {
    return env.ASSETS.fetch(request);
  }

  // Önce normal asset dene
  const res = await env.ASSETS.fetch(request);

  // Eğer 404 ise SPA için index.html döndür
  if (res.status === 404) {
    return env.ASSETS.fetch(new Request(new URL("/index.html", url), request));
  }

  return res;
}
