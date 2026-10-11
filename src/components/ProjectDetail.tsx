import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import type { Project } from '../data/content';

export default function ProjectDetail({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // lock page scroll while the detail view is open
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] overflow-y-auto"
          style={{
            background: `radial-gradient(circle at 25% 10%, ${project.accent}33, transparent 55%), radial-gradient(circle at 85% 85%, ${project.accent}22, transparent 60%), var(--color-bg)`,
          }}
        >
          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Close project detail"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            whileHover={{ scale: 1.08, rotate: 90 }}
            whileTap={{ scale: 0.92 }}
            className="fixed top-5 right-5 sm:top-8 sm:right-8 z-10 w-11 h-11 rounded-full bg-bg/70 backdrop-blur border border-line flex items-center justify-center text-ink"
          >
            <X size={18} />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[980px] mx-auto px-5 sm:px-8 py-20 sm:py-28"
          >
            <span
              className="inline-block text-[11px] font-mono px-3 py-1 rounded-full border mb-6"
              style={{ borderColor: `${project.accent}55`, color: project.accent, background: `${project.accent}14` }}
            >
              {project.pill}
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl mb-6 max-w-[16ch]">{project.title}</h2>

            <div
              className="relative rounded-2xl border overflow-hidden mb-10 flex items-center justify-center p-8 sm:p-12"
              style={{
                borderColor: `${project.accent}40`,
                background: `radial-gradient(circle at 30% 20%, ${project.accent}22, transparent 60%)`,
              }}
            >
              <motion.img
                initial={{ scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                src={project.image}
                alt={`${project.title} interface`}
                className="w-full max-w-[760px] rounded-lg border border-line shadow-[0_30px_80px_-25px_rgba(0,0,0,0.65)] object-contain"
              />
            </div>

            <p className="text-base sm:text-lg text-ink-dim leading-relaxed max-w-[65ch] mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[12px] font-mono border rounded-full px-3 py-1.5"
                  style={{ borderColor: `${project.accent}40`, color: project.accent }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-5">
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener"
                whileHover={{ gap: '10px' }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-full"
                style={{ background: project.accent, color: '#140f24' }}
              >
                Live demo <ArrowUpRight size={15} />
              </motion.a>
              <a
                href={project.source}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-sm text-ink-dim hover:text-ink transition-colors"
              >
                <GithubIcon size={15} /> Source
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
