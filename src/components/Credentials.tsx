import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Medal, Trophy, BadgeCheck, Star, GraduationCap } from 'lucide-react';
import { credentials } from '../data/content';
import Reveal from './Reveal';

// confetti pieces burst upward out of the trophy's cup in a fan, each one a tiny
// coloured strip from the site's own palette — generated once with deterministic
// trig (same approach as the Hero's orb-burst) so the spread looks organic without
// per-render randomness
const confettiColors = ['#d9bb7a', '#a78bdb', '#7c6bb3', '#f3dfab', '#fff7ef'];
const confettiPieces = Array.from({ length: 16 }, (_, i) => {
  // spread across a ~210deg upward-facing cone centred straight up (-90deg in
  // screen space, where y grows downward), not a full circle
  const angle = -90 - 105 + (i / 15) * 210;
  const rad = (angle * Math.PI) / 180;
  const distance = 58 + (i % 4) * 22;
  return {
    x: Math.cos(rad) * distance,
    y: Math.sin(rad) * distance,
    rotate: (i * 47) % 360,
    color: confettiColors[i % confettiColors.length],
    w: i % 3 === 0 ? 5 : 3,
    h: i % 3 === 0 ? 10 : 7,
    delay: (i % 5) * 0.035,
  };
});

const floatingBadges = [
  { Icon: Trophy, top: '8%', left: '6%', size: 46, color: 'text-accent', opacity: 0.1, duration: 9, rotate: 8 },
  { Icon: Medal, top: '62%', left: '3%', size: 38, color: 'text-accent-2', opacity: 0.09, duration: 11, rotate: -10 },
  { Icon: BadgeCheck, top: '14%', left: '88%', size: 42, color: 'text-accent-3', opacity: 0.1, duration: 10, rotate: -8 },
  { Icon: Star, top: '70%', left: '90%', size: 30, color: 'text-accent', opacity: 0.12, duration: 8, rotate: 12 },
  { Icon: GraduationCap, top: '40%', left: '50%', size: 36, color: 'text-accent-2', opacity: 0.07, duration: 13, rotate: -6 },
  { Icon: Award, top: '85%', left: '45%', size: 34, color: 'text-accent-3', opacity: 0.09, duration: 10.5, rotate: 10 },
];

type TrophyBurstProps = {
  /** pixel width/height of the trophy SVG (viewBox stays 88x100, so height scales with it) */
  size?: number;
  /** 0-1 opacity applied to the whole trophy+confetti group — used to fade the big background version so card text stays readable */
  fade?: number;
  /** multiplies how far the confetti travels — the background version spreads further since it has more room */
  spread?: number;
  className?: string;
};

