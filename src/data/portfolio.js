// All portfolio content lives here. Everything is taken from Thithiksha A's resume —
// edit this file to update the site.

export const profile = {
  firstName: 'Thithiksha',
  lastName: 'A',
  initials: 'TA',
  email: 'thithikshathithiksha23@gmail.com',
  phone: '+91 7810012962',
  phoneHref: 'tel:+917810012962',
  whatsapp: 'https://wa.me/917810012962',
  resume: '/Thithiksha_A_Resume.pdf',
  photo: '/images/profile.jpg',
  tagline: 'Computer Science and Engineering undergraduate focused on machine learning and generative AI, with full-stack skills in the MERN stack.',
  roles: ['AI/ML Enthusiast', 'Generative AI Developer', 'MERN Stack Developer', 'Problem Solver'],
  // Floating chips around the hero photo — skills taken from the resume
  heroChips: [
    { icon: '🐍', label: 'Python', position: '-left-12 top-8' },
    { icon: '✨', label: 'Gemini API', position: '-right-10 top-1/4' },
    { icon: '⚛️', label: 'React.js', position: '-left-8 bottom-14' },
    { icon: '🧠', label: 'Scikit-learn', position: '-right-6 bottom-6' },
  ],
  stats: [
    { value: '220', label: 'LeetCode Problems' },
    { value: '8.69', label: 'CGPA' },
    { value: '3', label: 'Featured Projects' },
  ],
}

export const socials = {
  github: 'https://github.com/Thithiksha-tech',
  linkedin: 'https://www.linkedin.com/in/thithiksha-a-77a3743b8',
  leetcode: 'https://leetcode.com/u/THITHIKSHA23/',
}

export const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  paragraphs: [
    'I am a Computer Science and Engineering undergraduate at Sri Shakthi Institute of Engineering and Technology (CGPA 8.69), focused on machine learning and generative AI, with full-stack skills in the MERN stack (MongoDB, Express.js, React.js, Node.js).',
    'I have built projects with Python, FastAPI, React and Flutter — including Gemini-powered applications and a scikit-learn classification workflow — and completed a machine learning internship at BrainerySpot Technologies. I have solved 220 LeetCode problems and am seeking AI/ML engineering opportunities.',
  ],
  focus: [
    { title: 'Machine Learning', desc: 'Classification workflows with Scikit-learn — Logistic Regression, KNN and PCA' },
    { title: 'Generative AI', desc: 'Google Gemini API–powered code analysis and speech feedback' },
    { title: 'Full-Stack Development', desc: 'MERN stack, FastAPI and Flutter with PostgreSQL, Firestore and MongoDB' },
    { title: 'Problem Solving', desc: '220 LeetCode problems solved; selected for the ICPC Preliminary Round' },
  ],
}

export const education = [
  {
    degree: 'B.E. Computer Science and Engineering',
    institution: 'Sri Shakthi Institute of Engineering and Technology',
    period: '2024 – 2028',
    score: 'CGPA: 8.69 / 10',
    badge: 'B.E. CSE',
    accent: 'from-primary-500 to-accent-cyan',
  },
  {
    degree: 'Class XII (CBSE)',
    institution: 'P.M. Shri Kendriya Vidyalaya, Aruvankadu',
    period: '2023 – 2024',
    score: 'Percentage: 91%',
    badge: 'CBSE XII',
    accent: 'from-accent-cyan to-accent-violet',
  },
  {
    degree: 'Class X (CBSE)',
    institution: 'P.M. Shri Kendriya Vidyalaya, Aruvankadu',
    period: '2021 – 2022',
    score: 'Percentage: 88%',
    badge: 'CBSE X',
    accent: 'from-accent-violet to-primary-500',
  },
]

// "I build front. I build back." block — inspired by an editorial portfolio layout,
// worded from the resume summary (MERN full-stack + machine learning)
export const manifesto = {
  lines: [
    { lead: 'I build', mark: 'front.', color: '#22d3ee' },
    { lead: 'I build', mark: 'back.', color: '#a78bfa' },
    { lead: 'I train', mark: 'models.', color: '#fbbf24' },
  ],
  body:
    'One person across the stack: React and Flutter interfaces, Node.js and FastAPI backends, and machine learning with Scikit-learn and the Gemini API — from model to interface.',
  tags: ['Frontend', 'Backend', 'Machine Learning', 'Generative AI', 'MERN Stack'],
}

