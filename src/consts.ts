// Site metadata
export const SITE_TITLE = 'pnsinha';
export const SITE_DESCRIPTION = 'Research blog by Parmanand SINHA, Ph.D. - Senior Data Scientist and HPC Specialist';
export const GITHUB_URL = 'https://github.com/pnsinha'; // Please update

export const AUTHOR = {
  name: 'Parmanand SINHA, Ph.D.',
  title: 'Senior Data Scientist — Computational Scientist & HPC Specialist',
  email: 'pnsinha@uchicago.edu',
  twitter: 'https://twitter.com/pnsinha_',
  github: 'https://github.com/pnsinha',
  linkedin: 'https://linkedin.com/in/pnsinha',
  institution: 'University of Chicago',
  department: 'Research Computing Center',
  bio: 'Results-driven Ph.D. Computational Scientist with 10+ years of senior-level experience.',
  location: 'Chicago, IL',
  socials: {
    twitter: 'https://twitter.com/pnsinha_',
    github: 'https://github.com/pnsinha',
    linkedin: 'https://linkedin.com/in/pnsinha',
    email: 'mailto:pnsinha@uchicago.edu',
  },
};

export const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Writings', href: '/blog' },
  { name: 'Research', href: '/research' },
  { name: 'About', href: '/about' },
];

export const SITE = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  url: 'https://pnsinha.github.io', // Please update with your actual blog URL
  twitter: '@pnsinha_',
};

export const SOCIAL_LINKS = [
  { name: 'GitHub', url: AUTHOR.socials.github, icon: 'github' },
  { name: 'Twitter', url: AUTHOR.socials.twitter, icon: 'twitter' },
  { name: 'LinkedIn', url: AUTHOR.socials.linkedin, icon: 'linkedin' },
  { name: 'Email', url: `mailto:${AUTHOR.email}`, icon: 'mail' },
];
export const EMAIL = 'pnsinha@uchicago.edu';