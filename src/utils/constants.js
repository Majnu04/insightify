// API endpoints
export const API_ENDPOINTS = {
  RESUME: {
    ANALYZE: '/resume/analyze',
    HISTORY: '/resume/history',
    DELETE: '/resume/analysis',
  },
  JOBS: {
    MATCH: '/jobs/match',
    DETAILS: '/jobs',
    SAVE: '/jobs/save',
    SAVED: '/jobs/saved',
  },
  LEARNING: {
    PATHS: '/learning/paths',
    RECOMMENDATIONS: '/learning/recommendations',
    PROGRESS: '/learning/courses',
  },
  USER: {
    PROFILE: '/user/profile',
    PREFERENCES: '/user/preferences',
    ANALYTICS: '/user/analytics',
  },
};

// File upload constraints
export const FILE_CONSTRAINTS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx'],
};

// Skill categories
export const SKILL_CATEGORIES = {
  PROGRAMMING: 'Programming',
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  DATABASE: 'Database',
  DEVOPS: 'DevOps',
  CLOUD: 'Cloud',
  AI_ML: 'AI/ML',
  MOBILE: 'Mobile',
  TOOLS: 'Tools',
  SOFT_SKILLS: 'Soft Skills',
};

// Experience levels
export const EXPERIENCE_LEVELS = {
  ENTRY: { min: 0, max: 2, label: 'Entry Level' },
  JUNIOR: { min: 2, max: 4, label: 'Junior' },
  MID: { min: 4, max: 7, label: 'Mid Level' },
  SENIOR: { min: 7, max: 12, label: 'Senior' },
  LEAD: { min: 12, max: 20, label: 'Lead/Principal' },
  EXECUTIVE: { min: 20, max: 50, label: 'Executive' },
};

// Job match score thresholds
export const MATCH_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 80,
  FAIR: 70,
  POOR: 50,
};

// Learning difficulty levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert',
};

// Course statuses
export const COURSE_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  DROPPED: 'dropped',
};

// Color palettes for charts
export const CHART_COLORS = {
  PRIMARY: [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', 
    '#EF4444', '#6366F1', '#14B8A6', '#F97316'
  ],
  GRADIENT: [
    ['#3B82F6', '#1D4ED8'],
    ['#8B5CF6', '#7C3AED'],
    ['#10B981', '#059669'],
    ['#F59E0B', '#D97706'],
    ['#EF4444', '#DC2626'],
  ],
};

// Animation durations
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'insightify_user_preferences',
  ANALYSIS_HISTORY: 'insightify_analysis_history',
  SAVED_JOBS: 'insightify_saved_jobs',
  LEARNING_PROGRESS: 'insightify_learning_progress',
  THEME: 'insightify_theme',
};

// Default user preferences
export const DEFAULT_PREFERENCES = {
  theme: 'light',
  emailNotifications: true,
  jobAlerts: true,
  learningReminders: true,
  preferredLocation: '',
  salaryRange: { min: 0, max: 200000 },
  jobTypes: ['full-time', 'contract', 'remote'],
  skillsToImprove: [],
};

// Regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  URL: /^https?:\/\/.+/,
  GITHUB: /^https?:\/\/(www\.)?github\.com\/[\w\-\.]+\/?$/,
  LINKEDIN: /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w\-]+\/?$/,
};

// Error messages
export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: 'File size exceeds 10MB limit',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload PDF, DOC, or DOCX files',
  UPLOAD_FAILED: 'Failed to upload file. Please try again',
  NETWORK_ERROR: 'Network error. Please check your connection',
  ANALYSIS_FAILED: 'Failed to analyze resume. Please try again',
  INVALID_EMAIL: 'Please enter a valid email address',
  REQUIRED_FIELD: 'This field is required',
  MIN_LENGTH: 'Minimum length is {min} characters',
  MAX_LENGTH: 'Maximum length is {max} characters',
};

// Success messages
export const SUCCESS_MESSAGES = {
  RESUME_UPLOADED: 'Resume uploaded successfully',
  ANALYSIS_COMPLETE: 'Analysis completed successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  JOB_SAVED: 'Job saved to your list',
  COURSE_ENROLLED: 'Successfully enrolled in course',
  PROGRESS_UPDATED: 'Progress updated successfully',
};

// Feature flags
export const FEATURE_FLAGS = {
  ENABLE_AI_CHAT: true,
  ENABLE_VIDEO_ANALYSIS: false,
  ENABLE_SALARY_INSIGHTS: true,
  ENABLE_PEER_COMPARISON: false,
  ENABLE_MOCK_INTERVIEWS: false,
};

// Social media links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/Majnu04/insightify',
  LINKEDIN: 'https://linkedin.com/company/insightify',
  TWITTER: 'https://twitter.com/insightify',
  EMAIL: 'contact@insightify.com',
};

// Popular skills by category
export const POPULAR_SKILLS = {
  [SKILL_CATEGORIES.PROGRAMMING]: [
    'JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'Go', 'Rust'
  ],
  [SKILL_CATEGORIES.FRONTEND]: [
    'React', 'Vue.js', 'Angular', 'HTML', 'CSS', 'Sass', 'Tailwind CSS', 'Bootstrap'
  ],
  [SKILL_CATEGORIES.BACKEND]: [
    'Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'Ruby on Rails'
  ],
  [SKILL_CATEGORIES.DATABASE]: [
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'SQLite', 'DynamoDB'
  ],
  [SKILL_CATEGORIES.CLOUD]: [
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'CloudFormation'
  ],
  [SKILL_CATEGORIES.DEVOPS]: [
    'CI/CD', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'Docker', 'Kubernetes', 'Monitoring'
  ],
  [SKILL_CATEGORIES.AI_ML]: [
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision'
  ],
};

// Job roles by experience level
export const JOB_ROLES_BY_LEVEL = {
  [EXPERIENCE_LEVELS.ENTRY.label]: [
    'Junior Developer', 'Associate Developer', 'Trainee Developer', 'Intern'
  ],
  [EXPERIENCE_LEVELS.JUNIOR.label]: [
    'Software Developer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer'
  ],
  [EXPERIENCE_LEVELS.MID.label]: [
    'Senior Developer', 'Software Engineer', 'DevOps Engineer', 'Data Engineer'
  ],
  [EXPERIENCE_LEVELS.SENIOR.label]: [
    'Lead Developer', 'Principal Engineer', 'Architect', 'Engineering Manager'
  ],
  [EXPERIENCE_LEVELS.LEAD.label]: [
    'Staff Engineer', 'Principal Engineer', 'Engineering Director', 'VP Engineering'
  ],
};

export default {
  API_ENDPOINTS,
  FILE_CONSTRAINTS,
  SKILL_CATEGORIES,
  EXPERIENCE_LEVELS,
  MATCH_THRESHOLDS,
  DIFFICULTY_LEVELS,
  COURSE_STATUS,
  CHART_COLORS,
  ANIMATION_DURATION,
  BREAKPOINTS,
  STORAGE_KEYS,
  DEFAULT_PREFERENCES,
  REGEX_PATTERNS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURE_FLAGS,
  SOCIAL_LINKS,
  POPULAR_SKILLS,
  JOB_ROLES_BY_LEVEL,
};