function TrophyBurst({ size = 88, fade = 1, spread = 1, className = '' }: TrophyBurstProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.6 });
  const scale = size / 88;
  const wrapperHeight = 100 * scale + 70 * spread;

  // confetti stays close to full brightness even when the trophy body itself is
  // faded into the background, so the "something is happening" moment still reads
  // clearly — only the still, static trophy shape needs to stay subtle
  const confettiOpacity = Math.min(1, fade * 3.5);

  return (
    <div
      ref={ref}
      className={`relative flex justify-center ${className}`}
      style={{ height: wrapperHeight }}
    >
      {/* confetti — bursts out of the cup's mouth (the rim, around y=14-21 of the
          0-100 viewBox) each time this scrolls into view */}
      <div
        className="absolute left-1/2 pointer-events-none"
        style={{ bottom: 82 * scale, transform: 'translateX(-50%)', opacity: confettiOpacity }}
      >
        {confettiPieces.map((p, i) => (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 0, rotate: 0, scale: 0.4 }}
            animate={
              inView
                ? {
                    x: [0, p.x * 0.55 * spread, p.x * spread],
                    y: [0, p.y * 0.55 * spread, p.y * spread + 26],
                    opacity: [0, 1, 0],
                    rotate: [0, p.rotate],
                    scale: [0.4, 1, 0.8],
                  }
                : { x: 0, y: 0, opacity: 0, rotate: 0, scale: 0.4 }
            }
            transition={
              inView
                ? { duration: 1.1, delay: p.delay, times: [0, 0.4, 1], ease: [0.16, 1, 0.3, 1] }
                : { duration: 0.2 }
            }
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: p.w * scale,
              height: p.h * scale,
              background: p.color,
              borderRadius: 1,
            }}
          />
        ))}
      </div>

      {/* the still trophy shape + its glow stay at the caller's `fade` opacity —
          it's the quiet background element. The confetti above is the "something
          happened" moment and deliberately ignores this dimming. (`fade` is baked
          directly into each element's own opacity keyframes rather than a wrapping
          div, since `opacity` on a `display:contents` wrapper doesn't reliably
          apply across browsers.) */}
      {/* golden glow — pulses up behind the cup each time it scrolls into view, from
          either direction, since useInView fires on both */}
      <motion.span
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: [0, 0.9 * fade, 0.55 * fade], scale: [0.6, 1.25, 1.05] } : { opacity: 0, scale: 0.6 }}
        transition={inView ? { duration: 1, ease: [0.16, 1, 0.3, 1] } : { duration: 0.3 }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 70 * scale,
          height: 70 * scale,
          bottom: 30 * scale,
          background: 'radial-gradient(circle, rgba(243,223,171,0.9) 0%, rgba(217,187,122,0.55) 45%, transparent 72%)',
          filter: `blur(${14 * scale}px)`,
        }}
      />

      {/* golden trophy */}
      <motion.svg
        width={88 * scale}
        height={100 * scale}
        viewBox="0 0 88 100"
        initial={{ scale: 0.85, opacity: 0, filter: 'drop-shadow(0 0 0px rgba(243,223,171,0))' }}
        animate={
          inView
            ? { scale: 1, opacity: fade, filter: [
                'drop-shadow(0 0 0px rgba(243,223,171,0))',
                `drop-shadow(0 0 18px rgba(243,223,171,${0.85 * fade}))`,
                `drop-shadow(0 0 8px rgba(243,223,171,${0.4 * fade}))`,
              ] }
            : { scale: 0.85, opacity: 0, filter: 'drop-shadow(0 0 0px rgba(243,223,171,0))' }
        }
        transition={inView ? { duration: 1, ease: [0.16, 1, 0.3, 1] } : { duration: 0.3 }}
        className="relative z-10"
      >
        <defs>
          <linearGradient id="trophyGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f3dfab" />
            <stop offset="55%" stopColor="#d9bb7a" />
            <stop offset="100%" stopColor="#a9812f" />
          </linearGradient>
        </defs>
        {/* base */}
        <rect x="30" y="86" width="28" height="8" rx="2" fill="url(#trophyGold)" />
        <rect x="38" y="76" width="12" height="12" fill="url(#trophyGold)" />
        {/* stem */}
        <path d="M40 60 L48 60 L46 76 L42 76 Z" fill="url(#trophyGold)" />
        {/* handles */}
        <path
          d="M20 22 C8 22 8 42 22 46"
          stroke="url(#trophyGold)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M68 22 C80 22 80 42 66 46"
          stroke="url(#trophyGold)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        {/* cup */}
        <path
          d="M18 18 H70 C70 42 60 60 44 60 C28 60 18 42 18 18 Z"
          fill="url(#trophyGold)"
        />
        {/* cup rim highlight */}
        <rect x="16" y="14" width="56" height="7" rx="3.5" fill="#f3dfab" />
        {/* subtle shine */}
        <path d="M27 24 C27 36 32 46 40 52" stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </motion.svg>
    </div>
  );
}

export default function Credentials() {
  return (
    <section id="credentials" className="relative max-w-[1080px] mx-auto px-5 sm:px-8 py-24 sm:py-28 overflow-hidden">
      {/* soft drifting light */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <motion.span
          animate={{ x: ['0%', '12%', '-4%', '0%'], y: ['0%', '8%', '14%', '0%'], scale: [1, 1.15, 1.05, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[-6%] w-[30vw] h-[30vw] rounded-full bg-accent-2/15 blur-[100px]"
        />
        <motion.span
          animate={{ x: ['0%', '-10%', '6%', '0%'], y: ['0%', '-10%', '6%', '0%'], scale: [1, 1.1, 1.2, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-15%] right-[-8%] w-[34vw] h-[34vw] rounded-full bg-accent/10 blur-[110px]"
        />
        <motion.span
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-[18vw] h-[18vw] rounded-full bg-accent-3/15 blur-[90px]"
        />

        {/* floating credential badge icons */}
        {floatingBadges.map(({ Icon, top, left, size, color, opacity, duration, rotate }, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -18, 0], rotate: [0, rotate, 0] }}
            transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
            style={{ top, left, opacity }}
            className={`absolute ${color}`}
          >
            <Icon size={size} strokeWidth={1.2} />
          </motion.span>
        ))}
      </div>

      <Reveal>
        <div className="flex items-end justify-between gap-5 border-b border-line pb-4 mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl">Credentials</h2>
          <span className="font-mono text-xs text-ink-dim hidden sm:block">internship, hackathons &amp; certifications</span>
        </div>
      </Reveal>

      <div className="relative">
        {/* big, soft trophy celebration sitting behind the certificate cards — same
            burst, scaled up and faded so the cards on top stay fully readable */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <div className="scale-[0.72] sm:scale-100">
            <TrophyBurst size={280} fade={0.2} spread={1.75} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {credentials.map((c, i) => (
            <Reveal key={c.title + i} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.28)' }}
                className="rounded-2xl border border-line bg-bg-raised/40 p-6 h-full"
              >
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wide text-accent-2 mb-3">
                  <Award size={12} /> {c.badge}
                </span>
                <h3 className="font-serif text-lg mb-1.5">{c.title}</h3>
                <p className="text-sm text-ink-dim leading-relaxed">{c.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
