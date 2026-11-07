import { NextResponse } from "next/server";

const ALLOWED = [
  /^app\/assets\/[a-zA-Z0-9._/-]+$/,
  /^lordicon\.js$/,
  /^doodle-motif-[a-zA-Z0-9._-]+\.json$/,
];

export const revalidate = 86400;

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { path } = await context.params;
  const relative = path.join("/");

  if (relative.includes("..") || !ALLOWED.some((pattern) => pattern.test(relative))) {
    return new NextResponse("Not found", { status: 404 });
  }

  const upstream = `https://metatest.app/${relative}`;
  let response: Response | null = null;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      response = await fetch(upstream, { next: { revalidate: 86400 } });
      if (response.ok || response.status < 500) break;
    } catch {
      response = null;
    }
  }

  if (!response) {
    return new NextResponse("Upstream unavailable", { status: 502 });
  }

  const headers = new Headers();
  const type = response.headers.get("content-type");
  if (type) headers.set("content-type", type);
  headers.set("cache-control", "public, max-age=86400");

  return new NextResponse(response.body, { status: response.status, headers });
}
