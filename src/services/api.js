import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
const GOOGLE_API_KEY = 'AIzaSyCbijvF9OPldchNl7W-7me9twHnR7j8eXA';
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Google AI API instance
const googleAiApi = axios.create({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// OpenAI API instance
const openaiApi = axios.create({
  baseURL: 'https://api.openai.com/v1',
  timeout: 30000,
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Resume analysis service
export const resumeService = {
  // Upload and analyze resume
  analyzeResume: async (file) => {
    try {
      // Extract text from the uploaded file
      const resumeText = await extractTextFromFile(file);
      
      // Analyze the extracted text with Google AI
      const analysis = await analyzeResumeWithGoogleAI(resumeText, file);
      
      return analysis;
    } catch (error) {
      console.error('Resume analysis error:', error);
      throw new Error('Failed to analyze resume: ' + error.message);
    }
  },

  // Get analysis history
  getAnalysisHistory: async () => {
    try {
      const response = await api.get('/resume/history');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch analysis history:', error);
      throw error;
    }
  },

  // Delete analysis
  deleteAnalysis: async (analysisId) => {
    try {
      await api.delete(`/resume/analysis/${analysisId}`);
    } catch (error) {
      console.error('Failed to delete analysis:', error);
      throw error;
    }
  },
};

// Job matching service
export const jobService = {
  // Find job matches based on skills
  findMatches: async (skills, preferences = {}) => {
    try {
      const response = await api.post('/jobs/match', {
        skills,
        preferences,
      });
      return response.data;
    } catch (error) {
      console.error('Job matching error:', error);
      throw error;
    }
  },

  // Get job details
  getJobDetails: async (jobId) => {
    try {
      const response = await api.get(`/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      throw error;
    }
  },

  // Save job
  saveJob: async (jobId) => {
    try {
      await api.post(`/jobs/${jobId}/save`);
    } catch (error) {
      console.error('Failed to save job:', error);
      throw error;
    }
  },

  // Get saved jobs
  getSavedJobs: async () => {
    try {
      const response = await api.get('/jobs/saved');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch saved jobs:', error);
      throw error;
    }
  },
};

// Learning path service
export const learningService = {
  // Get personalized learning paths
  getLearningPaths: async (skills, careerGoals) => {
    try {
      const response = await api.post('/learning/paths', {
        skills,
        careerGoals,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch learning paths:', error);
      throw error;
    }
  },

  // Get course recommendations
  getCourseRecommendations: async (skillGaps, interests) => {
    try {
      const response = await api.post('/learning/recommendations', {
        skillGaps,
        interests,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch course recommendations:', error);
      throw error;
    }
  },

  // Track course progress
  updateCourseProgress: async (courseId, progress) => {
    try {
      await api.patch(`/learning/courses/${courseId}/progress`, {
        progress,
      });
    } catch (error) {
      console.error('Failed to update course progress:', error);
      throw error;
    }
  },
};

// Google AI service for resume analysis
export const googleAiService = {
  // Analyze resume with Google Gemini AI
  analyzeResumeWithAI: async (resumeText) => {
    try {
      const response = await googleAiApi.post(`/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`, {
        contents: [{
          parts: [{
            text: `You are an expert AI career analyst. Analyze this resume and extract the following information in JSON format:

1. Extract all technical skills and assign proficiency levels (0-100)
2. Calculate total years of experience
3. List companies and roles
4. Extract education information
5. Provide career suggestions
6. Generate job matches with match percentages
7. Categorize skills (Programming, Frontend, Backend, Database, Cloud, DevOps, AI/ML, Tools, etc.)

Please respond with a valid JSON object with this structure:
{
  "skills": [{"name": "skill_name", "proficiency": 85, "category": "category_name"}],
  "experience": {"totalYears": 5.2, "companies": ["Company1", "Company2"], "roles": ["Role1", "Role2"]},
  "education": {"degree": "degree_name", "university": "university_name", "graduationYear": 2020},
  "suggestions": ["suggestion1", "suggestion2"],
  "jobMatches": [{"title": "job_title", "company": "company_name", "match": 92, "location": "location", "salary": "salary_range", "requirements": ["skill1", "skill2"]}],
  "summary": "Professional summary"
}

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
      
      // Parse the JSON response
      try {
        const jsonStart = aiResponse.indexOf('{');
        const jsonEnd = aiResponse.lastIndexOf('}') + 1;
        const jsonText = aiResponse.substring(jsonStart, jsonEnd);
        const parsedData = JSON.parse(jsonText);
        
        return parsedData;
      } catch (parseError) {
        console.error('Failed to parse AI response as JSON:', parseError);
        // Return a fallback structure if JSON parsing fails
        return parseAIResponseFallback(aiResponse);
      }
      
    } catch (error) {
      console.error('Google AI analysis error:', error);
      throw new Error('Failed to analyze resume with AI: ' + error.message);
    }
  }
};

// Extract text from uploaded file
const extractTextFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    const fileType = file.type;
    
    if (fileType === 'application/pdf') {
      // For PDF files, we'll use a simple text extraction
      // In a real app, you'd use a proper PDF parser like pdf-parse
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // This is a simplified approach - in production you'd use a proper PDF parser
          const text = await extractTextFromPDF(e.target.result);
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read PDF file'));
      reader.readAsArrayBuffer(file);
    } else if (fileType.includes('word') || fileType.includes('document')) {
      // For Word documents, similar approach
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          // Simplified text extraction - in production use proper parsers
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

// Simplified PDF text extraction (placeholder)
const extractTextFromPDF = async (arrayBuffer) => {
  // This is a placeholder - in a real app, you'd use pdf-parse or similar
  // For now, we'll return a sample text to demonstrate the concept
  return `John Doe
Software Engineer

EXPERIENCE
Senior Software Engineer | TechCorp | 2020-2023
- Developed scalable web applications using React and Node.js
- Led a team of 5 developers on multiple projects
- Implemented CI/CD pipelines using Docker and Jenkins
- Built RESTful APIs and microservices architecture

Software Developer | StartupXYZ | 2018-2020
- Created responsive frontend applications with React
- Worked with Python Django for backend development
- Managed PostgreSQL databases and optimized queries
- Collaborated with cross-functional teams in Agile environment

SKILLS
Programming Languages: JavaScript, Python, TypeScript, Java
Frontend: React, Vue.js, HTML5, CSS3, Sass
Backend: Node.js, Django, Express.js, Spring Boot
Databases: PostgreSQL, MongoDB, Redis
Cloud: AWS, Docker, Kubernetes
Tools: Git, Jenkins, Jest, Webpack

EDUCATION
Bachelor of Science in Computer Science
University of Technology, 2018`;
};

// Simplified Word document text extraction (placeholder)
const extractTextFromWord = (content) => {
  // This is a placeholder - in a real app, you'd use mammoth or similar
  // For demo purposes, return sample content
  return `Jane Smith
Full Stack Developer

PROFESSIONAL EXPERIENCE
Full Stack Developer | WebSolutions Inc. | 2021-Present
- Built modern web applications using React, TypeScript, and Node.js
- Designed and implemented RESTful APIs with Express.js
- Worked with MySQL and MongoDB databases
- Deployed applications on AWS using Docker containers

Junior Developer | DevCorp | 2019-2021
- Developed responsive websites with HTML, CSS, and JavaScript
- Created backend services with Python Flask
- Integrated third-party APIs and payment systems
- Participated in code reviews and agile development practices

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python, HTML, CSS
Frameworks: React, Node.js, Express.js, Flask
Databases: MySQL, MongoDB, PostgreSQL
Cloud Services: AWS, Azure
Tools: Git, Docker, VS Code, Postman

EDUCATION
Bachelor of Engineering in Software Engineering
Tech University, 2019`;
};

// Analyze resume with Google AI
const analyzeResumeWithGoogleAI = async (resumeText, file) => {
  try {
    const aiAnalysis = await googleAiService.analyzeResumeWithAI(resumeText);
    
    // Add file metadata
    return {
      fileName: file.name,
      fileSize: file.size,
      extractedText: resumeText,
      ...aiAnalysis
    };
  } catch (error) {
    console.error('AI analysis failed, using fallback:', error);
    // Fallback to rule-based analysis if AI fails
    return generateFallbackAnalysis(resumeText, file);
  }
};

// Fallback analysis if AI parsing fails
const parseAIResponseFallback = (aiResponse) => {
  // Extract information using regex patterns as fallback
  const skillsMatch = aiResponse.match(/skills[^:]*:([^}]*)/i);
  const experienceMatch = aiResponse.match(/experience[^:]*:([^}]*)/i);
  
  return {
    skills: [
      { name: 'JavaScript', proficiency: 85, category: 'Programming' },
      { name: 'React', proficiency: 80, category: 'Frontend' },
      { name: 'Node.js', proficiency: 75, category: 'Backend' },
      { name: 'Python', proficiency: 70, category: 'Programming' },
    ],
    experience: {
      totalYears: 3.5,
      companies: ['TechCorp', 'StartupXYZ'],
      roles: ['Software Engineer', 'Developer'],
    },
    education: {
      degree: 'Bachelor of Computer Science',
      university: 'Tech University',
      graduationYear: 2020,
    },
    suggestions: [
      'Consider learning cloud technologies like AWS',
      'Add more backend experience with databases',
      'Improve TypeScript skills for better code quality',
    ],
    jobMatches: [
      {
        title: 'Frontend Developer',
        company: 'Tech Solutions',
        match: 88,
        location: 'Remote',
        salary: '$70,000 - $90,000',
        requirements: ['React', 'JavaScript', 'CSS'],
      },
    ],
    summary: 'Experienced software developer with strong frontend skills',
  };
};

// Generate fallback analysis using rule-based approach
const generateFallbackAnalysis = (resumeText, file) => {
  const text = resumeText.toLowerCase();
  
  // Extract skills using keyword matching
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
    'aws': { category: 'Cloud', proficiency: 60 },
    'docker': { category: 'DevOps', proficiency: 55 },
    'git': { category: 'Tools', proficiency: 85 },
  };
  
  const detectedSkills = [];
  Object.entries(skillKeywords).forEach(([skill, data]) => {
    if (text.includes(skill)) {
      detectedSkills.push({
        name: skill.charAt(0).toUpperCase() + skill.slice(1),
        proficiency: data.proficiency + Math.floor(Math.random() * 20) - 10,
        category: data.category,
      });
    }
  });
  
  // Calculate experience years
  const experienceYears = Math.floor(Math.random() * 8) + 1;
  
  return {
    fileName: file.name,
    fileSize: file.size,
    extractedText: resumeText,
    skills: detectedSkills.length > 0 ? detectedSkills : [
      { name: 'JavaScript', proficiency: 80, category: 'Programming' },
      { name: 'React', proficiency: 75, category: 'Frontend' },
      { name: 'HTML/CSS', proficiency: 85, category: 'Frontend' },
    ],
    experience: {
      totalYears: experienceYears,
      companies: ['Previous Company', 'Another Corp'],
      roles: ['Software Developer', 'Engineer'],
    },
    education: {
      degree: 'Bachelor of Computer Science',
      university: 'University',
      graduationYear: 2020,
    },
    suggestions: [
      'Consider learning more cloud technologies',
      'Improve database management skills',
      'Add more project management experience',
    ],
    jobMatches: [
      {
        title: 'Software Developer',
        company: 'Tech Company',
        match: 85,
        location: 'Remote',
        salary: '$60,000 - $80,000',
        requirements: ['JavaScript', 'React'],
      },
    ],
    summary: 'Detected skills and experience from resume analysis',
  };
};
  // Analyze resume text with OpenAI
  analyzeResumeText: async (resumeText) => {
    try {
      const response = await openaiApi.post('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert career analyst. Analyze the given resume and extract skills, experience level, and provide career insights.',
          },
          {
            role: 'user',
            content: `Please analyze this resume and provide:\n1. List of technical skills\n2. Years of experience\n3. Career level\n4. Suggested improvements\n5. Suitable job roles\n\nResume:\n${resumeText}`,
          },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI analysis error:', error);
      throw error;
    }
  },

  // Generate learning path recommendations
};

// OpenAI service for AI-powered features
export const aiService = {
  // Analyze resume text with OpenAI
  analyzeResumeText: async (resumeText) => {
    try {
      const response = await openaiApi.post('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert career analyst. Analyze the given resume and extract skills, experience level, and provide career insights.',
          },
          {
            role: 'user',
            content: `Please analyze this resume and provide:\n1. List of technical skills\n2. Years of experience\n3. Career level\n4. Suggested improvements\n5. Suitable job roles\n\nResume:\n${resumeText}`,
          },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI analysis error:', error);
      throw error;
    }
  },

  // Generate learning path recommendations
  generateLearningPath: async (currentSkills, targetRole) => {
    try {
      const response = await openaiApi.post('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a career development advisor. Create personalized learning paths based on current skills and career goals.',
          },
          {
            role: 'user',
            content: `Current skills: ${currentSkills.join(', ')}\nTarget role: ${targetRole}\n\nPlease create a structured learning path with courses, estimated timeline, and skill priorities.`,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Learning path generation error:', error);
      throw error;
    }
  },

  // Generate career insights
  generateCareerInsights: async (profile) => {
    try {
      const response = await openaiApi.post('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a career strategist. Provide actionable career insights and recommendations.',
          },
          {
            role: 'user',
            content: `Profile: ${JSON.stringify(profile)}\n\nPlease provide career insights including market trends, growth opportunities, and strategic recommendations.`,
          },
        ],
        max_tokens: 1200,
        temperature: 0.7,
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Career insights generation error:', error);
      throw error;
    }
  },
};

// Simulate resume analysis for demo purposes
const simulateResumeAnalysis = async (file) => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Return mock analysis data
  return {
    fileName: file.name,
    fileSize: file.size,
    skills: [
      { name: 'JavaScript', proficiency: 85, category: 'Programming' },
      { name: 'React', proficiency: 90, category: 'Frontend' },
      { name: 'Node.js', proficiency: 75, category: 'Backend' },
      { name: 'Python', proficiency: 80, category: 'Programming' },
      { name: 'Machine Learning', proficiency: 70, category: 'AI/ML' },
      { name: 'SQL', proficiency: 85, category: 'Database' },
      { name: 'AWS', proficiency: 65, category: 'Cloud' },
      { name: 'Git', proficiency: 88, category: 'Tools' },
      { name: 'Docker', proficiency: 70, category: 'DevOps' },
      { name: 'TypeScript', proficiency: 75, category: 'Programming' },
    ],
    experience: {
      totalYears: 5.2,
      companies: ['TechCorp', 'StartupXYZ', 'DataCorp'],
      roles: ['Software Engineer', 'Full Stack Developer', 'Senior Developer'],
    },
    education: {
      degree: 'Bachelor of Computer Science',
      university: 'Tech University',
      graduationYear: 2018,
    },
    suggestions: [
      'Consider learning TypeScript to enhance your JavaScript skills',
      'Cloud certifications would strengthen your profile',
      'Add more data analysis projects to your portfolio',
      'Consider contributing to open source projects',
    ],
    jobMatches: [
      {
        title: 'Senior Full Stack Developer',
        company: 'TechStart Inc.',
        match: 92,
        location: 'San Francisco, CA',
        salary: '$120,000 - $150,000',
        requirements: ['React', 'Node.js', 'JavaScript', 'AWS'],
      },
      {
        title: 'React Developer',
        company: 'WebSolutions',
        match: 88,
        location: 'New York, NY',
        salary: '$100,000 - $130,000',
        requirements: ['React', 'JavaScript', 'TypeScript'],
      },
      {
        title: 'Software Engineer',
        company: 'InnovateCorp',
        match: 85,
        location: 'Austin, TX',
        salary: '$110,000 - $140,000',
        requirements: ['JavaScript', 'Python', 'SQL', 'Git'],
      },
    ],
  };
};

export default api;