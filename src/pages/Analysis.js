import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Users, 
  Award, 
  FileText,
  Download,
  Share2,
  Star
} from 'lucide-react';
import SkillChart from '../components/SkillChart';
import JobMatches from '../components/JobMatches';
import CareerInsights from '../components/CareerInsights';

const Analysis = () => {
  const location = useLocation();
  const [analysisData, setAnalysisData] = useState(null);
  const [activeTab, setActiveTab] = useState('skills');

  useEffect(() => {
    // Get analysis data from navigation state or load mock data
    if (location.state?.analysisData) {
      setAnalysisData(location.state.analysisData);
    } else {
      // Load mock data if no state is passed
      setAnalysisData(getMockAnalysisData());
    }
  }, [location.state]);

  const getMockAnalysisData = () => ({
    fileName: 'sample_resume.pdf',
    fileSize: 245760,
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
  });

  const tabs = [
    { id: 'skills', label: 'Skills Analysis', icon: Brain },
    { id: 'matches', label: 'Job Matches', icon: Target },
    { id: 'insights', label: 'Career Insights', icon: TrendingUp },
  ];

  const overallScore = analysisData ? 
    Math.round(analysisData.skills.reduce((acc, skill) => acc + skill.proficiency, 0) / analysisData.skills.length) : 0;

  if (!analysisData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold text-gray-600">Loading Analysis...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Resume Analysis</h1>
                <p className="text-gray-600">{analysisData.fileName}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Score</p>
                <p className="text-3xl font-bold text-blue-600">{overallScore}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Skills Identified</p>
                <p className="text-3xl font-bold text-green-600">{analysisData.skills.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Job Matches</p>
                <p className="text-3xl font-bold text-purple-600">{analysisData.jobMatches.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Experience</p>
                <p className="text-3xl font-bold text-orange-600">{analysisData.experience.totalYears}y</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'skills' && <SkillChart skills={analysisData.skills} />}
            {activeTab === 'matches' && <JobMatches matches={analysisData.jobMatches} />}
            {activeTab === 'insights' && (
              <CareerInsights 
                suggestions={analysisData.suggestions}
                experience={analysisData.experience}
                education={analysisData.education}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;