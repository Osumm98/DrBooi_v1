"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

// Premium vascular line art (light theme). Bold duotone vessel networks with
// a soft glow, draw-in on mount, and real "blood flow" — cells travelling along
// the vessels via native SVG <animateMotion> (SSR-safe, no hydration risk).
// Depth layers parallax with the parent card's pointer (x/y ~ -0.5..0.5).

type ArtProps = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

const CRIMSON = "#ef4444";
const EMERALD = "#10b981";
const INK = "#1e293b";

function useLayer(x: MotionValue<number>, y: MotionValue<number>, depth: number) {
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth);
  return { x: tx, y: ty };
}

const line = {
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const draw = (delay = 0, dur = 1.5) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: {
    pathLength: { duration: dur, delay, ease: "easeInOut" as const },
    opacity: { duration: 0.3, delay },
  },
});

// Flowing vessel: a dashed overlay whose offset marches along the path, so the
// vessel itself looks like blood is moving through it.
function Flow({
  d,
  color = CRIMSON,
  dur = 2.4,
  delay = 0,
  width = 2.4,
}: {
  d: string;
  color?: string;
  dur?: number;
  delay?: number;
  width?: number;
}) {
  return (
    <motion.path
      d={d}
      {...line}
      stroke={color}
      strokeWidth={width}
      strokeDasharray="1 12"
      initial={{ strokeDashoffset: 0, opacity: 0 }}
      animate={{ strokeDashoffset: -130, opacity: 0.95 }}
      transition={{
        strokeDashoffset: { duration: dur, repeat: Infinity, ease: "linear", delay },
        opacity: { duration: 0.6, delay },
      }}
    />
  );
}

// Cells travelling along a vessel path.
function Cells({
  path,
  color,
  count = 3,
  dur = 3,
  r = 3,
}: {
  path: string;
  color: string;
  count?: number;
  dur?: number;
  r?: number;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <circle key={i} r={r} fill={color}>
          <animateMotion
            dur={`${dur}s`}
            repeatCount="indefinite"
            path={path}
            begin={`${(dur / count) * i}s`}
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur={`${dur}s`}
            repeatCount="indefinite"
            begin={`${(dur / count) * i}s`}
          />
        </circle>
      ))}
    </>
  );
}

const defs = (id: string) => (
  <defs>
    <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor={INK} />
      <stop offset="100%" stopColor={CRIMSON} />
    </linearGradient>
    <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2.6" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

/* --------------------------------------------------------- Offering 1 */

export function ArterialVenousArt({ x, y }: ArtProps) {
  const back = useLayer(x, y, 6);
  const mid = useLayer(x, y, 15);
  const front = useLayer(x, y, 28);

  const artery = "M30 150 C84 150 104 120 136 110 C152 105 158 92 160 66";
  const vein = "M290 150 C236 150 216 120 184 110 C168 105 162 92 160 66";

  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      {defs("av")}

      <motion.g style={back} stroke={INK} opacity={0.14}>
        <circle cx="160" cy="98" r="80" {...line} strokeWidth={1} strokeDasharray="2 10" />
        <circle cx="160" cy="98" r="52" {...line} strokeWidth={1} strokeDasharray="2 10" />
      </motion.g>

      <motion.g style={mid} filter="url(#av-glow)">
        {/* main trunks */}
        <motion.path d={artery} {...line} stroke={CRIMSON} strokeWidth={3} {...draw(0.1, 1.5)} />
        <motion.path d={vein} {...line} stroke={INK} strokeWidth={3} {...draw(0.25, 1.5)} />
        {/* capillary bifurcations */}
        <motion.path
          d="M136 110 C120 106 112 118 96 118 M96 118 C88 116 84 124 74 124 M136 110 C126 120 126 132 118 142"
          {...line}
          stroke={CRIMSON}
          strokeWidth={1.4}
          opacity={0.75}
          {...draw(0.6)}
        />
        <motion.path
          d="M184 110 C200 106 208 118 224 118 M224 118 C232 116 236 124 246 124 M184 110 C194 120 194 132 202 142"
          {...line}
          stroke={INK}
          strokeWidth={1.4}
          opacity={0.7}
          {...draw(0.7)}
        />
        {/* crown */}
        <motion.path d="M160 66 V30 M160 44 C150 38 140 40 132 46 M160 44 C170 38 180 40 188 46" {...line} stroke="url(#av-g)" strokeWidth={1.6} {...draw(0.85)} />
      </motion.g>

      {/* flowing vessels + travelling cells */}
      <motion.g style={mid}>
        <Flow d={artery} color={CRIMSON} dur={2.2} delay={1.1} />
        <Flow d={vein} color={EMERALD} dur={2.8} delay={1.3} width={2} />
        <Cells path={artery} color={CRIMSON} count={3} dur={2.6} />
        <Cells path={vein} color={EMERALD} count={3} dur={3.2} r={2.6} />
      </motion.g>

      <motion.g style={front}>
        <motion.circle cx="160" cy="66" r="5.5" fill={CRIMSON} animate={{ scale: [1, 1.25, 1], opacity: [0.75, 1, 0.75] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: "160px 66px" }} />
      </motion.g>
    </svg>
  );
}

