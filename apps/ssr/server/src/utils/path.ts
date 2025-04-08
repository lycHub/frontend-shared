import { join } from "node:path";

export function buildMultiPath(...segments: string[]) {
  console.log("buildMultiPath", segments);
  const validSegments = segments.filter((s) => s != null && s !== "");
  const normalized = validSegments.map((s) => s.replace(/^\/+|\/+$/g, ""));
  const rawPath = "/" + join(...normalized);

  // 替换所有反斜杠为正斜杠
  return rawPath.replace(/\\/g, "/");
}
