import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Target, 
  BookOpen, 
  Calendar, 
  Building,
  GraduationCap,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

const CareerInsights = ({ suggestions, experience, education }) => {
  const careerMetrics = [
    {
      title: 'Career Progress',
      value: 'On Track',
      description: 'Your career progression aligns with industry standards',
      icon: TrendingUp,
      color: 'green',
    },
    {
      title: 'Market Position',
      value: 'Strong',
      description: 'Your skills are in high demand in the current market',
      icon: Target,
      color: 'blue',
    },
    {
      title: 'Growth Potential',
      value: 'High',
      description: 'Multiple pathways for career advancement',
      icon: Award,
      color: 'purple',
    },
  ];

  const careerPath = [
    {
      year: '2018',
      role: 'Junior Developer',
      company: 'StartupXYZ',
      description: 'Started career in web development',
    },
    {
      year: '2020',
      role: 'Software Engineer',
      company: 'TechCorp',
      description: 'Expanded skills in full-stack development',
    },
    {
      year: '2022',
      role: 'Senior Developer',
      company: 'DataCorp',
      description: 'Leadership role with team management',
    },
    {
      year: '2025',
      role: 'Tech Lead',
      company: 'Future Role',
      description: 'Projected next career step',
      future: true,
    },
  ];

  const industryTrends = [
    {
      trend: 'AI/ML Integration',
      impact: 'High',
      relevance: 85,
      description: 'Growing demand for AI-enhanced applications',
    },
    {
      trend: 'Cloud Native Development',
      impact: 'High',
      relevance: 78,
      description: 'Microservices and containerization adoption',
    },
    {
      trend: 'Remote Work Culture',
      impact: 'Medium',
      relevance: 92,
      description: 'Continued emphasis on distributed teams',
    },
    {
      trend: 'Low-Code Platforms',
      impact: 'Medium',
      relevance: 65,
      description: 'Simplifying application development',
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: 'text-green-600 bg-green-100',
      blue: 'text-blue-600 bg-blue-100',
      purple: 'text-purple-600 bg-purple-100',
      orange: 'text-orange-600 bg-orange-100',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Career Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Assessment</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careerMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white border rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(metric.color)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{metric.title}</h4>
                    <p className={`text-sm font-medium ${metric.color === 'green' ? 'text-green-600' : 
                                   metric.color === 'blue' ? 'text-blue-600' : 'text-purple-600'}`}>
                      {metric.value}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{metric.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Professional Summary */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Experience</h4>
                <p className="text-gray-600">{experience.totalYears} years in software development</p>
                <p className="text-sm text-gray-500 mt-1">
                  Worked at {experience.companies.length} companies
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Building className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Companies</h4>
                <div className="text-gray-600">
                  {experience.companies.map((company, index) => (
                    <span key={index}>
                      {company}
                      {index < experience.companies.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <GraduationCap className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Education</h4>
                <p className="text-gray-600">{education.degree}</p>
                <p className="text-sm text-gray-500">
                  {education.university}, {education.graduationYear}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Award className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Career Level</h4>
                <p className="text-gray-600">Senior Professional</p>
                <p className="text-sm text-gray-500">
                  Ready for leadership roles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <span>AI-Powered Recommendations</span>
        </h3>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-800">{suggestion}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Career Progression */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Progression</h3>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-6">
            {careerPath.map((step, index) => (
              <div key={index} className="relative flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  step.future ? 'bg-gray-100 border-2 border-dashed border-gray-300' : 'bg-blue-600'
                }`}>
                  <Calendar className={`w-5 h-5 ${step.future ? 'text-gray-400' : 'text-white'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <h4 className={`font-semibold ${step.future ? 'text-gray-600' : 'text-gray-900'}`}>
                      {step.role}
                    </h4>
                    <span className="text-sm text-gray-500">{step.year}</span>
                    {step.future && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Projected
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${step.future ? 'text-gray-500' : 'text-gray-600'} mb-1`}>
                    {step.company}
                  </p>
                  <p className={`text-sm ${step.future ? 'text-gray-500' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industry Trends */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industryTrends.map((trend, index) => (
            <div key={index} className="bg-white border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">{trend.trend}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  trend.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {trend.impact} Impact
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{trend.description}</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Relevance:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                    style={{ width: `${trend.relevance}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{trend.relevance}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          <span>Recommended Next Steps</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Short Term (3-6 months)</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Complete TypeScript certification</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Build a machine learning project</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Contribute to open source</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Long Term (6-12 months)</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span>Pursue cloud architecture certification</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span>Lead a major project initiative</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span>Explore tech leadership roles</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerInsights;