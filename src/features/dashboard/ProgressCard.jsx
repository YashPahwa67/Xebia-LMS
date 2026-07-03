// Progress line chart rendered as a lightweight SVG (no chart lib needed).
import { PROGRESS_TREND } from "@/data/dashboardData";

function buildPath(points, width, height) {
  const max = Math.max(...points);
  const stepX = width / (points.length - 1);
  return points
    .map((p, i) => {
      const x = i * stepX;
      const y = height - (p / max) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function ProgressCard() {
  const W = 320;
  const H = 140;
  const line = buildPath(PROGRESS_TREND, W, H);
  const area = `${line} L${W},${H} L0,${H} Z`;
  const peak = Math.max(...PROGRESS_TREND);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card">
      <h3 className="text-lg font-bold text-ink">Progress</h3>
      <div className="mt-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-40 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="progFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6C1D5F" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6C1D5F" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#progFill)" />
          <path d={line} fill="none" stroke="#6C1D5F" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <div className="mt-2 text-right">
          <span className="inline-block rounded-md bg-ink px-2 py-1 text-xs font-semibold text-white">
            {peak}%
          </span>
        </div>
      </div>
    </div>
  );
}
