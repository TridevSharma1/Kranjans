import hero from "@/assets/hero.jpg";
import education from "@/assets/education.jpg";
import health from "@/assets/health.jpg";
import women from "@/assets/women.jpg";

const map: Record<string, string> = { hero, education, health, women };
export const imageOptions = Object.keys(map);
export function img(key: string | undefined) {
  if (!key) return hero;
  if (key.startsWith("http") || key.startsWith("data:")) return key;
  return map[key] ?? hero;
}
