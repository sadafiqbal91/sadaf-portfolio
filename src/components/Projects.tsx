import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { projects, type Project } from '../data/content';
import Reveal from './Reveal';
import ProjectDetail from './ProjectDetail';

export default function Projects() {
  const [featured, ...rest] = projects;
  const [selected, setSelected] = useState<Project | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    
    <section id="work" className="max-w-[1080px] mx-auto px-5 sm:px-8 py-24 sm:py-28">
      <Reveal>
        <div className="flex items-end justify-between gap-5 border-b border-line pb-4 mb-4">
          <h2 className="font-serif text-2xl sm:text-3xl">Selected work</h2>
          <span className="font-mono text-xs text-ink-dim hidden sm:block">06 shipped · built solo</span>
        </div>
        <p className="text-sm text-ink-dim mb-10">
          Every project below was designed and built by Sadaf Iqbal, end to end. Click any project for a closer look.
        </p>
      </Reveal>

      {/* featured large card */}
      <Reveal delay={0.05}>
        <FeaturedCard
          project={featured}
          onOpen={() => setSelected(featured)}
          isDimmed={hoveredSlug !== null}
        />
      </Reveal>

      {/* grid of remaining projects */}
      <div
        className="grid sm:grid-cols-2 gap-6 mt-6"
        onMouseLeave={() => setHoveredSlug(null)}
      >
        {rest.map((project, i) => (
          <Reveal key={project.slug} delay={0.05 + i * 0.05}>
            <ProjectCard
              project={project}
              onOpen={() => setSelected(project)}
              isSpotlit={hoveredSlug === project.slug}
              isDimmed={hoveredSlug !== null && hoveredSlug !== project.slug}
              onHoverStart={() => setHoveredSlug(project.slug)}
            />
          </Reveal>
        ))}
      </div>

      <ProjectDetail project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function FeaturedCard({
  project,
  onOpen,
  isDimmed,
}: {
  project: Project;
  onOpen: () => void;
  isDimmed: boolean;
}) {
  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate={isDimmed ? 'dimmed' : 'rest'}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen(); }}
      variants={{
        rest: {
          y: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          boxShadow: '0 0px 0px 0px rgba(217,187,122,0)',
        },
        dimmed: {
          y: 0,
          scale: 0.98,
          opacity: 0.5,
          filter: 'blur(3px)',
          boxShadow: '0 0px 0px 0px rgba(217,187,122,0)',
        },
        hover: {
          y: -6,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          boxShadow: '0 28px 70px -30px rgba(217,187,122,0.35)',
        },
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative grid md:grid-cols-[1.2fr_1fr] gap-0 rounded-2xl border border-line bg-bg-raised/40 overflow-hidden cursor-pointer"
    >
      <div className="relative overflow-hidden min-h-[260px] md:min-h-0 flex items-center justify-center p-6 sm:p-8 bg-[radial-gradient(circle_at_30%_20%,rgba(124,107,179,0.16),transparent_55%),radial-gradient(circle_at_75%_80%,rgba(167,139,219,0.14),transparent_55%)]">
        <motion.img
          src={project.image}
          alt={`${project.title} interface`}
          variants={{ hover: { scale: 1.04, y: -4 } }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-lg border border-line shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] object-contain"
        />
        <span className="absolute top-4 left-4 text-[11px] font-mono bg-bg/80 backdrop-blur px-2.5 py-1 rounded-full border border-line">
          {project.pill}
        </span>
      </div>

      <div className="p-7 sm:p-9 flex flex-col justify-center">
        <motion.h3
          variants={{ rest: { color: 'var(--color-ink)' }, hover: { color: 'var(--color-accent)' } }}
          transition={{ duration: 0.3 }}
          className="font-serif text-2xl mb-3"
        >
          {project.title}
        </motion.h3>
        <p className="text-sm text-ink-dim leading-relaxed mb-5">{project.description}</p>

        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          variants={{ hover: {} }}
        >
          {project.stack.map((tech, i) => (
            <motion.span
              key={tech}
              variants={{ hover: { y: -2, transition: { delay: i * 0.03 } } }}
              className="text-[11px] font-mono text-ink-dim border border-line rounded-full px-2.5 py-1"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <div className="flex items-center gap-4">
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ gap: '10px' }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            Live demo <ArrowUpRight size={15} />
          </motion.a>
          <a
            href={project.source}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm text-ink-dim hover:text-ink transition-colors"
          >
            <GithubIcon size={15} /> Source
          </a>
          <motion.span
            variants={{ rest: { opacity: 0, x: -4 }, hover: { opacity: 1, x: 0 } }}
            className="ml-auto text-[12px] font-mono text-ink-dim/70"
          >
            View case study →
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({
  project,
  onOpen,
  isSpotlit,
  isDimmed,
  onHoverStart,
}: {
  project: Project;
  onOpen: () => void;
  isSpotlit: boolean;
  isDimmed: boolean;
  onHoverStart: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ dx: 0, dy: 0 });

  const handleEnter = () => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rawDx = window.innerWidth / 2 - cx;
      const rawDy = window.innerHeight / 2 - cy;
      const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

      const MARGIN = 16;
      const scaleGrowthX = rect.width * 0.04;
      const scaleGrowthY = rect.height * 0.04;

      const maxLeft = Math.max(0, rect.left - MARGIN - scaleGrowthX);
      const maxRight = Math.max(0, window.innerWidth - rect.right - MARGIN - scaleGrowthX);

      const navEl = document.querySelector('header');
      const navBottom = navEl ? navEl.getBoundingClientRect().bottom : 80;
      const maxUp = Math.max(0, rect.top - navBottom - MARGIN - scaleGrowthY);
      const maxDown = Math.max(0, window.innerHeight - rect.bottom - MARGIN - scaleGrowthY);

      setOffset({
        dx: clamp(rawDx, -maxLeft, maxRight),
        dy: clamp(rawDy, -maxUp, maxDown),
      });
    }
    onHoverStart();
  };

  return (
    <motion.article
      ref={ref}
      initial="rest"
      animate={isSpotlit ? 'hover' : 'rest'}
      onMouseEnter={handleEnter}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen(); }}
      variants={{
        rest: {
          x: 0,
          y: 0,
          scale: isDimmed ? 0.97 : 1,
          opacity: isDimmed ? 0.4 : 1,
          filter: isDimmed ? 'blur(4px)' : 'blur(0px)',
          zIndex: 1,
          borderColor: 'var(--color-line)',
          boxShadow: '0 0px 0px 0px rgba(217,187,122,0)',
          pointerEvents: isDimmed ? 'none' : 'auto',
        },
        hover: {
          x: offset.dx,
          y: offset.dy,
          scale: 1.08,
          opacity: 1,
          filter: 'blur(0px)',
          zIndex: 999,
          borderColor: 'rgba(217,187,122,0.6)',
          boxShadow: '0 40px 90px -30px rgba(217,187,122,0.45)',
          pointerEvents: 'auto',
        },
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl border bg-bg-raised/40 overflow-hidden cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-[12/5]">
        <motion.img
          src={project.image}
          alt={`${project.title} interface`}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] font-mono bg-bg/80 backdrop-blur px-2 py-1 rounded-full border border-line">
          {project.pill}
        </span>

        <motion.div
          variants={{
            rest: { opacity: 0, y: 10 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-3 right-3 flex gap-2"
        >
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            className="w-8 h-8 rounded-full bg-accent text-[#140f24] flex items-center justify-center"
            aria-label="Live demo"
          >
            <ArrowUpRight size={15} />
          </motion.a>
          <motion.a
            href={project.source}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            className="w-8 h-8 rounded-full bg-bg/80 backdrop-blur border border-line flex items-center justify-center"
            aria-label="Source code"
          >
            <GithubIcon size={14} />
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        variants={{ rest: { y: 0 }, hover: { y: -2 } }}
        className="p-5"
      >
        <motion.h3
          variants={{ rest: { color: 'var(--color-ink)' }, hover: { color: 'var(--color-accent)' } }}
          transition={{ duration: 0.3 }}
          className="font-serif text-lg mb-2"
        >
          {project.title}
        </motion.h3>
        <p className="text-[13px] text-ink-dim leading-relaxed mb-3 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[10px] font-mono text-ink-dim/70 border border-line rounded-full px-2 py-0.5">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
}
