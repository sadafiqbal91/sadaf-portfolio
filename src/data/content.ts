// All real content pulled from Sadaf Iqbal's existing portfolio.
// Nothing here is invented — only presentation/interaction is new.

export const hero = {
  eyebrow: 'Karachi, Pakistan  /  open to work',
  line1: 'Used to teach the lesson.',
  line2: 'Now she builds the app.',
  sub: "Sadaf Iqbal is a self-taught web developer building for the web one project at a time, from HTML fundamentals to full-stack apps wired to real APIs.",
  ctaPrimary: { label: 'View the work', href: '#work' },
  ctaGhost: { label: 'Get in touch', href: '#contact' },
  // swap public/resume.pdf with the real file when it's ready — the button below already points here
  ctaResume: { label: 'Download resume', href: '/resume.pdf' },
};

export type Project = {
  slug: string;
  image: string;
  pill: string;
  title: string;
  description: string;
  stack: string[];
  live: string;
  source: string;
  featured?: boolean;
  /** Accent color used to theme this project's full-screen detail view. */
  accent: string;
};

import jobshield from '../assets/projects/jobshield.jpg';
import chatapp from '../assets/projects/chatapp.jpg';
import employeemgmt from '../assets/projects/employeemgmt.jpg';
import quickserve from '../assets/projects/quickserve.jpg';
import helpersnearme from '../assets/projects/helpersnearme.jpg';
import auraluxe from '../assets/projects/auraluxe.jpg';

export const projects: Project[] = [
  {
    slug: 'jobshield',
    image: jobshield,
    pill: 'Live · shipped',
    title: 'JobShield Pakistan',
    description:
      'An AI scam detector built for Pakistani job seekers. Paste a job ad or WhatsApp message and it flags common fraud patterns — fake pay-to-work schemes, generic emails, unprofessional language — in both English and Roman Urdu, with a 0–100 risk score powered by Google Gemini.',
    stack: ['JavaScript', 'Node.js', 'Vercel Functions', 'Gemini API', 'Firebase'],
    live: 'https://job-shield-pakistan.vercel.app/',
    source: 'https://github.com/sadafiqbal91/job-shield-pakistan',
    featured: true,
    accent: '#d1574e',
  },
  {
    slug: 'chatapp',
    image: chatapp,
    pill: 'Live · internship',
    title: 'Real-Time Chat App',
    description:
      "A MERN-stack chat platform with instant messaging inside isolated rooms, built during Sadaf's internship. Uses Pusher for real-time WebSocket communication on a serverless backend, with a glassmorphism UI and animated gradients.",
    stack: ['React (Vite)', 'Express.js', 'Node.js', 'Pusher', 'Tailwind CSS'],
    live: 'https://internship-assignment-no-4-5tdr.vercel.app/',
    source: 'https://github.com/sadafiqbal91/Internship-Assignment-no-4',
    accent: '#8b7fd9',
  },
  {
    slug: 'employeemgmt',
    image: employeemgmt,
    pill: 'Live · internship',
    title: 'Employee Management System',
    description:
      'A full-stack MERN dashboard for managing employee records, with full create, read, update and delete flows and a live view of the team on one screen. Built with a separate frontend and backend, each deployed on its own.',
    stack: ['React (Vite)', 'Express.js', 'Node.js', 'MongoDB', 'Axios'],
    live: 'https://internship-assignment-3-w72q.vercel.app/',
    source: 'https://github.com/sadafiqbal91/Internship-Assignment-3',
    accent: '#4f8fd1',
  },
  {
    slug: 'quickserve',
    image: quickserve,
    pill: 'SMIT · assignment',
    title: 'QuickServe',
    description:
      'A service-booking marketplace connecting customers with local providers — plumbers, electricians, home cleaning, salon and more. Customers browse and book by category and track status through pending, accepted, in progress and completed; providers manage incoming requests; completed bookings get a 1–5 star review. Row-level security in the database keeps each side seeing only their own data.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase'],
    live: 'https://quickserve-sandy.vercel.app/',
    source: 'https://github.com/sadafiqbal91/quickserve',
    accent: '#d19a4f',
  },
  {
    slug: 'helpersnearme',
    image: helpersnearme,
    pill: 'Live · shipped',
    title: 'HelpersNearMe',
    description:
      'A service marketplace connecting people with verified, background-checked domestic and commercial workers — cleaners, drivers, office and store helpers. A four-step hire flow (search, review, select, onboard) with an admin panel to manage the worker directory, backed by a real database.',
    stack: ['JavaScript', 'Vite', 'Node.js', 'Supabase', 'Vercel'],
    live: 'https://helpers-near-me.vercel.app/',
    source: 'https://github.com/sadafiqbal91/helpers-near-me',
    accent: '#4fae8f',
  },
  {
    slug: 'auraluxe',
    image: auraluxe,
    pill: 'Live · shipped',
    title: 'AuraLuxe',
    description:
      'A luxury fashion e-commerce site with a full product catalog across nine categories — shoes, jackets, bags, jeans and more — plus a brand story section and a services page covering personal styling, custom tailoring and worldwide shipping.',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    live: 'https://sadafiqbal91.github.io/Unique/',
    source: 'https://github.com/sadafiqbal91/Unique',
    accent: '#c9a876',
  },
];

