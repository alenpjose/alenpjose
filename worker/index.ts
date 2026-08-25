/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

const VISITOR_COOKIE = "apj_visitor";

function visitorIdFromCookie(request: Request): string | null {
  const cookies = request.headers.get("cookie") ?? "";
  const match = cookies.match(/(?:^|;\s*)apj_visitor=([a-zA-Z0-9-]+)/);
  return match?.[1] ?? null;
}

function browserFamily(userAgent: string): string {
  if (/Edg\//.test(userAgent)) return "Edge";
  if (/Firefox\//.test(userAgent)) return "Firefox";
  if (/CriOS\//.test(userAgent)) return "Chrome (iOS)";
  if (/Chrome\//.test(userAgent)) return "Chrome";
  if (/Safari\//.test(userAgent)) return "Safari";
  return "Other";
}

function deviceClass(userAgent: string): string {
  if (/iPad|Tablet|Android(?!.*Mobile)/i.test(userAgent)) return "Tablet";
  if (/Mobile|iPhone|Android/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

function referrerDomain(request: Request): string | null {
  const value = request.headers.get("referer");
  if (!value) return null;
  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return hostname === new URL(request.url).hostname.toLowerCase() ? "Direct / internal" : hostname;
  } catch {
    return null;
  }
}

async function recordVisit(request: Request, env: Env, visitorId: string) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const cf = (request as Request & { cf?: Record<string, unknown> }).cf;
  const textValue = (value: unknown) => typeof value === "string" && value ? value : null;
  await env.DB.prepare(
    `INSERT INTO visits
      (occurred_at, visitor_id, path, country, region, city, device, browser, referrer_domain)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      Date.now(),
      visitorId,
      new URL(request.url).pathname,
      textValue(cf?.country) ?? request.headers.get("cf-ipcountry"),
      textValue(cf?.region),
      textValue(cf?.city),
      deviceClass(userAgent),
      browserFamily(userAgent),
      referrerDomain(request),
    )
    .run();
}

type NamedCount = { name: string; count: number };

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char] ?? char);
}

function rows(result: D1Result<unknown>): NamedCount[] {
  return result.results.map((row) => {
    const item = row as Record<string, unknown>;
    return { name: String(item.name), count: Number(item.count) };
  });
}

function breakdown(title: string, items: NamedCount[]): string {
  const max = Math.max(...items.map((item) => item.count), 1);
  const content = items.length
    ? `<ol>${items.map((item) => `<li><div><span>${escapeHtml(item.name)}</span><strong>${item.count.toLocaleString()}</strong></div><i style="width:${(item.count / max) * 100}%"></i></li>`).join("")}</ol>`
    : `<p class="empty">No visits recorded yet.</p>`;
  return `<section class="panel"><h2>${title}</h2>${content}</section>`;
}

function ownerEmail(request: Request): string | null {
  return request.headers.get("oai-authenticated-user-email")?.toLowerCase() ?? null;
}

function requireOwner(request: Request): Response | null {
  const email = ownerEmail(request);
  if (!email) return Response.redirect(new URL("/signin-with-chatgpt?return_to=%2Fsettings", request.url), 302);
  if (email !== "alencentennial@gmail.com") return Response.redirect(new URL("/", request.url), 302);
  return null;
}

async function sourceDownloadResponse(request: Request, env: Env): Promise<Response> {
  const denied = requireOwner(request);
  if (denied) return denied;
  const asset = await env.ASSETS.fetch(new Request(new URL("/private/alenpjose-source.zip", request.url)));
  if (!asset.ok) return new Response("Source archive unavailable", { status: 404 });
  const response = new Response(asset.body, asset);
  response.headers.set("content-type", "application/zip");
  response.headers.set("content-disposition", 'attachment; filename="alenpjose-source.zip"');
  response.headers.set("cache-control", "private, no-store");
  return response;
}

async function settingsResponse(request: Request, env: Env): Promise<Response> {
  const denied = requireOwner(request);
  if (denied) return denied;

  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  const torontoDate = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const todayStart = Date.parse(`${torontoDate}T00:00:00-04:00`);
  const [summary, returning, countries, devices, browsers, referrers, daily] = await env.DB.batch([
    env.DB.prepare(`SELECT COUNT(*) AS totalViews, COUNT(DISTINCT visitor_id) AS uniqueVisitors,
      SUM(CASE WHEN occurred_at >= ? THEN 1 ELSE 0 END) AS views30Days,
      COUNT(DISTINCT CASE WHEN occurred_at >= ? THEN visitor_id END) AS visitors30Days,
      SUM(CASE WHEN occurred_at >= ? THEN 1 ELSE 0 END) AS todayViews FROM visits`).bind(thirtyDaysAgo, thirtyDaysAgo, todayStart),
    env.DB.prepare(`SELECT COUNT(*) AS count FROM (SELECT visitor_id FROM visits GROUP BY visitor_id HAVING COUNT(*) > 1)`),
    env.DB.prepare(`SELECT COALESCE(country, 'Unknown') AS name, COUNT(*) AS count FROM visits WHERE occurred_at >= ? GROUP BY country ORDER BY count DESC LIMIT 8`).bind(thirtyDaysAgo),
    env.DB.prepare(`SELECT device AS name, COUNT(*) AS count FROM visits WHERE occurred_at >= ? GROUP BY device ORDER BY count DESC`).bind(thirtyDaysAgo),
    env.DB.prepare(`SELECT browser AS name, COUNT(*) AS count FROM visits WHERE occurred_at >= ? GROUP BY browser ORDER BY count DESC`).bind(thirtyDaysAgo),
    env.DB.prepare(`SELECT COALESCE(referrer_domain, 'Direct / unknown') AS name, COUNT(*) AS count FROM visits WHERE occurred_at >= ? GROUP BY referrer_domain ORDER BY count DESC LIMIT 8`).bind(thirtyDaysAgo),
    env.DB.prepare(`SELECT strftime('%Y-%m-%d', occurred_at / 1000, 'unixepoch') AS name, COUNT(*) AS count FROM visits WHERE occurred_at >= ? GROUP BY name ORDER BY name ASC`).bind(thirtyDaysAgo),
  ]);
  const totals = (summary.results[0] ?? {}) as Record<string, number>;
  const returningCount = Number(((returning.results[0] ?? {}) as Record<string, number>).count ?? 0);
  const dailyRows = rows(daily);
  const chartMax = Math.max(...dailyRows.map((item) => item.count), 1);
  const metric = (label: string, value: number, note: string) => `<article><span>${label}</span><strong>${value.toLocaleString()}</strong><small>${note}</small></article>`;
  const chart = dailyRows.length
    ? dailyRows.map((item) => `<div class="day" title="${escapeHtml(item.name)}: ${item.count} views"><span>${item.count}</span><i style="height:${Math.max((item.count / chartMax) * 100, 4)}%"></i><small>${escapeHtml(item.name.slice(5))}</small></div>`).join("")
    : `<p class="empty">Analytics will appear after the next visit.</p>`;

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Portfolio analytics | Alen P. Jose</title><style>
  :root{--ink:#1b1813;--card:#242019;--line:#3a352a;--paper:#ece7dd;--accent:#e2701f}*{box-sizing:border-box}body{margin:0;background:var(--ink);color:var(--paper);font-family:Helvetica Neue,Arial,sans-serif}a{color:inherit;text-decoration:none}a:hover{color:var(--accent)}main{min-height:100vh;padding:clamp(28px,5vw,72px)}header{display:flex;justify-content:space-between;gap:28px;align-items:flex-end;padding-bottom:28px;border-bottom:1px solid var(--line)}.kicker{margin:0 0 10px;color:#c24a1e;font:11px monospace;letter-spacing:.18em;text-transform:uppercase}h1,h2{margin:0;font-family:Georgia,serif;font-weight:500}h1{font-size:clamp(42px,6vw,72px)}header nav{display:flex;gap:18px;font:11px monospace;text-transform:uppercase}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;margin-top:34px;background:var(--line);border:1px solid var(--line)}.metrics article{display:flex;min-height:180px;flex-direction:column;padding:24px;background:var(--card)}.metrics span,.privacy span{color:#9d9585;font:10px monospace;letter-spacing:.12em;text-transform:uppercase}.metrics strong{margin:auto 0 6px;color:var(--accent);font:500 clamp(40px,5vw,64px) Georgia,serif}.metrics small{color:#80786b;font:10px monospace}.trend,.panel,.privacy{background:var(--card);border:1px solid var(--line)}.trend{margin-top:24px;padding:26px}.trend>div:first-child{display:flex;justify-content:space-between;align-items:baseline}.trend h2,.panel h2{font-size:25px}.trend p{margin:0;color:#80786b;font:10px monospace;text-transform:uppercase}.chart{display:flex;height:220px;gap:5px;align-items:flex-end;margin-top:30px;overflow-x:auto}.day{display:grid;min-width:18px;height:100%;flex:1;grid-template-rows:18px 1fr 24px;align-items:end;text-align:center}.day span,.day small{color:#81796c;font:8px monospace}.day i{display:block;min-height:4px;background:#c24a1e}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:24px}.panel{padding:26px}.panel ol{display:grid;gap:18px;margin:24px 0 0;padding:0;list-style:none}.panel li div{display:flex;justify-content:space-between;gap:18px;margin-bottom:8px;font-size:13px}.panel li i{display:block;height:4px;background:#c24a1e}.panel li strong{font:11px monospace}.empty{color:#81796c}.privacy{display:grid;grid-template-columns:180px 1fr;gap:32px;align-items:center;margin-top:24px;padding:26px}.privacy div{display:grid;gap:8px}.privacy strong{color:var(--accent);font:500 48px Georgia,serif}.privacy p{max-width:76ch;margin:0;color:#aaa293;font-size:13px;line-height:1.65}@media(max-width:850px){.metrics{grid-template-columns:repeat(2,1fr)}.grid{grid-template-columns:1fr}}@media(max-width:560px){header{align-items:flex-start;flex-direction:column}.metrics{grid-template-columns:1fr}.metrics article{min-height:150px}.privacy{grid-template-columns:1fr}}
  </style></head><body><main><header><div><p class="kicker">Private settings</p><h1>Portfolio analytics</h1></div><nav><a href="/settings/source.zip">Download source ↓</a><a href="/">View portfolio</a><a href="/signout-with-chatgpt?return_to=%2F">Sign out</a></nav></header>
  <section class="metrics" aria-label="Visit summary">${metric("Total views",Number(totals.totalViews??0),"Since tracking began")}${metric("Unique visitors",Number(totals.uniqueVisitors??0),"Pseudonymous browser count")}${metric("Last 30 days",Number(totals.views30Days??0),`${Number(totals.visitors30Days??0).toLocaleString()} unique visitors`)}${metric("Today",Number(totals.todayViews??0),"America/Toronto")}</section>
  <section class="trend"><div><h2>Daily views</h2><p>Last 30 days</p></div><div class="chart" aria-label="Daily page views chart">${chart}</div></section>
  <div class="grid">${breakdown("Countries",rows(countries))}${breakdown("Devices",rows(devices))}${breakdown("Browsers",rows(browsers))}${breakdown("Referrers",rows(referrers))}</div>
  <section class="privacy"><div><span>Returning visitors</span><strong>${returningCount.toLocaleString()}</strong></div><p>This dashboard stores a random visitor ID, timestamp, page path, approximate Cloudflare location, device class, browser family and referrer domain. It does not store raw IP addresses, names, emails or fingerprint visitors.</p></section>
  </main></body></html>`;
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "private, no-store", "x-robots-tag": "noindex, nofollow" } });
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    if (url.pathname === "/settings" && request.method === "GET") {
      return settingsResponse(request, env);
    }

    if (url.pathname === "/settings/source.zip" && request.method === "GET") {
      return sourceDownloadResponse(request, env);
    }

    if (url.pathname === "/private/alenpjose-source.zip") {
      return new Response("Not found", { status: 404 });
    }

    const shouldTrack =
      request.method === "GET" &&
      url.pathname === "/" &&
      (request.headers.get("accept") ?? "").includes("text/html") &&
      Boolean(env.DB);

    if (!shouldTrack) return handler.fetch(request, env, ctx);

    const existingVisitorId = visitorIdFromCookie(request);
    const visitorId = existingVisitorId ?? crypto.randomUUID();
    ctx.waitUntil(recordVisit(request, env, visitorId));

    const response = await handler.fetch(request, env, ctx);
    if (existingVisitorId) return response;

    const trackedResponse = new Response(response.body, response);
    trackedResponse.headers.append(
      "Set-Cookie",
      `${VISITOR_COOKIE}=${visitorId}; Path=/; Max-Age=31536000; SameSite=Lax; Secure; HttpOnly`,
    );
    return trackedResponse;
  },
};

export default worker;
