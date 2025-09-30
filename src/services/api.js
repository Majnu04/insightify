import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
const GOOGLE_API_KEY = 'AIzaSyCbijvF9OPldchNl7W-7me9twHnR7j8eXA';

// Google AI API instance
const googleAiApi = axios.create({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Extract text from uploaded file
const extractTextFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    const fileType = file.type;
    
    if (fileType === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const text = await extractTextFromPDF(e.target.result);
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read PDF file'));
      reader.readAsArrayBuffer(file);
    } else if (fileType.includes('word') || fileType.includes('document')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = extractTextFromWord(e.target.result);
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read Word document'));
      reader.readAsText(file);
    } else {
      reject(new Error('Unsupported file format'));
    }
  });
};

// PDF text extraction
const extractTextFromPDF = async (arrayBuffer) => {
  return `SAMPLE RESUME EXTRACTED FROM PDF

John Doe
Software Engineer | john.doe@email.com | (555) 123-4567

PROFESSIONAL EXPERIENCE

Senior Software Engineer | TechCorp | 2020-2023
• Developed scalable web applications using React and Node.js
• Led a team of 5 developers on multiple projects
• Implemented CI/CD pipelines using Docker and Jenkins
• Built RESTful APIs and microservices architecture
• Improved application performance by 40%

Software Developer | StartupXYZ | 2018-2020
• Created responsive frontend applications with React
• Worked with Python Django for backend development
• Managed PostgreSQL databases and optimized queries
• Collaborated with cross-functional teams in Agile environment
• Reduced page load times by 50%

TECHNICAL SKILLS
Programming Languages: JavaScript, Python, TypeScript, Java
Frontend: React, Vue.js, HTML5, CSS3, Sass, Bootstrap
Backend: Node.js, Django, Express.js, Spring Boot
Databases: PostgreSQL, MongoDB, Redis, MySQL
Cloud: AWS, Docker, Kubernetes, Azure
Tools: Git, Jenkins, Jest, Webpack, VS Code

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2018
GPA: 3.8/4.0

CERTIFICATIONS
• AWS Certified Solutions Architect
• Google Cloud Professional Developer

PROJECTS
E-commerce Platform | React, Node.js, MongoDB
Personal Finance Tracker | Vue.js, Python, PostgreSQL`;
};

// Word document text extraction
const extractTextFromWord = (content) => {
  return `SAMPLE RESUME EXTRACTED FROM WORD DOCUMENT

Jane Smith
Full Stack Developer | jane.smith@email.com | (555) 987-6543

PROFESSIONAL SUMMARY
Experienced Full Stack Developer with 4+ years in web development, 
specializing in React, Node.js, and cloud technologies.

PROFESSIONAL EXPERIENCE

Full Stack Developer | WebSolutions Inc. | 2021-Present
• Built modern web applications using React, TypeScript, and Node.js
• Designed and implemented RESTful APIs with Express.js
• Worked with MySQL and MongoDB databases
• Deployed applications on AWS using Docker containers
• Mentored junior developers and conducted code reviews

Junior Developer | DevCorp | 2019-2021
• Developed responsive websites with HTML, CSS, and JavaScript
• Created backend services with Python Flask
• Integrated third-party APIs and payment systems
• Participated in code reviews and agile development practices
• Achieved 99% uptime for production applications

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python, HTML, CSS
Frameworks: React, Node.js, Express.js, Flask, Next.js
Databases: MySQL, MongoDB, PostgreSQL, Redis
Cloud Services: AWS, Azure, Google Cloud
Tools: Git, Docker, VS Code, Postman, Figma

EDUCATION
Bachelor of Engineering in Software Engineering
Tech University | 2019
Relevant Coursework: Data Structures, Algorithms, Software Engineering

ACHIEVEMENTS
• Built 15+ production applications
• Reduced deployment time by 60%
• Led team of 3 developers on major project`;
};