export const featured = {
  tag: 'JobShield Pakistan',
  image: jobshield,
  steps: [
    {
      label: '01 · The problem',
      title: "Job scams are everywhere in Pakistan's WhatsApp groups.",
      body: 'Fake pay-to-work offers, generic "HR" messages, too-good-to-be-true salaries — job seekers have no quick way to check if an ad is real before replying.',
    },
    {
      label: '02 · The build',
      title: 'Paste a job ad, get a 0–100 risk score.',
      body: 'Sadaf wired Google Gemini into a Vercel serverless function that reads the ad in English or Roman Urdu and flags common fraud patterns instantly.',
    },
    {
      label: '03 · Shipped',
      title: 'Live, free, and built for real job seekers.',
      body: 'Deployed on Vercel with Firebase behind it — no login needed, just paste and check.',
      cta: [
        { label: 'Try it live', href: 'https://job-shield-pakistan.vercel.app/' },
        { label: 'View source', href: 'https://github.com/sadafiqbal91/job-shield-pakistan' },
      ],
    },
  ],
};

export const about = {
  quote:
    '"I am a teacher and a future modern web and app developer, Inshallah." — the line Sadaf leads her GitHub profile with, and the throughline of everything she\'s building: the same instinct for breaking a hard idea into a clear one, now aimed at code instead of a classroom.',
  facts: [
    { k: 'BASE', v: 'Karachi, Pakistan' },
    { k: 'BACKGROUND', v: 'Teaching, now self-taught in web development' },
    { k: 'INTERNSHIP', v: 'Web Development intern at SyntecxHub, Mar–Apr 2026' },
    { k: 'FOCUS', v: 'HTML/CSS fundamentals through full-stack JavaScript apps' },
    { k: 'SHIPPED', v: 'JobShield Pakistan — a live AI scam-detection tool' },
  ],
  back: {
    tag: 'say hi',
    line: 'Turning ideas into interfaces, one build at a time.',
    chips: ['HTML', 'CSS', 'JavaScript', 'React'],
    github: 'https://github.com/sadafiqbal91',
    linkedin: 'https://www.linkedin.com/in/sadaf-iqbal-23b790276/',
  },
};

export const journey = [
  {
    date: 'Before 2026',
    title: 'Teaching',
    body: 'Years in the classroom, breaking hard ideas into clear ones — the instinct that now shapes how she explains code.',
  },
  {
    date: 'Early 2026',
    title: 'Started learning web development',
    body: 'HTML, CSS and JavaScript fundamentals, self-taught from the ground up.',
  },
  {
    date: 'Mar–Apr 2026',
    title: 'Web Development internship at SyntecxHub',
    body: 'First real-world builds: a real-time chat app and an employee management dashboard, both MERN-stack.',
  },
  {
    date: '2026',
    title: 'Two FemHack hackathons',
    body: "Built under pressure, twice, at Saylani Mass Training Programme's FemHack 2026.",
  },
  {
    date: '2026',
    title: 'Shipped JobShield Pakistan',
    body: 'A live AI scam-detection tool for Pakistani job seekers — her first project used by real people.',
  },
  {
    date: 'Now',
    title: 'Open to internship & junior roles',
    body: 'Looking for the next place to keep building — remote or in Karachi.',
  },
];

export type SkillCategory = 'code' | 'framework' | 'database' | 'cloud' | 'tool';

export const skills: { name: string; category: SkillCategory }[] = [
  { name: 'HTML5', category: 'code' },
  { name: 'CSS3', category: 'code' },
  { name: 'JavaScript (ES6+)', category: 'code' },
  { name: 'TypeScript', category: 'code' },
  { name: 'React (Vite)', category: 'framework' },
  { name: 'Node.js', category: 'framework' },
  { name: 'Express.js', category: 'framework' },
  { name: 'MongoDB', category: 'database' },
  { name: 'Supabase', category: 'database' },
  { name: 'Firebase Firestore', category: 'database' },
  { name: 'Vercel Serverless Functions', category: 'cloud' },
  { name: 'Google Gemini API', category: 'cloud' },
  { name: 'Pusher', category: 'cloud' },
  { name: 'Git & GitHub', category: 'tool' },
  { name: 'Responsive Design', category: 'tool' },
  { name: 'Chrome Extensions', category: 'tool' },
];

export const credentials = [
  {
    badge: 'CERTIFICATE OF INTERNSHIP',
    title: 'SyntecxHub',
    body: 'Web Development internship, 3 March – 3 April 2026. ISO 9001:2015 certified program.',
  },
  {
    badge: 'CERTIFICATE OF PARTICIPATION',
    title: 'FemHack 2026',
    body: 'Saylani Mass Training Programme (SMIT) hackathon, 8 hours. Certificate No. SMIT/2026/HACKATHON/453371.',
  },
  {
    badge: 'CERTIFICATE OF PARTICIPATION',
    title: 'FemHack 2026',
    body: 'Saylani Mass Training Programme (SMIT) hackathon, 6 hours. Certificate No. SMIT/2026/FEMHACK/453371.',
  },
  {
    badge: 'CERTIFICATE OF ACCOMPLISHMENT',
    title: 'SkillQuest – Generative AI Literacy',
    body: 'Simplilearn SkillUp, 26 April 2026. Certificate No. 23464544.',
  },
];

export const contact = {
  heading: "Let's build something.",
  sub: 'Open to internship, junior and entry-level web development roles — remote or in Karachi.',
  email: 'imsadafiqbal91@gmail.com',
  github: 'https://github.com/sadafiqbal91',
  linkedin: 'https://www.linkedin.com/in/sadaf-iqbal-23b790276/',
};

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Skills', href: '#skills' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
];
