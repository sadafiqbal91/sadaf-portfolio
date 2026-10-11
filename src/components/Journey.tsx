import { motion } from 'framer-motion';
import { journey } from '../data/content';
import Reveal from './Reveal';

const dotColors = ['bg-accent', 'bg-accent-2', 'bg-accent-3'];
const accentHexCycle = ['#d9bb7a', '#a78bdb', '#7c6bb3'];

// wireframe bowtie ribbon: many thin curves sharing the same two endpoints,
// fanned out above/below the midline so they bunch at the pinch and the tip
// and spread apart in the middle, like woven silk threads
type Pt = { x: number; y: number };
function buildLobe(start: Pt, end: Pt, count: number, maxBulge: number) {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  const lines: { d: string; opacity: number }[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0 : (i / (count - 1)) * 2 - 1; // -1..1
    const bulge = t * maxBulge;
    const cx = midX;
    const cy = midY + bulge;
    const d = `M ${start.x},${start.y} Q ${cx},${cy} ${end.x},${end.y}`;
    const opacity = 0.22 + 0.42 * (1 - Math.abs(t) * 0.7);
    lines.push({ d, opacity });
  }
  return lines;
}

const PINCH: Pt = { x: 400, y: 230 };
const RIGHT_TIP: Pt = { x: 1000, y: 130 };
const LEFT_TIP: Pt = { x: 20, y: 300 };
const rightLobeLines = buildLobe(PINCH, RIGHT_TIP, 100, 150);
const leftLobeLines = buildLobe(PINCH, LEFT_TIP, 70, 85);

export default function Journey() {
  return (
    <section id="journey" className="max-w-[1080px] mx-auto px-5 sm:px-8 py-24 sm:py-28">
      <div className="relative rounded-3xl border border-line bg-bg-raised/40 overflow-hidden px-6 sm:px-10 pt-16 sm:pt-20 pb-16 sm:pb-20">
        {/* wireframe bowtie ribbon, scoped to this card only */}
        <motion.div
          animate={{ y: [-24, 26, -24] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 right-[-60px] w-[640px] h-[360px] pointer-events-none opacity-90"
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="journeyRibbonRadial" gradientUnits="userSpaceOnUse" cx={PINCH.x} cy={PINCH.y} r={750}>
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="14%" stopColor="#f2e2c8" />
                <stop offset="35%" stopColor="#d9bb7a" />
                <stop offset="65%" stopColor="#a47c45" />
                <stop offset="100%" stopColor="#5c3f22" />
              </radialGradient>
            </defs>
            {rightLobeLines.map((l, idx) => (
              <path
                key={`r${idx}`}
                d={l.d}
                fill="none"
                stroke="url(#journeyRibbonRadial)"
                strokeWidth={1.1}
                opacity={l.opacity}
              />
            ))}
            {leftLobeLines.map((l, idx) => (
              <path
                key={`l${idx}`}
                d={l.d}
                fill="none"
                stroke="url(#journeyRibbonRadial)"
                strokeWidth={1.1}
                opacity={l.opacity}
              />
            ))}
          </svg>
        </motion.div>

        <Reveal>
          <div className="relative flex items-end justify-between gap-5 border-b border-line pb-4 mb-10 z-10">
            <h2 className="font-serif text-2xl sm:text-3xl">Journey</h2>
            <span className="font-mono text-xs text-ink-dim">classroom to codebase</span>
          </div>
        </Reveal>

        <div className="relative flex flex-col gap-3 border-l border-dashed border-line pl-7 z-10">
          {journey.map((item, i) => {
            const accentHex = accentHexCycle[i % 3];
            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="relative">
                  <span
                    className={`absolute -left-[31px] top-[22px] w-2.5 h-2.5 rounded-full ${dotColors[i % 3]}`}
                  />
                  <motion.div
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    className="group relative rounded-xl px-4 py-3 -ml-4 overflow-hidden cursor-default"
                  >
                    {/* stage 3: accent crossfade panel, dissolves in last */}
                    <motion.span
                      variants={{
                        rest: { opacity: 0 },
                        hover: { opacity: 1, transition: { delay: 0.28, duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                      }}
                      style={{
                        background: `radial-gradient(circle at 20% 20%, ${accentHex}22, transparent 65%)`,
                      }}
                      className="absolute inset-0 pointer-events-none"
                    />

                    <span className="relative font-mono text-xs text-ink-dim block mb-1.5">{item.date}</span>

                    {/* stage 1: title, shifts slightly on hover */}
                    <motion.h3
                      variants={{ rest: { y: 0, color: 'var(--color-ink)' }, hover: { y: -1, color: accentHex } }}
                      transition={{ duration: 0.25 }}
                      className="relative text-base font-medium mb-1.5"
                    >
                      {item.title}
                    </motion.h3>

                    {/* stage 2: line-reveal, body text appears after a short delay */}
                    <motion.div
                      variants={{
                        rest: { opacity: 0, height: 0 },
                        hover: { opacity: 1, height: 'auto', transition: { delay: 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
                      }}
                      className="relative overflow-hidden"
                    >
                      <motion.span
                        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1, transition: { delay: 0.1, duration: 0.3 } } }}
                        style={{ transformOrigin: 'left', background: accentHex }}
                        className="block h-px w-10 mb-2"
                      />
                      <p className="text-sm text-ink-dim max-w-[56ch] pb-1">{item.body}</p>
                    </motion.div>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
