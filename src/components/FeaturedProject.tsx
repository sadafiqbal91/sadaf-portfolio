import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { featured } from '../data/content';
import Reveal from './Reveal';

export default function FeaturedProject() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(featured.steps.length - 1, Math.floor(v * featured.steps.length));
    setActive(idx);
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section id="featured" className="max-w-[1080px] mx-auto px-5 sm:px-8 py-24 sm:py-28">
      <Reveal>
        <div className="flex items-end justify-between gap-5 border-b border-line pb-4 mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl">In focus</h2>
          <span className="font-mono text-xs text-ink-dim">{featured.tag}</span>
        </div>
      </Reveal>

      <div ref={ref} className="relative" style={{ height: `${featured.steps.length * 90}vh` }}>
        <div className="sticky top-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            style={{ scale }}
            className="relative rounded-2xl overflow-hidden border border-line aspect-[16/10] shadow-2xl"
          >
            <img src={featured.image} alt="JobShield Pakistan interface" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
          </motion.div>

          <div className="relative min-h-[220px]">
            {featured.steps.map((step, i) => (
              <motion.div
                key={step.label}
                animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : 16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
                style={{ pointerEvents: active === i ? 'auto' : 'none' }}
              >
                <span className="font-mono text-xs text-accent-2 block mb-3">{step.label}</span>
                <h3 className="font-serif text-2xl sm:text-3xl mb-4 leading-snug">{step.title}</h3>
                <p className="text-ink-dim leading-relaxed mb-5">{step.body}</p>
                {step.cta && (
                  <div className="flex flex-wrap gap-4">
                    {step.cta.map((c, ci) => (
                      <motion.a
                        key={c.label}
                        href={c.href}
                        target="_blank"
                        rel="noopener"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={
                          ci === 0
                            ? 'bg-accent text-[#140f24] px-5 py-2.5 rounded-full text-sm font-medium'
                            : 'border border-line px-5 py-2.5 rounded-full text-sm'
                        }
                      >
                        {c.label}
                      </motion.a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            <div className="absolute -bottom-10 left-0 flex gap-2">
              {featured.steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? 'w-6 bg-accent' : 'w-1.5 bg-line'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
