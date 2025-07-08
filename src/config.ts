export const SITE = {
  title: 'pnsinha',
  description: 'Research blog by Parmanand SINHA, Ph.D. - Senior Data Scientist and HPC Specialist',
  url: 'https://pnsinha.github.io',
  githubUrl: 'https://github.com/pnsinha', // Please update with your actual GitHub URL
  listDrafts: false,
  image: '/og-image.png',
  twitter: 'pnsinha_',
  name: 'pnsinha',
  location: 'Chicago, IL',
  email: 'pnsinha@uchicago.edu',
};

export const NAV_ITEMS = [
  { title: 'Home', path: '/' },
  { title: 'Blog', path: '/blog' },
  { title: 'Research', path: '/research' },
  { title: 'About', path: '/about' },
];

export const PAGE_SIZE = 10;

export const AUTHOR = {
  name: 'Parmanand SINHA, Ph.D.',
  avatar: '/avatar.png', // You can update this with a path to your avatar image
  bio: 'Results-driven Ph.D. Computational Scientist with 10+ years of senior-level experience designing and delivering data-intensive solutions, modernizing software ecosystems, and optimizing workflows in high-performance computing (HPC) environments.',
  location: 'Chicago, IL',
  email: 'pnsinha@uchicago.edu',
  social: {
    github: 'pnsinha',
    twitter: 'pnsinha_',
    linkedin: 'pnsinha',
    orcid: 'YOUR_ORCID_ID', // Please update with your ORCID
    googleScholar: 'YOUR_GOOGLE_SCHOLAR_ID', // Please update
  },
  researchInterests: [
    'High Performance Computing',
    'Data Science & Algorithm Development',
    'Machine Learning',
    'Deep Learning',
    'Geospatial Science',
    'Digital Signal/Image Processing',
    'Big Data Analytics',
    'Linux System Engineering',
  ],
  education: [
    {
      degree: 'Ph.D. in Geospatial Information Sciences',
      institution: 'The University of Texas at Dallas',
      year: '2015',
    },
    {
      degree: 'M.S. in Geospatial Information Sciences',
      institution: 'The University of Texas at Dallas',
      year: '2012',
    },
    {
      degree: 'Master of City and Regional Planning (MCRP)',
      institution: 'The University of Texas at Arlington',
      year: '2010',
    },
    {
      degree: 'Bachelor of Architecture',
      institution: 'Indian Institute of Technology (IIT) Roorkee, India',
      year: '2005',
    },
  ],
  experience: [
    {
      position: 'Computational Scientist - Geospatial Science and HPC',
      institution: 'Research Computing Center, University of Chicago',
      period: 'Dec 2018 – Present',
      description: 'Spearheaded the design and optimization of advanced data science and deep learning workflows on HPC infrastructure, enhancing research capabilities. Engineered and deployed machine learning models for complex object classification and detection in LIDAR and Buckeye imagery. Championed and defined strategic initiatives to modernize the software stack, addressing challenges in Python/Conda environments and enhancing build reproducibility with Spack and containers.'
    },
    {
      position: 'Post-Doctoral Scholar and Lecturer',
      institution: 'WorldPop and Flowminder Project, Univ. of Louisville & Univ. of Southampton',
      period: 'Nov 2016 – Nov 2018',
      description: 'Successfully scaled and validated machine learning models for high-resolution global population distribution, processing terabytes of geospatial data. Applied advanced spatial statistics and machine learning methodologies for demographic mapping and migration modeling.'
    },
    {
      position: 'Post-Doctoral Research Associate',
      institution: 'NSF-Census Research Network, University of Tennessee-Knoxville',
      period: 'Feb 2015 – Oct 2016',
      description: 'Executed complex spatial covariance estimation workflows on large-scale, confidential American Community Survey (ACS) microdata. Pioneered spatial segregation models using ACS and decennial microdata.'
    },
  ],
};