/* --------------------------------------------------------- Offering 2 */

export function VascularTraumaArt({ x, y }: ArtProps) {
  const back = useLayer(x, y, 6);
  const mid = useLayer(x, y, 14);
  const front = useLayer(x, y, 30);

  const ecg = "M18 60 H92 l10 -28 l12 48 l10 -32 l8 16 H302";
  const vesselL = "M20 138 C84 138 108 110 148 106";

  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      {defs("tr")}

      {/* alert rings */}
      <motion.g style={back}>
        {[30, 52, 74].map((r, i) => (
          <motion.circle
            key={r}
            cx="214"
            cy="66"
            r={r}
            {...line}
            stroke={CRIMSON}
            strokeWidth={1}
            animate={{ opacity: [0.35, 0, 0.35], scale: [0.9, 1.12, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            style={{ transformOrigin: "214px 66px" }}
          />
        ))}
      </motion.g>

      {/* ruptured vessel + suture */}
      <motion.g style={mid} filter="url(#tr-glow)">
        <motion.path d={vesselL} {...line} stroke={INK} strokeWidth={3} {...draw(0.1)} />
        <motion.path d="M186 106 C226 110 250 138 300 138" {...line} stroke={INK} strokeWidth={3} {...draw(0.25)} />
        {/* rupture spray */}
        <motion.path d="M148 106 l-14 -16 M156 102 l-6 -24 M150 112 l-20 -2" {...line} stroke={CRIMSON} strokeWidth={1.8} {...draw(0.5)} />
        {/* suture stitches across the gap */}
        <motion.path d="M160 100 l16 10 M166 96 l16 10 M172 92 l16 10" {...line} stroke="url(#tr-g)" strokeWidth={1.6} {...draw(0.7)} />
      </motion.g>

      {/* flowing vessel + leaking cells at rupture */}
      <motion.g style={mid}>
        <Flow d={vesselL} color={CRIMSON} dur={2.1} delay={1} />
        <Cells path={vesselL} color={CRIMSON} count={3} dur={2.4} />
      </motion.g>

      {/* ECG */}
      <motion.g style={front}>
        <motion.path d={ecg} {...line} stroke={CRIMSON} strokeWidth={2.6} filter="url(#tr-glow)" {...draw(0.6, 1.1)} />
        <circle r="3.5" fill={CRIMSON}>
          <animateMotion dur="2.2s" repeatCount="indefinite" path={ecg} />
        </circle>
      </motion.g>
    </svg>
  );
}

/* --------------------------------------------------------- Offering 3 */

export function DialysisAccessArt({ x, y }: ArtProps) {
  const back = useLayer(x, y, 7);
  const mid = useLayer(x, y, 14);
  const front = useLayer(x, y, 28);

  const arteryLine = "M24 126 C100 126 150 110 214 102 C250 98 276 92 296 88";
  const veinLine = "M296 120 C278 124 250 130 212 136 C156 144 110 158 28 158";

  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      {defs("dz")}

      <motion.g style={back} stroke={INK} opacity={0.14}>
        <ellipse cx="160" cy="98" rx="98" ry="60" {...line} strokeWidth={1} strokeDasharray="3 11" />
      </motion.g>

      {/* artery + vein + fistula anastomosis */}
      <motion.g style={mid} filter="url(#dz-glow)">
        <motion.path d={arteryLine} {...line} stroke={CRIMSON} strokeWidth={3} {...draw(0.1, 1.5)} />
        <motion.path d={veinLine} {...line} stroke={INK} strokeWidth={2.6} {...draw(0.3, 1.5)} />
        <motion.path d="M150 111 C160 126 182 128 198 124" {...line} stroke="url(#dz-g)" strokeWidth={2.2} {...draw(0.6)} />
        {/* subtle vessel walls (parallel lines) */}
        <motion.path d="M24 132 C100 132 150 116 214 108" {...line} stroke={INK} strokeWidth={0.8} opacity={0.3} {...draw(0.5)} />
      </motion.g>

      {/* flowing vessels + circulating cells */}
      <motion.g style={mid}>
        <Flow d={arteryLine} color={CRIMSON} dur={2.3} delay={1.1} />
        <Flow d={veinLine} color={EMERALD} dur={2.9} delay={1.3} width={2} />
        <Cells path={arteryLine} color={CRIMSON} count={4} dur={2.6} />
        <Cells path={veinLine} color={EMERALD} count={4} dur={3.2} r={2.6} />
      </motion.g>

      {/* access needle */}
      <motion.g style={front} filter="url(#dz-glow)">
        <motion.path d="M118 44 L170 98" {...line} stroke={INK} strokeWidth={3} {...draw(0.7)} />
        <motion.path d="M106 34 l22 -8 l10 26 z" {...line} stroke="url(#dz-g)" strokeWidth={2} {...draw(0.85)} />
        <motion.circle cx="174" cy="102" r="5" fill={CRIMSON} animate={{ scale: [1, 1.3, 1], opacity: [0.75, 1, 0.75] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ transformOrigin: "174px 102px" }} />
      </motion.g>
    </svg>
  );
}
