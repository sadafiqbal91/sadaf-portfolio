import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { hero } from '../data/content';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const keyRows = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'],
];

const orbs = [
  { className: 'w-[18%] h-[18%] bg-accent-2', path: { top: ['12%', '60%', '22%', '70%', '12%'], left: ['8%', '28%', '62%', '74%', '8%'] }, duration: 9 },
  { className: 'w-[13%] h-[13%] bg-accent', path: { top: ['70%', '14%', '40%', '70%'], left: ['70%', '60%', '14%', '70%'] }, duration: 11 },
  { className: 'w-[11%] h-[11%] bg-accent-3', path: { top: ['40%', '76%', '10%', '40%'], left: ['44%', '20%', '30%', '44%'] }, duration: 7.5 },
];

// the same three orbs, but as a one-time "converge to center, then burst" intro —
// they travel inward from their natural starting spots, clearly visible as solid
// glowing balls, meet in the middle, and detonate into a smoke/foam puff — so the
// content looks like it appears out of the cloud left behind
const convergingOrbs = [
  { color: 'rgba(167,139,219,1)', core: '#c9b6f0', from: { top: '12%', left: '8%' } },
  { color: 'rgba(217,187,122,1)', core: '#f3dfab', from: { top: '70%', left: '70%' } },
  { color: 'rgba(124,107,179,1)', core: '#a996d6', from: { top: '40%', left: '44%' } },
];

// smoke/foam particles that puff outward from the collision point once the orbs hit —
// generated once with deterministic trig so the burst reads as a visible, textured
// cloud that lingers for a beat before the content shows. Kept to a modest count with
// no per-particle blur filter (the radial-gradient fade already softens the edges) so
// the whole sequence stays smooth instead of taxing the browser's compositor
const burstPuffs = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * 360) / 8 + (i % 2 === 0 ? 9 : -7);
  const rad = (angle * Math.PI) / 180;
  const distance = 70 + (i % 4) * 32;
  const colors = ['rgba(201,182,240,0.98)', 'rgba(243,223,171,0.98)', 'rgba(169,150,214,0.98)', 'rgba(255,255,255,0.95)'];
  return {
    x: Math.cos(rad) * distance,
    y: Math.sin(rad) * distance,
    size: 54 + (i % 4) * 20,
    color: colors[i % colors.length],
    delayOffset: (i % 4) * 0.03,
  };
});

const sparkles = [
  { top: '18%', left: '22%', delay: 0.2, color: '#a78bdb' },
  { top: '64%', left: '12%', delay: 1.4, color: '#7c6bb3' },
  { top: '30%', left: '78%', delay: 2.3, color: '#a78bdb' },
  { top: '76%', left: '68%', delay: 0.9, color: '#7c6bb3' },
  { top: '48%', left: '46%', delay: 3.1, color: '#d9bb7a' },
];