// "What I work with" rows — every skill and project reference comes from the resume
export const stackGroups = [
  {
    title: 'Machine Learning',
    desc: 'Classification workflows with Logistic Regression and KNN, PCA for dimensionality reduction — used in Breast Cancer Detection.',
    tags: ['Scikit-learn', 'Logistic Regression', 'KNN', 'PCA', 'Bayesian Knowledge Tracing'],
  },
  {
    title: 'Generative AI',
    desc: 'Gemini-powered bug analysis and algorithm feedback in CodeSense; AI speaking feedback in VoiceIQ.',
    tags: ['Google Gemini API', 'AST Analysis'],
  },
  {
    title: 'Frontend',
    desc: 'React client for CodeSense, Flutter mobile app for VoiceIQ, Streamlit interface for Breast Cancer Detection.',
    tags: ['React.js', 'Flutter', 'TypeScript', 'JavaScript', 'Streamlit'],
  },
  {
    title: 'Backend',
    desc: 'REST APIs with Node.js for CodeSense, FastAPI with SQLAlchemy for VoiceIQ.',
    tags: ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'REST APIs'],
  },
  {
    title: 'Data & Tools',
    desc: 'PostgreSQL for VoiceIQ, Firebase Firestore for CodeSense, MongoDB in the MERN stack.',
    tags: ['PostgreSQL', 'Firebase Firestore', 'MongoDB', 'SQL', 'Git / GitHub'],
  },
  {
    title: 'Languages',
    desc: 'Python for ML and FastAPI, TypeScript and JavaScript for the web, Java (NPTEL certified).',
    tags: ['Python', 'Java', 'JavaScript', 'TypeScript'],
  },
]

// Skill names + icons (shown in the scrolling marquee)
export const skills = [
  { name: 'Java', icon: '☕' },
  { name: 'Python', icon: '🐍' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'TypeScript', icon: '🔷' },

  { name: 'Flutter', icon: '📱' },
  { name: 'FastAPI', icon: '🚀' },
  { name: 'React.js', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Express.js', icon: '🚂' },
  { name: 'Flask', icon: '🧪' },
  { name: 'Streamlit', icon: '📊' },
  { name: 'REST APIs', icon: '🔌' },

  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Firebase Firestore', icon: '🔥' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'SQL', icon: '🗃️' },

  { name: 'Scikit-learn', icon: '🧠' },
  { name: 'Logistic Regression', icon: '📈' },
  { name: 'KNN', icon: '📍' },
  { name: 'PCA', icon: '🧬' },
  { name: 'Bayesian Knowledge Tracing', icon: '🎯' },
  { name: 'AST Analysis', icon: '🌳' },
  { name: 'Google Gemini API', icon: '✨' },
  { name: 'Git / GitHub', icon: '🐙' },
]

export const coursework = [
  'Data Structures & Algorithms',
  'OOP',
  'DBMS',
  'Operating Systems',
  'Artificial Intelligence',
  'Machine Learning',
]

export const softSkills = ['Problem Solving', 'Communication', 'Teamwork', 'Time Management', 'Adaptability']

export const projects = [
  {
    id: 'codesense',
    title: 'CodeSense',
    subtitle: 'Algorithmic Knowledge Tracing & Code Intelligence',
    badge: 'AI · Full Stack',
    icon: '🧠',
    gradient: 'from-indigo-950 via-violet-900 to-purple-950',
    tagline: 'Coding-practice intelligence with Gemini-powered bug analysis',
    description:
      'A coding-practice intelligence platform that analyzes 100+ problem-submission histories to identify skill gaps, debugging friction, and topic-level struggles.',
    highlights: [
      'Built a coding-practice intelligence platform that analyzes 100+ problem-submission histories to identify skill gaps, debugging friction, and topic-level struggles.',
      'Integrated Gemini-powered syntax/logical bug analysis and algorithm trade-off feedback; designed a modular architecture spanning ML logic, REST APIs, Firestore, and the React client.',
    ],
    techStack: ['TypeScript', 'React', 'Node.js', 'Gemini API', 'Firestore'],
    facts: [
      { value: '100+', label: 'Submission histories' },
      { value: 'Gemini', label: 'Bug analysis' },
      { value: 'Modular', label: 'Architecture' },
    ],
    github: 'https://github.com/Thithiksha-tech/CodeSense-AI',
  },
  {
    id: 'voiceiq',
    title: 'VoiceIQ',
    subtitle: 'AI-Powered Speech Practice Coach',
    badge: 'AI · Mobile',
    icon: '🎙️',
    gradient: 'from-cyan-900 via-sky-950 to-indigo-950',
    tagline: 'Mobile speaking practice with AI feedback on five dimensions',
    description:
      'A mobile speaking-practice workflow with audio recording, transcript generation, session history, and student/admin dashboards, with AI feedback on how you speak.',
    highlights: [
      'Developed a mobile speaking-practice workflow with audio recording, transcript generation, session history, and student/admin dashboards.',
      'Implemented AI feedback across fluency, pronunciation, grammar, vocabulary, and confidence; calculates words per minute and filler-word counts from transcripts.',
    ],
    techStack: ['Flutter', 'Dart', 'FastAPI', 'Google Gemini API', 'SQLAlchemy', 'PostgreSQL'],
    facts: [
      { value: '5', label: 'Feedback areas' },
      { value: 'WPM', label: 'Pace tracking' },
      { value: 'Fillers', label: 'Word counts' },
    ],
    github: 'https://github.com/Thithiksha-tech/VOICE-IQ',
  },
  {
    id: 'breast-cancer',
    title: 'Breast Cancer Detection',
    subtitle: 'Using Machine Learning',
    badge: 'Machine Learning',
    icon: '🩺',
    gradient: 'from-rose-950 via-fuchsia-950 to-slate-950',
    tagline: 'Benign / malignant classification from diagnostic features',
    description:
      'A classification workflow for benign/malignant prediction from diagnostic features, with Logistic Regression and KNN models, PCA for dimensionality reduction, and a Streamlit interface.',
    highlights: [
      'Built a classification workflow for benign/malignant prediction from diagnostic features; implemented Logistic Regression and KNN with PCA for dimensionality reduction.',
      'Prepared data and evaluated models; serialized trained model artifacts with Joblib and created a Streamlit interface for interactive predictions.',
    ],
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'PCA', 'Streamlit', 'Joblib'],
    facts: [
      { value: 'LR + KNN', label: 'Models' },
      { value: 'PCA', label: 'Dim. reduction' },
      { value: 'Streamlit', label: 'Interactive UI' },
    ],
    github: 'https://github.com/Thithiksha-tech/breast-Cancer-Detection-uisng-ML',
  },
]

