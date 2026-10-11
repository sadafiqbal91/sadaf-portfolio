import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav } from '../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.querySelector(n.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/70 backdrop-blur-xl border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1080px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <motion.a
          href="#hero"
          whileHover="hover"
          initial="rest"
          animate="rest"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            window.history.pushState(null, '', '#hero');
            requestAnimationFrame(() => {
              document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
          }}
          className="group flex items-center gap-2.5"
        >
          <motion.span
            variants={{
              rest: { rotate: 0, scale: 1 },
              hover: { rotate: -8, scale: 1.08 },
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 14 }}
            className="relative w-8 h-8 shrink-0"
          >
            {/* breathing gold glow (plain CSS animation so it never interrupts the
                framer-motion hover-variant chain below) */}
            <span
              className="relative w-8 h-8 rounded-[9px] flex items-center justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #f3d9a0, #d9bb7a 45%, #a9812f)',
                animation: 'nav-logo-glow 2.6s ease-in-out infinite',
              }}
            >
              <span className="font-serif font-bold text-[15px] text-[#140f24]">S</span>
              <motion.span
                variants={{
                  rest: { x: '-120%', opacity: 0 },
                  hover: { x: '120%', opacity: 0.8 },
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-0 w-1/3 bg-white/70 blur-[6px] skew-x-[-20deg]"
              />
            </span>
          </motion.span>

          <span className="relative font-serif text-lg tracking-tight">
            <span className="transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:via-accent-2 group-hover:to-accent-3">
              Sadaf Iqbal
            </span>
            <em className="text-accent not-italic">.</em>
          </span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {nav.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ y: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="group relative px-3 py-1.5 rounded-full text-ink-dim hover:text-ink transition-colors duration-300"
            >
              {/* hover fill pill */}
              <span className="absolute inset-0 rounded-full bg-white/[0.06] scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />

              <span className="relative z-10 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-accent-2 transition-[background,color] duration-300">
                {item.label}
              </span>

              {active === item.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full"
                  style={{ background: 'linear-gradient(90deg, #d9bb7a, #a78bdb, #7c6bb3)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-line text-ink"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-bg/95 backdrop-blur-xl border-b border-line"
          >
            <div className="flex flex-col px-5 py-4 gap-4">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const href = item.href;
                    // Close the menu FIRST so the clicked <a> is unmounted before the
                    // scroll starts. Unmounting mid-scroll (closing after starting the
                    // smooth scroll) cancels the in-flight scroll animation partway —
                    // that's why links used to jump the hash without actually scrolling.
                    //
                    // Wait for the mobile dropdown's 300ms collapse animation to finish
                    // before scrolling; starting during the collapse can make native
                    // smooth scrolling stop short of its target.
                    setOpen(false);
                    window.history.pushState(null, '', href);
                    setTimeout(() => {
                      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 320);
                  }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="text-ink-dim hover:text-ink transition-colors text-base"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