export default function Hero() {
  const [typed1, setTyped1] = useState(0);
  const [typed2, setTyped2] = useState(0);
  const [activeLine, setActiveLine] = useState<1 | 2>(1);
  const [introDone, setIntroDone] = useState(false);

  const screenRef = useRef<HTMLDivElement>(null);
  const [glowActive, setGlowActive] = useState(false);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowXSpring = useSpring(glowX, { stiffness: 45, damping: 13, mass: 0.9 });
  const glowYSpring = useSpring(glowY, { stiffness: 45, damping: 13, mass: 0.9 });

  const handleScreenMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = screenRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    glowX.set(e.clientX - rect.left - 150);
    glowY.set(e.clientY - rect.top - 150);
    if (!glowActive) setGlowActive(true);
  };

  const handleScreenMouseLeave = () => setGlowActive(false);

  useEffect(() => {
    let cancelled = false;
    const speed = 42;

    async function type() {
      await sleep(3200);
      for (let i = 1; i <= hero.line1.length; i++) {
        if (cancelled) return;
        setTyped1(i);
        await sleep(speed);
      }
      if (cancelled) return;
      setActiveLine(2);
      await sleep(260);
      for (let j = 1; j <= hero.line2.length; j++) {
        if (cancelled) return;
        setTyped2(j);
        await sleep(speed);
      }
      if (cancelled) return;
      await sleep(500);
      setIntroDone(true);
    }

    type();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-10 px-5 sm:px-8">
      {/* aurora background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.span
          animate={{ x: [0, '-8%', 0], y: [0, '6%', 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-24 w-[40vw] h-[40vw] rounded-full bg-accent-3/30 blur-[90px]"
        />
        <motion.span
          animate={{ x: [0, '8%', 0], y: [0, '-7%', 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-0 w-[35vw] h-[35vw] rounded-full bg-accent-2/20 blur-[90px]"
        />
        <span className="absolute top-1/3 right-1/4 w-[22vw] h-[22vw] rounded-full bg-accent/20 blur-[100px]" />
      </div>

      {/* laptop frame */}
      <motion.div
        initial={{ rotateX: -98, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 0.85, 0.28, 1] }}
        style={{ transformPerspective: 1400, transformOrigin: '50% 100%' }}
        className="relative w-full max-w-[920px] rounded-[22px] border border-white/30 bg-gradient-to-br from-white/[0.07] to-white/[0.02] shadow-[0_40px_90px_-35px_rgba(0,0,0,0.55)] overflow-hidden"
      >
        {/* topbar */}
        <div className="relative flex items-center gap-2 px-4 pt-5 pb-3 bg-gradient-to-b from-black/15 to-transparent">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff8a5c]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffd35c]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#a78bdb]" />
          <div className="ml-2.5 w-[22px] h-[22px] rounded-full bg-white/[0.07] border border-white/10 flex items-center justify-center text-accent-2/90">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </div>
          <span className="font-mono text-[11px] text-white/45">sadaf.dev</span>
        </div>

        {/* screen */}
        <motion.div
          ref={screenRef}
          onMouseMove={handleScreenMouseMove}
          onMouseLeave={handleScreenMouseLeave}
          initial={{ opacity: 0, scaleY: 0.02, filter: 'brightness(3.5)' }}
          animate={{ opacity: 1, scaleY: 1, filter: 'brightness(1)' }}
          transition={{ duration: 1.1, delay: 1, ease: [0.16, 0.84, 0.32, 1] }}
          style={{ transformOrigin: '50% 50%' }}
          className="relative overflow-hidden bg-gradient-to-br from-[#241c3a]/85 via-[#180f28]/90 to-[#120b1f]/90 px-6 sm:px-10 md:px-14 py-10 sm:py-14 md:py-16"
        >
          {/* glows */}
          <div className="absolute inset-0 pointer-events-none">
            {/* liquid cursor-following glow */}
            <motion.span
              style={{ x: glowXSpring, y: glowYSpring }}
              animate={{ opacity: glowActive ? 1 : 0, scale: glowActive ? 1 : 0.5 }}
              transition={{ opacity: { duration: 0.5 }, scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
              className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full blur-[55px] mix-blend-screen"
            >
              <span
                className="block w-full h-full rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(217,187,122,0.5) 0%, rgba(167,139,219,0.35) 45%, transparent 72%)' }}
              />
            </motion.span>
            <motion.span
              animate={{ x: ['0%', '6%', '0%'], y: ['0%', '8%', '0%'], scale: [1, 1.15, 1] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[48%] h-[75%] -top-[20%] -left-[8%] rounded-full blur-[46px] mix-blend-screen"
              style={{ background: 'radial-gradient(circle, rgba(167,139,219,0.35), transparent 70%)' }}
            />
            <motion.span
              animate={{ x: ['0%', '-6%', '0%'], y: ['0%', '-6%', '0%'], scale: [1, 1.12, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[44%] h-[70%] -bottom-[25%] -right-[6%] rounded-full blur-[46px] mix-blend-screen"
              style={{ background: 'radial-gradient(circle, rgba(124,107,179,0.3), transparent 70%)' }}
            />
            {/* one-time magic convergence: screen opens empty first, then the three orbs
                (2 purple, 1 golden) travel in from their corners and collide at the centre
                almost simultaneously — the burst flash is timed to peak at that exact
                instant, and only once it fades does the laptop content appear */}
            {convergingOrbs.map((orb, i) => (
              <motion.span
                key={`converge-${i}`}
                initial={{ top: orb.from.top, left: orb.from.left, opacity: 0, scale: 0.4 }}
                animate={{ top: [orb.from.top, '50%', '50%', '50%'], left: [orb.from.left, '50%', '50%', '50%'], opacity: [0, 1, 1, 0], scale: [0.4, 1, 1.05, 0.3] }}
                transition={{ duration: 0.55, delay: 2.15 + i * 0.02, times: [0, 0.78, 0.9, 1], ease: [0.16, 1, 0.3, 1] }}
                style={{ translateX: '-50%', translateY: '-50%' }}
                className="absolute w-16 h-16 rounded-full"
              >
                {/* bright, clearly-visible solid core — glow is a box-shadow, not a
                    filter:blur layer, so it stays cheap to composite */}
                <span
                  className="absolute inset-[18%] rounded-full"
                  style={{
                    background: `radial-gradient(circle at 35% 32%, #fff, ${orb.core} 42%, ${orb.color} 78%)`,
                    boxShadow: `0 0 22px 6px ${orb.color}`,
                  }}
                />
              </motion.span>
            ))}
            {/* the collision: a sharp white pop and a crisp expanding ring — both plain
                gradients/borders with no filter:blur, so this moment (the heaviest one
                in the whole intro) stays smooth instead of dropping frames */}
            <motion.span
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.3, 4, 4.8, 5.5] }}
              transition={{ duration: 0.3, delay: 2.58, times: [0, 0.3, 0.55, 1], ease: [0.16, 1, 0.3, 1] }}
              style={{
                translateX: '-50%',
                translateY: '-50%',
                background: 'radial-gradient(circle, #fff, rgba(255,255,255,0.4) 55%, transparent 75%)',
              }}
              className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full mix-blend-screen"
            />
            {/* crisp ring shockwave — a border + glow, not a filter blur, so it stays smooth */}
            <motion.span
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.4, 2.6, 4] }}
              transition={{ duration: 0.4, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ translateX: '-50%', translateY: '-50%' }}
              className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full border-2 border-white/80 mix-blend-screen"
            />
            {burstPuffs.map((p, i) => (
              // outer span: fixed centering offset only (plain CSS transform, not a
              // framer x/y value) — kept separate from the inner motion element so the
              // two translate channels don't fight each other and cancel the spread out
              <span
                key={`puff-${i}`}
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
              >
                <motion.span
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                  animate={{ x: [0, p.x * 0.5, p.x, p.x], y: [0, p.y * 0.5, p.y, p.y], opacity: [0, 1, 1, 0], scale: [0.3, 1.15, 1.2, 0.6] }}
                  transition={{
                    duration: 0.6,
                    delay: 2.6 + p.delayOffset,
                    times: [0, 0.4, 0.7, 1],
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    width: p.size,
                    height: p.size,
                    background: `radial-gradient(circle, ${p.color}, ${p.color} 30%, transparent 80%)`,
                  }}
                  className="absolute rounded-full mix-blend-screen"
                />
              </span>
            ))}

            {orbs.map((orb, i) => (
              <motion.span
                key={i}
                animate={{ top: orb.path.top, left: orb.path.left, opacity: [0, 0.8] }}
                transition={{
                  top: { duration: orb.duration, repeat: Infinity, ease: 'easeInOut' },
                  left: { duration: orb.duration, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 0.5, delay: 3.2 },
                }}
                className={`absolute rounded-full blur-[22px] mix-blend-screen ${orb.className}`}
              />
            ))}
            {sparkles.map((s, i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0, 1, 0], scale: [0.6, 1.3, 0.6] }}
                transition={{ duration: 3.4, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
                className="absolute w-[3px] h-[3px] rounded-full"
                style={{ top: s.top, left: s.left, background: '#fff', boxShadow: `0 0 6px 1px ${s.color}` }}
              />
            ))}
          </div>

          {/* content */}
          <div className="relative z-10 text-center max-w-[640px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.2 }}
              className="inline-flex items-center gap-2 text-xs font-mono text-ink-dim border border-line rounded-full px-3 py-1.5 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-2 animate-pulse" />
              {hero.eyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, filter: 'blur(14px)', scale: 1.04 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              transition={{ duration: 0.7, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.1] mb-6 min-h-[2.4em] sm:min-h-[2.3em]">
              <div className="flex flex-wrap justify-center">
                <span className="text-ink-dim/70">
                  {hero.line1.slice(0, typed1)}
                  {activeLine === 1 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, }}
                      className="inline-block w-[2px] h-[0.9em] bg-ink-dim/70 ml-1 translate-y-[0.1em]"
                    />
                  )}
                </span>
              </div>
              <div className="flex flex-wrap justify-center mt-1">
                <span className="bg-gradient-to-r from-accent via-accent-2 to-accent-3 bg-clip-text text-transparent">
                  {hero.line2.slice(0, typed2)}
                </span>
                {activeLine === 2 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, }}
                    className="inline-block w-[2px] h-[0.9em] bg-accent-2 ml-1 translate-y-[0.1em]"
                  />
                )}
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.7 }}
              className="text-ink-dim text-base sm:text-lg mx-auto mb-8"
            >
              {hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <motion.a
                href={hero.ctaPrimary.href}
                whileHover={{ scale: 1.03, gap: '14px' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-accent text-[#140f24] font-medium px-6 py-3 rounded-full"
              >
                {hero.ctaPrimary.label}
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href={hero.ctaGhost.href}
                whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border border-line text-ink px-6 py-3 rounded-full"
              >
                {hero.ctaGhost.label}
              </motion.a>
              <motion.a
                href={hero.ctaResume.href}
                download
                whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border border-line text-ink-dim px-6 py-3 rounded-full"
              >
                <Download size={16} />
                {hero.ctaResume.label}
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* laptop base / keyboard — the deck is an SVG path (not a CSS clip-path polygon)
          so the top edge and bottom corners can be genuinely curved and still scale
          cleanly at any width, and the keys are rounded into soft "bubble" caps */}
      <div className="relative w-full max-w-[920px] h-[clamp(112px,15vw,175px)] mt-0" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          style={{ filter: 'drop-shadow(0 18px 30px rgba(0,0,0,0.35))' }}
        >
          <defs>
            <linearGradient id="deckFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
              <stop offset="45%" stopColor="rgba(255,255,255,0.03)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
            </linearGradient>
          </defs>
          <path
            d="M 26,0 Q 500,-8 974,0 L 1000,166 Q 1000,200 966,200 L 34,200 Q 0,200 0,166 Z"
            fill="url(#deckFill)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
          />
        </svg>
        {/* keys are sized purely relative to this container (flex-1 rows, h-full keys)
            instead of fixed px/vw values, so they always stay inside the deck's actual
            rendered size — no overflow at any width */}
        <div className="absolute inset-x-[10%] top-[20%] bottom-[16%] flex flex-col gap-[6%]">
          {keyRows.map((row, rowI) => (
            <div key={rowI} className="flex-1 flex justify-between gap-[1.6%]">
              {row.map((label, i) => (
                <span
                  key={i}
                  className="flex-1 h-full flex items-center justify-center rounded-full bg-gradient-to-b from-white/40 via-white/15 to-white/5 font-mono text-white/60 select-none"
                  style={{
                    fontSize: 'clamp(4px, 0.9vw, 9px)',
                    boxShadow:
                      'inset 0 1px 1px rgba(255,255,255,0.55), inset 0 -2px 3px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.35)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6.2, duration: 0.8 }}
        className="relative mt-10 flex flex-col items-center gap-2 text-ink-dim/50"
      >
        <span className="text-[10px] font-mono tracking-widest">SCROLL</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-ink-dim/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
