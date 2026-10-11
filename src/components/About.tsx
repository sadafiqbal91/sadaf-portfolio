import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { about } from '../data/content';
import Reveal from './Reveal';

const stars = [
  { cx: 60, cy: 90, r: 3.2, fill: '#a78bdb', delay: 0 },
  { cx: 150, cy: 55, r: 2.6, fill: '#d9bb7a', delay: 0.5 },
  { cx: 235, cy: 105, r: 3.2, fill: '#7c6bb3', delay: 1.1 },
  { cx: 195, cy: 205, r: 2.6, fill: '#a78bdb', delay: 1.7 },
  { cx: 95, cy: 235, r: 3.2, fill: '#d9bb7a', delay: 0.8 },
];

export default function About() {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: false, amount: 0.4 });

  return (
    <section id="about" className="max-w-[1080px] mx-auto px-5 sm:px-8 py-24 sm:py-28">
      <Reveal>
        <div className="border-b border-line pb-4 mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl">About</h2>
          <span className="font-mono text-xs text-ink-dim">the short version</span>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-14 items-start">
        <Reveal>
          <div ref={cardRef} className="relative aspect-[4/5]" style={{ perspective: 1400 }}>
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0.2, 0.2, 1] }}
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* front */}
              <div
                className="absolute inset-0 rounded-[22px] border border-line overflow-hidden flex items-center justify-center"
                style={{
                  backfaceVisibility: 'hidden',
                  background: 'linear-gradient(155deg, #1e1836 0%, #241c3e 48%, #2a1f48 100%)',
                }}
              >
                <motion.span
                  animate={{ x: [0, 20, 0], y: [0, 14, 0], scale: [1, 1.15, 1] }}
                  transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-[15%] -left-[15%] w-[60%] h-[55%] rounded-full blur-[50px] opacity-60"
                  style={{ background: 'radial-gradient(circle, rgba(167,139,219,0.5), transparent 70%)' }}
                />
                <motion.span
                  animate={{ x: [0, -14, 0], y: [0, -18, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-[15%] -right-[12%] w-[55%] h-[50%] rounded-full blur-[50px] opacity-60"
                  style={{ background: 'radial-gradient(circle, rgba(217,187,122,0.45), transparent 70%)' }}
                />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 375" preserveAspectRatio="none">
                  <line x1="60" y1="90" x2="150" y2="55" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="150" y1="55" x2="235" y2="105" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="235" y1="105" x2="195" y2="205" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="195" y1="205" x2="95" y2="235" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="95" y1="235" x2="60" y2="90" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  {stars.map((s, i) => (
                    <motion.circle
                      key={i}
                      cx={s.cx}
                      cy={s.cy}
                      r={s.r}
                      fill={s.fill}
                      animate={{ opacity: [0.45, 1, 0.45], scale: [0.85, 1.25, 0.85] }}
                      transition={{ duration: 2.6, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
                      style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
                    />
                  ))}
                </svg>
                <span className="relative font-serif font-semibold text-[6.5rem] leading-none select-none">
                  <motion.span
                    initial={{ opacity: 0, x: -110, y: -80, rotate: -35, scale: 0.5 }}
                    animate={cardInView ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 } : { opacity: 0, x: -110, y: -80, rotate: -35, scale: 0.5 }}
                    transition={cardInView ? { duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] } : { duration: 0.3 }}
                    className="inline-block text-[rgba(255,247,239,0.16)]"
                  >
                    S
                  </motion.span>
                  <motion.em
                    initial={{ opacity: 0, x: 90, y: 70, rotate: 40, scale: 0.3 }}
                    animate={cardInView ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 } : { opacity: 0, x: 90, y: 70, rotate: 40, scale: 0.3 }}
                    transition={cardInView ? { duration: 1.5, delay: 1.3, ease: [0.16, 1, 0.3, 1] } : { duration: 0.3 }}
                    className="not-italic inline-block text-[rgba(217,187,122,0.28)]"
                  >
                    .
                  </motion.em>
                </span>
                <motion.span
                  initial={{ opacity: 0, x: -70, y: -60, rotate: -50, scale: 0.4 }}
                  animate={cardInView ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 } : { opacity: 0, x: -70, y: -60, rotate: -50, scale: 0.4 }}
                  transition={cardInView ? { duration: 1.6, delay: 2, ease: [0.16, 1, 0.3, 1] } : { duration: 0.3 }}
                  className="absolute top-[18px] left-[18px] w-[38px] h-[38px] rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white/60 backdrop-blur"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                    <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
                  </svg>
                </motion.span>
                <button
                  type="button"
                  onClick={() => setFlipped(true)}
                  aria-label="Flip card"
                  className="absolute bottom-[18px] right-[18px] w-[38px] h-[38px] rounded-full flex items-center justify-center bg-accent/15 border border-accent/40 text-accent backdrop-blur cursor-pointer"
                >
                  <Code2 size={16} />
                </button>
              </div>

              {/* back */}
              <div
                className="absolute inset-0 rounded-[22px] border border-line overflow-hidden flex items-center justify-center text-center p-7"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(155deg, #1e1836 0%, #241c3e 48%, #2a1f48 100%)',
                }}
              >
                <div className="relative z-10 flex flex-col items-center gap-3.5">
                  <span className="text-[11px] tracking-widest uppercase text-white/55">say hi</span>
                  <p className="font-serif text-xl text-[#fff7ef] leading-snug max-w-[22ch]">{about.back.line}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {about.back.chips.map((c) => (
                      <span key={c} className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white/75">
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-1">
                    <a href={about.back.github} target="_blank" rel="noopener" className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/85 hover:bg-white/20 transition-colors">
                      <GithubIcon size={17} />
                    </a>
                    <a href={about.back.linkedin} target="_blank" rel="noopener" className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/85 hover:bg-white/20 transition-colors">
                      <LinkedinIcon size={17} />
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFlipped(false)}
                    className="mt-1 text-[13px] text-white/50 hover:text-white/85 transition-colors"
                  >
                    ← back
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-7">
          <p className="font-serif text-lg sm:text-xl leading-relaxed text-ink-dim">
            {about.quote}
          </p>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {about.facts.map((f) => (
              <div key={f.k} className="flex flex-col gap-1 border-t border-line pt-3">
                <span className="font-mono text-[10px] tracking-wider text-accent-2">{f.k}</span>
                <span className="text-sm">{f.v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