export const achievements = [
  {
    title: '220 LeetCode Problems',
    category: 'Problem Solving',
    icon: '🧩',
    stat: '220 Solved',
    color: 'from-amber-500 to-orange-500',
    description: 'Solved 220 LeetCode problems, focusing on advanced concepts.',
    link: socials.leetcode,
  },
  {
    title: 'Machine Learning Internship',
    category: 'Internship',
    icon: '🤖',
    stat: 'Completed',
    color: 'from-primary-500 to-accent-cyan',
    description: 'Completed a Machine Learning internship at BrainerySpot Technologies.',
  },
  {
    title: 'Smart India Hackathon',
    category: 'Hackathons & Competitions',
    icon: '🏛️',
    stat: 'Shortlisted',
    color: 'from-accent-violet to-purple-600',
    description: 'Shortlisted in the internal Smart India Hackathon (SIH).',
  },
  {
    title: 'ICPC Preliminary Round',
    category: 'Hackathons & Competitions',
    icon: '🏆',
    stat: 'Selected',
    color: 'from-emerald-500 to-teal-500',
    description: 'Selected for the ICPC Preliminary Round.',
  },
  {
    title: '24-Hour Hackathons',
    category: 'Hackathons & Competitions',
    icon: '⚡',
    stat: '2 × 24h',
    color: 'from-sky-500 to-indigo-500',
    description: 'Participated in 24-hour hackathons at SRM University, Trichy and EASA College of Engineering.',
  },
  {
    title: 'CODER ACT',
    category: 'Leadership',
    icon: '🎤',
    stat: 'Conducted',
    color: 'from-pink-500 to-rose-500',
    description: 'Conducted a technical event, CODER ACT.',
  },
]

export const certifications = [
  { title: 'Generative AI', issuer: 'Certification', icon: '✨', color: 'from-primary-500 to-accent-violet' },
  { title: 'Prompt Engineering', issuer: 'Certification', icon: '💬', color: 'from-accent-cyan to-primary-500' },
  { title: 'Programming in Java', issuer: 'NPTEL', icon: '☕', color: 'from-amber-500 to-orange-500' },
  { title: 'Smart India Hackathon', issuer: 'Internal Selection Certificate', icon: '🏛️', color: 'from-emerald-500 to-teal-500' },
]