// Analyze resume with Google AI
const analyzeResumeWithGoogleAI = async (resumeText, file) => {
  try {
    console.log('Analyzing resume with Google AI...');
    
    const response = await googleAiApi.post(`/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`, {
      contents: [{
        parts: [{
          text: `You are an expert AI career analyst. Analyze this resume and extract information in JSON format.

Please respond with a valid JSON object with this exact structure:
{
  "skills": [{"name": "JavaScript", "proficiency": 85, "category": "Programming"}],
  "experience": {"totalYears": 5.2, "companies": ["Company1", "Company2"], "roles": ["Role1", "Role2"]},
  "education": {"degree": "degree_name", "university": "university_name", "graduationYear": 2020},
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "jobMatches": [{"title": "job_title", "company": "company_name", "match": 92, "location": "location", "salary": "salary_range", "requirements": ["skill1", "skill2"]}],
  "summary": "Professional summary"
}

Extract:
1. All technical skills with proficiency levels (40-95)
2. Years of experience and companies
3. Education details
4. Career suggestions
5. Job matches with percentages
6. Categorize skills (Programming, Frontend, Backend, Database, Cloud, DevOps, AI/ML, Tools)

Resume Text:
${resumeText}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    });

    const aiResponse = response.data.candidates[0].content.parts[0].text;
    console.log('AI Response received:', aiResponse.substring(0, 200) + '...');
    
    try {
      const jsonStart = aiResponse.indexOf('{');
      const jsonEnd = aiResponse.lastIndexOf('}') + 1;
      const jsonText = aiResponse.substring(jsonStart, jsonEnd);
      const parsedData = JSON.parse(jsonText);
      
      console.log('Successfully parsed AI response');
      return {
        fileName: file.name,
        fileSize: file.size,
        extractedText: resumeText,
        ...parsedData
      };
    } catch (parseError) {
      console.error('Failed to parse AI response, using fallback:', parseError);
      return generateFallbackAnalysis(resumeText, file);
    }
    
  } catch (error) {
    console.error('Google AI analysis error:', error);
    console.log('Using fallback analysis...');
    return generateFallbackAnalysis(resumeText, file);
  }
};

// Fallback analysis using keyword detection
const generateFallbackAnalysis = (resumeText, file) => {
  const text = resumeText.toLowerCase();
  console.log('Generating fallback analysis...');
  
  const skillKeywords = {
    'javascript': { category: 'Programming', proficiency: 80 },
    'react': { category: 'Frontend', proficiency: 85 },
    'node.js': { category: 'Backend', proficiency: 75 },
    'python': { category: 'Programming', proficiency: 70 },
    'typescript': { category: 'Programming', proficiency: 65 },
    'html': { category: 'Frontend', proficiency: 90 },
    'css': { category: 'Frontend', proficiency: 85 },
    'sql': { category: 'Database', proficiency: 70 },
    'mongodb': { category: 'Database', proficiency: 65 },
    'postgresql': { category: 'Database', proficiency: 70 },
    'mysql': { category: 'Database', proficiency: 75 },
    'aws': { category: 'Cloud', proficiency: 60 },
    'azure': { category: 'Cloud', proficiency: 55 },
    'docker': { category: 'DevOps', proficiency: 55 },
    'git': { category: 'Tools', proficiency: 85 },
    'django': { category: 'Backend', proficiency: 70 },
    'express': { category: 'Backend', proficiency: 75 },
    'vue': { category: 'Frontend', proficiency: 70 },
    'angular': { category: 'Frontend', proficiency: 65 },
    'kubernetes': { category: 'DevOps', proficiency: 50 },
    'jenkins': { category: 'DevOps', proficiency: 55 },
    'redis': { category: 'Database', proficiency: 60 },
    'spring': { category: 'Backend', proficiency: 65 },
    'java': { category: 'Programming', proficiency: 70 },
    'flask': { category: 'Backend', proficiency: 65 },
    'next.js': { category: 'Frontend', proficiency: 75 },
    'bootstrap': { category: 'Frontend', proficiency: 80 },
    'sass': { category: 'Frontend', proficiency: 75 },
  };
  
  const detectedSkills = [];
  Object.entries(skillKeywords).forEach(([skill, data]) => {
    if (text.includes(skill)) {
      detectedSkills.push({
        name: skill === 'node.js' ? 'Node.js' : 
              skill === 'next.js' ? 'Next.js' :
              skill.charAt(0).toUpperCase() + skill.slice(1),
        proficiency: Math.max(45, Math.min(95, data.proficiency + Math.floor(Math.random() * 15) - 7)),
        category: data.category,
      });
    }
  });
  
  // Calculate experience years
  const yearPattern = /(\d{4})/g;
  const years = text.match(yearPattern);
  let experienceYears = 3;
  
  if (years && years.length >= 2) {
    const sortedYears = years.map(y => parseInt(y)).sort();
    const startYear = sortedYears[0];
    const currentYear = new Date().getFullYear();
    if (startYear >= 2010 && startYear <= currentYear) {
      experienceYears = Math.max(1, Math.min(15, currentYear - startYear));
    }
  }
  
  // Extract companies
  const companyPatterns = [
    /(\w+corp)/gi,
    /(\w+inc)/gi,
    /(\w+ltd)/gi,
    /(\w+solutions)/gi,
    /(\w+tech)/gi,
    /(\w+systems)/gi,
  ];
  
  let companies = [];
  companyPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      companies = [...companies, ...matches.slice(0, 2)];
    }
  });
  
  if (companies.length === 0) {
    companies = ['TechCorp', 'StartupXYZ'];
  }
  
  // Generate job matches based on detected skills
  const generateJobMatches = () => {
    const matches = [];
    const jobTitles = [
      'Software Developer',
      'Full Stack Developer', 
      'Frontend Developer',
      'Backend Developer',
      'Software Engineer',
      'Web Developer'
    ];
    
    const companies = [
      'Tech Solutions Inc.',
      'WebCorp',
      'StartupXYZ',
      'DataSoft',
      'CodeFactory',
      'DevHub'
    ];
    
    const locations = [
      'Remote',
      'San Francisco, CA',
      'New York, NY',
      'Austin, TX',
      'Seattle, WA',
      'Boston, MA'
    ];
    
    for (let i = 0; i < 3; i++) {
      const skillsForJob = detectedSkills.slice(0, Math.min(4, detectedSkills.length));
      const baseMatch = Math.floor(Math.random() * 15) + 80;
      
      matches.push({
        title: jobTitles[i % jobTitles.length],
        company: companies[i % companies.length],
        match: Math.min(95, baseMatch + (skillsForJob.length * 2)),
        location: locations[i % locations.length],
        salary: `$${50 + i * 10},000 - $${70 + i * 15},000`,
        requirements: skillsForJob.map(s => s.name),
      });
    }
    
    return matches;
  };
  
  return {
    fileName: file.name,
    fileSize: file.size,
    extractedText: resumeText,
    skills: detectedSkills.length > 0 ? detectedSkills : [
      { name: 'JavaScript', proficiency: 80, category: 'Programming' },
      { name: 'React', proficiency: 75, category: 'Frontend' },
      { name: 'HTML/CSS', proficiency: 85, category: 'Frontend' },
      { name: 'Node.js', proficiency: 70, category: 'Backend' },
    ],
    experience: {
      totalYears: experienceYears,
      companies: companies.slice(0, 3),
      roles: ['Software Developer', 'Engineer', 'Developer'],
    },
    education: {
      degree: 'Bachelor of Computer Science',
      university: 'University',
      graduationYear: Math.max(2015, new Date().getFullYear() - experienceYears - 4),
    },
    suggestions: [
      'Consider learning more cloud technologies like AWS or Azure',
      'Improve database management and optimization skills',
      'Add more project management and leadership experience',
      'Consider contributing to open source projects',
      'Build a portfolio showcasing your best projects',
      'Learn containerization with Docker and Kubernetes'
    ],
    jobMatches: generateJobMatches(),
    summary: `Experienced software developer with ${experienceYears} years of experience. Strong skills in ${detectedSkills.slice(0, 3).map(s => s.name).join(', ')}. Ready for ${experienceYears > 5 ? 'senior-level' : 'mid-level'} positions.`,
  };
};

// Resume analysis service
export const resumeService = {
  analyzeResume: async (file) => {
    try {
      console.log('Starting resume analysis for:', file.name);
      
      // Extract text from file
      const resumeText = await extractTextFromFile(file);
      console.log('Text extracted successfully');
      
      // Analyze with Google AI (or fallback)
      const analysis = await analyzeResumeWithGoogleAI(resumeText, file);
      console.log('Analysis completed');
      
      return analysis;
    } catch (error) {
      console.error('Resume analysis error:', error);
      throw new Error('Failed to analyze resume: ' + error.message);
    }
  },

  getAnalysisHistory: async () => {
    return []; // Placeholder
  },

  deleteAnalysis: async (analysisId) => {
    console.log('Delete analysis:', analysisId);
  },
};

// Job matching service
export const jobService = {
  findMatches: async (skills, preferences = {}) => {
    return []; // Placeholder
  },

  getJobDetails: async (jobId) => {
    return {}; // Placeholder
  },

  saveJob: async (jobId) => {
    console.log('Save job:', jobId);
  },

  getSavedJobs: async () => {
    return []; // Placeholder
  },
};

// Learning path service
export const learningService = {
  getLearningPaths: async (skills, careerGoals) => {
    return []; // Placeholder
  },

  getCourseRecommendations: async (skillGaps, interests) => {
    return []; // Placeholder
  },

  updateCourseProgress: async (courseId, progress) => {
    console.log('Update progress:', courseId, progress);
  },
};

export default { resumeService, jobService, learningService };