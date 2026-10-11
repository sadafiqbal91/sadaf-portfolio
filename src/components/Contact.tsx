import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { contact } from '../data/content';
import Reveal from './Reveal';

export default function Contact() {
  return (
    <section id="contact" className="max-w-[1080px] mx-auto px-5 sm:px-8 py-24 sm:py-28">
      <Reveal>
        <div className="relative rounded-3xl border border-line bg-bg-raised/50 overflow-hidden text-center px-6 sm:px-10 py-16 sm:py-20 isolate">
          <motion.span
            animate={{ x: [0, 20, 0], y: [0, 16, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 -left-10 w-64 h-64 rounded-full blur-[60px] opacity-55 -z-10"
            style={{ background: 'radial-gradient(circle, rgba(217,187,122,0.5), transparent 70%)', mixBlendMode: 'screen' }}
          />
          <motion.span
            animate={{ x: [0, -16, 0], y: [0, -14, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full blur-[60px] opacity-55 -z-10"
            style={{ background: 'radial-gradient(circle, rgba(167,139,219,0.45), transparent 70%)', mixBlendMode: 'screen' }}
          />

          <h2 className="font-serif text-3xl sm:text-4xl mb-4">{contact.heading}</h2>
          <p className="text-ink-dim max-w-[48ch] mx-auto mb-9">{contact.sub}</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href={`mailto:${contact.email}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-accent text-[#140f24] font-medium px-6 py-3 rounded-full"
            >
              <Mail size={16} /> Email me
            </motion.a>
            <motion.a
              href={contact.github}
              target="_blank"
              rel="noopener"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border border-line px-6 py-3 rounded-full"
            >
              <GithubIcon size={16} /> GitHub
            </motion.a>
            <motion.a
              href={contact.linkedin}
              target="_blank"
              rel="noopener"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border border-line px-6 py-3 rounded-full"
            >
              <LinkedinIcon size={16} /> LinkedIn
            </motion.a>
          </div>

          <p className="mt-6 text-xs font-mono text-ink-dim/60">{contact.email}</p>

          <div className="mt-12 pt-10 border-t border-line/60">
            <p className="font-mono text-xs text-ink-dim/70 mb-5">github activity</p>
            <div className="flex justify-center">
              <img
                src={`https://ghchart.rshah.org/d9bb7a/${contact.github.split('/').pop()}`}
                alt="GitHub contribution graph"
                className="max-w-full h-auto opacity-90"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
