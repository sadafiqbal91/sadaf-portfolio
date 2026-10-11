import { motion } from 'framer-motion';
import { Code2, Layers, Database, Cloud, Wrench } from 'lucide-react';
import { skills, type SkillCategory } from '../data/content';
import Reveal from './Reveal';

const iconByCategory: Record<SkillCategory, typeof Code2> = {
  code: Code2,
  framework: Layers,
  database: Database,
  cloud: Cloud,
  tool: Wrench,
};

const colorByCategory: Record<SkillCategory, string> = {
  code: 'text-ink-dim group-hover:text-ink',
  framework: 'text-accent-2',
  database: 'text-accent-3',
  cloud: 'text-[#8f7fd1]',
  tool: 'text-[#9e92b8]',
};

const codeGlyphs = [
  { glyph: '</>', top: '8%', left: '6%', size: 'text-5xl', duration: 20, delay: 0 },
  { glyph: '{ }', top: '70%', left: '3%', size: 'text-4xl', duration: 24, delay: 2 },
  { glyph: '=>', top: '18%', left: '92%', size: 'text-5xl', duration: 22, delay: 1 },
  { glyph: '( )', top: '78%', left: '90%', size: 'text-4xl', duration: 26, delay: 3 },
  { glyph: '#', top: '45%', left: '97%', size: 'text-3xl', duration: 18, delay: 1.5 },
  { glyph: '</>', top: '92%', left: '45%', size: 'text-3xl', duration: 21, delay: 2.5 },
];

export default function Skills() {
  return (
    <section id="skills" className="relative max-w-[1080px] mx-auto px-5 sm:px-8 py-24 sm:py-28 overflow-hidden">
      {/* drifting code-symbol background, matches the Credentials floating-badge language */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {codeGlyphs.map((g, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -22, 0], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: g.duration, repeat: Infinity, ease: 'easeInOut', delay: g.delay }}
            className={`absolute font-mono font-bold text-ink-dim ${g.size}`}
            style={{ top: g.top, left: g.left }}
          >
            {g.glyph}
          </motion.span>
        ))}
      </div>

      <Reveal>
        <div className="relative flex items-end justify-between gap-5 border-b border-line pb-4 mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl">Skills</h2>
          <span className="font-mono text-xs text-ink-dim hidden sm:block">tools in active use</span>
        </div>
      </Reveal>

      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {skills.map((skill, i) => {
          const Icon = iconByCategory[skill.category];
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 8) * 0.04 }}
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.3)' }}
              className="group relative flex items-center gap-2.5 rounded-xl border border-line bg-bg-raised/40 px-4 py-3.5 cursor-default overflow-hidden"
            >
              <motion.span
                className={`shrink-0 ${colorByCategory[skill.category]}`}
                whileHover={{ rotate: -10, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <Icon size={18} />
              </motion.span>
              <span className="text-sm">{skill.name}</span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent-2 to-accent-3 origin-left"
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
